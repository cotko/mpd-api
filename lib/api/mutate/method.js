'use strict'
const mpd = require('mpd2')
const { parseObject } = mpd
const fileType = require('file-type')

const debug = require('../../debug')('mutate:method')

/**
 * Custom implementation because client's connection
 * needs to switch to binary mode
 * also first two lines representing song size and
 * read bytes are parsed into an object
 *
 * If offset is 0 then meta data is detected using
 * `file-type` module and attached to response
 *
 * @yields Object {
 *  size: cover size
 *  binary: read bytes
 *  buffer: Buffer<binary>
 *
 *  // if offset === 0:
 *  ext: cover's extension (.jpg)
 *  mime: cover's mime type (image/jpeg)
 *
 * }
 */
exports.albumart = client => async (uri, offset) => {
  // to get a proper response, encoding on the
  // socket needs to be set to binary, otherwise
  // characters unknown to utf8 are replaced with
  // `fd` or something and binary data can not
  // be reconstructed any more.
  client.socket.setEncoding('binary')
  try {
    let data = await client.sendCommand(mpd.cmd('albumart', uri, offset))
    client.socket.setEncoding('utf8')

    // first two lines are meta info the rest is binary
    const nl = data.indexOf('\n', data.indexOf('\n') + 1)
    let result = parseObject(data.substring(0, nl))

    // remove meta lines and if new line is
    // kept by the mpdjs module it needs to
    // be removed, otherwise each Buffer gets
    // additional `10` at the end.
    data = data.substring(nl + 1, data.endsWith('\n')
      ? data.length - 1
      : data.length
    )

    result.buffer = Buffer.from(data, 'binary')

    // if this is the beginning of the file
    // try and adding the file mime type info
    if (offset === 0) {
      try {
        const type = fileType(result.buffer)
        result = { ...type, ...result }
      } catch (e) {
        debug('albumart file type detection failed')
      }
    }

    return result
  } catch (e) {
    debug('error fetching cover for %s, offset %s', uri, offset)
    client.socket.setEncoding('utf8')
    throw e
  }
}

/**
 * Fetch whole album art and return a full buffer
 * @yields Object {
 *  ext: '.jpg',
 *  mime: 'image/jpg',
 *  size: number,
 *  buffer: Buffer<binary>
 * }
 */
exports.albumartWhole = client => async uri => {
  const fetch = exports.albumart(client)

  const result = await fetch(uri, 0)
  let { size, binary: read } = result
  const buffers = [result.buffer]

  while (read < size) {
    let tmp = await fetch(uri, read)
    read = read + tmp.binary
    buffers.push(tmp.buffer)
  }

  debug('albumartWhole read %s times to fetch whole cover', buffers.length + 1)

  const buffer = Buffer.concat(buffers)
  result.buffer = buffer
  delete result.binary
  return result
}

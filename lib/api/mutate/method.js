'use strict'
const mpd = require('mpd2')
const { parseObject } = mpd
const fileType = require('file-type')

const debug = require('../../debug')('mutate:method')

const METHOD_META_LINES = {
  albumart: 2,
  readpicture: 3,
}

/**
 * Custom implementation because client's connection
 * needs to switch to binary mode
 * also first two/three lines representing
 *  - song size and
 *  - read bytes (and
 *  - type if method is readpicture)
 * are parsed into an object
 *
 * If offset is 0 then meta data is detected using
 * `file-type` module and attached to response
 *
 * @yields Object {
 *  size: cover size
 *  binary: read bytes
 *  buffer: Buffer<binary>
 *  type: string (if method is 'readpicture')
 *
 *  // if offset === 0:
 *  ext: cover's extension (.jpg)
 *  mime: cover's mime type (image/jpeg)
 *
 * }
 */
const mpdImgMethod = (client, method) => async (uri, offset) => {
  // to get a proper response, encoding on the
  // socket needs to be set to binary, otherwise
  // characters unknown to utf8 are replaced with
  // `fd` or something and binary data can not
  // be reconstructed any more.
  client.socket.setEncoding('binary')
  try {
    let data = await client.sendCommand(mpd.cmd(method, uri, offset))
    client.socket.setEncoding('utf8')

    // first n lines are meta info the rest is binary
    const metaLines = METHOD_META_LINES[method]
    const nl = nthCharInString(data, '\n', metaLines)
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
        const type = await fileType.fromBuffer(result.buffer)
        result = { ...type, ...result }
      } catch (e) {
        debug('%s file type detection failed', method)
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
 *  type: string (if method is 'readpicture')
 * }
 */
const mpdImgMethodWholeDownload = (client, method) => async (uri) => {
  const fetch = mpdImgMethod(client, method)

  const result = await fetch(uri, 0)
  let { size, binary: read } = result
  const buffers = [result.buffer]

  while (read < size) {
    let tmp = await fetch(uri, read)
    read = read + tmp.binary
    buffers.push(tmp.buffer)
  }

  debug(`${method}Whole read %s times to fetch whole cover`, buffers.length + 1)

  const buffer = Buffer.concat(buffers)
  result.buffer = buffer
  delete result.binary
  return result
}

function nthCharInString (str, ch, n) {
  let pos = -1
  while(n-- > 0) {
    pos = str.indexOf(ch, pos + 1)
    if (pos === -1) {
      break
    }
  }

  return pos
}


exports.albumart = client => mpdImgMethod(client, 'albumart')
exports.albumartWhole = client => mpdImgMethodWholeDownload(client, 'albumart')

exports.readpicture = client => mpdImgMethod(client, 'readpicture')
exports.readpictureWhole = client => mpdImgMethodWholeDownload(client, 'readpicture')

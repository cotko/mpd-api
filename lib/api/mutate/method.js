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

    // A song with no picture gets a bare `OK`: no meta lines, so nothing
    // to parse. Answer with an empty picture rather than crash.
    if (result == null) return { size: 0, binary: 0, buffer: Buffer.alloc(0) }

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


exports.albumart = (client, methodSpec) => mpdImgMethod(client, methodSpec.mpdcmd)
exports.albumartWhole = (client, methodSpec) => mpdImgMethodWholeDownload(client, methodSpec.mpdcmd)

exports.readpicture = (client, methodSpec) => mpdImgMethod(client, methodSpec.mpdcmd)
exports.readpictureWhole = (client, methodSpec) => mpdImgMethodWholeDownload(client, methodSpec.mpdcmd)

/*
 * Ratings, likes, play and skip counts: sticker names and values that
 * MPD clients agreed on (https://github.com/jcorporation/mpd-stickers,
 * used by myMPD, Euphonica, rmpc, Cantata, ...), so what one client
 * records, the others show.
 *
 *   rating       integer 0-10 (5 stars with half stars)
 *   like         0 dislike, 1 neutral, 2 like
 *   playCount    integer
 *   skipCount    integer
 *   lastPlayed   unix timestamp (seconds)
 *   lastSkipped  unix timestamp (seconds)
 *   elapsed      position in the song (seconds), to resume
 *
 * Each method gets the sticker type first: bound in the spec for songs,
 * playlists and filters (`@method setRating sticker song`), passed by the
 * caller for tags (`api.stickerTag.setRating('Album', 'Abbey Road', 8)`).
 */
const STICKER_NUMBERS = [
  'rating', 'like', 'playCount', 'skipCount',
  'lastPlayed', 'lastSkipped', 'elapsed'
]

const stickerCmd = (sub, type, uri, ...rest) =>
  mpd.cmd('sticker', [sub, type, uri].concat(rest))

const unixNow = () => Math.floor(Date.now() / 1000)

const wholeNumberIn = (value, min, max, what) => {
  const n = Number(value)
  if (!Number.isInteger(n) || n < min || n > max) {
    throw new RangeError(`${what} must be a whole number from ${min} to ${max}`)
  }
  return n
}

// one sticker as a number; undefined when it isn't set
const getNumber = (client, name) => async (type, uri) => {
  try {
    const msg = await client.sendCommand(stickerCmd('get', type, uri, name))
    const sticker = parseObject(msg)
    const value = sticker && String(sticker.sticker).split('=').slice(1).join('=')
    const n = Number(value)
    return value === '' || value === undefined || Number.isNaN(n) ? undefined : n
  } catch (e) {
    if (e.code === 'NO_EXIST') return undefined
    throw e
  }
}

exports.stickerGetRating = client => getNumber(client, 'rating')
exports.stickerGetLike = client => getNumber(client, 'like')

/**
 * @param type, uri
 * @param rating 0-10
 */
exports.stickerSetRating = client => (type, uri, rating) => client.sendCommand(
  stickerCmd('set', type, uri, 'rating', wholeNumberIn(rating, 0, 10, 'rating')))

/**
 * @param type, uri
 * @param like 0 dislike, 1 neutral, 2 like
 */
exports.stickerSetLike = client => (type, uri, like) => client.sendCommand(
  stickerCmd('set', type, uri, 'like', wholeNumberIn(like, 0, 2, 'like')))

/**
 * favourite = like 2; not a favourite (any more) = neutral, 1
 * @param type, uri
 * @param [favourite=true]
 */
exports.stickerSetFavourite = client => (type, uri, favourite = true) =>
  client.sendCommand(stickerCmd('set', type, uri, 'like', favourite ? 2 : 1))

/**
 * playCount + 1 and lastPlayed = now (or `at`, unix seconds)
 */
exports.stickerIncPlayCount = client => (type, uri, at = unixNow()) =>
  client.sendCommands([
    stickerCmd('inc', type, uri, 'playCount', 1),
    stickerCmd('set', type, uri, 'lastPlayed', Math.floor(at))
  ])

/**
 * skipCount + 1 and lastSkipped = now (or `at`, unix seconds)
 */
exports.stickerIncSkipCount = client => (type, uri, at = unixNow()) =>
  client.sendCommands([
    stickerCmd('inc', type, uri, 'skipCount', 1),
    stickerCmd('set', type, uri, 'lastSkipped', Math.floor(at))
  ])

/**
 * where to resume the song (seconds)
 */
exports.stickerSetElapsed = client => (type, uri, seconds) => {
  const n = Number(seconds)
  if (!Number.isFinite(n) || n < 0) {
    throw new RangeError('elapsed must be a number of seconds >= 0')
  }
  return client.sendCommand(stickerCmd('set', type, uri, 'elapsed', Math.floor(n)))
}

/**
 * all stickers of the object; the conventional ones (rating, like,
 * playCount, skipCount, lastPlayed, lastSkipped, elapsed) as numbers
 */
exports.stickerGetStats = client => async (type, uri) => {
  let msg
  try {
    msg = await client.sendCommand(stickerCmd('list', type, uri))
  } catch (e) {
    if (e.code === 'NO_EXIST') return {}
    throw e
  }
  const stats = {}
  for (const line of String(msg).split('\n')) {
    if (!line.startsWith('sticker: ')) continue
    const keyval = line.substring('sticker: '.length)
    const eq = keyval.indexOf('=')
    if (eq === -1) continue
    const key = keyval.substring(0, eq)
    const val = keyval.substring(eq + 1)
    const n = Number(val)
    stats[key] = STICKER_NUMBERS.indexOf(key) !== -1 && val !== '' && !Number.isNaN(n)
      ? n
      : val
  }
  return stats
}

'use strict'

// on/off for MPD: true/false, 1/0 and the strings "1"/"0", "true"/"false",
// "on"/"off" (a non-empty string used to always mean on, "0" too)
const OFF_STRINGS = ['', '0', 'false', 'off']
const onOff = val => {
  const on = typeof val === 'string'
    ? !OFF_STRINGS.includes(val.trim().toLowerCase())
    : !!val
  return on ? 1 : 0
}

exports.boolAt = pos => (...args) => {
  args[pos] = onOff(args[pos])
  return args
}

// on/off, or "oneshot" (MPD >= 0.21 for single, >= 0.24 for consume)
const onOffOneshot = (...args) => {
  if (args[0] !== 'oneshot') {
    args[0] = onOff(args[0])
  }
  return args
}

exports.consume = onOffOneshot

exports.dbList = (tag, filter, ...groups) => {
  const args = groups.flatMap(group => ['group', group])
  if (filter !== false) {
    args.unshift(filter)
  }
  args.unshift(tag)
  return args.filter(s => !!s)
}

exports.stickerSet = (...args) => {
  // remove `=` from the sticker name as this
  // is delimiter between key and value in MPD
  let name = args[1]
  if (typeof name === 'string' && name.indexOf('=') !== -1) {
    args[1] = name.replace(/=/g, ' ')
  }
  return args
}

exports.stickerDel = exports.stickerSet

/**
 * @param name
 * @param [uri='']
 */
exports.stickerFind = (...args) => {
  // reverse  uri and sticker name and
  // default uri to ''
  let [name, uri] = args
  if (typeof uri !== 'string') {
    uri = ''
  }
  // fix to MPD arg order
  args[0] = uri
  args[1] = name
  return args
}

/**
 * @param name
 * @param value
 * @param [comparator='=']
 * @param [uri='']
 */
exports.stickerSearch = (...args) => {
  let [name, value, comparator, uri] = args
  if (typeof comparator !== 'string') {
    comparator = '='
  }
  if (typeof uri !== 'string') {
    uri = ''
  }
  // fix to MPD arg order
  args[0] = uri
  args[1] = name
  args[2] = comparator
  args[3] = value
  return args
}

/**
 * @param uri
 * @param name
 * @param [value=1]
 */
exports.stickerInc = (...args) => {
  if (args[2] === undefined) {
    args[2] = 1
  }
  return exports.stickerSet(...args)
}

// stickers on tags (stickerTag namespace): the tag type comes first,
// e.g. ('Album', 'Abbey Road', 'rating', 8); the rest is as for songs
const tagFirst = mutator => (tag, ...args) => [tag].concat(mutator(...args))

exports.tagStickerSet = tagFirst(exports.stickerSet)
exports.tagStickerDel = tagFirst(exports.stickerDel)
exports.tagStickerInc = tagFirst(exports.stickerInc)
exports.tagStickerFind = tagFirst(exports.stickerFind)
exports.tagStickerSearch = tagFirst(exports.stickerSearch)

/**
 * @param {Number|boolean}
 */
exports.mixrampdelay = (...args) => {
  if (args[0] === false) {
    args[0] = 'nan' // disables the mixrampdb
  }
  return args
}

exports.single = onOffOneshot

exports.replaygain = (...args) => {
  if (args[0] === false) {
    args[0] = 'off'
  }
  return args
}

'use strict'

exports.boolAt = pos => (...args) => {
  args[pos] = args[pos] ? 1 : 0
  return args
}

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
 * @param {Number|boolean}
 */
exports.mixrampdelay = (...args) => {
  if (args[0] === false) {
    args[0] = 'nan' // disables the mixrampdb
  }
  return args
}

exports.single = (...args) => {
  if (typeof args[0] !== 'string') {
    args[0] = args[0] ? 1 : 0
  }
  return args
}

exports.replaygain = (...args) => {
  if (args[0] === false) {
    args[0] = 'off'
  }
  return args
}

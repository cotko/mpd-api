'use strict'
const debug = require('../../debug')('mutate:reducer')
const { parseStickerString } = require('./parser')

const getListInfoTarget = item => item.playlist
  ? 'playlist'
  : item.directory
    ? 'directory'
    : 'file'

exports.pickBy = key => list => list.map(item => item[key])
exports.pickFirst = obj => obj[Object.keys(obj)[0]]

exports.dbList = list => list.map(entry => {
  if (entry.file && entry.file instanceof Array) {
    entry.file = entry.file.map(item => item.file)
  }
  return entry
})

exports.dbListInfo = list => list.reduce((memo, item) => {
  let target = getListInfoTarget(item)
  memo[target].push(item)
  return memo
}, {
  playlist: [],
  file: [],
  directory: []
})

// exports.dbListInfoFull = list => list.reduce((memo, item) => {
//  let target = getListInfoTarget(item)
//  memo[target].push(item)
//  return memo
// }, {
//  playlist: [],
//  file: [],
//  directory: []
// })

exports.stickerList = stickers => stickers.reduce((acc, entry) => {
  let keyval = parseStickerString(entry.sticker)
  if (keyval === null) {
    debug('ignoring invaid sticker')
    return acc
  }
  acc[keyval.key] = keyval.val
  return acc
}, {})

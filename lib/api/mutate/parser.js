'use strict'
const mpd = require('mpdjs')
const { parseList, parseNestedList, parseListAndAccumulate, parseObject } = mpd
const debug = require('../../debug')('mutate:reducer')

exports.list = parseList
exports.nestedList = parseNestedList
exports.accumulateList = parseListAndAccumulate
exports.object = parseObject

exports.songs = parseList.by('file')

/**
 * ensures non empty object
 */
exports.objectEnsure = msg => {
  const result = parseObject(msg)
  return result != null ? result : {}
}

exports.songList = parseList.by('song')
exports.dbListInfo = parseList.by('directory', 'file', 'playlist')

exports.parseStickerString = sticker => {
  const eqPos = (sticker + '').indexOf('=')
  if (eqPos === -1) {
    debug('invaid sticker, missing `=`: %O', sticker)
    return null
  }
  let key = sticker.substring(0, eqPos)
  return { key, val: sticker.substring(eqPos + 1) }
}

exports.stickerFindList = msg => parseList(msg)
  .map(item => {
    const sticker = exports.parseStickerString(item.sticker)
    item[sticker.key] = sticker.val
    return item
  })

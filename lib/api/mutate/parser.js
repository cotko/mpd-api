'use strict'
const mpd = require('mpdjs')
const { parseList, parseNestedList, parseObject } = mpd

const identity = a => a


exports.list = parseList
exports.nestedList = parseNestedList
exports.object = parseObject

exports.songList = parseList.by('song')
exports.dbListInfo = parseList.by('directory', 'file', 'playlist')



// for testing the output
// TODO: remove this
exports.slice = list => list.slice(100)

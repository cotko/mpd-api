'use strict'
const identity = a => a

const getListInfoTarget = item => item.playlist
  ? 'playlist'
  : item.directory
    ? 'directory'
    : 'file'

exports.dbListInfo = list => list.reduce((memo, item) => {
  let target = getListInfoTarget(item)
  memo[target].push(item[target])
  return memo
}, {
  playlist: [],
  file: [],
  directory: []
})

exports.dbListInfoFull = list => list.reduce((memo, item) => {
  let target = getListInfoTarget(item)
  memo[target].push(item)
  return memo
}, {
  playlist: [],
  file: [],
  directory: []
})

exports.pickBy = key => list => list.map(item => item[key])

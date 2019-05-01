'use strict'

exports.dbList = (tag, filter, ...groups) => {
  const args = groups.flatMap(group => ['group', group])
  if (filter) {
    args.unshift(filter)
  }
  args.unshift(tag)
  return args.filter(s => !!s)
}

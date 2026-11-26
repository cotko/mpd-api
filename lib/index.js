'use strict'
const mpd = require('mpd2')
const api = require('./api')


const connect = async config => {
  const client = await mpd.connect(config)
  await api.apifyClient(client)
  return client
}

/**
 * The filter expression MPD clients agreed on for album stickers
 * (https://github.com/jcorporation/mpd-stickers), for api.stickerFilter:
 *   ((AlbumArtist == "<AlbumArtist>") AND (Album == "<Album>") AND (Date == "<Date>"))
 * Its exact form matters (order, spacing, quotes): other clients look the
 * album up by this string. Date is left out when the album has none.
 */
const stickerAlbumFilter = ({ albumArtist, album, date }) => {
  const value = v => `"${String(v).replace(/[\\"]/g, '\\$&')}"`
  const parts = [
    `(AlbumArtist == ${value(albumArtist)})`,
    `(Album == ${value(album)})`
  ]
  if (date !== undefined && date !== null && date !== '') {
    parts.push(`(Date == ${value(date)})`)
  }
  return `(${parts.join(' AND ')})`
}

exports.mpd = mpd
exports.connect = connect
exports.stickerAlbumFilter = stickerAlbumFilter

exports.default = { mpd, connect, stickerAlbumFilter }

'use strict'
const mpd = require('mpdjs')
const api = require('./api')

exports.mpd = mpd

exports.connect = async config => {
  const client = await mpd.connect(config)
  await api.apifyClient(client)
  return client
}

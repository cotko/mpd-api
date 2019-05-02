'use strict'
const mpd = require('mpd2')
const api = require('./api')

exports.mpd = mpd

exports.connect = async config => {
  const client = await mpd.connect(config)
  await api.apifyClient(client)
  return client
}

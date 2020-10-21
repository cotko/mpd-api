'use strict'
const mpd = require('mpd2')
const api = require('./api')


const connect = async config => {
  const client = await mpd.connect(config)
  await api.apifyClient(client)
  return client
}

exports.mpd = mpd
exports.connect = connect

exports.default = { mpd, connect }

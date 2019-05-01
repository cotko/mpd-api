'use strict'
const mpd = require('mpdjs')
const api = require('./api')
const test = require('../test')



mpd.connect({
  path: '~/.config/mpd/socket',
  //host: 'localhost',
  //port: 6600,
  password: 'password'
})
.then(async client => {
  await api.apifyClient(client)

  // TODO remove this
  await test.test(client)
})

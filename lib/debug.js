'use strict'
const path = require('path')
const debug = require('debug')
const pkg = require('../package.json').name

exports = module.exports = tag => debug(`${pkg}:${tag}`)

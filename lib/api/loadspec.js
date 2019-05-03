'use strict'
const fs = require('fs')
const path = require('path')

const docgen = process.argv.indexOf('--doc') !== -1
const debug = require('../debug')('loadspec')

const SPEC = {
  loaded: false
}

exports.load = async () => {
  if (SPEC.loaded === undefined) {
    return SPEC
  }

  docgen ? debug('loading full spec for documentation') : debug('loading')

  delete SPEC.loaded

  const specFiles = await readSpecFiles(path.join(__dirname, 'spec'))

  for (let file of specFiles) {
    let spec = await parseSpec(file)
    for (let key in spec) {
      SPEC[key] = spec[key]
    }
  }

  return SPEC
}

const readSpecFiles = dir => new Promise((resolve, reject) => {
  fs.readdir(dir, async (err, list) => {
    if (err) {
      debug('error rading dir %s', dir)
      return reject(err)
    }

    resolve(list
      .filter(file => file.endsWith('.spec'))
      .map(file => path.join(dir, file)))
  })
})

const parseSpec = async file => fs
  .readFileSync(file)
  .toString()
  .split('\n')
  .filter(s => s[0] === '@')
  .map(s => {
    // inline comments
    let cidx = s.indexOf('#')
    return cidx === -1
      ? s
      : s.substring(0, cidx)
  })
  .map(s => s.trim())
  .reduce((memo, line) => {
    let [type, ...args] = line.split(/\s+/g)
    type = type.substring(1)

    let ns = memo.ns
    switch (type) {
      case 'ns':
        ns = {}
        memo.ns = ns
        memo.spec[args[0]] = ns
        debug('api\n  .%s', args[0])
        break
      case 'method':
        throwIfMissing(ns, 'ns', type, file, args)
        let [name, mpdcmd, ...boundArgs] = args
        if (ns[name]) {
          throwErr(`Err method '${name}' is already defined`, args, file)
        }
        let method = {
          mpdcmd: mpdcmd || name,
          boundArgs
        }
        ns[name] = method
        memo.method = method
        debug('    .%s', name)
        break
      case 'use':
        throwIfMissing(memo.method, 'method', type, file, args)
        let useMethod = args[0]
        let mname = memo.method.mpdcmd
        if (useMethod === undefined) {
          throwErr(
            `Err @use expected implementation method name for ${mname}`
            , args, file)
        }
        debug('    %s using `%s` imeplementation', mname, useMethod)
        memo.method.useMethod = useMethod
        break
      case 'parser':
      case 'reducer':
      case 'arguments':
      case 'error':
        throwIfMissing(memo.method, 'method', type, file, args)
        args = args.map(parseMutator)
        if (memo.method[type] instanceof Array) {
          // any of those can be repeated, in this case
          // append new ones to existing list
          memo.method[type] = memo.method[type].concat(args)
        } else {
          memo.method[type] = args
        }
        break

      default:
        if (docgen) {
          let target = memo.ns._doc
          if (!target) {
            memo.ns._doc = target = []
          }
          target.push({ type, line, args })
        }
        break
    }

    return memo
  }, {
    spec: {}
  })
  .spec

const parseMutator = mutator => {
  let path = mutator.split('.')
  let method = path[path.length - 1]
  let argPos = method.indexOf('(')
  let hasArgs = argPos !== -1

  // just a name of the mutator
  if (!hasArgs) {
    return { path }
  }

  let [fn, ...args] = method.split(/\(|\)|,/).filter(s => s.length)
  // replace with just a name of the mutor
  path[path.length - 1] = fn

  return { path, args }
}

const throwIfMissing = (obj, key, type, file, args) => {
  if (typeof obj !== 'object' || obj == null) {
    throw new Error(`Missing "${key}" for "${type}" [${args}] in ${file}`)
  }
}

const throwErr = (msg, args, file) => {
  throw new Error(`${msg} [${args}] in ${file}`)
}

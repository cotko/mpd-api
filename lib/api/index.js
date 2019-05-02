'use strict'
const mpd = require('mpd2')

const loadspec = require('./loadspec')
const { useMethod, compose, errors, getMutator } = require('./mutate')
const { cmd } = mpd

const debug = require('../debug')('api')

exports.apifyClient = async client => {
  debug('apifiying client')

  const spec = await loadspec.load()
  const callMPDBound = callMPDMethod(client)

  const api = {}
  for (let ns in spec) {
    let nsspec = spec[ns]
    api[ns] = {}
    for (let method in nsspec) {
      debug(' registrating api.%s.%s', ns, method)
      api[ns][method] = callMPDBound(nsspec[method])
    }
  }
  client.api = api
  debug('client ready')
  return client
}

const callMPDMethod = client => methodSpec => {
  const runMutators = compose([
    getMutator('parser', methodSpec.parser),
    getMutator('reducer', methodSpec.reducer)
  ])

  const argMutators = compose([
    getMutator('args', methodSpec.arguments)
  ], true)

  const handleErr = errors([
    getMutator('error', methodSpec.error)
  ])

  if (methodSpec.useMethod) {
    return useMethod(methodSpec.useMethod)(client)
  }

  return async (...args) => {
    if (argMutators) {
      args = argMutators(args)
    }

    // push the default arguments if present
    if (methodSpec.boundArgs && methodSpec.boundArgs.length) {
      args = methodSpec.boundArgs.concat(args)
    }

    return client
      .sendCommand(cmd(methodSpec.mpdcmd, args))
      .then(runMutators)
      .catch(handleErr)
  }
}

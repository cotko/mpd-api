'use strict'
const debug = require('../../debug')('mutate')
const lookup = {
  reducer: require('./reducer'),
  parser: require('./parser'),
  args: require('./argument'),
  error: require('./error'),
  method: require('./method')
}

exports.getMutator = (type, mutList) => {
  if (mutList == null) {
    return null
  }

  return mutList.map(mutatorSpec => {
    let mutator = resolveMutatorPath(lookup[type], mutatorSpec.path)
    if (!mutator) {
      throw new Error(`Err invalid ${type} "${mutatorSpec.path.join('.')}"`)
    }
    if (mutatorSpec.args) {
      debug('calling %s wrapper with args: %s(%s)', type,
        mutatorSpec.path.join('.'), mutatorSpec.args)

      mutator = mutator(mutatorSpec.args)
    }

    return mutator
  })
}

exports.compose = (mutatorsList, flattenArgs = false) => {
  const mutators = mutatorsList.flat().filter(s => !!s)
  // since this will be used as promise.then(compiled)
  // use null if the list is empty to avoid invoking
  // of reducer which just returns same data
  return mutators.length === 0
    ? null
    : data => mutators.reduce((curr, mutator) =>
      flattenArgs
        ? mutator.apply(null, curr)
        : mutator(curr)
    , data)
}

exports.errors = mutatorsList => {
  // do whatever mutators will do
  // and if error is returned, then
  // throw that error
  const mutators = mutatorsList.flat().filter(s => !!s)
  return mutators.length === 0
    ? null
    : err => {
      err = mutators.reduce((curr, mutator) => mutator(curr), err)
      if (err) {
        throw err
      }
    }
}

exports.useMethod = methodName => {
  const method = resolveMutatorPath(lookup.method, [methodName])
  if (typeof method !== 'function') {
    throw new Error(`Err invalid method "${methodName}"`)
  }
  return method
}

const resolveMutatorPath = (source, path) => path
  .reduce((target, key) => target ? target[key] : null, source)

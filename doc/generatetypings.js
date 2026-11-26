'use strict'
const fs = require('fs')
const path = require('path')
// const util = require('util')
const { loadDoc, MPD_PROTO_URL } = require('./load')
const { ARGS_TS, STICKER_METHODS_TS, METHODS_TS } = require('./signatures')

const TPL_PATH = path.join(__dirname, 'typings.tpl')
const TYPINGS_PATH = path.join(__dirname, '..', 'lib', 'index.d.ts')
const TPL = fs.readFileSync(TPL_PATH).toString()

const INDENT = parseInt(
  (process.argv.find(arg => arg.startsWith('--indent')) || '=0')
    .split('=').pop()
)

// true for objects, string for others
// (pickBy / pickFirst are typed in RETURN_TYPE_OVERRIDE)
const RETURN_TYPE_IS_NOT_LIST = {
  parser: {
    object: true
  },
  reducer: {
    pickFirst: true,
    dbListInfo: true,
    stickerList: true
  }
}

// reducers that don't return objects: [generic declaration, return type]
//   pickBy:    a list of one field, e.g. tag type names
//   pickFirst: the first value: an id (addid), a sticker value, a song …
const RETURN_TYPE_OVERRIDE = {
  pickBy: ['<T = string>', 'T[]'],
  pickFirst: ['<T = any>', 'T']
}

const generateTypings = async () => {
  const spec = await loadDoc(true)

  const typings = spec
    .map(genNSTypings)
    .join('\n')

  const typingsResult = TPL.replace('{API_NAMESPACES}', typings)

  fs.writeFileSync(TYPINGS_PATH, typingsResult)

  console.log('written.')
}

const genNSTypings = ns => {
  const indent = indentStr(INDENT)

  const comments = [
    '/**',
    ns.doc.map(doc =>
      doc.type === 'desc'
        ? doc.args.join(' ')
        : doc.type === 'linkmpd'
          ? `[MPD doc](${getMPDDocLink(doc)})`
          : ''
    ).map(line => ` * ${line}`),
    ' */'
  ].flat()

  const nstype = comments
    .concat(
      `${ns.ns}: {`
    )
    .concat(genNSMethodTypings(ns))
    .concat('},')

  return nstype
    .map(line => `${indent}${line}`)
    .join('\n')
}

const genNSMethodTypings = ns => {
  const indent = indentStr(2)

  return ns.methods
    .map(getMethodTyping)
    .flat()
    .map(line => `${indent}${line}`)
}

const getMPDDocLink = spec => `${MPD_PROTO_URL}${spec.args[0].replace('!', '#')}`

const getMethodTyping = method => {
  const indent = indentStr(2)
  let [declareType, retType] = getMethodReturnType('T', method.spec)

  const comment = [
    '/**',
    ` * mpd command: \`${[method.spec.mpdcmd].concat(method.spec.boundArgs || []).join(' ')}\``,
    ' */'
  ]

  let argOverriden = method.spec.arguments
    ? ARGS_TS[method.spec.arguments[method.spec.arguments.length - 1].path.join('.')]
    : false

  const stickerMethod = STICKER_METHODS_TS[method.spec.useMethod]
  if (stickerMethod) {
    const bound = method.spec.boundArgs && method.spec.boundArgs.length
    argOverriden = `(${bound ? '' : 'tag: string, '}${stickerMethod.args})`
    declareType = ''
    retType = stickerMethod.retType
  } else if (!argOverriden && method.spec.useMethod) {
    const useMethodSpec = METHODS_TS[method.spec.useMethod]
    argOverriden = useMethodSpec.args
    declareType = useMethodSpec.declareType
    retType = useMethodSpec.retType
  }

  const methods = [
    argOverriden
      ? [
          argOverriden
        ]
      : [
          '(args?: (string | number | MPD.Command)[])',
          '(...args: (string | number | MPD.Command)[])'
        ]
  ]
    .flat()
    .map(methodStr => `${indent}${declareType}${methodStr}: Promise<${retType}>;`)

  return [
    comment,
    `${method.method}: {`
  ]
    .flat()
    .concat(
      methods
    )
    .concat(['}'])
}

const getMethodReturnType = (typ = 'T', spec) => {
  let notList = false
  const keys = Object.keys(spec).reverse()
  let parsersFound = false
  for (const key of keys) {
    if (key === 'reducer') {
      const override = RETURN_TYPE_OVERRIDE[spec.reducer[spec.reducer.length - 1].path[0]]
      if (override) return override
      notList = RETURN_TYPE_IS_NOT_LIST
        .reducer[spec.reducer[spec.reducer.length - 1].path.join('.')]
      parsersFound = true
      break
    } else if (key === 'parser') {
      notList = RETURN_TYPE_IS_NOT_LIST
        .parser[spec.parser[spec.parser.length - 1].path.join('.')]
      parsersFound = true
      break
    }
  }

  const declareType = parsersFound
    ? typeof notList === 'string'
      ? ''
      : `<${typ} extends object>`
    : ''

  const retType = parsersFound
    ? notList
      ? typeof notList === 'string'
        ? notList
        : typ
      : `${typ}[]`
    : 'void'

  return [declareType, retType]
}

const indentStr = indent => Array(indent + 1).join(' ')

generateTypings()

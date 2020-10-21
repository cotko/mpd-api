'use strict'
const fs = require('fs')
const path = require('path')
// const util = require('util')
const { loadDoc, MPD_PROTO_URL } = require('./load')

const TPL_PATH = path.join(__dirname, 'typings.tpl')
const TYPINGS_PATH = path.join(__dirname, '..', 'lib', 'index.d.ts')
const TPL = fs.readFileSync(TPL_PATH).toString()

const INDENT = parseInt(
  (process.argv.find(arg => arg.startsWith('--indent')) || '=0')
    .split('=').pop()
)

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
  console.log(method)
  const [
    declareType,
    retType
  ] = getMethodReturnType('T', method.spec)
  return [
    `${method.method}: {`,
    `${indent}${declareType}(args?: (string | typeof mpd.Command)[]): Promise<${retType}>;`,
    `${indent}${declareType}(...args: (string | typeof mpd.Command)[]): Promise<${retType}>;`,
    '}'
  ]
}

const getMethodReturnType = (typ = 'T', spec) => {
  let notList = false
  let keys = Object.keys(spec).reverse()
  let parsersFound = false
  for (let key of keys) {
    if (key === 'reducer') {
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
    ? `<${typ} extends Object>`
    : ''

  const retType = parsersFound
    ? notList ? typ : `${typ}[]`
    : 'void'

  return [declareType, retType]
}

const indentStr = indent => Array(indent + 1).join(' ')

generateTypings()

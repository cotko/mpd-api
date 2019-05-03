'use strict'
const util = require('util')
const loadspec = require('../lib/api/loadspec')
const pkg = require('../package.json')
const fs = require('fs')
const path = require('path')

const MPD_PROTO_URL = 'https://www.musicpd.org/doc/html/protocol.html'

const log = (...args) => console.log(
  util.inspect(args, {depth: null, colors: true}))

let MUT_ARG_METHODS
const MUT_ARG_LINK = 'lib/api/mutate/argument.js'

let MUT_FN_METHODS
const MUT_FN_LINK = 'lib/api/mutate/method.js'

const READMEFILE = path.join(__dirname, '../README.md')


// generate simple md file based on method specs

const genDoc = async () => {
  const spec = await loadspec.load()
  //log(spec)
  const sections = []
  for (let ns in spec) {
    let methods = spec[ns]
    let section = {
      ns,
      doc: methods._doc,
      methods: []
    }
    for (let method in methods) {
      if (method.startsWith('_')) {
        continue
      }
      section.methods.push(await genMethod(ns, method, methods[method]))
    }
    sections.push(section)
  }

  return `

### API

${sections.map(genSection).join('')}

`
}


const genMethod = async (ns, method, spec) => {
  //console.log(method, spec)
  const { useMethod, mpdcmd, boundArgs, error, arguments: args } = spec

  const oMethod = `async ${ns}.<b>${method}</b>(...args)`

  const hasBoundArgs = boundArgs && boundArgs.length
  const notes = []

  let bargs = ' '
  if (hasBoundArgs) {
    bargs = ` <em>${boundArgs.join(', ')}</em>, `
  }

  let mCmd
  if (useMethod) {

    const useMethodFileInfo = MUT_FN_METHODS[useMethod]
    if (useMethodFileInfo === undefined) {
      console.error(
        'can not find useMethod mutator method',
        ns, method, spec
      )
      process.exit(1)
    }
    const linepos = useMethodFileInfo.linepos
    const link = `<a href="${MUT_FN_LINK}#L${linepos}">${useMethod}</a>`

    mCmd = `<tt>${link}</tt>`
  } else {
    mCmd = `<tt>${mpdcmd}${bargs}...args</tt>`
  }
  const mdMethod = `<tt>${oMethod}</tt> --> ${mCmd}`

  const wrap = error || args || hasBoundArgs || notes.length

  if (!wrap) {
    return mdMethod
  }


  if (hasBoundArgs) {
    notes.push(`
method binds arguments which can not be changed
`)

  }
  if (args) {
    let links = args.map(arg => {
      const aMethod = arg.path.join('.')
      if (!MUT_ARG_METHODS[aMethod]) {
        console.error(
          'can not find argument mutator method',
          arg, ns, spec
        )
        process.exit(1)
      }
      const linepos = MUT_ARG_METHODS[aMethod].linepos
      return `<a href="${MUT_ARG_LINK}#L${linepos}">${aMethod}</a>`
    })



notes.push(`
method reorderes or augments passed arguments, see ${links}
`)

  }

  if (error) {
    const errors = error.map(err => `
method ${err.path}s <b>${err.args[0]}</b>, expect *undefined* in this case   
    `)
    notes.push(errors)
  }



  return `<details>
<summary>${mdMethod}</summary>
<p>
${notes.join('')}
</p>
</details>`
}

const genSection = spec => {
  const { methods, ns, doc } = spec

  const mdDoc = doc ? genSectionHead(doc) : ''

  return `
${mdDoc}
${methods.join('\n\n')}

`

}

const genSectionHead = doc => {
  const meta = doc.reduce((acc, item) => {
    switch (item.type) {
      case 'linkmpd':
        let link = `${MPD_PROTO_URL}${item.args[0].replace('!', '#')}`
        acc.link = `[MPD documentation](${link})`
        break
      case 'desc':
        acc.title = `${acc.title} ${item.args.join(' ')}`
        break
    }
    return acc
  }, {title: '', link: ''})
  return `
##### ${meta.title} ${meta.link}

`
}

const loadFileMethods = async file => fs
  .readFileSync(file)
  .toString()
  .split(/\n/g)
  .map(s => s.trim())
  .reduce((methods, line, linepos) => {
    if (!line.startsWith('exports.')) {
      return methods
    }
    const method = line.substring('.exports'.length).split(' ')[0]
    methods[method] = { linepos: linepos + 1 }
    return methods
  }, {})

const loadFiles = async () => {
  MUT_ARG_METHODS = await loadFileMethods(
    path.join(__dirname, '../lib/api/mutate/argument.js'))
  MUT_FN_METHODS = await loadFileMethods(
    path.join(__dirname, '../lib/api/mutate/method.js'))
}

const attachToREADME = async apidoc => {
  console.log('doc README generated')
  if (process.argv.indexOf('--attach') === -1) {
    console.log(apidoc)
    process.exit(0)
  }
  console.log('attaching to %s', READMEFILE)
  const readme = fs.readFileSync(READMEFILE)
    .toString()
    .split('### API')[0]
    + apidoc
  fs.writeFileSync(READMEFILE, readme)
  console.log('updated api doc attached')
}

loadFiles()
.then(genDoc)
.then(attachToREADME)
.catch(e => {
  console.error(e)
  process.exit(1)
})

'use strict'
const loadspec = require('../lib/api/loadspec')

exports.MPD_PROTO_URL = 'https://mpd.readthedocs.io/en/latest/protocol.html'

exports.loadDoc = async (docspec = false) => {
  const spec = await loadspec.load(docspec)
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
      section.methods.push({ ns, method, spec: methods[method] })
    }
    sections.push(section)
  }

  return sections
}

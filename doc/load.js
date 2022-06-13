'use strict'
const loadspec = require('../lib/api/loadspec')

exports.MPD_PROTO_URL = 'https://mpd.readthedocs.io/en/latest/protocol.html'
exports.MPD_GIT_RAW_URL = 'https://raw.githubusercontent.com/MusicPlayerDaemon/MPD'

exports.loadDoc = async (docspec = false) => {
  const spec = await loadspec.load(docspec)
  const sections = []
  for (const ns in spec) {
    const methods = spec[ns]
    const section = {
      ns,
      doc: methods._doc,
      methods: []
    }
    for (const method in methods) {
      if (method.startsWith('_')) {
        continue
      }
      section.methods.push({ ns, method, spec: methods[method] })
    }
    sections.push(section)
  }

  return sections
}

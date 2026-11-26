'use strict'
// Parameters of methods that don't just pass ...args to MPD, shared by
// generatetypings.js (lib/index.d.ts) and generatedoc.js (README.md)

const ARGS_TS = {
  dblist: '(tag: string, filter: string | false, ...group_by_tags: string[])',
  stickerSet: '(uri: string, name: string, value: string | number)',
  stickerDel: '(uri: string, name: string)',
  stickerFind: '(name: string, uri?: string)',
  stickerSearch: '(name: string, value: string, comparator?: string, uri?: string)',
  stickerInc: '(uri: string, name: string, value?: number)',
  tagStickerSet: '(tag: string, uri: string, name: string, value: string | number)',
  tagStickerDel: '(tag: string, uri: string, name: string)',
  tagStickerInc: '(tag: string, uri: string, name: string, value?: number)',
  tagStickerFind: '(tag: string, name: string, uri?: string)',
  tagStickerSearch: '(tag: string, name: string, value: string, comparator?: string, uri?: string)'
}

// custom sticker methods: the sticker type is bound in the spec (song,
// playlist, filter); for tags it's passed first, see stickerTyped()
const STICKER_METHODS_TS = {
  stickerGetRating: { args: 'uri: string', retType: 'number | undefined' },
  stickerSetRating: { args: 'uri: string, rating: number', retType: 'void' },
  stickerGetLike: { args: 'uri: string', retType: '0 | 1 | 2 | undefined' },
  stickerSetLike: { args: 'uri: string, like: 0 | 1 | 2', retType: 'void' },
  stickerSetFavourite: { args: 'uri: string, favourite?: boolean', retType: 'void' },
  stickerIncPlayCount: { args: 'uri: string, at?: number', retType: 'void' },
  stickerIncSkipCount: { args: 'uri: string, at?: number', retType: 'void' },
  stickerSetElapsed: { args: 'uri: string, seconds: number', retType: 'void' },
  stickerGetStats: { args: 'uri: string', retType: 'StickerStats' }
}
const METHODS_TS = {
  albumart: {
    args: '(uri: string, offset?: number)',
    declareType: '<T extends object>',
    retType: 'T'
  },
  albumartWhole: {
    args: '(uri: string)',
    declareType: '<T extends object>',
    retType: 'T'
  },
  readpicture: {
    args: '(uri: string, offset?: number)',
    declareType: '<T extends object>',
    retType: 'T'
  },
  readpictureWhole: {
    args: '(uri: string)',
    declareType: '<T extends object>',
    retType: 'T'
  }
}

// the parameter list of a method, '(uri: string, rating: number)', or
// null when it takes plain ...args
const argsOf = spec => {
  const sticker = STICKER_METHODS_TS[spec.useMethod]
  if (sticker) {
    // tag stickers have no bound type: the tag type comes first
    const bound = spec.boundArgs && spec.boundArgs.length
    return `(${bound ? '' : 'tag: string, '}${sticker.args})`
  }
  if (spec.arguments) {
    const custom = ARGS_TS[spec.arguments[spec.arguments.length - 1].path.join('.')]
    if (custom) return custom
  }
  if (spec.useMethod && METHODS_TS[spec.useMethod]) {
    return METHODS_TS[spec.useMethod].args
  }
  return null
}

module.exports = { ARGS_TS, STICKER_METHODS_TS, METHODS_TS, argsOf }

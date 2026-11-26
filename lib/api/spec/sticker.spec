@ns sticker
@linkmpd !stickers
@desc Stickers on songs (and the sticker database)

# `song` is bound as the type for these methods; stickers on playlists,
# tags and filters (MPD >= 0.24) are in stickerPlaylist, stickerTag and
# stickerFilter. getRating / setRating / ... use the sticker names other
# clients agreed on, see lib/api/mutate/method.js

@method list sticker list song
@parser list
@reducer stickerList

@method set sticker set song
@arguments stickerSet

@method get sticker get song
@parser list
@reducer stickerList pickFirst
@error ignore(NO_EXIST) # can be silenced

@method delete sticker delete song
@arguments stickerDel
@error ignore(NO_EXIST) # can be silenced

@method deleteAll sticker delete song
@error ignore(NO_EXIST) # can be silenced

@method inc sticker inc song
@arguments stickerInc

@method dec sticker dec song
@arguments stickerInc

@method find sticker find song
@arguments stickerFind
@parser stickerFindList

@method search sticker find song
@arguments stickerSearch
@parser stickerFindList

@method getRating sticker song
@use stickerGetRating

@method setRating sticker song
@use stickerSetRating

@method getLike sticker song
@use stickerGetLike

@method setLike sticker song
@use stickerSetLike

@method setFavourite sticker song
@use stickerSetFavourite

@method getStats sticker song
@use stickerGetStats

@method incPlayCount sticker song
@use stickerIncPlayCount

@method incSkipCount sticker song
@use stickerIncSkipCount

@method setElapsed sticker song
@use stickerSetElapsed

# the sticker database (MPD >= 0.24)

@method types stickertypes
@parser list
@reducer pickBy(stickertype)

@method names stickernames
@parser list
@reducer pickBy(name)

@method namesTypes stickernamestypes
@parser list

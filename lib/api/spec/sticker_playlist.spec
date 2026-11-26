@ns stickerPlaylist
@linkmpd !stickers
@desc Stickers on stored playlists

# MPD >= 0.24; uri = the playlist's name. A renamed playlist loses its stickers.

@method list sticker list playlist
@parser list
@reducer stickerList

@method set sticker set playlist
@arguments stickerSet

@method get sticker get playlist
@parser list
@reducer stickerList pickFirst
@error ignore(NO_EXIST) # can be silenced

@method delete sticker delete playlist
@arguments stickerDel
@error ignore(NO_EXIST) # can be silenced

@method deleteAll sticker delete playlist
@error ignore(NO_EXIST) # can be silenced

@method inc sticker inc playlist
@arguments stickerInc

@method dec sticker dec playlist
@arguments stickerInc

@method find sticker find playlist
@arguments stickerFind
@parser stickerFindList

@method search sticker find playlist
@arguments stickerSearch
@parser stickerFindList

@method getRating sticker playlist
@use stickerGetRating

@method setRating sticker playlist
@use stickerSetRating

@method getLike sticker playlist
@use stickerGetLike

@method setLike sticker playlist
@use stickerSetLike

@method setFavourite sticker playlist
@use stickerSetFavourite

@method getStats sticker playlist
@use stickerGetStats

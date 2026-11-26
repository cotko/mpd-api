@ns stickerFilter
@linkmpd !stickers
@desc Stickers on filter expressions

# MPD >= 0.24; uri = the filter, it has to match songs in the database.
# Albums: the filter other clients use comes from stickerAlbumFilter().

@method list sticker list filter
@parser list
@reducer stickerList

@method set sticker set filter
@arguments stickerSet

@method get sticker get filter
@parser list
@reducer stickerList pickFirst
@error ignore(NO_EXIST) # can be silenced

@method delete sticker delete filter
@arguments stickerDel
@error ignore(NO_EXIST) # can be silenced

@method deleteAll sticker delete filter
@error ignore(NO_EXIST) # can be silenced

@method inc sticker inc filter
@arguments stickerInc

@method dec sticker dec filter
@arguments stickerInc

@method find sticker find filter
@arguments stickerFind
@parser stickerFindList

@method search sticker find filter
@arguments stickerSearch
@parser stickerFindList

@method getRating sticker filter
@use stickerGetRating

@method setRating sticker filter
@use stickerSetRating

@method getLike sticker filter
@use stickerGetLike

@method setLike sticker filter
@use stickerSetLike

@method setFavourite sticker filter
@use stickerSetFavourite

@method getStats sticker filter
@use stickerGetStats

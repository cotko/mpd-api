@ns stickerTag
@linkmpd !stickers
@desc Stickers on tag values

# MPD >= 0.24; the tag type comes first, then its value as uri:
#   stickerTag.setRating('Artist', 'Nina Simone', 9)
# The value has to exist in the database.

@method list sticker list
@parser list
@reducer stickerList

@method set sticker set
@arguments tagStickerSet

@method get sticker get
@parser list
@reducer stickerList pickFirst
@error ignore(NO_EXIST) # can be silenced

@method delete sticker delete
@arguments tagStickerDel
@error ignore(NO_EXIST) # can be silenced

@method deleteAll sticker delete
@error ignore(NO_EXIST) # can be silenced

@method inc sticker inc
@arguments tagStickerInc

@method dec sticker dec
@arguments tagStickerInc

@method find sticker find
@arguments tagStickerFind
@parser stickerFindList

@method search sticker find
@arguments tagStickerSearch
@parser stickerFindList

@method getRating sticker
@use stickerGetRating

@method setRating sticker
@use stickerSetRating

@method getLike sticker
@use stickerGetLike

@method setLike sticker
@use stickerSetLike

@method setFavourite sticker
@use stickerSetFavourite

@method getStats sticker
@use stickerGetStats

@ns sticker
@linkmpd !stickers
@desc Stickers

# force `song` as type for all methods because MPD
# only implements this type for stickers

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

@method find sticker find song
@arguments stickerFind
@parser stickerFindList

@method search sticker find song
@arguments stickerSearch
@parser stickerFindList

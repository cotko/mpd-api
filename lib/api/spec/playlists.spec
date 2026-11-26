@ns playlists
@linkmpd !stored-playlists
@desc Stored playlists

@method get listplaylists
@parser list

@method list listplaylist
@parser list

@method listinfo listplaylistinfo
@parser list

# songs in the playlist matching a filter (MPD >= 0.24)
@method search searchplaylist
@parser songs

# number of songs and their total playtime (MPD >= 0.24)
@method length playlistlength
@parser object

@method load

@method add playlistadd

@method clear playlistclear

@method deleteAt playlistdelete

@method move playlistmove

@method rename
@method remove rm
@method save

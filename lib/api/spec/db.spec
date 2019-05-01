@ns db

@method listall
@parser dbListInfo
@reducer dbListInfo

@method listallinfo
@parser dbListInfo
@reducer dbListInfoFull

@method list
@arguments dbList
@parser nestedList

@method listall
@arguments dbList
@parser dbListInfo

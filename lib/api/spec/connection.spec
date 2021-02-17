@ns connection
@linkmpd !connection-settings
@desc Connection settings

@method close
@method kill
@method ping

@method getTagTypes tagtypes
@parser list
@reducer pickBy(tagtype)

@method enableTagTypes tagtypes enable
@method disableTagTypes tagtypes disable
@method clearTagTypes tagtypes clear
@method enableAllTagTypes tagtypes all

@method binarylimit

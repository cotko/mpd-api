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

# MPD >= 0.24
@method getAvailableTagTypes tagtypes available
@parser list
@reducer pickBy(tagtype)

@method resetTagTypes tagtypes reset

# protocol features for this connection (MPD >= 0.24)
@method getProtocolFeatures protocol
@parser list
@reducer pickBy(feature)

@method getAvailableProtocolFeatures protocol available
@parser list
@reducer pickBy(feature)

@method enableProtocolFeatures protocol enable
@method disableProtocolFeatures protocol disable
@method clearProtocolFeatures protocol clear
@method enableAllProtocolFeatures protocol all

# string normalization for search, e.g. strip_diacritics (MPD > 0.24)
@method getStringNormalization stringnormalization
@parser list
@reducer pickBy(stringnormalization)

@method getAvailableStringNormalization stringnormalization available
@parser list
@reducer pickBy(stringnormalization)

@method enableStringNormalization stringnormalization enable
@method disableStringNormalization stringnormalization disable
@method clearStringNormalization stringnormalization clear
@method enableAllStringNormalization stringnormalization all

@method binarylimit

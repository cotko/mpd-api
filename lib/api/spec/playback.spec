@ns playback
@linkmpd !controlling-playback
@linkmpd !playback-options
@desc Playback options and controls

@method next
@method prev previous
@method pause pause 1
@method resume pause 0
@method toggle pause # deprecated, but will remove when not supported
@method play
@method playid
@method stop
@method seekcur
@method seek seek
@method seekid

@method getvol
@parser object

@method consume
@arguments boolAt(0)

@method crossfade
@method mixrampdb

@method mixrampdelay
@arguments mixrampdelay

@method random
@arguments boolAt(0)

@method repeat
@arguments boolAt(0)

@method single
@arguments single

@method setvol
@method setReplayGain replay_gain_mode
@arguments replaygain

@method getReplayGain replay_gain_status
@parser object

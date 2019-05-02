@ns queue
@linkmpd !the-queue
@desc The Queue

@method add

@method addid
@parser object
@reducer pickFirst

@method clear
@method info playlistinfo
@parser songs

@method id playlistid
@parser songs

@method delete
@method deleteid
@method move
@method moveid

@method find playlistfind
@parser songs

@method search
@parser songs


@method prio
@method prioid

@method shuffle

@method swap
@method swapid

@method addtagid
@method cleartagid

@method getChanges plchanges
@parser songs

@method getChangesPosId plchangesposid
@parser list.by(cpos)

@method rangeid

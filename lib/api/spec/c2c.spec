@ns c2c
@linkmpd !client-to-client
@desc Client to client communication


@method list channels
@parser list.by(channel)
@reducer pickBy(channel)

@method subscribe
@error ignore(EXIST) # can be silenced

@method unsubscribe
@error ignore(NO_EXIST) # can be silenced

@method sendMessage sendmessage

@method readMessages readmessages
@parser list.by(channel)

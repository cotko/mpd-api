@ns reflection
@linkmpd !reflection
@desc Reflection

@method config
@parser object

@method commands
@parser list
@reducer pickBy(command)

@method notcommands
@parser list
@reducer pickBy(command)

@method urlhandlers
@parser list
@reducer pickBy(handler)

@method decoders
@parser accumulateList(plugin)

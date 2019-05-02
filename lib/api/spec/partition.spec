@ns partition
@linkmpd !partition-commands
@desc Partition commands

@method list listpartitions
@parser list
@reducer pickBy(partition)

@method create newpartition
@error ignore(EXIST)

@method switchTo partition

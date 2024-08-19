* file

file - tells us what kinf of file we have

file -s : helps us read and determine the type of special files

* stat

different than file, it shows more info, like size, blocks, access, IO blocks, etc

    File - name of our file.
    Size - the size of thee file in bytes.
    Blocks - the size of the file, but in blocks
    IO Block - size of the each block
    regular file - type of the object
    Device - hex/decimal ID of the device on which object is located |
                                                                     | these 2 create the unique identification of the obj
    Inode - Inode ID                                                 |
    Access - permision matrix of the object 
    UID, GID
    Access, Modify, Change = timestamps when action was taken against the file
    Birth - when file was created, but its not implemented in Linux

    Links - nr of hard links created. every file has 1 link if there are no hard links created, because 0 means the file is deleted
    (if we run stat for a dir => Links will show the nr of files (am incercat si mie nu mi da asa))
    Context - only sometimes, Selinux description

! a block is the largest space that can be allocated to one I/O operation !

- arguments:

    stat -f : info about the filesystem
    stat -t : condensed version of the info
    stat --printf="File %n is %s bytes, and is a %F\n" filename  : customisation of output





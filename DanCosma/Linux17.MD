## Lesson 17: FILES

First command: **file**.

Here is a list of entities we will check in this lab:

    empty text file
    text file with content
    directory
    binary exacutable (i.e. /bin/bash)
    packed file
    /dev/vda (or another device)

touch myfile + file myfile = myfile: emty

#! / bin/bash is called shebang. This is the information about the interpreter which Linux should use to 'understand' and execute the script.


#### Creating a PERL Script:

echo "#! /bin/perl" > myperlscript.nomatterwhat

file myperlscript.nomatterwhat 

#### Using file on directories

file /var/log

We received /var/log: directory

#### Binaries

file /bin/bash

Now Linux is more talkative: /bin/bash: ELF 64-bit LSB shared object, x86-64, version 1 (SYSV), dynamically linked, interpreter /lib64/ld-linux-x86-64.so.2, BuildID[sha1]=a6cb40078351e05121d46daa768e271846d5cc54, for GNU/Linux 3.2.0, stripped. We have a lot information about this binary.

### 2.Stat

**stat** allows us to get diffeerent type of information than file.

 With file we can learn what is the type of the file. It determines the type, like file, directory, package, device etc, and if file type is confirmed, it tries to understand the language (based on some structures and strings).

 stat shows information, which we can clasify like more system-oriented.

 **stat mybashscript.sh**

 What do we have here?

    File - it is obvious, this is the name of our file.
    Size - the size of thee file in bytes.
    Blocks - the size of the file, but in blocks.
    IO Block - size of the each blocks.
     
     Block is the largerst disk space which can be allocated by one I/O operation. This size is represented by IO Block.

     
    regular file - the type of the object. We will not get detailed information about the language, only the type, like file, pipe, directory or special file.

    Device - hex/decimal ID of the device on which object is located.

    Inode - Inode ID. Inode and Device create the unique identification of the object.

    Links ({{}} - number of hard links created. For now is enough to understand, that every file will have 1, if there is no hard links created. 0 means the file is deleted.

    
    Access - the permission matrix for the object.

    Uid and Gid - owner and owner's group identifiers.

    Access, Modify and Change - these three represent timestamps when some specific action was taken against the file. Access shows almost the time of last access to the file. But for specific reason, in modern Linux systems (read optimization) this value will be updated only if is older than Modify timestamp. Modify says about last modification of the content. And Change is about all changes - content and attributes (like permissions, for example).
    Birth is reserved for the time when file was created, but is not implemented in Linux systems.


We can customize the output

stat --printf="File %n is %s bytes, and is a %F\n" mybashscript.sh

File mybashscript.sh is 13 bytes, and is a regular file.


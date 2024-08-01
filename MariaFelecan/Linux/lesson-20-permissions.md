* Permissions

positions in the matrix:

    -               rwr                   r-x                   r--
    object type     owner's permission    group's permissions   others' permissions


first place of the matrix - object type:

    -> d = directory
    -> l = soft link
    -> - = regular file
    -> b = block special file (like hard drive)
    -> c = character special file (like /dev/null)
    -> n = network file
    -> p = FIFO
    -> s = socket

types of users that get permissions:

    -> owner : user who owns the file, not necessarely the author
    -> group : by default the owner's group, but it can be changed
    -> others : all other users in the system

types of permissions:

    r - read, w - write, x - execute

- methods of setting permissions:

* absolute mode

    0	no access
    1	eXecute
    2	Write
    3	Write + eXecute
    4	Read
    5	Read + eXecute
    6	Read + Write
    7	Read + Write + eXecute

* symbolic mode

    . =	Set the whole block and override the previous permissions
    . -	Remove the permission for specific user
    . +	Add the permission for specific user


user denotation:

u	Owner
g	Group
o	Other
a	all (owner, group and others)


-rw-r--r-- 1 root adm  : prima parte ii the permission matrix, 1 ii the nr of hard links, root i the owner, adm ii the group

* syntax to change permissions : chmod permissions objects

    ex : chmod 755 student3 - absolute method
         chmod g+x,o+x student3 - symbolic method



* permissions for directories:

x : read file content	write file content	cd to directory	cd subdirectory	subdirectory list	access subdirectory files
wx : delete, rename, create files ! only if it is also with x
r :  directory list filenames only
rx : directory list + all of x
rw-: exacty like simple r
rwx: everything


* changing the group of a user

chgrp <group> <objects>

Let's make the student2 group the 'selected one' for student1 directory.

chgrp student2 student1
chgrp -R student2 student1 : changing the group recursively, so the files also modify

* changing the owner of a group

chown <owner>:<group> <objects>




everything in linux - case sensitive
---ls

* arguments:
    - = we will pass one letter arg
    - - = arg has more than 1 letter

-> l = long listing format

permissions, nr hard links, owner, group, size, date time, file name

-> n = same as l, but ugly GID, UID


-> a = all files, including hidden files

. = current directory
.. = parent dir

-> A = almost all files, except . & ..

-> i = print the index number of each file ( --inode)

-> t = sorts files by time, new files first (ls -lt)
    by adding u(ls  -ltu) = printing the modification time
    by adding c (ls -ltc) = sort by metadata change
-> s = short list of files & allocated space
-> ls =l + s( ca la l doar c pune in fata si allocated time)
-> lS = sorts files by size
-> h = human-readable (the size of files is not in bytes, it is in K, M or G, 1K = 1024)
-> --si = uses powers of 1000, no one uses it
-> ls --format(ex: =commas, =long)  === ls -m
-> ls - lQ : filenames are in quotes
-> time-style
-> ls -al --author prints the username of the creator of the file
-> ls -ald prints directories only
-> ls -ali prints inodes 
-> ls -alR recursively prints all subdirectories
-> ls -alr prints list in the reversed order
-> ls -alSr

* timestamp = numerical representation of time

atime - the last time when file was accessed
mtime - last modification time 
ctime - last metadata modification time(permissions change, location of the file)




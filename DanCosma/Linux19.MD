# Lesson 19: Inodes

An inode is an index node. It serves as a unique identifier for a specific piece of metadata on a given filesystem, and the disk block location of this object.

Max number of Inodes:2^32.

Nr of inodes in the system:  ratio of inodes is 1:16KB of system capacity.

**df command** = It shows information about filesystem.

Commands:

* df /dev/vda1
* df i- /dev/vda1

A lot of small files might drain all of the inodes (one file, one inode), even if the filesystem is not full. And the oposite, big files will take all space on filesystem, but there will be plenty unused inodes.

### Advanced topics

blockdev --getbsz /dev/vda

This way we determined the block size used on the filesystem. Do you remember another way of doing it from previous lesson?

We received 4096. Ok, we use it in

df -B 4096 /dev/vda1

We asked about disk usage, but this time, we said that we are interested in -B block size equal to 4096. Yes, the percentage is the same, but we can determine how many files we can write.

df /dev/vda1

df -B 4096 /dev/vda1

echo 'this is my new file with some content' > testfile

df /dev/vda1  -Aici observam ca dupa ce am pus mesajul am consumat mai mult decat in situatia in carea as folosi a doua comanda.

df -B 4096 /dev/vda1 

### More about files

We can get interesting information about our testfile, using crazy looking command

**debugfs -R "stat <$(ls -il testfile | awk '{print $1}')>" /dev/vda1**

si il comparam la:

**debugfs -R "stat <$(ls -il /var/log/syslog | awk '{print $1}')>" /dev/vda1**

We immediately see the difference on the end, in EXTENDS. This crazy command extracted thee information about inodes used by this file. This metadata describees in two numbers the first and last block of the file. In the example with syslog we clearly see the fragmentation.

### More about directories

Run

**pwd**

We determined, that we are in /root dirctory.

**ls -ild /root**

Note the inode. now execute the same but for parent directory

**ls -ild /**

Note the inode as well. And finally run

**ls -ial /root**

Please, compare the inodes for . and ... In our case the inode for / is equal to .. and inode for /root is equal to .. What makes sense, as . here means /root in absolute path. We talk here about our current directory. Adequately for / and .. - it is the parent directory.



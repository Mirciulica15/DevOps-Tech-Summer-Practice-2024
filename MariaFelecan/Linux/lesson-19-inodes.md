* Inodes

    - df command

    -> reports file system disk space usage
    -> show info about the filesystem on which each file resides, or all file systems by default


to check how many we have : df command : df -i /dev/vda1

ration of inodes on a filesystem: 1:16KB of system capacity

we have different procentages of free space available and free inodes, because:
    - a lot of small files can use all the inodes (one file = one inode), but there is still a lot of space on the filesystem
    - a few big files can use all the space on the system, but there are still a lot of inodes left

    
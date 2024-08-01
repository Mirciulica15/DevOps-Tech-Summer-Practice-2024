# LESSON7: COPY AND MOVE FILES
## FUCTIONALITATE CRUCIALA

1. **Copy Files**

#### COPY FILES:

Copy, means that we copy existing file to the new filename or location. The source file is still available.

**tree**

It recursively shows the content of the directory. Recursively means if there is a subdirectory, its content will be shown as well.

**cp**

The command to copy file is cp. The way how we use it is very simple:

**"cp source target"**

mkdir targetdir

cd sourcedir

Now we can copy one file to the target directory. From our current location, the targeet is one level higher, so we need to use .. in order to say go to parent directory.

cp one ../targetdir

ls -l ../targetdir/one yes. Do we have the source file still located in the current directory?

ls -l one

Yeah! This works.


#### COPY AND CHANGE THE FILENAME:

cp one ../targetdir/another-one

ls -l ../targetdir

Avem: 

-rw-r--r-- 1 root root 0 Jul 23 08:44 another-one

-rw-r--r-- 1 root root 0 Jul 23 08:40 one

#### Copy multiple files

We can copy many files in easy way, using wildcards.

CAteva wildcards:

1. **"?"**
this wildcard replaces one character. So, if we wish to copy all files, where the file name start with my and ends with file, but there is something in between, like a, g or6, but it has to be only one character (so something like my3file, but not myFGfile), I can use ?. It will look like this my?file.

2. **"*"** 
this wildcard replaces all characters with nay length. Considering last example, if we wish to copy my1file and myFGfile, we will use my*file.

Pentru mai multe informatii despre wildcard folosim: 
**"man 7 glob"**


#### Copy directory structure

Pas1: cd

Pas2:cp -R sourcedir anotherdir

-R argument means recursively.

Pas3:ls -l anotherdir

Now, important thing. Please remember, the target directory must not exist. What will happen if the directory exist? Let's see!

mkdir testdir

Now we have the testdir directory, and we are ready to recursively copy all files from sourcedir. We do it in exactly the same way like previously.

cp -R sourcedir testdir

Recursive copy thought that you wish to copy the whole structure into testdir directory.

ls -l testdir

Here we see that the whole structure is copied under the directory.

ls -l testdir/* 

2. **MOVE FILES**

Pentru a muta fisierul dintr-un loc in altul folosim comanda **"mv"**.

MOVE 1 FILE:

mkdir movedfiles

ls -l sourcedir/one

mv sourcedir/one movedfiles

ls -l sourcedir/one

ls -l movedfiles


We can move and change the name:

ls -l anotherdir/one

mv anotherdir/one movedfiles/another-one

ls -l anotherdir/one

ls -l movedfiles 

MOVE A FEW FILES:

mv sourcedir/two01 sourcedir/two02 movedfiles

ls -l movedfiles 

MOVE DIRECTORIES:

mv anotherdir newdir

ls -l anotherdir

ls -l newdir 

And it works similarily like cp did when move is perform to existing directory:

mv newdir movedfiles

ls -l newdir

ls -l movedfiles

ls -l movedfiles/newdir 

MORE POSSIBILITIES:

In order to copy file, or better to say, copy content of the file, we can use redirections.

We have a special file - .profile. Let's use this file to copy the content.

**ls -l newfilewithcontent.txt**
File doesn't exist in the first place. Then:

cat .profile > newfilewithcontent.txt

ls -l newfilewithcontent.txt 

Now we have the new file. Lets see, if the content was copied.

We can do it is simple way:

cat .profile

cat newfilewithcontent.txt 

In this way we visually confirmed that files are the same.

We can check if there is any difference between two files. We do it with a new command **- diff**. This is the way to compare two files.

Ex: **diff .profile newfilewithcontent.txt**

No output means that both files are the same.




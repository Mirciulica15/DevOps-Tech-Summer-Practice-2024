# Permissions, Allow/Deny Matrix

We discussed previously a few elements of permissions. To remind them, we'll go through them.

    d on the first place of the matrix means directory
    l in the same place means soft (symbolic) link
    - means file

The full picture is composed from this matrix and information about owner (and the owning group) of this file.

EX: 

-rwxr-xr--

1. Objects typee:(first element)

  "-" - normal, regular file
  
  d - directory
    
  l - soft (symbolic) link
   
 b - block special file (like hard drive)
   
   c - character special file (like /dev/null)
   
 n - network file
   
 p - FIFO
  
  s - socket

  Testing commands for the first five:

  ls -al .bashrc

ls -ld /root

ls -l /usr/bin/python

ls -l /dev/vda

ls -l /dev/random 

2. Owner:  This is the user who owns the file. Not necessairly the author, but current owner.
3. Group:  By default, this group is set to the owner's group, but it can be changed. For example, the config file of the application can have a owner (a user who uploaded it), but the application is not run by this user but special user (with special group). So, we can allow this group to have distinct access to this file.
4. Others: Toti ceilalti useri din sistem.

### The meaning of letters

Each group (owner, group and others) is build with three parts. By setting these elements we say:

    r - means Read permission is granted
    w - means Write permission is granted
    x - means eXecute permission is granted

### Methods of setting permisions

#### Modul Absolut

Absolute, or numeric mode uses digits to set exat tpermissions in each block. Each block is represented by one digit. Each digit has specific meaning. Here is the table with relations between digits and permissions.

* 0: no acces
* 1: execute
* 2: write
* 3: write+execute
* 4: read
* 5: read+execute
* 6: read+write
* 7: R+X+W

Important! eXecute doesn't simply mean execute the file or program, etc. It also means execute the directory, what allows us to enter into the directory.

### Modul Simbolic

This mode allows us to work in more easier, more visual way. Here we use operator and the user denotation to define the permission matrix.

Operator:
* = Set the whole block and override the previous permissions
* "-" Remove permisions from user
* "+" Add permissions to user
  
  USER DENOTION:
  * u =Owner
  * g= group
  * o= other
  * a= all

-rw-r--r-- 1 root adm 48194 May 2 10:20 dmesg

The firs string describes the owner, second the group. Simple like that.

## Quiz

1. I want to add write permission for the group:

Raspuns: g+w

2.752 represents

Raspuns: RWX-RX-W-

3.  I want to force rwx permissions for owner, rw for group and r only for others
   
   Raspuns: u=rwx,g=rw.o=r

4.  u=rwx,g=r,o=r in digits will be
   
   Raspuns: 744

5. I have the script in my home directory. I want to ensure, that the group is able to read an execute (not write) and others can execute the script. What should I set?

Raspuns: 5 si 1

### Changing Permissions for files

First, we need to switch the user

su - student3

ls -l 

Let's go into this directory.

cd student3 && ls -l 

we write to it:

echo 'second line' >> student3

Yes, we can, at least, we didn't see any error. Let's confirm it.

cat student3

Yep. We also confirmed that we are able to read the file.

**Comanda pentru schimbarea permisiunilor: chmod**

chmod permissions objects

Change the permissions of our file!

chmod 755 student3 && ls -l student3 

We changed them from 640 to 755 That is why this method is called absolute.

To see how the symbolic method work, we will restore previous permissions first.

chmod 640 student3 && ls -l student3

And now we will add the execute flag.

chmod o+x student3 && ls -l student3

Confirmed.

chmod u-w student3 && ls -l student3

echo 'third line' >> student3

No, we can't write to the file, system throws the error message -bash: student3: Permission denied

chmod 000 student3 && ls -l student3

echo 'third line' >> student3

cat student3

And now we are not able to write or read the file.

## Changing permisions for directories

We mentioned earlier, that directory has different default permissions than files. Directories must have execute flag to allow users to go into them.

First, let's go up one directory.

cd .. && ls -l 

 We simply use the same chmod command.

Let us play a little with it!

chmod o-r student3 && ls -ld student3/

Right, this czanges something for other users, but not us. Let's remove read flag for everyone.

chmod a-r student3 && ls -ld 

Can we see what is in the directory?

ls -l student3

ls: cannot open directory 'student3': Permission denied

No, we can't.

What about jumping there? Shouldn't be possible, right?

cd student3

Well, it is possible...

ls -l

But we can't read anything.

It is simple, really. We removed read flag, so we cannot read the list of content inside the directory. But...

cd .. && cat student3/student3

works!

So with read permissions you can read the content list inside the directory.

## Owner of the group

We need to switch the user now.

exit

su - student2

Let's have a look what is in home directory of student2.

ls -al

Each object has an owner (student2) and a group (which is student1). Why is that?

id student1

id student2

cat /etc/passwd | grep student

As you can see, the default group of student2 is changed. Indeed, when this lab was prepared, I did usermod -g 1001 student2 - I've changed the default group for this user.

Ok, let's go to student2 now.

exit

su - student1

And now let's try

cd /home/student2

Well, we can go to another user directory.

ls -l

We can list it.

ls -l student2

cat student2/student2

We can list subdirectory and read the file.

echo 'test' >> student2/student2

-bash: student2/student2: Permission denied

But obviously we can't write to file.

So, to conclude this section. User student2 belongs to group student1 together with student1. So, they can have additional privileges to work on the same objects. Privileges which are lower than owner, but higher than for everyone in the system.

## Change owner and group

And now we can navigate to student1 directory.

cd /home/student1

ls -ld student1

We see that student1 owns the file, and his group is attached. In order to change the group, we can use chgrp command. Syntax is simple.

chgrp <group> <objects>

Let's make the student2 group the 'selected one' for student1 directory.

chgrp student2 student1

ls -ld student1

Yes, the group was changed.

ls -l student1 

But not the files inside the directory. Let's modify our command now.

chgrp -R student2 student1 && ls -l student1

Now it works. We simply added -R as argument, what means recursive .

change owner. We use chown command for it. But what is interesting, chown can also change the group. Here is the syntax:

chown <owner>:<group> <objects>

Let's try with some additional files.

touch test{01..03} && ls -l test*

chown student2 test01

chown :student2 test02

chown student1:student3 test03

Observe the results

ls -l test*

Of course, we can use recursive mode too.

chown -R student2:student3 student1

ls -ld student1

ls -al student1 

Do you remember, what '..' means? It is the parent directory, right? Please check, who owns the parent directory.
# Lesson 15: Streams

There is a command line with prompt waiting for interacting with you. This interaction is executed by two streams - output and input. To be more precise, we talk here about I/O streams. I/O - Input/Output.

### Standard Input

Primul stream se numeste standard input.In file descriptor is "0".

We have to look first into

"ls -al /dev/fd/"

* 0
* 1
* 2
* 3
* proc/<number>/fd/

These files are located in fd directory, what means file descriptors.

And pts is pseude terminal slave which emulates (more or less) tty. This emulation is needed, when we use some other program to connect to system, like ssh, screen, etc. Tty is used directly, when our screen/keyboard is directly connected to computer.

### Standard Output

When STDIN is waiting for instructions passed to it, standard output displays responses from the system (in the simplest scenario). Its file descriptor is 1 and we name it STDOUT.

### Standard Error

The third stream is somehow special. It is standard error, with 2 as file descriptor. We call it STDERR. Why we have special stream for errors? The reason is very simple, in this way we can differentiate the actions taken when output from our scripts are correct or there are some errors.

**Cum se folosesc Streams**

We can redirect STDOUT and STDIN as well, in the same way. Let's try something else now. Do you remember, when we discussed that we can join different pipes and redirections? It is time to refresh our memory!

**cat notexists.txt 1> catfile 2> errorfile**

What we've done? We directed STDOUT to catfile which can be our execution log (or whatever you wish) and, if we have error, we write it to errorfile .

Clean both log files:

rm catfile errorfile

cat .profile 1> catfile 2> errorfile

cat catfile 

cat prints the content on screen. Now we know: cat prints the content to STDOUT.


We can capture STDOUT and STDERR in the same file.

cat notexists.txt > capture.txt 2>&1

cat capture.txt

cat .profile > capture.txt 2>&1

cat capture.txt 

2>&1: This uses the &> redirect instruction. This instruction allows you to tell the shell to make one stream got to the same destination as another stream. In this case, we’re saying “redirect stream 2 (STDERR), to the same destination as stream 1 (STDOUT), is being redirected to.”

How to make the /dev/null to give an STDOUT(output):

Prima data folosim o metoda care face ce ne cere, dar nu cum trebuie.

echo 'whatever' > tmpfile && mv tmpfile /dev/null

cat /dev/null 

file /dev/null

We will see /dev/null: ASCII text It means, we have simple text file, not special one!

Let's see different view

ls -al /dev/null

The output will be -rw-r--r-- 1 root root 9 May 11 21:07 /dev/null

It is definitely not what we wanted to see.

First, we need to remove faulty file

rm /dev/null

Don't worry, nothing bad happen. It already happened :)

And now we have to run

mknod -m 0666 /dev/null c 1 3

    mknod creates a speacial file
    -m 0666 says about file permission
    /dev/null is the name
    c is the device type
    1 3 are the MAJOR and MINOR numbers to specify the device

When you run info mknod you'll see the explanation. Let me copy it here.

    p for a FIFO
    b for a block special file
    c for a character special file

So, we have three main types of devices. C is one of them and it means character special file which... let say.. operates only in "one way".

Ok, let's finally see our special file

file /dev/null 

Response: /dev/null: character special (1/3)


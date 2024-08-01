* I/O STREAMS

we have 3 streams

1. standard input = STDIN - file descriptor: 0

tty -> the terminal through which we communicate with the os

2. standard output = STDOUT - file descriptor: 1

cat prints the output of stdout

3. standard error = STDERR - file descriptor: 2

* cat .profile 1> catfile 2> errorfile
- this mean that if the program runs, it should be executed in catfile, if it has an error, it should be written in errorfile (cpturing stdout & stdin in the same file)

capturing stdout & stderr in the same file:
* cat .profile > capture.txt 2>&1
- 2>&1: this uses the &> redirect instruction.it is saying “redirect stream 2 (STDERR), to the same destination as stream 1 (STDOUT), is being redirected to

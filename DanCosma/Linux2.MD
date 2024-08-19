# Lesson  2: -man

man: O interfata la manualele de referinta ale sistemului.

 man is the system's manual pager.  Each page argument given to man is normally the name of a program, utility or function

The table below shows the section numbers of the manual followed by the types of pages they contain.

1. Executable programs or shell commands
2. System calls (functions provided by the kernel)
3. Library calls (functions within program libraries)
4. Special files (usually found in /dev)
5. File formats and conventions, e.g. /etc/passwd
6.  Games
7. Miscellaneous (including macro packages and conventions), e.g. man(7), groff(7)
8. System administration commands (usually only for root)
9. Kernel routines [Non standard]

How to check, what sections/pages we have available?

* man -f ls

intro command: Introduction into linux commands

* man -f intro


 ## Alte argumente utile

 * whatis ls: afiseaza scurta descriere a functionalitatii
 * man -f ls: Face acelasi lucru ca whatis
 * man -k ls: searches for the given command through all man pages, and returns all of them as output.
 * man -w ls: returns the location of the file from where the page is rendered.

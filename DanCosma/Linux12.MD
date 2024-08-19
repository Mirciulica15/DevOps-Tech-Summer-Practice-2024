# Lesson12: Work History

Command: **"history"**

Finding a comand in history: **:!number"**

Putem sa rastrangem cautarea in history prin doua comenzi:

1. history | grep cat
2. history number

### Cautarea interactiva

Now we can interactively search through it. Press CTRL and r and start typing cat.

You should see cat .bashrc (the last command where searched string is equal to part of the command).

Press CTRL r again. the highlighted command changed. Very useful.

Use ESC if you wish to leave the search, or simply enter to execute the command.

### Fisiere

"grep -i hist .bashrc"

The new thing - -i argument. It allows to grep through file the string with case-insensitive way. So, this way we can find hist and HIST string.

Apar 4 linii de output ce trebuie explicate:

HISTCONTROL=ignoredups:ignorespace

This means, that if you repeat the same command twice (one by one) only one occurence will be storted in history. The same if you start your command with space.

shopt -s histappend

Here we say that history file should not be overwritten, but all commands will be stored on the end of the file.

HISTSIZE=1000

Says that history available in terminal will keep 1000 records.

HISTFILESIZE=2000

And the last one says that history kept in history file will contain 2000 records.

### History File

First, we need to write the file (normally it doesn't append in real time). History is kept in .bash_history file and it is written on the end of the session. In order to "dump* the session history to the file, we will use the -a argument.

**history -a**

How to check on history:

1. ls -al .bash_history
2. cat .bash_history


### Variabile

We can print our variables using echo command (echo prints data on standard output):

**echo $HISTSIZE**

Pentru a o printa folosim: **" echo HISTSIZE"**

Sau se mai pot folosi set si grep: 
"set | grep HIST".

### CLEAR HISTORY

**"history -c"** Curata doar memoria, nu si fisierele.

**> .anotherhistory** Removing files by redirecting nothing to it.

### DISABLE HISTORY

**" set +o history"**

If we wish to disable history for current user:

**echo 'set +o history' >> ~/.bashrc**

And for all users in the system:

**echo 'set +o history' >> /etc/profile**





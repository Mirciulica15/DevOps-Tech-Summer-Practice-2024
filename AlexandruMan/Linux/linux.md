touch nameOfTheFile (this creates a new file)  
ls (list of files)  
-l (show in table format (long format))  
--format=commas/long...  
-a (+ show hidden files)  
-r (show in reverse order)  
-R (show recursively? all subdirectories)  
-i (show inodes ?? )  
-d (directories only)  
--author username of the creator of the file  
.. (shows parent directory files)   


*Sort by time  
-t / -tu / -tc order by / access time / modif time /   metadata modif time /  

*Sort by size  
-S sort by size in bytes  
-h more readable using power of 1024 (1024 bytes = 1K)  

*Best Friend  
man (manual)  
whatis (name) = man -f (name) => see what it does  

man -k ls searches for the given command through all man  pages, and returns all of them as output.  

man -w ls returns the location of the file from where the   page is rendered.  

--------------Work with directories------------------  

pwd . This command shows your current work directory.      
    
/root is home directory      
to go there just type cd    
    
mkdir - make directories    
    
rmdir - remove directories      
rm - remove files      
everything is a file in linux but you need to force it  (saftey reasons)    
-r means go recursively through directories (and treat everything as file)    
-f - force. Another words, do not ask, assume the user knows what he is doing.    
these 2 are used together -rf    
    
-----------------PIPES-------------------    
    
grep 'case' .bashrc  =>  This command will search for pattern case in a file .bashrc.    
    
wc -l .bashrc    
    
it will count how many lines (-l argument) are in our .bashrc file.    
    
    
sort will sort the output in alphabetical order    
    
sort numbers.txt will sort the prepared file with generated numbers.    
    
*The pipe |    
Our first structure here is pipe, which uses |.    
    
The structure looks lie this:    
    
command1 | command2    
    
command1 | command2 | command3    
    
Yes, we can combine as many pipes as we wish.    
    
How it works? The output of command1 is taken over as input to command2. And this process can continue to the next command.    
    
cat (file)  =>  Prints the file    
    
> adds data to file and creates it if needed (rewrites if already exists)    
    
>> append to existing file    
    
print number of lines with     
    
wc -l numbers.txt    
with the folowing we get rid of the name    
    
wc -l numbers.txt | awk '{print $1}'    
    
or...    
    
awk 'END{print NR}' numbers.txt    
    
**Read files    
    
more (filename)    
less (filename)    
    
head -n number of lines    
    
tail -n number of lines    
    
    
------------Copy and move files---------------    
    
tree (filename) recursively shows all the files    
    
cp source target    
    
copy    
    
cp one ../targetdir/another-one    
    
copy with changed name    
    
copy source target/name    
    
---------    
    
cp file1tocopy file2copy file3tocopy targetlocation    
    
So, last parameter describes where to copy all files listed in parameters (but last, ofc).    
    
In Linux we have multiple widlcards. We touch here only two.    
    
? this wildcard replaces one character. So, if we wish to copy all files, where the file name start with my and ends with file, but there is something in between, like a, g or 6, but it has to be only one character (so something like my3file, but not myFGfile), I can use ?. It will look like this my?file.
* this wildcard replaces all characters with nay length. Considering last example, if we wish to copy my1file and myFGfile, we will use my*file.    
    
If you wish to learn more about wildcards, run man 7 glob    
    
---------Copy the entire folder/s... -------------    
    
and now we can copy the whole structure:    
    
cp -R sourcedir anotherdir    
    
-R argument means recursively. How to understand this, please take look back on top when we discussed tree    
    
-----------------Move Files-------------------------    
    
mv file1 file2 file3 targetlocation    
    
    
---other options---    
cat .profile > newfilewithcontent.txt    
    
--check diff--    
    
diff .profile newfilewithcontent.txt    
    
No output means that both files are the same.    
    
----------------Program Efficiency------------------    
    
top     
    
    
---the 'ps' command---    
(Process status)    
    
ps T (list of all processes with connection with the current terminal)    
Statuses    
This list is copied from manual, which I believe are most important to understand.    
    
D - uninterruptible sleep (usually IO)    
I - Idle kernel thread    
R - running or runnable (on run queue)    
S - interruptible sleep (waiting for an event to complete)    
T - stopped by job control signal    
t - stopped by debugger during the tracing    
X - dead (should never be seen)    
Z - defunct ("zombie") process, terminated but not reaped by its parent    
Some statuses may have the second letter. Let's list the most important    
    
< - high-priority (not nice to other users)    
N - low-priority (nice to other users)    
s - is a session leader    
l - is multi-threaded    
+ - is in the foreground process group    
    
    
To list all processes, use    
    
ps -A    
    
-----    
    
ps -ef    
    
Used mostly when someone wants to determine the PID of the process.    
    
-----    
    
ps aux    
    
Really used combination.It shows important info, like PID, status, resources usage.    
    
-----    
    
ps aux --forest    
    
Shows the hierarchy of processes    
    
-----    
    
pstree    
    
like ps aux --forest but shorter, good for quick looks on the system    
    
-----Finding useful information-----    
    
using 'grep' with 'ps'    
    
ps -f -u syslog    
    
shows all processes run by user syslog.    
    
-----    
    
ps -f -C cron    
    
shows all processes, where the executable is cron.    
    
-----    
    
ps -f -p 1    
    
shows process with specified PID.    
    
-----    
    
ps -f --ppid 1    
    
show all processes, where parent process has PID 1. About parents, children, etc we will talk in future lesson.    
    
----------------ALIASES---------------    
    
to create alias    
    
alias (name) = 'command'    
ex: alias lh = 'ls -alh'    
    
----create global alias----    
    
echo "alias lh2='ls -alh'" >> /etc/profile.d/99-aliases.sh    
    
then start new sesson - sudo -i    
    
    
---------------Work with users--------------    
    
whoami    
    
The whoami command shows the user we are logged in.    
    
-----    
    
id    
    
Another way to learn this info, we have here a few information. What is the User ID (UID), primary group ID (GID) and other groups to which user belongs to.    
    
-----    
    
    
UID = Unique User Identifier    
    
There is a good practice, even a standard, when UIDs are associated.    
    
UID 0 is reserved for root.    
1-99 are reserved for predefined accounts (like games, mail, www-data, sys, bin and more)    
100-999 reserved for system and administrative accounts.    
1000+ are reserved for users    
    
    
-----    
    
GID = Group IDentifier    
    
We can find here similar number associations:    
    
GID 0 is reserved for root.    
1-99 are reserved for system and application use.    
100+ are for users.    
    
-----FILES with users-----    
    
clear && cat /etc/passwd    
    
The structure of this file is as follows:    
    
username:password:UID:GID:description:homedir:shell    
    
username - obvious, it is the name of the user    
password - password. Many years ago this was the place where password actually was stored. But for security reasons it chaned and now passwords are available in different form, somewhere else. We will go there later. x in this field means that password is encrypted and stored in the other file.
UID - unique User IDentifier.    
GID - unique Group IDentifier.    
description - this field can contain many information. The real first and last name. Address. Phone number. Role in the organization. You name it.    
homedir - the location named as home directory. This is the "home" of the user, where he logs and stores his data.    
shell - simply speaking, the shell is the program which takes the commands sent by user, interprets it, and return the answer    
    
    
---Shadow file---    
    
Contains snsitive information    
    
clear && cat /etc/shadow    
    
The part of the file, which we want to understand now are the first and second element. It is a username and password.    
    
if password is set for the user, it is hashed and not retrievable from the file (well, let's say "not retrievable"... by staring on it. There are tools which allow us to crack passwords).    
* there is no password set (and very good, as we want to use passwordless approach with access keys, no passwords).    
! password was never set.    
    
---Group---    
    
Contains info about the groups    
    
clear && cat /etc/group    
    
The structure is as follows:    
    
group name    
password (almost never used for groups but posbile idk)    
GID    
users belong to the group    
    
---gShadow---    
    
sesitive info about groups    
not that important    
    
    
------------Add User------------    
    
Command 'which' show us where the executable is located    
    
which useradd    
which adduser    
    
---    
    
whatis useradd    
whatis adduser    
    
---    
    
'adduser' is for rookies    
use 'useradd' if you are a real admin     
    
-d - create home directory in specified location, if we want to change    
    
-m - create the home directory    
    
-p - password    
    
-s - provide shell    
    
-c - comments, or description of the account    
    
useradd -h = for more options / commands    
    
Let's see all three accounts now.    
    
grep testuser /etc/passwd    
    
grep testuser /etc/shadow    
    
ls -l /home    
    
-------Modify users--------    
    
--passwd--    
    
grep testuser3 /etc/shadow    
    
passwd testuser3    
    
Provide the new password twice.    
    
grep testuser3 /etc/shadow    
    
Password changed    
    
--usermod--    
    
usermod testuser3 -g testuser2 (modifiy the group)    
    
grep testuser3 /etc/passwd    
    
grep testuser3 /etc/group    
    
(Check for it)    
    
-a = append    
    
usermod testuser3 -aG 1001    
    
append group 1001    
    
---    
    
usermod testuser3 -d /home/newdir -m    
    
move directory '-d' move '-m' create the new one    
    
-----Shell-----    
    
Let's modify the shell.    
    
usermod testuser3 -s /bin/sh    
    
grep testuser3 /etc/passwd    
    
-----Delete user-----    
    
userdel testuser1    
    
--check--    
    
grep testuser /etc/passwd    
    
grep testuser /etc/group    
    
to remove secondary groups :    
    
usermod testuser3 -G ""    
    
(just set it as empty)    
    
In order to remove the files, it is a good practice (if we know what we are doing :) ) to add two arguments:    
    
r - remove files    
f - force removal (in case if files don't belongs to the user)    
So, userdel -rf testuser3    
    
    
-------------YOUR WORK HISTORY----------------    
    
with up down arrows (if not hundreds of commands)    
    
    
'history' command    
    
then use !(number) to call    
    
----    
    
history | grep cat    
    
to narrow down    
    
history (number)     
histroy of last -number commands    
    
--Configs--    
    
grep -i hist .bashrc    
    
-i => search in a case-insensitive way    
    
updates are stored in .bash_history    
    
history -a (you update it so you can see it in the file)    
    
----Clear history----    
    
In order to clear the history, run    
    
history -c    
    
Please notice, that cleared only the history in memory not the files.    
    
For file, you have to remove file, or use redirect:    
    
> .another_history (we play with not default file)    
    
What we did? We redirected "nothing" to the file, therefore if we look into it:    
    
cat .another_history    
    
The file is empty.    
    
----Disable history----    
    
In order to disable history, run    
    
set +o history    
    
If we wish to disable history for current user:    
    
echo 'set +o history' >> ~/.bashrc    
    
And for all users in the system:    
    
echo 'set +o history' >> /etc/profile    
    
-----------------------------ELEVATE PRIVILEGES-----------------------------    
    
---Change user---    
    
su = substitite => allows us to use another user in order to run commands    
    
    
--------Sudoers---------    
    
edit tool    
    
update-alternatives --config editor    
    
------    
    
visudo (enter script)    
    
:q! - exit it    
    
------    
    
user pos1=(pos2:pos3) pos4    
    
or    
    
%group pos1=(pos2:pos3) pos4    
    
On the beginning we have user or group. To differentiate these two, we use % for specify the group.    
pos1 - applies to all hosts    
pos2 - user can use all commands as all users (i.e. root can ls as user03, etc)    
pos3 - user can use commads as all groups    
pos4 - user can use all commads    
    
    
--remove and write permisions with code--    
    
sed -i '/student/d' /etc/sudoers    
    
(we will talk about sed later)    
    
echo "student2 ALL=(ALL:ALL) NOPASSWD:ALL" > /etc/sudoers.d/student2    
    

-------------------------------------LOGS-----------------------------------  

logs placed at /var/logs/  

logs:   
syslog  
auth.log  
dmesg  
kern.log  
boot.log  
lastlog  
failog  
wtmp.log  
dpkg.log  

cat,less,more,head,tail,grep all work on logs  

----Journactl - yet another approach to logs----  

syslog message levels  

0: emerg  
1: alert  
2: crit   
3: err  
4: warning  
5: notice  
6: info  
7: debug  

check config file : cat /etc/systemd/journald.conf  

see list of current and previous boots : journalctl --list-boots !!!  

then call with journalctl -b (number)  

------------------------------------STREAMS-------------------------------------  

0 stdin  
1 stdout  
2 stderr  

cat noexist.txt 2> errorfile   

2> => put all the error messages in errorfile  

We can capture STDOUT and STDERR in the same file.  

cat notexists.txt > capture.txt 2>&1  

cat capture.txt  


-----------------------------------CRON / CRONTAB--------------------------------  

Cron :   

/etc/crontab  

Cron is the thing that executes stuff  

Crontab is the list of what has to be executed  



Each entry in crontab is called cronjob.  

To list our jobs, we execute  

crontab -l  

---------  

crontab -e  

OPENS CRONTAB EDITOR  

---------  


-----------------------------KNOW YOUR FILES--------------------------  

stat and file  










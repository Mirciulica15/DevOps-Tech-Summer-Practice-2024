Notes Labs Linux 1-8
ls -l .


- one dash informs the system that we will pass one letter argument, like 'l'
-- two dashes means that argument will contain more than one letter. Most commonly it will be an english word.

ls -a shows hidden files
ls -A almost all files

atime - the last time when file was accessed
mtime - last modification time. 
ctime - last metadata modification time. We mean here - permissions change, location of the file, etc.

-t sorts new to old,modification time ls 
-ltc medata changes

ltu also changes metadata?

-lS sort by size
-h easily readable
.. parent directory

-u the exact modification timen -f ls which sections are avaiable

whatis tells us what the command does

mkdir make directory 
use -p create parent directory and the second part 

cd ../../../var/log/nginx
cd /var/log/nginx
we use the absolute path
cd ~,cd use to go to root directory 
rm -rf : forcefully removes a dir,risky method as it asumes the user knows what it is doing
rmdir parentdir/*
rmdir parentdir also used to remove a dir

touch creates new file
* wild character ex: my*file
? just one wild character

vim,also a way to create files


grep searches for an ocurence
wc counts 
uniq works best with sort
command1|command2 output of 1 is input

vim :q -quit
:q -quit and not save
wq quit and save

tree show recursively the current of dir

So, last parameter describes where to copy all files listed in parameters (but last, ofc).

cp two01 two02 ../targetdir
mv -move files
diff chech differences between files


Top Command - shows vast info 
who shows who is logged in
load average: 0.52, 0.58, 0.59
also mdifies default view

This specifically refers to the first CPU core in a multi-core processor setup:cpu0
This represents the overall CPU usage across all available CPU cores. It summarizes the total performance metrics for the system's CPUs.:cpu s

order by memory usage. In order to do it, press

M .

Now, by pressing

N we will look on the list sorted by PID.

Ok, Let's press

T and now we have order by running time.

Finally we can come back to CPU usage sort, by pressing

P






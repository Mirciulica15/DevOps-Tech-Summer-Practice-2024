* top
first line: 
    -> current hour
    -> uptime
    -> nr of active users
    -> load average
        * three numbers: load average of processes runing and waiting for CPU time, for the system in the last 1, 5, 15 minutes

second line: info about processes
    -> total nr of processes in the system
    -> running = active p
    -> sleeping = waiting p
    -> stopped p
    -> zombie p ( waiting for exit() )

third line: CPU utilization
    -> us : all user processes
    -> sy : system owned processes
    -> ni : nice allows us to change the priority of the processes (standard values is 0, we can modify from 19 - lowest, to 20- highest)
    -> id : idle
    -> wa :  the number repspresents the time when the process is waiting for input/output operation
    -> hi : hardware interrupts
    -> si : software interrupts
    -> st : steal time

4 & 5 line: memory stuff
    T=the only one difference is that the 4th line is about physical memory and 5th is about swap

* Processes list
    PID - unique number of the process
    USER - process' owner
    PR - default priority of the process
    NI - nice
    VIRT - total amount of memory used by the process
    RES - RAM memory used by process.
    SHR - amount of memory shared with other processes
    S - process state
    %CPU - what amount of available CPU is used by the process.
    %MEM - like for CPU, but this value represents memory usage.
    TIME+ - total time of CPU usage by the process.
    COMMAND - this process is executed

* modify the default view
    -> N : list sorted by PID
    -> T : ordered by running time
    -> P : usage sort
    -> H: switching to threads and back
    -> n: then entering a number = nr of processes shown
    -> u: entering which user we want to see
    -> o: case insesitive for searching processes
    -> 0: case sensitive for searching processes
    -> s: change the refresh rate
    -> k: to kill a process, we need the PID
    -> W: saves the hanges we made for other usesage of top


* start with non-default settings:
    ->top -o %MEM - run top with processes sorted by memory.
    ->q for exit
    ->top -c shows the full paths.
    ->q for exit
    ->top -u root will show the processes owned by root user









  

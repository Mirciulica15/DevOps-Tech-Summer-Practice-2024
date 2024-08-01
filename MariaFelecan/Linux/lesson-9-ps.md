* ps = what sys is doing at this moment
     = Process Status

    -> ps simple: 
        - gives us processes related to this specific session only (session itself and processes executed right now)

        - PID, TTY (terminal associated with the process), TIME (total time of CPU usage), CMD(the command running)

        - accepts arguments without a dash!!

    -> ps a : PID, TY, STAT, TIME, COMMAND (detailed) + a lot more processes that are related to our session

    -> ps -a : different than ps a
    -> ps -A : list all processes

    -> STATUSES 

        - D - uninterruptible sleep
        - I - Idle kernel thread
        - R - running or runnable
        - S - interruptible sleep (waiting for an event to complete)
        - T - stopped by job control signal
        - t - stopped by debugger during the tracing
        - X - dead (should never be seen)
        - Z - zombie process, terminated but not reaped by its parent

        more statuses:
        < - high-priority (not nice to other users)
        N - low-priority (nice to other users)
        s - is a session leader
        l - is multi-threaded
        + - is in the foreground process group

    -> most used combinations:
        ps -ef : when we want to determine the PID of the process

        ps aux : most used combination !!

            * shows PID, status, resource usage

        ps aux --forest : to see the hiarchy (sorted ascending over PID)

        pstree : we can see the system dependencies

        ps -f -u name : all processes of user "name"

        ps -f -C cron : processes where the executable is cron

        ps -f -p 1 : processes with PID = 1

            -> we can also do ps -f -p 2543,8843,3456

        













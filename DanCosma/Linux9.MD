# Lesson9: Comanda ps
## Cu scopul de a intelege ce face sistemul

1.**Explicatii pentru comanda ps**

ps= Process Status.
* PID - quite obvious, this is the process id.
* TTY - Terminal associated with the process. Here is a very detailed reading about TTY.
* TIME - total time of CPU usage
* CMD - the command which is running.

With ps we can use arguments, quite obvious. But there is a trick. Normally, we use arguments with dash, like ls -l. But ps is different. It accepts argument with and without dash.

Exemple: 
1. ps a
2. ps-a
3. ps T

**STAT**. It means state of the process and it is very importnt to understand.

STATUSURI:

    D - uninterruptible sleep (usually IO)
    I - Idle kernel thread
    R - running or runnable (on run queue)
    S - interruptible sleep (waiting for an event to complete)
    T - stopped by job control signal
    t - stopped by debugger during the tracing
    X - dead (should never be seen)
    Z - defunct ("zombie") process, terminated but not reaped by its parent

Unele statusuri pot avea si o litera secundara:


    < - high-priority (not nice to other users)
    N - low-priority (nice to other users)
    s - is a session leader
    l - is multi-threaded
    + - is in the foreground process group

LIST ALL PROCESES: ps -A

2.**EXEMPLU**

* ps -ef -someone wants to determine the PID of the process.
* ps aux -the mostly used combination. It shows the most important info, like PID, status and resources usage.
* ps aux --forest pt a vedea ierarhia proceselor.
* pstree ca si cel de mai sus dar cu mai putine detalii.

GASIREA DE INFORMATII UTILE:

* ps -f -u syslog -shows all processes run by user syslog.
* ps -f -C cron -shows all processes, where the executable is cron.
* ps -f -p 1 shows process with specified PID.
* ps -f --ppid 1 -
show all processes, where parent process has PID 1. About parents, children, etc we will talk in future lesson.




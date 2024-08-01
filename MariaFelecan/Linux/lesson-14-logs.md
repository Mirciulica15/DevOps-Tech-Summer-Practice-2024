* LOGS

- directory for logs : cd/var/logs

! filesystem is a layer, or structured collection of data in partition on disk drive. partitions separate these layers
it is better to have the /var/logs in a different filesystem !


    * SYSTEM LOGS:

        -> syslog: the main system log, with all important information about the system and applications.
        if something is not writting its own logs, it will be here

        -> auth.log: info about authorization (user login attempts, logout, passwd changes, remote logins with sudo)

        -> dmesg: allows us to interact with the kernel and get info by querying bootup messages

        -> kern.log: stores kernel messages

        -> boot.log: info about started services, apps, disk configs

        -> lastlog: info about last logins

        -> faillog: login failures

        -> wtmp.log: used with who utilities

        -> dpkg.log: data about packages management


    * APPLICATION LOGS: in the same directory, in nginx logs for ex


    - watching what is inside the logs

    lastlog: binary file, the other: text
    => we can use commands like grep, tail, less, more, head etc.

    - push messages to the log: with command: logger

    ex: logger "test message"

- Journactl : utility in order to be able to read logs that are not stored as text

    syslog message levels:
    0 - emergency
    1 - alert
    2 - critical
    3 - error
    4 - warning
    5 - notice
    6 - info
    7 - debug

    messages from 5-7 : informative only

    - journalctl --list-boots -> command to see an ordered list of boots

        0 is the current boot, older ones are negative. a boot happens each time the system is restarted

        to see a boot: journalctl -b -10 (last arg can be: the number of the boot/ boot id)

    - journalctl --since yesterday
    - journalctl -u nginx.service : lists only the nginx service
    - journalctl _PID=8088 : list entry for PID 8088
    - journalctl -F _GID : lists all GIDs with entries in journal, it works for UIDs also
    - journalctl -p err -b : errors, criticals, alerts, emergencies
    - journalctl -b -u nginx -o json-pretty : parsing & better formatting
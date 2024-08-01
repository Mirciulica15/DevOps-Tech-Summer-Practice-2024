# Lesson 14: Working with Logs

Log-urile sunt esentiale pentru a intelege ce face sistemul nostru.

Default log-urile sunt salvate in **/var/log** directory.

**1. STANDARD VIEW ON LOGS**

COMMANDS FOR PLAIN TEXT:

* cd /var/log
* ls-al

Filesystem is a layer, or structured collection of data in partition on disk drive. Partitions separate these layers.

1. syslog = main system log. Contains all important information about the system and applications. Generally, if something is not writting its own logs, it will be here, in syslog.
2. auth.log = Contains information about authorizations. All user login attempts,logouts.passwd changes. sudo uses, etc.
3. dmesg = s a kernel ring buffer, not the log (as we understand the logs). It allows us to interact with kernel and get information by querying bootup messages.
4. kern.log = Stocheaza mesaje kernel.
5. boot.log = Contains system' starting sequence (not kernel boot). Another words, information about started services, applications, disks configurations and so on.
6. lastlog = file to be used with lastlog utility. Contains information abount last logins
7. faillog = similar to lastlog, use this file with faillog utility. Logs fails, like login failures
8. wtmp.log = Contains login infomration. However, it doesn't show information similar to lastlog, but used by other utilities, like who.
9. dpkg.log = Contains data about packages management - install, remove, update, etc.

### Application logs

ls -al /var/log/nginx

Here we have nginx directory with its logs.

#### Verificarrea log-urilor:

Except binary logs (like lastlog), all logs are text files. Therefore, it is very easy to read them.

**cat /var/log/dpkg.log**

**tail /var/log/syslog**

**cat /var/log/nginx/access.log**

Checking logs in NGINX Browser:

**tail -f /var/log/nginx/access.log**

If we want to quit, press CTRL c.

#### Push la mesaje catre log

O posibilitate este folosirea comenzii **"logger"**.

Alta posibilitate este adaugarea unei linii la fisierul **syslog**.

Commands:
* **tail /var/log/syslog**
*  **logger "This is a test message"**
* **tail /var/log/syslog**

**2.Journactl**

Logs are not stored as text anymore, therefore we need a new utility in order to read these files. We can do it with journalctl utility.

System and applications write messages to logs and are able to determine what severity (or another words - importance) of the message should be set. In syslog we have 7 defined levels of messages, which determine their severity:

syslog message levels

    0: emerg
    1: alert
    2: crit
    3: err
    4: warning
    5: notice
    6: info
    7: debug


Commands:
1. journalctl
2. cd /var/log
3. ls -al
4. cd journal
5. ls -al 


These directories contain logs stored for each boot. Another words, each restart will force system to create new directory for logs.

Sometimes these directories don't exists. In order to check, and be sure that this option is enabled, check the config file:

cat /etc/systemd/journald.conf 

So, we said, directories represents boots. But how we can use it?

journalctl --list-boots 

First column is the offset for boots. Another words, 0 is current boot, lower numbers represents older boots. Next is the absolute reference of the boot ID. And dates of start and end of the log.

What we can do with it? Well, simple, we can display logs for specific boot! This is very, I mean it, very useful function.

**journalctl -b 0 will display the current boot.**

We can use -b and boot id. From example above it will be journalctl -b 6a8e47d21a894cc3944bb1982d13d13f.

**journalctl --since "$(date '+%Y-%m-%d %H:%M:%S' --date='5 minutes ago')" log entries from specific time**


    journalctl - command for work with journal
    --since - argument for limit logs from specific date
    "$()" part this everything what is inside brackets will be executed and output put as value to --since argument

**journalctl --since "$(date '+%Y-%m-%d %H:%M:%S' --date='5 minutes ago')" --until "$(date '+%Y-%m-%d %H:%M:%S' --date='2 minutes ago')" logs from specific range**

**journalctl --since yesterday - logs from today and yesterday. Here --until works as well.**

**journalctl -u nginx.service - lists only nginx service. In this way we can list all records related to nginx (in this case).**

**journalctl -u nginx.service --since today - lists nginx related entries from today**

**journalctl _PID=8088 - lists entries for PID (Process IDentifier) 8088.**

**id -u www-data - collect id of user www-data. Let's suppose it is 33, which is the standard UID (User IDentifier) for this user.**

**journalctl _UID=$(id -u www-data)**

**journalctl -F _GID**

This is interesting. It lists all GIDs (Group IDentifiers) with entries in journal. The same approach works for UIDs - _UID**

**journalctl -k - displays kernel messages**

**journalctl -p err -b - display errors, criticals, alerts and emergencies.**

**journalctl -b -u nginx -o json-pretty - parsing and better formatting**




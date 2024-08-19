# Lesson16: Cronotab

Reprezinta automarea si planificarea actiunilor.

This lesson is about Linux scheduler - cron.

During this lesson we will learn the difference between cron and crontab and how to define and monitor executions.

1.**Cron**, the deamon

cron e un serviciu responsabil pt controlul si executia unor task uri planificate.

**systemctl status cron.service**

 E o comanda de management pt systemd. Pe noi ne intereseaza doar aceasta parte:

 "Active: active (running)"

This means that the service is active.

**ps aux | grep cron**

Shows processes related to the cron service. We should see something similar to

**root 565 0.0 0.1 8536 3084 ? Ss 19:48 0:00 /usr/sbin/cron -f**

So, to conclude this part, cron is a service which controls multiple crontabs.

**crontab** e o lista de task uri si comenzi care sunt scheduled sa fie executate la un moment specific.

**/etc/crontab**

Command: ls -al /etc/crontab

System wide crontab(nu e admin crontab).

Acest crontab are un director asociat /etc/cron.d  unde avem scripturi ce sunt programate in /etc/crontab.

**cron.daily**

E un director cu mai multe directoare.

**ls -al /etc/cron.* -d**

Pt **cat /etc/crontab**

We have four anacron command executed with different scheduling. We will learn about it later. What is anacron?

It is scheduler too. But works a little bit differently than cron. Unlike the cron, anacron doesn't assume that the machine is run continuously without stops. It is crucial for system's scripts which must be executed daily, for example.

**/var/spool/cron/crontabs**

## Setting up a task in crontab

Crontab: 1 17 7 4 2 /usr/bin/ls >/dev/null 2>&1

Explicatie la linia asta ciudata:

We have a few elements here, we can go through them, one by one.

    minute defines on which minute scheduler should execute the program. In our example above, it is 1 minute after specified hour.

    hour defines hour for execution. In our example it is 5PM. Yes, Linux takes here 24 hours for a day.

    day of the month as above, but for day in the month. In the example above it is 7th day of the month.

    month as you can expect, the month. It may be a number, or text. In our example it is 4th month, so April. You can use apr.

    weekday final option defines the weekday. In our example it is 2, what means Tuesday. Please remember, Sunday can be defined as 0 and 7 as well.

So, in our example, system will execute the command at 17:1 on 7th of April. But only if it will be Tuesday.

## Setting up a cronjob

Pentru a lista toate cronjobs folosim comanda: crontab -l.

Let's define a job, which will be executed at 9:12, every 23rd day of month. We want to do ls of /var/log send all output to logfile.

Commands:

* **crontab -e = opens crontab editor. (at the first time, we need to set the default editor**

Let's put there

**12 9 23 * * /usr/bin/ls -al > logfile 2>&1**

And save the file with :wq

You should see installing new crontab

Is it set?

**crontab -l**

Yes, it is!

Remember, cronjob, when executed, will create another shell. We need to ensure that this newly created shell is able to use our system.


## Logs

 Here, in Ubuntu, we need to go through /var/log/syslog for logs.

 **cat /var/log/syslog**

 Crontab generator:**https://crontab-generator.org/**

 

* cron = daemon
    - responsible for scheduled tasks
    - systemctl status cron.service = we can see info about the process
    - service that controls multiple crontabs

* crontab = list of tasks / commands scheduled to be executed on a specific date and time

    - /etc/crontab : here we keep syste related admin stuff
        -> associated directory: /etc/cron.d
        -> in the directory there are scripts executed once in a while
        -> crontab file executes this scripts on a schedule using anacron
        -> anacron is also a scheduler, but it doesnt assume that the machine runs continuously
    
    - /var/spool/cron/crontabs : here user's crontabs are stored

* how to set a task in crontab

    # Example of job definition:
    # .---------------- minute (0 - 59)
    # |  .------------- hour (0 - 23)
    # |  |  .---------- day of month (1 - 31)
    # |  |  |  .------- month (1 - 12) OR jan,feb,mar,apr ...
    # |  |  |  |  .---- day of week (0 - 6) (Sunday=0 or 7) OR sun,mon,tue,wed,thu,fri,sat
    # |  |  |  |  |
    # *  *  *  *  * user-name command to be executed

    - some explanation: 
        17 *    * * *   root    cd / && run-parts --report /etc/cron.hourly

        ex : 1 17 7 4 2 operation -> ii defapt ora 5pm si un minut, pe 7 aprilie. 2 vine de la a doua zi a saptamanii => scriptu se executa doar daca ii marti

        in real life, if we set the day of th month we dont also set the weekday

        we can also set * in any position, and it means every hour/ minute/ whatever

        -> we usually set the user in system wide crontab, when some operation should be performed by a specific user, but the operation itself is system wide

    - steps to set up a crontab

    every entry in a contrab is called a cronjob

    1. crontab -e : opens crontab editor
    2. write something like  1 17 7 4 2 operation 
    3. crontab -l : we can check if the cronjob is set

    we can see the crontab we just created in /var/spool/cron/crontabs/root

    we can see the logs for the crontab in 3 ways:
        - cat /var/log/syslog
        - journalctl -u cron
        - systemctl status cron.service






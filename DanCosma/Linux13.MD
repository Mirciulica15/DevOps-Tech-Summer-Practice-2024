# Lesson13: Elevating Privileges

**Invatam cum sa ne logam cu alt user sau sa devenim root.**

In linux in general putem sa spunem ca avem 2 tipuri de useri, cel "normal cu privilegii reduse si root, dar exista si ceva intre cei 2 si se numeste user cu privilegii ridicate , fapt ce inseamna ca acei user mai pot sa realizeze un set de comenzi specifice.

 In order to use another user we need to use command **"su"**. As usual it is a abbreviation from the word substitite. It allows us to use another user in order to run commands.

 Pentru a afla mai multe despre argumente si utilizarea su folosim comanda **"su -h"**.

 Ce utilizam noi pentru a schimba user-ul?  **"- sau -l"**

 Command:** su - student1**

 ## SUDO EXPLAINED

  ELEVATE PRIVILAGES FOR USERS:

  We can use sudo in two ways:

If we want to run some commands as root, we can use sudo <command>. Like in the example.

**sudo ps**

bash is the parent session. In this context we executed ps, but with sudo. Therefore sudo created its own session, where the ps were finally run.

Pentru a folosi sudo mode intreaga sesiune si nu de la comanda la comanda folosim:

* **sudo -i**
* **ps**

3.**Configure the sudoers file**


CONFIG OF /ETC/SUDOERS FILE:

**cat /etc/sudoers**

We are interested in two lines there. At least, for now.

**root ALL=(ALL:ALL) ALL**

This is the configuration line for the user

**%sudo ALL=(ALL) NOPASSWD:ALL**

And this one for the group. The character which indicates group is %.

Probably you noticed, that we have two entries for group sudo. The last one is used.

### Configuring sudoers for diffrent user

Prin vim:

* "vim /etc/sudoers"
* update-alternatives --config editor
* visudo

### Config line Explained

Exemple of line:

 "user pos1=(pos2:pos3) pos4"

SAU

%group pos1=(pos2:pos3) pos4

pos1 - applies to all hosts

pos2 - user can use all commands as all users (i.e. root can ls as user03, etc)

pos3 - user can use commads as all groups

pos4 - user can use all commads

Pentru a adauga posibilitatea de a utiliza sudo la user trebuie sa adaugam mai intai in visudo aceasta linie de comanda:

**student1 ALL=(ALL:ALL) ALL**

###SUDO FARA PAROLA:

Tot la fel, dar linia de comanda adaugata in visudo arata astfel:

**"student2 ALL=(ALL:ALL) NOPASSWD:ALL"**

4.**Configure the sudoers.d directory**

This file contains one setting, which we will use now.

#includedir /etc/sudoers.d

  I used to create files in this directory with filename which represents the user or group. So, let's use the configs we have previously, but first we will remove the both users which we added earlier. We do it with sed and remove the lines with student from the /etc/sudoers file.

sed -i '/student/d' /etc/sudoers 
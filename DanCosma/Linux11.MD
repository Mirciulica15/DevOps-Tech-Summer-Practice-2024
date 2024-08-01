# Lesson 11: Working with users

1.**INTRO**

In Linux exista 3 tipuri de useri(Standard, user cu privilegii elevate si root).

Command **"whoami"** -afiseaza userul care este logat.

Alt mod de afla acesta informatie, despre toti userii din sistem se face cu comanda: **"id"**.

* User ID (UID)
* Primary group ID(GID)

We wish to learn more about user ubuntu. So, we know his UID (1000), primary GID (1000) and all secondary groups, with their names and GIDs.

UID= Unique User Identifier si spune ce resurse poate folosi si accesa user-ul.

1. UID=0 INSEAMNA ROOT
1. 1-99 reserved for predefined accounts (like games, mail, www-data, sys, bin and more)
2. 100-999 reserved for system and administrative accounts.
3. 1000+ are reserved for users

GID=Group Identifier

(A group is an abstract which combines many users in similar entity (for the same privileges, purpose, actions, etc).)

1. GID 0 is reserved for root.
2. 1-99 are reserved for system and application use.
3. 100+ are for users.

2. **FILES**

We have 4 files involved in configuration of users. Let's go through them one by one.

**passwd**

The first file is the **passwd** file. It is located, like most of config files, in /etc. Let's have a look on it.

The structure of this file is as follows:

username:password:UID:GID:description:homedir:shell

1. **password** - password. Many years ago this was the place where password actually was stored. But for security reasons it chaned and now passwords are available in different form, somewhere else. We will go there later. x in this field means that password is encrypted and stored in the other file.
2. **description** - this field can contain many information. The real first and last name. Address. Phone number. Role in the organization. You name it.
3. **homedir** - the location named as home directory. This is the "home" of the user, where he logs and stores his data.
4. **shell** - simply speaking, the shell is the program which takes the commands sent by user, interprets it, and return the answer.

We can use many shells. Today, however, the most popular is bash (Bourne Again SHell). It is an evolution of sh. Other examples are ksh, zsh (main shell on MacOS) or tcsh.

How to find the available shells? Execute:

**cat /etc/shells** 

 So, by setting shell as /sbin/nologin we ensure, that no one will log in as this user(Some administrative users or technical users don't need to have the possibility to login. ).

**shadow**

This is "the other file" I reffered to minutes ago. This file contains sensitive information about the user, like password, and other configurations. 

Ce trebuie sa intelgem din acest fisier este field-ul username si password.

* if password is set for the user, it is hashed and not retrievable from the file 
* "*" there is no password set (and very good, as we want to use passwordless approach with access keys, no passwords).
* ! password was never set.

**group**

The file /etc/group contains information about groups.

Command: **clear && cat /etc/group**

The structure is as follows:

    group name
    password
    GID
    users belong to the group


**gshadow**

The last file is /etc/gshadow.

Command: **clear && cat /etc/gshadow**

This file contains encrypted passwords for groups.

3.**ADD USER**

PEntru a creea un user se folosesc 2 metode:

1. **useradd**
2. **adduser**

Comanda **"which"** ne arata unde e localizat executabilul. Cu **which useradd** am intrebat unde este executabilul pentru useraddsi raspunsul a fost: "/usr/bin/useradd".

Fisierele ne dau informatiile despre obiect si il putem folosi intr-un mod simplu:"file <object>", dar pot fi combinate 2 comenzi impreuna.

Comanda: "command $(another_command)"

Se executa mai intai another_command fiind data proritatea de **$()** apoi outputul de la comanda va fi executat de command.

file $(which useradd)
file $(which adduser)

So, there is a difference in the output. In fact, useradd is a binary, compiled with the system. adduser is a Perl script, which uses useradd in its backend. Another words, adduser uses useradd when creates user.

COMMANDS:

* **adduser**   -Ex:adduser testuser2
* **useradd**   -Ex:useradd testuser1
Diferenta intre ele in mare parte este ca"adduser" este de tip interactiv.

Cele mai importante argumente folosite in creearea unui USER de tip Admin:

-d - create home directory in specified location, if we want to change

-m - create the home directory

-p - password

-s - provide shell

-c - comments, or description of the account.

Pentru mai multe actiuni se foloseste comanda: **useradd -h**.

Command: **"useradd testuser3 -s /bin/bash -m"**

Verificarea celor 3 conturi:

grep testuser /etc/passwd

grep testuser /etc/shadow

ls -l /home 

4. **MODIFICAREA UNUI USER**

Commands:
1. "passwd"  -In order to change the password we use command passwd <user>. If user is not provided, the password will be changed for current user.

grep testuser3 /etc/shadow

passwd testuser3 

Provide the new password twice.

grep testuser3 /etc/shadow

As you can see, the record changed.

2."usermod" -This modifies the user.

With **usermod testuser3 -g testuser2**

We modified the primary group for testuser3. Right now it is testuser2.

Ok, now it is time to change or add secondary group.

grep testuser3 /etc/group

We just confirmed, testuser3 is attached to testuser3 group only.

usermod testuser3 -G testuser1

grep testuser3 /etc/group

Yep, we added the secondary group 1001.

k, let's add one more.

usermod testuser3 -G testuser2

grep testuser3 /etc/group

Hm... We should have two secondary groups, not one!

This happened because we didn't do the operation correctly. It is a good habit to add a argument to usermod -G. a means here - append.

Corectarea erorii:
* **usermod testuser3 -aG 1001**
*  **grep testuser3 /etc/group**
Acum functioneaza cum trebuie.

Cu argumentele de la comanda **usermod -d** putem creea un director home.

"usermod testuser3 -d /home/anotherdir"

Pentru a creea si a vizualiza directorul home intr-un mod corect trebuie sa mai adaugam inca un argument:

**"usermod testuser3 -d /home/newdir -m"**

Pentru verificare folosim comenzile:

"grep testuser3 /etc/passwd"

"ls -l /home"

"ls -l /home/newdir"


### MODIFICAREA SHELL-ULUI

* **usermod testuser3 -s /bin/sh**
* **grep testuser3 /etc/passwd**


### STERGEREA UNUI USER

Command: **"userdel testuser1 "**

User-ul testuser1 a fost eliminat dar, 
grupul din care facea parte inca exista.

In order to remove secondary groups, we can run

**usermod testuser3 -G ""** -In alte cuvinte am setat grupul existent ca si unul gol.

Pentru a sterge si fisierele asociate user-ului si home este bine sa folosim si aceasta comanda:

**"userdel -rf testuser3"**

Verificarea cu comenzile:
* **grep testuser /etc/passwd**
* **ls -l /home**

5. **QUIZ**

  * Fisierul in care informatia despre useri este stocata?

Raspuns: /etc/passwd

*  I want to learn what is the UID and GId of the user mysterioususer
  
  Raspuns: id mysterioususer

  * GID is:

Raspuns: Group Identifier

*"!" in/etc/shadow means:

Raspuns: Password is not set

* adduser is a:

Raspuns: Perl script

*  With useradd I want to provide a shell. Provide the argument:  -s
  
  * The command for password change is:
  
  Raspuns: passwd

  *The proper arguments for usermod when I want to add another secondary group is:

Raspuns:  usermod testuser3 -aG testuser1

*Removing an user with all his files:

Raspuns: userdel -rf user

* Normal users are created with UID higher than:
  Raspuns: 1000









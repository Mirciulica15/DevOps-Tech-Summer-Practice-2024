# Lesson 10: Crearea de aliasuri

**In cazul in care avem o comanda pe care o folosim de nenumarate ori pe zi putem folosi aliasuri pentru a ne face viata mai usoara.**

**Exemplu concret**:  In loc sa scriem de mai multe ori comanda **"ls -al"** pute sa folosim un alias cum ar fi **ll**.

Pentru a creea un alias ar trebui sa folosim mai intai comanda **"alias"**.

Create an alias for ls with long list, hidden files and human-readable format of size.
####  alias lh='ls -alh'

This alias is available in this session only. It is not available in other sessions, it will be not available when new session is started.

Removing the alias created during this lab:

**unalias lh**

## Creearea de aliasuri permanente.

Avem 2 moduri de a le creea:
1. **".bashrc"**  grep "alias " .bashrc

Astfel putem observa cateva aliasuri existente deja.

We don't care about the strict location in the file for now. We'll add it on the end.

**echo "alias lh='ls -alh'" >> .bashrc** 

Pentru a folosi aliasul trebuie incarcat .bashrc in sesiunea noastra curenta.

* **source ./.bashrc**

### source

Is a very useful in many cases. It reads and executes scripts (or should we say - content of the files, as it doesn't need to be script) in current shell. By default, when we execute a script, it will be executed in its own shell. We will come back to this context soon.

Another file, where we can add our alias is **.bash_aliases**. This file should be loaded automatically when .bashrc is loaded.

With redirections we are able to add something to file (if file exists), or add new file. Let's use it.

* echo "alias lh1='ls -alh'" >> .bash_aliases
* cat .bash_aliases
* source ./.bashrc  loading in current session

## Configurarea de aliasuri pentru toti userii

To this point we created aliases for current user. We are able to create aliases for all users. In order to do this, we have to add something to global configuration.

BEST WAY TO DO IT:

The place where we have to add our aliases is /etc/profile.d.

Files are loaded in alphabetical order, so one of the good practices is to keep numbers in the files, if the order is important for us.

Let's create the file, then, and write another alias.

**"echo "alias lh2='ls -alh'" >> /etc/profile.d/99-aliases.sh"**

As you noticed, we saved it as .sh file.

We can add this alias to the /etc/profile file directly, but it is strongly not recommended.

Let's see if it works. First, we will start new session - sudo -i 


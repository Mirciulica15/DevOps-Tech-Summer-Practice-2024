# 1. Instalare GIT pe UBUNTU

### Check if it is installed: dpkg -l | grep git

The ii in the list means (if there are packages installed, you should see this mark) that the package is correctly installed and available.

apt list git -a

apt-cache pkgnames git

or... Just try run git command

### Installing Git

#### Using apt command

apt install -y git

git --version

# 2. Configurarea Git

## Must haves

So:

* --system - table relevant for the whole machine

* --global - for the current user

* --local (default) for the current repository

Making an entry.

#### git config --global user.name "John Doe"

#### git config --global user.email johndoe@myemail.com

We created our "personality". It can be overwritten with the --local in any of repos.

And now the file .gitconfig in the root directory of our user exist: 

#### ls -al

#### git config --global core.editor vim

Let's see what we have in our config.

git config --list -a ll settings are printed.

git config --list --global - only --global table is listed

git config user.name - selected record is printed.

Configurarea unui Repo:

#### cd test && ls -al

There is a .git directory, which is a hidden one (. on the beginning). This directory is created during git init operation.


Continutul repo-ului .git:

1. hooks: directory contains all custom hooks. These are small (usually) scripts which have to be executed before commit, or after, before push, etc.
2. HEAD - pointer to the current branch and its latest commit.
3. config - configuration file for the repository
4. info - the place where you stage the files using git add.
5. refs - the current state of the whole repo.
6. objects - commits, trees and blobs are stored here. May be very big.
7. logs
8. description - descrierea repositori-ului.

#### cat .git/config

Momentan nu are mare lucru in el, dar dupa ce incepem sa lucram cu trees. branches, remote acesta va avea maimmulte linii.

Ex:
[core]

        repositoryformatversion = 0
        filemode = true
        bare = false
        logallrefupdates = true

### Exemple Utile

#### git config --global color.status auto

#### git config --global color.branch auto

#### git config --global color.interactive auto

#### git config --global color.diff auto

#### git config --global alias.adog "log --all --decorate --oneline --graph" 

Toate aceste comenzi adauga culoare codului .

## adog 
Este cel mai popular mod de a retine cele mai utile seturi de parrametrii pentru **git log**.

#### git config --list

We have a file to commit in the repo. We can do it now, as we configured our user.

git add .

git commit testfile-01 -m "create testfile-01" 

And now it is time to execute our alias.

#### git adog 

## a7b619b (HEAD -> master) create testfile-01

# Commiting Files

### 1.Imitializarea Repo-ului

Create a directory

#### mkdir test-repo

and navigate there

#### cd test-repo

The directory is obviously empty

#### ls -al

Now it is time to initialize repository

#### git init

Now you should be able to execute status command

#### git status

And also the .git directory

#### ls -al 

Creating the first file:

#### touch newfile && echo > newfile
#### git status
Ca si output terminalul ar trebui sa dea new file este: **untracked**.

Adding a file to the staging area:

#### git add newfile

You see that the file is tracked and ready to be commited.

It is important to know, if you stage the file once, you don't need to repeat this action again during the work.

COMMITING A FILE:

Comit este un proces careava salva o versiune a fisierului in Version Control.

## git commit newfile -m "my first commit
E SFANT

Adaugand "-m <comment>" descriem ce se intampla in acest commit.

Folosind argmentul **-a**  dam commit la toate fisierele din repo.

Folosind **.**  comitem schimbarile de pe path ul curent in mod recursiv.

## Adaugarea si Commit-ul mai multor fisiere

The file inside the directory is not visibe, as the directory itself is not tracked yet. But Git is aware, that this directory is not empty, therefore we see it as ready to be added.

Second directory is empty, Git knows that, and it decides that adding the directory at this moment is not needed.

#### Command: git add .

Now, your file is listed as listed to be commited. Empty directory is ommited.

git add . will add all files from your current directory and subdirectories, not from repository's root. If you are in subdirectory, only files from this path will be added.

Now we are ready to commit.

git commit -m "my second commit"

Let's check

git status

You succesfully commited multiple files!

# 4. Removing a file from commit


### Removing a file from stage

A single file:

*  git -rm --cached testfile-01
* git status

Removing multiple/all files from stage:

* git rm --cached -r.
* git status

"." -Folosit sa spunem: TOT DE AICI

'-r' - Inseamna recursiv

### Revenirea la state-ul initial


* git log
* git status

Putem sa vedem ca au aparut niste modificari in fisiere dupa primul commit.

Mai intai verificam ce se afla in fisier:

* cat testfile-01
* git checkout testfile-01
* cat testfile-01
* git status

Am reusit sa resetam cu succes fisierul in starea sa din comit ul initial.

We succesfully reset the file to the state from previous commit, using git checkout. In this way we do the checkout of the last indexed state of this file on current branch.

In similar way like in some scenarios before, we can remove all changes in one short command.

* git checkout .
* git status

### Alta modalitate de a ne intoarce

Reset the current HEAD to the selected state

**git reset** mutaa pointer-ul curent si branch refs in starea specifica.  

**Reset** are 3 nidakitati principale de operare, dar noi ne ocupam de 2 dintre ele.

1. **--soft**

git log shows that we have many changes done. We have one commit for each file.

**git log**

Let't reset the HEAD to the state before commiting the last file.

But before, let's see what is inside the files

* cat testfile-04

* cat testfile-02

* git reset --soft HEAD~1

With --soft parameter we came back to the previous HEAD of the repository, but all changes which we commited are unchanged.

2. **--hard**

O instructiunwe mult mai puternica

**git reset --hard HEAD~2**

Verificam efectele: 

* git status

* git log

* cat testfile-04

* cat testfile-02 

We came back two more commits (~HEAD~2) and we said, this time we want to not only move back, but also we want to remove all changes which were done.


# 5. VISUAL COMMIT

Test editor to create a message for commit

Schimbam modalitatea de a adauga mesaje la commit-uri(-m):

* cd test 
* git commit testfile-01  This was the default editor where we can add stuff(add, commit).

### Default Editor

verificam mai intai configuratia:

git config --global --list | grep editor

What we've done? We asked git to show us the whole configuration in global space. We can use system and local too. Local obviously means the configuration of this specific repo. Also, we grep the output to find information about editor only.

Changing basic editor to VI.

git config --global core.editor vi

# 6. REVERT CHANGES

Git reset functoneaza pentru revenirea la primul commit, dar are un dezavantaj, el fuctionand doar pentru noi pt ca mutaam HEAD in repo ul nostru local.

The best way, best practice to revert, or more "revert" changes is to create new commit from previous one. To avoid situation that HEAD will moved somewhere where it shouldn't be.

## GIT REVERT

We have our repo prepared, two files created and two commits done. Let's see how it looks.

cd test

git status

git log

Let's move ourselves back by one commit.

git revert --no-edit HEAD

We succesfully moved back by creating new commit.

git log

By using --no-edit we informed git that we don't want to pass any message and we ask to use default. We will see what git did for us, using git log soon.

So, now we are back one commit from two already done and... we have three commits. Strange? Please, try to think about the logic behind. We do not want to create problems for other users which can work on the same repo with us. So, we 'go back by going forward'. We keep the history and logic process of work, however we bring back the part of the work from kind of 'backup'.

Our current status is like this: we are between two commits, for file-01 and file-02.

Let's have some fun, and revert our revert. Shall we?

git revert --no-edit HEAD

Before you run next commad, please try to imagine what happened in our git :)

git log

Of course, we can revert more changes than the last commit.

We can revert multiple commits by

git revert --edit HEAD~3

This time we reverted to the beginning of our history. And we forced git to give us possibility to add message (by the way, --edit is default behavior).

So, to make sure we all are on the ame page. HEAD is the current 'place' where we are. For now, let's think about it as combination of current branch and current place in git history.

So, with HEAD~3 we said: I want to move back from HEAD by 3 commits . But that's not all. This place becomes our new HEAD .

We can revert to specific commit hash too. more about hashes in git log scenario.

Important Very often you can experience problems when revert more than one commit and the same file is involed. We will talk about troubleshooting in future lesson.


# 7. Checking Differences

Compararea unor schimbari cu comituri deja executate.

Another command, **git diff**, allows to check the differences between HEAD and current working directory. Another words, what was changed during our recent work.

#### git diff

As usual, this command checks HEAD by default. However, we can modify it.

clear && git diff HEAD~1

As you can expect, when we go deeper into past, more information is printed. If we want to avoid the mess, we can check diff for one file.

clear && git diff HEAD~1 testfile-01

Now we see information about testfile-02 only in comparision of current working directory and one commit before HEAD.

#### Diferente in stage

 git diff shows differences between commit and working directory.

Testam creand un nou fisier cu comanda:

touch testfile-03 && echo "testfile-03" > testfile-03 && git add testfile-03

Asfel am creat ceva nou si a fost adagat in staging, dar nu apare inca nici o diferenta daca vrem sa verificam cu git status.

Pentru a vedea diferenta intre staged work si HEAD(git status) trebuie sa spunem explicit:

#### git diff --staged

#### GIT SHOW

alta comanda utila este **git show**. Aceasta ne ofera informatie similara ca si **git log**.

git show functioneaza implicit impotriva HEAD. Poate fi folosit pentru orice fisier sau comit.

# 8. INFORMATII DETALIATE DESPRE COMMIT URILE PRECEDENTE.

Revenim la sfantul git log si s-ar putea sa folosim version control cu el.

## Formatarea informatiei din git log


Remember to quit git log with q. If logs are longer than your screen, it always goes to interactive mode.

## Best for programmatic access

Sometimes you want to check commits through scripts. In this case git log itself is unhandy.

#### cd test && clear && git log --oneline

--oneline shows only most important info about commits. You have only hash and commit message.

But hey! We can do this for all commits!

#### clear && git log -p 

Daca vrem sa vedem cat work a fost facut la un commit folosim comanda:

* clear && git log --stat

Now we can clearly see how many lines were added or removed in each commit.

Maybe you wish to see the information sorted by author of the commits?

**clear && git shortlog** is the answer!

## Cleaner Output

Daca vrem sa vizualizam lucrul cu branch-uri:

#### git log --graph

Git ne da posibilitatea de a conecta mai multi parametri cu altii intr-o singura comanda:

### clear && git log --oneline --graph
Cleaner and better option.

## Formatarea

Pentru a avea un output mult mai colorat folosim comanda parametrulul: **--decorate**.

Ex: 
* %blue
* %Creset
* %H -commit hash. de preferabil shorthash cu %h
* &an who commited changes
* %ad -date of commit.Pentru scripturi de poate folosi Unix timestamp -%at.
* %s commit message

Cum se formateaza si se folosesc ele? Cu:

git log --pretty

Ex: 
clear && git log --graph --pretty="%C(yellow) Hash: %h %C(blue)Date: %ad %C(red) Message: %s " --date=human

Please, go through the command and understand all arguments.

Let's test some different ideas. Try to guess what the command output will be, before you execute them!

clear && git log --graph --pretty="%ad" --date=short

For better clarity you can add format to parameter

git log --graph --pretty=format:"%ad" --date=short

It will do the same. Here are another examples.

clear && git log --graph --pretty="%ad"

clear && git log --graph --pretty="%at"

clear && git log --graph --pretty="%as"

clear && git log --graph --pretty="%C(bold blue)%h"

clear && git log --graph --pretty="%C(bold blue)%h %Cred%s %C(Yellow)by %an"

Another example found on the Internet

clear && git log --graph --pretty=format:"%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset" --abbrev-commit

But... Will you enter this command every single time? No? What you need is on the next page 

## Git config si Aliases

Previously, we used very long command. Let's create an alias for it. We need to add it to the git config file. Of course logical will be to add it to global table.

#### git config --global alias.lg 'log --color --graph --pretty="%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset" --abbrev-commit'

We instruct git that we want to change configuration (config), on global table (--global) and we configure alias called lg (alias.lg). The alias itself is inside the '' section.

Now you can execute your alias

**clear && git lg** 

##Querying

Adica -Searching through git log.

clear && git log --author="John Doe" will show all commits done by specific author.

clear && git log --author="John Doe\|Joe Smith" - with this regex we asked for all commits authored by these two people.

When we work with tools like Jira, we have amazing identifier given by the tool - Jira ticket number. So our commit message should look similar to:

JIRA-1234 my commit message

#### clear && git log --grep="JIRA-1234"

Another way is to look at logs for specific file.

clear && git log -- testfile-01

clear && git log -- testfile-02 branchfile-01

Please notice the --. This way we inform git that we have files, not branches in mind.

We can compare two branches

clear && git log master..second-branch

clear && git log second-branch..master

Please, notice the differences between those two!!

Previously we tried to look for "merge" messages. There is better way.

clear && git log --merges

So, how to exclude merge commits:

clear && git log --no-merges

In our example it will not work very well, but we can search using dates

clear && git log --after=2021-4-21

clear && git log --before=2021-4-21

clear && git log --before 2021-4-30 --after=2021-4-1

clear && git log --after=yesterday

on the end, the easiest thing. We can limit number of returned commits

clear && git log -1

clear && git log -3

And also we can mix search functionalitites

clear && git log -1 --grep="JIRA"

clear && git log -5 --grep="commit" --oneline

Please notice revert message, without commit. hm... Please, check why we see it?

# 9. HOW TO FIX CONFLICTS

We will create a conflict in unusual but not uncommon way. In the background the system did some work, commits, etc. Now our goal is to go back two commits with revert. Unfortunately, our last two commits are about the same file.

Let's go to our repo cd test

How the history looks now?

git log --oneline

And for the curiosity, what is in testfile-02 ?

cat testfile-02

Let's try to do revert.

clear && git revert --no-edit HEAD~1

Ouch...

CONFLICT (content): Merge conflict in testfile-02
error: could not revert XXXXXXX... my new feature

Let's see what we have in file

cat testfile-02

Thank you git. You were supposed to destroy mess in the universe, not create one!

But wait... Let's look closely what happened.

How the revert works? It removes changes from selected commit, not from all changes!. Now things should be more clear, right?

    change1 commit
    change2 commit
    revert to change1

That means, we have change2 unattended!

<<<<<<< HEAD
This is my important change
=======
>>>>>>> parent of XXXX... my new feature

Here is our conflict.

<<<<<< - this is what we have in current branch

====== = center of our conflict

>>>>>> - this wants to be merged / added. In our case this part is empty (as it should be).

How to solve it? The simplest will be... talk with developers who did the changes which we are reverting, first. Find common solution. And then use vim and make appropriate changes.

Normally you should use vim , and remove lines from 2 to 5 . But here we do:

sed -i '2,5d' testfile-02

We removed mentioned lines. Now the file looks like we want.

cat testfile-02

Please notice, this example is extremely simple :)

The last thing to do is to add and commit the file again. Please look carefully on comments after

clear && git status

Ok, let's do the work.

git add testfile-02

git status

clear && git commit testfile-02 -m "fixed conflict"

git status 

Tools to help us fix conflicts:


    git-mergetool (part of the git package, you need to specify proper tool which will be invoked)
    Plugins to your beloved editor
    Kdiff3
    Meld


# 11. HOW TO IGNORE CONTENT

## Holy .gitignore

Files that should be ignored:


    artifacts
    tarballs
    temp files
    binaries
    additional libraries (needed for compilation, for example)
    other


Ne da posibilitatea sa controlam ce va fi sincronizat cu remote repo si ce nu va fi

Acest lucru se realzeazacu ajutorul fisierului .gitignore

Creating the .gitignore file.

touch .gitignore

echo neveringit >> .gitignore

echo seconddirectory >> .gitignore

cat .gitignore 

Let'ss check the status again

git status

Ok, we are ready to run

git add .

and

git status

And commit

git commit -a -m "first commit"

And now we can run git status to see what is changed.

Yes, we can confirm, what shouldn't be in remote isn't on the list.

### More Configs

More configs

Ok, so now we are able to ignore some specified files.

Now we want the file with the same name neveringit from firstdirectory to be sent to remote. Maybe it is only an example how it should work. Some instruction for other people for example.

Let's create additional file then.

touch firstdirectory/neveringit

And its content

echo "this file has to go to git!" >> firstdirectory/neveringit

Ok. do

git status

git add . and then again

git status

Well. It is not what we want.

Ok, first, we know, the filename we used itself works for all directories in repo. Git has strict rules how these 'masks' work, please check in documentation if you want to have it more complicated.

The good practice is to be as most specific as possible. So, what we need, really is:

**/neveringit
!firstdirectory/neveringit

First line says explicitly - all files anywhere in the structure (and now it is clear, readable and visible

In second line the exlamation mark negates the pattern. Another words, we negate the deny and allow this file to be sent to remote.

Ok, let's check.

sed -i 's/neveringit/**\/neveringit/g' .gitignore

echo '!firstdirectory/neveringit' >> .gitignore

And check

cat .gitignore

Ok, to be sure, let's do an experiment.

mkdir thirddirectory && echo "gotogit" > thirddirectory/togit && echo "not for git!" > thirddirectory/neveringit

After a

git add . let's run

git status

Yep, we can confirm, neveringit file is never added to commit, except only one situation: when we forced it.

## 12.GIT TAGS

Tag-urile sunt foarte puternice cand sunt folosite corect.

## Create a tag

* cd work
* git status
* git adog

We can do lightweight tags or annotated. Honestly, I do not like the first one. I prefer annotated tags as we can see some info there.

 For lightweight tags git creates something similar to branch that doesn't change. In case of annotaded tag, git stores it as whole odject in database.

 Checking if we have tags:

 * git tags

Make the tag:

* **git tag -a v1.0 -m "version 1.0. initial state"**
  
  You can use what you wish for a tag. But good practice is to use v and number which describes the changes from previous tag. How to create proper tagging strategy - there is many documents about it.

  ## Check the tags

  * git tag
  * git show v1.0

## Moving tags and navigation

Let's try with checking what we have and the we tag current HEAD.

**git adog**

As we can see, tag v1.0 is marker somewhere in the middle.

Ok, we do the new tag now.

git tag -a v2.0 -m "version 2.0. A lot of new features"

git tag

git adog 

## Tag by commit

We had to tag our state with v1.5 after the commit for testfile-06...

No worries, we still can do it.

git adog | grep 'testfile-06' | awk '{print $2}' | head -n1

grep 'testfile-06 - this will select entries with message where this filename occurs (not the best way, but in our case it is more than enough).

awk '{print $2}' - with awk we are 'cutting' the output and print only the third (counted from 0) element, where separator (default one) is a space.

head -n1 - on the end we are printing ony the first element (if there is more records with the same name). git log shows commits by descending through date, so this works for us.

#### Automation:

Changing output of the command above into variable.

commit2tag=$(git adog | grep 'testfile-06' | awk '{print $2}' | head -n1)

To be sure, we confirm if variable contains proper value.

cat $commit2tag

Now we will use this variable for commit.

git tag -a v1.5 -m "version 1.5. Some updates" $commit2tag

git tag

git adog

We succesfully tagged commit from history.

## Navigate through tags

clear  && git tag

let's jump to first tag

git checkout v1.0

Ok. We switched. Probably. Let's check.

git adog

Yes, HEAD is on the same commit as tag v1.0.

But...

Where we are on our branch?

git branch

Oh... We are detached from master. Makes sense, we jumped back into past.

Ok. log gives us information where we are. Let's be sure.

git tag

Hm... Not very helpfull, right?

To check what on what tag you are currently on, use

git describe

Or

git describe --tags

to be more exact.

git describe will return info about current tag. If there is no tag created yet, git will throw an error. If we are somewhere in the middle:

commitbetweentags=$(git adog | grep 'testfile-05' | awk '{print $2}' | head -n1)

git checkout $commitbetweentags

git adog

git describe

We see now the tag on which we already started to build our changes.

## Deleting a tag

Ok, let's go back to the Master branch (what means to the top of our work before the recent change - in our case).

git checkout master

And now we delete v1.0 tag.

git tag -d v1.0

git tag

git adog

Yep, tag is deleted.

# 13. Merge Branches

The power of version control is also the possibility to work on different versions of the code simultaneously. In order to achieve that, we have the branch functionality.


BRANCHES = As Atlassians explains, branch represents an independent line of development. We create branches to independently and uninterruptly work on some functionality, which later is merged to the main line.

cd merge

The system prepared a few commits in the background. Let's see them.

git adog

Now we can check what branches we have and also on which branch we currently are.

git branch

Our current branch is pointed by asterisk (and color if enabled).

Ok, we are ready to create and swith to just created branch. We are lazy, so let's do it with one line command.

git checkout -b newbranch

git checkout moves us between branches. When we add -b, a new branch is created.

Are we on proper branch?

git branch

Yes, we are.

By the way, when git branch -r is executed, we list branches from remote. In our case we cannot do it, as we didn't set the remote for our repo.

Let's do some commits.

touch branchfile

echo "this was done on branch!" >> branchfile

git add .

git commit branchfile -m "first commit on branch"

echo "added on branch" >> testfile-02

git commit testfile-02 -m "second commit on branch"

git adog

We see the log is quite flat now. That's ok. In fact, we have this:

git-merge-step1.png

Right, let's make some changes on master and then come back to this branch.

git checkout master

Confirm the proper branch by

git branch and check what we have in log

clear && git adog . Please notice the difference between HEAD pointer when checked on branch or master.

touch testfile-05

echo "this was done on master!" >> testfile-05

git add .

git commit testfile-05 -m "next commit on master"

echo "added on master" >> testfile-01

git commit testfile-01 -m "another commit on master"

git checkout newbranch

echo "another change on branch, again" >> testfile-02

git add .

git commit testfile-02 -m "commit from branch"

git adog

Ok, let's go back to master.

git checkout master

clear && git adog

This is what we have now:

git-merge-step2.png

Ok, now git log shows some trees, at least :) Why?

Simple, there are more changes, done in different time on different branches. The files and content of them started do be different.

The picture shows curent state.

Now we can switch to master and merge changes.

git checkout master

git merge newbranch --no-edit

clear && git adog

And this is the final state. Merge created a new commit to reflect changes caused by the process.

Final status is like on the picture below.

git-merge-step3.png

As we finished work on branch, we can delete it

git branch -d newbranch && git branc

## Conflicts

During the work on two branches it is possible that the changes will be implemented to the same file.

The system prepared the repo, let's see what we have in branch. One file was modified in master and in branch too.

So, let's switch to new repo.

cd ~/merge2

git branch

git adog

git checkout master && git adog

We are ready to merge.

git merge newbranch

Ouch.

What happened?

Well, testfile-02 was updated that way, that different changes are done in the same place.

We need to fix the conflict.

Let's take it easy now. We remove only these things which are pointing the conflict.

cat testfile-02

sed -i '8d' testfile-02 && sed -i '5d' testfile-02 && sed -i '3d' testfile-02 && cat testfile-02

Ok.

git status says, we need to confirm fixes by adding the file to stage again.

git add testfile-02

Now we are ready to finalize merge

git commit -a -m "confirm merge"

git adog - yes, this is what we expected

and what we have in our problematic file?

cat testfile-02

git branch -d newbranch && git branch 

## Better approach

Better approach

If you work on huge amount of changes, the good practice is to merge the master to your branch before merge to master.

It doesn't help to solve conflicts, but conflict will be on your branch, not master. What is definitelly more confortable for everyone.

Ok, we need to go to the new repo

cd ~/merge3

Ok, we are on the branch, let's do the merge.

git branch

git merge master --no-edit

Yes, we have conflict, but master is still clean.

sed -i '8d' testfile-02 && sed -i '6d' testfile-02 && sed -i '3d' testfile-02 && cat testfile-02

Worth noticing, the center of the conflict (=======) lies in different place than in the example in conflicts lesson.

Now, like last time, we need to stage and commit file.

git status

git add testfile-02

git commit -a -m "merge master to newbranch"

git adog

Ok, we fixed problems, and we are ready to merge our changes on master.

git checkout master

git merge newbranch --no-edit

git adog

So, we completed our merge.

git branch -d newbranch && git branch


# 14. Git Rebase

## Merge VS Rebase

**Merge**: It is quite simple. We create branch, do changes here and there and then merge. Work history should show exactly this. Let's check.


System creates two repos. One in merge directory, where all process was completed (final merge). Let's see how our history looks.

cd merge

git adog

(do you remember our "a dog" config setting from git config module?)

Pretty simple, and nothing new. So, how rebase works?

**Rebase** 

We are using rebase to make history more clean, clear and ordered. This clearly means, we play with history of commits. Not in the very aggresive way, but still, history is kind of corrupted. This is huge risk when a huge team is working on the same repository.

It is imperative to understand the rebase, especially the risks behind.

We are using rebase to make history more clean, clear and ordered. This clearly means, we play with history of commits. Not in the very aggresive way, but still, history is kind of corrupted. This is huge risk when a huge team is working on the same repository.

Also rebase may lead to many conflicts.

Ok, it is time to explain the steps.

    1 step is similar to previous activity - merge. We have master and branch.
    Step2. When we perform the rebase operation, parent commit of the branch (the one from where we created branch) is moved to the HEAD of master, all differences between master and branch are merger and all commits on the branch are "copied/moved" (with all respective changes from master branch).
    Step 3. The last thing is to do merge on master branch in order to move HEAD of master to the proper place.

Let's see it in the example.

System prepared second repository in rebase directory, and the state is exactly the same like in the merge repo, but without final merge.

cd ../rebase

git adog

We see that branches are not merged.

Let's switch to the second-branch (in case if we are not there, but we should) and do the rebase with master.

git checkout second-branch

git rebase master

git adog

Right now we can see two things

    history looks totally different. Is 'flat' now and shuffled.
    HEAD of master is in the wrong position.

If we leave it that way, believe, we generate a chaos, mess, and comments of hatred ;P So, let's switch to master and then move the marker by merge the branch to master.

git checkout master

git merge second-branch

git adog

Now we have HEAD in proper place and the history which, in fact, does not represent the past work order, but is more readable.

Pleace notice, the merge was created in 'fast-forward' mode. It means that no additional commit was created, but the HEAD marker was moved.

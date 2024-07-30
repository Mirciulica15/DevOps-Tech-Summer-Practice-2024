-----------------GIT-------------------

git config --global --list  

--system - table relevant for the whole machine  
--global - for the current use  
--local (default) for the current repository  

git config --global core.editor vim  

git config --list  -  see settings  
+ --global => only --global table is listed  
git config user.name => returns username  

----------  

ls -al .git  

----------  

So, what is what? Let's explain the important files /directories.  

hooks directory contains all custom hooks. These are small (usually) scripts which have to be executed before commit, or after, before push, etc.  

branches - this is deprecated. Don't think about it anymore.  

HEAD - pointer to the current branch and its latest commit.  

config - configuration file for the repository.  

info - the place where you stage the files using git add.  

refs - the current state of the whole repo.  

objects - commits, trees and blobs are stored here. May be very big.  

logs - quite self explanatory.  

description - description of the repository.  

------git aliases------  

git config --global alias.adog "log --all --decorate --oneline --graph"  

Explanation. A dog is very popular way to remember the most useful set of parameters for git log.  

git adog

-----------------------

--------------------------------3: Commiting the first files--------------------------------------  

git init  

git status  

-m <comment>  

remove commited files  

git rm --cached <filenames>  

git rm --cached -r .  

remove all files  

------

git checkout <namne> / .  
reset

--soft / --hard  

git reset <--soft/--hard> HEAD~<number>  

go back to the state before commiting the <number> file  


-------------------------------------5: Visual Commit---------------------------------------  

not much here  

commit without -m and write there  

------------------------------------ 6: Revert changes--------------------------------------

git revert --no-edit HEAD  

--no-edit - we inform git that we dont want to pass any mesg and ask to use default  

git revert --edit HEAD~3  
--edit we forced git to let us add messages  


------------------------------------ 7: Check the Differences-------------------------------  

git diff  -  shows difference between HEAD and current working directory  

git diff HEAD~1  -  go deeper into past  

TO AVOID MESS CHECK FOR ONE FILE  

git diff HEAD~1 testfile-01  

git show == similar to git log  

------------------------------------ 8: Detailed info about prev commits--------------------  

cd test && clear && git log --oneline  

--oneline shows only most important info about commits. You have only hash and commit message.  

clear && git log -p  


git log --stat  

--stat  ==  show how many lones were added or removed in each commit  

--------------------  

clear && git shortlog  

show info sorted by author of the commits  

--------------------

git log --graph  

clear && git log --oneline --graph  

See branches and stuff  

--FORMATING--  

clear && git log --graph --pretty="%C(yellow) Hash: %h %C(blue)Date: %ad %C(red) Message: %s " --date=human  

THAT LINE LOOKS GOOD  

---------------------  

clear && git log --graph --pretty=format:"%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset" --abbrev-commit  

EVEN BETTER  

----ALIAS FOR IT----   

git config --global alias.lg 'log --color --graph --pretty="%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset" --abbrev-commit'  


Now you can execute your alias  

clear && git lg  

----------QUERYING------------

clear && git log --author="John Doe" will show all commits done by specific author.  

clear && git log --author="John Doe\|Joe Smith" - with this regex we asked for all commits authored by these two people.  


clear && git log --grep="JIRA-1234"  

-----------  

Another way is to look at logs for specific file.  

clear && git log -- testfile-01  

clear && git log -- testfile-02 branchfile-01  

Please notice the --. This way we inform git that we have files, not branches in mind.  


----MERGES DATES AND STUFF----  

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


--------------------------------- 9: Houston, we have conflicts!!!-------------------------------  

How to solve it? The simplest will be... talk with developers who did the changes which we are reverting, first. Find common solution. And then use vim and make appropriate changes.  

Normally you should use vim , and remove lines from 2 to 5 . But here we do:  

sed -i '2,5d' testfile-02  

We removed mentioned lines. Now the file looks like we want.  

cat testfile-02  

!!SEARCH MORE ON YT!!  

There are tools which can help you to resolve conflicts. Examples are  

git-mergetool (part of the git package, you need to specify proper tool which will be invoked)  
Plugins to your beloved editor  
Kdiff3  
Meld  
and many more.  

------------------------GIT IGNORE----------------------------   

.gitignore  

Just add name of the files to ignore  
use what is below to break the pattern  

**/neveringit  
!firstdirectory/neveringit  


First line says explicitly - all files anywhere in the structure and now it is clear, readable and visible  

In second line the exlamation mark negates the pattern. Another words, we negate the deny and allow this file to be sent to remote.  

----------------------------GIT TAGS------------------------------

git tag --- shows tags   

git tag -a <name> -m <comment> --- create tag    

git show <tagName> --- show tag   


git tag -a <name> -m <comment> <commitID>   ---  creates tag for older commits (not HEAD)   


git checkout <tagName>  ---  move HEAD to that specific commit without affecting master branch   

git describe --- shows what tag are you on like pwd ish  

git describe --tags  ---  its more exact  


git tag -d <tagName>  ---  delete X tag  


-----------------------------GIT BRANCHES--------------------------------

git branch --- shows all branches  

git checkout -b <name> --- creates new branch  

LOOK OVER THIS ::: sed -i '8d' testfile-02 && sed -i '5d' testfile-02 && sed -i '3d' testfile-02 && cat testfile-02  

git merge

IF CONFLICTS APPEAR DONT FIX THEM ON MASTER GO ON SECONDARY BRANCH THEN FIX IN THERE AND AFTER THAT MERGE ON MASTER!!!  

GIT REBASE --- LOOK OVER IT ON YT  















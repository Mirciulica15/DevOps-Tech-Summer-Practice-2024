At this moment we are working on global table, which means we are setting global configuration, relevant everywhere for this user, until overwritten  
--system - table relevant for the whole machine  
--global - for the current user  
--local (default) for the current repository  

example:
git config --global user.name "John Doe"  
git config --global user.email johndoe@myemail.com  

git config --list -a ll settings are printed.  

Config of the repository  
In the background system created a directory and initialized git repo.There is a .git directory, which is a hidden one (. on the beginning). This directory is created during git init operation.    
->hooks directory contains all custom hooks. These are small (usually) scripts which have to be executed before commit, or after, before push, etc  
->branches - this is deprecated  
->HEAD - pointer to the current branch and its latest commit  
->config - configuration file for the repository  

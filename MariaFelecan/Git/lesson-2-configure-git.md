* git configuration

git config --global --list
(if this returns an error, git is not configured)

    --system - table relevant for the whole machine

    --global - for the current user

    --local (default) for the current repository

* how to configure git:

    git config --global user.name "John Doe"

    git config --global user.email johndoe@myemail.com

here we are working with the global table, which means we are setting global configuration, relevnt everyhere for THIS USER, until overwritten
- what we wrote can be overwritten with --local in any of the repos

if we run ls -al , we can see now .gitconfig file

* configuring the editor:

    git config --global core.editor vim

* printing configurations:

    git config --list : all configurations
    git config --list --global : only --global table is listed
    git config user.name : selected record is printed

* git directory structure

    hooks = directory that contains all custom hooks
        - these are small scripts which have to be executed before commit, or after, before push

    branches - this is deprecated. Don't think about it anymore.

    HEAD - pointer to the current branch and its latest commit.

    config - configuration file for the repository. when we start using branches, remote, more lines appear

    info - the place where you stage the files using git add.

    refs - the current state of the whole repo.

    objects - commits, trees and blobs are stored here. May be very big.

    logs - quite self explanatory.

    description - description of the repository.

* git prettier

    git config --global color.status auto

    git config --global color.branch auto

    git config --global color.interactive auto

    git config --global color.diff auto

    git config --global alias.adog "log --all --decorate --oneline --graph"

* adding a file & commiting

    in order to commit, the user configurations must be set up
    We have a file to commit in the repo. We can do it now, as we configured our user.

    git add .

    git commit testfile-01 -m "create testfile-01"

    And now it is time to execute our alias.

    git adog











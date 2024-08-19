* git rebase master

    - used to make history more clean, clear and ordered
    - modify the history of commits

    STEPS:
        --> merge : master and branch
        --> parent commit of the branch (from where we created the branch) is moved to HEAD of master, all commits on the branch are copied/moved
        --> merge on master in order to move HEAD of master in a proper place

* example of working with rebase:
    we switch to the branch and then: 
    - before rebase:

        * 3a92fa2 (master) another work on master
        | * 2c87000 (HEAD -> second-branch) commit of branchfile-02 in branch
        | * 0067c8d commit of branchfile-01 in branch
        |/  
        * 96d70a5 JIRA-1234 my better feature!
        * dfc894e Revert "my new feature"
        * e5d2c84 my new feature
        * 7109610 commit for all new files
        * 5395ba4 commit for testfile-02
        * c47d922 commit for testfile-01

    - after rebase:

        * 3a45c98 (HEAD -> second-branch) commit of branchfile-02 in branch
        * 3d2f705 commit of branchfile-01 in branch
        * 3a92fa2 (master) another work on master
        * 96d70a5 JIRA-1234 my better feature!
        * dfc894e Revert "my new feature"
        * e5d2c84 my new feature
        * 7109610 commit for all new files
        * 5395ba4 commit for testfile-02
        * c47d922 commit for testfile-01

     BUT HEAD of master is i a wrong place!!
     so we need to switch to master and then move the marker by merging the seconf branch into main

    git checkout master

    git merge second-branch

    git adog

        * 3a45c98 (HEAD -> master, second-branch) commit of branchfile-02 in branch
        * 3d2f705 commit of branchfile-01 in branch
        * 3a92fa2 another work on master
        * 96d70a5 JIRA-1234 my better feature!
        * dfc894e Revert "my new feature"
        * e5d2c84 my new feature
        * 7109610 commit for all new files
        * 5395ba4 commit for testfile-02
        * c47d922 commit for testfile-01

    now HEAD marker was oved and its pointing to master too
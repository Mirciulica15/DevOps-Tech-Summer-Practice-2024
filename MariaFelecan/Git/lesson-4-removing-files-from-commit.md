* removing files from the commit

        * to remove a file from the stage : git rm --cached testfile
        * to remove all files from the stage: git rm --cached -r .   (notice the . this means everything from here)
        * to reset a file not commited to a previous version: git checkout testfile
        * to reset all not commited files : git checkout .

    - to see our commit: git log

    - git reset 
    
        -> moves the current pointer in HEAD and branch refs to specific state
        -> 3 ways to operate : --soft --hard --mixed

        * git reset --soft

        git log - list of all commits
        git reset --soft HEAD~1

        with --soft parameter we came back to the previous HEAD of the repository, but all changes which we commited are unchanged

        * git reset --hard

        git reset --hard HEAD~2

        with --hard we came back two more commits (~HEAD~2), this time we want to not only move back, but also we want to remove all changes which were done
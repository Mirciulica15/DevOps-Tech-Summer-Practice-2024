* commiting files

- step 1 : initializing the repo (if it was not already cloned)

    -> creating a directory: mkdir test-repo
    -> navigate there
    -> initialize the repository: git init
    -> check with git status & with ls -al (if .git is there)

- step 2 : creating a new file

    -> create a new file, if we check git status, it will say that the file is untracked
    -> git add mynewfile - this stages the file
    ! if i staged the file once, i dont need to do it again during the work

- step 3 : commiting the file

    -> git commit mynewfile -m "my first commit" ( by ading -m we can add a comment)
    -> or we can do: git commit -a (commits all)   /  git commit .  (commits changes from current path recursevly)

! tree : shows us the folders structured

* commiting directories

if a directory is empty, git doesnt put it as untracked, it ignores it completely for now

    -> git add .  = adds all files from my current directory and subdirectories, not from the repository root!!
    -> git commit -m "my second commit"
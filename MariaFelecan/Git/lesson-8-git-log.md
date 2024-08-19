* formatting info from git log

    -> we can quit git log with q
    -> goes into interactive mode when logs are longer than the screen

    --oneline : only most important info about commits (only hash and cmmit messages)

    git log -p : git lof + diff
    got log --stat : we can see how many lines were added or removes in each commit
    git shortlog : we can see info sorted by the author of the commits
    git log --graph : we can see the logs on braches and how they come together
    git log --oneline --graph : graph that is more conceise

    -> --decorate parameter

        %Cblue - switch output text to blue

        %Creset - resets the color to default

        %H - commit hash. Preferable is to use short hash with %h.

        %an - who commited the changes

        %ad - date of commit. For scripting purposes you can use UNIX timestamp - %at.

        %s - commit message
    
    -> git log --pretty

        * git log --graph --pretty="%C(yellow) Hash: %h %C(blue)Date: %ad %C(red) Message: %s " --date=human
        * git log --graph --pretty="%ad" --date=short
        * clear && git log --graph --pretty="%ad"

        * clear && git log --graph --pretty="%at"

        * clear && git log --graph --pretty="%as"

        * clear && git log --graph --pretty="%C(bold blue)%h"

        * clear && git log --graph --pretty="%C(bold blue)%h %Cred%s %C(Yellow)by %an"

    -> aliases

    git config --global alias.lg 'log --color --graph --pretty="%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset" --abbrev-commit'  : we want to change configuration (config), on global table (--global) and we configure alias called lg (alias.lg)

* quering = searching from git log

    --> git log --author="John Doe"  : commits done by this author 
    --> git log --author="John Doe\|Joe Smith" : commits made by these people
    --> git log -- testfile-01 : -- means we look for files, bot branches
    --> git log -- testfile-02 branchfile-01
    --> git log --merges
    --> git log second-branch..master : dofferences between 2 braches. order matters
    --> git log --no-merges
    --> clear && git log --after=2021-4-21
    --> clear && git log --before=2021-4-21
    --> clear && git log --before 2021-4-30 --after=2021-4-1
    --> clear && git log --after=yesterday
    --> git log -3 : we limit the nr of returned commits to 3
    --> git log -1 --grep="JIRA"
    --> git log -5 --grep="commit" --oneline





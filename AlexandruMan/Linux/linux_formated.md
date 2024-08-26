# Git Commands Cheat Sheet

## Configuration
- `git config --global --list` - List all global configurations
- `git config --global core.editor vim` - Set Vim as the default editor
- `git config --list` - See all settings
  - `--global` - Only list global settings
- `git config user.name` - Returns the username

### Configuration Levels
- `--system` - For the whole machine
- `--global` - For the current user
- `--local` - For the current repository (default)

## Git Directory
- `ls -al .git` - List all files in the .git directory

### .git Directory Contents
- `hooks` - Contains custom hooks (scripts executed before/after commit, push, etc.)
- `branches` - Deprecated
- `HEAD` - Pointer to the current branch and its latest commit
- `config` - Configuration file for the repository
- `info` - Where files are staged using `git add`
- `refs` - Current state of the whole repo
- `objects` - Stores commits, trees, and blobs (can be very large)
- `logs` - Logs of repository changes
- `description` - Description of the repository

## Git Aliases
- `git config --global alias.adog "log --all --decorate --oneline --graph"` - Create an alias for a detailed log view
- Usage: `git adog`

## Initializing and Committing
- `git init` - Initialize a new Git repository
- `git status` - Show the working tree status
- `git commit -m "<comment>"` - Commit with a message
- `git rm --cached <filenames>` - Remove committed files
- `git rm --cached -r .` - Remove all files

## Checkout and Reset
- `git checkout <name>` - Switch branches or restore working tree files
- `git reset <--soft/--hard> HEAD~<number>` - Reset to a previous state
  - `--soft` - Keep changes in the working directory
  - `--hard` - Discard changes

## Reverting Changes
- `git revert --no-edit HEAD` - Revert the last commit without editing the commit message
- `git revert --edit HEAD~3` - Revert the third last commit and edit the commit message

## Checking Differences
- `git diff` - Show differences between working directory and index
- `git diff HEAD~1` - Show differences from the last commit
- `git diff HEAD~1 <filename>` - Show differences for a specific file

## Detailed Commit Information
- `git log --oneline` - Show a summary of commits
- `git log -p` - Show patch information for each commit
- `git log --stat` - Show statistics for each commit
- `git shortlog` - Show commit info sorted by author
- `git log --graph` - Show commit history as a graph
- `git log --oneline --graph` - Show a summarized commit history as a graph

### Log Formatting
- `git log --graph --pretty="%C(yellow) Hash: %h %C(blue)Date: %ad %C(red) Message: %s " --date=human` - Custom formatted log
- `git log --graph --pretty=format:"%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset" --abbrev-commit` - Another custom formatted log

### Alias for Custom Log
- `git config --global alias.lg 'log --color --graph --pretty="%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset" --abbrev-commit'`
- Usage: `git lg`

## Querying Logs
- `git log --author="John Doe"` - Show commits by a specific author
- `git log --author="John Doe\|Joe Smith"` - Show commits by multiple authors
- `git log --grep="JIRA-1234"` - Search commit messages for a specific term
- `git log -- <filename>` - Show logs for a specific file

## Merging and Conflict Resolution
- `git merge <branch>` - Merge a branch into the current branch
- `git mergetool` - Use a tool to resolve conflicts

### Tools for Conflict Resolution
- `git-mergetool`
- Plugins for editors
- Kdiff3
- Meld

## Git Ignore
- `.gitignore` - Specify files and directories to ignore
  - `**/neveringit` - Ignore all files named "neveringit"
  - `!firstdirectory/neveringit` - Negate the ignore rule for specific files

## Git Tags
- `git tag` - Show all tags
- `git tag -a <name> -m <comment>` - Create an annotated tag
- `git show <tagName>` - Show tag details
- `git tag -a <name> -m <comment> <commitID>` - Tag an older commit
- `git checkout <tagName>` - Checkout a specific tag
- `git describe` - Show the current tag
- `git describe --tags` - Show the exact tag
- `git tag -d <tagName>` - Delete a tag

## Git Branches
- `git branch` - Show all branches
- `git checkout -b <name>` - Create and switch to a new branch

### Important Notes
- Resolve conflicts on a secondary branch, then merge into master.
- Explore `git rebase` for more advanced merging options.

## Date and Commit Range Queries
- `git log master..second-branch` - Compare two branches
- `git log --merges` - Show merge commits
- `git log --no-merges` - Exclude merge commits
- `git log --after=2021-4-21` - Show commits after a specific date
- `git log --before=2021-4-21` - Show commits before a specific date
- `git log --before 2021-4-30 --after=2021-4-1` - Show commits in a date range
- `git log --after=yesterday` - Show commits since yesterday
- `git log -1` - Show the last commit
- `git log -3` - Show the last three commits
- `git log -1 --grep="JIRA"` - Show the last commit with a specific term
- `git log -5 --grep="commit" --oneline` - Show the last five commits with a specific term

## Handling Conflicts
- Use `vim` or another editor to resolve conflicts manually.
- Tools like `git-mergetool`, Kdiff3, and Meld can help.

## Additional Tips
- Use `.gitignore` to manage ignored files efficiently.
- Regularly check `git status` to understand the state of your working directory and staging area.


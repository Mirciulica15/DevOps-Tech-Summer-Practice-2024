# Git Cheat Sheet

## Lesson 1: Install Git on Ubuntu
- Update package list ([`sudo apt update`])
- Install Git ([`sudo apt install git`])

## Lesson 2: Configure Git
- Set global username ([`git config --global user.name "Your Name"`])
- Set global email ([`git config --global user.email "your.email@example.com"`])

## Lesson 3: Committing the First Files
- Initialize a new Git repository ([`git init`])
- Add files to the staging area ([`git add <file1> <file2> ...`])
- Commit files with a message ([`git commit -m "Initial commit"`])

## Lesson 4: Remove File from Commit
- Remove file from staging area ([`git reset <file>`])
- Remove file from the commit (uncommitted) ([`git rm <file>`])
- Reset to remove the file from a commit (already committed) ([`git reset HEAD~1`])

## Lesson 5: Visual Commit
- Use an editor for commit messages ([`git commit`])

## Lesson 6: Revert Changes
- Revert changes in the working directory ([`git checkout -- <file>`])
- Revert a commit without deleting it ([`git revert <commit_hash>`])
- Reset to a specific commit (which deletes history) ([`git reset --hard <commit_hash>`])

## Lesson 7: Check the Differences
- Check differences in the working directory ([`git diff`])
- Check differences between specific commits ([`git diff <commit_hash1> <commit_hash2>`])

## Lesson 8: Detailed Information About Previous Commits
- Show commit history ([`git log`])
- Show detailed commit information ([`git log -p`])

## Lesson 9: Houston, We Have Conflicts!
- Merge branches and resolve conflicts ([`git merge <branch>`])
- After resolving conflicts, add and commit the changes ([`git add <resolved_file>`], [`git commit`])

## Lesson 10: Powerful Stash!
- Stash changes ([`git stash`])
- List stashes ([`git stash list`])
- Apply stashed changes ([`git stash apply`])
- Drop a stash ([`git stash drop`])

## Lesson 11: How to Ignore Some Content
- Create or edit the `.gitignore` file ([`echo <file_or_directory> >> .gitignore`])
- Apply changes to ignore specific files or directories ([`git rm -r --cached <file_or_directory>`])

## Lesson 12: Git Tags
- Create a tag ([`git tag <tag_name>`])
- Push tags to the remote repository ([`git push origin --tags`])
- List tags ([`git tag`])

## Lesson 13: Merge Branches
- Checkout to the branch you want to merge into ([`git checkout <branch_name>`])
- Merge another branch into the current branch ([`git merge <branch_to_merge>`])

## Lesson 14: Cheat the History!
- Rebase to edit commits ([`git rebase -i <commit_hash>`])
- Amend the most recent commit ([`git commit --amend`])

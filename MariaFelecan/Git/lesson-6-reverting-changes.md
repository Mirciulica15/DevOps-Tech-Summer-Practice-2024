* reverting changes

git revert --no-edit HEAD : we dont want to enter a message, so we ask git to use default

git revert --edit HEAD~3 : we forced git to revert changes 

HEAD = the current place where we are
     = combination of current branch and current place in git history
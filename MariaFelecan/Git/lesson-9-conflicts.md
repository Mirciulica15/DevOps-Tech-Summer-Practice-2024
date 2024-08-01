* revert : it removes changes from the selected commit, not from all changes
change1 commit
change2 commit
revert to change1
=> we have change2 unattended

conflicts :

<<<<<< - this is what we have in current branch

====== = center of our conflict

>>>>>> - this wants to be merged


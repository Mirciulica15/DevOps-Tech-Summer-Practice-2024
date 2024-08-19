* mkdir
    -> mkdir name = makes a directory
    -> mkdir name{1..10} = makes 10 directorie named name1, name2, name3, ..., name10
    -> mkdir mydirectory anotherdirectory thirddirectory =creates three different directories

* pwd = current work directory

* cd ../.. -> ma intorc cu 2 directories back

* $HOME = variable that contains the path to the current user home directory (root)
    -> cd $HOME

* cd ~  :  takes us back to root

* cd = takes us back to root

* rmdir
    ->rmdir aaa = removes a directory named aaa
    -> rmdir testdir{1..10} = removes all directoies named testdir1, testdir2, ..., testdir10

!! we can remove a parent directory only when it is empty

    -> rmdir -p maindir/childdir 
    -> rmdir parentdir/* : removes all children directories from the directory
    -> rm -rf anotherparentdir : removes the parent directory and all its children
        * -r = go recursively through dirs & treat everything as a file
        * -f = force. (assume user knows what they are doing)

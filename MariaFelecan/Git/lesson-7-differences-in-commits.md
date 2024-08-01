* git diff = shows the differences between commit and the working directory

    diff --git a/testfile-01 b/testfile-01   -> aici arata ca ii diferenta dintre 2 versiuni alea aceluiasi fisier a, b
    index 303ff98..48db2e4 100644  -> hashes si un cod care spune ca i file neexecutabil
    --- a/testfile-01 -> version a is depicted by -
    +++ b/testfile-01 -> version b is depicted by +
    @@ -1 +1,2 @@
    first file
    +change  -> + comes from version b


    - uses HEAD by default

    git diff HEAD~1
    clear && git diff HEAD~1 testfile-01

    - in order to see differences about staged changes : git diff --staged


* git show = similar info to git log

    - works by default against HEAD, but we can change it like we did with diff

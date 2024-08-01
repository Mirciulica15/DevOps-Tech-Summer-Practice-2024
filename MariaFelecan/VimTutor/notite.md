* basic commands

        h - left
        j - jos
        k - up
        l - right
* appendig text
    i, a, ce -append text
    c$ - deltes the line from that point forward and lets us append text
    o - makes a new line under t
esc - normal mode

* modifying text
    d motion : to change text  - i can combine it with numbers to execute the action many times

        d  - delete operator.
        motion - what the operator will operate on (listed below).
            -> w - until the start of the next word, EXCLUDING its first character.
            -> e - to the end of the current word, INCLUDING the last character.
            -> $ - to the end of the line, INCLUDING the last character.


        0 - start of the line
        2w = 2 words forward
        3e = move the cursor to the end of the third word forward

        dd = delete the whole line

        u = undo the last command executed
        U = undo the line to its original state
        ctrl R - undo the undo

        p = if we deleted a line, we press p and it will appear under the cursor
        r = on top of the letter, lets us replace the letter with something else
    
        To substitute new for the first old in a line type    :s/old/new
        To substitute new for all 'old's on a line type       :s/old/new/g
        To substitute phrases between two line #'s type       :#,#s/old/new/g
        To substitute all occurrences in the file type        :%s/old/new/g
        To ask for confirmation each time add 'c'             :%s/old/new/gc

* files

        ctrl G - show info about the file. G - top of the file, gg - end of the file

        / - and then write the word we are searching for

        ctrl O - go bacj to where you came from

        * searching
                % - searches a marching parathesis closing. for '(' it will find ')'



        * executing an external shell command:

                :! command  ex: :!ls 

        * saving the file we are working on:

                :w name

        * removing the file 

                :!del name (windows)
                :!rm name (Unix)

        * saving parts of a file:

                press v and then go down with the cursor
                then press w and the name
                verify that you see  :'<,'>w TEST  before you press <ENTER>

        * inserting a file into another file

                :r name

                :r !dir : prints the output of the dir command below the cursor

* getting help

        F1 key or :help command

* enable vim features

        -> :e ~/.vimrc             for Unix
        -> :e ~/_vimrc             for Windows

         read the example "vimrc" file contents: :r $VIMRUNTIME/vimrc_example.vim

* write the file with: :w

:help vimrc-intro




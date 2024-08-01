* pipes = |
    we can combine as many pipes as we wish
     useful commands
    -> grep : searches for a pattern in file
    -> wc : counts words
        * wc -l file.txt: counts the nr f lines from file.txt
    -> sort : sorts the output in alpahbetial order
    -> cat : prints the file
    -> unique: takes the unique values
        * uniq always works best with sort
        ex: cat numbers.txt | sort | uniq | wc -l
    
* the > operator
    -> redirects all output from the left side of the sign, to the file on the right side of the sign
    -> if file doesn't exist, create it
    -> add content from redirected output
    -> if file exists and it is not empty, clear the file and write the redirected output in empty file
* the >> operator : appends the text, does not overwrite



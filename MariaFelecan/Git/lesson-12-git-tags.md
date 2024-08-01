* tags = refers to creating specific points in the history of your repository
you can create tags when you want to create a release point for a stable version of your code

to check if we have tags: git tag

- how to create a tag: git tag -a v1.0 -m "version 1.0. initial state"

    git adog | grep 'testfile-06' | awk '{print $2}' | head -n1'

        ->grep 'testfile-06 - this will select entries with message where this filename occurs 
        ->awk '{print $2}' - with awk we are 'cutting' the output and print only the third (counted from 0) element, where separator is a space.
        ->head -n1 - on the end we are printing ony the first element 

    * switching to tags : git checkout v1.0
    * git describe : will return info about current tag

- how to delete a tag : git tag -d v1.0

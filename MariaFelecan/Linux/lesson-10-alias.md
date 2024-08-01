* aliases

how to create an alias: 
    
    alias name='command'
    ex: alias lh='ls -alh'

    -> this will be available just for the current session

how to remove an alias:

    unalias name
    ex: unalias lh

in order to use an alias that was written to a file, we need to load the file into the session:

    source file-name
    ex: source ./.bashrc

    source = reads and executes scripts into the current shell

how to add alises for all users:

    -> we go into the global configuration

    -> the place where we have to add our aliases is /etc/profile.d

    

3 types of users:
    -> standard user
    -> elevated privilages user
    -> root

ssh keys - cryptographic set of keys used for authetntication (better than password)

- useful commands:
    - whoami = command to show us the name of our user

    - id = info about the user id, group id and other groups user belongs to

    - id name = info about user named "name" ex: id ubuntu

UID = unique user id
    -> UID = 0 reserved for root
    -> UID = 1 - 99 reserved for predefined accounts
    -> UID = 100-999 reserved for system and administrative accounts
    -> UID = 1000+ reserved for users

GID = group identifier
    -> grpup = abstract that combines many users in a similar entity (for the same privilas, purpose, actions)

    -> GID = 0 : for root
    -> GID = 1-99 : reserved for system app use
    -> GID = 100+ for users

- 4 files involved in configuration of users:

    * passwd - located in /etc

        -> stucture of file:

        username:password:UID:GID:description:homedir:shell

        password: used to hold the passwords, but now 'x' in this field means that the password is encrypted in another file

        description: whatever info we need to store

        homedir: where user logs and stores the data

        shell: program that takes the command from the user adn executes them

        by setting shell as /sbin/nologin we ensure, that no one will log in as this user (for  administrative users or technical users)

        we can use many shells, but most popular is bash

        to find available shells: 
         cat etc/shells

    
    * shadow = magic file

        - contains sensitive info about the user, like passwords and configurations

        password:
            code = encripted by hashing
            
            * = no password set (user is using other type of authentication, with acces keys)
            ! = password was never set

    * group = info about groups

        structure: 
            group name
            password
            GID
            users belong to the group

    * gshadow = encripted passwords for groups


- creating a user: 

    2 diff commands : useradd & adduser

    adduser - uses 'useradd' when creates users

            - interactive, asks us about passwprd, name, info

    useradd - more used by admins (even tho is not that intuitive ?)

        arguments:
        -d - create home directory in specified location, if we want to change

        -m - create the home directory

        -p - password

        -s - provide shell

        -c - comments, or description of the account

        more options: useradd -h


- modifing the existing user:

    changing the password:
    
        passwd <user> 

        if user not provided, password is chaged for current user

    changing the group for a user:

        usermod <user> -g <new-group/ GID>
        
        usermod testuser3 -aG 1001
        (adds another group for the user)

        usermod testuser3 -d /home/anotherdir
        (we create a home directory)

        usermod testuser3 -d /home/newdir -m
        (we also add the new directory)

        usermod testuser3 -s /bin/sh (modifies the shell)

    deleting the user:

        userdel testuser1 

        In order to remove the files, it is a good practice to add two arguments:

        r - remove files
        f - force removal (in case if files don't belongs to the user)
        userdel -rf testuser3












    











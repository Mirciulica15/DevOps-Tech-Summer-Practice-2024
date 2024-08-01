* elevating privilages for a user

- change the user we are using:

    su (abreviation for substitute)

    su -h : all options for arguments for su

    su - username

    to log in back as root: type 'exit'

    -> when we only type 'su', it is assumend that we want to be root, but we will be asked for a password - BUT no password is set for root (privacy concerns) => deadend

- sudo

    -> sudo ps : sudo creates a new session for the ps

    -> sudo -i : we ant to use sudo to switch to a privileged session

- /etc/sudoers file

    -> in this file:
    root ALL=(ALL:ALL) ALL
    this is the configuration line for the user

    %sudo ALL=(ALL) NOPASSWD:ALL
    this is the config for the group
    
    % - character for group

    if we try to use sudo for a user that is not in the sudoers file, we are denied

- editing the sudoers file:

    *version 1: with any editor like vim

    *version2: with visudo

    *to configure what editor to use: update-alternatives --config editor

    visudo

    user pos1=(pos2:pos3) pos4
    %group pos1=(pos2:pos3) pos4

    pos1 - applies to all hosts
    pos2 - user can use all commands as all users (i.e. root can ls as user03, etc)
    pos3 - user can use commads as all groups
    pos4 - user can use all commads

    pos values can be ALL, 

    su - we need to provide password for the USER WE WANT TO USE
    sudo - we need to provide the pasword for the CURRENT USER

    ex: 
    student2 ALL=(ALL:ALL) NOPASSWD:ALL - this user doesnt need to confirm themselves with the password
    student1 ALL=(ALL:ALL) ALL 












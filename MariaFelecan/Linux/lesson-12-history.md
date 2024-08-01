* history

command: history : a numbered list with all comands. in order to execute some command, we take its number and add a !. de ex:
vrem sa executam cam .profile
history:
    1  apt-get update
    2  halt
    3  ls -al
    4  cat .profile
    5  ls -alh
    6  ps
    7  history
introduc: !4 si o sa excute cat u

smart: use grep with history
    history | grep cat
    also putem folosi histor cu numere:
    gen:
    history 3 : last 3 commands stored in history

    ! CTRL + r : reverse search
    cautam ultima aparitie a comezii si ii pune highlight

press ESC to exit the command

- history is kept in .bash_history file and it is written on the end of the session

-  clearing the history:

    history -c : this only clears the history in the memot, not in the files

    > .another_history : this redirects nothing to the history

- disabing the history:

    set +o history

    echo 'set +o history' >> ~/.bashrc  = disabling history for the current user

    echo 'set +o history' >> /etc/profile  = disabling history for all users in the system
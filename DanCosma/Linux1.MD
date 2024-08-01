# Invatam mai intai comanda ls list command
Listeaza continutul unui director
Comada ls --color=auto 
sau yes ne ajuta la o lizibilitate mai buna.

Are multiple argumente:

1. "-" Paseaza un singur argument one letter
2. "--" inseamna ca argumentul va contine mai mult de o litera( mai comun un cuvant in engleza)
3. "l"  format lung de listare
4. UID- Afiseaza user-ul din grup(user identifier)
5. GID- grup identifier
6. "ls -n" listeaza tot ca ls -l dar ofera informatiile in GID si UID 

La inceputul fiecarui obiect in linux folosim "." Si le numim dotfiles
" ls -a" afiseaza mai multe fisiere dotfile printre care si unele ascunse

1. "." -Inseamna directorul curent al userului
2. ".."- Means parent directory.
3. ls . arata la fel ca ls
4. ls .. structura directorului parinte: bin  boot  dev  etc  home  lib  lib32  lib64  libx32  lost+found  media  mnt  opt  proc  root  run  sbin  snap  srv  swapfile  sys  tmp  usr  var
5. ls -a: List all
6. ls -A: List almost all
7. ls -al

## Sortarea listelor

Exista mai multe modalitati
Linux are 3 tipuri diferite de timestamps:

1. "atime" ultima data cand fisierul a fost deschis
2. "mtime"  last modification time(schimbare in fisier)
3. "cime" ultima data cand s-au schimbat permisiunile in file sau location of file

Prima optiune de sort: ls -lt

Printam lista folosind ordonarea ctime :

ls -ltc

-touch theNewestFile (this creates a new file)

ls -ltu //afiseaza ce e nou prima data

ls -ltc

echo "hello world!" > file-02 (this will add something to 
the file)

ls -ltu  //apara prima data tot theNewestFile

ls -ltc  // apare prima data file-02

chmod 444 file-01 (this will change the permissions of the file)  //444 scimba toate permisiunile in read

ls -ltu

ls -ltc

## SORT BY SIZE

1. "ls -s": This shows the short list of files and allocated space.

2. "ls -ls": Diferit de ls -l. beginning of each line, this is where you can find, what was added by -s.

When capital S is used, this means sort.

This argument is --human-readable, or better - -h

"ls -lh" we have printed the size of the files not in bytes, but in more readable form, with K, M, or G, that sort of things.

Important:  h use the powers of 1024. So, 1K is a 1 powered by 1024. We have another otion

"ls -l --si" uses powers of 1000

"ls -lSh"  le sorteaza in functie de valoarea lui k de la max>min

### Formate diferite

1. "ls -1" 
2. ls --format=commas will print the files separated by commas. We can use shorter syntax and write
ls -m.
3. -l is also the --format option. If you wish to use it in full, use ls --format=long
4.   ls -lQ prints the filenames in quotes

"--time-style"  changes the way how the date is formated in long format.

### Alte formate utile
1. ls -al --author prints the username of the creator of the file.
2. ls -ald prints directories only. Very useful in some circumstances.
3. ls -ali prints inodes (there will be a lesson about inodes).
4. ls -alR recursively prints all subdirectories.
5. ls -alr prints list in the reversed order. 
6. ls -alSr Printeaza tot de mai sus

# FINALE

Two last commands in this scenario.

ls --version prints the version of the binary.

All commands which we used here are available in help. How to get the help?

ls --help

### QUESTIONS

1. long formatted list of the files in directory: ls -l
2. argument for sort files:  ls -lS
3. UID represents: User Identifier
4. I want to list the parent directory files. What I need to add to my ls command? "ls .."
5. I have my ls -lt command. What argument I need to add in order to see the list ordered by modification of the content of the files? :U
6. Provide the full command for long format and human readable size. ls -lh
7.  Provide the full command (not -m) for short list with commas : ls --format=commas
8.  List files in short format, one file per line, with quotes. :ls -1Q.
   






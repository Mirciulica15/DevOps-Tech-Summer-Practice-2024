# Lectia 4: Crearea si stergerea de fisiere

Ceearea unui fisier gol: **touch file**.

Verificarea existentei lui: **ls -l file**.

Pentru manipularea fisierului: **touch my{01..100}file**.

**ls my*file** Afiseaza toate fisierele creeate sub forma de string.

* ls try* : Ar oferi toate cele 3 fisiere creeate.


## Stergerea fisierelor

Comenzi:

* rm try01 pentru un fisier
* rm try1 try2 
* rm testdir/mytest{01..1000} multiple
* rm -rf testdir 

#  VIM 

Comanda touch nu este singura modalitate de a creea un fisier, in acest caz folosim VIM.

Folosim comanda "vim mynewfile " pentru a deschide editorul VIM in terminal. 

Pentru a scrie ceva im terminalul VIM acesta trebuie sa fie pus in modul insert(APASAM i).

Pentru a intra in Command mode apasam ESC apoi scriem: **:wq** pentru a parasi editorul.













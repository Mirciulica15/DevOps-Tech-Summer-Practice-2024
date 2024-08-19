# Lectia 1.1: Deplasarea prin fisierele VIM

Pentru a ne deplasa in terminal folosim tastele hjkl.

* h = stanga
* j = jos
* k = sus
* l = dreapta

Daca nu esti sigur de ce ai scris poti apasa ESC ca sa ajungi in Normal mode, apoi sa reintroduci comanda.

# 1.2 Exit Editor

Apasam ESC sa intam in normal mode, apoi scriem :q! pentru a iesi(in situatia in care nu vrem sa salvam modificarile)

# 1.3 Editarea Text-ului - Stergere

Pentru a sterge un caracter gresit dintr-o linie de text plasam cursorul in dreptul caracterului si apasam **x**.

# 1.4 Editarea Text-ului - Inserare

Pe scurt mergi cu cursorul unde vrei sa adaugi text, apesi **i** adaugi ce vrei sa adaugi si apesi ESC sa revii la Normal mode.

# 1.5 Editarea Text-ului -Appending 

La fel ca la stergere si inserare, dat apasam **a**

# 1.6 Editarea unui fisier 

Folosim comanda **:wq** pentru a salva un fisier si apoi iesim.

# 2.1 Deletion Commands

Scrie **dw** pentru a sterge un cuvant.

# 2.2 Delete Commands

Scrie **d$** pentru a sterge pana la end of line.

# 2.3 ON Operators si Motions

Multe comenzi ce schimba text sunt formate din operator si motion.

Formatul ar arata stfel: **d motion**.

motion = este ceea ce operatorul va opera.

ex: 

* w - until the start of the next word, EXCLUDING its first character
* e - to the end of the current word, INCLUDING the last character
* $ to the end of the line, INCLUDING the last character.

# 2.4 Using count for a motion

Daca adaugam un numar inainte de un motion face ca aceasta actiune sa se repete de n ori.

# 2.5 Using a count to delete words

In combinatia unui delete operator cu un motion se adauga intre ele un numar  pentru a sterge mai multe cuvinte.

ex: d number motion

# 2.6 Opperating on lines

**Scriem dd pentru a sterge o linie intreaga**

# 2.7 Undo Command

Scriem **u** pentru a da undo la ultima comanda si folosim **U** pentru a repara o linie intreaga.

Inca o comanda utila!: CTRL-R pt a da Undo la toate Undo-urile facute.

 1. To delete from the cursor up to the next word type:        dw
  2. To delete from the cursor up to the end of the word type:  de
  3. To delete from the cursor to the end of a line type:       d$
  4. To delete a whole line type:                               dd


# 3.1 PUT COMMAND

Scriem **p** ca sa punem o linie sau un cuvant sters inapoi in file, dupa cursor.

# 3.2 Comanda Replace

Scriem **rx** prntru a schimba caracterul de la cursor cu **x**.

Practic pergem la caracterul gresit, apasam r si litera care trebuie pusa in locul celei gresite.

# 3.3 Change Operator

Pentru a schimba pana la sfarsitul  unui cuvant folosim comanda **ce**.

Se foloseste ca si un insert mode din care se  iese prin ESC.

Notice that  ce  deletes the word and places you in Insert mode.
             cc  does the same for the whole line.


# 3.4 Mai multe schimbari folosind c

Operatorul de schimbare poate fi folosit cu aceleasi motions ca cel de la delete.

 1. The change operator works in the same way as delete.  The format is:

         c    [number]   motion

  2. The motions are the same, such as   w (word) and  $ (end of line).


# 4.1 Cursor location and file status

 Hold down the Ctrl key and press  g .  We call this CTRL-G.
     A message will appear at the bottom of the page with the filename and the
     position in the file.

 Press  G  to move you to the bottom of the file.

 Type  gg  to move you to the start of the file.

  Type the number of the line you were on and then  G .  This will
     return you to the line you were on when you first pressed CTRL-G.


#4.2 Search Command

Se foloseste **/** urmat de fraza pe care o cautam. Aceasta exprimare se foloseste doar pentru a cauta inainte in document.

Pentru a cauta inapoi in document vom folosi caracterul **?** care actioneaza exact la fel ca **/**.

Pentru a cauta acel caracter din nou folosim litera **n**, iar pentru a il cauta in directia opusa(backwards) folosim **N**.

Pentru a ne intoarce de unde am plecat cu cautarea folosim comanda: **CTRL-o**

# 4.3 Matchig paratheses search

Folosim caracterul **%** pentru a gasi cealalta jumatate de parteza, fie ea: ),],}.

Merge si in cealalta directie.

# 4.4 Substitute Command


        ** Type  :s/old/new/g  to substitute 'new' for 'old'. **

  1. Move the cursor to the line below marked --->.

  2. Type  :s/thee/the <ENTER>  .  Note that this command only changes the
     first occurrence of "thee" in the line.

  3. Now type  :s/thee/the/g .  Adding the  g  flag means to substitute
     globally in the line, change all occurrences of "thee" in the line.

      To change every occurrence of a character string between two lines,
     type   :#,#s/old/new/g    where #,# are the line numbers of the range
                               of lines where the substitution is to be done.

     Type   :%s/old/new/g      to change every occurrence in the whole file.

     Type   :%s/old/new/gc     to find every occurrence in the whole file,
                               with a prompt whether to substitute or not.



# 5.1 Cum se executa o comanda externa.

Scrie **:!** urmata de o comanda externa pentru a executa aceasta comanda.

Aceste comenzi pot sa fie, de exemplu commands din linux ca ls sau dir, etc.

# 5.2 Mai mult despre scrisul in fisiere.

Pentru a salva schimbarile facute in text scrie comanda: **:w FILENAME**.

If you were to exit Vim and start it again with  vim TEST , the file
      would be an exact copy of the tutor when you saved it.

   Now remove the file by typing (Windows):   :!del TEST
                                or (Unix):      :!rm TEST


# 5.3 SELECTING TEXT TO WRITE

Pentru a salva o parte din file, scriem **v motion :w FILENAME**.

 1. Move the cursor to this line.

  2. Press  v  and move the cursor to the fifth item below.  Notice that the
     text is highlighted.

  3. Press the  :  character.  At the bottom of the screen  :'<,'> will appear.

  4. Type  w TEST  , where TEST is a filename that does not exist yet.  Verify
     that you see  :'<,'>w TEST  before you press <ENTER>.

  5. Vim will write the selected lines to the file TEST.  Use  :!dir  or  :!ls
     to see it.  Do not remove it yet!  We will use it in the next lesson.

NOTE:  Pressing  v  starts Visual selection.  You can move the cursor around
       to make the selection bigger or smaller.  Then you can use an operator
       to do something with the text.  For example,  d  deletes the text.


# 5.4: Retrieving and merging Files

Pentru a insera continutul unui fiser scriem: **:r FILENAME**.

# 6.1 OPEN COMMAND

Scrie **o** pentru a deschide cu o linie dedesubtul cursorului pentru a te plasa in INSERT MODE si a adauga textul necesar.

 Acelasi lucru se face si pentru **O** dar cu o linie deasupra cursorului.

 # 6.2 Comanda APPEND

 Scrie **a**pentru a adauga text dupa cursor.

 Comenzile **a,i si A** ne introduc toate in INSERT MODE, singura diferenta este unde vor fi caracterele inserate.

 # 6.3 Alt mod de REPLACE

 Scriem un **R** pentru a modifica mai mult de un caracter.

 Modul REPLACE este ca si INSERT, dar fiecare caracter scris sterge un caracter care exista deja.

 # 6.4 COPY AND PASTE TEXT

 Folosim **y**(yank) pentru a copia text si **p**(paste) pentru a il pune in locatia selectata.

Folosim comanda j$ pentru a muta cursorul la end of line.

**y** se poate folosi ca operator :
1. yw yanks 1 word.
2. yy yanks the whole line, apoi p o pune unde dorim.

# 6.5 Set Option

Set an option so a search or substitute ignores case .

 1. Search for 'ignore' by entering:  /ignore <ENTER>
     Repeat several times by pressing  n .

  2. Set the 'ic' (Ignore case) option by entering:   :set ic

  3. Now search for 'ignore' again by pressing  n
     Notice that Ignore and IGNORE are now also found.

  4. Set the 'hlsearch' and 'incsearch' options:  :set hls is

  5. Now type the search command again and see what happens:  /ignore <ENTER>

  6. To disable ignoring case enter:  :set noic

NOTE:  To remove the highlighting of matches enter:   :nohlsearch
NOTE:  If you want to ignore case for just one search command, use  \c
       in the phrase:  /ignore\c <ENTER>

 'ic' 'ignorecase'       ignore upper/lower case when searching
        'is' 'incsearch'        show partial matches for a search phrase
        'hls' 'hlsearch'        highlight all matching phrases
     You can either use the long or the short option name.

  7. Prepend "no" to switch an option off:   :set noic

# 7.1 Getting HELP

Folosind sistemul de search on-line.

3 optiuni:
1. Apasam butonul de HELP de pe tastatura.
2. apasam tasta F1.
3. Scriem :help

Scriem CTRL-W pentru a sari de la o fereastra la alta.

Scriem :q pentru a inchide fereastra.

# 7.2 Create a STARTUP Script

** Enable Vim features **

  Vim has many more features than Vi, but most of them are disabled by
  default.  To start using more features you should create a "vimrc" file.

  1. Start editing the "vimrc" file.  This depends on your system:
        :e ~/.vimrc             for Unix
        :e ~/_vimrc             for Windows

  2. Now read the example "vimrc" file contents:
        :r $VIMRUNTIME/vimrc_example.vim

  3. Write the file with:
        :w

  The next time you start Vim it will use syntax highlighting.
  You can add all your preferred settings to this "vimrc" file.
  For more information type  :help vimrc-intro


# 7.3 Completion

Command line completion cu **CTRL-D si TAB**.


              ** Command line completion with CTRL-D and <TAB> **

  1. Make sure Vim is not in compatible mode:  :set nocp

  2. Look what files exist in the directory:  :!ls   or  :!dir

  3. Type the start of a command:  :e

  4. Press  CTRL-D  and Vim will show a list of commands that start with "e".

  5. Type  d<TAB>  and Vim will complete the command name to ":edit".

  6. Now add a space and the start of an existing file name:  :edit FIL

  7. Press <TAB>.  Vim will complete the name (if it is unique).

NOTE:  Completion works for many commands.  Just try pressing CTRL-D and
       <TAB>.  It is especially useful for  :help .




 


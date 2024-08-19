# Reading Files

Afisarea continutului unui fisier este cea mai basic operatie in orice sistem de operare.

1. **cat Si vim**

### cat:

Cea mai basic si mai folosita comanda pentru citirea fisierelor este "cat".

Folosind **cat testfile** afisam tot continutul fisierului.

### vim si view:

Comanda **vi** comparativ cu **cat** este complet functionala si e un text editor foarte powerful.

Pentru a iesi din VIM apasam ESC apaoi **:q** ce inseamna a iesi din editor.

Daca ai schimbat ceva in editor si nu vrei sa salvezi continutul atunci folosesti ESC+ :q!

Daca ai schimbat ceva in editor si vrei sa salvezi continutul atunci folosesti ESC+ :wq

By using ESC we switch between modes in vim. One is INSERT mode. In this mode we can edit the file. Second is COMMAND mode, where we can interact with vim and do actions. Like save and quit. Third mode is VISUAL. in this mode we can do selection of text.

Mai exista o posibilitate de a lucra cu Vim. Putem sa il pornim in modul Read Only:

**"view testfile"**

### Comenzi noi de citire:

**more**

The first command which we can use in order to have better experience is more.

more has it's own limitations. We can go forward only, using enter. In order to quit, press q.

**less**

There is a more sophisticted tool to read the file. It is called less. This command gives us better navigation. We can go back and forth using the same keys like in vi, moreover, we can search for strings, using / sign.


**/Resolution**

This searches through the file for Resolution string. Remember, linux is case-sensitive!

By n we go down through search results and by using N we go up. To quit we just press q.

### Pipes

What is interesting, we can use cat, more and less together with pipes.

cat testfile | more

cat testfile | less 

3. **Tail and Head**

Printing a part of the file.

Desi putem sa printam tot fisierul si sa navigam prin el exista si optiune de a printa doar portiuni.

**head**

If we want to print first lines of the file, we can use head. By default head shows 10 lines.

"head testfile"

If we wish to see different number of lines, we can use -n argument and pass the number for lines.

"head -n2 testfile"

**tail**

tail does exactly the same thing as heead does, but from the end of the file.

"tail testfile" prints 10 last lines.

"tail -n2 testfile" will print 2 last lines,

Atat head cat si tails se pot folosi in PIPES.

# Quiz

1. Ce comanda afiseaza tot fisierul?:

Raspuns:cat

2.Ce comanda ne davoie sa cautam si sa navigam prin fisier?

Raspuns: less

3. Cum vedem primele 5 linii din fisier?

Raspuns:head -n5 file 





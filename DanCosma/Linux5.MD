# PIPE-URI SI REDIRECTIONS

 Sunt instructiuni comune si utile pentru administratori.

 1. **Pipes and Redirections concept**

Pipe-urile si redirectiile sunt folosite pentru a trimite sau prelua informatii trimise de la o comanda sau un script la altele.

Functioneaza si pe fisiere.

Exemple:

* Numararea liniilor din fisier 
* Selectarea unor valori uniq dintr-un fisier si punerea lor in altul.
* Gasirea unor stringuri ce apar regulat intr-un fisier.
* etc.

### Comenzi comune folosite pentru pipes

**"grep"** -Comanda care cauta un pattern dat in output(file sau command).

**"grep 'case' .bashrc"** : Cauta un pattern "case" in fisierul .bashrc.

**wc**: Folosita pt cautarea de cuvinte, newlines si bytes. In general folosita pentru numararea liniilor.

"wc -l .bashrc" : Contorizeaza cate linii(-1 argument) sunt in fisierul .bashrc.

**"sort "** -Comanda ce sorteaza output-ul in ordine alfabetica.

""sort numbers.txt"

**"uniq "** -Cu uniq putem limita nr de aparitii a aceleiasi inregistrari la doar una.

Pentru a utiliza **uniq** corect trebuie folosit impreuna cu **sort**. We need to pipe these one to another.

## The PIPE |

Structura unui PIPE:

command1 | command2

command1 | command2 | command3

Pot fi combinate un nr indefinit de pipe-uri.

#### Printing a file: cat numbers.txt

#### We have the number of lines in the file : cat numbers.txt | wc -l

#### cat numbers.txt | sort | uniq | wc -l: Ne da numarul sortat, unic si numarat din tot fisierul nostru.

2. **REDIRECTIONAREA FISIERELOR ">"**

Pentru nmoment consideram ca tot output-ul merge pe ecran.

Este considerata ca redirectionarea CATRE fisier.

ls -al > directorylist.txt

What we did here?

    ls -al - we know this already
    > redirects all output from the left side of the sign, to the file on the right side of the sign
    directorylist.txt file where the redirected output will be sent.

Dupa redirectionare fisierul contine exact acelasi output ca ls -al.

Daca am vrea sa adaugam continutul altui fisier la al nostru trebuie sa respectam cateva conditii:

1. If file doesn't exist, create it
2. Add content from redirected output
3. If file exists and it is not empty, clear the file and write the redirected output in empty file.

how to append and not rewrite the file?  Folosim ">>". 

We did the first redirection, and now we will append something from command line and the file with directory listing:

echo 'this line is a separator!' >> directorylist.txt

ls -al >> directorylist.txt

cat directorylist.txt

You need to remember, that **>** will create file (if it not exists) and rewrite all data as fresh file. **>>** behaves similarly, however, if there is any content in the fill, this redirection will add the output of the command on the end of existing content.

3. ** Input Redirection

REDIRECTIONAREA DIN FISIER.

"cat numbers.txt |wc -l" Este o modalitate, dar mnu e perfecta.

Folosim o structura asemanatoare HTML 3.2:

**wc -l numbers.txt**

Si afiseaza 1000 numbers.txt.

Pentru a sterge numele fisierului folosim comanda:

**wc -l numbers.txt | awk '{print $1}'**

SAU

**awk 'END{print NR}' numbers.txt**

But we want to use redirection to count the lines.

**wc -l < numbers.txt**

Ok. Let's write this number to another file

**wc -l < numbers.txt > count.txt**

**cat count.txt - we have it!**

Afiseaza in fisierul count .txt 1000.

The input redirection, <, is used mostly to redirect content to file. To do some operations. Lets see the very simple example of one-liner:

while read line; do echo "Content of the line: ${line}"; done < numbers.txt.

What we just did? We created a loop (we will talk about that later) and print every line from the file, as long as there is nothing more in the file numbers.txt.

# Quiz

1. The sign | is used for pipe or redirection?

raspuns: PIPE

2. Which example represents the situation, when Command2 operates on output from Command1?

raspuns: Command1 | Command2

3. I have a file where each line contains one word. I want to know how many unique words I have in file. What command will do the job?

Raspuns: cat file | sort | uniq | wc -l

4.  What sign I have to use in order to append the file when redirection is used?

Raspuns: >>

5. the wc -l < numbers.txt command will

Raspuns: count number of lines in numbers.txt file.
















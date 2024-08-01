# Lesson18: Soft and Hard links

Soft links sunt peste tot prin sistem si sunt cele mai vizibile.

learn how to use soft links.

Let's start with some preparations. We will create two directories and files, which we will use to create links.

mkdir source target
touch source/file1
touch source/file2
echo 'hello!'> source/file1
echo 'hello!'> source/file2
cd target

Ok, we are ready, we have files and directories and we are in target directory.

### links = le putem trata ca pe niste shortcut-uri catre fisierul destinatie.

Este un mod util de a folosi librarii, executabile, configuratii in maimulte locuri fara a multiplica fisierele.

### De asemenea mai poate fi si ceva ce noi numim "pseudo-file."

Diferenta este simpla, ne imaginam ca am creeat un shortcut catre un fisier sau director in Windows aka Folder. Cand deschizi folder-ul tu de fapt deschizi locatia originala.

The command to create both types links is simple - ln. 

**ln SOURCE TARGET** Sintaxa link command.

Source reprezinta originalul si Target este, in sine, linkul.

The difference between soft and hard links is in the argument we use in ln command.

In this way we see above, we create hard link. In order to create soft link, we have to add -s argument.

**ln -s SOURCE TARGET**

## Soft Links

Creating a Soft Link:

ln -s ../source/file1 softlink

What we have now?

ls -al

And we see lrwxrwxrwx 1 root root 15 May 15 11:20 softlink -> ../source/file1

Right! We see that this output looks a little bit differently than for regular files, correct? We have two information here.

    l on the beginning of permissions matrix, which informs us clearly that it is the link.

    origin location, or redirection. However we weill call it, the fact is that this shows us the name of the link and where is the origin.


 Putem creea un softlink si cu path-ul absolut, acesta va da un link in aceeasi directie ca primul.

ln -s /root/source/file1 softlink2

ls -al 

## Inodes

ls -il ../source/file1

ls -il 

ex:

786475 lrwxrwxrwx 1 root root 15 Jul 24 13:02 softlink -> ../source/file1

786476 lrwxrwxrwx 1 root root 18 Jul 24 13:04 softlink2 -> /root/source/file1

The first number in each line is different. This number is an inode. Simply speaking, it is the ID of the object. 

inode = index node

stat ../source /file => Hard Link.

## Removing Links

Use command : **unlink**
Syntax: unlink LINK

Daca stergem locul sursa linkurile existente vor deveni broken symbiotic links.

Finally, we can remove soft link using rm command.

rm softlink

ls -al

Confirmed, the link is removed.

## Hard Links

We have another file in source directory. Whe this command will be executed.

**ln ../source/file2 hardlink**

Well... This time it looks completely different!

Both files have the same inode.

**stat hardlink**

Did you noticed 2 as number of links? Last thing, we can check the original file.

**stat ../source/file2**

Changing content in hard links:

echo 'this is added to original file' >> ../source/file2

echo 'this is added to hard link' >> hardlink
cat hardlink

cat ../source/file2

It works pretty the same like for soft links.

DELETING THE ORIGINAL:

rm ../source/file2

ls -al

file hardlink

stat hardlink

cat hardlink 

La o prima vedere pare ca nu s-a sters nimic.

Dupa aducerea fisierului inapoi si verificarea cu comenzile pentru inode observam ca nu mai sunt aceleasi inodes ca la inceput.

Din acest lucru rezulta ca fisierele sunt altele si legatura cu fisierul original nu mai exista.

Extra info abt Hard Links.


    You can't create a hard link to a directory. It only applies to files.

    If an original file is deleted, the hard link still exists.
    
    A hard link remains intact when an original file is moved or renamed.
    
    A file exists until the last hard link is deleted.
    
    It is not possible to create a hard link between two file systems.
    
    The content change is reflected in all linked files.







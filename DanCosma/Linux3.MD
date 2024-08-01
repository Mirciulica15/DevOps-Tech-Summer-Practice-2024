# Directories 

  **Useful stuff** comanda mkdir

  Pentru creearea mai multor directoare in acelasi timp se foloseste: 
  
  * mkdir testdir{1..10}
  
Alta varianta de a creea directoare:

* mkdir mydirectory anotherdirectory thirddirectory

Pentru a creea un deeper structure folosim:

 * mkdir -p parentdir/childdir{01..100}

With -p we allowed the system to create parent directory and the second part we already know. Under the parentdir we created 100 files, from childdir001 to childdir100. Please notice, how nice it is formatted by the system! We said 01, but system created directories to keet three digits as it is in childdir100.

And as we created the structure, what we have in parentdir? How to check it? We'll learn more about it in the next section, but for now, let's take a look into parentdir.

* ls -l parentdir

## MUTATUL DINTR-UN DIRECTOR IN ALTUL
**COMANDA:** cd

**Alta comanda pentru a afisa unde suntem:** pwd 

Si rezultatul: "/root/parentdir"

Comanda de intoarcere la pdirector parinte: "cd .."

In Linux filesystems, the root, the "first point" is a root directory. This root directory is represented by /. Everything what is on the top level of the filesystem is in / directory.

Let's suppose, I am in /home/user2/dir1 directory. If I want to go to /var/log/nginx directory, I can do it in several ways.

cd ../../../var/log/nginx

cd /var/log/nginx

What is the difference? In the second version we are using the absolute path. We are referencing our journey through directories to the main, central point of the system - the root, /. When We place / on the beginning of the path it informs the system about our intention to use absolute path.

In the first example we use relative path. It simply means we are navigating from the current position.

So, when you are in /root directory, it is totally different when you type cd /root than cd root.

* cd /var/log
* pwd
* cd /root
* pwd

Aceasta secventa ne poarta in /var.log apoi inapoi in /root.

Avem o varianta mai usoara de a ne intoarce la directorul de baza:

* cd /var/log
* pwd
* cd ~
* pwd

Accentul se pune pe **~**.

Cea mai scurta versiune:

* cd /var/log
* pwd
* cd
* pwd

## DELETE DIRECTORIES

Removing root directory with: 

* **rmdir root**

### We can remove parent directory only when it is empty. This will work then

* **rmdir -p maindir/childdir**
  
  In order to remove the whole parentdir we need to do different command, rm. This command works for files

We have anotherparentdir with the same structure. Let's try a better structure with arguments:

Now we used some arguments

* -r inseamna ca mergem recursiv prin directoare si tratam totul ca fisier
* -f inseamna  force.

* **Nu e o optiune buna si ne atentioneaza terminalul! :  rm -rf /**

## Quiz answers and questions

1. Cum verific directorul curent? 

Raspuns: pwd

2. I am in /home/user1. I want to go to /home/user2 using absolute path. How should I do it?

Raspuns:cd/home/user2

3. Ce inseamna " ~"?

Raspuns: home directory

4. Pentru a naviga in directorul de baza(home) Alegem toate variantele corecte:

Raspuns:
* cd
* cd $HOME
* cd ~

5. I want to navigate to my home directory, using $HOME, and further to app/tests directory:

Raspuns:  cd/$HOME/app/tests

6.I want to create 100 directories named hello001 to hello100. What is the command?

Raspuns: mkdir hello{001..100}

7.  To remove all directories from /directory I have to run (do not use rm command):

Raspuns: rmir/directory/*

8.How to remove everything without confirmation from /mydir/somedir? Consider you are in /mydir and somedir must be removed as well (do not use absolute path).

Raspuns: rm -rf somedir
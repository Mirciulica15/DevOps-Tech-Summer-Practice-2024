## Vim Cheat Sheet

### Exiting
:q!     " Exit without saving changes
:wq     " Save changes and exit

### Insert Mode
i       " Insert before the cursor
a       " Insert after the cursor
A       " Append text at the end of the line

### Deleting
dw      " Delete from the cursor up to the next word
de      " Delete from the cursor up to the end of the word
d$      " Delete from the cursor to the end of the line
dd      " Delete the whole line
R       " Replace more than one character

### Repeating
[number]w    " Repeat a motion [number] times

### Change Command
operator [number] motion    " Operator is what to do (e.g., d for delete)
                            " [number] is an optional count to repeat the motion
                            " Motion moves over the text to operate on (e.g., w for word, e for end of word, $ for end of line)

### Moving to Start of Line
0       " Move to the start of the line

### Undo
u       " Undo previous action
U       " Undo all changes on the line

### Put Back Deleted Text
p       " Put back text that has just been deleted

### Replace Character
r       " Replace the character under the cursor

### Change Until End of Line
c$      " Change until the end of the line

### Location and Navigation
CTRL-G  " Display location in the file and file status
G       " Move to the end of the file
[number]G  " Move to the specified line number
gg      " Move to the first line

### Search
/phrase " Search forward for the phrase
?phrase " Search backward for the phrase

### Matching Parentheses
%       " Move to the matching (, ), {, }, [, or ]

### Substitute
:s/old/new        " Substitute new for the first old in a line
:s/old/new/g      " Substitute new for all old in a line
:#,#s/old/new/g   " Substitute old with new between two line numbers
:%s/old/new/g     " Substitute all occurrences in the file
:%s/old/new/gc    " Substitute all occurrences with confirmation

### External Commands
:!command        " Execute an external command
:w FILENAME      " Write the current Vim file to disk with name FILENAME
:v motion :w FILENAME " Save visually selected lines in file FILENAME
:r FILENAME      " Retrieve disk file FILENAME and put it below the cursor position
:r !command      " Read the output of the command and put it below the cursor position

### Copy and Paste
y       " Copy (yank)
p       " Paste

### Open Line
o       " Open a line below the cursor and start insert mode
O       " Open a line above the cursor and start insert mode

### Help
:help <F1> or <HELP>   " Open a help window
:help cmd              " Find help on cmd
CTRL-W                 " Jump to another window

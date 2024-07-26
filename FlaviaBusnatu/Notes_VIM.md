h- left  
j- down  
l- right  
k- up  

ESC :q! ->exits the editor, discarding any changes  
ESC :wq ->exits the editor,saving any changes  

press x to delete the character under the cursor  
press i to insert text (esc te return to Normal mode)  
press a to append text (esc te return to Normal mode)  
press dw to delete a word  
press d$ to delete to the end of the line  

typing a number before a motion repeats it that many times  
example: 
- 2w -> to move the cursor two words forward  
- 0 -> to mve to the start of the line  

d - delete operator  
type dd to delete a whole line  
type 2dd to delete 2 lines  
type u to undo the last commands - U to fix a whole line  
CTRL-R to redo the commands(undo the undos)  

c- change operator  
type p to put previously deleted text after the cursor  
type rx to replace the character at the cursor with  x  
type ce to change until the end of a word  
cc  does the same for the whole line  

Type CTRL-G to show your location in the file and the file status  
Press  G  to move you to the bottom of the file.  
Type  gg  to move you to the start of the file  
Type the number of the line you were on and then  G .  This will return you to the line you were on when you first pressed CTRL-G  

Type  /  followed by a phrase to search for the phrase  
To search for the same phrase again, simply type  n  
To search for the same phrase in the opposite direction, type  N  
To search for a phrase in the backward direction, use  ?  instead of  /  
To go back to where you came from press  CTRL-O  .Repeat to go back further.  CTRL-I goes forward  
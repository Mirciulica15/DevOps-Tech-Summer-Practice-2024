# Vim Commands Cheat Sheet

## Basic Commands
- `dw` - Delete to the next word
- `de` - Delete to the end of the word
- `d$` - Delete to the end of the line
- Typing a number before a motion repeats it that many times
- `w` - Move one word forward
- `e` - Move to the end of the word
- `dd` - Deletes the entire line
- `x` - Delete the current letter
- `u` - Undo
- `U` - Undo the whole line
- `CTRL-R` - Redo (undo the undo)
- `p` - Paste previously deleted text after the cursor
- `r` + `<character>` - Replace the character under the cursor with the specified character
- `ce` - Delete to the end of the word and enter insert mode
- `c[number] motion` - Change the text covered by the motion command

## Location and File Status
- `CTRL-G` - Show your location in the file and the file status
- `G` - Move to the end of the file
- `gg` - Move to the start of the file
- `/ <word>` - Search for a word, press `n` to go to the next match
- `? <word>` - Search backwards for a word
- `CTRL-O` - Go back to the previous location
- `%` - Find matching `(`, `[`, `{`
- `:s/<oldword>/<newword>` - Substitute old word with new word
- `:#,#s/old/new/g` - Substitute old word with new word between line numbers `#` and `#`
- `:%s/old/new/g` - Substitute old word with new word throughout the whole file, add `c` at the end to prompt for confirmation

## Commands
- `:` - Enter command mode
- `:!` - Execute a command from the shell
  - `:!dir` or `:!ls` - List directory contents
- `:w <name>` - Save the file with a new name
- `:!del <name>` - Delete a file in Windows
- `:!rm <name>` - Delete a file in Unix
- `v` `motion` `:w <filename>` - Save the visually selected lines in a file
- `:r <FILENAME/COMMAND>` - Retrieve a disk file or read the output of a command and put it below the cursor position

## More Commands
- `o` - Open a new line below the cursor and enter insert mode
- `O` - Open a new line above the cursor and enter insert mode
- `a` - Append text after the cursor
- `A` - Insert text at the end of the line
- `R` - Enter replace mode
- `y` - Yank (copy)
- `p` - Paste
- `v` - Enter visual mode (allows for text selection and copying)
- `yw` - Yank one word
- `yy` - Yank the whole line

## Options
- `:set ic` - Ignore case in searches
- `:set noic` - Disable ignoring case
- `:set hls` - Highlight search matches
- `:set nohlsearch` - Remove highlighting of matches
- `ic` - Ignore case
- `is` - Show partial matches
- `hls` - Highlight search matches
- Prepend `no` to switch an option off (e.g., `:set noic`)

## Additional Tips
- `:<letter>` + `CTRL-D` - Vim will show a list of commands starting with `<letter>`
- Completion works for many commands. Try pressing `CTRL-D` or `<TAB>`. This is especially useful for `:help`.

### References
- For more detailed help, use `:help <command>` in Vim.

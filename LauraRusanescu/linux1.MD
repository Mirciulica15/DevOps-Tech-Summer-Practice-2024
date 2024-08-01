## `ls -l` Command in Linux

Linux has three different timestamps for files:

- **atime**: The last time the file was accessed.
- **mtime**: The last modification time. This refers to changes in the file content.
- **ctime**: The last metadata modification time. This includes changes in permissions, location of the file, etc.

### Common Options for `ls` Command

- `-s`: Shows allocated space.
- `-S`: Sorts by size.
- `-h`: Human-readable sizes (powers of 1024).
- `--si`: Human-readable sizes (powers of 1000, less common).

---

## `dir` Command in Linux

When using `rmdir`, here are some commonly used arguments:

- `-r`: Recursively go through directories (and treat everything as a file).
- `-f`: Force the action. In other words, do not ask for confirmation and assume the user knows what they are doing.

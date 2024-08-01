## Work with Users

### UID Ranges
- **UID 0**: Reserved for root.
- **1-99**: Reserved for predefined accounts (e.g., games, mail, www-data, sys, bin).
- **100-999**: Reserved for system and administrative accounts.
- **1000+**: Reserved for users.

### GID Ranges
- **GID 0**: Reserved for root.
- **1-99**: Reserved for system and application use.
- **100+**: Reserved for users.

### `/etc/passwd` File

To view the `/etc/passwd` file, use:
```sh
clear && cat /etc/passwd


Change the user: su - newuser
come back to main user: exit


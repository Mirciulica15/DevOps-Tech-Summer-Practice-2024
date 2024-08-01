## Configuration of `/etc/sudoers` File

- **Viewing and Editing**: Use `visudo` to safely edit the `/etc/sudoers` file.
- **Important Lines**:
  - User Configuration: `root ALL=(ALL:ALL) ALL`
  - Group Configuration: `%sudo ALL=(ALL) NOPASSWD:ALL`

### Checking Sudo Configuration

- **Test User Permissions**: 
  ```sh
  su - student1
  sudo ps

  
## System Log Files

### Key Log Files and Their Purposes

- **syslog**: 
  - The main system log containing all important system and application information. If an application doesn't write its own logs, they appear here.

- **auth.log**: 
  - Contains authorization information, including user login attempts (successful or not), logouts, password changes, remote logins, and sudo usage.

- **dmesg**: 
  - A kernel ring buffer that provides information about the kernel's operations, including bootup messages and ongoing system activities.

- **kern.log**: 
  - Stores kernel messages.

- **boot.log**: 
  - Contains the system's startup sequence, including started services, applications, and disk configurations.

- **lastlog**: 
  - Used with the `lastlog` utility to show information about last logins.

- **faillog**: 
  - Similar to `lastlog`, used with the `faillog` utility to log failures, such as login failures.

- **wtmp.log**: 
  - Contains login information used by utilities like `who`.

- **dpkg.log**: 
  - Contains data about package management activities, including install, remove, and update actions.

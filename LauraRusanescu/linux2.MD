## `ps` Command (Process Status)

### Key Columns
- **PID**: Process ID.
- **TTY**: Terminal associated with the process. [Detailed reading about TTY](https://en.wikipedia.org/wiki/Tty).
- **TIME**: Total time of CPU usage.
- **CMD**: The command which is running.

### Process Statuses
- **D**: Uninterruptible sleep (usually IO).
- **I**: Idle kernel thread.
- **R**: Running or runnable (on run queue).
- **S**: Interruptible sleep (waiting for an event to complete).
- **T**: Stopped by job control signal.
- **t**: Stopped by debugger during the tracing.
- **X**: Dead (should never be seen).
- **Z**: Defunct ("zombie") process, terminated but not reaped by its parent.

### Additional Status Indicators (Second Letter)
- **<**: High-priority (not nice to other users).
- **N**: Low-priority (nice to other users).
- **s**: Is a session leader.
- **l**: Is multi-threaded.
- **+**: Is in the foreground process group.

### Common `ps` Command Combinations
- `ps -ef`: Detailed list of all processes.
- `ps aux`: Comprehensive process information.
- `ps aux --forest`: Tree-like process hierarchy.
- `pstree`: Visualizes process tree.

### Filtering Options
- `ps -f -u username`: Processes by user.
- `ps -f -C command`: Processes by command name.
- `ps -f -p PID`: Process by PID.
- `ps -f --ppid PID`: Processes by parent PID.
- `ps -f -p PID1,PID2,PID3`: Multiple PIDs.

---

## Aliases

- `alias al="ls -l"`
- To make aliases permanent, add them to `.bashrc`:
  ```sh
  grep "alias" .bashrc
  echo "alias lh='ls -alh'" >> .bashrc

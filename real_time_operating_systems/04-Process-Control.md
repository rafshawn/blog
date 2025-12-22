# I/O syscalls
```c
/* Open or close a file: */
int     open(const char *path, int oflag, ...);
int     openat(int fd, const char *path, int oflag, ...);
int     close(int fildes);
```
```c
/* Sequential reading and writing: */
ssize_t read(int fildes, void *buf, size_t bytes);
ssize_t write(int fildes, void *buf, size_t bytes);
```
```c
/* Randm reading and writing: */
off_t   lseek(int fildes, off_t offset, int whence);
ssize_t pread(int fildes, void *buf, size_t bytes, off_t offset);
ssize_t pwrite(int fildes, void *buf, size_t bytes, off_t offset);
```
```c
/* Metadata: */
int     ftruncate(int fildes, off_t length);
int     fstat(int fildes, struct stat *buf);
int     stat(const char *, struct stat *);
int     truncate(const char *path, off_t length);
```

# Directory syscalls
```c
/* Directory creation: */
int     mkdir(const char *path, mode_t mode);
int     mkdirat(int fd, const char *path, mode_t mode);
```
```c
/* Moving/removing files in/from directories: */
int     rename(const char *old, const char *new);
int     renameat(int fromfd, const char *from, int tofd, const char *to);
int     unlink(const char *path);
int     unlinkat(int fd, const char *path, int flag);
```
```c
/* Current working directory: */
int     chdir(char *path);
int     fchdir(int fd);
```
```c
/* Directory inspection (used by readdir(3) and friends): */
int     getdirentries(int fd, char *buf, int nbytes, long *basep);
```

# Process Creation
## Two step process:
1. Clone current process
2. Start running new program
	- **`fork(2)`**: Creates a new *child* process with:
		- new process ID (**PID**)
		- same memory contents as parent
		- its own copy of the same file descriptors
		- *Note*: Child's memory may be copied from parent, but much more efficient to create *copy-on-write* mappings to physical memory...
		- ... If either attempts to write to memory, a copy is made so both processes can have their own private copies of the data.
	- **`exec(2)`**: Transforms process into different program:
		- new executable code
		- fresh memory regions
		- **Still the same process**:
			- same PID as parent process
			- same working directory

# Process Termination
## `kill(2)`: Send signal to a process
- `kill(pid_t pid, int sig)`
- Sends a signal `sig` to a process `pid`.
	- Most obvious one is to terminate a process.
- Can be used to check the validity of `pid`.

## Signal Handling
- Allows processes to respont to events or interrupts (signals)
- `sigaction(2)` is used by a process to specify how they want to handle signals.
- Common signals:

| Signal  | Default Action | Description                     |
|---------|----------------|---------------------------------|
| `SIGHUP`  | terminate      | terminal line hangup            |
| `SIGKILL` | terminate      | kill program (can't be handled) |
| `SIGBUS`  | dump core      | bus error                       |
| `SIGSEGV` | dump core      | segmentation violation          |
| `SIGPIPE` | terminate      | write on a pipe with no reader  |
| `SIGTERM` | terminate      | software termination signal     |

## `wait(2)`: Wait for a process to end
- `wait(int *stat_loc)`
- This function suspends execution of its calling process until `stat_loc` information is available for a terminated child process, or a signal is received.
- On return, the `stat_loc` area contains termination information about the process that exited.
- *More*: `man 2 wait`
- Why process ended?

| Test          | Meaning                                 | Results                                        |
|---------------|-----------------------------------------|------------------------------------------------|
| `WIFEXITES`   | normal termination via exit(3)          | can retrieve exit status<br>with `WEXITSTATUS` |
| `WIFSIGNALED` | terminated by signal                    | can retrieve signal<br>with `WTERMSIG`         |
| `WIFSTOPPED`  | not actually terminated;<br>restartable | can retrieve signal<br>with `WSTOPSIG`         |
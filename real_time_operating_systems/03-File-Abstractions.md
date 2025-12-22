# Virtualization
- **Time-sharing**: Each user has the impression of working on a dedicated computer.
- **Virtual memory**: Each process has the impression of a dedicated address space.

# Files*
- An array of bytes that *persist*.
- Can be found via a *path*.
	- Paths can be used to look up files...
	- ...but files and paths change independently
		- file contents can change w/o changing path
		- path can change w/o changing file
- No user-meaningful names.

# Directories
- Set of entries $(n \to i)$
	- $n$: user-meaningful name
	- $i$: file's *inode*
	- **e.g.**: `foo.c`$\to 925551$
- Basically just contains a list (entry name, inode number) of pairs.
- Maps names to *inodes*.
- For each file or directory in a given directory, there is a string and a number in the data blocks(s) of the directory.

### *Example*:
Directory `dir` (inode #5) has three files:
	-  `foo` (inode #12)
	-  `bar` (inode #13)
	-  `foobar` (inode #24)

The on-disk data for `dir` might look like this:
| inum | reclen | strlen | name   |
|------|--------|--------|--------|
| 5    | 12     | 2      | .      |
| 2    | 12     | 3      | ..     |
| 12   | 12     | 4      | foo    |
| 13   | 12     | 4      | bar    |
| 24   | 36     | 28     | foobar |

Each directory has two extra entries:
- "dot" `.`: current directory (`dir` in this case).
- "dot-dot" `..`: parent directory (`root` in this case).

# inode
- **index node**: Integer index that names a location on a disk. The true and realest name a file has.
- Data structure that describes the structure that holds the metadata for a given file or directory (length, permissions, location).
- Used to identify files and directories.

# Process File Abstractions
Can use *syscalls* to open, close, read, write, etc.
```c
/* Open or close a file: */
int      open(const char *, int, ...);
int      close(int);
```
```c
/* Sequential reading and writing: */
ssize_t  read(int, void *, size_t);
ssize_t  write(int, const void *, size_t);
````
```c
/* Random reading and writing: */
off_t    lseek(int, off_t, int);
ssize_t  pread(int, void *, size_t, off_t);
ssize_t  pwrite(int, const void *, size_t, off_t);
```
```c
/* Directories and metadata: */
int      mkdir(const char *, mode_t);
int      rename(const char *, const char *);
int      stat(const char *, struct stat *);
int      unlink(const char *);
```

# File I/O SysCalls

### From a process' perspective
- syscalls are C functions.
- files are named by **file descriptors** (e.g., FD 3)

# File Descriptors
- An integer that acts as a reference to open a file within a process.
- Indices into a kernel array.
- Each process has its own file descriptor array
	- i.e., my FD 4 **!=** your FD 4
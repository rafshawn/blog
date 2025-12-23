# Pipes
- Creates unidirectional stream of bytes.
- Can `read(2)` from first FD, `write(2)` to second.
- File descriptors inherited across `fork(2)` and `execve(2)` can be shared across local sockets.
```c
int	pipe(int fildes[2]);
```

# FIFOs
- "Named pipes", where two processes communicate w/ each other by establishing a named channel or pipe.
- Instead of using `|` like pipes, FIFOs exist as file that can be accessed by multiple processes.
	- Like regular files, have permissions and can be created, opened, read, and written by a process.
	- i.e., a pipe that appears in the filesystem instead of just the shell.
- Unidirectional, but can use two FIFOs to achieve bidirectional communication.
- Can be inherited, shared, or opened (`open(2)`).
	- Allows processes to rendezvous within constraints of filesystem permissions

# Sockets
- API used as an endpoint for network communication between two machines/processes over a network.
- Allows simultaneous communication locally or across a network.
- Networking applications:
	- Client-server communication
	- P2P communication
	- Inter-process communication (IPC)

## Local Sockets
```c
// Common:
int     socket(int domain, int type, int protocol);
```
```c
// Server side:
int     bind(int s, const struct sockaddr *addr, socklen_t addrlen);
int     listen(int s, int backlog);
int     accept(int s, struct sockaddr * restrict addr, socklen_t * restrict addrlen);
```
```c
// Client side:
int     connect(int s, const struct sockaddr *name, socklen_t namelen);
```

### Why local sockets?
Well... Unlike FIFOs:
```c
ssize_t sendmsg(int s, const struct msghdr *msg, int flags);
ssize_t recvmsg(int s, struct msghdr *msg, int flags);
```
- `struct msghdr` $\to$ `struct cmsghdr`: **ancillary data**
	- **Ancillary data**: additional metadata that can be sent along w/ main data payload.
- ancillary data can include extra information
	- i.e., Allows applications to convey extra information related to transmitted data:
		- File descriptors
		- Access rights
		- etc.
- using local sockets, ability to share data **and files**

In other words...
- Local sockets offer more advanced features, better performance, and flexibility.
- Better suited for IPC scenarios.

# System V IPC
- **Purpose**: Provides a mechanism for communication and synchronization between processes.
- Introduced new local IPC objects:
	- Semaphores
	- Message queues
	- Shared memory
- **Flat numeric namespace**: Each IPC object is identified by a unique int key. This key handles access to IPC object.
	- Like a file descriptor... but not?!
```c
int hopefully_unique = 472593;
key_t key = ftok("/usr/local/share/foo/bar", hopefully_unique);
if (key == -1) { /* ... */ }
```

# System V Semaphores
- **Purpose**: Synchronization mechanism used to control access to shared resources between multiple processes.
- **Semaphores shared by multiple processes**: Typically used to coordinate access to shared resources (files, memory, hardware)
- Work on **arrays of semaphores**
### Operations:
```c
int     semget(key_t key, int nsems, int flag);			// Create new or obtain existing semaphore set
int     semop(int semid, struct sembuf *array, size_t nops);	// Performs semaphore operations on semaphores within a semphore set
int     semctl(int semid, int semnum, int cmd, ...);		// Controls and queries properties of semaphore sets (setting values, deleting sets)
```

# System V Message Queues
- **Purpose**: Queues for sending and receiving **tagged** data
- **Tagged Data**: Identifiers that enable processes to filter and process messages based on tags
- **Usage**:
	- **IPC**: Allow processes to exchange data and coordinate activities in a structured manner
	- **Assynchronous Communication**: Allow processes to send and receive messages independently of each other.

### Operations:
```c
int     msgget(key_t key, int msgflg);		// Create new or obtain existing message queue
int     msgsnd(int msqid, const void *msgp, size_t msgsz, int msgflg);		// Send messages to queue
ssize_t msgrcv(int msqid, void *msgp, size_t msgsz, long msgtyp, int msgflg);	// Receive messages from queue
int     msgctl(int msqid, int cmd, struct msqid_ds *buf);		// Control and manage message queues (delete, retrieve info)
```

# POSIX IPC
- **The Good**: Simple API
	- keys and IDs $\to$ file descriptors; better names

| System V | POSIX                  |
|----------|------------------------|
| `semget` | `sem_open`             |
| `semop`  | `sem_post`, `sem_wait` |
| `msgget` | `mq_open`              |
| `shmat`  | `mmap`                 |

- **The Bad**:
	- Paths look like filesystem paths, **but are not**
	- the following works even if:
		- `int shm = shm_open("/foo/bar/shm.example", /* ... */);`
			- there is no `/foo/bar`
			- there is, but no permission to access
		- `/foo/bar/shm.example` might not necessarily correspond to an actual file path.

# POSIX IPC vs System V IPC
- **For POSIX**:
	- Clear paths better than `ftok(3)`
	- File descriptors better than file-descriptor-like handle
		- Simplifies resource management and more consistent with other file-based operations
- **For SysV**:
	- Semaphore cleanup semantics
		- Clearer or better defined semaphore cleanup semantics compared to POSIX IPC

# POSIX Shared Memory
- FreeBSD *anonymous shared memory* via `SHM_ANON` flag.
	- Allows creation of shared memory region without need for backing files.
- Linux more recently added `memfd_create(2)` syscall.
	- Alternative for creating anonymous shared memory regions.
- Creates shared memory referenced **only** by descriptor.
	- Unlike System V Shared Memory, no associated keys or identifiers.
- Sharing is explicit; risk of namespace race eliminated.
	- Processes must explicitly request access to shared memory region.
- Part of Capsicum security extensions.

# Summary
## Inter-process Communication (IPC)
- Always **explicit**: not by accident!
- Mechanisms:
	- Pipes and FIFOs
	- Sockets
	- SysV and POSIX IPC:
		- Semaphores
		- Message queues
		- Shared memory
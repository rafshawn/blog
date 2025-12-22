# Processes
- **Memory Allocation**: Running programs need memory for code, global variables (`.bss`), the stack, and the heap.
- **Virtual address**: Address used directly by software
- Processses are *unprivileged*

# Privilege
- **Supervisor mode**: Access to privileged instructions
- **User mode**: No privileged instructions
	- Attempting to execute a privileged instruction fromm user mode results in a *trap* (type of interupt)
- Mode indicated by bits in *status register*
- Mode changes on interrupt handling, system calls, or other traps

# Privilege Rings
- A mechanism represented by layers used to enforce different levels of access and permissions for software components running on a system.
- Represented in numerical values. The lower the number, the higher the privilege.
- Number of rings is dependent on architecture.
- Most common implementation has four rings:
	- **Ring 0**: Kernel Mode
		- Highest privilege level.
		- Unrestricted access to system resources.
		- Can execute privileged instructions.
		- Critical system functions such as memory management, process scheduling, device I/O handling.
	- **Rings 1 & 2**: Reserved
		- Intermediate privilege levels.
		- Could be unused or reserved for future expansion
		- Most commonly used for device drivers, not so common in modern systems.
	- **Ring 3**: User Mode
		- Lowest privilege level.
		- User-space applications run in this ring
		- Process' have limited access to system resources and cannot directly execute privileged instructions.
		- Process' here rely on system calls to request services from kernel. Kernel performs operations on their behalf.

# Unprivileged processes
**System calls**:
- How unprivileged processes perform privileged operations
- Privileged system (*kernel*) code called by unprivileged (*user*) process
- Note called like ordinary functions:
	1. Set arguments (including syscall #) in registers or memory
	2. Invoke interrupt or syscall instruction
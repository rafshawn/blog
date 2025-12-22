# Process Information
## Process Image
- Refers to the snapshot of a process' state at a specific point in time
- Contains all necessary information for the process to execute:
	- **User memory**: stack, heap, code segment, `.bss`
	- **Process Control Block (PCB)**: data needed to control the process
	- Assuming VM provides separation *and* swapping
- **Must be (at least partially) loaded in main memory to execute**
- i.e., Process image is essential for OS to control and manage process effectively

## Process Control Block (PCB)
- Contains essential information about a process, including:
	- Registers (program counter, status word, etc.)
	- FPU state
	- Descriptor tables (e.g., IDT -- Interrupt Descriptor Table)
	- Memory pointers to code and data, shared memory blocks
	- Fault handler
	- Flags
	- **Process Identification**: PID, parent, descendants, user
	- **Processor state**: PCB: registers, status word
	- **Process information:**
		- Process information (state, priority, event)
		- Signals and Timers
		- Credentials
		- File descriptors
		- System call vector
- Serves as a data structure that holds all necessary details for the OS to manage and control the process effectively

## Process Creation
<img src="_resources/6780fd782ca70a1ba087bd8689c323cf.png" width="200"/>

1. Building the PCB to store process information
2. Allocate memory for the process to execute
3. Create an execution context (thread) for the process
4. Run the process

## Process Switch
- ***Saves*** context of currently running process into PCB
- ***Updates process*** with new state and accounting information
- ***Moves*** process to appropriate queue (ready, blocked, etc.)
- ***Selects*** another process to continue its execution
- ***Updates MMU***  (Memory Management Unit)
- ***Restores PCB*** of selected process to continue execution
- i.e., allows OS to efficiently manage multiple processes by switching between them to utilise system resources effectively

## Process Termination
<img src="_resources/1ae4bdc2bd35f373701bd55b4de0f82f.png" width="200"/>

Occurs when a process exits due to reasons such as:
- Calling `exit(2)` function
- Receiving a `SIGKILL` signal
- Encountering an *unhandled signal*
- Exceeding resource limits

## Queueing Model
<img src="_resources/cc4aa6da91db1ebcb87a7ec05a867574.png" width="400"/>

Analysis and optimisation of processes waiting to be executed

# Process models
- Progresses from simple to realistic process execution models.

## Two-state model:
- Simplest process model; divides process execution into two states:
	- Running
	- Exit
- In this model, a process is either actively running, or has been terminated.
	<img src="_resources/e95c1c216baee8f65191d24d7a634f4f.png" width="500"/>
	<img src="_resources/acc2f4393391112f4e2335964de58d81.png" width="500"/>

## Five-state model:
<img src="_resources/6e49541faafe50079acd653902e4d938.png" width="600"/>

- **New**: Created but not ready to execute
- **Ready**: Can execute when scheduled by the OS
- **Running** Actively executing
- **Blocked**: Waiting for an event (e.g., I/O completion)
- **Exit**: Terminated but metadata remains in memory

### Process State Transitions
- Defines the movement of a process from one state to another:
	- **Null $\to$ New**: Process creation
	- **New $\to$ Ready**: OS prepared to make process runnable
	- **Ready $\to$ Running**: *Dispatch* ready process to execute
	- **Ready $\to$ Exit**: Terminated by other process (e.g., parent)
	- **Running $\to$ Exit**: Termination
	- **Running $\to$ Ready**:
		- Process has had its time continuously running
		- Higher priority process has become ready -- **preemption**
		- Voluntary yield (e.g., `sleep(3)`, `nanosleep(2)`)
	- **Running $\to$ Blocked**: Process waits for syscall, I/O, etc.
	- **Blocked $\to$ Ready**: Event that process is waiting for occurs
	- **Blocked $\to$ Exit**: As above

## Seven-state model:
<img src="_resources/67e3dcbcd78cf7aa2caade6795dae3cf.png" width="600"/>

- A more detailed representation of process behaviour, including specific conditions and events for transitions between states
- Introduces additional process state transitions:
	- **Ready $\to$ Suspend**: Manual suspension (`SIGSTOP` or `SIGTSTP`)
	- **Suspend $\to$ Ready**: No ready process or suspended process has highest priority
	- **Blocked $\to$ Blocked/Suspend**: Manual suspension (`SIGSTOP` or `SIGTSTP`)
	- **Blocked/Suspend $\to$ Suspend**: Event being waited for occurs
	- **New $\to$ Ready/Suspend**: Depends on available resources
	- **Blocked/Suspend $\to$ Blocked**: Higher priority than any in Ready queue; resources available
	- **Running $\to$ Ready/Suspend**: Pre-empted by Suspended process and memory ended
	- **Any $\to$ Exit**: Termination

# Reasons for suspension:
Lists various reasons for process suspension.

| Reason         | Comment                                                |
|----------------|--------------------------------------------------------|
| Swapping       | OS needs to release resources for another process      |
| User Request   | e.g., debugging or manual suspension (`Ctrl+Z`)        |
| Timing         | Suspension of periodic process while awaiting next run |
| Parent Request | Debugging, examination, coordination of descendants    |
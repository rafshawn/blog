# Dispatching Algorithms
Determines task execution order and efficiency

## First Come First Served (FCFS)
- Essentially **FIFO**
- Processes chose from the front of the ready queue in order of arrival
- **Pros**:
	- Better for long processes
- **Cons**:
	- May lead to poor turnaround due to *convoy effect*
	- Not ideal for short processes, as it can cause delays in execution

## Shortest Process Next (SPN)
- Also known as *Shortest Job First (SJF)*
- Selects shortest job in the ready queue for execution
- **Pros**:
	- Optimal average Turnaround Time (TAT) **if all jobs arrive together**...
- **Cons**:
	- ...but risk of starvation for long processes
	- **Assumes** knowledge of job lengths

## Shortest Remaining Time (SRT)
- Pre-emptive version of SPN
- Prioritises process with shortest remaining process time
- **Pros**:
	- Good turnaround time
	- Avoids bias to longer processes
	- Low overhead
- **Cons**:
	- Need estimate of required processing time

## Round Robin
- Also known as time slicing
- FCFS, but with clock based pre-emption
- Each process gets a time slice (quantum) to execute
	- Smaller quantum reduces response time
	- Too small can increase overhead
- Favours processor-bound processes

## Virtual Round Robin
- Involves multiple process queues
- I/O queues feed into auxiliary queue
	- Auxiliary queue is prioritised over ready queue for process execution
- i.e., Helps manage process priorities efficiently in a multi-process environment

## Highest Response Ratio Next
$R = \frac{w+s}{s}$

$w=$ Time spent waiting

$s=$ Expected service time
- Selects the ready process with the largest value of response ratio, $R$
- **Favours shorter jobs**
- Brings longer jobs to the top based on age
- i.e., Helps minimise waiting time by prioritising processes with a higher expected service time

## Fair-Share Scheduling
- Method used in a **multi-user environment**
	- i.e., groups of user processors
	- Ensures each user or process group gets "fair share" of processor time
- Dynamic priority adjustments based on usage within group
- In **Networking**, similar concept applied through *Weighted fair queueing*
- Implemented in Linux with the *Completely Fair Scheduler (CFS)* to maintain fairness in resources allocation

# Multiprocessor Scheduling
- Involves managing the execution of multiple processes on a system
- Same algorithms as uniprocessor scheduling
- Multiple queues (or processors) to think about
- *Interestingly*, the choice of scheduling discipline has **less impact** in a multi-processor environment than in a single processor environment
	- **Why?**: In a multi-processor environment, tasks can be distributed across multiple processors (parallel execution).
	- The distribution reduces the impact of the choice as *tasks can be processed concurrently*
	- Conversely, scheduling decisions directly affect the order and timing of task execution in a uniprocessor environment.

## Types of Multiprocessing
- **Loosely Coupled/Distributed**:
	- Independent systems work together on a task
	- Each processor has its own memory, I/O, etc.
- **Functionally Specialised**:
	- Processors dedicated to specific functions
	- Usually controller-peripheral
- **Tightly Coupled**:
	- Processors share memory and communicate closely (one OS)
	- Task integration more integrated

# Threads
- *Lightweight processes* within a program that can execute independently
- Processes own threads
	- There can be 1 thread per process, or many
	- Shares the same memory space and resources
- Can run concurrently to handle multiple tasks simultaneously
	- This is known as ***Multithreading***

## Multithreading
- Allows for parallel execution of tasks.
- Shares the same *process description* and *userspace address space*
- Each thread has:
	- Userspace stack
	- Kernel stack
	- Local variable storage (architecture dependent)

## Thread Events
<img src="_resources/61eabf24e00404eb8824ae38877e25c6.png" width="400"/>

Manages execution and synchronisation of threads in a multi-threaded environment:
- **Spawn**: Creation by another thread
- **Block**: Wait for an event (need not block process)
- **Unblock**: When event occurs
- **Finish**: Termination

# Types of Threads
<img src="_resources/1335c5afc122f858b2fdfab52c572a80.png" width="250"/>

## User-level Threads (ULT)
- Managed by the application without kernel support
- Lightweight and fast to create and manage
- Threads are creating by the process
	- Uses threading library
- Often used in Scientific Computing
- Many languages have ULT support
- **Pros**:
	- No kernel mode switch to thread switch
	- Application specific scheduling
	- OS Independent (portable)
- **Cons**:
	- Blocking syscalls blocks entire process
	- Interprocess multiprocessing not possible

## Kernel-level Threads (KLT)
<img src="_resources/d6c1398c382b17736c60fb25076d08fe.png" width="250"/>

- Managed by the kernel (i.e., the OS)
- Processes create threads via API (`pthreads`)
- Scheduling is handled by kernel
- **Pros**:
	- Overcomes ULT disadvantages
	- More robust
- **Cons**:
	- Slower to create and manage compared to ULT
	- Thread switch requires a mode switch

## Hybrid Threading
<img src="_resources/536be26b96b23c53912b966f07912f95.png" width="250"/>

- Combines *ULT* and *KLT*
	- ULTs mapped to (one or more) KLTs for multiprocessing
- Thread creating done in userspace
- Most scheduling done in userspace
- ***Example***: `libdispatch`
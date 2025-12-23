# Unbuffered I/O Problem
**The problem**
- Kernel issues read command
- But then...process gets swapped out...
- ...leaving the I/O operations blocked while waiting for memory
- This situation can lead to a **deadlock** scenario, where the process is unable to proceed due to the blocked I/O operation

# I/O Buffering
- Use kernel memory to buffer data
	- i.e., temporarily store data being transferred between devices and processes.
- Allows efficient data handling by enablind read-ahead operations
	- Fetches additional data in anticipation of future requests
	- Reduce delays in data retrieval

## Single Buffering
- Transfer data to kernel buffer
- Then move it to userspace
- Requires kernel buffer to be available until data is copied to userspace
	- Potentially causes delays id buffer is occupied

## Double Buffer
- Transfer data to one kernel buffer while...
- ...simultaneously copying another buffer to userspace
	- Allows increases request servicing capabilities
	- can enhance performance by enabling read-ahead operations

## Ring Buffer
- Stores data in a fixed-size buffer with a wrap-around mechanism
- Good for data streams where the oldest data is overwritten by newest data when buffer is full
- Efficient for handling bursty I/O patterns

# Buffering Speedup
- Performance improvement achieved by using buffers to optimise data transfer and processing
	- $T$: Time required to fetch input block
	- $C$: Computation time between input requests
	- $M$: Time to move a block from buffer to userspace
- Speedup by reducing the time required to fetch input blocks and moving data between buffers and userspace
- **Execution Time**:
	- **No Bufffer**: $T+C$
	- **Single Buffer**: $\text{max}(C, T) + M$
	- **Double Buffer**: $\text{max}(C, T)$

# Zero Copy I/O
- What's better than lots of buffering? **No buffering!!!**
- Eliminates the need for data buffering during I/O
	- Reduces latency by directly transferring data between applications and devices without intermediate buffering stages
	- Requires driver support and memory that isn't swapped out
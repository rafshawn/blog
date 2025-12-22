# Why superpages?
- Used to reduce indirection in table walking...
	- ...which can help decrease frequency of page table access
- Primarily aimed at reducing **TLB pressure**
	- Making memory access more efficient by utliising larger page sizes

# Translation Lookaside Buffer
- Acts as a cache for the page table.
	- Stores recently access virtual-to-physical address translations
- When a memory access is requestion, TLB is checked first to see if translation is already available
	- Helps speed up memory access process
- If required access not found in the TLB, a **a TLB miss**


## TLB Miss
<img src="_resources/13e34ff7785a874ae2a93286f74ac3b4.png" width="250"/>

- Happens when TLB does not contain the required translation for virtual-to-physical address mapping
- When a TLB miss happens, hardware page-table walker or OS must retrieve the translation from the page table
- If no entry in the TLB or the page table, **Page fault**

## Page Fault
<img src="_resources/5e8c3c909bff2340daa9e6ed350e2164.png" width="450"/>

- Page fault handler triggered to handle the above situation by...
	- Populating memory
	- Updating virtual memory mappings
	- Potentially fetching data from secondary storage (disk, network, etc.)
- This process ensures the required data is brought into memory and mapping is establish
	- Done to allow program to continue execution
- **Goal**: Keep page faults to a minimum
	- Page replacement
	- Page fetching
	- Buffering
	- Resident size management
	- etc.

# Page Fetch Strategies
- **Demand paging**: Pages fetches only when needed
	- Initially leads to many page faults, but decreases overtime due to *temporal locality*
- **Prepaging**: Preloads memory by exploiting secondary disk structure
	- One page fault on startup
- **Which one is better?**:
	- Prepaging is generally considered better, as it preloads memory and incurs only one page fault on startup, reducing initial delay in accessing pages.

# Replacement Policies
- *When loading from secondary storage, what should be replaced?*
	- Replacement policies dictate which page or frame should be replaced when a new page needs to be brought into memory
- Consider **frame locking** and R/W, U/S bits.

### Optimal Strategy (Belady's Algorithm):
- Evicts the page that will be used in the future
- Not always achievable due to lack of future knowledge of memory access patterns.

### Least Recently Used (LRU):
- Replaces the least recently accessed page when a new page needs to be brought into memory
- Good for capturing temporal locality
- Almost as good as Belady in minimising page faults
- *However*, requires significant overhead to track usage of pages over time at each memory access

### First-In-First-Out (FIFO)
- Replaces the page that's been in memory the longest when a new page needs to be loaded
- Not a great strategy
	- Some frames loaded early are used often
	- $\therefore$ can result in many page faults
- Does not consider the frequency of page accesses

### Clock Strategy:
- Treats available pages as circular buffer
- Associates a use bit with each page
	- When a page is accessed, set "A" bit
	- When replacement is needed, scan buffer
		- If "A" bit set, clear bit and move on (done by OS)
		- Otherwise, page's frame is replaced
- Better ***Why?***:
	- Protects frequently-used pages efficiently
	- Reduces overhead in replacing unmodified pages
- Can also track dirty bit

# Page Buffering:
- An add-on technique to replacement algorithm
- OS maintains two pools of pages
	- Free, not modified
	- Free, modified
- When a plage is "replaced", it is placed in one of these pools first
- Checks pool first when page requested

# Resident Set Management:
- Managing portion of process' memory physically held in main memory
- VM system decides size of each process:
	- **Small**: Lots of processes, higher page faults
	- **Large**: Few processes, low multiprogramming
- Can be done through different modes of allocation:
	- **Fixed allocation**:
		- Number of frames fixed at process load time
		- Can be equal or proportional allocation
		- Page faults bump a page from the same process
	- **Variable allocation**:
		- Frames per process can vary over time
			- Increase if page fault rate is high
			- Decrease if slow
		- Tracking page fault rates increases overhead by a little

# Cleaning
- Periodically writing out modified pages to ensure the most up-to-date data is stored on disk
- Adds overhead of a page fault, but helps maintain data integrity and consistency
- Essential to ensure modified pages are saved before replacement, preventing data loss or corruption
- **Demand Cleaning**:
	- Write out modifications as pages are replaced
	- Adds to the overhead of a page fault
- **Pre-cleaning**:
	- Periodically write out modified pages
	- Allows us to write out in batches
- Both can be used with page buffering
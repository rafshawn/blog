# Recall: Directories
- Set of entries $(n \to i)$
- Basically just contains a list (entry name, inode number) of pairs.
- Maps names to *inodes*.
- For each file or directory in a given directory, there is a string and a number in the data blocks(s) of the directory.
- **Incomplete truth**: All of these points are true, but...
	- Missing details on disk encoding (*Implementation*) and *Authorization*.
		- **Implementation**: How are files and directories actually encoded on disk?
		- **Authorisation**: Who can do what? How is it decided?

# Filesystem
<img src="_resources/2fd8cefdf1ab4751988b024adbe9f336.png" width="400"/>

- Method used by OS to organise and store data
- **High-level Goal**: Store files and directories in *blocks*

# Disk Sectors
- Fixed-sized *sectors* on magnetic disks where data is stored
- Originally addressed by cylinder, head, and sector
	- In 1980s, *Logic Block Access* (LBA) replaced this method
- Disks may have around *512 bytes* in size

# Blocks
- Larger units of data compared to disk sectors
- Typically around *4 kiB* in size
- Logically accessed by index and contain data or metadata
- Stores information in a filesystem such as
	- file contents
	- inodes
	- superblocks

# inodes
- Contain essential informmation about files
	- file size
	- uid/gid/permissions
	- times (creation, modification, acces)
	- "pointers" to data sectors
- Serve as metadata structures in a filesystem to represent files and directories
	- Important for managing file attributes

## inode Indirection
- Process of using pointers in inodes to indirectly access data blocks in a filesystem
	- i.e., exploring file size limits with different levels of indirection.
- **Question**: *In a filesystem that has 512 B sectors and inodes with 12 block poitners, how large can a file be?*
	- A file can be up to $12 \times 512 \text{ B} = 6144 \text{ B}$ in size without indirection
- **Follow-up Question**:
	- *What if we permit indirection via one additional sector?*
		- If indirection is permitted, the file size can be extended to $13 \times 512 \text{ B} = 6656 \text{ B}$
	- *What about via two levels of sectors*
		- By two sectors of indirection, the file size can be further extended

## Sector Structure
- Indirection leads to a hierarchy for large files:
	- inode $\to$ sector $\to$ sectors $\to$ sectors
- Allows for efficient data storage and retrieval by mapping data blocks to specific sectors
- Pointers embedded directly in inodes are used for optimisation, especially for small files
	- Enhance performance and reduce data access overhead

# Directory Entries
- Mapping names to inodes
- Can be stored in blocks
- Lets files and directories be organised by associating file names with their corresponding inode numbers
- **Question**: What data structures might you use to store directory entries? Why?
	- Directory entries can be stored using hash tables or linked lists.
		- **Hash tables**: Orivudes fast lookup times. Suitable for large directories
		- **Linked lists**: Simple and flexible in managing directory entries

# Meta-meta-data
- Information used to keep track of free and allocated inodes and blocks in a filesystem
	- Can be managed through *free lists* or...
	- ...given fixed sizes, *bitmaps*

# Superblock
- Stores essential filesystem information
	- Filesystem size
	- Number of inodes
	- Offset of data blocks
- May have multiple copies for redundancy to enhance reliability of filesystem

# Virtual Filesystem (VFS) Operations
- Generic actions that apply to any filesystem
- Includes operations like `getattr`, `open`, `read`, `write`, `truncate`, etc.
- Provides an object-oriented interface to interact with filesystem
	- Allows applications to perform standard file operations regardless of underlying filesystem type
- **Thought exercise**: *Walk through steps required to open a file, read from it, write to it, and close it*
	- Syscall `open()`
		- Specify file path and access mode
	- Syscall `read()`
		- Read data from opened file into buffer
	- Syscall `write()`
		- Modify file contents by writing data into it
	- Syscall `close()`
		- Release file descriptor and ensure pending changes are saved before closing file

# Page Cache
- Mechanism used to cache disk blocks in memory to improve performance (talking to disks is slow!)
- Reduces the need to frequently access disk
- Caching some blocks makes sense, but number of blocks required is hard to predict.
- Page cacheing stores recently accessed data from files in memory
	- This allows faster retrieval when same data is requested again
- i.e., *Helps minimise latency associated with disk I/O by keeping frequently accessed data readily available in memory*
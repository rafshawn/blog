# Why Study FAT?
- Offers unique structure compared to Unix
- Still prevalent in various systems like camera file systems

# File Allocation Table (FAT) Filesystem
<img src="_resources/b3977457fe25e18483fbf053a4cd43fa.png" width="500"/>

- Introduced in 1977, still relevant in 2018
- Uses linked lists for block allocation
- Utilizes FAT for metadata instead of inodes
- Despite limitations, remains widely used
	- Lacks support for hard links and permissions, making it less secure
	- But, it does make it suitable for single-user computers like digital cameras or USB sticks

# Block Structures
<img src="_resources/316253a92e80b779d295bb48a137187f.png" width="350"/>

- Utilizes trees of "indirect" blocks
- Includes directory entries with details like...
	- names
	- dates
	- sizes
	- starting clusters
- Resembles a mix of inodes and directory entries

# Linked Lists of Blocks:
<img src="_resources/93183d2776c5177f4df3a09ed5b8653d.png" width="400"/>

- Simple concept, simple implementation
- Enables arbitrary-length files but lacks random access

## Some problems:
- **Assume list of blocks**:
	- <img src="_resources/71db57702354fc5ca0d65a876d4c6274.png" width="200"/>
	- Accessing third block of file (cluster 6) requires iteration
- **Related question**:
	- <img src="_resources/f483f4cc5e65d16092d213f760557a63.png" width="300"/>
	- Where to store the pointers?

## File Allocation Table
<img src="_resources/cfc00c0444f38083a1750ceb2d90b81e.png" width="300"/>

- *Neat solution to both problems*:
	- FAT stores "next" pointer for each cluster
	- 12b, 16b, or 32b for each 2-32 kiB cluster

# FAT Metadata
- Utilizes FAT instead of inodes
- **Implications**
	- No hard links
	- No permissions in FAT filesystem
- **Design**: (Again) suitable for single-user computers without protection mechanisms

# FAT Name Lookup & Directories
- **FAT Name Lookup**: Root directory entry in cluster 2
	- Hard-coded in FAT12 and FAT16
	- Can be elsewhere in FAT32
- **Directory Entries**: Serialised into data blocks in the FAT filesystem
	- 32 bytes
	- map names to details like...
		- dates
		- times
		- sizes
		- starting cluster
	- Sort of like an inode/dirent crossover
# Consider
- What would happen if bits changed in:
	- a data block?
	- an indirect pointer block?
	- an inode?

# Bit Rot
- Data corruption can occur, but strategies like checksumming help cope with it.
- **Coping Strategies**:
	- **Ostrich strategy**: Ignoring the issues and hoping it doesn't happen
	- **Multiple copies of metadata**: Keeping redundant copies of metadata to mitigate data corruption
	- **Checksumming**: Using checksums to detect and correct errors in data to ensure integrity

# Checksums and Hashes
- Used to compute values over data to detect corruption (accidental or malicious)
	- Checksums like **Cyclic Redundacny Checks (CRCs)**...
	- ...and hash functions in Data Structures

# Zettabyte Filesystem (ZFS)
- Features **ZFS Hash Tree**:
	- Incorporates checksum in every block "pointer"
	- Metadata blocks form a *Merkle Tree* for data integrity

# Updating ZFS Blocks: CoW Semantics
- Modifications are never done in place
	- Instead, a new block is created to maintain data integrity
- Utilizes Copy-on-Write (CoW) semantics to update blocks
	- Ensures there is no data inconsistency in original block
	- Replace block pointer in metadata block atomically
	- Allows for atomic updates, data-block checksums for reduplication, and self-healing

## Atomic, checksummed updates
- Ensures data consistency can be verified on every access
- Enables self-repair through mirroring or copies
- Creates snapshots and clones easily
- Incremental backups is also easy
- Redupliation is straightforward

## Trade-offs
- CoW filesystems may be more suitable for certain scenarios:
	- **Servers**: Advantageous indeed!
	- **Desktops**: Might be suitable, but not always necessary
	- **Embedded Systems**: Memory usage may be a concern, as CoW systems often need lots of memory. Alternative should be considered to optimise resource utilisation.

# Some CoW Filesystems
- 2005: ZFS (Solaris, FreeBSD, Linux)
- 2007: Btrfs (Linux)
- 2008: HAMMER (Dragonfly BSD)
- 2017: Bcachefs
- 2017: APFS (iOS, MacOS, WatchOS)
	- **Apple Filesystem*
	- Incorporates CoW semantics
	- Atomic updates
	- Features like snapshots, clones, and backup capabilities
	- Offers data integrity and efficiency for Apple devices with advanced storage management features

# Summary
- CoW filesystems allow
	- Atomic updates
	- Nice cloning, snapshot, and backup
	- With data-block checksums:
		- Reduplication
		- Self-healing
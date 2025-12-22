# Paging in Practice
- The dominant model for virtual memory
- Some concrete examples from Intel and AMD
	- ARM has similar memory management hardware
- Variations of pages used in different OS' to optimise memory management

# 32b Intel Page Table Entry
<img src="_resources/d0da8c0174fbce63fb5eb75fe9ef91fd.png" width="550"/>

| Bit | Name | Meaning                           |
|-----|------|-----------------------------------|
| 1   | R/W  | Enables writing to page           |
| 2   | U/S  | Marks page supervisor-access-only |
| 5   | A    | Indicates page accessed recently  |
| 6   | D    | Dirty: page modified recently     |

# 64b Intel Page Table Entry:
<img src="_resources/1b8c5d02c585427d22a458bc5053f783.png" width="550"/>

- Supports bigger virtual address
	- **40b or 48b**: no need for > 256 TiB right now
	- **Extensible**: Can accommodate larger virtual address spaces if needed without requiring changes to underlying structure
- XD (execute Disable) for security

# Page Table Size:
- For a system describing 32b of virtual and physical memory with 4 kiB pages and frames
	- The total page size is 4 MiB
	- $\frac{2^{32} B}{2^{12} B/\text{page}} = 2^{30}\text{ pages}$
- Each frame number requires 20b; round up to 32b

## Pages tables on 64b machines
- In the context of 64b machines, a page table would needs to be larger to hold entries for larger virtual and physical address:
	- $\frac{2^{64} B}{2^{12} B/\text{page}} = 2^{52}\text{ pages}$
	- i.e., 4 petapages

# Page Tables in Practice:
<img src="_resources/92f66a2555a71949b9d08792c3ee841a.png" width="450"/>

- In practice, real page tables are not monolithic but structured as multi-level page tables
- Multi-level page tables create trees of pages
	- tables of tables of pages
	- every table **fits in a page**
	- individual tables can be replaced (swapped out)
### Two-level page table
- For paging in 32-bit systems
	- Consists of two levels of tables to map virtual and physical addresses
### One-level page table
- Simpler structure, but not suitable for handling extensive memory mappings
	- Limitations in addressing large memory spaces efficiently
	- Some OS's use variations like *superpages* (BSD), *huge pages* (Linux), or *large pages* (Windows) instead
### Four-level page table
- For paging in 64-bit systems
	- Implemented in systems like AMD'x x86_64 and Intel's IA-32e
	- Workable (more scalable approach to memory management), but pretty indirect
### Superpages in x86-64
- Supports omitting last-level page table, supporting up to $2^{27}$ **2 MiB** pages
	- Enhance performance by reducing number of page table lookups required for address translation (Reduces overhead)
### Super-duper-pages in x86_64
- Supports omitting last two page levels, supporting up to $2^{18}$ **1 GiB** pages
	- Further reduces overhead
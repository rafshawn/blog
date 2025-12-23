# What do OS' do?
- Process execution, scheduling
- Inter-process communication
- Hardware I/O
- Hardware abstraction
- Filesystems
- Access control (system, files, memory, devices)
- Accounting

Operating systems mediate software access to resources, whether concrete (disk space, I/O devices) or abstract (time, security)

# "Real-Time" Operating Systems?
- **Predictable** behaviour
- Notable deadlines that need to be met, with clear **priorities** of various tasks
- Tasks are **periodic**

###  Hard real-time ("or else"):
- Has hard deadlines (emphasis on dead)
- *Example*: cars, planes, mars robots, etc.

### Soft real-time ("mostly"):
- Has soft deadlines
	- i.e., deadlines are important (mostly)
	- but slippage is acceptable
	- *Example*: Frame drops in HQ video stream
- *Example*: A/V, transactions, simulation

### Non-real-time
- Everything else!

# Important concepts
- Interrupts
- Memory and I/O interfacing
- Multiprocessing
- Privilege modes
- Virtual memory
	- Virtual and physical addresses
	- Page tables and TLBs
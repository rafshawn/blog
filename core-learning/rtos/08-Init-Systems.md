# Process Parentage
- Where do new processes come from?
	- New processes are typically  `fork(2)`'ed from a parent proces...
	- ...which can be traced back recursively to an `init` process initiated by the kernel during system boot.
- i.e., process parentage traces back to an `init` process initiated by the kernel.

# System Startup
- The boot process involves firmware, bootloader, kernel, and the `init` system.
	- Power on
	- processor executing ***firmware*** at known address (`[EEP]ROM` connected to a address bus)
	- firmware loads ***bootloader***
	- bootloader loads ***kernel***
	- kernel starts ***`init` system***, responsible for managing system's startup tasks

# `init` System
- `init` plays a crucial role in managing the system's startup and initialisation process.
- The system (typically `PID 1`) serves as the root of the process tree and finishes booting the system by handling tasks:
	- mounts filesystems
	- starts terminal (`tty`) device managers
	- starts network services
	- starts graphical login services
	- etc.

## BSD `init`
- Offers two -user modes for system startup:
	- **Single-user mode**: forks a shell (`/bin/sh`) for troubleshooting purposes.
	- **Multi-user mode**: the *"normal"* system startup
		- forks a shell for `/etc/rc`
			- loads settings from config files (`/etc/defaults/rc.conf`)
			- overrides config (`/etc/rc.conf`)
			- runs scripts from `/etc/rc.d` with `rcorder(8)`
		- starts terminal login services (read `/etc/ttys`: start `getty(8)` $\to$ `login(1)`)

## SysV `init`
- Uses **runlevels** with start/stop scripts for each level:

	| Runlevel | Meaning                |
	|----------|------------------------|
	| 0        | Halt             |
	| 1        | Single user mode |
	| 2        | Default for AIX, SVR3, SVR4 |
	| 3        | Default for Gentoo, HP-UX, Slackware... |
	| 5        | Graphical (X) |
	| 6        | Reboot        |

- Startup scripts are help in `/etc/init.d`, with symbolic links to directories like `/etc/rc.d/rcN.d` indicating services associated with specific runlevels
- Each runlevel has a directory (like `/etc/rc.d/rc4.d`)
	- Symbolic links to scripts in `/etc/init.d`
	- symlink implies services "part of" runlevel
- Can change runlevel: `init 3`. `init 4`. etc.
	- Identifies set differences between runlevels
	- runs `etc/rc.d/rcN.d/foo stop` or `start`

# `launchd`
- A process introduced by Apple in 2005 for Mac OSX 10.4 Tiger
- Replaces `init` and `inetd`
- Listens to network ports listed in `/etc/inetd.conf` and...
- ...starts process to serve requests upon connection
	- Therefore unifying service discovery by name or connection

# `systemd`
- A system and service manager that serves as the core manager for various system components:
	- services
	- sockets
	- mounts
	- timers
	- etc.
- Devekioed starting in 2010 and has been adopted by several Linux distros since 2011
- Incorporates elements of different system components:
	- `init`
	- `inetd`
	- `syslog`
	- `login`
	- `cron`
	- devices
	- networking
	- temporary files
	- boot
	- etc.
- Apparently *hugely controversial*...

# Present Day...
- Today, there are ongoing developments in the realm of `init` systems.
- With alternatives to `systemd` being explored such as...
	- `jobd`
	- `nosh`
	- `OpenRC`
	- `procd`
	- `runit`
	- and `S6`
- The landscape remains dynamic and evolving with new possibilities
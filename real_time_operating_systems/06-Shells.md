# Shell
- Command interpreter
- Accepts user commands, executes them
	- A UNIX **shell** commonly uses `fork()`, `wait()`, and `exec()` to launch user commands.
- With redirection, pipes, flow control, heredocs, scripting, job control...
	- The separation of fork and exec enables features like **input/output redirection**, **pipes**, etc., without changing anything about the programs being run.

# POSIX Shell
- **POSIX**: Portable Operating System Interface
	- Set of standards specifying the interface between a Unix-like OS and user programs.
- A POSIX shell adheres to POSIX standard for shell syntax, built-in commands, environments variables, and other shell features.
- Provides consistent and portable environment for executing commands, scripting, and interacting with OS.

## Redirection:
- The ability to change where input comes from and where output goes to in a command line.
	- *Example*: `command > output.txt`
	- Redirection achieved with `<`, `>`, and `>>`
- Output `stdout` or `stderr` to a file.
- Done with `dup2(2)`

## Pipes
- Connection between two processes.
	- *Example*: `$ echo "Hello, old friend. | cowsay`
	- `|` character used to represent pipe.
	- `echo "Hello, old friend."` is passed as input to `cowsay`
- Output from one program becomes the input another (one way).
- **`pipe(2)`**: creates a descriptor for reading and one for writing
- **`dup(2)`**: sets up stdout/stdin
- File descriptors inherited across `fork(2)` and `execve(2)`.

## Job Control
- Ability to manage multiple processes running within shell environment.
- Command execution is normally synchronous. Shell waits (`wait(2)`) for completion of the child process
- `&` runs command *in the background*; `Ctrl+Z` moves current command to the background
- built-in `jobs` command lists jobs that can be *foregrounded* with `fg` or killed with `%1` or `%2`
- `Ctrl-C` sends `SIGTERM`

## Environment Variables
- Variables set in shell environment and inherited by child processes.
- Used to store information such as *sysconfig*, *user prefs*, *runtime params*.
- *Examples*:
	- `PATH`: Specifies directories to search for exec files
	- `HOME`: Specifies user home directory
	- `LANG`: Specifies language and locale settings

## Heredocs
- Allows you to pass multiple lines of input into command or script w/o using external file.
	- i.e., can construct a temporary file *in memory*.
- Can be represented using `<<`
- *Example*:
```bash
cat << END
This is line 1
This is line 2
END
```

## Flow Control
- Lets you control execution flow of a script or program based on conditions.
	- Constructs (`for`, `while`)
	- Conditionals (`if`, `case`)
	- and Function Definitions
- Allows you to make decision, repeat actions, and organize execution of commands in a script
	- i.e., sequential conditional execution

## Scripting
- Lots of useful things can be expressed in shell
- Don't want to type same commands repeatedly? Save shell commands in a ***shell script***.
- script **directly executable** with `#!` ("*shebang*")
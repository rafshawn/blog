# VFS Layer
- Virtual Filesystem layer provides a common interface for filesystem operations
- Abstracts details with common methods
- Many different implementations of VFS layers in OS'

## Filesystem in Userspace (FUSE)
- Allows filesys operations to call back into userspace for implementations
- A common methods for implementing filesystems

# Network Filesystem (NFS) Client
- Sends VOP (Virtual Operations) requests to the server
- Request are services across the network
- Client interacts with NFS server to perform file operations

# Client/Server Communication:
- Commands are fulfilled remotely through remote procedure called (RPCs)
- RPC frameworks like *Java RMI*, *gRPC*, *JSON-RPC*, *CORBA*, and *SOAP* are used for communication
- Communication involves sending requests from the client to the server for processing

# SunRPC
- Protocol for data marshalling, unmarshalling defined in RFC 1831
- Stub functions on the local side convert arguments to network RPC...
- ...while server functions on the remote side converts RPC to actual operations
- Both functions generated via `rpcgen(1)` from Interface Definition Language (IDL)

# NFS RPC Flow
- Connect to SunRPC portmapper (port 111)
- Ask for `mountd` protocol port
- Connect to `mountd` service
- Request access to a named filesystem via NFS RPC

# NFS and Security
- **NVSv3**: Lacks authentication and crypto after mounting
	- granting further access by holding file handles
- **NFSv4**: Designed with universal encryption
	- **System security concerns**: superuser can claim any user ID, requiring additional measures like IPSec
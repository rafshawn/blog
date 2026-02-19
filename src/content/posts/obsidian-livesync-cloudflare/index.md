---
title: Obsidian Livesync Cloudflare
date: 2026-02-03
description: ""
<<<<<<< HEAD
tags:
  - cloudflare
=======
tags: []
>>>>>>> origin/main
image: ""
imageAlt: ""
imageOG: false
hideCoverImage: false
hideTOC: false
targetKeyword: ""
<<<<<<< HEAD
draft: false
=======
draft: true
>>>>>>> origin/main
---
## Minimal setup
- With the setup wizard, first select "I am setting this up for the first time"
- Click "Enter the server information manually"
	- Choose to enable end-to-end encryption or not
		- Use a password if you do...
		- Can also choose to obfuscate properties or not...
- Next, select "S3/MinIO/R2 Object Storage"
- If you've already created a bucket for your notes in Cloudflare R2, you should get the info you need in the settings tab.
	- Endpoint URL <- S3 API (Account Details)
	- R2 Overview/API Tokens/Create
		- Access Key
		- Secret Key
		- Account API Token <- Object Read & Write
- Next select the following options
	- Use path style access: false
	- Use custom HTTP handler: true
- Remember to make sure you create a token if you haven't already.
- If you run into a sync error (failed to fetch remote), you need to configure the CORS policy in the cloudflare bucket.
	- Settings/CORS Policy/Edit
 
```
[
  {
    "AllowedOrigins": [
      "*"
    ],
    "AllowedMethods": [
      "GET",
      "PUT",
      "POST",
      "DELETE",
      "HEAD"
    ],
    "AllowedHeaders": [
      "*"
    ],
    "ExposeHeaders": [
      "ETag"
    ],
    "MaxAgeSeconds": 3000
  }
]
```
- When you sync for the first time, you will get an error in the log.
	- This is fine. It's just because no config file exists in the remote DB.
- Pretty much all done. To sync to a new device, first go to the wizard on the host machine.
	- Select "copy the current settings to a setup URI"
	- Type a password to encrypt the URI (not the vault)
	- You should now get a setup URI.
- On the second device, install the same plugin and select the Device Setup Method
	- "Use a setup URI (recommended)"
	- Paste the setup URI and passphrase
	- et-voila! Remote storage done and dusted...!
---
title: Obsidian Livesync with Cloudflare R2
date: 2026-02-03
description: ""
tags:
  - cloudflare
  - obsidian
image: ""
imageAlt: ""
imageOG: false
hideCoverImage: false
hideTOC: false
targetKeyword: ""
draft: false
---
Recently, I migrated away from [Joplin](https://joplinapp.org/) and started using [Obsidian](https://obsidian.md/) for my notes. They're both really good note-taking apps, but Obsidian has just been nicer to use so far. I'm a messy notetaker and really like barebones, so I don't even have many plugins installed. I templated [how Steph Ango writes his notes](https://stephango.com/vault) (the idea is [*file over app*](https://stephango.com/file-over-app)) to help figure out my own workflow.

One thing that I do miss about Joplin though is the ability to use Dropbox to sync notes across devices. It's a seamless and free alternative to Joplin's servers. 
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
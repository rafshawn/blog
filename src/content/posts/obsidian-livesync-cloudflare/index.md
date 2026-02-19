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
Recently, I migrated away from [Joplin](https://joplinapp.org/) and started using [Obsidian](https://obsidian.md/) for my notes. They're both really good note-taking apps, but Obsidian has been an overall nicer experience. I templated [how Steph Ango writes his notes](https://stephango.com/vault) to help figure out my own workflow. I'm a messy notetaker and really like barebones, so It's not like I have a lot of plugins and settings.

One thing that I miss about Joplin though is the ability to use Dropbox to sync notes across devices. It's a seamless and free alternative to Joplin's servers, and all I needed was a Dropbox account.
# Syncing Notes
It's not to say that you're stuck with no syncing options.
1. The official [Obsidian Sync](https://obsidian.md/sync) costs $4/mo to get the job done. It's pretty good, since its all integrated within the app anyway and you're supporting the project. If you're just an everyday user who wants the easiest solution, this is probably what you'll go for.
2. Obsidian has a whole ecosystem of community plugins.
	- [Obsidian Git](https://github.com/Vinzent03/obsidian-git) lets you commit and push your notes to a Github repo. Straightforward, but potential merge conflicts? This has its drawbacks...
	- [Remotely Save](https://github.com/remotely-save/remotely-save) lets you use your preferred cloud service as a broker to sync across devices. This one's pretty good, it's just Obsidian Sync with the ability to control *where* your notes are saved.
	- [Self-hosted LiveSync](https://github.com/vrtmrz/obsidian-livesync) works like Remotely Save, but also lets you provide your own backend to store you data. If you have your own VPS/home server, that means *YOU* have full control over your notes.
3. You can also just dump your Obsidian folder into your iCloud or Google Drive or even lug it around in a USB. *But why would you do that?*
## Obsidian Livesync
*Self-hosted LiveSync* let's you set up a CouchDB instance to sync your notes or use S3/MinIO/R2 Object Storage. I went with [Cloudflare R2](https://www.cloudflare.com/en-ca/developer-platform/products/r2/) because you get 10 GB of object storage, which is honestly more than enough if you're just going to be writing notes. If instead you plan to self host, I recommend reading [this guide](https://blog.kirillov.cc/posts/obsidian-livesync/) by Roman Kirillov.

![|100](cloudflare.png)
### Setting up your object storage
1. [**Create a Cloudflare account**](https://dash.cloudflare.com/sign-up)
2. On the side panel, head to Build → Storage & databases → **R2 object storage**
   and then **set up a free tier**.
3. **Create a bucket**
	- There should be a button on the top right. Let's name the bucket `my-vault`.
	- You should be taken to the bucket page. *[[#Obsidian setup|This page is important for later]]*
4. Now navigate back to *R2 object storage* and **create an R2 API token**
	- Just in the bottom, you can choose to manage your API tokens.
	- Click on **Create Account API token** and name it `my-vault-token`.
	- Specify the permission for the token as **Object Read & Write**.
	- Your **access key ID** and **secret key** will only appear once, so make sure to securely note these down.
	  ![|300](cloudflare.png)
## Obsidian setup
With your Cloudflare set up, you can now set up the plugin on your first and main device. Yes, essentially where the original vault is kept.
1. Install and enable [**Self-hosted LiveSync**](https://obsidian.md/plugins?id=obsidian-livesync) by vorotamoroz from Community plugins.
2. The **Setup Wizard** 🧙‍♂ will pop up. Select *"I am setting this up for the first time"*.
3. Select *"Enter the server information manually"*
	- You can choose to enable **End-to-End encryption** or not
	- Also to **Obfuscate properties** or not
4. Next, select *"S3/MinIO/R2 Object Storage"*
	- If you've already created a bucket [[#Setting up your object storage|earlier]], you should get the info you need in Cloudflare
	- **Endpoint URL** ← S3 API (something like `https://<account-id>.r2.cloudflarestorage.com`)
	- **Access Key ID** & **Secret Access Key** ← Generated when you created a token
	- **Bucket Name** ← `my-vault` or whatever you named your bucket
	- You can leave everything else as is
5. test

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
## Customization Sync

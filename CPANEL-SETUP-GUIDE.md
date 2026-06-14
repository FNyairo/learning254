# cPanel Setup Guide — learning254.com + Moodle on lms.learning254.com

**Your setup at a glance:**
- cPanel username: `learkysf`
- Main site: `learning254.com` → static portfolio (HTML/CSS/JS)
- LMS: `lms.learning254.com` → Moodle

---

## PHASE 1 — Upload the Website to learning254.com

You have two options. **Option A (Git) is recommended** because your repo already has `.cpanel.yml` configured.

### Option A: Deploy via Git Version Control (Fastest)

1. Log in to cPanel → scroll to **"Git™ Version Control"**
2. Click **"Create"**
3. Fill in:
   - **Clone URL**: your GitHub/GitLab repo URL (e.g. `https://github.com/youruser/learning254`)
   - **Repository Path**: `/home/learkysf/repositories/learning254`
   - **Repository Name**: `learning254`
4. Click **"Create"** — cPanel clones the repo
5. After cloning, click **"Manage"** next to the repo
6. Click **"Pull or Deploy"** tab → click **"Update from Remote"** then **"Deploy HEAD Commit"**
7. cPanel reads your `.cpanel.yml` and automatically copies all files to `/home/learkysf/public_html/`

> ✅ Your site is now live at `http://learning254.com`

### Option B: Manual Upload via File Manager

1. cPanel → **File Manager** → navigate to `public_html/`
2. Delete any default `index.html` or `cgi-bin` placeholder
3. Click **Upload** → upload these files/folders from your local project:
   - `index.html`
   - `.htaccess`
   - `css/` (folder)
   - `js/` (folder)
   - `images/` (folder)
4. Make sure `index.html` is in the ROOT of `public_html/`, not in a subfolder

---

## PHASE 2 — Configure SSL (HTTPS) for learning254.com

1. cPanel → **"SSL/TLS"** → **"SSL/TLS Status"**
2. Find `learning254.com` → click **"Run AutoSSL"** (free Let's Encrypt certificate)
3. Wait 2–5 minutes for the certificate to issue
4. Once issued, go back to your **File Manager** → open `public_html/.htaccess`
5. **Uncomment the HTTPS redirect lines** (remove the `#` symbols):
   ```
   RewriteEngine On
   RewriteCond %{HTTPS} off
   RewriteRule ^(.*)$ https://%{HTTP_HOST}/$1 [R=301,L]
   ```
6. Save the file — all HTTP traffic now redirects to HTTPS

---

## PHASE 3 — Create the Subdomain lms.learning254.com

1. cPanel → **"Domains"** → **"Subdomains"** (or in newer cPanel: **"Domains"** → **"Create A New Domain"**)
2. Fill in:
   - **Subdomain**: `lms`
   - **Domain**: `learning254.com`
   - **Document Root**: `/home/learkysf/public_html/lms` (cPanel fills this automatically)
3. Click **"Create"**
4. Then run **AutoSSL** again to cover the new subdomain (cPanel → SSL/TLS Status → Run AutoSSL)

---

## PHASE 4 — Create a MySQL Database for Moodle

1. cPanel → **"MySQL Databases"**
2. Under **"Create New Database"**:
   - Name: `learkysf_moodle` → Click **"Create Database"**
3. Under **"MySQL Users"** → **"Add New User"**:
   - Username: `learkysf_muser`
   - Password: (use the generator — save this password!)
   - Click **"Create User"**
4. Under **"Add User to Database"**:
   - User: `learkysf_muser`
   - Database: `learkysf_moodle`
   - Click **"Add"** → on the next screen select **"All Privileges"** → **"Make Changes"**

> 📝 Save these details — you'll need them in Phase 6:
> - DB Name: `learkysf_moodle`
> - DB User: `learkysf_muser`
> - DB Password: *(what you set)*
> - DB Host: `localhost`

---

## PHASE 5 — Download and Upload Moodle Files

### Step 1: Download Moodle
1. Go to [https://moodle.org/downloads/](https://moodle.org/downloads/)
2. Download the latest stable version (e.g. Moodle 4.x) — choose the `.zip` file

### Step 2: Upload to cPanel
1. cPanel → **File Manager** → navigate to `/home/learkysf/public_html/lms/`
2. Click **"Upload"** → upload the Moodle `.zip` file
3. After upload, **right-click the zip** → **"Extract"** → extract to `/home/learkysf/public_html/lms/`
4. After extraction, you'll see a folder called `moodle` inside `lms/`
5. **Move** the contents of that `moodle/` folder UP one level into `lms/` itself:
   - Select all files inside `moodle/` → Move to `/home/learkysf/public_html/lms/`
   - Delete the now-empty `moodle/` subfolder

> The goal: `lms/index.php` should exist (not `lms/moodle/index.php`)

### Step 3: Create the Moodle Data Directory
1. In File Manager, navigate to `/home/learkysf/`
2. Create a new folder: `moodledata`
   - Full path: `/home/learkysf/moodledata`
   - This folder must be **outside** `public_html` for security
3. Set permissions: right-click `moodledata/` → **"Change Permissions"** → set to `755`

---

## PHASE 6 — Run the Moodle Web Installer

1. Visit `https://lms.learning254.com` in your browser
2. Moodle's installer launches automatically

**Follow these screens:**

| Screen | What to do |
|--------|-----------|
| Language | Select your language → Continue |
| Confirm paths | Web address: `https://lms.learning254.com` / Moodle directory: `/home/learkysf/public_html/lms` / Data directory: `/home/learkysf/moodledata` → Continue |
| Database driver | Choose **"MySQLi"** → Continue |
| Database settings | Host: `localhost` / DB name: `learkysf_moodle` / User: `learkysf_muser` / Password: *(yours)* / Table prefix: `mdl_` → Continue |
| Server checks | Fix any ❌ items (most are PHP extensions — see tips below) |
| License | Confirm |
| Admin account | Create your Moodle admin username & password |
| Site settings | Set site name: `Learning254 LMS` → Save |

> ✅ Moodle is now live at `https://lms.learning254.com`

---

## PHASE 7 — Fix Common PHP Extension Issues

If the server checks screen shows red ❌ items, fix them in cPanel:

1. cPanel → **"MultiPHP INI Editor"** → select your domain
2. Common settings to enable/set:
   ```
   max_input_vars = 5000
   upload_max_filesize = 128M
   post_max_size = 128M
   memory_limit = 256M
   max_execution_time = 300
   ```
3. For missing PHP extensions (xmlrpc, soap, etc.):
   - cPanel → **"MultiPHP Manager"** → ensure PHP 8.1 or 8.2 is selected
   - cPanel → **"PHP Extensions"** (if available) → enable: `curl`, `zip`, `gd`, `intl`, `xml`, `mbstring`, `soap`

---

## PHASE 8 — Post-Install Configuration

### Enable Cron Job (Required for Moodle to work properly)
1. cPanel → **"Cron Jobs"**
2. Add a new cron job:
   - **Minute**: `*/1` (every minute — Moodle standard)
   - **Command**: `/usr/local/bin/php /home/learkysf/public_html/lms/admin/cli/cron.php > /dev/null`
3. Click **"Add New Cron Job"**

### Set Up Email (SMTP)
1. In Moodle: Site administration → Server → **Email** → **Outgoing mail configuration**
2. Use your cPanel email or a transactional service (Mailgun, SendGrid)

### Link Main Site to LMS
Add a link in your `learning254.com` site to your LMS. In `index.html`, update or add a nav/button:
```html
<a href="https://lms.learning254.com" target="_blank">LMS Portal</a>
```

---

## Quick Reference Checklist

- [ ] Website files uploaded to `public_html/`
- [ ] SSL active on `learning254.com`
- [ ] HTTPS redirect uncommented in `.htaccess`
- [ ] Subdomain `lms.learning254.com` created
- [ ] SSL active on `lms.learning254.com`
- [ ] MySQL database + user created
- [ ] Moodle files in `public_html/lms/` (not in a subfolder)
- [ ] `moodledata/` folder at `/home/learkysf/moodledata/`
- [ ] Moodle web installer completed
- [ ] Cron job added
- [ ] Admin password saved securely

---

*Guide prepared for Franklin Nyairo — learning254.com | June 2026*

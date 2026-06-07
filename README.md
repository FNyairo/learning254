# Learning254 Portfolio — Deployment Guide

**Franklin Nyairo · Web Developer & EdTech Builder**
Site: [learning254.com](https://learning254.com)

---

## File Structure

```
learning254/
├── index.html          ← Main single-page portfolio
├── css/
│   └── style.css       ← All styles (blue/teal/gray theme)
├── js/
│   └── main.js         ← Nav, filter, scroll reveal, form
├── images/
│   └── learning254logo.jpeg   ← Logo (header + footer)
├── .htaccess           ← Apache config for cPanel
└── README.md           ← This file
```

---

## Before You Deploy

1. **Replace placeholder URLs** — In `index.html`, search for `https://` and update all project links to your real domains.
2. **Update contact details** — Replace `info@learning254.com` and social links with your real addresses.
3. **Form submission** — The contact form currently shows a success state only. To make it functional:
   - **Option A (Formspree):** Sign up at formspree.io, get a form ID, update the form `action` attribute.
   - **Option B (EmailJS):** Add EmailJS SDK and configure in `main.js`.
   - **Option C (PHP):** Add a `mail.php` handler on the server and POST to it.
4. **Enable HTTPS redirect** — Once your SSL certificate is active in cPanel, uncomment the HTTPS redirect block in `.htaccess`.

---

## Deployment: GitHub → cPanel

### Step 1 — Push to GitHub

```bash
# Initialize a Git repo inside the learning254 folder
cd learning254
git init
git add .
git commit -m "Initial portfolio release"

# Create a repo on GitHub (github.com → New repository → "learning254")
# Then link and push:
git remote add origin https://github.com/YOUR_USERNAME/learning254.git
git branch -M main
git push -u origin main
```

### Step 2 — Deploy via cPanel Git™ Version Control

1. Log in to **cPanel** → scroll to **Git™ Version Control** → click **Create**.
2. Toggle **Clone a Repository** → paste your GitHub repo URL.
3. Set **Repository Path** to your domain's public folder, e.g.:
   - `/home/youraccount/public_html` (root domain)
   - `/home/youraccount/public_html/portfolio` (subdirectory)
4. Click **Create** — cPanel clones the repo.
5. To update later: push to GitHub, then in cPanel → Git™ Version Control → **Manage** → **Pull**.

### Step 2 (Alternative) — Manual FTP Upload

1. Open your FTP client (FileZilla, Cyberduck, etc.).
2. Connect to your hosting using cPanel FTP credentials.
3. Navigate to `public_html/` (or a subdirectory).
4. Upload the entire `learning254/` folder contents there.

> **Note:** Upload the *contents* of the folder (not the folder itself) if deploying to the root domain.

---

## Local Development

Just open `index.html` in any browser — no build tools or server required.

For live-reload during development, use VS Code's **Live Server** extension or:
```bash
npx serve .
```

---

## Tech Stack

| Layer    | Technology |
|----------|-----------|
| Markup   | HTML5 |
| Styles   | CSS3 (custom properties, grid, flexbox) |
| Scripts  | Vanilla JavaScript (ES6+) |
| Fonts    | Google Fonts — Sora + Inter |
| Hosting  | cPanel / Apache |
| Deploy   | GitHub + cPanel Git™ Version Control |

---

## Customization Quick Reference

| What to change | Where |
|----------------|-------|
| Colors / theme | `css/style.css` → `:root` variables |
| Hero text | `index.html` → `.hero-content` |
| Project cards | `index.html` → `#workGrid` articles |
| Project card colors | `css/style.css` → `.work-img--*` classes |
| Services | `index.html` → `#services` section |
| About stats | `index.html` → `.about-stats` |
| Contact email | `index.html` → `.contact-detail` links |
| Logo | Replace `images/learning254logo.jpeg` |

---

*Built with ❤️ · Learning254 · Franklin Nyairo · 2026*

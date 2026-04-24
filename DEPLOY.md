# Deploy in 3 Minutes — Push to GitHub + Deploy to Netlify

Follow this top-to-bottom. Total time: ~3 minutes.

---

## Step 1 — Create the GitHub repo (30 seconds)

1. Go to **https://github.com/new**
2. Repository name: `sodiq-yusuff-mma`
3. Keep it **Public** (so Netlify free plan works)
4. **Do NOT** check "Add a README", "Add .gitignore", or "Choose a license" — we already have those
5. Click **Create repository**
6. Copy the URL it shows you — it will look like `https://github.com/YOUR_USERNAME/sodiq-yusuff-mma.git`

---

## Step 2 — Push your code (1 minute)

Open **PowerShell** or **Terminal** on your computer, then run these 4 commands one at a time (replace `YOUR_USERNAME` on the 4th line):

```powershell
cd "C:\Users\LATITUDE-7400\Documents\Claude\Projects\Sodiq Yusuff Website"

git init -b main
git add .
git commit -m "Initial launch — Sodiq Yusuff MMA website"
git remote add origin https://github.com/YOUR_USERNAME/sodiq-yusuff-mma.git
git push -u origin main
```

GitHub will ask you to authenticate the first time:
- **Easiest:** install [GitHub Desktop](https://desktop.github.com/) first. It handles auth automatically. Or:
- **Command line:** it will pop up a browser asking you to log in, done.
- **If it asks for a password:** GitHub no longer accepts account passwords. Use a **Personal Access Token** instead (Settings → Developer settings → Personal access tokens → "Generate new token (classic)" with `repo` scope).

After `git push` succeeds, refresh your GitHub repo page — all the files should be there.

---

## Step 3 — Deploy to Netlify (1 minute)

1. Go to **https://app.netlify.com/start**
2. Click **"Deploy with GitHub"**
3. Authorize Netlify if this is your first time
4. Search for and select your `sodiq-yusuff-mma` repo
5. **Build settings — LEAVE EVERYTHING BLANK:**
   - Base directory: *(blank)*
   - Build command: *(blank)*
   - Publish directory: *(blank — or type a single dot: `.` )*
6. Click **Deploy site**

Netlify will give you a URL immediately (something like `fantastic-unicorn-abc123.netlify.app`).

---

## Step 4 — Rename the site (30 seconds)

1. In the Netlify dashboard for your new site, click **Site configuration** → **Change site name**
2. Rename to: `sodiqyusuffmma` (or whatever Sodiq wants)
3. The URL becomes `sodiqyusuffmma.netlify.app`

---

## Step 5 — Connect a custom domain (optional, 5 minutes)

If Sodiq owns `sodiqyusuffmma.com` or wants a real domain:

1. In Netlify: **Domain management** → **Add custom domain** → enter the domain
2. Netlify shows you the DNS records to add at your domain registrar
3. Set them, wait up to 24 hrs for DNS propagation
4. Netlify provisions a free SSL certificate automatically

---

## Future edits

Every time you want to update the site:

```powershell
cd "C:\Users\LATITUDE-7400\Documents\Claude\Projects\Sodiq Yusuff Website"

git add .
git commit -m "Describe your change here"
git push
```

Netlify auto-deploys within 30 seconds of every `git push`. That's it.

---

## Alternative — Netlify Drag-and-Drop (skip GitHub entirely)

If you just want it live **RIGHT NOW** and don't care about version control yet:

1. Go to **https://app.netlify.com/drop**
2. Drag the **entire Sodiq Yusuff Website folder** onto the drop zone
3. Live URL appears within seconds
4. You can connect it to GitHub later

This skips everything above. Useful for showing Sodiq a live version before the demo.

---

## Troubleshooting

**"git is not recognized"** — install [Git for Windows](https://git-scm.com/download/win) first.

**`fatal: not a git repository`** — you're not in the right folder. Run the `cd` line first.

**Forms don't submit on the live site** — that's expected. They're styled placeholders. Follow `FORMS-GHL-ROUTING.md` to wire up GoHighLevel.

**Images don't load on Netlify** — check the image filenames match exactly (case-sensitive on Linux servers). All images used on the site have clean `sodiq-*` / `kids-*` / `logo-*` names.

**Site name already taken** — Netlify names are globally unique. Try `sodiqyusuffmma-official`, `supersodiq`, etc.

---

**Once you're live, tell Sodiq. The moment he sees his name and face on a cinematic site with all 10 pages, he'll know you brought him something real.**

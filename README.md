# Sodiq "Super" Yusuff MMA — Official Website

Cinematic fight-night website for Sodiq "Super" Yusuff MMA, Southern Maryland's only UFC fighter-owned Mixed Martial Arts academy. 10 full pages, zero build step, drops straight onto Netlify or any static host.

**Live Deploy Target:** Netlify
**Stack:** Vanilla HTML / CSS / JS — no framework, no build, no dependencies. Fast as lightning.

---

## Site Structure

| Page | File | Purpose |
|------|------|---------|
| Home | `index.html` | Flagship landing page — hero, origin story, programs snapshot, reviews, form |
| Programs | `programs.html` | All 6 programs (Prospect, Parent & Me, Little Ninjas, Juniors, Teens, Adults) |
| About Sodiq | `about.html` | 7-section origin story, fight record, credentials sidebar |
| Media | `media.html` | Tabbed press coverage, fight highlights, social stats, gallery |
| Blog | `blog.html` | Featured post + 5 category tabs, newsletter signup |
| Contact | `contact.html` | Two-path intro, full form, map, schedule, reviews |
| Adult Sales Letter | `adult-sales.html` | Long-form conversion page for adults |
| Kids Sales Letter | `kids-sales.html` | Parent-focused conversion page with Super Sodiq Training System breakdown |
| Fighters Only | `fighters.html` | For the 1-3% serious competitors — full origin-to-UFC story |
| Thank You | `thank-you.html` | Post-form success page with video + calendar embed slot |

---

## Quick Deploy to Netlify (5 Minutes)

### Option A — Drag and Drop (Fastest)
1. Go to https://app.netlify.com/drop
2. Drag the **entire folder** (this one) onto the drop zone
3. Netlify will give you a live URL immediately (e.g. `fancy-unicorn-abc123.netlify.app`)
4. Rename the site in Settings → Site details → Change site name (e.g. `sodiqyusuffmma`)
5. To connect a custom domain: Domain Management → Add custom domain

### Option B — GitHub + Netlify (Recommended for Long-term)
1. **Create a GitHub repo:**
   ```bash
   cd "path/to/this/folder"
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/sodiq-yusuff-mma.git
   git push -u origin main
   ```
2. **Connect to Netlify:**
   - Log in at https://app.netlify.com
   - Click "Add new site" → "Import an existing project" → GitHub
   - Authorize Netlify, pick the repo
   - **Build settings:** leave everything blank (no build command, no publish directory — it's static)
   - Click Deploy
3. Every `git push` auto-deploys the site.

---

## Dropping in Photos

The site uses placeholders throughout — clearly labeled boxes that say `PHOTO PLACEHOLDER 01` etc. To swap in real photos:

1. Drop your photos in `assets/images/` using descriptive names (e.g. `sodiq-portrait.jpg`, `sodiq-ufc-win.jpg`, `sodiq-with-lloyd.jpg`).
2. Open the HTML file where you want the photo.
3. Find the placeholder block — it looks like:
   ```html
   <div class="fight-frame">
     <div class="img-placeholder">
       <span>Photo placeholder 01</span>
       Sodiq Yusuff — UFC photoshoot
     </div>
   </div>
   ```
4. Replace the inner `<div class="img-placeholder">...</div>` with:
   ```html
   <img src="assets/images/sodiq-portrait.jpg" alt="Sodiq Yusuff" />
   ```

### Photos You Should Add (Priority Order)
Based on the copy package and visual impact:

1. **Hero / About portrait** — UFC-style solo portrait of Sodiq (flexing, or walkout pose)
2. **Fight action shot** — in the Octagon, hands raised post-win
3. **With Coach Lloyd Irvin** — anchors the Hall of Fame coach connection
4. **Training at the academy** — Sodiq coaching students, mat action
5. **Kids' classes** — Little Ninjas / Juniors in action (builds trust for parents)
6. **UFC 300 / Barboza fight** — highest credibility image on Fighters Only page
7. **Disney Iwaju screenshot** — Media page entertainment tab
8. **Facility photos** — exterior + interior of the Waldorf academy
9. **Nigeria flag / Lagos imagery** — About page cultural storytelling

---

## Wiring Up the Forms (GoHighLevel)

Every form on the site is currently a **styled placeholder** with `data-form` attribute. When submitted it flashes "Form Ready — Connect GoHighLevel" and resets. To go live with GoHighLevel:

### For each form:
1. In GoHighLevel, build the matching form (field names should match what's on the page — First Name, Last Name, Phone, Email, etc.).
2. Copy the **Embed Code** from GoHighLevel (HTML or iFrame).
3. In the HTML file, find the `<form class="form-card" data-form>...</form>` block.
4. Replace the entire `<form>...</form>` with your GoHighLevel iframe embed.
5. Style the wrapper (`<div class="form-card">`) to match if you keep the iframe.

### Form Routing Needed (4 automation sequences minimum):
- **Adult Prospect** — triggered when "Myself" is selected
- **Kids Prospect Ages 2-7** — triggered when Parent & Me / Little Ninjas selected
- **Kids Prospect Ages 7-12** — triggered when Juniors selected
- **Teen Prospect** — triggered when Teens selected
- **Fighter/Competitor** — triggered from `fighters.html` forms

### Thank You Page
All forms should redirect to `thank-you.html` after submission. Replace the calendar placeholder there with your GoHighLevel calendar widget embed.

---

## Design System

### Colors (Nigerian flag × fight-night)
```css
--nigeria-green: #008751     /* Official flag green */
--nigeria-green-bright: #00b368
--nigeria-green-glow: #00ff7a
--blood: #dc2626              /* Urgency CTAs */
--bg: #0a0a0a                 /* Main background */
--surface: #1a1a1a            /* Cards */
--white: #ffffff
```

### Fonts
- **Display:** Oswald 400/500/600/700 — all headlines, uppercase fight-week typography
- **Body:** Inter 300/400/500/600/700 — all paragraphs, UI

### Key CSS Classes
- `.hero` — full-height landing hero with gradient bg + grid overlay
- `.johnson-box` — bordered Nigerian-green callout box (used across sales letters)
- `.btn-blood` / `.btn-primary` / `.btn-ghost` — three button styles
- `.offer` — the bonus-list block
- `.program` — program card (used on Home + Programs pages)
- `.review` — 5-star testimonial card
- `.stats` — animated number-counter ribbon
- `.reveal` — scroll-triggered fade-in (JS adds `.in` class via IntersectionObserver)

### Reusable Partials
`assets/js/partials.js` injects the nav and footer into every page via `<div id="nav-slot"></div>` and `<div id="footer-slot"></div>`. Edit the HTML strings in `partials.js` once and the nav/footer update everywhere.

---

## Analytics (Optional)

To add Google Analytics / Plausible / Fathom:
1. Grab your tracking snippet
2. Add it to the `<head>` of each HTML file (or inside `partials.js` if you want it site-wide from one edit)

---

## Meta / SEO Checklist

- [x] `<title>` set per page
- [x] `<meta name="description">` set per page
- [x] Open Graph tags on index.html
- [ ] Add `og:image` — drop a 1200x630 image of Sodiq at `assets/images/og.jpg` and reference it
- [ ] Add `favicon.ico` and `apple-touch-icon.png` to root
- [ ] Create `sitemap.xml` and `robots.txt` (Netlify can auto-generate)

---

## Notes for Sodiq

- **Mobile first:** every page tested down to 375px width (iPhone SE).
- **No build step:** edit any HTML/CSS/JS file and the changes show up instantly.
- **No vendor lock-in:** works on Netlify, Vercel, Cloudflare Pages, GitHub Pages, or any static host.
- **Fast:** entire site is under 150KB (no frameworks, no heavy libraries).
- **Accessible:** semantic HTML, keyboard navigation, focus states, respects `prefers-reduced-motion`.

---

**From the UFC Octagon to Southern Maryland — Built for Champions at Every Level.**

Sodiq Yusuff MMA · 3480 Rockefeller Ct Ste I-J · Waldorf, MD 20602 · 301-888-7285

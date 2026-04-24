# Image Drop-In Guide

Drop photos here and reference them in the HTML files. Suggested filenames below (rename your files to match these and the swap will be plug-and-play).

## Recommended Photos

| Filename | Where Used | Description |
|----------|-----------|-------------|
| `sodiq-hero-portrait.jpg` | Home hero right column, About hero | UFC-style solo portrait. Flag or dramatic background ideal. Vertical orientation. |
| `sodiq-octagon-win.jpg` | About · Fighters Only | Hands raised in the Octagon, wide arena shot. |
| `sodiq-with-lloyd.jpg` | Fighters Only | Sodiq with Coach Lloyd Irvin. UFC event, weigh-in, training. |
| `sodiq-training-academy.jpg` | Home · Fighters Only close | Intense candid training at the Waldorf academy. |
| `sodiq-ufc-300.jpg` | Fighters Only · Media | UFC 300 vs Edson Barboza — Fight of the Night. |
| `sodiq-ufc-246.jpg` | Fighters Only | UFC 246 McGregor vs Cerrone card action photo. |
| `sodiq-iwaju.jpg` | Media entertainment tab | Disney+ Iwaju feature / voice recording session. |
| `kids-class-1.jpg` through `kids-class-6.jpg` | Kids sales letter | Little Ninjas / Juniors in action. |
| `facility-interior.jpg` | Contact · About | Mat shots inside the Waldorf gym. |
| `facility-exterior.jpg` | Contact | Storefront at 3480 Rockefeller Ct. |
| `og.jpg` | Meta / social share | 1200×630px — used for Open Graph when the site is shared. |
| `favicon.ico` | (goes in site root, not here) | 32×32 favicon. |

## How to Replace a Placeholder

Find this in any HTML file:
```html
<div class="fight-frame">
  <div class="img-placeholder">
    <span>Photo placeholder 01</span>
    Description here
  </div>
</div>
```

Replace with:
```html
<div class="fight-frame">
  <img src="assets/images/sodiq-hero-portrait.jpg" alt="Sodiq Yusuff — UFC photoshoot portrait" />
</div>
```

## Image Optimization

Before uploading, compress images with [TinyPNG](https://tinypng.com) or [Squoosh](https://squoosh.app) — typical savings of 60-80% with no visible quality loss. Target under 200KB per image.

For maximum performance, convert to WebP:
```bash
# If you have cwebp installed
cwebp input.jpg -q 80 -o output.webp
```

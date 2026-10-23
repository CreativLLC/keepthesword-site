# keepthesword.com (v1)

The home page and 404 page for the Keep the Sword channel. Plain static HTML, CSS and one small JS file.
No framework, no build step, no CDNs, no trackers. Fonts and images are self-hosted. Ready for GitHub Pages at keepthesword.com (see Deploy).

Brand rules come from `projects/youtube-channel/brand/system/BRAND-GUIDE.md` (v1.0). Pixel art is shown at whole-number scales only: UI frames, buttons and icons at 3x, the keep scene at 4x (5x above 1920 px wide), Andrew's sprite (v9) at 3x or 5x, the brass logo (89 x 82 art px) at 2x, 3x or 4x depending on screen height. Brass is for the logo only.

## Preview locally

```
cd ~/projects/keepthesword-site
python3 -m http.server 8765 --bind 127.0.0.1
```

Open http://127.0.0.1:8765/ (the 404 page: http://127.0.0.1:8765/404.html). Use the server, not file://,
because 404.html uses absolute paths.

Screenshots (headless Chromium, full page, real viewport height; `nice -n 19` so a running video render keeps priority):

```
nice -n 19 node tools/shot.mjs http://127.0.0.1:8765/ screenshots/home-1440.png 1440 900
nice -n 19 node tools/shot.mjs http://127.0.0.1:8765/ screenshots/home-390.png 390 844
nice -n 19 node tools/shot.mjs http://127.0.0.1:8765/404.html screenshots/404-390.png 390 844
```

## Placeholders (TODO before launch)

| Where | What |
|---|---|
| Hero "Watch the first quest" and the Quest 01 card button | Both point at the channel (`https://www.youtube.com/@keepthesword`). Swap in the video 1 URL when it's live: grep `VIDEO-1-URL` or `data-swap="video-1"` in `index.html` (2 spots). On the card, change the label "Go to the channel" to "Watch it" and the chip "Coming soon" to "Now". |
| Quest 01 copy | One line for "Can Local AI Keep Up With Opus 5.5?". Check it against the final cut before launch. |
| The forge, "More to come" | Locked slot on purpose. |
| Email sign-up | Removed (no backend). To bring it back: a form section plus a mail provider's endpoint. |
| Footer socials | Only YouTube and the email are linked. Add other @keepthesword profiles when they exist. |
| Quest statuses | Quest 01 "coming soon", the other three "planned". |
| About | Sprite only, no photos (photo session not done). |
| Hero scene | The keep art (`room-v8.png`) still has the small v8 Andrew seen from behind at the desk. Fine at that size; redraw only if Drew wants it. |

## Files

```
index.html, 404.html, favicon.ico, site.webmanifest, CNAME (keepthesword.com), .nojekyll
assets/css/tokens.css   copy of brand/system/tokens.css (font paths point at the subset woff2 files)
assets/css/site.css     layout, frames, buttons, chips, the hero scene and its motion
assets/js/site.js       pauses the hero motion off screen
assets/fonts/           Jersey 10, DotGothic16, Jacquard 24 (SIL OFL, Latin subset woff2) + licences
assets/img/scene/       keep layers (sky, room, glow, foreground) from brand/system/build
assets/img/ui/          brass logo (kts-logo.png, 1 px per art px, from brand/logo/kts-logo-nobg-1000.png), v9 sprites (idle, status portrait, desk, nervous; from brand/sprites-v9/), cursor, frames and button slices
assets/img/icons/       16 px brand icons
assets/icons/           touch and app icons: the logo sword (brand/logo/kts-icon-960.png) at 2x / 5x; favicon.ico is the same sword downscaled
assets/og-image.png     1200 x 630 share image (source: tools/og.html)
tools/                  helpers, not needed on the server (see below)
screenshots/            review renders, not needed on the server
```

Tools:
- `tools/make-slices.py` rebuilds `frame-*.png` and `btn-*.png` with the brand's own `ui.frame()` and `kit.button()` (needs the brand repo paths as arguments, see the docstring).
- `tools/motes.mjs` prints the dust motes in the hero (same seed and beam test as `scene.js`).
- `tools/og.html` is the share image; render it with `nice -n 19 node tools/shot.mjs http://127.0.0.1:8765/tools/og.html assets/og-image.png 1200 630 reduced`.
- `tools/shot.mjs` takes full-page screenshots over the DevTools protocol (Node 22+, Chromium).

## Deploy (GitHub Pages, not done yet)

The repo root is the site: `index.html`, `404.html` and `CNAME` sit at the root, there is no build step, and `.nojekyll` makes Pages serve the files as they are. Every link and asset path was checked against the files (index and og use relative paths; 404 and the manifest use root paths, which work at keepthesword.com/).

1. Create the GitHub repo and push `master` (Drew's OK first).
2. Settings > Pages: deploy from branch `master`, folder `/ (root)`. The custom domain comes from `CNAME`.
3. DNS at the registrar (Squarespace): apex `A` records to GitHub Pages (185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153) and `www` CNAME to `<user>.github.io`. Keep the existing MX records (email forwarding for andrew@keepthesword.com).
4. Once the certificate is issued, tick "Enforce HTTPS".

`tools/`, `screenshots/` and this README get published too (Pages serves the whole branch). Harmless; move them out or to another branch if that matters. The OG tags use `https://keepthesword.com/` absolute URLs.

Nothing has been deployed, and DNS has not been touched.

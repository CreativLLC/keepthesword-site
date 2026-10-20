# keepthesword.com (v1)

The home page and 404 page for the Keep the Sword channel. Plain static HTML, CSS and one small JS file.
No framework, no build step, no CDNs, no trackers. Fonts and images are self-hosted.

Brand rules come from `projects/youtube-channel/brand/system/BRAND-GUIDE.md` (v1.0). Pixel art is shown at
whole-number scales only: UI frames, buttons and icons at 3x, the keep scene at 4x (5x above 1920 px wide),
Andrew's sprite at 5x, the wordmark at 3x or 4x.

## Preview locally

```
cd ~/projects/keepthesword-site
python3 -m http.server 8765 --bind 127.0.0.1
```

Open http://127.0.0.1:8765/ (the 404 page: http://127.0.0.1:8765/404.html). Use the server, not file://,
because 404.html uses absolute paths.

Screenshots (headless Chromium, full page, real viewport height):

```
node tools/shot.mjs http://127.0.0.1:8765/ screenshots/home-1440.png 1440 900
node tools/shot.mjs http://127.0.0.1:8765/ screenshots/home-390.png 390 844
node tools/shot.mjs http://127.0.0.1:8765/404.html screenshots/404-390.png 390 844
```

## Placeholders (TODO before launch)

| Where | What |
|---|---|
| Hero, "Watch the first quest" | Points at the Book Forge card (`#quest-book-forge`). Swap in the video URL. |
| The forge, Phosphor-OS "Take a look" | `#todo-phosphor-os`. Link to its page or repo once public. |
| The forge, "More to come" | Locked slot on purpose. |
| The letter form | No backend. `action="#"`, and `assets/js/site.js` shows a "not open yet" note. Set the provider's endpoint, then delete that handler. |
| Footer socials | Only YouTube is linked. Add other @keepthesword profiles when they exist. |
| Quest statuses | Book Forge "coming soon", the other three "planned". |
| About | Sprite only, no photos (photo session not done). |

## Files

```
index.html, 404.html, favicon.ico, site.webmanifest
assets/css/tokens.css   copy of brand/system/tokens.css (font paths point at the subset woff2 files)
assets/css/site.css     layout, frames, buttons, chips, the hero scene and its motion
assets/js/site.js       sign-up placeholder and pausing hero motion off screen
assets/fonts/           Jersey 10, DotGothic16, Jacquard 24 (SIL OFL, Latin subset woff2) + licences
assets/img/scene/       keep layers (sky, room, glow, foreground) from brand/system/build
assets/img/ui/          wordmark, sprites, cursor, frames and button slices
assets/img/icons/       16 px brand icons
assets/icons/           touch and app icons from the approved avatar
assets/og-image.png     1200 x 630 share image (source: tools/og.html)
tools/                  helpers, not needed on the server (see below)
screenshots/            review renders, not needed on the server
```

Tools:
- `tools/make-slices.py` rebuilds `frame-*.png` and `btn-*.png` with the brand's own `ui.frame()` and
  `kit.button()` (needs the brand repo paths as arguments, see the docstring).
- `tools/motes.mjs` prints the dust motes in the hero (same seed and beam test as `scene.js`).
- `tools/og.html` is the share image; render it with
  `node tools/shot.mjs http://127.0.0.1:8765/tools/og.html assets/og-image.png 1200 630 reduced`.
- `tools/shot.mjs` takes full-page screenshots over the DevTools protocol (Node 22+, Chromium).

## Deploy later

Upload everything except `tools/`, `screenshots/`, `README.md` and `.git/` to any static host
(Cloudflare Pages, Netlify, GitHub Pages, an nginx box). Then:
- Point the host's "not found" page at `/404.html` (most do this by default).
- The OG tags use `https://keepthesword.com/` absolute URLs; keep the domain or update them.
- Serve `.woff2` as `font/woff2` and `.webmanifest` as `application/manifest+json`.

Nothing has been deployed, and DNS has not been touched.

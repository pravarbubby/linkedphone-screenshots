# LinkedPhone — Store Screenshots

One dashboard, five stores, 10 slides each — every screen is live HTML built from the product UI kit.

**Live:** https://pravarbubby.github.io/linkedphone-screenshots/ — always the latest version; download PNGs per slide or as a .zip per device. Final PNGs are also in [`exports/`](exports/).
**All versions:** https://pravarbubby.github.io/linkedphone-screenshots/versions/ — same dashboard with the **Version** picker (`…/versions/#v12` links to one version).

Google Play takes at most 8 phone screenshots. On both Android tabs, 08 Transfer Calls and 10 Built to Grow start greyed out; tick **Include** to swap slides in or out (8 max). **Download selected 8 for Android (.zip)** zips only the included ones, keeping their 01–10 numbers.

| Tab | Device | Size (px) | Layout |
|---|---|---|---|
| iOS | iPhone 6.9″ | 1290 × 2796 | Recreation of `refs/ios_1…10.jpg` |
| iPadOS | iPad 13″ portrait | 2064 × 2752 | Single-column app UI widened to 608 pt (per `refs/appstore/ipad refs`) |
| macOS | macOS window | 2880 × 1800 | MacBook Pro 14″ app (1512×945 pt) at 1.4×; panes: rail 72 · list 360 · centre ≥400 · context 360 |
| Windows | Microsoft Store desktop | 3840 × 2160 | The macOS slides with a Windows 11 title bar (icon + title, minimise / maximise / close), centred on a 16:9 3200×1800 canvas and exported at 1.2× |
| Android | Google Play phone | 1440 × 2880 | iPhone compositions in an Android frame |

## Open the dashboard locally

```bash
python3 -m http.server 8765
```
Run from this folder, then open http://localhost:8765/ for the latest, or http://localhost:8765/versions/ to switch versions from the **Version** picker (each shows its last-updated time).
Tabs switch platform, **Show originals** puts the reference shots next to the iOS slides, click a slide for a full-size view (← → to step), **PNG** downloads the export.

## Export PNGs

```bash
V=v17 node "App Store Screenshots/tools/export.mjs" ios
```
Use `ios`, `ipad`, `mac`, `win` or `android`; optional slide list, e.g. `ios 3,5`. Output: `exports/v17/<platform>/NN.png` at native size.

## Structure (`v17/`)

- `index.html` — the dashboard (`?only=ios-3` renders one slide at 1:1 for export).
- `kit/`, `screens/`, `assets/` — the UI kit and mobile/desktop screen replicas carried over from the video project.
- `store/engine.js` — canvas, backgrounds, iPhone / iPad / MacBook frames, pop-out cards.
- `store/m-screens.js` — mobile screens and cards as they appear in the App Store set.
- `store/d-screens.js` — responsive desktop compositions (Inbox, Calls, Tickets, AI Receptionist, Auto Attendant, Team, Business).
- `store/widen.js` + `t-screens.js` — re-lays mobile screens out at iPad width.
- `store/slides-ios.js`, `slides-ipad.js`, `slides-mac.js` (also builds the Windows set), `slides-android.js` — the 10 slides per platform.
- `desk.html` — preview of desktop compositions (`?size=mac|ipad`), `screens.html` — kit screen gallery.

QA helpers in `tools/`: `cmp.mjs ios 3 out.png [x0 y0 x1 y1]` (original | replica | 50% overlay), `bands.py` (text-band positions).

## Versions

V1 is kept untouched in `v1/`. Exports for V2 need `V=vN` in front of the export command.

## Product page headers (V19)

V19 uses one brand system across all stores: a brand-blue world, Lisa as the main character, four white channel tiles with soft blurred tiles fading toward the edges, and the LinkedPhone mark as a faint watermark (it ties the art to the app icon). No store's art carries UI or text.

Each tab shows its store's hero art above the slides (toggle **Safe area** to see the crop-safe zone); **Preview on …** shows it in place on a recreation of that storefront.

| Store | Asset | Size | Rules followed |
|---|---|---|---|
| App Store (iPhone + iPad) | Product page header | 3840 × 1646 (21:9) | Safe area x1097–2743 · y493–1154 holds Lisa + the near tiles, clear of the back / share buttons; soft tiles outside it; no text, UI or phones |
| Mac App Store | Product page header | 3840 × 1646 (21:9) | Same spec and same art as iPhone / iPad |
| Google Play | Feature graphic | 1024 × 500 | Brand blue (not white), no device frames, no text; Microsoft composition scaled to 1024 × 500 |
| Microsoft Store | 16:9 Super hero art | 3840 × 2160 | No text / UI / devices; key art centred and out of the bottom third |

```bash
V=v19 node "App Store Screenshots/tools/export-headers.mjs"      # → exports/v19/headers/{ios,mac,android,win}.png
```
Source: `v19/store/headers.js` (compositions), `v19/store/storefront.js` (store-page previews; the iPhone view uses Apple's crop: safe-area width at about 3:2).

## Handoff

- **Preview on …** opens a store-page mock (App Store, Mac App Store, Microsoft Store, Google Play) for the current device with the exported screenshots in a scrollable carousel.
- **Download all … (.zip)** downloads that device's 10 PNGs; hover a slide for **↓ Download**.
- Files are named `LinkedPhone_<Device>_<NN>_<Slide-Title>_<WxH>.png` (e.g. `LinkedPhone_iOS_01_Your-Business-Phone-Reinvented_1290x2796.png`).
- After exporting a new version, run `python3 "App Store Screenshots/tools/versions.py"` to refresh the version list and timestamps.

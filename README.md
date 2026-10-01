# LinkedPhone — Store Screenshots

One dashboard, four stores, 10 slides each — every screen is live HTML built from the product UI kit.

**Live:** https://pravarbubby.github.io/linkedphone-store-screenshots/ — opens the latest version; download PNGs per slide or as a .zip per device. Final PNGs are also in [`exports/`](exports/).

| Tab | Device | Size (px) | Layout |
|---|---|---|---|
| iOS | iPhone 6.9″ | 1290 × 2796 | Recreation of `refs/ios_1…10.jpg` |
| iPadOS | iPad 13″ portrait | 2064 × 2752 | Single-column app UI widened to 608 pt (per `refs/appstore/ipad refs`) |
| macOS | macOS window | 2880 × 1800 | MacBook Pro 14″ app (1512×945 pt) at 1.4×; panes: rail 72 · list 360 · centre ≥400 · context 360 |
| Android | Google Play phone | 1440 × 2880 | iPhone compositions in an Android frame |

## Open the dashboard locally

```bash
python3 -m http.server 8765
```
Run from this folder, then open http://localhost:8765/ — it opens the latest version; switch versions from the **Version** picker (each shows its last-updated time).
Tabs switch platform, **Show originals** puts the reference shots next to the iOS slides, click a slide for a full-size view (← → to step), **PNG** downloads the export.

## Export PNGs

```bash
V=v13 node "App Store Screenshots/tools/export.mjs" ios
```
Use `ios`, `ipad`, `mac` or `android`; optional slide list, e.g. `ios 3,5`. Output: `exports/v13/<platform>/NN.png` at native size.

## Structure (`v13/`)

- `index.html` — the dashboard (`?only=ios-3` renders one slide at 1:1 for export).
- `kit/`, `screens/`, `assets/` — the UI kit and mobile/desktop screen replicas carried over from the video project.
- `store/engine.js` — canvas, backgrounds, iPhone / iPad / MacBook frames, pop-out cards.
- `store/m-screens.js` — mobile screens and cards as they appear in the App Store set.
- `store/d-screens.js` — responsive desktop compositions (Inbox, Calls, Tickets, AI Receptionist, Auto Attendant, Team, Business).
- `store/widen.js` + `t-screens.js` — re-lays mobile screens out at iPad width.
- `store/slides-ios.js`, `slides-ipad.js`, `slides-mac.js`, `slides-android.js` — the 10 slides per platform.
- `desk.html` — preview of desktop compositions (`?size=mac|ipad`), `screens.html` — kit screen gallery.

QA helpers in `tools/`: `cmp.mjs ios 3 out.png [x0 y0 x1 y1]` (original | replica | 50% overlay), `bands.py` (text-band positions).

## Versions

V1 is kept untouched in `v1/`. Exports for V2 need `V=v13` in front of the export command.

## Handoff

- **Preview on …** opens a store-page mock (App Store, Mac App Store, Google Play) for the current device with the exported screenshots in a scrollable carousel.
- **Download all … (.zip)** downloads that device's 10 PNGs; hover a slide for **↓ Download**.
- Files are named `LinkedPhone_<Device>_<NN>_<Slide-Title>_<WxH>.png` (e.g. `LinkedPhone_iOS_01_Your-Business-Phone-Reinvented_1290x2796.png`).
- After exporting a new version, run `python3 "App Store Screenshots/tools/versions.py"` to refresh the version list and timestamps.

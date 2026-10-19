/* V19 product page headers — one brand system for every store: brand-blue world, Lisa as the main character,
   four white channel tiles (call · text · ticket · AI) with soft blurred tiles fading toward the edges, and the
   LinkedPhone mark as a faint watermark that ties the art to the app icon. No UI and no text on any store.
   STORE.hdr[key] = { title, store, spec, size: [W, H] layout px, dpr (export scale), safe: [x0,y0,x1,y1] | null, build() }.

   · App Store (iPhone + iPad) — 3840×1646 (21:9). Key art inside Apple's template safe area x1097–2743 · y493–1154.
     No text (screenshots sit right below; one image works in every language).
   · Mac App Store — same 21:9 spec, desktop-sized UI cards.
   · Google Play feature graphic — 1024×500 (laid out at 2048×1000, exported at 0.5×). No device frames, not white.
     Centre kept free for the video play button; short localisable tagline.
   · Microsoft Store 16:9 Super hero art — 3840×2160 (laid out at 3200×1800, exported at 1.2×).
     No text, no app UI, no devices; key art centred and out of the bottom third (Store gradient). */
(() => {
const { h, icon, img } = UI;
const { pop } = STORE;
const P = (css, kids) => h('div', '', 'position:absolute;' + css, kids);

/* light slide backdrop at any size (same blobs as engine.js bg-hero) */
function lightBg(W, H) {
  const b = P('inset:0;overflow:hidden;background:linear-gradient(180deg,#FDFDFF 0%,#F8F8FF 45%,#F0F2FF 100%)');
  const M = Math.max(W, H);
  [['#FCE3F0', .30, .10, .34, .30, .9], ['#D5EDF8', .08, .70, .36, .34, .85], ['#E2E7FF', .72, .30, .36, .36, .95], ['#FCE3F0', .94, .92, .30, .26, .7], ['#D5EDF8', .56, 1.02, .30, .22, .8]]
    .forEach(([c, x, y, w, hh, o]) => b.append(P(`left:${x * W - w * M / 2}px;top:${y * H - hh * M / 2}px;width:${w * M}px;height:${hh * M}px;border-radius:50%;background:${c};opacity:${o};filter:blur(${M * .05}px)`)));
  return b;
}
/* vibrant brand-blue backdrop (Google Play / Microsoft Store: avoid white, read on light and dark store themes) */
function blueBg(W, H) {
  const b = P('inset:0;overflow:hidden;background:linear-gradient(135deg,#2F4BFF 0%,#3356FF 40%,#2A3FE0 100%)');
  const M = Math.max(W, H);
  [['#7C93FF', .78, .18, .42, .40, .55], ['#C38BFF', .98, .95, .34, .30, .35], ['#4FC3F7', .04, .95, .40, .32, .35], ['#1E2FC4', .12, .05, .40, .30, .6]]
    .forEach(([c, x, y, w, hh, o]) => b.append(P(`left:${x * W - w * M / 2}px;top:${y * H - hh * M / 2}px;width:${w * M}px;height:${hh * M}px;border-radius:50%;background:${c};opacity:${o};filter:blur(${M * .06}px)`)));
  return b;
}

/* V19 brand backdrop: smooth brand blue, a soft light behind the subject, deeper corners, faint mark watermark */
const MARK = '<svg viewBox="13 13 74 74" width="100%" height="100%"><path fill="#fff" d="M38.2016 61.7984H30.4208C26.1236 61.7985 22.64 65.282 22.64 69.5792C22.64 73.8764 26.1236 77.36 30.4208 77.36C34.718 77.36 38.2015 73.8764 38.2016 69.5792V61.7984ZM77.36 37.8992C77.36 29.4718 70.5282 22.64 62.1008 22.64C53.6734 22.64 46.8416 29.4718 46.8416 37.8992V53.1584H62.1008C70.5282 53.1584 77.36 46.3266 77.36 37.8992ZM86 37.8992C86 51.0983 75.2999 61.7984 62.1008 61.7984H46.8416V69.5792C46.8415 78.6482 39.4897 86 30.4208 86C21.3518 86 14 78.6481 14 69.5792C14 60.5103 21.3518 53.1585 30.4208 53.1584H38.2016V37.8992C38.2016 24.7001 48.9017 14 62.1008 14C75.2999 14 86 24.7001 86 37.8992Z"/></svg>';
const brandBg = (lx = .5, ly = .42, mark = null) => (W, H) => {
  const M = Math.max(W, H);
  const b = P(`inset:0;overflow:hidden;background:radial-gradient(${M * .42}px ${M * .30}px at ${lx * 100}% ${ly * 100}%,rgba(140,165,255,.75),rgba(140,165,255,0)),` +
    `radial-gradient(${M * .5}px ${M * .4}px at 100% 100%,rgba(120,70,230,.35),rgba(120,70,230,0)),` +
    `radial-gradient(${M * .5}px ${M * .4}px at 0% 0%,rgba(18,30,170,.55),rgba(18,30,170,0)),linear-gradient(160deg,#3A5BFF 0%,#3356FF 45%,#2741E6 100%)`);
  if (mark) { const [cx, cy, sz, o] = mark; const m = P(`left:${cx - sz / 2}px;top:${cy - sz / 2}px;width:${sz}px;height:${sz}px;opacity:${o}`); m.innerHTML = MARK; b.append(m); }
  return b;
};
const canvas = (W, H, bg) => { const e = h('div', 'slide slide-hdr', { width: W + 'px', height: H + 'px' }); e.append(bg(W, H)); return e; };

/* Lisa cut-out (assets/lisa-arms.png, 1024×1536). Placed by her face: (cx, eyeY) and image height hh. */
const LISA = { w: 1024, h: 1536, eyeY: .225 };
const lisa = (cx, eyeY, hh, extra = '') => {
  const w = hh * LISA.w / LISA.h;
  const i = h('img', '', `position:absolute;left:${cx - w / 2}px;top:${eyeY - hh * LISA.eyeY}px;width:${w}px;height:${hh}px;` + extra);
  i.src = 'assets/lisa-arms.png'; i.alt = '';
  return i;
};
/* soft light pool behind Lisa so she separates from the backdrop */
const glow = (cx, cy, r, c = 'rgba(255,255,255,.9)') => P(`left:${cx - r}px;top:${cy - r}px;width:${2 * r}px;height:${2 * r}px;border-radius:50%;background:radial-gradient(closest-side,${c},rgba(255,255,255,0))`);

/* pop-out cards (real UI) centred on (cx, cy); K = px per pt */
const card = (content, cx, cy, w, hh, K, r = 24, cls = '', style = '') => pop(content, { x: cx - w * K / 2, y: cy - hh * K / 2, w, h: hh, k: K, r, cls, style });
const CARDS = {
  call: (cx, cy, K) => card(MS.incomingTeam(), cx, cy, 483, 128, K, 32),
  ivy: (cx, cy, K) => card(MS.ivyCard(), cx, cy, 376.8, 118, K, 24),
  ticket: (cx, cy, K) => card(MS.ticketCard(1), cx, cy, 367.5, 124.7, K, 24),
  callerId: (cx, cy, K) => card(MS.callerIdBanner(), cx, cy, 1157, 330, K / 2.4667, 118, 'dark'),
  jobs: (cx, cy, K) => card(MS.lisaJobs(), cx, cy, 1187, 897, K / 2.4667, 112),
  summary: (cx, cy, K) => card(MS.summaryCard(), cx, cy, 1187, 977, K / 2.4667, 112),
  intro: (cx, cy, K) => card(MS.introCard(), cx, cy, 330, 130, K, 24),
};

const H = {};
/* white channel tiles, upright-ish, coloured glyphs (same family as the Microsoft art) */
const tiles = (list) => list.map(([ic, cx, cy, s, rot, tint]) => TILE(ic, cx, cy, s, rot, tint));
const IC = { call: ['Incoming Call|Bold', '#3F8A12'], chat: ['Chat 2|Bold', '#3356FF'], ticket: ['Ticket 1|Bold', '#7A3FF2'], ai: ['Star / AI|Bold', '#E0457B'] };
const T = (k, cx, cy, s, rot) => [IC[k][0], cx, cy, s, rot, IC[k][1]];
const SH = 'box-shadow:0 0 0 2px rgba(255,255,255,.35),0 40px 90px rgba(10,18,110,.35),0 10px 26px rgba(10,18,110,.18)';

/* ───── App Store (iPhone + iPad) 21:9 ─────
   iPhone keeps about the safe-area width (x1097–2743, ~3:2): Lisa + four tiles live there, below the back / share buttons.
   iPad / wide windows also see one real card per side, placed wholly outside that column. */
/* Same language as the Microsoft art: soft far tiles fading out toward the edges (only on iPad / wide windows,
   outside the iPhone crop) → Lisa → four crisp near tiles hugging her inside the safe column. */
const FAR = (ic, cx, cy, s, rot, o, blur) => TILE(ic, cx, cy, s, rot, '#3356FF', o, blur);
const appleScene = (e) => {
  e.append(FAR('Chat|Bold', 760, 470, 170, -10, .5, 3), FAR('Team|Bold', 430, 1060, 150, 8, .45, 4), FAR('Mail|Bold', 170, 560, 120, -6, .3, 6),
           FAR('Schedule / Calender|Bold', 3080, 450, 160, 9, .5, 3), FAR('Voice Mail|Bold', 3410, 1060, 160, -8, .45, 4), FAR('Clock|Bold', 3670, 560, 120, 6, .3, 6));
  e.append(lisa(1920, 760, 1500));
  e.append(...tiles([T('call', 1330, 780, 230, -8), T('ai', 1300, 1110, 190, 6), T('chat', 2520, 760, 220, 7), T('ticket', 2560, 1100, 200, -6)]));
  e.append(P('left:0;right:0;bottom:0;height:420px;background:linear-gradient(180deg,rgba(32,48,200,0) 0%,rgba(26,36,170,.35) 100%)'));
};
H.ios = { title: 'App Store product page header', store: 'App Store · iPhone & iPad', spec: '3840 × 1646 · 21:9 · PNG, no alpha',
  size: [3840, 1646], dpr: 1, safe: [1097, 493, 2743, 1154], build() {
  const e = canvas(3840, 1646, brandBg(.5, .45, [1920, 880, 1900, .06]));
  appleScene(e);
  return e;
} };
H.mac = { title: 'Mac App Store product page header', store: 'Mac App Store', spec: '3840 × 1646 · 21:9 · PNG, no alpha',
  size: [3840, 1646], dpr: 1, safe: [1097, 493, 2743, 1154], build: () => H.ios.build() };

/* ───── Google Play feature graphic — the Microsoft composition scaled to 1024×500: Lisa centred, near tiles, soft far tiles ───── */
H.android = { title: 'Google Play feature graphic', store: 'Google Play', spec: '1024 × 500 · JPEG or 24-bit PNG, no alpha',
  size: [2048, 1000], dpr: .5, safe: [200, 120, 1848, 880], build() {
  const e = canvas(2048, 1000, brandBg(.5, .36, [1024, 430, 1150, .06]));
  e.append(FAR('Chat|Bold', 330, 190, 96, -10, .5, 2), FAR('Team|Bold', 230, 590, 86, 8, .45, 2.5), FAR('Mail|Bold', 90, 330, 70, -6, .3, 3.5),
           FAR('Schedule / Calender|Bold', 1740, 170, 92, 9, .5, 2), FAR('Voice Mail|Bold', 1830, 590, 92, -8, .45, 2.5), FAR('Clock|Bold', 1960, 340, 70, 6, .3, 3.5));
  e.append(lisa(1024, 330, 1200));
  e.append(...tiles([T('call', 600, 250, 170, -8), T('ai', 540, 520, 150, 6), T('chat', 1450, 235, 162, 7), T('ticket', 1510, 505, 150, -6)]));
  e.append(P('left:0;right:0;bottom:0;height:300px;background:linear-gradient(180deg,rgba(32,48,200,0) 0%,rgba(26,36,170,.4) 100%)'));
  return e;
} };

/* ───── Microsoft Store 16:9 Super hero art — no text / UI / devices: Lisa among the channels she answers ───── */
const TILE = (ic, cx, cy, s, rot = 0, tint = '#3356FF', o = 1, blur = 0, light = false) => P(`left:${cx - s / 2}px;top:${cy - s / 2}px;width:${s}px;height:${s}px;border-radius:${s * .28}px;` +
  `background:linear-gradient(160deg,#FFFFFF 0%,#EEF1FF 100%);display:grid;place-items:center;transform:rotate(${rot}deg);opacity:${o};` +
  `box-shadow:${light ? `0 0 0 ${s * .014}px rgba(222,224,250,.9),0 ${s * .12}px ${s * .3}px rgba(52,62,130,.16),0 ${s * .03}px ${s * .1}px rgba(52,62,130,.08)` : `0 0 0 ${s * .012}px rgba(255,255,255,.7),0 ${s * .14}px ${s * .32}px rgba(12,20,110,.30),0 ${s * .04}px ${s * .1}px rgba(12,20,110,.18)`};${blur ? `filter:blur(${blur}px);` : ''}`,
  icon(ic, `width:${s * .52}px;height:${s * .52}px;color:${tint}`));
H.win = { title: 'Microsoft Store Super hero art', store: 'Microsoft Store', spec: '3840 × 2160 · 16:9 · PNG',
  size: [3200, 1800], dpr: 1.2, safe: [800, 150, 2400, 1200], build() {
  const e = canvas(3200, 1800, brandBg(.5, .36, [1600, 760, 2000, .06]));
  // far tiles (soft) → near tiles; all key art in the top two-thirds, centred
  [['Chat|Bold', 470, 330, 170, -10, .5, 3], ['Schedule / Calender|Bold', 2780, 300, 160, 9, .5, 3], ['Team|Bold', 300, 1020, 150, 8, .45, 4], ['Voice Mail|Bold', 2930, 1030, 160, -8, .45, 4]]
    .forEach(a => e.append(TILE(a[0], a[1], a[2], a[3], a[4], '#3356FF', a[5], a[6])));
  e.append(lisa(1600, 560, 2100));
  [['Incoming Call|Bold', 900, 430, 300, -8, '#3F8A12'], ['Chat 2|Bold', 2310, 400, 290, 7], ['Ticket 1|Bold', 2420, 880, 270, -6, '#7A3FF2'],
   ['Star / AI|Bold', 790, 900, 270, 6, '#E0457B']]
    .forEach(a => e.append(TILE(a[0], a[1], a[2], a[3], a[4], a[5])));
  // the store's gradient sits on the bottom third: let the art fade into a deeper blue there
  e.append(P('left:0;right:0;bottom:0;height:640px;background:linear-gradient(180deg,rgba(32,48,200,0) 0%,rgba(26,36,170,.55) 100%)'));
  return e;
} };
H.ipad = H.ios;   // Apple uses one header for iPhone and iPad

STORE.hdr = H;
})();

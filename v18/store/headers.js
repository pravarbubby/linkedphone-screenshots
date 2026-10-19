/* Product page headers — one hero image per store, in the same visual language as the slides
   (lavender backdrop / brand blue, Lisa, enlarged real UI on white pop-out cards).
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

/* ───── App Store (iPhone + iPad) — Lisa at the centre, the conversations she handles around her ───── */
H.ios = { title: 'App Store product page header', store: 'App Store · iPhone & iPad', spec: '3840 × 1646 · 21:9 · PNG, no alpha',
  size: [3840, 1646], dpr: 1, safe: [1097, 493, 2743, 1154], build() {
  const e = canvas(3840, 1646, lightBg);
  e.append(glow(1920, 860, 820));
  // outside the iPhone crop (x < 1097, x > 2743): real UI cards, whole — they only appear on iPad / wide windows
  e.append(CARDS.callerId(560, 640, 1.6), CARDS.ivy(600, 1060, 1.75), CARDS.call(3290, 620, 1.55), CARDS.ticket(3260, 1060, 1.75));
  // inside it: Lisa + the channels she answers, small enough to survive any crop
  e.append(...CH_TILES());
  e.append(lisa(1920, 760, 1500));
  return e;
} };
const CH_TILES = () => [['Incoming Call|Bold', 1300, 640, 200, -8, '#3F8A12'], ['Star / AI|Bold', 1290, 1000, 170, 6, '#E0457B'],
  ['Chat 2|Bold', 2540, 610, 190, 7, '#3356FF'], ['Ticket 1|Bold', 2560, 990, 175, -6, '#7A3FF2']].map(a => TILE(a[0], a[1], a[2], a[3], a[4], a[5], 1, 0, true));

/* ───── Mac App Store — same scene, desktop live-call widgets ───── */
const SHIELD = `<svg viewBox="0 0 220 258"><defs><linearGradient id="hshg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2D4BF0"/><stop offset="1" stop-color="#0B1FB4"/></linearGradient></defs><path d="M110 4 L212 38 V132 C212 190 168 232 110 254 C52 232 8 190 8 132 V38 Z" fill="url(#hshg)" stroke="#5670FF" stroke-width="3"/></svg>`;
function deskCallerId() {
  const cid = P('left:0;top:0;width:359px;height:104px;border-radius:16px;border:2px solid #3356FF;background:#171A2B;color:#fff');
  const sh = P('left:14px;top:12px;width:66px;height:78px;filter:drop-shadow(0 0 10px rgba(60,90,255,.6))'); sh.innerHTML = SHIELD;
  sh.append(P('left:0;right:0;top:15px;text-align:center;color:#fff;font:700 9.5px/12px var(--sf)', ['Protect', h('br'), 'Your', h('br'), 'Personal', h('br'), 'Number']));
  cid.append(sh, P('left:96px;top:24px;font:600 17px/22px var(--sf);white-space:nowrap', 'Business Caller ID'),
    P('left:96px;top:54px;display:flex;align-items:center;gap:8px;font:400 15px/20px var(--sf);white-space:nowrap', [h('span', null, 'font-size:15px', '🧘🏻‍♀️'), 'Restore Wellness Clinic']));
  return cid;
}
function deskLive() {
  const live = DS.v4calls({ W: 1512, H: 945, key: 'michael', live: true }).el.querySelector('.dk-live');
  live.style.cssText += ';left:0;top:0;border-radius:16px;box-shadow:none';
  return live;
}
const DSHADOW = 'box-shadow:0 30px 70px rgba(23,26,43,.24),0 8px 20px rgba(23,26,43,.10)';
H.mac = { title: 'Mac App Store product page header', store: 'Mac App Store', spec: '3840 × 1646 · 21:9 · PNG, no alpha',
  size: [3840, 1646], dpr: 1, safe: [1097, 493, 2743, 1154], build() {
  const e = canvas(3840, 1646, lightBg);
  e.append(glow(1920, 860, 820));
  const k = 1.9;
  e.append(card(deskCallerId(), 600, 560, 359, 104, k, 16, 'clear', DSHADOW),
           card(deskLive(), 600, 1010, 359, 219, 1.75, 16, 'clear', DSHADOW),
           CARDS.call(3290, 620, 1.55), CARDS.ticket(3260, 1060, 1.75));
  e.append(...CH_TILES());
  e.append(lisa(1920, 760, 1500));
  return e;
} };

/* ───── Google Play feature graphic — tagline left, Lisa + cards right, centre free for the play button ───── */
H.android = { title: 'Google Play feature graphic', store: 'Google Play', spec: '1024 × 500 · JPEG or 24-bit PNG, no alpha',
  size: [2048, 1000], dpr: .5, safe: [200, 120, 1848, 880], build() {
  const e = canvas(2048, 1000, blueBg);
  e.append(P('left:130px;top:318px;width:760px;font:600 88px/98px "Rebond",var(--sf);letter-spacing:-1.6px;color:#fff;white-space:nowrap', ['Your Business', h('br'), 'Phone. ', h('span', null, 'color:#BFD0FF', 'Reinvented.')]),
           P('left:133px;top:542px;font:400 40px/54px var(--sf);letter-spacing:-.4px;color:#DCE3FF;white-space:nowrap', 'Calls, texts & a 24/7 AI receptionist.'));
  e.append(glow(1520, 520, 520, 'rgba(255,255,255,.28)'));
  e.append(lisa(1520, 360, 1250));
  e.append(CARDS.call(1220, 770, 1.05), CARDS.ivy(1790, 760, 1.0));
  return e;
} };

/* ───── Microsoft Store 16:9 Super hero art — no text / UI / devices: Lisa among the channels she answers ───── */
const TILE = (ic, cx, cy, s, rot = 0, tint = '#3356FF', o = 1, blur = 0, light = false) => P(`left:${cx - s / 2}px;top:${cy - s / 2}px;width:${s}px;height:${s}px;border-radius:${s * .28}px;` +
  `background:linear-gradient(160deg,#FFFFFF 0%,#EEF1FF 100%);display:grid;place-items:center;transform:rotate(${rot}deg);opacity:${o};` +
  `box-shadow:${light ? `0 0 0 ${s * .014}px rgba(222,224,250,.9),0 ${s * .12}px ${s * .3}px rgba(52,62,130,.16),0 ${s * .03}px ${s * .1}px rgba(52,62,130,.08)` : `0 0 0 ${s * .012}px rgba(255,255,255,.7),0 ${s * .14}px ${s * .32}px rgba(12,20,110,.30),0 ${s * .04}px ${s * .1}px rgba(12,20,110,.18)`};${blur ? `filter:blur(${blur}px);` : ''}`,
  icon(ic, `width:${s * .52}px;height:${s * .52}px;color:${tint}`));
H.win = { title: 'Microsoft Store Super hero art', store: 'Microsoft Store', spec: '3840 × 2160 · 16:9 · PNG',
  size: [3200, 1800], dpr: 1.2, safe: [800, 150, 2400, 1200], build() {
  const e = canvas(3200, 1800, blueBg);
  // far tiles (soft) → near tiles; all key art in the top two-thirds, centred
  [['Chat|Bold', 470, 330, 170, -10, .5, 3], ['Schedule / Calender|Bold', 2780, 300, 160, 9, .5, 3], ['Team|Bold', 300, 1020, 150, 8, .45, 4], ['Voice Mail|Bold', 2930, 1030, 160, -8, .45, 4]]
    .forEach(a => e.append(TILE(a[0], a[1], a[2], a[3], a[4], '#3356FF', a[5], a[6])));
  e.append(glow(1600, 700, 760, 'rgba(255,255,255,.30)'));
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

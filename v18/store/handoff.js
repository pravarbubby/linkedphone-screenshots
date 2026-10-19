/* Handoff tools for the dashboard: download-all (zip) per device, per-image download on hover,
   developer-friendly filenames, and a store-page preview modal per device. Reads exported PNGs from ../exports/<ver>/. */
(() => {
const VER = (location.pathname.match(/\/(v\d+)\//) || [])[1] || 'v18';
const META = {
  ios:      { name: 'iOS',           store: 'App Store',   size: '1290x2796' },
  ipad:     { name: 'iPadOS',        store: 'App Store',   size: '2064x2752' },
  mac:      { name: 'macOS',         store: 'Mac App Store', size: '2880x1800' },
  win:      { name: 'Windows',       store: 'Microsoft Store', size: '3840x2160' },
  android:  { name: 'Android',       store: 'Google Play', size: '1440x2880' },
  androidS: { name: 'Android-Small', store: 'Google Play', size: '900x1600' },
};
const slug = (t) => t.replace(/[’']/g, '').replace(/[^A-Za-z0-9]+/g, '-').replace(/^-|-$/g, '');
const src = (p, n) => `../exports/${VER}/${p}/${String(n).padStart(2, '0')}.png`;
const fileName = (p, n) => `LinkedPhone_${META[p].name}_${String(n).padStart(2, '0')}_${slug(STORE[p][n].title)}_${META[p].size}.png`;
const zipName = (p) => `LinkedPhone_${META[p].name}_${VER}_${META[p].size}.zip`;
/* Google Play takes at most 8 phone screenshots. Both Android tabs share one pick (default: all but 08 Transfer Calls
   and 10 Built to Grow); Include swaps slides in and out. Slides keep their 01–10 numbers everywhere, including file names. */
const PLAY_MAX = 8, isAndroid = (p) => p === 'android' || p === 'androidS';
const PICK_KEY = 'androidPick.v14', PICK_DEFAULT = [1, 2, 3, 4, 5, 6, 7, 9];
const loadPick = () => { try { const a = JSON.parse(localStorage.getItem(PICK_KEY)); if (Array.isArray(a)) return [...new Set(a.filter(n => Number.isInteger(n) && n >= 1 && n <= 10))].sort((x, y) => x - y).slice(0, PLAY_MAX); } catch (e) {} return PICK_DEFAULT.slice(); };
let pick = loadPick();
const savePick = () => { try { localStorage.setItem(PICK_KEY, JSON.stringify(pick)); } catch (e) {} };
const slidesFor = (p) => Array.from({ length: 10 }, (_, i) => i + 1).filter(n => STORE[p][n] && (!isAndroid(p) || pick.includes(n)));
const save = (blob, name) => { const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name; document.body.append(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000); };
const fetchBlob = (u) => fetch(u, { cache: 'no-store' }).then(r => { if (!r.ok) throw new Error(u); return r.blob(); });

async function downloadOne(p, n) { save(await fetchBlob(src(p, n)), fileName(p, n)); }
async function downloadAll(p, btn) {
  const label = btn.textContent; btn.disabled = true; btn.textContent = 'Zipping…';
  try {
    const zip = new JSZip();
    const list = slidesFor(p);
    for (const n of list) zip.file(fileName(p, n), await fetchBlob(src(p, n)));
    save(await zip.generateAsync({ type: 'blob' }), isAndroid(p) ? zipName(p).replace('.zip', `_${list.length}-for-Google-Play.zip`) : zipName(p));
  } catch (e) { alert('Export missing for this version: ' + e.message); }
  btn.disabled = false; btn.textContent = label;
}

/* ───── store preview ───── */
const APP = { name: 'LinkedPhone—Pro Business Line', short: 'LinkedPhone', sub: '2nd Number—Calls, Texts, Teams', dev: 'LinkedPhone LLC',
  rating: '4.7', count: '3.8K Ratings', age: '4+', cat: 'Business', size: '104.3 MB',
  desc: '7-Day All-Access Trial. Welcome to the All-New LinkedPhone. Set up a professional-grade business line in minutes. Work solo or add team members to share calls and texts. LinkedPhone is built around one principle: simplicity that empowers growth.' };
const ICON = `<svg viewBox="0 0 100 100"><rect width="100" height="100" rx="22" fill="#fff"/><path d="M38.2 61.8h-7.8a7.8 7.8 0 1 0 7.8 7.8Zm39.2-23.9a15.3 15.3 0 0 0-30.5 0v15.3h15.2c8.4 0 15.3-6.9 15.3-15.3Zm8.6 0c0 13.2-10.7 23.9-23.9 23.9H46.8v7.8a16.4 16.4 0 1 1-16.4-16.4h7.8V37.9a23.9 23.9 0 0 1 47.8 0Z" fill="#3356FF" transform="translate(10 10) scale(.8)"/></svg>`;
const stars = (c = '#8E8E93') => `<span style="color:${c};letter-spacing:1px">★★★★★</span>`;
const shots = (p, h, gap = 10, r = 14) => `<div class="sp-shots" style="gap:${gap}px">` +
  slidesFor(p).map(n => `<img src="${src(p, n)}" style="height:${h}px;border-radius:${r}px" alt="Screenshot ${n}">`).join('') + '</div>';
const appleHeader = (iconSize, pad) => `<div style="display:flex;gap:${pad}px;align-items:center">
  <div style="width:${iconSize}px;height:${iconSize}px;border-radius:${iconSize * .22}px;overflow:hidden;box-shadow:0 0 0 1px rgba(0,0,0,.08);flex:none">${ICON}</div>
  <div style="min-width:0"><div style="font:600 ${iconSize * .19}px/1.2 -apple-system,BlinkMacSystemFont,"Helvetica Neue",Arial,sans-serif;color:#000">${APP.name}</div>
  <div style="font:400 ${iconSize * .14}px/1.3 -apple-system,BlinkMacSystemFont,"Helvetica Neue",Arial,sans-serif;color:#8A8A8E;margin-top:3px">${APP.sub}</div>
  <div style="margin-top:${iconSize * .1}px;display:flex;gap:10px;align-items:center"><span class="sp-get">Get</span><span style="font:400 11px/1.2 -apple-system,BlinkMacSystemFont,"Helvetica Neue",Arial,sans-serif;color:#8A8A8E">In-App<br>Purchases</span></div></div></div>`;
const appleStats = () => `<div class="sp-stats">${[[APP.count, APP.rating, stars()], ['Age', APP.age, 'Years Old'], ['Category', APP.cat, '💼'], ['Developer', '', APP.dev], ['Size', APP.size.split(' ')[0], 'MB']]
  .map(([a, b, c]) => `<div><small>${a}</small><b>${b || '<span style="font-size:15px">👤</span>'}</b><small>${c}</small></div>`).join('')}</div>`;

/* product page header in place: Apple header (21:9, centre-cropped on iPhone, back/share floating over it),
   Google Play feature graphic as the video cover (play button), Microsoft Store hero with its bottom gradient */
const HDR = { ios: 'ios', ipad: 'ios', mac: 'mac', win: 'win', android: 'android', androidS: 'android' };
const hsrc = (p) => `../exports/${VER}/headers/${HDR[p]}.png`;
const appleHero = (p, w, hh, round = 0) => `<div style="position:relative;width:${w};height:${hh}px;margin:0 0 16px;border-radius:${round}px;overflow:hidden;background:#EEF0FB">
  <img src="${hsrc(p)}" alt="Product page header" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover">
  ${p === 'ios' || p === 'ipad' ? `<span class="sp-fab" style="left:16px">‹</span><span class="sp-fab" style="right:16px">⇪</span>` : ''}</div>`;
function page(p) {
  if (p === 'ios') return `<div class="sp-dev sp-iphone"><div class="sp-sb" style="position:absolute;left:0;right:0;z-index:3"><b>9:41</b><span>●●● ᯤ ▮</span></div><div class="sp-scroll" style="height:100%;padding:0 18px 8px">
    <div style="margin:0 -18px">${appleHero(p, '100%', 330)}</div>${appleHeader(96, 14)}${appleStats()}
    <div class="sp-h">Preview</div>${shots(p, 470)}<div class="sp-chip">📱 iPhone  ·  iPad  ·  Mac</div>
    <p class="sp-desc">${APP.desc}</p></div></div>`;
  if (p === 'ipad') return `<div class="sp-dev sp-ipad"><div class="sp-sb" style="position:absolute;left:0;right:0;z-index:3"><b>9:41 Thu Oct 1</b><span>ᯤ 100% ▮</span></div><div class="sp-scroll" style="height:100%;padding:0 34px 14px">
    <div style="margin:0 -34px">${appleHero(p, '100%', 352)}</div>${appleHeader(120, 20)}${appleStats()}
    <div class="sp-h">Preview</div>${shots(p, 520)}<div class="sp-chip">iPad  ·  iPhone  ·  Mac</div>
    <p class="sp-desc">${APP.desc}</p></div></div>`;
  if (p === 'mac') return `<div class="sp-dev sp-mac"><div class="sp-tb"><i style="background:#FF5F57"></i><i style="background:#FEBC2E"></i><i style="background:#28C840"></i></div>
    <div style="display:flex;height:calc(100% - 38px)"><div class="sp-side">${['Discover', 'Arcade', 'Create', 'Work', 'Play', 'Develop', 'Categories', 'Updates'].map((t, i) => `<div${i === 3 ? ' class="on"' : ''}>${t}</div>`).join('')}</div>
    <div class="sp-scroll" style="padding:0 34px 26px;flex:1"><div style="margin:0 -34px">${appleHero(p, '100%', 404)}</div>${appleHeader(120, 20)}${appleStats()}
    <div class="sp-h">Preview</div>${shots(p, 330, 12, 10)}<div class="sp-chip">Mac  ·  iPhone  ·  iPad</div><p class="sp-desc">${APP.desc}</p></div></div></div>`;
  if (p === 'win') return `<div class="sp-dev sp-win"><div class="sp-wtb"><span>Microsoft Store</span><span class="sp-wcap">─　☐　✕</span></div>
    <div style="display:flex;height:calc(100% - 40px)"><div class="sp-wside">${['Home', 'Apps', 'Gaming', 'Movies & TV', 'Library'].map((t, i) => `<div${i === 1 ? ' class="on"' : ''}>${t}</div>`).join('')}</div>
    <div class="sp-scroll" style="padding:0 34px 26px;flex:1;background:#F9F9F9">
    <div style="position:relative;margin:0 -34px;height:420px;overflow:hidden"><img src="${hsrc(p)}" alt="Super hero art" style="width:100%;height:100%;object-fit:cover;display:block">
    <div style="position:absolute;left:0;right:0;bottom:0;height:46%;background:linear-gradient(180deg,rgba(249,249,249,0),#F9F9F9)"></div></div>
    <div style="display:flex;gap:20px;align-items:center;position:relative;margin-top:-120px"><div style="width:110px;height:110px;border-radius:20px;overflow:hidden;box-shadow:0 0 0 1px rgba(0,0,0,.08);flex:none">${ICON}</div>
    <div><div style="font:600 26px/1.2 'Segoe UI',-apple-system,system-ui,sans-serif">${APP.name}</div><div style="font:400 13px/1.5 'Segoe UI',-apple-system,system-ui,sans-serif;color:#005FB8">${APP.dev}</div>
    <div style="font:400 13px/1.5 'Segoe UI',-apple-system,system-ui,sans-serif;color:#5D5D5D">${APP.rating} ★ · ${APP.cat} · Free · In-app purchases</div>
    <div class="sp-wget">Get</div></div></div>
    <div class="sp-h" style="font-family:'Segoe UI',-apple-system,system-ui,sans-serif;font-weight:600">Screenshots</div>${shots(p, 300, 12, 8)}
    <div class="sp-h" style="font-family:'Segoe UI',-apple-system,system-ui,sans-serif;font-weight:600">Description</div><p class="sp-desc">${APP.desc}</p></div></div></div>`;
  const small = p === 'androidS';
  return `<div class="sp-dev sp-android${small ? ' small' : ''}"><div class="sp-sb"><b>9:41</b><span>▾ ◢ ▮</span></div><div class="sp-scroll" style="padding:0 18px 6px">
    <div style="position:relative;margin:0 -18px 16px;aspect-ratio:1024/500;overflow:hidden"><img src="${hsrc(p)}" alt="Feature graphic" style="width:100%;height:100%;display:block">
    <span class="sp-play"></span><span class="sp-fab" style="left:12px;top:10px;font-size:18px">←</span></div>
    <div style="display:flex;gap:16px;align-items:center"><div style="width:72px;height:72px;border-radius:16px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.2);flex:none">${ICON}</div>
    <div><div style="font:500 20px/1.25 Roboto,-apple-system,BlinkMacSystemFont,"Helvetica Neue",Arial,sans-serif">${APP.name}</div><div style="font:500 13px/1.4 Roboto,-apple-system,BlinkMacSystemFont,"Helvetica Neue",Arial,sans-serif;color:#0B57D0;margin-top:2px">${APP.dev}</div><div style="font:400 11px/1.4 Roboto,-apple-system,BlinkMacSystemFont,"Helvetica Neue",Arial,sans-serif;color:#5F6368">In-app purchases</div></div></div>
    <div class="sp-gstats"><div><b>${APP.rating} ★</b><small>${APP.count.replace(' Ratings', '')} reviews</small></div><div><b>${APP.cat}</b><small>Category</small></div><div><b>${APP.age}</b><small>Rated for ${APP.age}</small></div></div>
    <div class="sp-install">Install</div>
    ${shots(p, small ? 300 : 330, 8, 10)}
    <div class="sp-h" style="font-family:Roboto,-apple-system,BlinkMacSystemFont,"Helvetica Neue",Arial,sans-serif">About this app →</div><p class="sp-desc">${APP.desc}</p></div></div>`;
}
const CSS = `
.sp-fab { position:absolute; top:52px; width:32px; height:32px; border-radius:50%; background:rgba(255,255,255,.72); backdrop-filter:blur(10px); display:grid; place-items:center; font:500 20px/1 -apple-system,system-ui; color:#111; box-shadow:0 1px 4px rgba(0,0,0,.12); }
.sp-play { position:absolute; left:50%; top:50%; width:56px; height:56px; margin:-28px 0 0 -28px; border-radius:50%; background:rgba(255,255,255,.95); box-shadow:0 2px 10px rgba(0,0,0,.25); }
.sp-play::after { content:""; position:absolute; left:22px; top:17px; border-left:16px solid #1F1F1F; border-top:11px solid transparent; border-bottom:11px solid transparent; }
.sp-ov { position:fixed; inset:0; z-index:200; background:rgba(14,16,30,.78); display:none; place-items:center; }
.sp-ov.open { display:grid; }
.sp-close { position:fixed; top:16px; right:20px; z-index:201; width:40px; height:40px; border-radius:50%; border:0; background:#fff; font:400 22px/40px -apple-system,BlinkMacSystemFont,"Helvetica Neue",Arial,sans-serif; cursor:pointer; }
.sp-cap { position:fixed; bottom:16px; left:0; right:0; text-align:center; color:#C9CCE4; font:13px -apple-system,BlinkMacSystemFont,"Helvetica Neue",Arial,sans-serif; }
.sp-dev * { box-sizing:border-box; }
.sp-dev { background:#fff; color:#000; overflow:hidden; position:relative; box-shadow:0 0 0 12px #111, 0 30px 80px rgba(0,0,0,.5); font-family:-apple-system,system-ui; }
.sp-iphone { width:393px; height:852px; border-radius:54px; }
.sp-ipad { width:820px; height:1100px; border-radius:36px; }
.sp-mac { width:1180px; height:760px; border-radius:12px; box-shadow:0 0 0 1px rgba(0,0,0,.2), 0 30px 80px rgba(0,0,0,.5); }
.sp-win { width:1180px; height:760px; border-radius:8px; box-shadow:0 0 0 1px rgba(0,0,0,.2), 0 30px 80px rgba(0,0,0,.5); }
.sp-wtb { height:40px; background:#F3F3F3; display:flex; justify-content:space-between; align-items:center; padding:0 0 0 16px; font:400 12px 'Segoe UI',-apple-system,system-ui,sans-serif; color:#1F1F1F; }
.sp-wcap { padding:0 18px; letter-spacing:6px; font-size:12px; }
.sp-wside { width:76px; background:#F3F3F3; padding:10px 6px; font:400 11px 'Segoe UI',-apple-system,system-ui,sans-serif; text-align:center; }
.sp-wside div { padding:14px 2px; border-radius:6px; color:#1F1F1F; }
.sp-wside .on { background:#fff; }
.sp-wget { display:inline-block; margin-top:10px; background:#005FB8; color:#fff; font:600 14px/32px 'Segoe UI',-apple-system,system-ui,sans-serif; padding:0 34px; border-radius:5px; }
.sp-android { width:412px; height:880px; border-radius:36px; }
.sp-android.small { width:360px; height:760px; }
.sp-sb { height:44px; display:flex; justify-content:space-between; align-items:center; padding:0 28px; font:600 15px -apple-system,BlinkMacSystemFont,"Helvetica Neue",Arial,sans-serif; }
.sp-android .sp-sb { height:32px; padding:0 18px; font:500 13px Roboto,-apple-system,BlinkMacSystemFont,"Helvetica Neue",Arial,sans-serif; }
.sp-scroll { height:calc(100% - 44px); overflow-y:auto; }
.sp-back { color:#007AFF; font:400 17px -apple-system,BlinkMacSystemFont,"Helvetica Neue",Arial,sans-serif; margin:4px 0 14px; }
.sp-get { display:inline-block; background:#007AFF; color:#fff; font:600 15px/30px -apple-system,BlinkMacSystemFont,"Helvetica Neue",Arial,sans-serif; padding:0 22px; border-radius:15px; }
.sp-stats { display:flex; margin:20px 0 6px; padding:12px 0; border-top:1px solid #E5E5EA; border-bottom:1px solid #E5E5EA; overflow:hidden; }
.sp-stats > div { flex:1; text-align:center; border-right:1px solid #E5E5EA; display:flex; flex-direction:column; gap:3px; min-width:0; }
.sp-stats > div:last-child { border:0; }
.sp-stats small { font:400 11px/1.2 -apple-system,BlinkMacSystemFont,"Helvetica Neue",Arial,sans-serif; color:#8A8A8E; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; padding:0 4px; }
.sp-stats b { font:700 20px/1.2 -apple-system,BlinkMacSystemFont,"Helvetica Neue",Arial,sans-serif; color:#6E6E73; }
.sp-h { font:700 22px/1.2 -apple-system,BlinkMacSystemFont,"Helvetica Neue",Arial,sans-serif; margin:18px 0 12px; }
.sp-shots { display:flex; overflow-x:auto; scroll-snap-type:x mandatory; padding-bottom:6px; }
.sp-shots img { flex:none; scroll-snap-align:start; box-shadow:0 0 0 1px rgba(0,0,0,.08); }
.sp-chip { font:400 13px -apple-system,BlinkMacSystemFont,"Helvetica Neue",Arial,sans-serif; color:#8A8A8E; margin:8px 0 14px; }
.sp-desc { font:400 15px/1.45 -apple-system,BlinkMacSystemFont,"Helvetica Neue",Arial,sans-serif; color:#1D1D1F; margin:8px 0 30px; }
.sp-tb { height:38px; background:#ECECEC; display:flex; gap:8px; align-items:center; padding:0 14px; border-bottom:1px solid #D6D6D6; }
.sp-tb i { width:12px; height:12px; border-radius:50%; display:block; }
.sp-side { width:200px; background:#F2F2F4; border-right:1px solid #DDD; padding:16px 10px; font:500 14px -apple-system,BlinkMacSystemFont,"Helvetica Neue",Arial,sans-serif; }
.sp-side div { padding:7px 10px; border-radius:6px; color:#333; }
.sp-side .on { background:#DADADF; }
.sp-gstats { display:flex; margin:18px 0; }
.sp-gstats > div { flex:1; text-align:center; display:flex; flex-direction:column; gap:3px; border-right:1px solid #E0E0E0; }
.sp-gstats > div:last-child { border:0; }
.sp-gstats b { font:500 14px Roboto,-apple-system,BlinkMacSystemFont,"Helvetica Neue",Arial,sans-serif; } .sp-gstats small { font:400 12px Roboto,-apple-system,BlinkMacSystemFont,"Helvetica Neue",Arial,sans-serif; color:#5F6368; }
.sp-install { background:#0B57D0; color:#fff; text-align:center; font:500 14px/40px Roboto,-apple-system,BlinkMacSystemFont,"Helvetica Neue",Arial,sans-serif; border-radius:20px; margin:0 0 18px; }
.db-dlall, .db-prev { appearance:none; height:36px; padding:0 14px; border-radius:10px; font:500 14px/1 var(--sf); cursor:pointer; display:inline-flex; align-items:center; justify-content:center; gap:7px; white-space:nowrap; }
.db-dlall { background:var(--blue); color:#fff; border:1px solid var(--blue); }
.db-dlall:hover { background:#2747E6; border-color:#2747E6; }
.db-dlall:disabled { opacity:.5; cursor:default; }
.db-prev { background:#fff; color:var(--ink); border:1px solid var(--g90); }
.db-prev:hover { background:var(--g98); }
.db-dlall svg, .db-prev svg { width:17px; height:17px; flex:none; }
/* Android status: a 01–10 strip mirroring the grid order, plus one plain sentence */
.db-dots { display:flex; gap:4px; }
.db-dots i { width:24px; height:20px; border-radius:5px; font:600 11px/20px var(--sf); font-style:normal; text-align:center; background:var(--blue); color:#fff; }
.db-dots i.off { background:#fff; color:var(--g60); box-shadow:inset 0 0 0 1px var(--g80); }
.db-status b { color:var(--ink); font-weight:600; }
/* card footer: switch on the left, PNG download on the right */
.db-pick { display:flex; align-items:center; gap:8px; flex:1; min-width:0; height:40px; font:500 13px/1 var(--sf); color:var(--ink); cursor:pointer; user-select:none; }
.db-pick input { position:absolute; opacity:0; pointer-events:none; }
.db-sw { width:32px; height:20px; border-radius:10px; background:var(--g80); position:relative; flex:none; transition:background .15s; }
.db-sw::after { content:""; position:absolute; left:2px; top:2px; width:16px; height:16px; border-radius:50%; background:#fff; box-shadow:0 1px 2px rgba(23,26,43,.2); transition:left .15s; }
.db-pick input:checked + .db-sw { background:var(--blue); }
.db-pick input:checked + .db-sw::after { left:14px; }
.db-pick input:focus-visible + .db-sw { outline:2px solid var(--blue); outline-offset:2px; }
.db-fmt { flex:1; min-width:0; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.db-png { flex:none; width:32px; height:32px; border-radius:8px; border:0; background:none; color:var(--g40); display:grid; place-items:center; cursor:pointer; }
.db-png:hover { background:var(--blue95); color:var(--blue); }
.db-png svg { width:18px; height:18px; }
/* excluded: same card, visibly set aside — dashed outline, muted art and text */
.db-card.db-off { background:var(--g98); border-style:dashed; border-color:var(--g80); }
.db-card.db-off .db-thumb > .db-inner { opacity:.35; filter:grayscale(1); }
.db-card.db-off .db-t, .db-card.db-off .db-pick { color:var(--g50); }
.db-card.db-off .db-i { background:var(--g95); color:var(--g50); }
.db-card.db-full .db-pick { cursor:not-allowed; }
.db-card.db-full .db-sw { opacity:.45; }
`;
const st = document.createElement('style'); st.textContent = CSS; document.head.append(st);
const ov = document.createElement('div'); ov.className = 'sp-ov';
ov.innerHTML = '<button class="sp-close" aria-label="Close preview">×</button><div class="sp-stage"></div><div class="sp-cap"></div>';
document.body.append(ov);
const closeP = () => ov.classList.remove('open');
ov.onclick = (e) => { if (e.target === ov || e.target.classList.contains('sp-close')) closeP(); };
addEventListener('keydown', e => { if (e.key === 'Escape') closeP(); });
function openPreview(p) {
  const stage = ov.querySelector('.sp-stage'); stage.innerHTML = window.SF ? SF.page(p, { shots: slidesFor(p).map(n => src(p, n)), hero: hsrc(p) }) : page(p);
  const d = stage.firstChild, sc = Math.min(1, (innerHeight - 90) / d.offsetHeight || 1, (innerWidth - 60) / d.offsetWidth || 1);
  ov.classList.add('open');
  requestAnimationFrame(() => { const sc2 = Math.min(1, (innerHeight - 90) / d.offsetHeight, (innerWidth - 60) / d.offsetWidth); d.style.transform = `scale(${sc2})`; });
  ov.querySelector('.sp-cap').textContent = `${META[p].store} preview · ${META[p].name} · ${{ ios: 'product page header 3840×1646', ipad: 'product page header 3840×1646', mac: 'product page header 3840×1646', win: 'Super hero art 3840×2160', android: 'feature graphic 1024×500', androidS: 'feature graphic 1024×500' }[p]} + screenshots · scroll the page and the screenshots · Esc to close`;
}

/* ───── wire into the dashboard (re-run after every redraw) ───── */
const IC_DL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4v11m0 0-4.5-4.5M12 15l4.5-4.5M5 19.5h14"/></svg>';
const IC_EYE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z"/><circle cx="12" cy="12" r="3"/></svg>';
function decorate() {
  const meta = document.querySelector('.db-meta'); if (!meta || meta.dataset.dec) return;
  meta.dataset.dec = 1;
  const tab = document.querySelector('nav.db-tabs button[aria-selected=true]');
  const label = tab ? tab.firstChild.textContent.trim() : 'iOS';
  const p = { 'iOS': 'ios', 'iPadOS': 'ipad', 'macOS': 'mac', 'Windows': 'win', 'Android': 'android', 'Android small': 'androidS' }[label] || 'ios';
  const box = meta.querySelector('.db-actions'), status = meta.querySelector('.db-status');
  const prev = document.createElement('button'); prev.className = 'db-prev'; prev.innerHTML = `${IC_EYE}Preview on ${META[p].store}`; prev.onclick = () => openPreview(p);
  const all = document.createElement('button'); all.className = 'db-dlall'; all.onclick = () => downloadAll(p, all);
  box.append(prev, all);
  const sync = () => {
    all.innerHTML = IC_DL + (isAndroid(p) ? `Download ${pick.length} for Google Play` : `Download all ${slidesFor(p).length}`) + ' (.zip)';
    all.disabled = isAndroid(p) && !pick.length;
    if (!isAndroid(p)) return;
    const left = PLAY_MAX - pick.length;
    status.innerHTML = `<span class="db-dots" aria-hidden="true">${Array.from({ length: 10 }, (_, i) => `<i${pick.includes(i + 1) ? '' : ' class="off"'}>${String(i + 1).padStart(2, '0')}</i>`).join('')}</span>` +
      `<span><b>${pick.length} of ${PLAY_MAX}</b> selected · Google Play allows up to ${PLAY_MAX}. ` + (left ? `You can add ${left} more.` : `Switch one off to add another.`) + `</span>`;
    document.querySelectorAll('.db-card').forEach((card, i) => {
      const cb = card.querySelector('.db-pick input'); if (!cb) return;
      const on = pick.includes(i + 1); cb.checked = on; cb.disabled = !on && pick.length >= PLAY_MAX;
      card.classList.toggle('db-off', !on); card.classList.toggle('db-full', cb.disabled);
      card.querySelector('.db-pick-t').textContent = on ? 'Included' : 'Not included';
      card.querySelector('.db-pick').title = cb.disabled ? `Google Play allows ${PLAY_MAX} — switch another slide off first` : '';
    });
  };
  document.querySelectorAll('.db-card').forEach((card, i) => {
    const n = i + 1, foot = card.querySelector('.db-foot'); if (!STORE[p][n] || !foot) return;
    if (isAndroid(p)) {
      const lab = document.createElement('label'); lab.className = 'db-pick';
      const cb = document.createElement('input'); cb.type = 'checkbox'; cb.setAttribute('role', 'switch'); cb.setAttribute('aria-label', `Include ${STORE[p][n].title} in the Google Play download`);
      const sw = document.createElement('span'); sw.className = 'db-sw';
      const t = document.createElement('span'); t.className = 'db-pick-t';
      cb.onchange = () => { pick = cb.checked ? [...new Set([...pick, n])].sort((x, y) => x - y).slice(0, PLAY_MAX) : pick.filter(m => m !== n); savePick(); sync(); };
      lab.append(cb, sw, t); foot.append(lab);
    } else {
      const f = document.createElement('span'); f.className = 'db-fmt'; f.innerHTML = `PNG<span class="db-dim"> · ${META[p].size.replace('x', ' × ')}</span>`; foot.append(f);
    }
    const b = document.createElement('button'); b.className = 'db-png'; b.innerHTML = IC_DL; b.title = 'Download ' + fileName(p, n); b.setAttribute('aria-label', 'Download PNG');
    b.onclick = (e) => { e.stopPropagation(); downloadOne(p, n); };
    foot.append(b);
  });
  sync();
}
new MutationObserver(decorate).observe(document.getElementById('main') || document.body, { childList: true, subtree: false });
decorate();
})();

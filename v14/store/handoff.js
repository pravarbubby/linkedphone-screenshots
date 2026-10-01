/* Handoff tools for the dashboard: download-all (zip) per device, per-image download on hover,
   developer-friendly filenames, and a store-page preview modal per device. Reads exported PNGs from ../exports/<ver>/. */
(() => {
const VER = (location.pathname.match(/\/(v\d+)\//) || [])[1] || 'v14';
const META = {
  ios:      { name: 'iOS',           store: 'App Store',   size: '1290x2796' },
  ipad:     { name: 'iPadOS',        store: 'App Store',   size: '2064x2752' },
  mac:      { name: 'macOS',         store: 'Mac App Store', size: '2880x1800' },
  android:  { name: 'Android',       store: 'Google Play', size: '1440x2880' },
  androidS: { name: 'Android-Small', store: 'Google Play', size: '900x1600' },
};
const slug = (t) => t.replace(/[’']/g, '').replace(/[^A-Za-z0-9]+/g, '-').replace(/^-|-$/g, '');
const src = (p, n) => `../exports/${VER}/${p}/${String(n).padStart(2, '0')}.png`;
const fileName = (p, n) => `LinkedPhone_${META[p].name}_${String(n).padStart(2, '0')}_${slug(STORE[p][n].title)}_${META[p].size}.png`;
const zipName = (p) => `LinkedPhone_${META[p].name}_${VER}_${META[p].size}.zip`;
/* Google Play takes at most 8 phone screenshots: Android tabs grey out 9–10 and zip only 1–8. */
const PLAY_MAX = 8, isAndroid = (p) => p === 'android' || p === 'androidS';
const slidesFor = (p) => Array.from({ length: isAndroid(p) ? PLAY_MAX : 10 }, (_, i) => i + 1).filter(n => STORE[p][n]);
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

function page(p) {
  if (p === 'ios') return `<div class="sp-dev sp-iphone"><div class="sp-sb"><b>9:41</b><span>●●● ᯤ ▮</span></div><div class="sp-scroll" style="padding:8px 18px">
    <div class="sp-back">‹ Search</div>${appleHeader(96, 14)}${appleStats()}
    <div class="sp-h">Preview</div>${shots(p, 470)}<div class="sp-chip">📱 iPhone  ·  iPad  ·  Mac</div>
    <p class="sp-desc">${APP.desc}</p></div></div>`;
  if (p === 'ipad') return `<div class="sp-dev sp-ipad"><div class="sp-sb"><b>9:41 Thu Oct 1</b><span>ᯤ 100% ▮</span></div><div class="sp-scroll" style="padding:14px 34px">
    <div class="sp-back">‹ Search</div>${appleHeader(120, 20)}${appleStats()}
    <div class="sp-h">Preview</div>${shots(p, 520)}<div class="sp-chip">iPad  ·  iPhone  ·  Mac</div>
    <p class="sp-desc">${APP.desc}</p></div></div>`;
  if (p === 'mac') return `<div class="sp-dev sp-mac"><div class="sp-tb"><i style="background:#FF5F57"></i><i style="background:#FEBC2E"></i><i style="background:#28C840"></i></div>
    <div style="display:flex;height:calc(100% - 38px)"><div class="sp-side">${['Discover', 'Arcade', 'Create', 'Work', 'Play', 'Develop', 'Categories', 'Updates'].map((t, i) => `<div${i === 3 ? ' class="on"' : ''}>${t}</div>`).join('')}</div>
    <div class="sp-scroll" style="padding:26px 34px;flex:1">${appleHeader(120, 20)}${appleStats()}
    <div class="sp-h">Preview</div>${shots(p, 330, 12, 10)}<div class="sp-chip">Mac  ·  iPhone  ·  iPad</div><p class="sp-desc">${APP.desc}</p></div></div></div>`;
  const small = p === 'androidS';
  return `<div class="sp-dev sp-android${small ? ' small' : ''}"><div class="sp-sb"><b>9:41</b><span>▾ ◢ ▮</span></div><div class="sp-scroll" style="padding:6px 18px">
    <div class="sp-back" style="font-size:20px">←</div>
    <div style="display:flex;gap:16px;align-items:center"><div style="width:72px;height:72px;border-radius:16px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.2);flex:none">${ICON}</div>
    <div><div style="font:500 20px/1.25 Roboto,-apple-system,BlinkMacSystemFont,"Helvetica Neue",Arial,sans-serif">${APP.name}</div><div style="font:500 13px/1.4 Roboto,-apple-system,BlinkMacSystemFont,"Helvetica Neue",Arial,sans-serif;color:#0B57D0;margin-top:2px">${APP.dev}</div><div style="font:400 11px/1.4 Roboto,-apple-system,BlinkMacSystemFont,"Helvetica Neue",Arial,sans-serif;color:#5F6368">In-app purchases</div></div></div>
    <div class="sp-gstats"><div><b>${APP.rating} ★</b><small>${APP.count.replace(' Ratings', '')} reviews</small></div><div><b>${APP.cat}</b><small>Category</small></div><div><b>${APP.age}</b><small>Rated for ${APP.age}</small></div></div>
    <div class="sp-install">Install</div>
    ${shots(p, small ? 300 : 330, 8, 10)}
    <div class="sp-h" style="font-family:Roboto,-apple-system,BlinkMacSystemFont,"Helvetica Neue",Arial,sans-serif">About this app →</div><p class="sp-desc">${APP.desc}</p></div></div>`;
}
const CSS = `
.sp-ov { position:fixed; inset:0; z-index:200; background:rgba(14,16,30,.78); display:none; place-items:center; }
.sp-ov.open { display:grid; }
.sp-close { position:fixed; top:16px; right:20px; z-index:201; width:40px; height:40px; border-radius:50%; border:0; background:#fff; font:400 22px/40px -apple-system,BlinkMacSystemFont,"Helvetica Neue",Arial,sans-serif; cursor:pointer; }
.sp-cap { position:fixed; bottom:16px; left:0; right:0; text-align:center; color:#C9CCE4; font:13px -apple-system,BlinkMacSystemFont,"Helvetica Neue",Arial,sans-serif; }
.sp-dev * { box-sizing:border-box; }
.sp-dev { background:#fff; color:#000; overflow:hidden; position:relative; box-shadow:0 0 0 12px #111, 0 30px 80px rgba(0,0,0,.5); font-family:-apple-system,system-ui; }
.sp-iphone { width:393px; height:852px; border-radius:54px; }
.sp-ipad { width:820px; height:1100px; border-radius:36px; }
.sp-mac { width:1180px; height:760px; border-radius:12px; box-shadow:0 0 0 1px rgba(0,0,0,.2), 0 30px 80px rgba(0,0,0,.5); }
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
.db-dlall, .db-prev { appearance:none; border:1px solid #D7DBF5; background:#fff; color:#3356FF; font:600 13px/1 -apple-system,system-ui; padding:9px 14px; border-radius:9px; cursor:pointer; }
.db-prev { background:#3356FF; color:#fff; border-color:#3356FF; }
.db-dlall:disabled { opacity:.6; }
.db-hdl { position:absolute; right:10px; top:10px; z-index:3; opacity:0; transition:opacity .15s; border:0; background:rgba(23,26,43,.86); color:#fff; font:600 12px/1 -apple-system,BlinkMacSystemFont,"Helvetica Neue",Arial,sans-serif; padding:8px 11px; border-radius:8px; cursor:pointer; }
.db-pair:hover .db-hdl { opacity:1; }
.db-card.db-off .db-pair { opacity:.35; filter:grayscale(1); }
.db-card.db-off .db-t { color:#9A9DB3; }
`;
const st = document.createElement('style'); st.textContent = CSS; document.head.append(st);
const ov = document.createElement('div'); ov.className = 'sp-ov';
ov.innerHTML = '<button class="sp-close" aria-label="Close preview">×</button><div class="sp-stage"></div><div class="sp-cap"></div>';
document.body.append(ov);
const closeP = () => ov.classList.remove('open');
ov.onclick = (e) => { if (e.target === ov || e.target.classList.contains('sp-close')) closeP(); };
addEventListener('keydown', e => { if (e.key === 'Escape') closeP(); });
function openPreview(p) {
  const stage = ov.querySelector('.sp-stage'); stage.innerHTML = page(p);
  const d = stage.firstChild, sc = Math.min(1, (innerHeight - 90) / d.offsetHeight || 1, (innerWidth - 60) / d.offsetWidth || 1);
  ov.classList.add('open');
  requestAnimationFrame(() => { const sc2 = Math.min(1, (innerHeight - 90) / d.offsetHeight, (innerWidth - 60) / d.offsetWidth); d.style.transform = `scale(${sc2})`; });
  ov.querySelector('.sp-cap').textContent = `${META[p].store} preview · ${META[p].name} ${META[p].size} · scroll the screenshots sideways · Esc to close`;
}

/* ───── wire into the dashboard (re-run after every redraw) ───── */
function decorate() {
  const meta = document.querySelector('.db-meta'); if (!meta || meta.dataset.dec) return;
  meta.dataset.dec = 1;
  const tab = document.querySelector('nav.db-tabs button[aria-selected=true]');
  const label = tab ? tab.firstChild.textContent.trim() : 'iOS';
  const p = { 'iOS': 'ios', 'iPadOS': 'ipad', 'macOS': 'mac', 'Android': 'android', 'Android small': 'androidS' }[label] || 'ios';
  const box = document.createElement('div'); box.style.cssText = 'margin-left:auto;display:flex;gap:8px';
  const prev = document.createElement('button'); prev.className = 'db-prev'; prev.textContent = `Preview on ${META[p].store}`; prev.onclick = () => openPreview(p);
  const all = document.createElement('button'); all.className = 'db-dlall'; all.onclick = () => downloadAll(p, all);
  all.textContent = isAndroid(p) ? `Download ${PLAY_MAX} for ${label} (.zip)` : `Download all ${label} (.zip)`;
  if (isAndroid(p)) meta.insertAdjacentHTML('beforeend', `<span>Google Play allows ${PLAY_MAX} · 9–10 not included</span>`);
  box.append(prev, all); meta.append(box);
  document.querySelectorAll('.db-card').forEach((card, i) => {
    const n = i + 1; if (!STORE[p][n]) return;
    card.querySelector('.db-dl')?.remove();
    if (isAndroid(p) && n > PLAY_MAX) { card.classList.add('db-off'); card.title = `Not included — Google Play allows ${PLAY_MAX}`; return; }
    const pair = card.querySelector('.db-pair'); pair.style.position = 'relative';
    const b = document.createElement('button'); b.className = 'db-hdl'; b.textContent = '↓ Download'; b.title = fileName(p, n);
    b.onclick = (e) => { e.stopPropagation(); downloadOne(p, n); };
    pair.append(b);
  });
}
new MutationObserver(decorate).observe(document.getElementById('main') || document.body, { childList: true, subtree: false });
decorate();
})();

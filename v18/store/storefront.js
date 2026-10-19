/* Store-page previews modelled on the live storefronts (2026), each with its own hero art in place:
   · App Store on iPhone (iOS 26): 21:9 header full-bleed under the status bar, glass back button, icon / Get / share,
     info strip, Preview carousel, floating glass tab bar with the separate Search button.
   · App Store on iPad (iPadOS 26): same page wider, floating tab bar at the top centre over the header.
   · Mac App Store (macOS 26): sidebar with search, header across the content column, Mac / iPhone / iPad switcher.
   · Microsoft Store (Windows 11): title bar with centred search, nav rail, Super hero art behind the top of the page
     fading into Mica, app card overlapping it on the left, screenshots on the right.
   · Google Play (Android): top app bar, icon / developer / stats / green Install, feature graphic as the banner at the top of the listing
     (no promo video, so no play button), then icon / stats / Install / screenshots.
   SF.page(p, { shots: [src…], hero: src }) → HTML string. */
(() => {
const APP = { name: 'LinkedPhone—Pro Business Line', sub: '2nd Number—Calls, Texts, Teams', dev: 'LinkedPhone LLC',
  rating: '4.7', count: '3.8K', age: '4+', cat: 'Business', size: '104.3', ver: '5.2',
  whatsNew: 'Meet the new LinkedPhone: an AI receptionist that answers, transfers and captures every lead — plus faster calls and texts.',
  desc: '7-Day All-Access Trial. Welcome to the All-New LinkedPhone. Set up a professional-grade business line in minutes. Work solo or add team members to share calls and texts. LinkedPhone is built around one principle: simplicity that empowers growth.' };
const ICON = `<svg viewBox="0 0 100 100" width="100%" height="100%"><rect width="100" height="100" fill="#fff"/><path d="M38.2 61.8h-7.8a7.8 7.8 0 1 0 7.8 7.8Zm39.2-23.9a15.3 15.3 0 0 0-30.5 0v15.3h15.2c8.4 0 15.3-6.9 15.3-15.3Zm8.6 0c0 13.2-10.7 23.9-23.9 23.9H46.8v7.8a16.4 16.4 0 1 1-16.4-16.4h7.8V37.9a23.9 23.9 0 0 1 47.8 0Z" fill="#3356FF" transform="translate(10 10) scale(.8)"/></svg>`;
const icon = (s, r) => `<div class="sf-icon" style="width:${s}px;height:${s}px;border-radius:${r ?? s * .225}px">${ICON}</div>`;
const G = (d, s = 20, sw = 1.8, fill = 'none') => `<svg viewBox="0 0 24 24" width="${s}" height="${s}" fill="${fill}" stroke="${fill === 'none' ? 'currentColor' : 'none'}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
const I = {
  back: '<path d="M15 4.5 7.5 12l7.5 7.5"/>', share: '<path d="M12 3.5v11M8 7l4-3.5L16 7M7 10.5H5.5v10h13v-10H17"/>', search: '<circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5"/>',
  today: '<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M4 9h16"/>', games: '<path d="M7 9h10a4 4 0 0 1 4 4v1a3 3 0 0 1-5.4 1.8L14.5 14h-5l-1.1 1.8A3 3 0 0 1 3 14v-1a4 4 0 0 1 4-4Z"/><path d="M8 11.5v3M6.5 13h3"/>',
  apps: '<path d="M12 3 21 8 12 13 3 8Z"/><path d="m3 12.5 9 5 9-5M3 16.5l9 5 9-5"/>', arcade: '<path d="M5 12h14l-1.5 8h-11Z"/><circle cx="12" cy="6.5" r="3"/><path d="M12 9.5V12"/>',
  person: '<circle cx="12" cy="8" r="4"/><path d="M4.5 20.5a7.5 7.5 0 0 1 15 0"/>', brief: '<rect x="3.5" y="7" width="17" height="12.5" rx="2"/><path d="M9 7V5.5a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 5.5V7M3.5 12.5h17"/>',
  chev: '<path d="m9 5 7 7-7 7"/>', more: '<circle cx="12" cy="5" r="1.3"/><circle cx="12" cy="12" r="1.3"/><circle cx="12" cy="19" r="1.3"/>', dl: '<path d="M12 4v11m0 0-4.5-4.5M12 15l4.5-4.5M5 19.5h14"/>',
  phone: '<rect x="7" y="3" width="10" height="18" rx="2.5"/>', tablet: '<rect x="4.5" y="3" width="15" height="18" rx="2"/>', laptop: '<rect x="5" y="5" width="14" height="10" rx="1.5"/><path d="M3 18.5h18"/>',
  home: '<path d="M4 10.5 12 4l8 6.5V20H4Z"/>', lib: '<path d="M5 4v16M10 4v16M15 4.5l4.5 15"/>', help: '<circle cx="12" cy="12" r="8.5"/><path d="M9.6 9.5a2.5 2.5 0 1 1 3.4 2.3c-.6.3-1 .8-1 1.5v.4M12 16.8v.2"/>',
  disc: '<path d="M12 3.5 14.4 9.6 20.5 12l-6.1 2.4L12 20.5l-2.4-6.1L3.5 12l6.1-2.4Z"/>', create: '<path d="m4 20 4-1L19 8l-3-3L5 16Z"/>', work: '<path d="M4 18V9l8-5 8 5v9"/><path d="M9 18v-5h6v5"/>',
  play: '<path d="M8 5.5v13l10-6.5Z"/>', dev: '<path d="m8.5 8-4 4 4 4M15.5 8l4 4-4 4"/>', cats: '<rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/>',
  upd: '<path d="M12 4v10m0 0-4-4m4 4 4-4M5 19.5h14"/>', star: '<path d="m12 3.8 2.5 5.2 5.7.8-4.1 4 1 5.6L12 16.7l-5.1 2.7 1-5.6-4.1-4 5.7-.8Z"/>', heart: '<path d="M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.4 4.3 4.3 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10Z"/>',
};
const stars = (n = 5, c = '#8E8E93', s = 11) => `<span style="color:${c};font-size:${s}px;letter-spacing:.5px">${'★'.repeat(n)}</span>`;
const imgs = (shots, hh, r, gap) => `<div class="sf-row" style="gap:${gap}px">${shots.map((s, i) => `<img src="${s}" alt="Screenshot ${i + 1}" style="height:${hh}px;border-radius:${r}px">`).join('')}</div>`;
const bars = () => `<div class="sf-bars">${[82, 10, 4, 2, 2].map((w, i) => `<div><span>${'★'.repeat(5 - i)}</span><i><b style="width:${w}%"></b></i></div>`).join('')}</div>`;

/* ───── Apple: shared product-page body ───── */
const appleInfo = (cols) => `<div class="sf-ainfo" style="grid-template-columns:repeat(${cols},minmax(0,1fr))">${[
  [`${APP.count} Ratings`, APP.rating, stars()], ['Ages', APP.age, 'Years'], ['Category', G(I.brief, 22, 1.7), APP.cat],
  ['Developer', G(I.person, 22, 1.7), APP.dev], ['Language', 'EN', '+ 5 More'], ['Size', APP.size, 'MB']].slice(0, cols)
  .map(([a, b, c]) => `<div><small>${a}</small><b>${b}</b><small>${c}</small></div>`).join('')}</div>`;
const appleTitle = (s, nameSz) => `<div class="sf-atitle">${icon(s)}<div class="sf-atx"><div style="font:700 ${nameSz}px/1.15 var(--apple)">${APP.name}</div>
  <div style="font:400 ${nameSz * .66}px/1.3 var(--apple);color:#8A8A8E;margin-top:4px">${APP.sub}</div>
  <div class="sf-aget"><span class="sf-getbtn">Get</span><span class="sf-iap">In-App<br>Purchases</span><span class="sf-ashare">${G(I.share, 22, 1.8)}</span></div></div></div>`;
const appleBody = (o) => `${appleInfo(o.cols)}
  <div class="sf-ah"><span>What’s New</span><a>Version History</a></div><div class="sf-meta"><span>Version ${APP.ver}</span><span>2d ago</span></div><p class="sf-p">${APP.whatsNew}</p>
  <div class="sf-ah"><span>Preview</span></div>${imgs(o.shots, o.shotH, o.shotR, o.gap)}
  <div class="sf-devs">${o.devs.map(([g, t]) => `${G(g, 17, 1.7)}<span>${t}</span>`).join('')}<span style="margin-left:auto;color:#8A8A8E">${G(I.chev, 14, 2)}</span></div>
  <p class="sf-p">${APP.desc} <a class="sf-link">more</a></p>
  <div class="sf-devlink"><a class="sf-link">${APP.dev}</a><small>Developer</small><span>${G(I.chev, 14, 2)}</span></div>
  <div class="sf-ah"><span>Ratings &amp; Reviews</span><a>See All</a></div>
  <div class="sf-rate"><div><b>${APP.rating}</b><small>out of 5</small></div>${bars()}</div><div class="sf-meta" style="justify-content:flex-end">${APP.count} Ratings</div>`;
const hero = (src, hh, extra = '') => `<div class="sf-hero" style="height:${hh}px">${src ? `<img src="${src}" alt="Product page header">` : '<div class="sf-nohero">Run tools/export-headers.mjs</div>'}${extra}</div>`;

function iphone({ shots, hero: src }) {
  return `<div class="sf sf-iphone"><div class="sf-sb"><b>9:41</b><span class="sf-island"></span><span class="sf-sbi">${G('<path d="M2 18h3v3H2zM7 15h3v6H7zM12 12h3v9h-3zM17 8h3v13h-3z"/>', 16, 0, '#000')}${G('<path d="M12 19.5 2.5 9a13.5 13.5 0 0 1 19 0Z"/>', 16, 0, '#000')}<i class="sf-batt"></i></span></div>
  <div class="sf-scroll">${hero(src, 400, `<span class="sf-glass" style="left:16px;top:58px">${G(I.back, 20, 2.2)}</span>`)}
  <div class="sf-pad" style="padding:18px 20px 120px">${appleTitle(110, 21)}${appleBody({ cols: 6, shots, shotH: 470, shotR: 22, gap: 10, devs: [[I.phone, 'iPhone'], [I.tablet, 'iPad'], [I.laptop, 'Mac']] })}</div></div>
  <div class="sf-tabs"><div class="sf-tabpill">${[['Today', I.today], ['Games', I.games], ['Apps', I.apps, 1], ['Arcade', I.arcade]].map(([t, g, on]) => `<span${on ? ' class="on"' : ''}>${G(g, 23, 1.7)}<small>${t}</small></span>`).join('')}</div><span class="sf-tabsearch">${G(I.search, 22, 2)}</span></div>
  <i class="sf-home"></i></div>`;
}
function ipad({ shots, hero: src }) {
  return `<div class="sf sf-ipad"><div class="sf-sb" style="height:30px;padding:0 26px"><b style="font-size:14px">9:41 Mon Oct 19</b><span class="sf-sbi" style="font:600 13px var(--apple)">100% <i class="sf-batt"></i></span></div>
  <div class="sf-scroll">${hero(src, 442, `<span class="sf-glass" style="left:24px;top:42px">${G(I.back, 20, 2.2)}</span>
    <div class="sf-itabs">${[['Today'], ['Games'], ['Apps', 1], ['Arcade']].map(([t, on]) => `<span${on ? ' class="on"' : ''}>${t}</span>`).join('')}<span>${G(I.search, 18, 2)}</span></div>`)}
  <div class="sf-pad" style="padding:26px 40px 60px">${appleTitle(150, 28)}${appleBody({ cols: 6, shots, shotH: 560, shotR: 18, gap: 16, devs: [[I.tablet, 'iPad'], [I.phone, 'iPhone'], [I.laptop, 'Mac']] })}</div></div>
  <i class="sf-home" style="width:300px"></i></div>`;
}
function mac({ shots, hero: src }) {
  const side = [['Discover', I.disc], ['Arcade', I.arcade], ['Create', I.create], ['Work', I.work, 1], ['Play', I.play], ['Develop', I.dev], ['Categories', I.cats], ['Updates', I.upd]];
  return `<div class="sf sf-mac"><div class="sf-mside"><div class="sf-lights"><i style="background:#FF5F57"></i><i style="background:#FEBC2E"></i><i style="background:#28C840"></i></div>
    <div class="sf-msearch">${G(I.search, 14, 2)}<span>Search</span></div>${side.map(([t, g, on]) => `<div class="sf-mi${on ? ' on' : ''}">${G(g, 16, 1.8)}<span>${t}</span></div>`).join('')}
    <div class="sf-macct"><span class="sf-av">${G(I.person, 16, 1.8)}</span><span>Account</span></div></div>
  <div class="sf-scroll" style="flex:1;height:100%;background:#fff">${hero(src, 452, `<span class="sf-glass" style="left:18px;top:14px;width:30px;height:30px">${G(I.back, 16, 2.2)}</span>`)}
  <div class="sf-pad" style="padding:22px 36px 50px">${appleTitle(128, 26)}${appleBody({ cols: 6, shots, shotH: 300, shotR: 10, gap: 14, devs: [[I.laptop, 'Mac'], [I.phone, 'iPhone'], [I.tablet, 'iPad']] })}</div></div></div>`;
}
function win({ shots, hero: src }) {
  const nav = [['Home', I.home], ['Apps', I.apps, 1], ['Gaming', I.games]];
  return `<div class="sf sf-win"><div class="sf-wtb"><span class="sf-wlogo"><i style="background:#F25022"></i><i style="background:#7FBA00"></i><i style="background:#00A4EF"></i><i style="background:#FFB900"></i></span><span class="sf-wname">Microsoft Store</span>
    <div class="sf-wsearch"><span>Search apps, games, movies and more</span>${G(I.search, 15, 1.8)}</div><span class="sf-wav">${G(I.person, 16, 1.6)}</span><span class="sf-wcaps">${G('<path d="M5 12h14"/>', 14, 1)}${G('<rect x="5" y="5" width="14" height="14" rx="2"/>', 13, 1)}${G('<path d="m5 5 14 14M19 5 5 19"/>', 13, 1)}</span></div>
  <div style="display:flex;height:calc(100% - 48px)"><div class="sf-wnav">${nav.map(([t, g, on]) => `<div${on ? ' class="on"' : ''}>${G(g, 20, 1.6)}<small>${t}</small></div>`).join('')}<span style="flex:1"></span>${[['Library', I.lib], ['Help', I.help]].map(([t, g]) => `<div>${G(g, 20, 1.6)}<small>${t}</small></div>`).join('')}</div>
  <div class="sf-scroll sf-wpage">${src ? `<div class="sf-whero"><img src="${src}" alt="Super hero art"><i></i></div>` : ''}
    <div class="sf-wbody"><div class="sf-wcard">${icon(108, 18)}<div style="font:600 24px/1.25 var(--segoe);margin-top:18px">${APP.name}</div><a class="sf-wlink">${APP.dev}</a>
      <div class="sf-wget">Get</div><div class="sf-wrate"><span><b>${APP.rating}</b> ★</span><small>1K ratings</small><span class="sf-wsep"></span><span class="sf-wage">3+</span><small>IARC</small></div>
      <div class="sf-wcat">${APP.cat}</div><small class="sf-wfree">Free · Offers in-app purchases</small>
      <p class="sf-wdesc">${APP.desc}</p></div>
    <div class="sf-wright"><div class="sf-wh">Screenshots</div>${imgs(shots, 236, 6, 12)}
      <div class="sf-wh">Description</div><p class="sf-wtxt">${APP.desc}</p>
      <div class="sf-wh">Ratings and reviews</div><div class="sf-rate" style="max-width:520px"><div><b>${APP.rating}</b><small>1K ratings</small></div>${bars()}</div></div></div></div></div></div>`;
}
function play(small) {
  return ({ shots, hero: src }) => `<div class="sf sf-play${small ? ' small' : ''}"><div class="sf-psb"><b>9:41</b><span class="sf-pcam"></span><span>${G('<path d="M12 19.5 2.5 9a13.5 13.5 0 0 1 19 0Z"/>', 14, 0, '#1F1F1F')}${G('<path d="M20 20V4L4 20Z"/>', 13, 0, '#1F1F1F')}<i class="sf-pbatt"></i></span></div>
  <div class="sf-pbar">${G('<path d="M19.5 12h-15M10.5 6l-6 6 6 6"/>', 22, 2)}<span style="flex:1"></span>${G(I.search, 22, 2)}${G(I.more, 22, 2.2)}</div>
  <div class="sf-scroll" style="height:calc(100% - 92px)">${src ? `<div class="sf-pbanner"><img src="${src}" alt="Feature graphic"></div>` : ''}<div style="padding:16px 24px 30px">
    <div class="sf-ptitle">${icon(small ? 64 : 72, small ? 14 : 16)}<div><div class="sf-pname">${APP.name}</div><a class="sf-pdev">${APP.dev}</a><small>In-app purchases</small></div></div>
    <div class="sf-pstats"><div><b>${APP.rating} ★</b><small>${APP.count} reviews</small></div><div><b>${G(I.dl, 16, 2)}</b><small>100K+<br>Downloads</small></div><div><b><span class="sf-esrb">E</span></b><small>Everyone ⓘ</small></div></div>
    <div class="sf-pinstall">Install</div><div class="sf-pmore">${G(I.phone, 16, 1.8)} This app is available for your device</div>
    <div class="sf-row" style="gap:8px;margin:0 -24px;padding:0 24px">
      ${shots.map((s, i) => `<img src="${s}" alt="Screenshot ${i + 1}" style="height:${small ? 190 : 220}px;border-radius:10px">`).join('')}</div>
    <div class="sf-ph">About this app <span>${G('<path d="M4.5 12h15M13.5 6l6 6-6 6"/>', 20, 2)}</span></div><p class="sf-pp">${APP.desc}</p>
    <div class="sf-pchips"><span>${APP.cat}</span><span>Phone</span><span>AI receptionist</span></div>
    <div class="sf-ph">Data safety <span>${G('<path d="M4.5 12h15M13.5 6l6 6-6 6"/>', 20, 2)}</span></div><p class="sf-pp">Safety starts with understanding how developers collect and share your data.</p>
    <div class="sf-ph">Ratings and reviews <span>${G('<path d="M4.5 12h15M13.5 6l6 6-6 6"/>', 20, 2)}</span></div>
    <div class="sf-rate"><div><b style="font-family:var(--gsans);color:#1F1F1F">${APP.rating}</b>${stars(5, '#01875F', 12)}<small>${APP.count} reviews</small></div>${bars().replace('sf-bars', 'sf-bars g')}</div></div></div>
  <i class="sf-home" style="background:#1F1F1F;width:110px"></i></div>`;
}
const PAGES = { ios: iphone, ipad, mac, win, android: play(false), androidS: play(true) };

const CSS = `
.sf { --apple:-apple-system,BlinkMacSystemFont,"SF Pro Text","Helvetica Neue",Arial,sans-serif; --segoe:"Segoe UI Variable","Segoe UI",-apple-system,system-ui,sans-serif; --gsans:"Google Sans","Product Sans",Roboto,-apple-system,system-ui,sans-serif; --roboto:Roboto,-apple-system,system-ui,sans-serif;
  position:relative; overflow:hidden; background:#fff; color:#000; font-family:var(--apple); -webkit-font-smoothing:antialiased; }
.sf * { box-sizing:border-box; } .sf a { cursor:default; }
.sf-scroll { overflow-y:auto; overflow-x:hidden; height:100%; scrollbar-width:none; } .sf-scroll::-webkit-scrollbar { display:none; }
.sf-row { display:flex; overflow-x:auto; scrollbar-width:none; scroll-snap-type:x mandatory; } .sf-row::-webkit-scrollbar { display:none; }
.sf-row img { flex:none; scroll-snap-align:start; box-shadow:0 0 0 .5px rgba(0,0,0,.14); }
.sf-icon { flex:none; overflow:hidden; box-shadow:0 0 0 .5px rgba(0,0,0,.16); }
.sf-hero { position:relative; flex:none; overflow:hidden; background:#EEF0FB; } .sf-hero img { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; }
.sf-nohero { display:grid; place-items:center; height:100%; color:#8A8A8E; font-size:13px; }
.sf-glass { position:absolute; z-index:2; width:40px; height:40px; border-radius:50%; display:grid; place-items:center; color:#111; background:rgba(255,255,255,.55); backdrop-filter:blur(14px) saturate(1.6); box-shadow:inset 0 0 0 .5px rgba(255,255,255,.8),0 2px 10px rgba(0,0,0,.10); }
/* iPhone */
.sf-iphone { width:402px; height:874px; border-radius:62px; box-shadow:0 0 0 11px #1A1A1C,0 0 0 13px #3A3A3E,0 40px 90px rgba(0,0,0,.55); }
.sf-iphone > .sf-scroll { position:absolute; inset:0; }
.sf-sb { position:absolute; z-index:5; left:0; right:0; top:0; height:54px; display:flex; justify-content:space-between; align-items:center; padding:4px 32px 0 44px; font:600 17px var(--apple); pointer-events:none; }
.sf-island { position:absolute; left:50%; top:11px; width:124px; height:36px; margin-left:-62px; border-radius:20px; background:#000; }
.sf-sbi { display:flex; gap:6px; align-items:center; }
.sf-batt { display:inline-block; width:25px; height:12px; border-radius:4px; background:#000; box-shadow:0 0 0 1.2px rgba(0,0,0,.35); }
.sf-home { position:absolute; z-index:6; left:50%; bottom:8px; width:140px; height:5px; margin-left:-70px; border-radius:3px; background:#000; }
.sf-ipad .sf-home { margin-left:-150px; }
.sf-atitle { display:flex; gap:16px; align-items:flex-start; } .sf-atx { min-width:0; flex:1; }
.sf-aget { display:flex; align-items:center; gap:10px; margin-top:12px; }
.sf-getbtn { background:#0A84FF; color:#fff; font:600 16px/32px var(--apple); padding:0 22px; border-radius:16px; }
.sf-iap { font:400 10px/1.15 var(--apple); color:#8A8A8E; } .sf-ashare { margin-left:auto; color:#0A84FF; }
.sf-ainfo { display:grid; margin:22px 0 4px; padding:12px 0; border-top:.5px solid #D1D1D6; border-bottom:.5px solid #D1D1D6; overflow:hidden; }
.sf-iphone .sf-ainfo { display:flex; overflow-x:auto; margin-right:-20px; scrollbar-width:none; } .sf-ainfo::-webkit-scrollbar { display:none; } .sf-iphone .sf-ainfo > div { flex:none; width:100px; }
.sf-ainfo > div { display:flex; flex-direction:column; align-items:center; gap:4px; text-align:center; border-right:.5px solid #D1D1D6; min-width:0; color:#8A8A8E; }
.sf-ainfo > div:last-child { border:0; }
.sf-ainfo small { font:600 10.5px/1.2 var(--apple); text-transform:uppercase; letter-spacing:.2px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:100%; padding:0 6px; }
.sf-ainfo small:last-child { text-transform:none; font-weight:500; font-size:11.5px; }
.sf-ainfo b { font:700 21px/26px var(--apple); color:#6E6E73; height:26px; display:flex; align-items:center; }
.sf-ah { display:flex; justify-content:space-between; align-items:baseline; margin:22px 0 8px; } .sf-ah span { font:700 22px/1.2 var(--apple); } .sf-ah a { color:#0A84FF; font:400 16px var(--apple); }
.sf-meta { display:flex; justify-content:space-between; font:400 14px var(--apple); color:#8A8A8E; }
.sf-p { font:400 15px/1.42 var(--apple); color:#1D1D1F; margin:8px 0 14px; } .sf-link { color:#0A84FF; }
.sf-devs { display:flex; align-items:center; gap:6px; margin:12px 0 4px; padding-bottom:12px; border-bottom:.5px solid #D1D1D6; color:#8A8A8E; font:400 13px var(--apple); }
.sf-devs span { margin-right:10px; }
.sf-devlink { display:flex; align-items:center; gap:8px; padding:10px 0; border-top:.5px solid #D1D1D6; border-bottom:.5px solid #D1D1D6; flex-wrap:wrap; }
.sf-devlink .sf-link { font:400 16px var(--apple); } .sf-devlink small { color:#8A8A8E; font-size:13px; flex-basis:100%; order:3; margin-top:-6px; } .sf-devlink span { margin-left:auto; color:#C7C7CC; }
.sf-rate { display:flex; gap:22px; align-items:center; margin:6px 0; } .sf-rate > div:first-child { display:flex; flex-direction:column; align-items:center; }
.sf-rate b { font:700 56px/1 var(--apple); color:#3A3A3C; } .sf-rate small { font:600 13px var(--apple); color:#6E6E73; margin-top:4px; }
.sf-bars { flex:1; display:flex; flex-direction:column; gap:3px; } .sf-bars div { display:flex; align-items:center; gap:8px; } .sf-bars span { width:56px; text-align:right; font-size:8px; color:#6E6E73; letter-spacing:.5px; }
.sf-bars i { flex:1; height:3px; border-radius:2px; background:#E5E5EA; } .sf-bars b { display:block; height:100%; border-radius:2px; background:#6E6E73; }
.sf-bars.g span { display:none; } .sf-bars.g i { height:9px; border-radius:5px; } .sf-bars.g b { background:#01875F; border-radius:5px; }
.sf-tabs { position:absolute; z-index:5; left:18px; right:18px; bottom:24px; display:flex; gap:10px; align-items:center; }
.sf-tabpill { flex:1; display:flex; justify-content:space-around; height:62px; border-radius:31px; padding:0 6px; background:rgba(250,250,252,.72); backdrop-filter:blur(20px) saturate(1.8); box-shadow:inset 0 0 0 .5px rgba(255,255,255,.9),0 6px 24px rgba(0,0,0,.14); }
.sf-tabpill span { display:flex; flex-direction:column; align-items:center; justify-content:center; gap:2px; width:72px; color:#1C1C1E; border-radius:26px; margin:5px 0; }
.sf-tabpill span.on { color:#0A84FF; background:rgba(120,120,128,.14); } .sf-tabpill small { font:600 10px var(--apple); }
.sf-tabsearch { width:62px; height:62px; border-radius:50%; display:grid; place-items:center; background:rgba(250,250,252,.72); backdrop-filter:blur(20px); box-shadow:inset 0 0 0 .5px rgba(255,255,255,.9),0 6px 24px rgba(0,0,0,.14); color:#1C1C1E; }
/* iPad */
.sf-ipad { width:1032px; height:1376px; border-radius:44px; box-shadow:0 0 0 18px #1A1A1C,0 0 0 20px #3A3A3E,0 40px 90px rgba(0,0,0,.55); }
.sf-ipad > .sf-scroll { position:absolute; inset:0; }
.sf-itabs { position:absolute; z-index:2; left:50%; top:38px; transform:translateX(-50%); display:flex; gap:2px; padding:4px; border-radius:24px; background:rgba(250,250,252,.62); backdrop-filter:blur(18px) saturate(1.6); box-shadow:inset 0 0 0 .5px rgba(255,255,255,.9),0 4px 18px rgba(0,0,0,.12); }
.sf-itabs span { font:600 15px/38px var(--apple); padding:0 18px; border-radius:19px; color:#1C1C1E; display:flex; align-items:center; } .sf-itabs span.on { background:#fff; color:#0A84FF; box-shadow:0 1px 4px rgba(0,0,0,.08); }
/* Mac */
.sf-mac { width:1280px; height:820px; border-radius:16px; display:flex; box-shadow:0 0 0 .5px rgba(0,0,0,.3),0 40px 100px rgba(0,0,0,.5); }
.sf-mside { width:220px; flex:none; padding:14px 10px; background:#ECECEF; border-right:.5px solid #D4D4D8; display:flex; flex-direction:column; gap:1px; font:400 13px var(--apple); color:#1D1D1F; }
.sf-lights { display:flex; gap:8px; padding:2px 6px 16px; } .sf-lights i { width:12px; height:12px; border-radius:50%; }
.sf-msearch { display:flex; align-items:center; gap:6px; height:28px; padding:0 8px; margin-bottom:10px; border-radius:8px; background:rgba(0,0,0,.06); color:#8A8A8E; }
.sf-mi { display:flex; align-items:center; gap:9px; padding:6px 10px; border-radius:7px; color:#1D1D1F; } .sf-mi svg { color:#0A84FF; } .sf-mi.on { background:rgba(0,0,0,.08); font-weight:600; }
.sf-macct { margin-top:auto; display:flex; align-items:center; gap:9px; padding:8px 10px; border-top:.5px solid #D4D4D8; }
.sf-av { width:24px; height:24px; border-radius:50%; background:#D1D1D6; display:grid; place-items:center; color:#fff; }
/* Windows */
.sf-win { width:1280px; height:820px; border-radius:8px; background:#F3F3F3; font-family:var(--segoe); box-shadow:0 0 0 1px rgba(0,0,0,.2),0 40px 100px rgba(0,0,0,.5); }
.sf-wtb { height:48px; display:flex; align-items:center; gap:10px; padding-left:16px; background:#F3F3F3; position:relative; }
.sf-wlogo { display:grid; grid-template-columns:7px 7px; gap:1px; } .sf-wlogo i { width:7px; height:7px; }
.sf-wname { font:400 12px var(--segoe); color:#1F1F1F; }
.sf-wsearch { position:absolute; left:50%; transform:translateX(-50%); width:480px; height:34px; border-radius:6px; background:#FBFBFB; box-shadow:inset 0 0 0 1px #E5E5E5,inset 0 -1px 0 #8A8A8A; display:flex; align-items:center; justify-content:space-between; padding:0 12px; font:400 13px var(--segoe); color:#5D5D5D; }
.sf-wav { margin-left:auto; width:30px; height:30px; border-radius:50%; background:#E1E1E1; display:grid; place-items:center; color:#5D5D5D; }
.sf-wcaps { display:flex; } .sf-wcaps svg { width:46px; padding:0 16px; color:#1F1F1F; }
.sf-wnav { width:72px; flex:none; display:flex; flex-direction:column; align-items:center; gap:4px; padding:4px 0 12px; }
.sf-wnav div { position:relative; width:64px; height:56px; border-radius:6px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:3px; color:#1F1F1F; }
.sf-wnav small { font:400 11px var(--segoe); } .sf-wnav div.on { background:rgba(0,0,0,.05); } .sf-wnav div.on::before { content:""; position:absolute; left:0; top:18px; width:3px; height:20px; border-radius:2px; background:#005FB8; }
.sf-wnav div.on small { display:none; } .sf-wnav div.on svg { color:#005FB8; }
.sf-wpage { flex:1; position:relative; background:#F9F9F9; border-top-left-radius:8px; box-shadow:inset 0 0 0 1px #E5E5E5; }
.sf-whero { position:absolute; left:0; right:0; top:0; height:676px; overflow:hidden; border-top-left-radius:8px; } .sf-whero img { width:100%; height:100%; object-fit:cover; display:block; }
.sf-whero i { position:absolute; left:0; right:0; bottom:0; height:55%; background:linear-gradient(180deg,rgba(249,249,249,0) 0%,rgba(249,249,249,.85) 65%,#F9F9F9 100%); }
.sf-wbody { position:relative; display:flex; gap:24px; padding:300px 32px 40px; align-items:flex-start; }
.sf-wcard { width:340px; flex:none; padding:24px; border-radius:8px; background:rgba(255,255,255,.88); backdrop-filter:blur(30px); box-shadow:0 0 0 1px rgba(0,0,0,.06),0 8px 24px rgba(0,0,0,.08); }
.sf-wlink { display:block; color:#005FB8; font:400 13px/1.8 var(--segoe); text-decoration:underline; }
.sf-wget { margin-top:16px; height:36px; border-radius:5px; background:#005FB8; color:#fff; display:grid; place-items:center; font:600 14px var(--segoe); box-shadow:inset 0 -1px 0 rgba(0,0,0,.2); }
.sf-wrate { display:flex; align-items:center; gap:6px; margin-top:16px; font:400 14px var(--segoe); } .sf-wrate small { color:#5D5D5D; font-size:12px; } .sf-wsep { width:1px; height:24px; background:#E0E0E0; margin:0 8px; }
.sf-wage { display:inline-grid; place-items:center; width:26px; height:26px; border:1.5px solid #1F1F1F; border-radius:4px; font:700 11px var(--segoe); }
.sf-wcat { display:inline-block; margin-top:14px; padding:3px 10px; border-radius:4px; background:#EDEDED; font:400 12px var(--segoe); }
.sf-wfree { display:block; margin-top:10px; color:#5D5D5D; font:400 12px var(--segoe); }
.sf-wdesc { font:400 13px/1.5 var(--segoe); color:#1F1F1F; margin:14px 0 0; display:-webkit-box; -webkit-line-clamp:4; -webkit-box-orient:vertical; overflow:hidden; }
.sf-wright { flex:1; min-width:0; padding-top:250px; } .sf-wh { font:600 20px var(--segoe); margin:20px 0 12px; color:#1F1F1F; }
.sf-wtxt { font:400 14px/1.55 var(--segoe); color:#1F1F1F; max-width:720px; margin:0; }
.sf-win .sf-rate b { font-family:var(--segoe); font-weight:600; color:#1F1F1F; }
/* Google Play */
.sf-play { width:412px; height:915px; border-radius:42px; font-family:var(--roboto); color:#1F1F1F; box-shadow:0 0 0 10px #1B1D24,0 0 0 12px #3A3D48,0 40px 90px rgba(0,0,0,.55); }
.sf-play.small { width:360px; height:780px; }
.sf-psb { height:40px; display:flex; justify-content:space-between; align-items:center; padding:0 26px; font:500 14px var(--roboto); position:relative; } .sf-psb span:last-child { display:flex; gap:5px; align-items:center; }
.sf-pcam { position:absolute; left:50%; top:12px; width:18px; height:18px; margin-left:-9px; border-radius:50%; background:#111; }
.sf-pbatt { display:inline-block; width:9px; height:15px; border-radius:2px; background:#1F1F1F; }
.sf-pbar { height:52px; display:flex; align-items:center; gap:22px; padding:0 16px; color:#444746; }
.sf-ptitle { display:flex; gap:18px; align-items:center; } .sf-ptitle small { display:block; font:400 12px var(--roboto); color:#444746; margin-top:2px; }
.sf-pname { font:500 22px/1.25 var(--gsans); color:#1F1F1F; } .sf-pdev { display:block; color:#01875F; font:500 14px/1.6 var(--gsans); }
.sf-pstats { display:flex; margin:22px -8px 18px; } .sf-pstats > div { flex:1; display:flex; flex-direction:column; align-items:center; gap:3px; text-align:center; border-right:1px solid #E1E3E1; }
.sf-pstats > div:last-child { border:0; } .sf-pstats b { font:500 14px/20px var(--gsans); display:flex; align-items:center; height:20px; } .sf-pstats small { font:400 12px/1.3 var(--roboto); color:#444746; }
.sf-esrb { display:inline-grid; place-items:center; width:18px; height:18px; border:1.5px solid #1F1F1F; border-radius:3px; font:700 11px var(--roboto); }
.sf-pinstall { height:40px; border-radius:20px; background:#01875F; color:#fff; display:grid; place-items:center; font:500 14px var(--gsans); }
.sf-pmore { display:flex; gap:8px; align-items:center; justify-content:center; margin:14px 0 18px; font:400 12px var(--roboto); color:#444746; }
.sf-pbanner { margin:0 16px; border-radius:16px; overflow:hidden; aspect-ratio:1024/500; } .sf-pbanner img { width:100%; height:100%; display:block; }
.sf-pvid { position:relative; flex:none; height:176px; aspect-ratio:1024/500; border-radius:10px; overflow:hidden; scroll-snap-align:start; } .sf-play.small .sf-pvid { height:150px; }
.sf-pvid img { width:100%; height:100%; display:block; }
.sf-pplay { position:absolute; left:50%; top:50%; width:52px; height:52px; margin:-26px 0 0 -26px; border-radius:50%; background:rgba(0,0,0,.55); display:grid; place-items:center; }
.sf-ph { display:flex; justify-content:space-between; align-items:center; margin:26px 0 8px; font:500 18px var(--gsans); } .sf-ph span { color:#444746; }
.sf-pp { font:400 14px/1.5 var(--roboto); color:#444746; margin:0; }
.sf-pchips { display:flex; gap:8px; margin-top:14px; } .sf-pchips span { border:1px solid #C4C7C5; border-radius:8px; padding:6px 12px; font:500 13px var(--gsans); color:#444746; }
`;
const st = document.createElement('style'); st.textContent = CSS; document.head.append(st);
window.SF = { page: (p, o) => PAGES[p](o) };
})();

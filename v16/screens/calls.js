/* Calls group — replicas of refs "Calls", "Outbound Call – Michael Johnson" / "Live Call", "Transfer Call – Confirmation"
   (App Store 8 variant), "Call Summary" and the App Store 7 "Incoming Call…" card. Class prefix .cl- */
(() => {
const { h, icon, svg, statusBar, header, tabBar, img } = UI;

const CSS = `
.cl-list { position:absolute; left:0; top:167px; width:375px; }
.cl-row { position:relative; height:80px; border-bottom:1px solid #EFF0FE; background:#fff; }
.cl-tile { position:absolute; left:16px; top:16px; width:48px; height:48px; border-radius:12px; background-size:100% 100%; }
.cl-nm { position:absolute; left:72.5px; top:17px; display:flex; align-items:center; gap:6px; font:600 17px/22px var(--sf); letter-spacing:-.1px; white-space:nowrap; }
.cl-sub { position:absolute; left:72.5px; top:44px; font:400 15px/20px var(--sf); color:#444658; white-space:nowrap; }
.cl-row > .cl-info { position:absolute; right:15px; top:28px; width:24px; height:24px; color:#5C5D71; }
.cl-rec { height:22px; padding:0 8px; border-radius:11px; background:#DFE1F8; font:600 12.5px/22px var(--sf); letter-spacing:.4px; color:#171A2B; }
/* tab bar metrics now live in kit/ui.css */
.cl-vmb { width:20px; height:20px; border-radius:50%; background:#171A2B; display:grid; place-items:center; margin-left:2px; }
.cl-vmb .ic { width:15px; height:15px; color:#fff; }

/* live call */
.cl-nav { position:absolute; left:0; top:47px; width:375px; height:84px; background:#fff; }
.cl-nav .cl-back { position:absolute; left:16px; top:30px; width:24px; height:24px; }
.cl-disc { position:absolute; left:52px; top:22px; width:40px; height:40px; border-radius:50%; background-size:100% 100%; }
.cl-nav .cl-t { position:absolute; left:100px; top:19px; font:600 16.5px/22px var(--sf); white-space:nowrap; }
.cl-nav .cl-s { position:absolute; left:100px; top:45px; font:400 14.5px/20px var(--sf); color:#444658; white-space:nowrap; display:flex; align-items:center; gap:6px; }
.cl-emj { font-size:15px; line-height:20px; width:16px; text-align:center; }
.cl-nav .cl-more { position:absolute; left:295px; top:30px; width:24px; height:24px; }
.cl-nav .cl-chat { position:absolute; left:334px; top:30px; width:24px; height:24px; }
.cl-big { position:absolute; left:107.5px; top:216px; width:160px; height:160px; border-radius:50%; background-size:cover; background-position:center; box-shadow:0 0 0 1.5px #E5EAFF; }
.cl-cname { position:absolute; left:0; width:375px; top:393px; text-align:center; font:700 20.5px/26px var(--sf); letter-spacing:-.1px; }
.cl-timer-row { position:absolute; left:0; width:375px; top:429px; display:flex; justify-content:center; align-items:center; gap:8px; }
.cl-timer { font:400 17px/20px var(--sf); font-variant-numeric:tabular-nums; letter-spacing:.3px; }
.cl-recp { height:20px; padding:0 8px; border-radius:10px; background:#DFE1F8; display:flex; align-items:center; gap:4px; font:600 12px/20px var(--sf); letter-spacing:.2px; }
.cl-recp i { width:8px; height:8px; border-radius:50%; background:#B23220; display:block; }
.cl-btn { position:absolute; width:80px; height:80px; margin-left:-40px; margin-top:-40px; border-radius:50%; background:#DFE1F8; display:grid; place-items:center; }
.cl-btn > .ic { width:22px; height:22px; color:#171A2B; }
.cl-btn.cl-dk { background:#171A2B; } .cl-btn.cl-dk > .ic { color:#fff; }
.cl-btn.end { background:#B23220; } .cl-btn.end > .ic { color:#fff; width:34px; height:34px; }
.cl-bl { position:absolute; left:-20px; right:-20px; top:84px; text-align:center; font:400 12.5px/18px var(--sf); color:#444658; }

/* transfer modal */
.cl-dim { position:absolute; left:0; top:0; width:375px; height:812px; background:rgba(23,26,43,.18); z-index:50; }
.cl-modal { position:absolute; left:16px; top:461px; width:343px; height:220px; border-radius:24px; background:#fff; box-shadow:0 12px 40px rgba(38,44,90,.22), 0 2px 8px rgba(38,44,90,.08); z-index:51; }
.cl-mpill { position:absolute; left:76.5px; top:14px; width:190px; height:80px; border-radius:26px; background:#D7FDB7; }
.cl-mav { position:absolute; top:12px; width:56px; height:56px; border-radius:16px; background-size:cover; background-position:center; box-shadow:0 0 0 2px #EEF0FA; }
.cl-mdot { position:absolute; width:16px; height:16px; border-radius:50%; background:#3F8A12; border:3px solid #fff; }
.cl-mpill > .ic { position:absolute; left:80px; top:25px; width:30px; height:30px; color:#3F7D1C; }
.cl-mt { position:absolute; left:0; right:0; top:109px; text-align:center; font:700 21px/28px var(--sf); letter-spacing:-.1px; }
.cl-mb { position:absolute; top:152px; width:150px; height:52px; border-radius:15px; display:grid; place-items:center; font:400 17.5px/1 var(--sf); }
.cl-mb.c { left:16px; background:#DFE1F8; color:#B23220; }
.cl-mb.t { left:177px; background:#3356FF; color:#fff; }

/* call summary */
.cl-sum { position:absolute; left:0; top:0; width:375px; height:1440px; background:#fff; }
.cl-top { position:absolute; left:0; top:0; width:375px; height:76px; background:#000; z-index:30; }
.cl-peek { position:absolute; left:16px; top:54px; width:343px; height:12px; border-radius:10px; background:#8D8FA5; }
.cl-top .sbar .ic { color:#fff; }
.cl-sheet { position:absolute; left:0; top:64px; width:375px; height:14px; border-radius:12px 12px 0 0; background:#fff; }
.cl-sum .cl-x { position:absolute; left:16px; top:105px; width:24px; height:24px; }
.cl-sum .cl-disc { top:97px; }
.cl-sum .cl-t { position:absolute; left:100px; top:94px; font:600 17px/24px var(--sf); white-space:nowrap; }
.cl-sum .cl-s { position:absolute; left:100px; top:120px; font:400 15px/20px var(--sf); color:#444658; display:flex; align-items:center; gap:6px; white-space:nowrap; }
.cl-lisa { width:18px; height:18px; border-radius:50%; flex:none; background: url(assets/lisa-hero.png) -24px -3px / 62px auto no-repeat, linear-gradient(225deg,#7B3FF2 0%,#C2459F 50%,#F2744A 100%); }
.cl-sum .cl-more { position:absolute; left:295px; top:105px; width:24px; height:24px; }
.cl-sum .cl-ph { position:absolute; left:334px; top:105px; width:24px; height:24px; }
.cl-seg { position:absolute; left:16px; top:156px; width:343px; height:49px; border-radius:25px; background:#EFF0FE; }
.cl-seg .on { position:absolute; left:4px; top:4px; width:168px; height:41px; border-radius:21px; background:#fff; }
.cl-seg .lb { position:absolute; top:0; height:49px; width:170px; display:grid; place-items:center; font:500 15.5px/1 var(--sf); color:#171A2B; }
.cl-seg .lb.off { color:#444658; font-weight:400; }
.cl-meta { position:absolute; left:16px; top:233px; font:400 14.5px/20px var(--sf); color:#5C5D71; white-space:nowrap; }
.cl-flow { position:absolute; left:16px; top:270px; display:flex; align-items:center; white-space:nowrap; }
.cl-fc { height:35px; border:1px solid #DFE1F8; border-radius:18px; padding:0 11px 0 5px; display:flex; align-items:center; gap:5px; font:400 14px/1 var(--sf); flex:none; }
.cl-fa { width:21px; display:grid; place-items:center; flex:none; }
.cl-dash { position:absolute; left:16px; width:343px; height:1px; background:repeating-linear-gradient(90deg,#DFE1F8 0 4.5px,transparent 4.5px 8px); }
.cl-h { position:absolute; left:16px; font:700 16.5px/22px var(--sf); letter-spacing:-.1px; }
.cl-bul { position:absolute; left:40px; width:310px; font:400 16px/22px var(--sf); color:#171A2B; }
.cl-bul::before { content:"•"; position:absolute; left:-15px; top:0; color:#444658; }
.cl-feel { position:absolute; top:539px; height:36px; border:1px solid #DFE1F8; border-radius:18px; padding:0 11px 0 9px; display:flex; align-items:center; gap:5px; font:400 14.5px/1 var(--sf); }
.cl-feel b { font-weight:400; font-size:15px; }
.cl-card { position:absolute; left:16px; width:343px; border:1px solid #DFE1F8; border-radius:12px; background:#fff; }
.cl-card > .ic { position:absolute; left:12px; width:24px; height:24px; top:50%; margin-top:-12px; color:#171A2B; }
.cl-card .tx { position:absolute; left:43.5px; right:12px; top:12px; font:400 16px/22px var(--sf); }
.cl-card .lab { color:#444658; }
.cl-card a { display:block; color:#3356FF; text-decoration:underline; text-underline-offset:3px; text-decoration-thickness:1px; margin-top:2px; line-height:22px; }
.cl-pow { position:absolute; left:16px; top:1284px; font:400 14px/20px var(--sf); color:#444658; }
.cl-pow span { background:linear-gradient(90deg,#9A5BDB,#B64FC6); -webkit-background-clip:text; background-clip:text; color:transparent; }
.cl-player { position:absolute; left:0; top:728px; width:375px; height:84px; background:#EFF0FE; z-index:30; }
.cl-pp { position:absolute; left:16px; top:12.5px; width:287px; height:43px; border-radius:22px; background:#fff; }
.cl-pp .t0 { position:absolute; left:12px; top:0; font:400 14px/43px var(--sf); font-variant-numeric:tabular-nums; }
.cl-pp .t1 { position:absolute; right:13px; top:0; font:400 14px/43px var(--sf); font-variant-numeric:tabular-nums; }
.cl-pp .tr { position:absolute; left:49px; width:181px; top:20px; height:4px; border-radius:2px; background:#C4C5DC; }
.cl-pp .fl { position:absolute; left:0; top:0; height:4px; border-radius:2px; background:#3356FF; }
.cl-pp .kn { position:absolute; top:-5px; width:14px; height:14px; margin-left:-7px; border-radius:50%; background:#3356FF; }
.cl-pause { position:absolute; left:311px; top:10px; width:48px; height:48px; border-radius:50%; background:#DFE1F8; display:grid; place-items:center; }
.cl-pause .ic { width:24px; height:24px; color:#3356FF; }

/* incoming card */
.cl-inc { position:absolute; left:0; top:0; width:483px; height:128px; border-radius:40px; background:#fff; box-shadow:0 10px 36px rgba(40,50,110,.16); font-family:var(--sf); color:#171A2B; -webkit-font-smoothing:antialiased; overflow:hidden; }
.cl-inc * { box-sizing:border-box; }
.cl-inc > .ic { position:absolute; left:21px; top:37px; width:52px; height:52px; color:#3F8A1F; }
.cl-inc .l1 { position:absolute; left:88px; top:22px; font:700 20.6px/26px var(--sf); letter-spacing:-.1px; white-space:nowrap; }
.cl-inc .l2 { position:absolute; left:88px; top:53.5px; font:400 18px/24px var(--sf); color:#444658; white-space:nowrap; }
.cl-inc .l3 { position:absolute; left:88px; top:82px; font:400 18px/24px var(--sf); color:#444658; white-space:nowrap; }
.cl-inc .stk { position:absolute; left:376px; top:47.5px; display:flex; }
.cl-inc .stk div { width:33px; height:33px; border-radius:10px; margin-left:-7px; background-size:cover; background-position:center; box-shadow:0 0 0 1.5px #fff; }
.cl-inc .stk div:first-child { margin-left:0; }
`;
if (!document.getElementById('cl-css')) { const st = h('style'); st.id = 'cl-css'; st.textContent = CSS; document.head.append(st); }

const WA = '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#25D366"/><path d="M12 4.6a7.4 7.4 0 0 0-6.4 11.1l-1 3.7 3.8-1A7.4 7.4 0 1 0 12 4.6Z" fill="#fff"/><path d="M12 5.9a6.1 6.1 0 0 0-5.2 9.3l.1.2-.6 2.2 2.3-.6.2.1A6.1 6.1 0 1 0 12 5.9Z" fill="#25D366"/><path d="M9.6 8.6c-.2-.4-.3-.4-.5-.4h-.4c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 1.9s.8 2.2.9 2.3c.1.2 1.6 2.5 3.9 3.4 1.9.8 2.3.6 2.7.6.4 0 1.3-.5 1.5-1.1.2-.5.2-1 .1-1.1l-.4-.3-1.4-.7c-.2-.1-.3-.1-.5.1l-.6.8c-.1.1-.2.1-.4 0-.2-.1-.9-.3-1.6-1-.6-.5-1-1.2-1.1-1.4-.1-.2 0-.3.1-.4l.3-.4.2-.4v-.4l-.7-1.6Z" fill="#fff"/></svg>';
const TAG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><path d="M3.5 5.5v5.2c0 .5.2 1 .6 1.4l7.8 7.8c.8.8 2 .8 2.8 0l5.2-5.2c.8-.8.8-2 0-2.8L12.1 4.1c-.4-.4-.9-.6-1.4-.6H5.5a2 2 0 0 0-2 2Z"/><circle cx="8" cy="8" r="1.3"/></svg>';
const ARR = '<svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><path d="M2 7h10M8 3l4 4-4 4"/></svg>';
const DOTS = '<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="5.5" cy="12" r="1.7"/><circle cx="12" cy="12" r="1.7"/><circle cx="18.5" cy="12" r="1.7"/></svg>';
const HANG = '<svg viewBox="0 0 28 28"><path d="M14 10.2c-4.3 0-8.1 1.3-10 3-.7.6-.9 1.4-.7 2.2l.5 1.9c.2.8 1 1.3 1.8 1.2l3.6-.5c.8-.1 1.4-.8 1.4-1.6v-1.7c1.1-.4 2.2-.5 3.4-.5s2.3.1 3.4.5v1.7c0 .8.6 1.5 1.4 1.6l3.6.5c.8.1 1.6-.4 1.8-1.2l.5-1.9c.2-.8 0-1.6-.7-2.2-1.9-1.7-5.7-3-10-3Z" fill="currentColor"/></svg>';
const INFO = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="9.3" stroke-width="1.5"/><path d="M12 11v5.2" stroke-width="2" stroke-linecap="round"/><circle cx="12" cy="7.7" r="1.15" fill="currentColor" stroke="none"/></svg>';
const place = (e, cls) => { e.classList.add(cls); return e; };

/* ─────────────── Calls list ─────────────── */
const ROWS = [
  { tile: 'call_answered', name: 'Noah Anderson', rec: true, sub: 'Lisa answered · 9:20 am' },
  { tile: 'call_missed_ah', name: 'Ivy Turner', wa: true, vm: true, moon: true, sub: 'No-one answered · 9:14 am' },
  { tile: 'call_dialed', name: 'Jonas Miller', sub: 'Sandy dialed · 8:52 am' },
  { tile: 'call_transfer', name: 'Keisha Morgan', sub: 'Sandy → Andre · 8:47 am' },
  { tile: 'call_hungup', name: 'Barry Hill', sub: 'Caller hung up · 8:31 am' },
  { tile: 'call_missed', name: 'Ravi Chandran', sub: 'No-one answered · 8:15 am' },
  { tile: 'call_failed_ah', name: 'Kevin Lui', moon: true, sub: 'Sandy dialed · Failed · 7:58 am' },
];
function callRow(r) {
  const tile = h('div', 'cl-tile', { backgroundImage: `url(assets/defaults/${r.tile}.png)` });
  const nm = h('div', 'cl-nm', null, r.name);
  if (r.rec) nm.append(h('div', 'cl-rec', null, 'REC'));
  if (r.vm) nm.append(h('div', 'cl-vmb', null, icon('Voice Mail 2|Bold')));
  return h('div', 'cl-row', null, [tile, nm, h('div', 'cl-sub', null, r.sub), place(svg(INFO), 'cl-info')]);
}

window.SCREENS = window.SCREENS || {};
SCREENS.calls = () => {
  const el = h('div', 'scr375');
  const content = h('div', 'cl-list');
  const rows = ROWS.map(r => { const e = callRow(r); content.append(e); return e; });
  el.append(content);
  const hdr = header('Calls', 'bob', ['Missed', 'My calls', 'Voicemails']);
  el.append(hdr, statusBar(), place(tabBar('Calls'), 'cl-tabs'));
  const scrollMax = Math.max(0, 167 + ROWS.length * 81 - (812 - 86));
  return { el, parts: { rows, hdr, content }, scrollMax,
    scroll(y) { content.style.transform = `translateY(${-Math.min(Math.max(y, 0), scrollMax)}px)`; } };
};

/* ─────────────── Live call ─────────────── */
const mmss = s => { s = Math.max(0, Math.floor(s)); return String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0'); };
function liveCall() {
  const el = h('div', 'scr375');
  const nav = h('div', 'cl-nav', null, [
    place(icon('Back 2|Light'), 'cl-back'), h('div', 'cl-disc', { backgroundImage: 'url(assets/defaults/call_disc_out.png)' }),
    h('div', 'cl-t', null, 'Business Call'),
    h('div', 'cl-s', null, [h('span', 'cl-emj', null, '🧘‍♀️'), 'Restore Wellness Clinic']),
    place(svg(DOTS), 'cl-more'), place(icon('Chat 2|Light'), 'cl-chat'),
  ]);
  const av = h('div', 'cl-big', { backgroundImage: img('noah') });
  const timer = h('div', 'cl-timer', null, '01:46');
  const rec = h('div', 'cl-recp', null, ['REC', h('i')]);
  el.append(statusBar(), nav, av, h('div', 'cl-cname', null, 'Noah Anderson'), h('div', 'cl-timer-row', null, [timer, rec]));
  const B = [
    ['speaker', 'Speaker', 'Speaker / Sound On2|Light', 83.5, 594, 'cl-dk'], ['keypad', 'Keypad', 'Dialpad 2|Light', 187.5, 594], ['mute', 'Mute', 'Mute / Microphone off / Record|Light', 291.5, 594],
    ['transfer', 'Transfer', 'Call Transfer|Light', 83.5, 719], ['end', 'End', 'End call|Bold', 187.5, 719, 'end'], ['add', 'Add', 'Add Contact|Light', 291.5, 719],
  ];
  const buttons = {};
  B.forEach(([k, l, ic, x, y, cls]) => { const b = h('div', 'cl-btn' + (cls ? ' ' + cls : ''), { left: x + 'px', top: y + 'px' }, [k === 'end' ? svg(HANG) : icon(ic, k === 'keypad' ? 'width:24px;height:24px' : null), h('div', 'cl-bl', null, l)]); buttons[k] = b; el.append(b); });
  return { el, parts: { avatar: av, timer, rec, buttons, nav }, state(o) { if (o && o.seconds != null) timer.textContent = mmss(o.seconds); } };
}
SCREENS.liveCall = () => liveCall();

/* ─────────────── Transfer confirmation over live call ─────────────── */
SCREENS.transferConfirm = () => {
  const base = liveCall();
  const { el } = base;
  const dim = h('div', 'cl-dim');
  const cancel = h('div', 'cl-mb c', null, 'Cancel');
  const transferNow = h('div', 'cl-mb t', null, 'Transfer Now');
  const pill = h('div', 'cl-mpill', null, [
    h('div', 'cl-mav', { left: '12px', backgroundImage: img('jesse') }),
    icon('Call Transfer|Bold'),
    h('div', 'cl-mav', { left: '122px', backgroundImage: img('alexis') }),
    h('div', 'cl-mdot', { left: '166px', top: '56px' }),
  ]);
  const modal = h('div', 'cl-modal', null, [pill, h('div', 'cl-mt', null, 'Transfer to Alexis'), cancel, transferNow]);
  el.append(dim, modal);
  const set = v => { v = Math.min(1, Math.max(0, v)); modal.style.opacity = v; modal.style.transform = `scale(${0.9 + 0.1 * v})`; dim.style.opacity = v; modal.style.visibility = dim.style.visibility = v > 0 ? 'visible' : 'hidden'; };
  set(1);
  return { el, parts: { ...base.parts, modal, transferNow, cancel, dim },
    state(o) { if (!o) return; base.state(o); if (o.modal != null) set(o.modal); } };
};

/* ─────────────── Call summary (long sheet, 1440pt) ─────────────── */
const BULLETS = [
  'Noah called to book a 60-minute deep-tissue massage.',
  'Prefers a weekday evening appointment after 5 pm.',
  'Asked if his insurance covers the massage.',
];
SCREENS.callSummary = () => {
  const el = h('div', 'scr375');
  const sum = h('div', 'cl-sum');
  const at = (e, top) => { e.style.top = top + 'px'; sum.append(e); return e; };
  sum.append(place(icon('Close|Light'), 'cl-x'), h('div', 'cl-disc', { backgroundImage: 'url(assets/defaults/call_disc_in.png)' }),
    h('div', 'cl-t', null, 'Noah called you'), h('div', 'cl-s', null, [h('div', 'cl-lisa'), 'Lisa answered']),
    place(svg(DOTS), 'cl-more'), place(icon('Call|Light'), 'cl-ph'),
    h('div', 'cl-seg', null, [h('div', 'on'), h('div', 'lb', 'left:4px', 'AI Summary'), h('div', 'lb off', 'left:172px', 'Transcript')]),
    h('div', 'cl-meta', null, 'Inbound called ended at 9:20 am · Duration 2:34'));
  const arrow = () => h('div', 'cl-fa', null, svg(ARR, 'width:14px;height:14px'));
  sum.append(h('div', 'cl-flow', null, [
    h('div', 'cl-fc', null, [icon('Sun / Open|Bold', 'width:22px;height:22px;color:#C08A1E'), 'Start']), arrow(),
    h('div', 'cl-fc', null, [h('div', 'cl-lisa', 'width:20px;height:20px;background-size:69px auto,auto;background-position:-27px -3px,0 0'), 'Lisa answered · 2:34']), arrow(),
    h('div', 'cl-fc', null, [svg(TAG, 'width:20px;height:20px'), 'Sales']),
  ]));
  at(h('div', 'cl-dash'), 320);
  at(h('div', 'cl-h', null, 'Summary'), 337);
  const summaryBullets = [371.5, 427.5, 483].map((t, i) => at(h('div', 'cl-bul', null, BULLETS[i]), t));
  sum.append(h('div', 'cl-feel', 'left:16px', [h('b', null, null, '😊'), 'Happy']), h('div', 'cl-feel', 'left:111px', [h('b', null, null, '👍🏻'), 'Positive']));
  at(h('div', 'cl-dash'), 590);
  at(h('div', 'cl-h', null, 'Lead Capture Info'), 607.5);
  const card = (top, hgt, ic, lab, val, link) => at(h('div', 'cl-card', { height: hgt + 'px' },
    [icon(ic), h('div', 'tx', null, [lab ? h('div', 'lab', null, lab) : '', h('div', null, null, val), h('a', null, null, link)])]), top);
  const leadCards = [
    card(641, 91, 'Contact|Light', 'Name:', 'Noah Anderson', 'Accept Edit'),
    card(744.5, 156, 'Document / Description|Light', 'Reason for Calling:', 'I’d like to book a 60-minute deep-tissue massage on a weekday evening after 5 pm. Does insurance cover it?', 'Create Ticket'),
    card(913, 91, 'Clipboard check / task|Light', 'Preferred callback time:', '6:30 pm · Mar 30, 2026', 'Create Ticket'),
  ];
  at(h('div', 'cl-dash'), 1019);
  at(h('div', 'cl-h', null, 'Follow-up Actions'), 1036.5);
  const followCards = [
    card(1066.5, 90, 'Contact|Light', null, 'Update contact details with the insurance provider as “BlueCross”', 'Accept Edit'),
    card(1165.5, 90, 'Clipboard check / task|Light', null, 'Book a 60-minute deep-tissue massage, weekday after 5 pm.', 'Create Ticket'),
  ];
  at(h('div', 'cl-dash'), 1271);
  sum.append(h('div', 'cl-pow', null, ['Powered by ', h('span', null, null, 'LinkedPhone AI')]));
  el.append(sum);

  const top = h('div', 'cl-top', null, [statusBar(true), h('div', 'cl-peek'), h('div', 'cl-sheet')]);
  const fl = h('div', 'fl'), kn = h('div', 'kn'), t0 = h('div', 't0'), t1 = h('div', 't1');
  const player = h('div', 'cl-player', null, [h('div', 'cl-pp', null, [t0, h('div', 'tr', null, [fl, kn]), t1]), h('div', 'cl-pause', null, icon('Pause|Bold'))]);
  el.append(top, player);
  const DUR = 126, TW = 181;
  const ms = s => Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0');
  const setP = p => { p = Math.min(1, Math.max(0, p)); fl.style.width = (p * TW) + 'px'; kn.style.left = (p * TW) + 'px'; const s = Math.round(p * DUR); t0.textContent = ms(s); t1.textContent = '-' + ms(DUR - s); };
  setP(0.49); t0.textContent = '1:42'; t1.textContent = '-0:24'; // resting frame matches the reference
  const scrollMax = 1440 - 812;
  return { el, parts: { summaryBullets, leadCards, followCards, player, sheet: sum, top }, scrollMax,
    scroll(y) { sum.style.transform = `translateY(${-Math.min(Math.max(y, 0), scrollMax)}px)`; },
    state(o) { if (o && o.progress != null) setP(o.progress); } };
};

/* ─────────────── Incoming call card (App Store 7) — standalone 483×128 ─────────────── */
SCREENS.incomingCard = () => {
  const ic = icon('Ring / Call|Bold');
  const el = h('div', 'cl-inc', null, [ic, h('div', 'l1', null, 'Incoming Call...'), h('div', 'l2', null, 'Noah Anderson'), h('div', 'l3', null, 'Ringing Jesse, Alexis, and Andre'),
    h('div', 'stk', null, ['sophia', 'marcus', 'alexis'].map(n => h('div', null, { backgroundImage: img(n) })))]);
  return { el, parts: { icon: ic } };
};
})();

/* Mobile screens exactly as they appear in the iPhone App Store set (refs/ios_N.jpg).
   375×812 pt, built with the kit (kit/ui.js + ui.css). Class prefix .as- */
(() => {
const { h, icon, svg, statusBar, avatar, header, img } = UI;

const CSS = `
.as-tabs { position:absolute; left:0; bottom:0; width:375px; height:86px; background:#fff; z-index:25; display:flex; padding:0 6px; border-top:1px solid #EFF0FE; }
.as-tabs .tb { flex:1; display:flex; flex-direction:column; align-items:center; padding-top:14px; gap:9px; font:500 12px/1 var(--sf); color:#444658; }
.as-tabs .tb .ic { width:28px; height:28px; color:#444658; }
.as-tabs .tb.on, .as-tabs .tb.on .ic { color:#171A2B; }
.as-list .lrow { height:113px; padding:23px 16px 0; align-items:flex-start !important; gap:10px; }
.as-list .lrow .av { margin-top:10px; }
.as-list .lrow .name { font:700 17px/24px var(--sf); letter-spacing:-.43px; }
.as-list .lrow .when { font:400 15px/24px var(--sf); letter-spacing:-.24px; }
.as-list .lrow .line { font:400 15px/24px var(--sf); letter-spacing:-.24px; display:block; }
.as-list .lrow .line.fx { display:flex; }
.as-list .lrow .clamp2 { line-height:20.5px; margin-top:2px; display:-webkit-box; }
.as-aa .ls-aac .r { font-size:13px; gap:5.5px; }
.as-aa .ls-aac .r .ar { width:15px; height:15px; }
.as-aa .ls-aac .ch { padding:0 5.5px; height:20px; line-height:20px; }
.as-aa .ls-aac .q { font-size:13.2px; padding-right:22px; }
.as-vm { width:26px; height:26px; border-radius:13px; background:#3356FF; display:grid; place-items:center; }
.as-vm .ic { width:18px; height:18px; color:#fff; }
`;
if (!document.getElementById('as-css')) { const st = h('style'); st.id = 'as-css'; st.textContent = CSS; document.head.append(st); }

const TABS4 = [['Inbox', 'inbox'], ['Calls', 'call'], ['Setup', 'setup'], ['Tickets', 'ticket'], ['Contacts', 'contact']];
const tabs4 = (active) => h('div', 'as-tabs', null, TABS4.map(([l, ic]) => h('div', 'tb' + (l === active ? ' on' : ''), null, [UI.tabIcon(ic, l === active), l])));

/* inbox row (same metrics as the calibrated kit inbox) */
function row(r) {
  const right = r.badge || r.vm;
  const body = h('div', 'body', right ? 'padding-right:44px' : r.pr ? `padding-right:${r.pr}px` : null);
  body.append(h('div', 'top', right ? 'margin-right:-44px' : null, [h('div', 'name', null, r.name), h('div', 'when', null, r.when)]));
  if (r.sub) {
    const [ic, txt, miss] = r.sub;
    body.append(h('div', 'line fx', 'gap:6px;align-items:center', [icon(ic, 'width:19px;height:19px;color:' + (miss ? '#DE260C' : '#444658')), txt]));
  }
  (r.lines || []).forEach(l => body.append(h('div', 'line' + (r.clamp ? ' clamp2' : ''), null, l)));
  const e = h('div', 'lrow', r.h ? `height:${r.h}px` : null, [avatar(r.av), body]);
  if (r.badge) e.append(h('div', 'aside', 'transform:translateY(-50%);margin:0', h('div', 'badge', null, String(r.badge))));
  if (r.vm) e.append(h('div', 'aside', 'transform:translateY(-50%);margin:0', h('div', 'as-vm', null, icon('Voice Mail 2|Bold'))));
  return e;
}

const INBOX = [
  { av: { photo: 'sophia' }, name: 'Sophia Bennett', when: '2:34 am', lines: ['Can we schedule a call for Friday to discuss next steps please?'], clamp: true, badge: 2 },
  { av: { photo: 'ethan' }, name: 'Ethan Williams', when: '3:15 am', sub: ['incoming', 'Andre answered'], lines: ['Ethan, I am so glad you called. I’d like to talk about the proposal'] },
  { av: { photo: 'daniela' }, name: 'Daniela Wilson +2 more', when: '4:05 am', lines: ['I’m really excited about this project and I look forward to working with you!'], clamp: true, pr: 30 },
  { av: { photo: 'ivy' }, name: 'Ivy Turner', when: '3:15 am', sub: ['missed', 'Missed call · Voicemail', true], lines: ['“I just left an amazing review for you…'], vm: true, h: 124 },
  { av: { photo: 'michael' }, name: 'Michael Brown', when: '3:15 am', sub: ['outgoing', 'Sandy dialed'], lines: ['“Hi Michael. This is Sandy. I just wanted to follow up'] },
  { av: { photo: 'keisha' }, name: 'Keisha Morgan', when: '2:50 am', lines: ['Thanks so much! See you on Saturday.'] },
  { av: { photo: 'alice' }, name: 'Alice Grossman', when: '2:41 am', sub: ['photo', '3 Photos'], lines: ['Here are the photos from the open house.'], badge: 3 },
  { av: { kind: 'campaign' }, name: 'Spring Tune-Up Special', when: '2:30 am', lines: ['Book your AC tune-up before May 31 and save 20% on parts & labor.'], clamp: true },
];

/* ───── Tickets (slide 5) ───── */
const TCSS = `
.as-tk { position:absolute; left:0; width:375px; height:127px; border-bottom:1px solid #EFF0FE; background:#fff; }
.as-tk .av { position:absolute; left:23.5px; top:38.5px; width:48.5px; height:48.5px; }
.as-tk .t { position:absolute; left:84.7px; right:24px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; letter-spacing:-.3px; }
.as-tk .nm { top:26px; font:400 15.2px/24px var(--sf); letter-spacing:-.2px; }
.as-tk .tm { position:absolute; right:24px; top:26px; font:400 13px/24px var(--sf); letter-spacing:0; color:#444658; }
.as-tk .ti { top:49.5px; font:600 14.4px/24px var(--sf); letter-spacing:-.2px; }
.as-tk .ln { top:73px; font:400 14.9px/24px var(--sf); letter-spacing:-.2px; color:#5C5D71; }
.as-tk .pill { position:absolute; right:52px; top:77.5px; height:17px; padding:0 7px; border-radius:9px; color:#fff; font:700 12px/17px var(--sf); letter-spacing:.6px; }
.as-tk .mini { position:absolute; right:24px; top:76px; width:20px; height:20px; border-radius:50%; background-size:cover; background-position:center; }
`;
if (!document.getElementById('as-tk-css')) { const st = h('style'); st.id = 'as-tk-css'; st.textContent = TCSS; document.head.append(st); }
const PILL = { NEW: '#3356FF', ACTIVE: '#4B8A1E', HOLD: '#5C5D71', CLOSED: '#8D8FA5' };
const TICKETS = [
  { av: 'judith', name: 'Judith Rodriguez', title: 'Needs a copy of her latest invoice', line: 'I’ll work on this asap!', pill: 'NEW', mini: 'jesse' },
  { av: 'jonas', name: 'Jonas Miller', title: 'Jonas called about a new project', line: 'I’ll pick up this request.', pill: 'ACTIVE', mini: 'alexis' },
  { av: 'mjohnson', name: 'Barry Hill', title: 'Payment was declined', line: 'Credit card expired.', pill: 'HOLD', mini: 'raju' },
  { av: 'keisha', name: 'Keisha Morgan', title: 'She needs tax documentation asap', line: 'Emailed it. All set.', pill: 'CLOSED', mini: 'jesse' },
  { av: 'ravi', name: 'Ravi Chandran', title: 'Ravi can’t open the file we sent', line: 'Let me look into this.', mini: 'liamj' },
  { av: 'liam', name: 'Liam Johnson', title: 'AC tune-up before the heat wave', line: 'Booked Tuesday 8am.', pill: 'NEW', mini: 'jesse' },
  { av: 'emma', name: 'Emma Brooks', title: 'Asked about weekend openings', line: 'Sent Saturday slots.', pill: 'ACTIVE', mini: 'alexis' },
];
function ticketRow(r, top = 0) {
  const e = h('div', 'as-tk', { top: top + 'px' }, [avatar({ photo: r.av }), h('div', 't nm', null, r.name), h('div', 'tm', null, '9:20 am'),
    h('div', 't ti', null, r.title), h('div', 't ln', null, r.line), h('div', 'mini', { backgroundImage: img(r.mini) })]);
  if (r.pill) e.append(h('div', 'pill', { background: PILL[r.pill] }, r.pill));
  return e;
}

/* large-title header, wide variant (Tickets / AI Receptionist): 24pt side padding, drawn icons */
const wideHeader = (title, me, { y = 77, titleX = 66.5, meX = 24, size = 29, icons = [251.8, 296, 338.8] } = {}) => {
  const hd = h('div', '', 'position:absolute;left:0;top:47px;width:375px;height:64px;background:#fff;z-index:25');
  const meEl = h('div', '', `position:absolute;left:${meX}px;top:${y - 47 - 16}px;width:32px;height:32px;border-radius:50%;background:${img(me)} center/cover`);
  meEl.append(h('div', '', 'position:absolute;right:-1px;bottom:-1px;width:9px;height:9px;border-radius:50%;background:#3FA71A;border:1.5px solid #fff'));
  hd.append(meEl, h('div', '', `position:absolute;left:${titleX}px;top:${y - 47 - 15}px;font:800 ${size}px/30px var(--sf);letter-spacing:.1px;white-space:nowrap`, title));
  ['search', 'Dialpad 2|Light', 'add'].forEach((n, i) => hd.append(icon(n, `position:absolute;left:${icons[i] - 13}px;top:${y - 47 - 13}px;width:26px;height:26px`)));
  return hd;
};

const M = {};
M.tickets = () => {
  const el = h('div', 'scr375');
  TICKETS.forEach((r, i) => el.append(ticketRow(r, 109.5 + 127 * i)));
  el.append(wideHeader('Tickets', 'bob'), statusBar(), tabs4('Tickets'));
  return { el };
};
M._tickets = TICKETS; M._ticketRow = ticketRow;
M.ticketCard = (i, w = 368.5) => { const e = ticketRow(TICKETS[i]); e.style.cssText += `;left:-1px;top:2.5px;border:0;width:${w}px`; return e; };

M.inbox = () => {
  const el = h('div', 'scr375');
  const list = h('div', 'list as-list', 'top:167.5px');
  const rows = INBOX.map(r => { const e = row(r); list.append(e); return e; });
  el.append(list, header('Inbox', 'bob', ['Unread', 'Team Chats', 'Archived']), statusBar(), tabs4('Inbox'));
  return { el, rows };
};
/* the enlarged Ivy Turner card (slide 3) — its own looser layout */
M.ivyCard = () => {
  const r = INBOX[3];
  const T = (top, kids, st = '') => h('div', '', `position:absolute;left:72.2px;right:16px;top:${top}px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;` + st, kids);
  const a = avatar(r.av); a.style.cssText += ';position:absolute;left:16px;top:35.5px';
  return h('div', '', 'position:absolute;inset:0', [a,
    T(24, r.name, 'font:700 17px/24px var(--sf);letter-spacing:-.43px'),
    h('div', '', 'position:absolute;right:16px;top:24px;font:400 15px/24px var(--sf);letter-spacing:-.24px;color:#444658', r.when),
    T(49.5, [icon('missed', 'width:19px;height:19px;color:#DE260C;vertical-align:-3px;margin-right:6px'), 'Missed call · Voicemail'], 'font:400 15px/24px var(--sf);letter-spacing:-.24px'),
    T(74, r.lines[0], 'font:400 15px/24px var(--sf);letter-spacing:-.24px;right:44px'),
    (() => { const v = h('div', 'as-vm', 'position:absolute;right:16px;top:58px'); v.append(icon('Voice Mail 2|Bold')); return v; })(),
  ]);
};

/* ───── Call Summary sheet (slide 4) ───── */
M.callSummary = () => {
  const el = h('div', 'scr375');
  const sum = h('div', 'cl-sum', 'height:812px');
  const at = (e, top) => { e.style.top = top + 'px'; sum.append(e); return e; };
  const pl = (e, c) => { e.classList.add(c); return e; };
  sum.append(pl(icon('Close|Light'), 'cl-x'), h('div', 'cl-disc', { backgroundImage: 'url(assets/defaults/call_disc_in.png)' }),
    h('div', 'cl-t', null, 'Michael called you'), h('div', 'cl-s', null, 'Alexis answered'),
    pl(svg('<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="5.5" cy="12" r="1.7"/><circle cx="12" cy="12" r="1.7"/><circle cx="18.5" cy="12" r="1.7"/></svg>'), 'cl-more'), pl(icon('Call|Light'), 'cl-ph'));
  at(h('div', 'cl-dash'), 583.5);
  at(h('div', 'cl-h', null, 'Follow-up Actions'), 598.5);
  at(h('div', 'cl-card', 'height:89px', [icon('Clipboard check / task|Light'), h('div', 'tx', null, [h('div', null, null, 'Haircut + beard trim with Jessica on Saturday at 11:30 AM.'), h('a', null, null, 'Create Ticket')])]), 631);
  el.append(sum);
  const top = h('div', 'cl-top', null, [statusBar(true), h('div', 'cl-peek'), h('div', 'cl-sheet')]);
  const player = h('div', 'cl-player', null, [h('div', 'cl-pp', null, [h('div', 't0', null, '1:42'), h('div', 'tr', null, [h('div', 'fl', 'width:88.7px'), h('div', 'kn', 'left:88.7px')]), h('div', 't1', null, '-0:52')]), h('div', 'cl-pause', null, icon('Pause|Bold'))]);
  el.append(top, player);
  return { el };
};
/* the enlarged "Call Summary" card — laid out in output px (1187×977) */
M.summaryCard = () => {
  const P = (css, kids) => h('div', '', 'position:absolute;white-space:nowrap;' + css, kids);
  const bul = (top, lines) => [P(`left:104px;top:${top + 14}px;width:12px;height:12px;border-radius:50%;background:#444658`),
    P(`left:152px;top:${top - 15}px;font:400 52px/72px var(--sf);letter-spacing:.55px;white-space:normal;right:80px`, lines)];
  const pill = (x, w, emo, t) => P(`left:${x}px;top:753px;width:${w}px;height:100px;border:2.5px solid #E3E4F6;border-radius:50px;display:flex;align-items:center;gap:16px;padding-left:28px;font:400 45px/1 var(--sf);letter-spacing:-.4px`, [h('span', '', 'font-size:42px', emo), t]);
  return h('div', '', 'position:absolute;inset:0', [
    P('left:73px;top:128px;font:700 47px/60px var(--sf);letter-spacing:-.6px', 'Call Summary'),
    P('right:74px;top:128px;font:600 36px/60px var(--sf);letter-spacing:-.2px;background:linear-gradient(90deg,#5E6BE8,#B04FD0);-webkit-background-clip:text;background-clip:text;color:transparent', 'LinkedPhone AI'),
    ...bul(270, 'Michael called to book a haircut and beard trim.'),
    ...bul(450, 'Looking for an appointment this Saturday morning.'),
    ...bul(630, 'Confirmed for Saturday at 11:30.'),
    pill(71, 257, '😊', 'Happy'), pill(353, 285, '👍🏻', 'Positive'),
  ]);
};

/* ───── Dark live call (slide 1) ───── */
const HANG = '<svg viewBox="0 0 28 28"><path d="M14 10.2c-4.3 0-8.1 1.3-10 3-.7.6-.9 1.4-.7 2.2l.5 1.9c.2.8 1 1.3 1.8 1.2l3.6-.5c.8-.1 1.4-.8 1.4-1.6v-1.7c1.1-.4 2.2-.5 3.4-.5s2.3.1 3.4.5v1.7c0 .8.6 1.5 1.4 1.6l3.6.5c.8.1 1.6-.4 1.8-1.2l.5-1.9c.2-.8 0-1.6-.7-2.2-1.9-1.7-5.7-3-10-3Z" fill="currentColor"/></svg>';
M.liveDark = () => {
  const el = h('div', 'scr375', 'background:#000');
  el.append(h('div', '', 'position:absolute;left:0;top:0;width:375px;height:200px;background:linear-gradient(180deg,#000 0%,#000 40%,#141622 100%)'));
  const sb = statusBar(true); sb.style.background = 'transparent'; sb.querySelectorAll('.ic').forEach(i => i.style.color = '#fff'); el.append(sb);
  el.append(h('div', 'cl-big', { left: '108px', top: '250px', width: '159px', height: '159px', backgroundImage: img('noah'), boxShadow: '0 0 0 1.5px #2A2C3E' }));
  el.append(h('div', '', 'position:absolute;left:0;width:375px;top:427px;text-align:center;font:700 20.5px/26px var(--sf);letter-spacing:-.2px;color:#fff', 'Noah Anderson'));
  el.append(h('div', '', 'position:absolute;left:0;width:375px;top:463px;text-align:center;font:400 16.5px/20px var(--sf);font-variant-numeric:tabular-nums;color:#fff', '01:46'));
  [['Speaker / Sound On2|Light', 83, 581.5], ['Dialpad 2|Light', 187.5, 581.5], ['Mute / Microphone off / Record|Light', 291.5, 581.5],
   ['Call Transfer|Light', 83, 693], [null, 187.5, 693], ['Add Contact|Light', 291.5, 693]].forEach(([ic, x, y]) => {
    const b = h('div', 'cl-btn', `left:${x}px;top:${y}px;width:79px;height:79px;margin:-39.5px 0 0 -39.5px;background:${ic ? '#2E3042' : '#F06650'}`,
      [ic ? icon(ic, 'width:24px;height:24px;color:#fff') : svg(HANG, 'width:34px;height:34px;color:#000')]);
    el.append(b);
  });
  return { el };
};
/* Business Caller ID banner (slide 1) — output px 1157×330 */
const SHIELD = `<svg viewBox="0 0 220 258"><defs><linearGradient id="shg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2D4BF0"/><stop offset="1" stop-color="#0B1FB4"/></linearGradient></defs>
<path d="M110 4 L212 38 V132 C212 190 168 232 110 254 C52 232 8 190 8 132 V38 Z" fill="url(#shg)" stroke="#5670FF" stroke-width="3"/></svg>`;
M.callerIdBanner = () => {
  const sh = h('div', '', 'position:absolute;left:66px;top:34px;width:220px;height:258px;transform:scale(1.06);transform-origin:0 0;filter:drop-shadow(0 0 22px rgba(60,90,255,.55))');
  sh.innerHTML = SHIELD;
  sh.append(h('div', '', 'position:absolute;left:0;right:0;top:44px;text-align:center;color:#fff;font:700 31px/40px var(--sf);letter-spacing:.4px', ['Protect', h('br'), 'Your', h('br'), 'Personal', h('br'), 'Number']));
  return h('div', '', 'position:absolute;inset:0', [sh,
    h('div', '', 'position:absolute;left:362px;top:80px;font:700 74.5px/90px var(--sf);letter-spacing:-.3px;color:#fff;white-space:nowrap', 'Business Caller ID'),
    h('div', '', 'position:absolute;left:372px;top:186px;font:400 49px/64px var(--sf);letter-spacing:.2px;color:#C9CAE0;white-space:nowrap;display:flex;gap:30px;align-items:center', [h('span', '', 'font-size:56px', '🧘🏻‍♀️'), 'Restore Wellness Clinic']),
  ]);
};

/* ───── AI Receptionist (slide 2) = kit Setup page with App Store content ───── */
M.receptionist = () => {
  const s = SCREENS.setup();
  const el = s.el;
  el.querySelector('.hdr').replaceWith(wideHeader('AI Receptionist', 'bob', { y: 82, meX: 17, titleX: 57, size: 24, icons: [273, 310, 347] }));
  el.querySelector('.ls-biz .emo').textContent = '🏡';
  el.querySelector('.ls-biz .nm').textContent = 'Premier Real Estate';
  el.querySelector('.ls-chatbtn')?.remove();
  el.querySelector('.ls-biz').style.top = '295px';
  el.querySelector('.tabs')?.replaceWith(tabs4('Setup'));
  return { el };
};
/* "Lisa's Jobs" card — output px 1187×897 */
M.lisaJobs = () => {
  const P = (css, kids) => h('div', '', 'position:absolute;white-space:nowrap;' + css, kids);
  const circ = (cy, ic) => P(`left:71.5px;top:${cy - 70}px;width:140px;height:140px;border-radius:50%;background:radial-gradient(circle at 50% 35%,#D9F8C2 0%,#B5E68E 100%);box-shadow:inset 0 0 0 3px #94D16A;display:grid;place-items:center`, icon(ic, 'width:70px;height:70px;color:#171A2B'));
  const row = (cy, ic, t, sep) => [circ(cy, ic), P(`left:250px;top:${cy - 32}px;font:600 42.4px/64px var(--sf);letter-spacing:-.3px`, t),
    UI.svg('<svg viewBox="0 0 24 24"><path d="M9.5 5.5 16 12l-6.5 6.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>', `position:absolute;right:71px;top:${cy - 30}px;width:60px;height:60px`),
    sep ? P(`left:247px;right:72px;top:${cy + 108}px;height:2.5px;background:#ECEDF8`) : ''];
  const dash = (y0, y1) => P(`left:139px;top:${y0}px;width:3px;height:${y1 - y0}px;background:repeating-linear-gradient(180deg,#C9CBE0 0 8px,transparent 8px 16px)`);
  return h('div', '', 'position:absolute;inset:0', [
    dash(213, 250), dash(390, 468), dash(608, 685),
    P('left:71.5px;top:73px;width:140px;height:140px;border-radius:50%;background:url(assets/defaults/ls-lisa-answers.png) center/cover'),
    P('left:250px;top:111px;font:700 48px/64px var(--sf);letter-spacing:-.4px', 'Lisa’s Jobs'),
    P('right:71px;top:84px;width:312px;height:115px;border-radius:58px;box-shadow:inset 0 0 0 3px #E3E4F6;display:flex;align-items:center;gap:26px;padding-left:42px;font:500 43px/1 var(--sf)', [icon('Play|Light', 'width:62px;height:62px;color:#3356FF'), 'Preview']),
    ...row(320, 'Incoming Call|Light', 'Answer Calls', true), ...row(537.7, 'Group|Light', 'Transfer Calls', true), ...row(755, 'text ai |Other', 'Capture Contact Details'),
  ]);
};

/* ───── Auto Attendant (slide 6) = kit page with the App Store large-title header ───── */
M.autoAttendant = (opts = {}) => {
  const s = SCREENS.autoAttendant();
  const el = s.el; el.classList.add('as-aa');
  
  el.querySelector('.nav').replaceWith(h('div', '', 'position:absolute;left:0;top:47px;width:375px;height:64px;background:#fff;z-index:25', [
    h('div', '', 'position:absolute;left:9.7px;top:3.7px;width:60.8px;height:50.7px;background:url(assets/aa-robot.png) 0 0/100% 100%'),
    h('div', '', 'position:absolute;left:70px;top:20px;font:800 27.8px/30px var(--sf);letter-spacing:.1px;white-space:nowrap', 'Auto Attendant'),
  ]));
  // App Store layout: no hint line under the hours, tighter card stack (piecewise remap measured from ios_6)
  const top = s.parts.top; top.style.top = '130px'; top.style.height = '124.5px';
  top.querySelector('.sub')?.remove();
  top.querySelector('.hrs').style.top = '91.5px'; top.querySelector('.cal').style.top = '90.5px'; // icon centred on the hours row
  top.querySelector('.fade').style.height = '48.5px';
  const MAP = [[299, 290.2], [363.5, 351], [510.5, 497.9], [637.5, 616.1], [765.5, 737.9]];
  const f = (y) => { if (y <= MAP[0][0]) return y + (MAP[0][1] - MAP[0][0]);
    for (let i = 1; i < MAP.length; i++) if (y <= MAP[i][0]) { const [a, A] = MAP[i - 1], [b, B] = MAP[i]; return A + (y - a) * (B - A) / (b - a); }
    return y + (MAP[MAP.length - 1][1] - MAP[MAP.length - 1][0]); };
  [...s.parts.content.children].forEach(c => { if (c === top || !c.style.top) return; const y = parseFloat(c.style.top);
    if (c.classList.contains('ls-tl')) { const y2 = y + parseFloat(c.style.height); c.style.top = f(y) + 'px'; c.style.height = (f(y2) - f(y)) + 'px'; } else c.style.top = f(y) + 'px'; });
  const [, hrs, cpa, tax] = s.parts.cards;
  hrs.querySelectorAll('.ch').forEach(c => { if (c.textContent === 'Autoplay Info') c.textContent = 'Autoplay'; });
  [[cpa, ['jesse', 'jonas', 'ravi']], [tax, ['priya', 'alice']]].forEach(([c, ppl]) => {
    c.querySelectorAll('.ch').forEach(x => { if (/users/.test(x.textContent)) x.remove(); });
    const a = c.querySelector('.ls-avs'); a.innerHTML = ''; ppl.forEach(n => a.append(h('span', null, { backgroundImage: img(n) })));
  });
  if (opts.y != null) s.parts.content.style.transform = `translateY(${opts.y}px)`;
  return s;
};

M.introCard = (w = 340) => {
  const c = h('div', 'ls-aac', `position:absolute;left:0;top:0;width:${w}px;border:0;padding:21px 10px 0 21.3px;background:transparent`, [
    h('div', 't', 'font-size:15.3px', 'Intro Greeting'),
    h('div', 'r', 'font-size:12.2px', ['Start', icon('Right Arrow 1|Light', 'width:16px;height:16px;margin:0 1px'), h('span', 'ch', null, 'Autoplay')]),
    h('div', 'q', 'white-space:normal;margin-top:2.5px;font-size:11.6px;line-height:16.5px;padding-right:0;max-width:' + (w - 70) + 'px', '“Thanks for calling Summit. For our CPA Team, please press 1. For our tax team, press 2.”')]);
  return h('div', 'as-aa', 'position:absolute;inset:0', c);
};

/* ───── Team Members (slide 7) ───── */
const TM = [
  { av: 'jesse', name: 'Jesse Di Lucca', admin: true, ph: '+1 (971) 567-1234', d: 'Sales · Support', st: '#3F8A12' },
  { av: 'alexis', name: 'Alexis Johnson', ph: '+1 (971) 567-9352', d: 'Billing', st: '#C0392B' },
  { av: 'sandy', name: 'Sandy Mehta', ph: '+1 (202) 555-0832', d: 'After Hours', st: '#3F8A12' },
  { av: 'bob', name: 'Bob Hart', ph: '+1 (971) 555-1212', d: 'Owner', st: '#3F8A12' },
  { av: 'metickets', name: 'Quincy Hayes', ph: '+1 (202) 555-0199', d: 'Orders · After Hours', st: '#74768A' },
  { av: 'liamj', name: 'Andre Collins', ph: '+1 (202) 555-0456', d: 'Sales · Support', st: '#C0392B' },
  { av: 'priya', name: 'Natasha Murphy', ph: '+1 (202) 555-0311', d: 'Support', st: '#3F8A12' },
  { av: 'raju', name: 'Krishna Patel', ph: '+1 (202) 555-0377', d: 'Orders', st: '#3F8A12' },
  { av: 'marcus', name: 'Marcus Reed', ph: '+1 (202) 555-0418', d: 'Sales', st: '#74768A' },
];
const CHEV = '<svg viewBox="0 0 24 24"><path d="M9.5 5.5 16 12l-6.5 6.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
M.chev = (st) => svg(CHEV, st);
M.team = (opts = {}) => {
  const el = h('div', 'scr375'); el.dataset.team = '';
  const ring = opts.ringing || [];
  const T = (top, css, kids) => h('div', '', `position:absolute;left:76.8px;top:${top}px;white-space:nowrap;display:flex;align-items:center;gap:6px;` + css, kids);
  TM.forEach((r, i) => {
    const y = 168.8 + 99.8 * i;
    const a = avatar({ photo: r.av }); a.style.cssText += ';position:absolute;left:16.6px;top:26.5px;width:47.5px;height:47.5px';
    const row = h('div', '', `position:absolute;left:0;top:${y}px;width:375px;height:100.4px;border-bottom:1px solid #EFF0FE;background:#fff`, [a,
      h('div', '', `position:absolute;left:56.5px;top:65.5px;width:11px;height:11px;border-radius:50%;background:${r.st};box-shadow:0 0 0 2px #fff`),
      T(16.6, 'font:700 17px/24px var(--sf);letter-spacing:-.43px', [r.name, r.admin ? h('span', '', 'height:21px;padding:0 8.5px;border-radius:11px;background:#171A2B;color:#fff;font:600 12.5px/21px var(--sf);letter-spacing:.5px;margin-left:3px', 'ADMIN') : '']),
      T(41, 'font:400 15px/24px var(--sf);letter-spacing:-.24px;color:#444658;gap:5px', [h('span', '', 'font-size:13px', '📱'), r.ph]),
      T(63.5, 'font:400 15px/24px var(--sf);letter-spacing:-.24px;color:#5C5D71', r.d),
      M.chev('position:absolute;left:334px;top:38px;width:24px;height:24px')]);
    if (ring.includes(i)) { row.style.background = '#F3FDEB';
      row.append(h('div', '', 'position:absolute;left:258px;top:36px;height:26px;padding:0 10px 0 8px;border-radius:13px;background:#D7FDB7;box-shadow:inset 0 0 0 1px #9AD86C;display:flex;align-items:center;gap:5px;font:500 13px/1 var(--sf);color:#2E6A10', [icon('Ring / Call|Bold', 'width:15px;height:15px;color:#3F8A1F'), 'Ringing'])); }
    el.append(row);
  });
  const chips = h('div', '', 'position:absolute;left:0;top:111px;width:375px;height:57px;background:#fff;z-index:24;display:flex;gap:6px;padding:0 16.6px;white-space:nowrap;overflow:hidden;align-items:flex-start;padding-top:0;-webkit-mask-image:linear-gradient(90deg,#000 82%,transparent 99%);mask-image:linear-gradient(90deg,#000 82%,transparent 99%)',
    ['Sales', 'Orders', 'Support', 'After Hours', 'Billing'].map(t => h('div', 'chip', 'height:39.5px;font-size:15.3px;padding:0 14px;flex:none', t)));
  el.append(chips, h('div', 'nav', 'height:64px', [M.chev('width:26px;height:26px;transform:scaleX(-1);margin-left:-1px'), h('div', 'mid', 'font:700 19px/1 var(--sf);letter-spacing:-.2px', 'Team Members'), icon('Add|Light', 'width:26px;height:26px')]), statusBar());
  return { el };
};
M.incomingTeam = () => {
  const e = SCREENS.incomingCard().el; e.dataset.team = '';
  e.style.boxShadow = 'none'; e.style.borderRadius = '0'; e.style.background = 'transparent';
  e.querySelector('.l2').textContent = '+1 (202) 555-0123';
  e.querySelector('.l3').textContent = 'Ringing Jesse, Alexis, and Andre';
  e.querySelectorAll('.stk div').forEach((d, i) => d.style.backgroundImage = img(['jesse', 'alexis', 'liamj'][i]));
  return e;
};

/* ───── Live call (slide 8) = kit live call, App Store styling ───── */
const TOPS = { '.cl-big': 216, '.cl-cname': 393, '.cl-timer-row': 429 };
const getComputedStyleTop = (q) => TOPS[q];
M.liveLight = () => {
  const s = SCREENS.liveCall();
  s.el.querySelectorAll('.cl-bl').forEach(b => b.remove());
  s.el.querySelector('.cl-dk')?.classList.remove('cl-dk');
  ['.cl-big', '.cl-cname', '.cl-timer-row'].forEach(q => { const e = s.el.querySelector(q); e.style.top = (parseFloat(getComputedStyleTop(q)) - 56) + 'px'; });
  ['speaker', 'keypad', 'mute'].forEach(k => s.parts.buttons[k].style.top = '619px');
  Object.values(s.parts.buttons).forEach(b => { const i = b.firstChild; i.style.width = i.style.height = b.classList.contains('end') ? '40px' : '28px'; });
  const em = s.el.querySelector('.cl-emj'); em.style.fontSize = '20px'; em.style.width = '22px';
  return s;
};
/* Transfer confirmation card — output px 890×672 */
M.transferCard = () => {
  const P = (css, kids) => h('div', '', 'position:absolute;' + css, kids);
  return P('inset:0', [
    P('left:174px;top:39px;width:547px;height:241px;border-radius:100px;background:#D7FDB7'),
    P(`left:209px;top:78px;width:166px;height:165px;border-radius:50px;background:${img('jesse')} center/cover;box-shadow:0 0 0 4px #EEF0FA`),
    P(`left:519px;top:78px;width:166px;height:165px;border-radius:50px;background:${img('alexis')} center/cover;box-shadow:0 0 0 4px #EEF0FA`),
    icon('Call Transfer|Bold', 'position:absolute;left:400px;top:112px;width:96px;height:96px;color:#3F7D1C'),
    P('left:651px;top:210px;width:40px;height:40px;border-radius:50%;background:#3F8A12;box-shadow:0 0 0 7px #fff'),
    P('left:0;right:0;top:352px;text-align:center;font:700 55.5px/76px var(--sf);letter-spacing:-.4px;white-space:nowrap', 'Transfer to Alexis'),
    P('left:46px;top:496px;width:383px;height:144px;border-radius:40px;background:#DFE1F8;color:#B23220;display:grid;place-items:center;font:400 48px/1 var(--sf)', 'Cancel'),
    P('left:464px;top:496px;width:385px;height:144px;border-radius:40px;background:#3356FF;color:#fff;display:grid;place-items:center;font:400 48px/1 var(--sf)', 'Transfer Now'),
  ]);
};

/* ───── Business texting (slide 9) ───── */
M.texting = () => {
  const el = h('div', 'scr375');
  const P = (css, kids) => h('div', '', 'position:absolute;' + css, kids);
  // incoming photo bubble (photo runs up under the nav)
  el.append(P('left:16px;top:60px;width:303px;height:228px;border-radius:16px;background:#F0F0F0'),
    P('left:19.3px;top:63px;width:293.3px;height:155.7px;border-radius:10px;background:url(assets/photos/flowers.png) center 78%/cover'),
    P('left:24px;top:226px;font:400 17px/24px var(--sf);letter-spacing:-.3px;white-space:nowrap', 'What’s the status on my order?'),
    P('left:24px;top:256px;font:400 15px/22px var(--sf);letter-spacing:-.2px;color:#444658;white-space:nowrap', 'Kevin · 8:30 pm'));
  el.append(P('left:0;top:111px;width:375px;height:10px;background:#fff;z-index:20'),
    P('left:141px;top:130.7px;height:23px;padding:0 9px;border-radius:9px;background:#EFF0FE;border:1px solid #E3E5FA;box-shadow:0 2px 6px rgba(23,26,43,.08);font:400 15px/21px var(--sf);white-space:nowrap;z-index:5', 'Oct 1, 2026'));
  // keyboard (no predictive bar, as in the store shot) under the composer
  el.append(h('div', 'ms-kb', 'position:absolute;left:0;top:476px', h('div', 'ret', null, 'return')), P('left:0;top:500px;width:375px;height:24px;background:#D0D5DB'));
  // composer
  el.append(P('left:0;top:405px;width:375px;height:95px;background:#fff'),
    UI.svg('<svg viewBox="0 0 24 24"><path d="M12 4.5v15M4.5 12h15" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>', 'position:absolute;left:15.6px;top:454.6px;width:24px;height:24px'),
    P('left:49px;top:419.9px;width:264.7px;height:68.8px;border:1.5px solid #171A2B;border-radius:18px;padding:11px 12px 0 11.5px;font:500 16.5px/22px var(--sf);letter-spacing:-.2px', ['We’ll have them delivered by noon today. ', h('span', '', 'font-size:15px', '💐')]),
    P('left:323px;top:449px;width:35.5px;height:35.5px;border-radius:11px;background:#3356FF;display:grid;place-items:center', icon('Send|Bold', 'width:20px;height:20px;color:#fff')));
  // nav
  el.append(P('left:0;top:47px;width:375px;height:64px;background:#fff;z-index:25', [
    M.chev('position:absolute;left:15px;top:26px;width:26px;height:26px;transform:scaleX(-1)'),
    P(`left:53.1px;top:20.2px;width:37.7px;height:37.7px;border-radius:11px;background:${img('kevin')} center/cover`),
    P('left:100.5px;top:27px;font:700 17px/24px var(--sf);letter-spacing:-.4px', 'Kevin Lui'),
    UI.svg('<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="5.5" cy="12" r="1.7"/><circle cx="12" cy="12" r="1.7"/><circle cx="18.5" cy="12" r="1.7"/></svg>', 'position:absolute;left:294px;top:27px;width:24px;height:24px'),
    icon('Call|Light', 'position:absolute;left:334px;top:27px;width:24px;height:24px')]));
  el.append(statusBar());
  return { el };
};
/* AI rewrite pills — each its own white pill, spanning the slide (output px) */
M.rewritePills = () => {
  const L = [['Rewrite', -38, 255], ['Longer', 246, 243], ['Friendly', 518, 272], ['Formal', 816, 244], ['Apologize', 1088, 330]];
  return L.map(([t, x, w]) => h('div', '', `position:absolute;left:${x}px;top:1348px;width:${w}px;height:170px;border-radius:85px;background:#fff;box-shadow:0 0 0 2.5px #E5E6FA,0 24px 60px rgba(52,62,130,.14),0 6px 18px rgba(52,62,130,.07);display:grid;place-items:center;font:500 49px/1 var(--sf);letter-spacing:-.3px`,
    h('span', 'ms-grad', t === 'Apologize' ? 'margin-left:-30px;justify-self:start;padding-left:46px' : null, t)));
};

/* ───── Profile / multiple numbers (slide 10) ───── */
const SPARK = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14.6' height='14.6' viewBox='0 0 14.6 14.6'%3E%3Cpath d='M7.3 3.6 8 6.6 11 7.3 8 8 7.3 11 6.6 8 3.6 7.3 6.6 6.6Z' fill='%23E2E4F8'/%3E%3C/svg%3E\")";
M.profileMulti = () => {
  const el = h('div', 'scr375');
  const P = (css, kids) => h('div', '', 'position:absolute;' + css, kids);
  el.append(P('inset:0;background:#000'), P('left:16px;top:54px;width:343px;height:20px;border-radius:10px 10px 0 0;background:#8D8FA5'));
  const sh = P('left:0;top:64px;width:375px;height:760px;background:#fff;border-radius:14px 14px 0 0;overflow:hidden');
  sh.append(
    P(`left:0;top:60px;width:375px;height:122px;background:${SPARK} 3px 0/14.6px 14.6px;-webkit-mask:linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent),linear-gradient(180deg,#000 60%,transparent);-webkit-mask-composite:source-in`),
    icon('Close|Light', 'position:absolute;left:16px;top:34px;width:24px;height:24px'),
    UI.svg('<svg viewBox="0 0 100 100"><path d="M38.2 61.8h-7.8a7.8 7.8 0 1 0 7.8 7.8Zm39.2-23.9a15.3 15.3 0 0 0-30.5 0v15.3h15.2c8.4 0 15.3-6.9 15.3-15.3Zm8.6 0c0 13.2-10.7 23.9-23.9 23.9H46.8v7.8a16.4 16.4 0 1 1-16.4-16.4h7.8V37.9a23.9 23.9 0 0 1 47.8 0Z" fill="#3356FF"/></svg>', 'position:absolute;left:331px;top:31px;width:30px;height:30px'),
    P(`left:147.5px;top:70px;width:80px;height:80px;border-radius:50%;background:${img('bob')} center 30%/cover,linear-gradient(#F4D4EE,#F0CDEB);box-shadow:0 0 0 2px #EFE5F6`),
    P('left:0;right:0;top:158px;display:flex;justify-content:center;align-items:center;gap:4px;font:700 20.5px/28px var(--sf);letter-spacing:-.3px;padding-left:2px', ['Bob Hart', M.chev('width:22px;height:22px;color:#171A2B')]),
    P('left:151px;top:191px;width:73px;height:26px;border-radius:13px;background:#D8FDB7;box-shadow:inset 0 0 0 1px #9AD86C;display:flex;align-items:center;gap:5px;padding-left:9px;font:400 14px/1 var(--sf)', ['Online', P('position:relative;width:9px;height:9px;border-radius:50%;background:#3F8A12;box-shadow:0 0 0 2px #fff')]),
  );
  const row = (top, ic, a, b, sep) => P(`left:16px;top:${top}px;width:343px;height:89px`, [icon(ic, 'position:absolute;left:0;top:30px;width:24px;height:24px'),
    P('left:32.5px;top:17px;font:600 14px/22px var(--sf);white-space:nowrap', a), P('left:32.5px;top:41px;font:400 14px/20px var(--sf);color:#444658;white-space:nowrap', b),
    M.chev('position:absolute;right:0;top:30px;width:24px;height:24px;color:#444658'), sep ? P('left:0;right:0;top:89px;height:1px;background:#E3E4F6') : '']);
  sh.append(row(575.5, 'Support|Light', 'Team', '4 members', true), row(664.5, 'IVR Robot Auto Attendant|Light', 'Auto Attendant', 'Greetings & call flows'));
  el.append(sh, (() => { const b = statusBar(true); b.style.background = 'transparent'; b.querySelectorAll('.ic').forEach(i => i.style.color = '#fff'); return b; })());
  return { el };
};
/* business number card — output px */
M.numberCard = (emo, num, name) => h('div', '', 'position:absolute;inset:0', [
  h('div', '', 'position:absolute;left:var(--tx);top:61px;width:225px;height:226px;border-radius:52px;background:#fff;display:grid;place-items:center;font-size:150px;line-height:1', emo),
  h('div', '', 'position:absolute;left:var(--nx);top:89px;font:700 61px/80px var(--sf);letter-spacing:-.2px;white-space:nowrap', num),
  h('div', '', 'position:absolute;left:var(--nx);top:186px;font:400 60.5px/80px var(--sf);letter-spacing:-.2px;color:#444658;white-space:nowrap', name)]);

/* AI suggestion chips as one tidy, centred group (rows = 1 or 2). Output px; f scales. */
M.suggestRow = (f, cx, y, rows = 1) => {
  const T = ['Rewrite', 'Longer', 'Friendly', 'Formal', 'Apologize'];
  const g = 22 * f;
  const mk = (t, i) => h('div', '', `display:flex;align-items:center;justify-content:center;width:${330 * f}px;gap:${14 * f}px;height:${128 * f}px;padding:0 ${20 * f}px;border-radius:${64 * f}px;background:#fff;` +
    `box-shadow:0 0 0 ${2.5 * f}px #E5E6FA,0 ${22 * f}px ${56 * f}px rgba(52,62,130,.14),0 ${6 * f}px ${16 * f}px rgba(52,62,130,.06);font:500 ${46 * f}px/1 var(--sf);letter-spacing:-.3px;white-space:nowrap`,
    [i === 0 ? icon('Pen / AI / Generate / Edit|Light', `width:${50 * f}px;height:${50 * f}px;color:#6655E4`) : '', h('span', 'ms-grad', null, t)]);
  const groups = rows === 2 ? [T.slice(0, 3), T.slice(3)] : [T];
  let i = 0;
  const wrap = h('div', '', `position:absolute;left:${cx}px;top:${y}px;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:${g}px`,
    groups.map(gr => h('div', '', `display:flex;gap:${g}px`, gr.map(t => mk(t, i++)))));
  return wrap;
};

window.MS = M;
})();

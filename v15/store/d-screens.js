/* Desktop / iPad web-UI compositions, built from the desktop kit (.dk-*) at any size.
   Responsive like the product: rail 72pt · list column · conversation/detail pane · optional third details pane.
   DS.<name>({ W, H, three }) → { el } where el is W×H pt. */
(() => {
const { h, icon, svg, img, avatar } = UI;
const DEF = (k) => `url(assets/defaults/${k}.png)`;
const CHEV = '<svg viewBox="0 0 24 24"><path d="M9.5 5.5 16 12l-6.5 6.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const ADD = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><rect x="3.75" y="3.75" width="16.5" height="16.5" rx="4.5"/><path d="M12 8.25v7.5M8.25 12h7.5"/></svg>';
const INFO_T = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"><circle cx="12" cy="12" r="8.6"/><path d="M12 11v5"/><circle cx="12" cy="8" r=".55" fill="currentColor"/></svg>';
const I = (n, s) => n === 'chev' ? svg(CHEV, s) : icon(n, s);
const P = (css, kids) => h('div', '', 'position:absolute;' + css, kids);
const LOGO = '<svg viewBox="0 0 32 32"><g fill="#3356FF"><circle cx="7" cy="7" r="3.4"/><circle cx="16" cy="7" r="3.4"/><circle cx="25" cy="7" r="3.4"/><circle cx="7" cy="16" r="3.4"/><circle cx="16" cy="16" r="3.4"/><circle cx="25" cy="16" r="3.4"/><circle cx="7" cy="25" r="3.4"/><circle cx="16" cy="25" r="3.4"/><circle cx="25" cy="25" r="3.4"/></g><g stroke="#3356FF" stroke-width="2.2" stroke-linecap="round"><path d="M14 9 9 14M23 9l-5 5M23 18l-5 5"/></g></svg>';
const TAGO = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><path d="M3.5 5.5v5.2c0 .5.2 1 .6 1.4l7.8 7.8c.8.8 2 .8 2.8 0l5.2-5.2c.8-.8.8-2 0-2.8L12.1 4.1c-.4-.4-.9-.6-1.4-.6H5.5a2 2 0 0 0-2 2Z"/><circle cx="8" cy="8" r="1.3"/></svg>';
const PRIO = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="12" cy="12" r="8.8"/><path d="M12 7.6v5.4"/><circle cx="12" cy="16.2" r=".6" fill="currentColor"/></svg>';
const INFO_O = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="12" cy="12" r="8.8"/><path d="M12 11v5.2"/><circle cx="12" cy="7.9" r=".6" fill="currentColor"/></svg>';
const SIGNOUT = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M13.5 4.5H7a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h6.5M10 12h10M16.5 8.5 20 12l-3.5 3.5"/></svg>';
const DOTS = '<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="5.5" cy="12" r="1.7"/><circle cx="12" cy="12" r="1.7"/><circle cx="18.5" cy="12" r="1.7"/></svg>';
const STATUS = '<svg viewBox="0 0 16 16"><circle cx="8" cy="8" r="6.6" fill="none" stroke="#3356FF" stroke-width="1.5"/><path d="M8 4.2A3.8 3.8 0 1 1 4.2 8H8Z" fill="#3356FF"/></svg>';
const emo = (e, s = 14) => h('span', null, `font-size:${s}px;line-height:1`, e);

const CSS = `
.ds-root { position:absolute; left:0; top:0; overflow:hidden; background:#fff; font-family:var(--sf); color:var(--ink); -webkit-font-smoothing:antialiased; }
.ds-root * { box-sizing:border-box; }
.ds-col { position:absolute; top:0; background:#fff; overflow:hidden; border-right:1px solid #DFE1F8; z-index:2; }
.ds-col .as-tk .ln { right:118px; }
.ds-det .dk-dp { left:140px; }
.ds-det .ds-kv > div:last-child { margin-left:0; }
.ds-pane { position:absolute; top:0; background:#fff; overflow:hidden; }
.ds-det { position:absolute; top:0; background:#fff; overflow:hidden; border-left:1px solid #DFE1F8; }
.ds-menu-row { position:absolute; left:0; right:0; height:62px; }
.ds-menu-row.on { background:#EFF0FE; }
.ds-menu-row.on::after { content:""; position:absolute; right:0; top:0; bottom:0; width:3px; background:#3356FF; }
.ds-menu-row .a { position:absolute; left:56px; top:11px; font:600 15px/22px var(--sf); white-space:nowrap; }
.ds-menu-row .b { position:absolute; left:56px; top:33px; font:400 14px/20px var(--sf); color:#444658; white-space:nowrap; }
.ds-menu-row .ico { position:absolute; left:18px; top:19px; width:24px; height:24px; }
.ds-menu-row .chev { position:absolute; right:16px; top:19px; width:22px; height:22px; color:#444658; }
.ds-field { position:absolute; height:40px; border-radius:20px; border:1px solid #DFE1F8; display:flex; align-items:center; gap:8px; padding:0 14px; font:400 15px/1 var(--sf); color:#8D8FA5; }
.ds-field .ic { width:20px; height:20px; color:#444658; }
.ds-tm { position:absolute; left:0; right:0; height:84px; border-bottom:1px solid #EFF0FE; }
.ds-tm .av { position:absolute; left:16px; top:18px; width:48px; height:48px; }
.ds-tm .st { position:absolute; left:55px; top:56px; width:11px; height:11px; border-radius:50%; box-shadow:0 0 0 2px #fff; }
.ds-tm .a { position:absolute; left:78px; top:14px; display:flex; gap:6px; align-items:center; font:600 16px/22px var(--sf); white-space:nowrap; }
.ds-tm .b { position:absolute; left:78px; top:37px; font:400 14px/18px var(--sf); color:#444658; white-space:nowrap; }
.ds-tm .c { position:absolute; left:78px; top:56px; font:400 14px/18px var(--sf); color:#5C5D71; white-space:nowrap; }
.ds-tm .chev { position:absolute; right:16px; top:30px; width:22px; height:22px; color:#444658; }
.ds-admin { height:19px; padding:0 7px; border-radius:10px; background:#171A2B; color:#fff; font:600 11px/19px var(--sf); letter-spacing:.5px; }
.ds-kv { position:absolute; display:flex; align-items:flex-start; font:400 15px/22px var(--sf); white-space:nowrap; }
.ds-kv .k { width:124px; display:flex; align-items:center; gap:8px; color:#444658; }
.ds-kv .k .ic { width:20px; height:20px; color:#444658; }
.ds-chip2 { display:inline-flex; align-items:center; gap:6px; height:30px; padding:0 11px; border-radius:15px; background:#EFF0FE; border:1px solid #DFE1F8; font:400 14px/1 var(--sf); color:#171A2B; margin:0 6px 6px 0; }
.ds-chip2 .ic { width:14px; height:14px; }
.ds-btn4 { position:absolute; height:52px; border-radius:12px; background:#fff; border:1px solid #DFE1F8; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:3px; font:400 12.5px/1 var(--sf); color:#171A2B; }
.ds-btn4 .ic { width:20px; height:20px; }
.ds-tbar { position:absolute; left:0; right:0; top:0; height:28px; background:#ECEDF7; border-bottom:1px solid #DADCF0; z-index:30; }
.ds-tbar i { position:absolute; top:8px; width:12px; height:12px; border-radius:50%; }
.ds-isb { position:absolute; left:0; right:0; top:0; height:24px; z-index:30; font:600 14px/24px var(--sf); }
`;
if (!document.getElementById('ds-css')) { const st = h('style'); st.id = 'ds-css'; st.textContent = CSS; document.head.append(st); }

/* ───────── shell ───────── */
const MARK = '<svg viewBox="0 0 100 100"><path d="M38.2 61.8h-7.8a7.8 7.8 0 1 0 7.8 7.8Zm39.2-23.9a15.3 15.3 0 0 0-30.5 0v15.3h15.2c8.4 0 15.3-6.9 15.3-15.3Zm8.6 0c0 13.2-10.7 23.9-23.9 23.9H46.8v7.8a16.4 16.4 0 1 1-16.4-16.4h7.8V37.9a23.9 23.9 0 0 1 47.8 0Z" fill="#3356FF"/></svg>';
/* desktop navigation rail (current product): mark · Inbox, Calls, Tickets, Contacts · Support, AI · me */
function rail(H, active) {
  const r = h('div', 'dk-rail', { height: H + 'px' });
  r.append(svg(MARK, 'position:absolute;left:14px;top:14px;width:44px;height:44px'));
  r.append(h('div', 'dk-sep', 'top:78px'));
  const item = (k, n, top, badge) => {
    const on = k === active;
    const e = h('div', 'dk-ri' + (on ? ' on' : ''), { top: top + 'px', width: '40px', height: '40px', borderRadius: '11px' }, I(n + (on ? '|Bold' : '|Light'), 'width:25px;height:25px;color:' + (on ? '#171A2B' : '#5C5D71')));
    if (badge) e.append(h('div', '', 'position:absolute;right:-7px;top:-7px;min-width:17px;height:17px;padding:0 4px;border-radius:9px;background:#3356FF;box-shadow:0 0 0 2px #DFE1F8;color:#fff;font:600 11px/17px var(--sf);text-align:center', String(badge)));
    r.append(e);
  };
  [['Inbox', 'Inbox', 1], ['Calls', 'Call'], ['Tickets', 'Clipboard check / task'], ['Contacts', 'Name / ID Card']].forEach(([k, n, bd], i) => item(k, n, 95 + 48 * i, bd));
  r.append(h('div', 'dk-sep', { top: H - 182 + 'px' }));
  [['Support', 'Support'], ['AI', 'Star / AI 3']].forEach(([k, n], i) => item(k, n, H - 151 + 49 * i));
  r.append(h('div', 'dk-me', { top: H - 52 + 'px', left: '18px', width: '36px', height: '36px', backgroundImage: img('raju') }));
  return r;
}
function root(W, H, active) {
  const el = h('div', 'ds-root', { width: W + 'px', height: H + 'px' });
  el.append(rail(H, active));
  return el;
}
const col = (x, w, H) => h('div', 'ds-col dk-list', { left: x + 'px', width: w + 'px', height: H + 'px' });
const pane = (x, w, H) => h('div', 'ds-pane', { left: x + 'px', width: w + 'px', height: H + 'px' });
const det = (x, w, H) => h('div', 'ds-det', { left: x + 'px', width: w + 'px', height: H + 'px' });

function listHead(c, title, chips, first, w = 360) {
  c.append(h('div', 'dk-title', null, title));
  c.append(h('div', 'dk-acts', null, [I('Search|Light'), I('DialPad|Light'), I('Add|Light')]));
  const ch = h('div', 'dk-chips');
  ch.append(h('div', 'dk-chip', 'padding:0 12px 0 14px;gap:8px', [I('Filter 2|Light', 'width:22px;height:22px'), I(first, 'width:18px;height:18px')]));
  chips.forEach(t => ch.append(h('div', 'dk-chip', null, t)));
  c.append(ch, h('div', 'dk-chipfade', { left: w - 40 + 'px' }), h('div', 'dk-chipnext', { left: w - 56 + 'px' }, I('chev', 'width:20px;height:20px')));
}

/* ───────── Inbox list ───────── */
const IROWS = [
  { av: 'jesse', name: 'Jesse Di Lucca', when: '2:34 am', lines: ['Can we schedule a call for Friday to discuss next steps please?'], c2: true, badge: 2 },
  { av: 'ivy', name: 'Ivy Turner', when: '3:15 am', sub: ['Missed Call|Bold', 'Missed call · Voicemail', true], lines: ['“I just left an amazing review for you…'], vm: true, key: 'ivy' },
  { av: 'michael', name: 'Michael Brown', when: '3:15 am', sub: ['Outgoing Call|Bold', 'Sandy dialed'], lines: ['“Hi Michael. This is Sandy. I just wanted to follow up'], key: 'michael' },
  { av: 'kevin', name: 'Kevin Lui', when: '8:30 pm', lines: ['Thank you! What’s the status on my order?'], badge: 1, key: 'kevin' },
  { def: 'group', name: 'Daniela Wilson +2 more', when: '4:05 am', lines: ['I’m really excited about this project and I look forward to working with you!'], c2: true },
  { av: 'ethan', name: 'Ethan Williams', when: '3:15 am', sub: ['Incoming Call|Bold', 'Alberto answered · Sales'], lines: ['“Ethan, I am so glad you called. I’d like to…”'], tag: 'Response due today' },
  { def: 'unknown', name: 'keisha.morgan@gmail.com', when: '3:01 am', lines: ['Tax documents for my 2025 return', 'Hi! Attaching my W-2 and 1099 forms for you…'], badge: 1 },
  { def: 'campaign', name: 'Spring Tune-Up Special', when: '3:15 am', lines: ['Book your AC tune-up before May 31 and save 20% on parts & labor.'], c2: true },
  { av: 'judith', name: 'Judith Rodriguez', when: '2:50 am', sub: ['Photo / Media|Bold', '3 Photos'], lines: [], badge: 3 },
  { av: 'keisha', name: 'Keisha Morgan', when: '2:50 am', lines: ['Thanks so much! See you on Saturday.'] },
];
function irow(r, sel) {
  const a = h('div', 'dk-av');
  if (r.def) { a.style.backgroundImage = DEF(r.def); a.style.backgroundColor = 'transparent'; } else a.style.backgroundImage = img(r.av);
  const body = h('div', 'dk-body');
  body.append(h('div', 'dk-top', null, [h('div', 'dk-name', null, r.name), h('div', 'dk-when', null, r.when)]));
  const L = h('div', 'dk-lines' + (r.badge || r.vm ? ' pr' : ''));
  if (r.sub) { const [ic, t, miss] = r.sub; L.append(h('div', 'dk-line', 'display:flex;align-items:center;gap:5px', [I(ic, 'color:' + (miss ? '#DE260C' : '#444658')), h('span', 't', null, t)])); }
  r.lines.forEach(l => L.append(h('div', 'dk-line' + (r.c2 ? ' c2' : ''), r.c2 ? 'white-space:normal;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical' : null, l)));
  if (r.badge) L.append(h('div', 'dk-badge', null, String(r.badge)));
  if (r.vm) L.append(h('div', 'dk-badge', null, I('Voice Mail 2|Bold')));
  body.append(L);
  if (r.tag) body.append(h('div', 'dk-tag', null, r.tag));
  return h('div', 'dk-row' + (sel ? ' sel' : ''), { height: (r.tag ? 125 : 101) + 'px', background: sel ? '#EFF0FE' : '#fff' }, [a, body]);
}
function inboxCol(x, H, selKey) {
  const c = col(x, 360, H);
  listHead(c, 'Inbox', ['Unread', 'Response Due', 'Team Chats'], 'Right Arrow 2|Light');
  const rows = h('div', 'dk-rows', 'top:117px');
  IROWS.forEach(r => rows.append(irow(r, r.key && r.key === selKey)));
  c.append(rows);
  return c;
}

/* ───────── Calls list ───────── */
const CROWS = [
  { t: 'call_answered', name: 'Noah Anderson', rec: true, sub: 'Lisa answered · 9:20 am', key: 'noah' },
  { t: 'call_missed_ah', name: 'Ivy Turner', vm: true, sub: 'No-one answered · 9:14 am' },
  { t: 'call_answered', name: 'Michael Brown', rec: true, sub: 'Ashley answered · 9:05 am', key: 'michael' },
  { t: 'call_transfer', name: 'Keisha Morgan', rec: true, sub: 'Sandy → Alberto · 8:52 am', key: 'keisha' },
  { t: 'call_dialed', name: 'Jonas Muller', sub: 'Sandy dialed · 8:47 am' },
  { t: 'call_answered', name: 'Ravi Chandran', rec: true, sub: 'Ravi answered · CPA Team · 8:31 am', key: 'ravi' },
  { t: 'call_hungup', name: 'Barry Hill', sub: 'Caller hung up · 8:20 am' },
  { t: 'call_missed', name: 'Liam Johnson', sub: 'No-one answered · 8:15 am' },
  { t: 'call_failed_ah', name: 'Kevin Lui', sub: 'Sandy dialed · Failed · 7:58 am' },
  { t: 'call_dialed', name: 'Emma Brooks', rec: true, sub: 'Alberto dialed · 7:46 am' },
  { t: 'call_answered', name: 'Judith Rodriguez', rec: true, sub: 'Krishna answered · 7:31 am' },
  { t: 'call_missed_ah', name: 'Priya Shah', vm: true, sub: 'No-one answered · 7:12 am' },
  { t: 'call_dialed', name: 'Sophia Turner', rec: true, sub: 'Krishna dialed · 7:05 am' },
  { t: 'call_answered', name: 'Alice Grossman', sub: 'Ashley answered · 6:58 am' },
  { t: 'call_hungup', name: 'Marcus Reed', sub: 'Caller hung up · 6:40 am' },
  { t: 'call_answered', name: 'Daniela Wilson', rec: true, sub: 'Sandy answered · 6:31 am' },
];
function crow(r, sel) {
  const nm = h('div', 'dk-name', null, [r.name]);
  if (r.vm) nm.append(h('div', 'dk-vmb', null, I('Voice Mail 2|Bold')));
  if (r.rec) nm.append(h('span', 'dk-rec', null, 'REC'));
  return h('div', 'dk-crow' + (sel ? ' sel' : ''), null, [h('div', 'dk-tile', { backgroundImage: DEF(r.t), backgroundSize: 'cover' }),
    h('div', 'dk-body', null, [nm, h('div', 'dk-sub', null, r.sub)]), svg(INFO_T, 'width:22px;height:22px;color:#8D8FA5')]);
}
function callsCol(x, H, selKey) {
  const c = col(x, 360, H);
  listHead(c, 'Calls', ['Missed', 'My calls', 'Voicemail'], 'Down|Light');
  const rows = h('div', 'dk-rows', 'top:117px;border-top:0');
  CROWS.forEach(r => rows.append(crow(r, r.key === selKey)));
  c.append(rows);
  return c;
}

/* ───────── AI summary pane ───────── */
const SUM = {
  michael: { t1: 'Michael called you', t2: 'Ashley answered', ended: 'Inbound call ended at 9:05 am · Duration 2:34',
    flow: [[emo('☀️'), 'Start'], [h('div', 'num', null, '2'), 'Bookings'], [h('div', 'fav', { backgroundImage: img('alexis') }), 'Ashley answered · 2:34'], ['End']],
    bullets: ['Michael called to book a haircut and beard trim.', 'Looking for an appointment this Saturday morning.', 'Asked for Jessica, his usual barber.', 'Confirmed for Saturday at 11:30 AM.'],
    fu: [['Profile|Light', 'Update contact details with the preferred barber as “Jessica”', 'Accept Edit'], ['Clipboard check / task|Light', 'Haircut + beard trim with Jessica on Saturday at 11:30 AM.', 'Create Ticket']] },
  noah: { t1: 'Noah called you', t2: [h('div', 'cl-lisa'), 'Lisa answered'], ended: 'Inbound call ended at 9:20 am · Duration 2:34',
    flow: [[emo('☀️'), 'Start'], [h('div', 'cl-lisa', 'width:18px;height:18px'), 'Lisa answered · 2:34'], [I('Tag|Light'), 'Lead captured'], ['End']],
    bullets: ['Noah called to book a 60-minute deep-tissue massage.', 'Prefers a weekday evening appointment after 5 pm.', 'Asked if his insurance covers the massage.', 'Lisa shared prices and sent the booking link by text.'], lead: 'Deep-tissue massage, weekday evening after 5 pm',
    fu: [['Profile|Light', 'Update contact details with the insurance provider as “BlueCross”', 'Accept Edit'], ['Clipboard check / task|Light', 'Book a 60-minute deep-tissue massage, weekday after 5 pm.', 'Create Ticket']] },
  ravi: { t1: 'Ravi called you', t2: 'Ravi answered · CPA Team', ended: 'Inbound call ended at 8:31 am · Duration 4:12',
    flow: [[emo('☀️'), 'Start'], [h('div', 'num', null, '2'), 'CPA Team'], [h('div', 'fav', { backgroundImage: img('ravi') }), 'Ravi answered · 4:12'], ['End']],
    bullets: ['Caller pressed 2 and was routed to the CPA Team.', 'Asked to move his tax-prep meeting to next week.', 'Rescheduled for Tuesday at 10:00 AM.'],
    fu: [['Clipboard check / task|Light', 'Send updated engagement letter before Tuesday’s meeting.', 'Create Ticket']] },
  keisha: { t1: 'Keisha called you', t2: 'Sandy answered', ended: 'Inbound call · In progress',
    flow: [[emo('☀️'), 'Start'], [h('div', 'num', null, '1'), 'Sales'], [h('div', 'fav', { backgroundImage: img('jesse') }), 'Sandy answered'], [I('Call Transfer|Light'), 'Transferring…']],
    bullets: ['Keisha needs tax documentation for her 2025 return.', 'Asked to speak with someone from billing.', 'Sandy is transferring the call to Sarah.'], lead: 'Copy of 2025 tax documents for her return',
    fu: [['Clipboard check / task|Light', 'Email Keisha a copy of her 2025 tax documents.', 'Create Ticket']] },
};
/* the Summary section of the AI summary pane (heading, bullets, sentiment) — also used for pop-outs */
const sumBlockH = (key) => 30 + 34 * SUM[key].bullets.length + 56;
function sumBlock(key, cw) {
  const D = SUM[key];
  const b = h('div', '', `position:absolute;left:0;top:0;width:${cw}px;height:${sumBlockH(key)}px`);
  b.append(h('div', 'dk-h3', 'top:0', 'Summary'));
  D.bullets.forEach((t, i) => b.append(h('div', 'dk-bul', { top: 30 + 34 * i + 'px' }, h('span', null, null, t))));
  b.append(h('div', 'dk-moods', { top: 30 + 34 * D.bullets.length + 'px' }, [h('div', 'dk-mood', null, [emo('😊'), 'Happy']), h('div', 'dk-mood', null, [emo('👍🏻'), 'Positive'])]));
  return b;
}
function summaryPane(x, w, H, key) {
  const D = SUM[key];
  const p = pane(x, w, H);
  const cw = Math.min(768, w - 64), cl = Math.round((w - cw) / 2);
  const hdr = h('div', 'dk-chdr', null, [
    h('div', 'dk-cav', { backgroundImage: DEF('call_disc_in'), backgroundSize: 'cover' }),
    h('div', 't1', null, D.t1), h('div', 't2', null, D.t2),
    h('div', null, 'position:absolute;right:16px;top:26px;display:flex;gap:16px', [svg(DOTS, 'width:24px;height:24px'), I('Chat 2|Light'), I('Call|Light')]),
    h('div', 'dk-ctabs', { left: cl + 'px', width: cw + 'px' }, [h('div', 'on'), h('span', null, 'left:0', 'AI Summary'), h('span', null, 'left:50%', 'Transcript')]),
  ]);
  const S = h('div', 'dk-sumc', { left: cl + 'px', width: cw + 'px', height: H - 215 + 'px' });
  S.append(h('div', 'ended', null, D.ended));
  const flow = h('div', 'dk-flow');
  D.flow.forEach((f, i) => { if (i) flow.append(h('div', 'dk-farr', null, I('Right Arrow 1|Light', 'width:13px;height:13px'))); flow.append(h('div', 'dk-fc', f.length === 1 ? 'padding:0 12px' : null, f)); });
  S.append(flow, h('div', 'dk-dash', { top: '103px', width: cw + 'px' }));
  const blk = sumBlock(key, cw); blk.style.top = '120px'; S.append(blk);
  let y = 120 + sumBlockH(key);
  S.append(h('div', 'dk-dash', { top: y + 'px', width: cw + 'px' }));
  if (D.lead) { y += 18; S.append(h('div', 'dk-h3', { top: y + 'px' }, 'Lead Capture Info')); y += 30;
    S.append(h('div', 'dk-fu', { top: y + 'px', width: cw + 'px' }, [I('Document / Description|Light'), h('div', 'a', 'white-space:nowrap;overflow:hidden;text-overflow:ellipsis;right:14px', [h('span', null, 'color:#444658', 'Reason for calling: '), D.lead]), h('div', 'b', null, 'Create Ticket')])); y += 86;
    S.append(h('div', 'dk-dash', { top: y + 'px', width: cw + 'px' })); }
  y += 18; S.append(h('div', 'dk-h3', { top: y + 'px' }, 'Follow-up Actions'));
  y += 30;
  D.fu.forEach(([ic, a, b]) => { S.append(h('div', 'dk-fu', { top: y + 'px', width: cw + 'px' }, [I(ic), h('div', 'a', 'white-space:nowrap;overflow:hidden;text-overflow:ellipsis;right:14px', a), h('div', 'b', null, b)])); y += 77; });
  S.append(h('div', 'dk-dash', { top: y + 8 + 'px', width: cw + 'px' }), h('div', 'dk-pow', { top: y + 24 + 'px' }, ['Powered by ', h('b', null, null, 'LinkedPhone AI')]));
  const pl = 24, pw = w - 2 * pl - 56;
  const player = h('div', 'dk-player', { top: H - 76 + 'px' }, [
    h('div', 'pill', { left: pl + 'px', width: pw + 'px' }, [h('div', 't', 'left:12px', '1:42'), h('div', 'trk', { left: '49px', width: pw - 107 + 'px' }, [h('div', 'fill', { width: Math.round((pw - 107) * .4) + 'px' }), h('div', 'knob', { left: Math.round((pw - 107) * .4) + 'px' })]), h('div', 't', 'right:12px', '-0:52')]),
    h('div', 'pz', { left: pl + pw + 10 + 'px' }, I('Pause|Bold'))]);
  p.append(S, hdr, player);
  return p;
}

/* ───────── Conversation pane ───────── */
const CONV = {
  michael: { av: 'michael', name: 'Michael Brown', num: '+1 (212) 555-3462',
    msgs: (cw) => [
      h('div', 'dk-in', { width: Math.min(560, cw - 40) + 'px' }, [h('div', 'ph', { height: '300px', backgroundImage: 'url(assets/photos/flowers.png)', backgroundPosition: 'center 70%' }),
        h('div', null, 'padding:9px 0 0 10px', [h('div', 'dk-txt', 'max-width:none', 'Hi! Just checking in on my order. These are for my wife’s birthday today, hoping they arrive soon 🎂'), h('div', 'dk-meta', null, 'Michael · 8:30 pm')])]),
      h('div', 'dk-card', 'margin-top:22px', h('div', 'dk-ch', null, [h('div', 'dk-circ', null, I('Clipboard check / task|Bold', 'color:#171A2B')),
        h('div', 'dk-cb', null, [h('div', 'dk-ct', null, [h('span', 'dk-bang', null, '!!!'), h('span', 'tt', null, [h('b', null, 'font-weight:600', '#134'), ' Deliver birthday bouquet to Michael before noon today.'])]), h('div', 'dk-cs', null, 'Created by Sandy · 3:45 pm')]),
        I('chev', 'width:22px;height:22px;color:#444658')])),
      h('div', 'dk-date', 'margin-top:22px;height:20px', 'Oct 1, 2026'),
      h('div', 'dk-card', 'margin-top:20px', [h('div', 'dk-ch', 'height:70px', [h('div', 'dk-circ', 'background:#D7FDB7', I('Outgoing Call|Bold', 'color:#2E7A00')),
        h('div', 'dk-cb', null, [h('div', 'dk-ct', null, ['Sandy dialed', h('span', 'dk-rec', null, 'REC')]), h('div', 'dk-cs', null, 'Michael answered · 9:12 am')]), I('chev', 'width:22px;height:22px;color:#444658')]),
        h('div', 'dk-sum', null, [h('span', null, 'color:#444658', 'Summary: '), 'Confirmed the bouquet order and delivery address. Michael asked for delivery before noon.… ', h('b', null, 'color:#3356FF;font-weight:500', 'Show More')])]),
      h('div', 'dk-out', { marginTop: '22px', width: Math.min(560, cw - 40) + 'px' }, [h('div', 'dk-txt', 'min-height:44px;max-width:none', 'Great news, Michael! We’ll have them delivered by noon today 💐'),
        h('div', 'dk-meta', 'margin-top:9px', [h('div', 'mav', { backgroundImage: img('jesse') }), 'Sandy · 9:41 am']), I('Double checkmark|Light', 'position:absolute;right:12px;bottom:14px;width:20px;height:20px;color:#5C5D71')]),
    ] },
  kevin: { av: 'kevin', name: 'Kevin Lui', num: '+1 (415) 555-0142',
    msgs: (cw) => {
      const MW = Math.min(440, cw - 120);
      const inT = (t, tm) => h('div', 'dk-in', { width: 'auto', maxWidth: MW + 'px', padding: '10px 12px 10px', marginTop: '12px' }, [h('div', 'dk-txt', 'max-width:none', t), h('div', 'dk-meta', null, 'Kevin · ' + tm)]);
      const outT = (t, tm) => h('div', 'dk-out', { maxWidth: MW + 'px', marginTop: '12px' }, [h('div', 'dk-txt', 'max-width:none', t),
        h('div', 'dk-meta', 'margin-top:8px', [h('div', 'mav', { backgroundImage: img('jesse') }), 'Jesse · ' + tm])]);
      return [
        h('div', 'dk-date', 'height:20px', 'Sep 30, 2026'),
        inT('Hi! Do you deliver to Brooklyn Heights? I’d love a few potted arrangements for my shop.', '4:12 pm'),
        outT('Yes! We deliver across Brooklyn every day. Send us a photo of what you like and we’ll get it ready.', '4:20 pm'),
        inT('Perfect — I’ll pick some out tonight.', '4:24 pm'),
        h('div', 'dk-date', 'margin-top:18px;height:20px', 'Oct 1, 2026'),
        outT('Your order is confirmed! Two potted arrangements, delivery Saturday morning.', '9:02 am'),
        h('div', 'dk-out', { maxWidth: MW + 'px', marginTop: '8px', padding: '10px' }, [h('div', '', 'background:#fff;border-radius:10px;padding:10px 12px;display:flex;align-items:center;gap:10px;width:300px', [
          h('div', '', 'width:36px;height:36px;border-radius:10px;background:#EFF0FE;display:grid;place-items:center', I('File / Document|Light', 'width:20px;height:20px')),
          h('div', null, null, [h('div', '', 'font:500 15px/20px var(--sf)', 'Order_2041_Receipt.pdf'), h('div', '', 'font:400 13px/18px var(--sf);color:#5C5D71', '184 KB · pdf')])]),
          h('div', 'dk-meta', 'margin-top:8px', [h('div', 'mav', { backgroundImage: img('jesse') }), 'Jesse · 9:02 am'])]),
        inT('Thank you! What’s the status on my order?', '8:30 pm'),
      ]; } },
  ticket: { av: 'jonas', name: '#128 Jonas Muller', num: 'Contact ticket · Active', ticket: true, fromTop: true,
    msgs: (cw) => {
      const W2 = Math.min(560, cw - 40);
      const ev = (t, who, tm) => h('div', '', 'align-self:center;text-align:center;margin-top:16px', [
        h('div', '', 'display:flex;align-items:center;justify-content:center;gap:6px;font:400 15.5px/22px var(--sf)', [].concat(t)),
        h('div', '', 'font:400 13.5px/19px var(--sf);color:#5C5D71;margin-top:2px', `${who} · ${tm}`)]);
      const meta = (who, av, tm) => h('div', 'dk-meta', 'margin-top:9px', [h('div', 'mav', { backgroundImage: img(av) }), `${who} · ${tm}`]);
      const note = (kids, who, av, tm) => h('div', '', `align-self:center;width:${W2}px;margin-top:16px;border-radius:14px;background:#FCE3F0;padding:12px 14px`, [...[].concat(kids), meta(who, av, tm)]);
      const txt = (t) => h('div', 'dk-txt', 'max-width:none', t);
      const sub = (inner) => h('div', '', 'background:#fff;border-radius:10px;padding:10px 12px;display:flex;align-items:center;gap:10px', inner);
      const dot = (c) => h('span', '', `width:12px;height:12px;border-radius:50%;background:${c};display:inline-block`);
      return [
        h('div', '', `align-self:center;width:${W2}px;border:1.5px dashed #F2C6DD;border-radius:14px;background:linear-gradient(#FFF3F9,#fff 80%);padding:16px;text-align:center`, [
          h('div', '', 'width:30px;height:30px;border-radius:50%;background:#F9D5E9;margin:0 auto 8px;display:grid;place-items:center', h('div', '', 'width:10px;height:10px;border-radius:50%;border:2.5px solid #D9488E')),
          h('div', '', 'font:400 15.5px/22px var(--sf)', 'Tickets stay in-house'),
          h('div', '', 'font:400 13.5px/19px var(--sf);color:#444658;margin-top:3px', 'Everything you write here is visible only to your team—never to customers.'),
          h('div', '', 'font:500 13.5px/19px var(--sf);text-decoration:underline;margin-top:4px', 'Learn more')]),
        h('div', 'dk-date', 'margin-top:18px;height:20px', 'Oct 1, 2026'),
        ev(['Ticket ', h('span', '', 'display:inline-flex;align-items:center;gap:4px;font-weight:600', [svg(STATUS, 'width:15px;height:15px'), 'Created'])], 'Alexis Johnson', '9:20 am'),
        ev(['Priority changed to ', h('span', null, 'color:#B23220;font-weight:600', '!!! High')], 'Alexis Johnson', '9:21 am'),
        note(txt('Jonas is opening a second location and needs a quote for a full office fit-out by June.'), 'Alexis Johnson', 'alexis', '9:24 am'),
        note(sub([h('div', '', `width:36px;height:36px;border-radius:10px;background:${img('jonas')} center/cover`), h('div', null, null, [h('div', '', 'font:500 15px/20px var(--sf)', 'Jonas Muller'), h('div', '', 'font:400 13px/18px var(--sf);color:#5C5D71', 'Contact info')])]), 'Alexis Johnson', 'alexis', '9:25 am'),
        note(sub([h('div', '', 'width:36px;height:36px;border-radius:10px;background:#EFF0FE;display:grid;place-items:center', I('File / Document|Light', 'width:20px;height:20px')), h('div', null, null, [h('div', '', 'font:500 15px/20px var(--sf)', 'Office_FitOut_Brief.pdf'), h('div', '', 'font:400 13px/18px var(--sf);color:#5C5D71', '2.3 MB · pdf')])]), 'Alexis Johnson', 'alexis', '9:27 am'),
        ev(['Owner changed to ', h('span', '', 'display:inline-flex;align-items:center;gap:5px;font-weight:600', [h('span', '', `width:18px;height:18px;border-radius:50%;background:${img('alexis')} center/cover;display:inline-block`), 'Alexis Johnson'])], 'Jesse Di Lucca', '9:30 am'),
        ev(['Status changed to ', h('span', '', 'display:inline-flex;align-items:center;gap:5px;font-weight:600', [dot('#4B8A1E'), 'Active'])], 'Alexis Johnson', '9:31 am'),
        note(txt('Great — loop in Ravi for the budget numbers before we send the quote.'), 'Jesse Di Lucca', 'jesse', '9:33 am'),
      ]; } },
};
function convPane(x, w, H, key, opts = {}) {
  const D = CONV[key];
  const p = pane(x, w, H);
  const cw = Math.min(768, w - 40), cl = Math.round((w - cw) / 2);
  const hdr = h('div', 'dk-phdr', null, [
    P(`left:16px;top:18px;width:40px;height:40px;border-radius:10px;background:${img(D.av)} center/cover`),
    h('div', 'dk-pname', null, [D.name, D.ticket ? '' : svg(STATUS, 'width:16px;height:16px;margin-left:2px')]), h('div', 'dk-pnum', null, D.num),
    h('div', 'dk-pacts', null, [svg(DOTS, 'width:24px;height:24px'), I('New Clipboard check / New task|Light'), I('Call|Light')])]);
  const msgs = h('div', 'dk-msgs', { height: H - 76 - 82 + 'px' });
  const c = h('div', 'dk-col', D.fromTop ? { left: cl + 'px', width: cw + 'px', top: '16px', bottom: 'auto' } : { left: cl + 'px', width: cw + 'px', bottom: (opts.gap || (opts.chips ? 70 : 60)) + 'px' });
  D.msgs(cw).forEach(m => c.append(m));
  msgs.append(c);
  const comp = h('div', 'dk-comp', { top: H - 82 + 'px' });
  const plus = I('Add 2|Light', `left:${cl}px`); plus.classList.add('plus');
  const inp = h('div', 'inp', { left: cl + 32 + 'px', width: cw - 64 + 'px' }, opts.typed ? [h('span', null, 'color:#171A2B', opts.typed), h('span', 'dk-caret')] : (D.ticket ? 'Add comment' : 'New message'));
  if (opts.typed) inp.style.borderColor = '#171A2B';
  const fl = I('Flash / Light|Light', `left:${cl + cw - 24}px`); fl.classList.add('flash');
  comp.append(plus, inp, fl);
  p.append(msgs, hdr, comp);
  if (opts.chips) {
    const row = P(`left:${cl}px;top:${H - 82 - 50}px;display:flex;gap:8px;z-index:3`, ['Rewrite', 'Longer', 'Friendly', 'Formal', 'Apologize'].map((t, i) =>
      h('div', 'dk-gen', 'position:relative;top:0;left:0', [i ? '' : I('Pen / AI / Generate / Edit|Light'), h('span', 'ms-grad', null, t)])));
    p.append(row);
  } else if (!D.ticket && !opts.typed) p.append(h('div', 'dk-gen', { left: cl + cw / 2 - 82 + 'px', top: H - 82 - 47 + 'px' }, [I('Pen / AI / Generate / Edit|Light'), 'Generate Reply']));
  return p;
}

/* ───────── details panels ───────── */
function breathe(d, gap = 14) {
  const kids = [...d.children], top = (c) => parseFloat(c.style.top);
  const dashes = kids.filter(c => c.classList.contains('dk-dash')).map(top).sort((a, b) => a - b);
  kids.forEach(c => { const t = top(c); if (isNaN(t) || t < dashes[0] - 1) return;
    const n = dashes.filter(y => y < t - .5).length; c.style.top = t + n * 2 * gap + (c.classList.contains('dk-dash') ? gap : 0) + 'px'; });
  return d;
}
function kv(top, left, icn, k, v) { return h('div', 'ds-kv', { top: top + 'px', left: left + 'px' }, [h('div', 'k', null, [typeof icn === 'string' ? I(icn) : icn, k]), h('div', null, 'color:#171A2B;white-space:normal', v)]); }
function contactDetails(x, w, H, who) {
  const d = det(x, w, H);
  const C = who === 'kevin' ? { av: 'kevin', nm: 'Kevin Lui', co: 'Lui Florist Co.', ph: '+1 (415) 555-0142', em: 'kevin@luiflorist.com' } : { av: 'michael', nm: 'Michael Brown', co: 'Brown Design Studio', ph: '+1 (212) 555-3462', em: 'mbrown@gmail.com' };
  d.append(I('Close|Light', 'position:absolute;left:16px;top:16px'), svg(DOTS, `position:absolute;left:${w - 80}px;top:16px;width:24px;height:24px`));
  d.append(h('div', 'dk-dcard', { width: w - 34 + 'px' }, [P(`left:11px;top:11px;width:79px;height:79px;border-radius:50%;border:1.5px solid #fff;background:${img(C.av)} center/cover`), h('div', 'nm', null, [C.nm, I('Edit|Bold')]), h('div', 'co', null, C.co)]));
  d.append(h('div', 'dk-seg', { width: w - 34 + 'px' }, [h('div', 'on', { width: (w - 34) / 2 - 1 + 'px' }), h('span', null, { left: 0, width: (w - 34) / 2 + 'px', color: '#3356FF' }, 'Details'), h('span', null, { left: (w - 34) / 2 + 'px', width: (w - 34) / 2 + 'px' }, 'Activity')]));
  d.append(h('div', 'dk-dash', { top: '233px', width: w - 34 + 'px' }));
  [[256, 'Call|Light', 'Mobile', C.ph], [300, 'Call|Light', 'Office', '+1 (212) 390-3720'], [344, 'Mail|Light', 'Email', C.em]].forEach(([y, ic, k, v]) => d.append(kv(y, 16, ic, k, h('span', null, 'color:#3356FF', v))));
  d.append(h('div', 'dk-dash', { top: '388px', width: w - 34 + 'px' }));
  const pill = (y, kids, cls = '') => d.append(h('div', 'dk-dp ' + cls, { top: y + 'px' }, kids));
  d.append(kv(414, 16, svg(PRIO, 'width:20px;height:20px;color:#444658'), 'Priority', '')); pill(407, [h('span', 'dk-bang', null, '!!!'), 'High', I('Down|Light')], 'red');
  d.append(kv(464, 16, 'Status|Light', 'Status', '')); pill(457, [svg(STATUS, 'width:16px;height:16px'), 'In Progress', I('Down|Light')]);
  d.append(h('div', 'dk-dash', { top: '512px', width: w - 34 + 'px' }));
  d.append(kv(538, 16, 'Support|Light', 'Owner', '')); pill(531, [h('div', 'pav', { backgroundImage: img('jesse') }), 'Jesse Di Lucca', I('Down|Light')]);
  d.append(kv(588, 16, 'Group|Light', 'Team', '')); pill(581, ['Sales Team', I('Down|Light')]);
  d.append(kv(638, 16, 'Calender 2|Light', 'Due on', '')); pill(631, ['Oct 1, 2026 · 12:00 pm', I('Down|Light')]);
  d.append(h('div', 'dk-dash', { top: '686px', width: w - 34 + 'px' }));
  d.append(kv(708, 16, 'Document / Description|Light', 'Note', h('div', null, `width:${w - 150}px;white-space:normal`, 'Birthday bouquet for his wife. Deliver before noon and include a handwritten card.')));
  return breathe(d);
}
function ticketDetails(x, w, H) {
  const d = det(x, w, H);
  d.append(I('Close|Light', 'position:absolute;left:16px;top:16px'), I('Edit|Light', `position:absolute;left:${w - 40}px;top:16px`));
  d.append(P(`left:16px;top:56px;width:${w - 32}px;font:700 20px/27px var(--sf);letter-spacing:-.2px`, 'Jonas called about a new project'));
  d.append(P('left:16px;top:116px;font:400 14px/20px var(--sf);color:#5C5D71', 'Created on Oct 1, 2026 · 9:20 am'));
  d.append(h('div', 'dk-dash', { top: '152px', width: w - 34 + 'px' }));
  const pill = (y, kids, cls = '') => d.append(h('div', 'dk-dp ' + cls, { top: y + 'px' }, kids));
  d.append(kv(176, 16, 'Clipboard check / task|Light', 'Ticket type', '')); pill(169, ['Contact Ticket', I('Down|Light')]);
  d.append(kv(226, 16, 'Name / ID Card|Light', 'Contacts', '')); pill(219, [h('div', 'pav', { backgroundImage: img('jonas') }), 'Jonas Muller', I('Close|Light')], 'gray');
  d.append(h('div', 'dk-dash', { top: '274px', width: w - 34 + 'px' }));
  d.append(kv(298, 16, svg(PRIO, 'width:20px;height:20px;color:#444658'), 'Priority', '')); pill(291, [h('span', 'dk-bang', null, '!!!'), 'High', I('Down|Light')], 'red');
  d.append(kv(348, 16, 'Status|Light', 'Status', '')); pill(341, [P('position:relative;width:9px;height:9px;border-radius:50%;background:#4B8A1E'), 'Active', I('Down|Light')]);
  d.append(h('div', 'dk-dash', { top: '396px', width: w - 34 + 'px' }));
  d.append(kv(420, 16, 'Support|Light', 'Owner', '')); pill(413, [h('div', 'pav', { backgroundImage: img('alexis') }), 'Alexis Johnson', I('Down|Light')]);
  d.append(kv(470, 16, 'Group|Light', 'Team', '')); pill(463, ['Sales Team', I('Down|Light')]);
  d.append(kv(520, 16, 'Calender 2|Light', 'Due on', '')); pill(513, ['Oct 3, 2026 · 5:00 pm', I('Down|Light')]);
  d.append(h('div', 'dk-dash', { top: '568px', width: w - 34 + 'px' }));
  d.append(kv(592, 16, svg(TAGO, 'width:20px;height:20px;color:#444658'), 'Tags', h('div', null, `width:${w - 140}px;white-space:normal;margin-top:-4px`, [h('span', 'ds-chip2', null, ['New Project', I('Close|Light')]), h('span', 'ds-chip2', null, ['High Value', I('Close|Light')]), h('span', 'ds-chip2', 'background:#fff', [I('Add|Light'), 'Add'])])));
  return breathe(d);
}

/* ───────── Tickets list ───────── */
function ticketsCol(x, H) {
  const c = col(x, 360, H);
  listHead(c, 'Tickets', ['Sort', 'My Tickets', 'Priority'], 'Down|Light');
  const T = MS._tickets;
  const wrap = P('left:0;top:117px;width:360px');
  T.forEach((r, i) => { const e = MS._ticketRow(r, i * 127); e.style.width = '359px'; if (i === 1) { e.style.background = '#EFF0FE'; e.append(P('right:0;top:0;bottom:0;width:3px;background:#3356FF')); } wrap.append(e); });
  [{ av: 'liam', name: 'Liam Johnson', title: 'AC tune-up before the heat wave', line: 'Booked Tuesday 8am.', pill: 'NEW', mini: 'jesse' },
   { av: 'emma', name: 'Emma Brooks', title: 'Wants weekend openings', line: 'Sent Saturday slots.', pill: 'ACTIVE', mini: 'alexis' }].forEach((r, i) => wrap.append(MS._ticketRow(r, (T.length + i) * 127)));
  c.append(wrap);
  return c;
}

/* ───────── settings: menu column ───────── */
const SPARK = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14.6' height='14.6' viewBox='0 0 14.6 14.6'%3E%3Cpath d='M7.3 3.6 8 6.6 11 7.3 8 8 7.3 11 6.6 8 3.6 7.3 6.6 6.6Z' fill='%23E2E4F8'/%3E%3C/svg%3E\")";
function menuCol(x, H, active) {
  const c = col(x, 360, H);
  c.append(I('Close|Light', 'position:absolute;left:16px;top:20px'), P('left:52px;top:16px;font:800 24px/32px var(--sf)', 'Menu'));
  c.append(P(`left:0;top:58px;width:360px;height:150px;background:${SPARK} 0 0/14.6px 14.6px;-webkit-mask:linear-gradient(90deg,transparent,#000 15%,#000 85%,transparent)`));
  c.append(P(`left:140px;top:64px;width:80px;height:80px;border-radius:50%;background:${img('bob')} center 30%/cover,linear-gradient(#F4D4EE,#F0CDEB);box-shadow:0 0 0 2px #EFE5F6`),
    P('left:0;right:0;top:152px;display:flex;justify-content:center;align-items:center;gap:4px;font:700 20px/28px var(--sf)', ['Bob Hart', I('chev', 'width:22px;height:22px')]),
    P('left:143px;top:182px;width:74px;height:24px;border-radius:12px;background:#D8FDB7;box-shadow:inset 0 0 0 1px #9AD86C;display:flex;align-items:center;gap:5px;padding-left:9px;font:400 13.5px/1 var(--sf)', ['Online', P('position:relative;width:8px;height:8px;border-radius:50%;background:#3F8A12;box-shadow:0 0 0 2px #fff')]));
  const R = [['num1', h('span', 'ico', 'font-size:20px;line-height:24px;text-align:center', '🐣'), '+1 (971) 555-1212', 'Bob’s Fried Chicken Shack'],
    ['num2', h('span', 'ico', 'font-size:20px;line-height:24px;text-align:center', '🍔'), '+1 (971) 555-1414', 'Bob’s Burger Shack'],
    ['team', I('Support|Light'), 'Team Members', '4 active users'], ['ai', I('Star / AI 3|Light'), 'AI Receptionist', 'Lisa · Auto Attendant'],
    ['channels', I('Grid layout / Auto layout|Light'), 'Channels', 'Email, Instagram & more'], ['filters', I('Filter 2|Light'), 'Saved Filters', 'Contact segments & groups'],
    ['prefs', I('Settings|Light'), 'Preferences', 'Productivity settings'], ['support', I('Question / Help|Light'), 'Support & Account', 'Billing, security, help']];
  R.forEach(([k, ic, a, b], i) => { if (!ic.classList.contains('ico')) ic.classList.add('ico');
    c.append(h('div', 'ds-menu-row' + (k === active ? ' on' : ''), { top: 226 + i * 66 + 'px' }, [ic, h('div', 'a', null, a), h('div', 'b', null, b), I('chev', '')]));
    c.lastChild.lastChild.classList.add('chev');
    if (i === 1 || i === 3) c.append(P(`left:16px;right:16px;top:${226 + i * 66 + 64}px;height:1px;background:#EFF0FE`)); });
  return c;
}
/* team members list pane */
const TEAM = [
  { av: 'jesse', name: 'Jesse Di Lucca', admin: true, ph: '+1 (971) 567-1234', d: '101 · Sales · Support', st: '#3F8A12' },
  { av: 'alexis', name: 'Alexis Johnson', ph: '+1 (971) 567-9352', d: '102 · Billing', st: '#C0392B' },
  { av: 'judith', name: 'Alice Grossman', ph: '+1 (202) 555-0832', d: '103 · After Hours', st: '#3F8A12' },
  { av: 'quincey', name: 'Quincey Hart', ph: '+1 (202) 555-0199', d: '104 · Orders · After Hours', st: '#74768A' },
  { av: 'kevin', name: 'Kevin Lui', ph: '+1 (202) 555-0456', d: '105 · Sales · Support', st: '#C0392B' },
  { av: 'priya', name: 'Natasha Murphy', ph: '+1 (202) 555-0311', d: '106 · Support', st: '#3F8A12' },
  { av: 'ravi', name: 'Ravi Chandran', ph: '+1 (202) 555-0377', d: '107 · Orders', st: '#3F8A12' },
  { av: 'marcus', name: 'Marcus Reed', ph: '+1 (202) 555-0418', d: '108 · Sales', st: '#74768A' },
];
function teamPane(x, w, H, sel, asCol) {
  const p = asCol ? col(x, w, H) : pane(x, w, H);
  p.append(I('Close|Light', 'position:absolute;left:16px;top:20px'), P('left:52px;top:16px;font:800 24px/32px var(--sf)', 'Team Members'), I('Add|Light', `position:absolute;left:${w - 42}px;top:20px;width:26px;height:26px`));
  p.append(h('div', 'ds-field', { left: '16px', top: '64px', width: w - 32 + 'px' }, [I('Search|Light'), 'Search team members']));
  p.append(P('left:16px;top:116px;display:flex;gap:8px;white-space:nowrap', ['Sales', 'Orders', 'Support', 'After Hours', 'Billing'].map(t => h('div', 'dk-chip', 'height:36px', t))));
  TEAM.forEach((r, i) => {
    const row = h('div', 'ds-tm', { top: 168 + i * 84 + 'px', background: i === sel ? '#EFF0FE' : '#fff' }, [
      P(`left:16px;top:18px;width:48px;height:48px;border-radius:12px;background:${img(r.av)} center/cover`), h('div', 'st', { background: r.st }),
      h('div', 'a', null, [r.name, r.admin ? h('span', 'ds-admin', null, 'ADMIN') : '']), h('div', 'b', null, ['📱 ', r.ph]), h('div', 'c', null, r.d), I('chev', '')]);
    row.lastChild.classList.add('chev');
    if (i === sel) row.append(P('right:0;top:0;bottom:0;width:3px;background:#3356FF'));
    p.append(row);
  });
  return p;
}
function memberDetails(x, w, H) {
  const d = det(x, w, H);
  d.append(I('chev', 'position:absolute;left:16px;top:20px;width:24px;height:24px;transform:scaleX(-1)'), I('Edit|Light', `position:absolute;left:${w - 40}px;top:20px`));
  const cw = w - 32;
  d.append(P(`left:16px;top:60px;width:${cw}px;height:170px;border-radius:16px;background:#E6E8FB;border:1px solid #D5D8F5`, [
    P(`left:14px;top:14px;width:64px;height:64px;border-radius:50%;border:2px solid #fff;background:${img('jesse')} center/cover`),
    P('left:92px;top:20px;display:flex;align-items:center;gap:8px;font:700 20px/28px var(--sf);white-space:nowrap', ['Jesse Di Lucca', h('span', 'ds-admin', null, 'ADMIN')]),
    P('left:92px;top:50px;font:400 15px/20px var(--sf);color:#444658', 'Sales · English'),
    ...['Chat', 'Call', 'Tickets', 'More'].map((t, i) => h('div', 'ds-btn4', { left: 14 + i * ((cw - 28 - 18) / 4 + 6) + 'px', top: '100px', width: (cw - 28 - 18) / 4 + 'px' }, [I(['Chat 2|Light', 'Call|Light', 'Clipboard check / task|Light', null][i] || 'More|Light'), t]))]));
  d.append(P(`left:16px;top:246px;width:${cw}px;height:64px;border-radius:12px;background:#EFF0FE;border:1px solid #DFE1F8`, [
    P('left:14px;top:10px;font:400 13px/18px var(--sf);color:#444658', 'Business line'), P('left:14px;top:30px;font:600 16px/22px var(--sf)', '+1 (971) 555-1212'),
    P(`left:${cw - 110}px;top:10px;font:400 13px/18px var(--sf);color:#444658`, 'Extension'), P(`left:${cw - 110}px;top:30px;font:600 16px/22px var(--sf)`, '101')]));
  [[340, 'Call|Light', 'Phone', '+1 (971) 567-1234'], [384, 'Mail|Light', 'Email', 'jesse@bobsshack.com'], [428, 'Support|Light', 'Role', h('span', 'ds-chip2', null, 'Admin')]].forEach(([y, ic, k, v]) => d.append(kv(y, 16, ic, k, v)));
  d.append(kv(476, 16, 'Group|Light', 'Teams', h('div', null, `width:${w - 140}px;white-space:normal;margin-top:-4px`, [h('span', 'ds-chip2', null, ['Sales', I('Close|Light')]), h('span', 'ds-chip2', null, ['Support', I('Close|Light')]), h('span', 'ds-chip2', 'background:#fff', [I('Add|Light'), 'Add'])])));
  d.append(kv(560, 16, 'Schedule / Calender|Light', 'Availability', 'Mon–Fri · 9am – 6pm'));
  return d;
}
/* business details pane */
function businessPane(x, w, H) {
  const p = pane(x, w, H);
  const cw = Math.min(560, w - 64), cl = Math.round((w - cw) / 2);
  p.append(I('Close|Light', 'position:absolute;left:16px;top:20px'), P('left:52px;top:16px;font:800 24px/32px var(--sf)', 'Business Details'),
    P(`left:${w - 76}px;top:18px;height:30px;padding:0 13px;border-radius:15px;background:#DFE1F8;color:#3356FF;font:500 14px/30px var(--sf)`, 'Edit'));
  p.append(P(`left:${w / 2 - 54}px;top:74px;width:108px;height:108px;border-radius:50%;background:radial-gradient(circle at 50% 40%,#F2F3FF,#DFE1F8);display:grid;place-items:center;font-size:58px;line-height:1`, '🐣'),
    P('left:0;right:0;top:196px;text-align:center;font:700 22px/30px var(--sf)', 'Bob’s Fried Chicken Shack'), P('left:0;right:0;top:228px;text-align:center;font:400 15px/20px var(--sf);color:#444658', 'Restaurant'));
  p.append(P(`left:${cl}px;top:268px;width:${cw}px;height:64px;border-radius:12px;background:#E5EAFF;display:flex;align-items:center;gap:12px;padding:0 16px;font:400 14.5px/20px var(--sf)`, [svg(INFO_O, 'width:22px;height:22px;flex:none;color:#171A2B'),
    h('div', null, null, [h('b', null, 'font-weight:600', 'Second number active. '), 'Calls and texts to +1 (971) 555-1414 now route to ', h('b', null, 'font-weight:600', 'Bob’s Burger Shack'), '.'])]));
  [[366, 'Call|Light', 'Phone', '+1 (971) 555-1212'], [410, 'Mail|Light', 'Email', 'hello@bobsfriedchicken.com'], [454, 'Website Globe Planet Sphere|Light', 'Website', 'bobsfriedchicken.com'],
   [498, 'Location|Light', 'Address', h('div', null, 'white-space:normal', ['2150 NW Lovejoy St', h('br'), 'Portland, OR 97210', h('br'), 'United States'])]].forEach(([y, ic, k, v]) => p.append(kv(y, cl, ic, k, v)));
  return p;
}

/* ───────── embedded mobile page as a desktop column ───────── */
function mobileCol(x, H, mob, title) {
  const c = col(x, 375, H);
  const el = mob.el; el.style.top = '-47px'; el.style.height = H + 47 + 'px';
  el.querySelectorAll(':scope > .sbar, :scope > .tabs, :scope > .as-tabs').forEach(n => n.remove());
  c.append(el);
  const hd = P('left:0;top:0;width:375px;height:64px;background:#fff;z-index:30', [h('div', 'dk-title', null, title), h('div', 'dk-acts', null, [I('Search|Light'), I('Add|Light')])]);
  c.append(hd);
  return c;
}

/* ───────── overlays ───────── */
function liveWidget(x, y) {
  const g = I('Outgoing Call|Light'); g.classList.add('g');
  const grp = I('Group|Light'); grp.classList.add('grp');
  return h('div', 'dk-live', { left: x + 'px', top: y + 'px' }, [
    h('div', 'top', null, [emo('🧘'), 'Restore Wellness Clinic', g]), grp,
    h('div', 'lav', { backgroundImage: img('keisha') }), h('div', 'nm', null, 'Keisha Morgan'),
    h('div', 'tm', null, ['01:46', h('span', 'dk-rec', null, ['REC', h('i')])]),
    h('div', 'ctl', null, [h('div', 'w', null, I('Speaker / Sound On2|Light')), h('div', null, null, I('Dialpad 2|Light')), h('div', null, null, I('Mute / Microphone off / Record|Light')), h('div', null, null, I('Call Transfer|Light')), h('div', null, null, svg(DOTS, 'width:22px;height:22px')), h('div', 'r', null, I('Call|Bold', 'transform:rotate(135deg)'))])]);
}
function incomingOverlay(W, H) {
  const g = I('Incoming Call|Light'); g.classList.add('g');
  const x = I('Close|Light'); x.classList.add('x');
  return [h('div', 'dk-dim', { width: W + 'px', height: H + 'px' }), h('div', 'dk-inc', { left: (W - 360) / 2 + 'px', top: (H - 221) / 2 + 'px' }, [
    h('div', 'top', null, [emo('🧘'), 'Restore Wellness Clinic', g]), x,
    h('div', 'lav', { top: '70px', backgroundImage: img('noah') }), h('div', 'nm', null, 'Noah Anderson'), h('div', 'sb', null, 'Inbound Call'),
    h('div', 'btns', null, [h('div', 'rj', null, [I('Call|Bold', 'transform:rotate(135deg)'), 'Reject']), h('div', 'ac', null, [I('Call|Bold'), 'Accept'])])])];
}
function transferDialog(W, H) {
  const box = P(`left:${(W - 430) / 2}px;top:${(H - 278) / 2}px;width:430px;height:278px;border-radius:24px;background:#fff;box-shadow:0 12px 40px rgba(38,44,90,.22);z-index:21`, [
    P('left:120px;top:20px;width:190px;height:80px;border-radius:26px;background:#D7FDB7'),
    P(`left:132px;top:32px;width:56px;height:56px;border-radius:16px;background:${img('jesse')} center/cover;box-shadow:0 0 0 2px #EEF0FA`),
    P(`left:242px;top:32px;width:56px;height:56px;border-radius:16px;background:${img('alexis')} center/cover;box-shadow:0 0 0 2px #EEF0FA`),
    icon('Call Transfer|Bold', 'position:absolute;left:200px;top:45px;width:30px;height:30px;color:#3F7D1C'),
    P('left:286px;top:76px;width:16px;height:16px;border-radius:50%;background:#3F8A12;border:3px solid #fff'),
    P('left:0;right:0;top:122px;text-align:center;font:700 21px/28px var(--sf)', 'Transfer to Sarah'),
    P('left:0;right:0;top:154px;text-align:center;font:400 15px/20px var(--sf);color:#444658', 'Keisha Morgan · Billing'),
    P('left:20px;top:202px;width:189px;height:52px;border-radius:15px;background:#DFE1F8;color:#B23220;display:grid;place-items:center;font:400 17px/1 var(--sf)', 'Cancel'),
    P('left:221px;top:202px;width:189px;height:52px;border-radius:15px;background:#3356FF;color:#fff;display:grid;place-items:center;font:400 17px/1 var(--sf)', 'Transfer Now')]);
  return [h('div', 'dk-dim', { width: W + 'px', height: H + 'px' }), box];
}

/* ───────── compositions (one per slide) ───────── */
const DS = {};
/* Responsive rule (product): rail 72 · list 360 (fixed) · centre ≥ 400 (flex) · context 360 (fixed).
   Panels appear as the width qualifies: 1 → list only, 2 → list + centre, 3 → list + centre + context. */
const RAIL = 72, LIST = 360, CTX = 360, CENTER_MIN = 400;
const panes = (W) => { const a = W - RAIL; return a >= LIST + CENTER_MIN + CTX ? 3 : a >= LIST + CENTER_MIN ? 2 : 1; };
const W3 = (W) => panes(W) === 3;
DS.calls = ({ W, H, key = 'michael', overlay }) => {
  const el = root(W, H, 'Calls');
  el.append(summaryPane(432, W - 432, H, key), callsCol(72, H, key));
  if (overlay === 'incoming') el.append(...incomingOverlay(W, H));
  if (overlay === 'transfer') { el.append(liveWidget(88, H - 235)); el.append(...transferDialog(W, H)); }
  if (overlay === 'live') el.append(liveWidget(88, H - 235));
  return { el };
};
DS.inbox = ({ W, H, key = 'michael', typed, chips, gap }) => {
  const el = root(W, H, 'Inbox');
  const three = W3(W), dw = CTX;
  el.append(convPane(432, (three ? W - dw : W) - 432, H, key, { typed, chips, gap }), inboxCol(72, H, key));
  if (three) el.append(contactDetails(W - dw, dw, H, key));
  return { el };
};
DS.tickets = ({ W, H }) => {
  const el = root(W, H, 'Tickets');
  const three = W3(W), dw = CTX;
  el.append(convPane(432, (three ? W - dw : W) - 432, H, 'ticket'), ticketsCol(72, H));
  if (three) el.append(ticketDetails(W - dw, dw, H));
  return { el };
};
DS.receptionist = ({ W, H }) => {
  const el = root(W, H, 'AI');
  const m = MS.receptionist();
  el.append(summaryPane(447, W - 447, H, 'noah'), mobileCol(72, H, m, 'AI Receptionist'));
  return { el };
};
DS.autoAttendant = ({ W, H }) => {
  const el = root(W, H, 'Flow');
  const m = MS.autoAttendant();
  m.el.querySelector('.scr375 > div[style*="z-index:25"]')?.remove();
  el.append(summaryPane(447, W - 447, H, 'ravi'), mobileCol(72, H, m, 'Auto Attendant'));
  return { el };
};
DS.team = ({ W, H }) => {
  const el = root(W, H, 'Settings');
  const three = W3(W);
  if (three) el.append(memberDetails(W - 420, 420, H), teamPane(432, W - 432 - 420, H, 0, true), menuCol(72, H, 'team'));
  else el.append(teamPane(432, W - 432, H, -1), menuCol(72, H, 'team'));
  return { el };
};
DS.business = ({ W, H }) => {
  const el = root(W, H, 'Settings');
  el.append(businessPane(432, W - 432, H), menuCol(72, H, 'num1'));
  return { el };
};

/* window chrome */
DS.macTitlebar = () => h('div', 'ds-tbar', null, [h('i', null, 'left:14px;background:#FF5F57'), h('i', null, 'left:34px;background:#FEBC2E'), h('i', null, 'left:54px;background:#28C840')]);
DS.ipadStatus = () => h('div', 'ds-isb', null, [P('left:24px;top:0', '9:41'), P('left:72px;top:0;font-weight:500', 'Thu Oct 1'),
  P('right:22px;top:6px;display:flex;gap:6px;align-items:center', [
    svg('<svg viewBox="0 0 16 12"><path d="M8 2.4c2.3 0 4.4.9 6 2.4l1.2-1.2A10.2 10.2 0 0 0 8 .6 10.2 10.2 0 0 0 .8 3.6L2 4.8a8.5 8.5 0 0 1 6-2.4Zm0 3.4c1.4 0 2.7.5 3.6 1.4l1.2-1.2A6.8 6.8 0 0 0 8 4a6.8 6.8 0 0 0-4.8 2l1.2 1.2c1-.9 2.2-1.4 3.6-1.4Zm0 3.4c.5 0 1 .2 1.3.5L8 11 6.7 9.7c.3-.3.8-.5 1.3-.5Z" fill="currentColor"/></svg>', 'width:16px;height:12px'),
    h('span', null, 'font:600 13px/1 var(--sf)', '100%'),
    svg('<svg viewBox="0 0 28 13"><rect x=".5" y=".5" width="24" height="12" rx="3.8" fill="none" stroke="currentColor" opacity=".4"/><rect x="2" y="2" width="21" height="9" rx="2.5" fill="currentColor"/><path d="M26 4.5v4c.8-.3 1.3-1.1 1.3-2s-.5-1.7-1.3-2Z" fill="currentColor" opacity=".45"/></svg>', 'width:27px;height:13px')])]);

/* ═════════ v4: real-app patterns (Menu overlay, team list/detail, transfer state) ═════════ */
const TOGGLE = (on = true) => P(`position:relative;width:44px;height:26px;border-radius:13px;background:${on ? '#4E8526' : '#C4C5DC'}`, P(`left:${on ? 20 : 2}px;top:2px;width:22px;height:22px;border-radius:50%;background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.2)`));
/* Menu panel (left half of the overlay) */
function menuPanel(w, hh, active, numGap = 0) {
  const p = h('div', '', `position:absolute;left:0;top:0;width:${w}px;height:${hh}px;background:#fff;overflow:hidden`);
  p.append(I('Close|Light', 'position:absolute;left:18px;top:20px;width:24px;height:24px'), P('left:56px;top:15px;font:700 22px/32px var(--sf)', 'Menu'));
  p.append(P(`left:0;top:58px;width:${w}px;height:150px;background:${SPARK} 0 0/14.6px 14.6px;-webkit-mask:linear-gradient(90deg,transparent,#000 15%,#000 85%,transparent)`));
  p.append(P(`left:${w / 2 - 38}px;top:62px;width:76px;height:76px;border-radius:50%;background:${img('bob')} center 30%/cover,#F4D4EE;box-shadow:0 0 0 2px #EFE5F6`),
    P('left:0;right:0;top:146px;display:flex;justify-content:center;align-items:center;gap:4px;font:700 20px/28px var(--sf)', ['Bob Hart', I('chev', 'width:22px;height:22px')]),
    P(`left:${w / 2 - 47}px;top:178px;width:94px;height:28px;border-radius:14px;background:#D8FDB7;box-shadow:inset 0 0 0 1px #9AD86C;display:flex;align-items:center;justify-content:center;gap:6px;font:400 15px/1 var(--sf)`, ['Available', P('position:relative;width:8px;height:8px;border-radius:50%;background:#3F8A12')]));
  const rows = [['num1', emo('🐣', 20), '+1 (971) 555-1212', 'Bob’s Fried Chicken Shack', 1], ['num2', emo('🍔', 20), '+1 (971) 555-1414', 'Bob’s Burger Shack', 1],
    ['team', I('Support|Light'), 'Team Members', '5 active users'], ['sms', I('Chat 2|Light'), 'Text Message Automation', 'Message signature & auto-replies'],
    ['prefs', I('Settings|Light'), 'Preferences', 'Productivity settings'], ['support', svg(MARK, ''), 'Support & Account', ''], ['out', svg(SIGNOUT, 'color:#B23220'), 'Sign Out', '']];
  let y = 232;
  rows.forEach(([k, ic, a, b, big], i) => {
    const hgt = b ? 66 : 54, on = k === active;
    ic.style.cssText += ';position:absolute;left:16px;top:' + (hgt / 2 - 12) + 'px;width:24px;height:24px';
    const r = P(`left:0;top:${y}px;width:${w}px;height:${hgt}px;${on ? 'background:#EFF0FE' : ''}`, [ic,
      P(`left:52px;top:${b ? 11 : 16}px;font:${big ? 600 : 600} ${big ? 16 : 15}px/22px var(--sf);white-space:nowrap`, a),
      b ? P(`left:52px;top:35px;font:400 14px/20px var(--sf);color:#444658;white-space:nowrap`, b) : '',
      I('chev', `position:absolute;left:${w - 38}px;top:${hgt / 2 - 11}px;width:22px;height:22px;color:#444658`),
      on ? P(`left:${w - 3}px;top:0;width:3px;height:${hgt}px;background:#3356FF`) : '']);
    r.dataset.k = k; p.append(r);
    y += hgt + (k === 'num1' || k === 'num2' ? numGap : 0);
    if (i === 1 || i === 3 || i === 5) { p.append(P(`left:16px;top:${y + 4}px;width:${w - 32}px;height:1px;background:#E8E9FA`)); y += 9; }
  });
  p.append(P(`left:0;right:0;top:${hh - 34}px;text-align:center;font:400 14px/20px var(--sf);color:#444658`, 'Version 8.9.0'));
  return p;
}
/* team list (real pattern: "phone:" line + extension) */
const TEAM4 = [
  { av: 'jesse', name: 'Jesse Di Lucca (You)', admin: true, ph: '+1 (971) 567-1234', ext: '100', st: '#3F8A12' },
  { lisa: true, name: 'Lisa (AI Agent)', st: '#3F8A12' },
  { av: 'alexis', name: 'Alexis Johnson', ph: '+1 (971) 567-9352', ext: '101', st: '#3F8A12' },
  { av: 'kevin', name: 'Kevin Lui', ph: '+1 (202) 555-0456', ext: '102', st: '#3F8A12' },
  { av: 'judith', name: 'Alice Grossman', ph: '+1 (202) 555-0832', ext: '103', st: '#C0392B' },
  { av: 'quincey', name: 'Quincey Hart', ph: '+1 (202) 555-0199', ext: '104', st: '#74768A' },
  { av: 'priya', name: 'Natasha Murphy', ph: '+1 (202) 555-0311', ext: '105', st: '#3F8A12' },
];
function teamList(w, hh, { sel = -1, ringing = [] } = {}) {
  const p = h('div', '', `position:absolute;left:0;top:0;width:${w}px;height:${hh}px;background:#fff;overflow:hidden`);
  p.append(P('left:18px;top:15px;font:700 22px/32px var(--sf)', 'Team Members'), I('Add|Light', `position:absolute;left:${w - 44}px;top:19px;width:26px;height:26px`));
  p.append(h('div', 'ds-field', { left: '16px', top: '62px', width: w - 32 + 'px', height: '44px', borderRadius: '12px' }, [I('Search|Light'), 'Search team members']));
  TEAM4.forEach((r, i) => {
    const hgt = r.lisa ? 76 : 92, y = 122 + TEAM4.slice(0, i).reduce((a, t) => a + (t.lisa ? 76 : 92), 0);
    const av = r.lisa ? P('left:16px;top:16px;width:46px;height:46px;border-radius:12px;background:url(assets/defaults/ls-lisa-answers.png) center/cover')
      : P(`left:16px;top:20px;width:46px;height:46px;border-radius:12px;background:${img(r.av)} center/cover`);
    const row = P(`left:0;top:${y}px;width:${w}px;height:${hgt}px;border-bottom:1px solid #EFF0FE;background:${i === sel ? '#EFF0FE' : '#fff'}`, [av,
      P(`left:56px;top:${r.lisa ? 54 : 58}px;width:11px;height:11px;border-radius:50%;background:${r.st};box-shadow:0 0 0 2px #fff`),
      P('left:76px;top:14px;display:flex;align-items:center;gap:8px;font:600 16px/22px var(--sf);white-space:nowrap', [r.name, r.admin ? h('span', 'ds-admin', null, 'ADMIN') : '']),
      r.lisa ? P('left:76px;top:39px;font:400 14.5px/20px var(--sf);color:#444658;white-space:nowrap', ['Answers ', h('b', null, 'color:#3F8A12;font-weight:600', 'all incoming calls')])
        : P('left:76px;top:38px;font:400 14.5px/20px var(--sf);color:#444658;white-space:nowrap', 'phone: ' + r.ph),
      r.lisa ? '' : P('left:76px;top:60px;font:600 14.5px/20px var(--sf);color:#444658', r.ext),
      ringing.includes(i) ? P(`left:${w - 132}px;top:${hgt / 2 - 13}px;height:26px;padding:0 10px 0 8px;border-radius:13px;background:#D7FDB7;box-shadow:inset 0 0 0 1px #9AD86C;display:flex;align-items:center;gap:5px;font:500 13px/1 var(--sf);color:#2E6A10`, [I('Ring / Call|Bold', 'width:15px;height:15px;color:#3F8A1F'), 'Ringing']) : '',
      I('chev', `position:absolute;left:${w - 38}px;top:${hgt / 2 - 11}px;width:22px;height:22px;color:#444658`),
      i === sel ? P(`left:${w - 3}px;top:0;width:3px;height:${hgt}px;background:#3356FF`) : '']);
    p.append(row);
  });
  return p;
}
/* team member detail (real pattern) */
function memberPanel(w, hh) {
  const p = h('div', '', `position:absolute;left:0;top:0;width:${w}px;height:${hh}px;background:#fff;overflow:hidden`);
  const cw = w - 32;
  p.append(I('chev', 'position:absolute;left:14px;top:20px;width:24px;height:24px;transform:scaleX(-1)'));
  p.append(P(`left:16px;top:58px;width:${cw}px;height:184px;border-radius:18px;background-color:#E6E8FB;background-image:radial-gradient(circle,rgba(255,255,255,.6) 1px,transparent 1.6px);background-size:12px 12px;border:1px solid #D5D8F5`, [
    P(`left:16px;top:16px;width:84px;height:84px;border-radius:50%;border:3px solid #fff;background:${img('alexis')} center/cover`),
    P('left:86px;top:82px;width:13px;height:13px;border-radius:50%;background:#3F8A12;box-shadow:0 0 0 2px #fff'),
    P('left:116px;top:30px;display:flex;align-items:center;gap:8px;font:700 22px/30px var(--sf);white-space:nowrap', ['Alexis Johnson', I('Edit|Bold', 'width:16px;height:16px')]),
    P('left:116px;top:62px;font:400 16px/22px var(--sf);color:#444658', 'Bob’s Fried Chicken Shack'),
    ...['Chat', 'Call', 'Ticket', 'More'].map((t, i) => h('div', 'ds-btn4', { left: 14 + i * ((cw - 28 - 18) / 4 + 6) + 'px', top: '114px', width: (cw - 28 - 18) / 4 + 'px', height: '56px', borderRadius: '14px', border: '0' },
      [i === 3 ? svg(DOTS, 'width:20px;height:20px') : I(['Chat 2|Light', 'Call|Light', 'Clipboard check / task|Light'][i]), t]))]));
  p.append(P(`left:16px;top:258px;width:${cw}px;height:72px;border-radius:14px;background:#EFF0FE;border:1px solid #DFE1F8`, [
    P('left:16px;top:12px;font:400 14px/20px var(--sf);color:#444658', 'Business Line'), P('left:16px;top:36px;font:600 17px/24px var(--sf)', '+1 (971) 555-1212'),
    P(`left:${cw - 96}px;top:0;width:1px;height:72px;background:#DFE1F8`),
    P(`left:${cw - 80}px;top:12px;font:400 14px/20px var(--sf);color:#444658`, 'Extension'), P(`left:${cw - 80}px;top:36px;font:600 17px/24px var(--sf)`, '101')]));
  p.append(P(`left:16px;top:348px;width:${cw}px;border-top:1.5px dashed #E3E4F6`));
  [[372, 'Call|Light', 'Phone', '+1 (971) 567-9352'], [416, 'Mail|Light', 'Email', 'alexis@bobsshack.com']].forEach(([y, ic, k, v]) => p.append(kv(y, 16, ic, k, v)));
  p.append(kv(462, 16, 'Support|Light', 'Role', h('span', 'ds-chip2', 'margin-top:-4px', 'User')));
  p.append(kv(512, 16, 'Group|Light', 'Department', h('div', null, `display:flex;gap:6px;margin-top:-4px`, [h('span', 'ds-chip2', null, ['Sales Team', I('Close|Light')]), h('span', 'ds-chip2', 'background:#fff', [I('Add|Light'), 'Add'])])));
  p.append(P(`left:16px;top:562px;width:${cw}px;border-top:1.5px dashed #E3E4F6`));
  p.append(P(`left:16px;top:582px;width:${cw}px;height:58px;border-radius:14px;border:1px solid #DFE1F8;display:flex;align-items:center;justify-content:space-between;padding:0 16px;font:400 17px/1 var(--sf)`, ['Can receive calls', TOGGLE(true)]));
  p.append(P(`left:16px;top:652px;width:${cw}px;font:400 13.5px/19px var(--sf);color:#444658`, 'Allows this user to receive business calls. If Call Menu is on, add them to a Route to Users option.'));
  return p;
}
/* a mobile page (375-wide design) re-laid out to fit a panel, without the iOS status bar */
function pagePanel(mobEl, w, hh, o) {
  const el = widen(mobEl, w, hh + 47, o);
  el.querySelectorAll('.sbar,.as-tabs,.tabs').forEach(n => n.remove());
  const wrap = h('div', '', `position:absolute;left:0;top:0;width:${w}px;height:${hh}px;overflow:hidden;background:#fff`);
  el.style.top = '-40px'; wrap.append(el);
  return wrap;
}
/* the Menu overlay: dimmed app behind two white panels */
function overlay(base, W, H, left, lw, right, rw) {
  const top = 80, hh = H - 165, gap = 6, pad = 5, x0 = (W - lw - rw - gap) / 2;
  base.append(P(`left:0;top:0;width:${W}px;height:${H}px;background:rgba(23,26,43,.42);z-index:20`));
  const frame = P(`left:${x0 - pad}px;top:${top - pad}px;width:${lw + rw + gap + 2 * pad}px;height:${hh + 2 * pad}px;border-radius:${16 + pad}px;background:#E3E5F8;box-shadow:0 24px 60px rgba(23,26,43,.28);z-index:21`);
  const box = (x, w, kid) => P(`left:${x}px;top:${pad}px;width:${w}px;height:${hh}px;border-radius:16px;overflow:hidden;background:#fff`, kid);
  frame.append(box(pad, lw, left), box(pad + lw + gap, rw, right));
  base.append(frame);
  return { top, hh, lx: x0, rx: x0 + lw + gap };
}
/* compositions */
DS.v4calls = ({ W, H, key = 'michael', live, transfer }) => {
  const el = root(W, H, 'Calls');
  el.append(summaryPane(432, W - 432, H, key), callsCol(72, H, key));
  if (live) { const lw = liveWidget(88, H - 235); el.append(lw);
    if (transfer) { lw.querySelector('.tm').before(h('div', '', 'position:absolute;left:87px;top:98px;font:500 15px/22px var(--sf);color:#7BD23A', 'Transferring to Sarah…')); lw.querySelector('.tm').style.top = '124px'; lw.querySelector('.nm').style.top = '68px'; } }
  return { el };
};
DS.menuOverlay = ({ W, H, base = 'inbox', left, right, lw = 380, rw = 500 }) => {
  const el = (base === 'inbox' ? DS.inbox({ W, H }) : DS.v4calls({ W, H })).el;
  const g = { hh: H - 165 };
  const L = left(lw, g.hh), R = right(rw, g.hh);
  const o = overlay(el, W, H, L, lw, R, rw);
  return { el, o };
};
DS.menuPanel = menuPanel; DS.ticketsCol = (H) => ticketsCol(0, H); DS.teamList = teamList; DS.memberPanel = memberPanel; DS.pagePanel = pagePanel; DS.businessBody = (w, hh) => { const p = businessPane(0, w, hh); p.style.position = 'absolute'; return p; };

/* Auto Attendant › Intro Greeting (Play Audio pattern, from the app) */
DS.greetingEdit = (w, hh) => {
  const p = h('div', '', `position:absolute;left:0;top:0;width:${w}px;height:${hh}px;background:#fff;overflow:hidden`);
  const cw = w - 32;
  const PEN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><path d="M15.2 5.2l3.6 3.6M4.5 19.5l1-4.4L15 5.6a2.5 2.5 0 0 1 3.5 3.5L9 18.6l-4.5.9Z"/></svg>';
  const VOICE = '<svg viewBox="0 0 24 24" fill="none" stroke="#3356FF" stroke-width="1.6" stroke-linecap="round"><path d="M3 10v4M7 7v10M11 4v16M15 8v8M19 6v12M23 10v4"/></svg>';
  const TRASH = '<svg viewBox="0 0 24 24" fill="none" stroke="#DE260C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 7h15M9.5 7V5h5v2M6.5 7l1 12.5h9L17.5 7M10 11v5M14 11v5"/></svg>';
  p.append(I('Close|Light', 'position:absolute;left:16px;top:21px;width:24px;height:24px'),
    P('left:48px;top:21px;display:flex;align-items:center;gap:5px;font:400 15px/24px var(--sf);color:#444658', ['Business Hours', I('Right Arrow 1|Light', 'width:14px;height:14px;color:#444658')]),
    P(`left:${w - 74}px;top:17px;width:58px;height:32px;border-radius:16px;background:#3356FF;color:#fff;display:grid;place-items:center;font:500 15px/1 var(--sf)`, 'Save'),
    P('left:16px;top:64px;font:700 21px/28px var(--sf);letter-spacing:-.2px', 'Intro Greeting'),
    P('left:16px;top:96px;font:400 14.5px/20px var(--sf);color:#444658', 'Setup what callers hear first.'),
    P(`left:16px;top:130px;width:${cw}px;border-top:1.5px dashed #E3E4F6`));
  const row = (y, ic, k, v) => P(`left:0;top:${y}px;width:${cw}px;height:56px;border-top:1px solid #EFF0FE;display:flex;align-items:center;gap:8px;padding:0 16px;font:400 15px/1 var(--sf)`,
    [ic, h('span', null, null, [k + ': ', h('b', null, 'font-weight:600', v)]), h('span', null, 'flex:1'), svg(PEN, 'width:22px;height:22px')]);
  const card = P(`left:16px;top:146px;width:${cw}px;height:398px;border:1px solid #DFE1F8;border-radius:20px;overflow:hidden;background:#fff`, [
    I('Music|Light', 'position:absolute;left:16px;top:18px;width:22px;height:22px'),
    P('left:48px;top:17px;font:600 16.5px/24px var(--sf)', 'Play Audio'), I('Up|Light', `position:absolute;left:${cw - 40}px;top:17px;width:24px;height:24px`),
    row(58, I('text ai |Other', 'width:22px;height:22px;color:#3356FF'), 'Type', 'Text to speech'),
    row(114, svg(VOICE, 'width:22px;height:22px'), 'Voice', 'Lisa'),
    P(`left:0;top:170px;width:${cw}px;height:1px;background:#EFF0FE`),
    P(`left:16px;top:184px;width:${cw - 32}px;font:400 16.5px/24px var(--sf)`, 'Thanks for calling Summit Tax & Accounting. For our CPA Team, please press 1. For our tax team, press 2.'),
    P('left:16px;top:270px;width:90px;height:34px;border-radius:12px;background:#3356FF;color:#fff;display:grid;place-items:center;font:500 14.5px/1 var(--sf)', 'Generate'),
    P(`left:0;top:322px;width:${cw}px;height:1px;background:#EFF0FE`),
    P('left:16px;top:340px;width:46px;height:38px;border-radius:19px;background:#171A2B;display:grid;place-items:center', I('Play|Bold', 'width:18px;height:18px;color:#fff')),
    P(`left:72px;top:356px;width:${cw - 72 - 100}px;height:6px;border-radius:3px;background:#DFE1F8`, P('left:0;top:0;width:38%;height:6px;border-radius:3px;background:#3356FF')),
    P(`left:${cw - 92}px;top:348px;font:600 14.5px/22px var(--sf)`, '0:07'),
    P(`left:${cw - 56}px;top:340px;width:40px;height:38px;border-radius:19px;background:#F9DCD7;display:grid;place-items:center`, svg(TRASH, 'width:20px;height:20px'))]);
  p.append(card, P(`left:16px;top:560px;width:${cw}px;border-top:1.5px dashed #E3E4F6`),
    P(`left:16px;top:576px;width:${cw}px;height:70px;border:1px solid #DFE1F8;border-radius:18px`, [I('Settings|Light', 'position:absolute;left:16px;top:23px;width:24px;height:24px'),
      P('left:52px;top:13px;font:600 15px/22px var(--sf)', 'More Settings'), P('left:52px;top:36px;font:400 14px/20px var(--sf);color:#444658', 'Repeat count, automatic action'),
      I('Down|Light', `position:absolute;left:${cw - 40}px;top:23px;width:24px;height:24px`)]));
  return p;
};
DS.leadCapture = (w, hh) => {
  const p = h('div', '', `position:absolute;left:0;top:0;width:${w}px;height:${hh}px;overflow:hidden;background:radial-gradient(60% 40% at 15% 30%,#FBEAF4,rgba(255,255,255,0) 70%),radial-gradient(50% 40% at 90% 30%,#EEE6FB,rgba(255,255,255,0) 70%),#fff`);
  const cw = w - 32;
  const LOCK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="5" y="10.5" width="14" height="10" rx="3"/><path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5"/><path d="M12 14.5v2" stroke-linecap="round"/></svg>';
  p.append(I('Close|Light', 'position:absolute;left:16px;top:20px;width:26px;height:26px'),
    P(`left:${w - 76}px;top:16px;width:60px;height:34px;border-radius:12px;background:#3356FF;color:#fff;display:grid;place-items:center;font:500 16px/1 var(--sf)`, 'Save'),
    P(`left:${w - 210}px;top:62px;width:190px;height:226px;background:url(assets/lisa-notepad.png) center top/contain no-repeat`),
    P('left:16px;top:112px;font:800 32px/40px var(--sf);letter-spacing:-.3px', 'Lead Capture'),
    P(`left:16px;top:158px;width:${w - 230}px;font:400 16px/23px var(--sf);color:#171A2B`, 'Lisa collects caller details when she can’t answer a query or connect to the right team member.'),
    P('left:16px;top:262px;font:700 18px/26px var(--sf)', 'Info Lisa collects'));
  p.append(DS.leadList(cw, 'left:16px;top:300px'));
  p.append(P(`left:16px;top:${300 + 5 * 56 + 16}px;width:${cw}px;border-radius:16px;background:#DFE1F8;padding:14px 16px 14px 48px;font:italic 400 15px/21px var(--sf);color:#171A2B`, [
    h('div', '', 'position:absolute;left:14px;top:50%;margin-top:-11px;width:22px;height:22px;border-radius:50%;background:#444658;color:#fff;display:grid;place-items:center;font:700 13px/1 var(--sf);font-style:normal', 'i'),
    'Avoid collecting email addresses or phone numbers, as they’re often misheard.']));
  return p;
};
DS.leadList = (cw, pos = '') => {
  const LOCK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="5" y="10.5" width="14" height="10" rx="3"/><path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5"/><path d="M12 14.5v2" stroke-linecap="round"/></svg>';
  const box = (on, lock) => h('div', '', `width:22px;height:22px;border-radius:6px;${on ? `background:${lock ? '#8D9BFF' : '#3356FF'};` : 'border:1.5px solid #5C5D71;'}display:grid;place-items:center`, on ? svg('<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m6 12.5 4 4 8-9"/></svg>', 'width:16px;height:16px') : '');
  const R = [['Name (Default)', 1, 1], ['Reason for calling (Default)', 1, 1], ['Preferred callback time', 1, 0], ['Preferred team member', 0, 0], ['Other', 0, 0]];
  return P(`${pos};width:${cw}px;height:${R.length * 56}px;border:1px solid #DFE1F8;border-radius:16px;background:#fff;overflow:hidden`, R.map(([t, on, lock], i) =>
    P(`left:0;top:${i * 56}px;width:${cw}px;height:56px;${i ? 'border-top:1px solid #EFF0FE;' : ''}display:flex;align-items:center;gap:14px;padding:0 16px;font:400 16px/1 var(--sf)`,
      [h('span', '', 'flex:1', t), lock ? svg(LOCK, 'width:22px;height:22px;color:#444658') : '', box(on, lock)])));
};
DS.irow = (i, sel) => irow(IROWS[i], sel);
DS.sumBlock = sumBlock; DS.sumBlockH = sumBlockH;
DS.menuCol = (H, active) => menuCol(0, H, active);
window.DS = DS;
})();

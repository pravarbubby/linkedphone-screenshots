/* iPhone 6.9" App Store set — 1290×2796. Recreates refs/ios_1…10.jpg. */
(() => {
const { h } = UI;
const { slide, text, phone, pop } = STORE;
const S = 2.4667, PX = 152, PY = 526;           // standard phone: 983 px wide frame, screen at 2.4667 px/pt
const at = (d) => d.screenOrigin;                 // [screenX, screenY, s]
const head = (e, l1, l2) => { e.append(text('hl', 158, 92, l1, 'letter-spacing:-1.05px'), text('sub', 296, 62.5, l2, 'letter-spacing:-1px')); };

const slides = [];

/* 3 — Customer Conversations */
slides[3] = { title: 'Customer Conversations', build() {
  const e = slide('ios');
  head(e, 'Customer Conversations', ['Calls, texts, and voicemails. ', ['bb', 'One place'], '.']);
  const scr = MS.inbox();
  const ph = phone(scr.el, { x: PX, y: PY, s: S });
  e.append(ph);
  const k = 3.15;
  e.append(pop(MS.ivyCard(), { x: 50, y: 1778, w: 376.8, h: 118, k, r: 36 }));
  return e;
} };

/* 5 — Tickets, Built In */
slides[5] = { title: 'Tickets, Built In', build() {
  const e = slide('ios');
  head(e, 'Tickets, Built In', ['Keep ', ['bb', 'every customer request'], ' on track.']);
  e.append(phone(MS.tickets().el, { x: PX, y: PY, s: S }));
  e.append(pop(MS.ticketCard(1), { x: 50, y: 1095, w: 367.5, h: 124.7, k: 3.23, r: 36 }));
  return e;
} };

/* 4 — AI Call Summaries */
slides[4] = { title: 'AI Call Summaries', build() {
  const e = slide('ios');
  head(e, 'AI Call Summaries', [['bb', 'Every important detail'], ', captured.']);
  e.append(phone(MS.callSummary().el, { x: PX, y: PY, s: S }));
  e.append(pop(MS.summaryCard(), { x: 50, y: 977, w: 1187, h: 977, k: 1, r: 112 }));
  return e;
} };

/* 1 — Your Business Phone. Reinvented. */
slides[1] = { title: 'Your Business Phone. Reinvented.', build() {
  const e = slide('ios', 'bg-hero');
  e.append(text('hl', 160, 100.5, 'Your Business Phone.', 'letter-spacing:-.3px'), text('hl', 281, 100.5, [['blue', 'Reinvented'], '.'], 'letter-spacing:-.3px'));
  e.append(phone(MS.liveDark().el, { x: 192, y: 501, s: 2.269, bezel: 26.7 }));
  e.append(pop(MS.callerIdBanner(), { x: 65, y: 727, w: 1157, h: 330, k: 1, r: 118, cls: 'dark' }));
  e.append(text('sub', 2504, 62.5, 'Calls, texts, tickets, an AI receptionist.', 'letter-spacing:-.75px'),
           text('sub', 2588, 62.5, [['bb', 'Work solo or as a team'], '. All in one app.'], 'letter-spacing:-1.25px'));
  return e;
} };

/* 2 — 24/7 AI Receptionist */
slides[2] = { title: '24/7 AI Receptionist', build() {
  const e = slide('ios');
  head(e, '24/7 AI Receptionist', [['bb', 'Never miss a call'], ', even when busy.']);
  e.append(phone(MS.receptionist().el, { x: PX, y: PY, s: S }));
  e.append(pop(MS.lisaJobs(), { x: 50, y: 1640, w: 1187, h: 897, k: 1, r: 112 }));
  return e;
} };

/* 6 — Auto Attendant */
slides[6] = { title: 'Auto Attendant', build() {
  const e = slide('ios');
  head(e, 'Auto Attendant', [['bb', 'Every call'], ' goes where it should.']);
  const aa = MS.autoAttendant();
  e.append(phone(aa.el, { x: PX, y: PY, s: S }));
  e.append(pop(MS.introCard(), { x: 365, y: 1363, w: 330, h: 130, k: 3.13, r: 36 }));
  return e;
} };

/* 7 — One Number. One Team. */
slides[7] = { title: 'One Number. One Team.', build() {
  const e = slide('ios');
  head(e, 'One Number. One Team.', [['bb', 'Share calls'], ', texts, & customer requests.']);
  e.append(phone(MS.team().el, { x: PX, y: PY, s: S }));
  e.append(pop(MS.incomingTeam(), { x: 48, y: 1682, w: 483, h: 128, k: 2.457, r: 40 }));
  return e;
} };

/* 8 — Transfer Calls */
slides[8] = { title: 'Transfer Calls', build() {
  const e = slide('ios');
  head(e, 'Transfer Calls', ['Pass live calls to the ', ['bb', 'right person'], '.']);
  e.append(phone(MS.liveLight().el, { x: -183, y: 528, s: S }));
  e.append(pop(MS.transferCard(), { x: 196, y: 1553, w: 890, h: 672, k: 1, r: 72 }));
  return e;
} };

/* 9 — Business Power Texting */
slides[9] = { title: 'Business Power Texting', build() {
  const e = slide('ios');
  head(e, 'Business Power Texting', ['Auto-replies. ', ['bb', 'AI-powered suggestions'], '.']);
  e.append(phone(MS.texting().el, { x: PX, y: PY, s: S }));
  e.append(MS.suggestRow(1.12, 645, 1262, 2));
  return e;
} };

/* 10 — Built to Grow with You */
slides[10] = { title: 'Built to Grow with You', build() {
  const e = slide('ios');
  head(e, 'Built to Grow with You', ['Add numbers for ', ['bb', 'one business or many'], '.']);
  e.append(phone(MS.profileMulti().el, { x: PX, y: PY, s: S }));
  const card = (x, y, w, tx, nx, ...a) => pop(MS.numberCard(...a), { x, y, w, h: 346, k: 1, r: 90, cls: 'num', style: `--tx:${tx}px;--nx:${nx}px` });
  e.append(card(-90, 1340, 1296, 106, 427, '🐣', '+1 (971) 555-1212', 'Bob’s Fried Chicken Shack'),
           card(241, 1734, 1150, 49, 369, '🍔', '+1 (971) 555-1414', 'Bob’s Burger Shack'));
  return e;
} };

STORE.ios = slides;
})();

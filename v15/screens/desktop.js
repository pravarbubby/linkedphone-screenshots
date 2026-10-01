/* Desktop (1428×901 @1×) — refs "Inbox — Active Conversation", "Inbox — Conversation & Contact Details",
   "Calls — AI Call Summary", "Calls — Incoming Call Overlay". Styles in kit/desktop.css (.dk-). */
(() => {
const { h, icon, svg, img } = UI;
const DEF = (k) => `url(assets/defaults/${k}.png)`;
const CHEV = '<svg viewBox="0 0 24 24"><path d="M9.5 5.5 16 12l-6.5 6.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const I = (n, s) => n === 'Right Arrow 2|Light' ? svg(CHEV, s) : icon(n, s);

// LinkedPhone grid mark (rail logo)
const LOGO = '<svg viewBox="0 0 32 32"><g fill="#3356FF"><circle cx="7" cy="7" r="3.4"/><circle cx="16" cy="7" r="3.4"/><circle cx="25" cy="7" r="3.4"/><circle cx="7" cy="16" r="3.4"/><circle cx="16" cy="16" r="3.4"/><circle cx="25" cy="16" r="3.4"/><circle cx="7" cy="25" r="3.4"/><circle cx="16" cy="25" r="3.4"/><circle cx="25" cy="25" r="3.4"/></g><g stroke="#3356FF" stroke-width="2.2" stroke-linecap="round"><path d="M14 9 9 14M23 9l-5 5M23 18l-5 5"/></g></svg>';
const WA = '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="#25D366"/><path d="M5.2 18.8 6.3 15a7.2 7.2 0 1 1 2.7 2.7Z" fill="#fff"/><path d="M9.6 8.4c.2-.4.4-.4.6-.4h.5c.2 0 .4 0 .5.4l.7 1.7c.1.2 0 .4-.1.5l-.5.6c-.1.1-.1.3 0 .4.3.6 1.1 1.6 2.3 2.1.2.1.3 0 .4-.1l.6-.7c.1-.2.3-.2.5-.1l1.6.8c.2.1.3.2.3.3 0 .5-.2 1.1-.7 1.4-.5.4-1.4.6-2.6.1-1.6-.6-3-2-3.7-3.2-.6-1.1-.6-2 .2-3Z" fill="#25D366"/></svg>';
const STATUS = '<svg viewBox="0 0 16 16"><circle cx="8" cy="8" r="6.6" fill="none" stroke="#3356FF" stroke-width="1.5"/><path d="M8 4.2A3.8 3.8 0 1 1 4.2 8H8Z" fill="#3356FF"/></svg>';
const GMAIL = '<svg viewBox="0 0 20 20"><path d="M2 5.5v9.2c0 .7.6 1.3 1.3 1.3h2.4V9.3L10 12.6l4.3-3.3V16h2.4c.7 0 1.3-.6 1.3-1.3V5.5c0-1.6-1.8-2.5-3.1-1.6L10 7.3 5.1 3.9C3.8 3 2 3.9 2 5.5Z" fill="#EA4335"/><path d="M14.3 16V9.3L18 6.5v8.2c0 .7-.6 1.3-1.3 1.3Z" fill="#34A853"/><path d="M5.7 16V9.3L2 6.5v8.2C2 15.4 2.6 16 3.3 16Z" fill="#4285F4"/><path d="M14.3 5.3 18 5.5v1l-3.7 2.8Z" fill="#FBBC04"/></svg>';

function rail(active) {
  const r = h('div', 'dk-rail');
  const logo = svg(LOGO); logo.className = 'ic dk-logo'; r.append(logo);
  r.append(h('div', 'dk-sep', 'top:64px'));
  [['Inbox', 'Inbox|Light', 'Inbox|Bold'], ['Calls', 'Call|Light', 'Call|Bold'], ['Tickets', 'Clipboard check / task|Light', 'Clipboard check / task|Bold'], ['Contacts', 'Name / ID Card|Light', 'Name / ID Card|Bold']]
    .forEach(([k, l, b], i) => r.append(h('div', 'dk-ri' + (k === active ? ' on' : ''), { top: 80 + 48 * i + 'px' }, I(k === active ? b : l))));
  r.append(h('div', 'dk-sep', 'top:693px'));
  ['Support|Light', 'Star / AI 3|Light', 'Flow|Light'].forEach((n, i) => r.append(h('div', 'dk-ri', { top: 709 + 48 * i + 'px' }, I(n))));
  r.append(h('div', 'dk-me', { backgroundImage: img('bob') }));
  return r;
}

function listHead(col, title, chips, first) {
  col.append(h('div', 'dk-title', null, title));
  col.append(h('div', 'dk-acts', null, [I('Search|Light'), I('DialPad|Light'), I('Add|Light')]));
  const c = h('div', 'dk-chips');
  c.append(h('div', 'dk-chip', 'padding:0 12px 0 14px;gap:8px', [I('Filter 2|Light', 'width:22px;height:22px'), I(first, 'width:18px;height:18px')]));
  chips.forEach(t => c.append(h('div', 'dk-chip', null, t)));
  col.append(c, h('div', 'dk-chipfade'), h('div', 'dk-chipnext', null, I('Right Arrow 2|Light')));
}

/* ---------------- Inbox ---------------- */
const IROWS = [
  { av: { photo: 'sophia' }, name: 'Sophia Bennett', when: '2:34 am', lines: ['Can we schedule a call for Friday to discuss next steps please?'], c2: true, badge: 2 },
  { av: { def: 'initials_mb' }, name: 'Michael Brown', bang: true, when: '3:15 am', sub: ['Outgoing Call|Bold', 'Sandy dialed'], lines: ['“Hi Michael, this is Sandy with an update on your order…”'], sel: true },
  { av: { def: 'unknown' }, name: 'keisha.morgan@gmail.com', when: '3:01 am', lines: ['Tax documents for my 2025 return', 'Hi! Attaching my W-2 and 1099 forms for you…'], badge: 1 },
  { av: { def: 'group' }, name: 'Daniela Wilson +2 more', when: '4:05 am', lines: ['I’m really excited about this project and I look forward to working with you!'], c2: true },
  { av: { def: 'initials_ew' }, name: 'Ethan Williams', when: '3:15 am', sub: ['Incoming Call|Bold', 'Andre answered · Sales'], lines: ['“Ethan, I am so glad you called. I’d like to…”'], tag: 'Response due today' },
  { av: { photo: 'ivy' }, name: 'Ivy Turner', when: '3:15 am', sub: ['Missed Call|Bold', 'Missed · Sales', true], lines: ['“I just left an amazing review for you…”'], vm: true },
  { av: { def: 'campaign' }, name: 'Spring Tune-Up Special', when: '3:15 am', lines: ['Book your AC tune-up before May 31 and save 20% on parts & labor.'], c2: true },
  { av: { photo: 'judith' }, name: 'Judith Rodriguez', when: '2:50 am', sub: ['Photo / Media|Bold', '3 Photos'], lines: [], badge: 3 },
];
function av(a) {
  const e = h('div', 'dk-av');
  if (a.def) { e.style.backgroundImage = DEF(a.def); e.style.backgroundColor = 'transparent'; }
  else if (a.photo) e.style.backgroundImage = img(a.photo);
  return e;
}
function irow(r) {
  const body = h('div', 'dk-body');
  const nm = h('div', 'dk-name', null, [r.name]);
  if (r.bang) nm.append(h('span', 'dk-bang', null, '!!!'));
  body.append(h('div', 'dk-top', null, [nm, h('div', 'dk-when', null, r.when)]));
  const L = h('div', 'dk-lines' + (r.badge || r.vm ? ' pr' : ''));
  if (r.sub) {
    const [ic, t, miss] = r.sub;
    L.append(h('div', 'dk-line fx', null, [I(ic, 'color:' + (miss ? '#DE260C' : ic.startsWith('Photo') ? '#5C5D71' : '#444658')), h('span', 't', null, t)]));
  }
  r.lines.forEach(l => L.append(h('div', 'dk-line' + (r.c2 ? ' c2' : ''), null, l)));
  if (r.badge) L.append(h('div', 'dk-badge', null, String(r.badge)));
  if (r.vm) L.append(h('div', 'dk-badge', null, I('Voice Mail 2|Bold')));
  body.append(L);
  if (r.tag) body.append(h('div', 'dk-tag', null, r.tag));
  return h('div', 'dk-row' + (r.sel ? ' sel' : ''), { height: (r.tag ? 125 : 101) + 1 + 'px' }, [av(r.av), body]);
}

const TXT_IN = 'Hi! Just checking in on my order. These are for my wife’s birthday today, hoping they arrive soon 🎂';
const TXT_OUT = 'Great news, Michael! We’ll have them delivered by noon today 💐';
const REPLY = 'Thanks Michael! The card will say “Happy Birthday, love.”';

function convPane(details) {
  const W = details ? 635 : 996;
  const cl = details ? 20 : 114, cw = details ? 599 : 768;
  const pane = h('div', 'dk-pane', { left: '432px', width: W + 'px' });
  const hdr = h('div', 'dk-phdr');
  hdr.append(h('div', 'dk-pav', null, ['MB', h('div', 'mini', { backgroundImage: img('michael') })]));
  hdr.append(h('div', 'dk-pname', null, ['Michael Brown', h('span', 'dk-bang', null, '!!!'), svg(STATUS, 'width:16px;height:16px;margin-left:1px')]));
  hdr.append(h('div', 'dk-pnum', null, '+1 (212) 555-3462'));
  hdr.append(h('div', 'dk-pacts', null, [I('Menu|Light'), I('New Clipboard check / New task|Light'), I('Call|Light')]));

  const msgs = h('div', 'dk-msgs');
  const col = h('div', 'dk-col', { left: cl + 'px', width: cw + 'px' });
  const m1 = h('div', 'dk-in', { width: (details ? 560 : 728) + 'px' }, [
    h('div', 'ph', { height: '420px', backgroundImage: 'url(assets/photos/flowers.png)' }),
    h('div', null, 'padding:9px 0 0 10px', [h('div', 'dk-txt', null, TXT_IN), h('div', 'dk-meta', null, 'Michael · 8:30 pm')]),
  ]);
  const chev = () => I('Right Arrow 2|Light', 'width:22px;height:22px;color:#444658');
  const tcard = h('div', 'dk-card', 'margin-top:25px', h('div', 'dk-ch', null, [
    h('div', 'dk-circ', null, I('Clipboard check / task|Bold', 'color:#171A2B')),
    h('div', 'dk-cb', null, [h('div', 'dk-ct', null, [h('span', 'dk-bang', null, '!!!'), h('span', 'tt', null, [h('b', 'dk-b6', 'font-weight:600', '#134'), ' Deliver birthday bouquet to Michael Brown before noon today.'])]),
      h('div', 'dk-cs', null, 'Created by Krishna · 3:45 pm')]),
    chev(),
  ]));
  const date = h('div', 'dk-date', 'margin-top:25px;height:20px', 'Sep 5, 2026');
  const ccard = h('div', 'dk-card green', 'margin-top:24px', [
    h('div', 'dk-ch', 'height:70px', [
      h('div', 'dk-circ', 'background:#D7FDB7', I('Outgoing Call|Bold', 'color:#2E7A00')),
      h('div', 'dk-cb', null, [h('div', 'dk-ct', null, ['Krishna dialed', h('span', 'dk-rec', null, 'REC')]), h('div', 'dk-cs', null, 'Michael answered · 8:29 pm')]),
      chev(),
    ]),
    h('div', 'dk-sum', null, [h('span', 'l', null, 'Summary: '), 'Confirmed the bouquet order and delivery address. Michael asked for delivery before noon.... ', h('b', null, null, 'Show More')]),
  ]);
  const out = h('div', 'dk-out', { marginTop: '24px', width: (details ? 563 : 728) + 'px' }, [
    h('div', 'dk-txt', 'min-height:66px', TXT_OUT),
    h('div', 'dk-meta', 'margin-top:11px', [h('div', 'mav', { backgroundImage: img('sandy') }), 'Sandy · 8:30 pm']),
    I('Double checkmark|Light', 'position:absolute;right:12px;bottom:15px;width:20px;height:20px;color:#5C5D71'),
  ]);
  const messages = [m1, tcard, date, ccard, out];
  col.append(...messages);
  msgs.append(col);

  const cc = cl + cw / 2;
  const gen = h('div', 'dk-gen', { left: cc - 82 + 'px' }, [I('Pen / AI / Generate / Edit|Light'), 'Generate Reply']);
  const down = h('div', 'dk-down', { left: cl + cw - 67 + 'px' }, [I('Down|Light'), h('i')]);
  const comp = h('div', 'dk-comp');
  const inp = h('div', 'inp', { left: cl + 32 + 'px', width: cw - 64 + 'px' }, 'New message');
  const plus = I('Add 2|Light', `left:${cl}px`); plus.classList.add('plus');
  const flash = I('Flash / Light|Light', `left:${cl + cw - 24}px`); flash.classList.add('flash');
  comp.append(plus, inp, flash);
  pane.append(msgs, hdr, gen, down, comp);
  return { pane, messages, comp, inp, gen };
}

function detailsPanel() {
  const d = h('div', 'dk-det');
  d.append(I('Close|Light', 'position:absolute;left:16px;top:16px'), I('Menu|Light', 'position:absolute;left:280px;top:16px'), svg('<svg viewBox="0 0 24 24"><path d="M14 4h6v6M20 4l-6.5 6.5M10 20H4v-6M4 20l6.5-6.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>', 'position:absolute;left:320px;top:16px'));
  d.append(h('div', 'dk-dcard', null, [h('div', 'bav', null, 'MB'), h('div', 'nm', null, ['Michael Brown', I('Edit|Bold')]), h('div', 'co', null, 'Brown Design Studio')]));
  d.append(h('div', 'dk-seg', null, [h('div', 'on'), h('span', null, 'left:0;color:#3356FF', 'Details'), h('span', null, 'left:163px', 'Activity')]));
  const dash = (y) => d.append(h('div', 'dk-dash', { top: y + 'px' }));
  const lab = (y, ic, t) => d.append(h('div', 'dk-dl', { top: y - 10 + 'px' }, [typeof ic === 'string' ? I(ic) : ic, t]));
  dash(233);
  [[267, 'Call|Light', 'Home', '+1 (212) 390-8650'], [313, 'Call|Light', 'Office', '+1 (212) 390-3720'], [359, svg(GMAIL, 'width:20px;height:20px'), 'Email', 'mbrown@gmail.com']].forEach(([y, ic, l, v]) => {
    lab(y, ic, l);
    d.append(h('div', 'dk-dv', { top: y - 11 + 'px' }, v));
    d.append(I('Copy|Light', `position:absolute;left:322px;top:${y - 10}px;width:20px;height:20px;color:#444658`));
  });
  dash(393);
  lab(436, 'Info/help/priority|Light', 'Priority');
  d.append(h('div', 'dk-dp red', 'top:418px', [h('span', 'dk-bang', null, '!!!'), 'High', I('Down|Light')]));
  lab(496, 'Status|Light', 'Status');
  d.append(h('div', 'dk-dp', 'top:478px', [svg(STATUS, 'width:16px;height:16px'), 'In Progress', I('Down|Light')]));
  dash(536);
  lab(580, 'Support|Light', 'Owner');
  d.append(h('div', 'dk-dp', 'top:562px', [h('div', 'pav', { backgroundImage: img('ethan') }), 'Ethan Williams', I('Down|Light')]));
  lab(640, 'Group|Light', 'Team');
  d.append(h('div', 'dk-dp', 'top:622px', ['Sales Team', I('Down|Light')]));
  lab(700, 'Calender 2|Light', 'Due on');
  d.append(h('div', 'dk-dp', 'top:682px', ['Sep 5, 2026 · 12:00 pm', I('Down|Light')]));
  dash(740);
  lab(776, 'Document / Description|Light', 'Note');
  d.append(h('div', 'dk-note', 'top:766px', 'Birthday bouquet for his wife. Deliver before noon and include a handwritten card.'));
  lab(892, svg('<svg viewBox="0 0 20 20"><path d="M3 3.8v5.1c0 .5.2 1 .6 1.3l6.3 6.3c.7.7 1.8.7 2.5 0l4-4c.7-.7.7-1.8 0-2.5L10.1 3.6c-.3-.4-.8-.6-1.3-.6H3.8c-.4 0-.8.4-.8.8Z" fill="none" stroke="currentColor" stroke-width="1.3"/><circle cx="6.5" cy="6.5" r="1.2" fill="currentColor"/></svg>', 'width:20px;height:20px;color:#444658'), 'Tags');
  d.append(h('div', 'dk-dp gray', 'top:878px', ['Priority Customer', I('Close|Light')]));
  return d;
}

window.SCREENS = window.SCREENS || {};
SCREENS.deskInbox = (variant) => {
  const details = variant === 'details';
  const el = h('div', 'dk-root');
  const r = rail('Inbox');
  const list = h('div', 'dk-list');
  listHead(list, 'Inbox', ['Unread', 'Response Due', 'Team Chats'], 'Right Arrow 2|Light');
  list.append(h('div', 'dk-count', null, '364 contacts filtered'));
  const rowsWrap = h('div', 'dk-rows', 'top:157px');
  const rows = IROWS.map(x => { const e = irow(x); rowsWrap.append(e); return e; });
  list.append(rowsWrap);
  const P = convPane(details);
  el.append(P.pane, list, r);
  const parts = { rail: r, list, rows, pane: P.pane, messages: P.messages, composer: P.comp, input: P.inp, generate: P.gen };
  if (details) { parts.details = detailsPanel(); el.append(parts.details); }
  const state = (o = {}) => {
    if (o.typed != null) {
      const n = Math.max(0, Math.min(REPLY.length, Math.round(o.typed)));
      P.inp.textContent = '';
      if (n === 0) { P.inp.className = 'inp'; P.inp.append('New message'); }
      else { P.inp.className = 'inp typed'; P.inp.append(REPLY.slice(0, n), h('span', 'dk-caret')); }
    }
  };
  return { el, parts, state, replyText: REPLY };
};

/* ---------------- Calls ---------------- */
const CROWS = [
  { t: 'call_missed_ah', name: 'Keisha Morgan', wa: true, vm: true, sub: 'No-one answered · 9:20 am' },
  { t: 'call_dialed', name: 'Sophia Bennett', rec: true, sub: 'Krishna dialed · 9:14 am' },
  { t: 'call_answered', name: 'Michael Brown', wa: true, rec: true, sub: 'Alexis answered · 9:05 am', sel: true },
  { t: 'call_transfer', name: 'Ravi Chandran', rec: true, sub: 'Krishna → Andre · 8:52 am' },
  { t: 'call_hungup', name: 'Jonas Miller', sub: 'Caller hung up · 8:41 am' },
  { t: 'call_missed', name: 'Liam Johnson', sub: 'No-one answered · 8:29 am' },
  { t: 'call_failed_ah', name: 'Noah Anderson', sub: 'Krishna dialed · Failed · 8:17 am' },
  { t: 'call_dialed', name: 'Emma Brooks', rec: true, sub: 'Andre dialed · 8:05 am' },
  { t: 'call_answered', name: 'Judith Rodriguez', rec: true, sub: 'Krishna answered · 7:58 am' },
  { t: 'call_missed_ah', name: 'Priya Shah', wa: true, vm: true, sub: 'No-one answered · 7:46 am' },
];
function crow(r) {
  const tile = h('div', 'dk-tile', { backgroundImage: DEF(r.t), backgroundSize: 'cover' });
  const nm = h('div', 'dk-name', null, [r.name]);
  if (r.vm) nm.append(h('div', 'dk-vmb', null, I('Voice Mail 2|Bold')));
  if (r.rec) nm.append(h('span', 'dk-rec', 'margin-left:1px', 'REC'));
  return h('div', 'dk-crow' + (r.sel ? ' sel' : ''), null, [tile, h('div', 'dk-body', null, [nm, h('div', 'dk-sub', null, r.sub)]), I('Info|Light', 'width:24px;height:24px;color:#444658')]);
}
const arrow = () => h('div', 'dk-farr', null, I('Right Arrow 1|Light', 'width:13px;height:13px'));
const emo = (e) => h('span', null, 'font-size:14px;line-height:1', e);

SCREENS.deskCalls = (variant) => {
  const incoming = variant === 'incoming';
  const el = h('div', 'dk-root');
  const r = rail('Calls');
  const list = h('div', 'dk-list');
  listHead(list, 'Calls', ['Missed', 'My calls', 'Voicemail'], 'Down|Light');
  const rowsWrap = h('div', 'dk-rows', 'top:117px;border-top:0');
  const rows = CROWS.map(x => { const e = crow(x); rowsWrap.append(e); return e; });
  list.append(rowsWrap);

  const pane = h('div', 'dk-pane', 'left:432px;width:996px');
  const hdr = h('div', 'dk-chdr', null, [
    h('div', 'dk-cav', { backgroundImage: DEF('call_disc_in'), backgroundSize: 'cover' }),
    h('div', 't1', null, 'Michael called you'),
    h('div', 't2', null, ['Alexis answered']),
    h('div', null, 'position:absolute;right:16px;top:26px;display:flex;gap:16px', [I('Menu|Light'), I('Chat 2|Light'), I('Call|Light')]),
    h('div', 'dk-ctabs', 'left:114px;width:768px', [h('div', 'on'), h('span', null, 'left:0', 'AI Summary'), h('span', null, 'left:50%', 'Transcript')]),
  ]);
  const S = h('div', 'dk-sumc', 'left:114px;width:768px;height:600px');
  S.append(h('div', 'ended', null, 'Called ended at 9:05 am · Duration 2:34'));
  const flow = h('div', 'dk-flow', null, [
    h('div', 'dk-fc', null, [emo('☀️'), 'Start']), arrow(),
    h('div', 'dk-fc', null, [h('div', 'num', null, '2'), 'Bookings']), arrow(),
    h('div', 'dk-fc', null, [h('div', 'num', null, '3'), 'Hair & Beard']), arrow(),
    h('div', 'dk-fc', null, [h('div', 'fav', { backgroundImage: img('alexis') }), 'Alexis answered · 2:34']), arrow(),
    h('div', 'dk-fc', 'padding:0 12px', 'End'),
  ]);
  S.append(flow);
  const dash = (y) => S.append(h('div', 'dk-dash', { top: y - 139 + 'px' }));
  dash(242);
  S.append(h('div', 'dk-h3', 'top:120px', 'Summary'));
  const BUL = ['Michael called to book a haircut and beard trim.', 'Looking for an appointment this Saturday morning.', 'Asked for Jessica, his usual barber.', 'Confirmed for Saturday at 11:30 AM.'];
  const bullets = BUL.map((t, i) => { const b = h('div', 'dk-bul', { top: 150 + 34 * i + 'px' }, h('span', null, null, t)); S.append(b); return b; });
  const moods = h('div', 'dk-moods', 'top:282px', [h('div', 'dk-mood', null, [emo('😊'), 'Happy']), h('div', 'dk-mood', null, [emo('👍🏻'), 'Positive'])]);
  S.append(moods);
  dash(472);
  S.append(h('div', 'dk-h3', 'top:350px', 'Follow-up Actions'));
  const followups = [
    h('div', 'dk-fu', 'top:380px', [I('Profile|Light'), h('div', 'a', null, 'Update contact details with the preferred barber as “Jessica”'), h('div', 'b', null, 'Accept Edit')]),
    h('div', 'dk-fu', 'top:457px', [I('Clipboard check / task|Light'), h('div', 'a', null, 'Haircut + beard trim with Jessica on Saturday at 11:30 AM.'), h('div', 'b', null, 'Create Task')]),
  ];
  S.append(...followups);
  dash(681);
  S.append(h('div', 'dk-pow', 'top:554px', ['Powered by ', h('b', null, null, 'LinkedPhone AI')]));
  const player = h('div', 'dk-player', null, [
    h('div', 'pill', 'left:114px;width:712px', [h('div', 't', 'left:12px', '1:42'), h('div', 'trk', 'left:49px;width:605px', [h('div', 'fill', 'width:89px'), h('div', 'knob', 'left:89px')]), h('div', 't', 'right:12px', '-0:52')]),
    h('div', 'pz', 'left:835px', I('Pause|Bold')),
  ]);
  pane.append(S, hdr, player);
  el.append(pane, list, r);
  const parts = { rail: r, list, rows, pane, summary: S, bullets, followups, player, flow, moods };
  let state;
  if (!incoming) {
    const g = I('Outgoing Call|Light'); g.classList.add('g');
    const grp = I('Group|Light'); grp.classList.add('grp');
    const live = h('div', 'dk-live', null, [
      h('div', 'top', null, [emo('🧘'), 'Restore Wellness Clinic', g]), grp,
      h('div', 'lav', { backgroundImage: img('daniela') }),
      h('div', 'nm', null, 'Daniela Wilson'),
      h('div', 'tm', null, ['01:46', h('span', 'dk-rec', null, ['REC', h('i')])]),
      h('div', 'ctl', null, [h('div', 'w', null, I('Speaker / Sound On2|Light')), h('div', null, null, I('Dialpad 2|Light')), h('div', null, null, I('Mute / Microphone off / Record|Light')), h('div', null, null, I('Call Transfer|Light')), h('div', null, null, I('Menu|Light')), h('div', 'r', null, I('Call|Bold', 'transform:rotate(135deg)'))]),
    ]);
    el.append(live); parts.liveWidget = live;
  } else {
    const g = I('Incoming Call|Light'); g.classList.add('g');
    const x = I('Close|Light'); x.classList.add('x');
    const dim = h('div', 'dk-dim');
    const inc = h('div', 'dk-inc', null, [
      h('div', 'top', null, [emo('🧘'), 'Restore Wellness Clinic', g]), x,
      h('div', 'lav', { top: '70px', backgroundImage: img('daniela') }),
      h('div', 'nm', null, 'Daniela Wilson'),
      h('div', 'sb', null, 'Inbound Call'),
      h('div', 'btns', null, [h('div', 'rj', null, [I('Call|Bold', 'transform:rotate(135deg)'), 'Reject']), h('div', 'ac', null, [I('Call|Bold'), 'Accept'])]),
    ]);
    el.append(dim, inc);
    Object.assign(parts, { incoming: inc, dim, reject: inc.querySelector('.rj'), accept: inc.querySelector('.ac') });
    state = (o = {}) => { if (o.overlay != null) { const a = Math.max(0, Math.min(1, o.overlay)); dim.style.opacity = a; inc.style.opacity = a; } };
  }
  return { el, parts, state };
};
})();

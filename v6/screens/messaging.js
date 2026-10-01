/* Messaging & Tickets — replicas of refs "Chat Details" + "Sign In…" chat states, "Tickets", "Ticket Details-1".
   Keys: chat, tickets, ticketChat. CSS prefix .ms-  */
(() => {
const { h, icon, svg, statusBar, avatar, header, tabBar, img } = UI;

const CSS = `
.ms-nav { position:absolute; left:0; top:47px; width:375px; height:81px; background:#fff; z-index:25; }
.ms-nav .nav-av { position:absolute; left:52px; top:22px; width:40px; height:40px; border-radius:11px; font-size:19px; border:1px solid var(--g95); }
.ms-nav .nm { position:absolute; left:101px; top:19px; font:600 17px/22px var(--sf); letter-spacing:-.2px; white-space:nowrap; }
.ms-nav .nm.solo { top:28px; }
.ms-nav .sub { position:absolute; left:101px; top:45.5px; display:flex; align-items:center; gap:6px; font:400 15px/20px var(--sf); color:var(--g30); white-space:nowrap; }
.ms-main { position:absolute; left:0; top:128px; bottom:0; width:375px; display:flex; flex-direction:column; }
.ms-vp { position:relative; flex:1; overflow:hidden; background:#fff; }
.ms-col { position:absolute; left:0; bottom:0; width:375px; }
.ms-datepill { position:absolute; left:50%; top:8px; transform:translateX(-50%); height:24px; padding:0 9px; border-radius:9px; background:#EFF0FE; border:1px solid #E3E5FA; box-shadow:0 2px 6px rgba(23,26,43,.08); font:400 14.5px/22px var(--sf); color:var(--ink); white-space:nowrap; z-index:5; }
.ms-sep { text-align:center; font:400 14.5px/20px var(--sf); color:var(--g40); padding:23px 0 25px; }
.ms-in { width:303px; margin-left:16px; border-radius:16px; background:#F0F0F0; padding:4px 4px 0; }
.ms-in .ph { width:295px; height:196px; border-radius:10px; background-size:cover; background-position:center 58%; }
.ms-txt { font:400 16px/22px var(--sf); color:var(--ink); letter-spacing:-.1px; }
.ms-in .ms-txt { padding:10px 8px 0; }
.ms-meta { display:flex; align-items:center; gap:7px; font:400 14.5px/20px var(--sf); color:var(--g30); }
.ms-in .ms-meta { padding:7px 8px 10px; }
.ms-out { max-width:303px; width:fit-content; margin-left:auto; margin-right:16px; border-radius:16px; background:#DFE1F8; padding:10px 12px 14px; }
.ms-out .ms-meta { margin-top:8px; color:var(--g40); }
.mav { width:22px; height:22px; border-radius:50%; background-size:cover; background-position:center; flex:none; }
.ms-out .ms-meta .ck { margin-left:auto; padding-left:24px; display:flex; }
.ms-slot { flex:none; position:relative; height:64px; background:#fff; }
.ms-gen { position:absolute; left:106px; top:16px; height:40px; padding-right:16px; white-space:nowrap; border-radius:20px; border:1px solid var(--g90); background:#fff; box-shadow:0 5px 12px rgba(23,26,43,.07); display:flex; align-items:center; gap:10px; padding-left:16px; }
.ms-grad { background:linear-gradient(90deg,#4A6DBB 0%,#7A5CDA 50%,#B246BD 100%); -webkit-background-clip:text; background-clip:text; color:transparent; }
.ms-gen .t { font:500 14px/22px var(--sf); }
.ms-chips { position:absolute; left:0; top:17px; width:375px; display:flex; gap:8px; padding-left:16px; white-space:nowrap; }
.ms-chip { flex:none; height:38px; border-radius:19px; border:1px solid var(--g90); background:#fff; box-shadow:0 4px 10px rgba(23,26,43,.06); display:flex; align-items:center; gap:8px; padding:0 16px; font:500 14px/20px var(--sf); }
.ms-chip.first { padding-left:12px; }
.ms-chip.on { background:var(--blue95); border-color:var(--blue90); }
.ms-bar { flex:none; position:relative; background:#fff; display:flex; align-items:flex-end; padding:9px 0 25px; }
.ms-bar.kb { padding-bottom:9px; }
.ms-field { margin-left:48px; width:278px; min-height:47px; border-radius:16px; border:1px solid var(--g90); padding:12px; font:400 16px/22px var(--sf); color:var(--ink); background:#fff; position:relative; }
.ms-bar.kb .ms-field { width:267px; }
.ms-field .ph { color:var(--g60); }
.ms-field.gen { background:linear-gradient(#fff,#fff) padding-box, linear-gradient(100deg,#2A93A0 0%,#4A6DBB 25%,#7E5CD9 65%,#B24ABF 100%) border-box; border:1.5px solid transparent; padding:11.5px 12px; }
.ms-field.foc { border-color:var(--ink); }
.ms-caret { display:inline-block; width:2px; height:20px; background:var(--blue); vertical-align:-4px; margin-left:1px; }
.ms-send { position:absolute; left:323px; width:36px; height:33px; border-radius:12px; background:var(--blue); display:grid; place-items:center; }
.ms-send.off { background:#99AAFF; }
.ms-kb { flex:none; position:relative; width:375px; height:336px; background:url(assets/keyboard-done.png) 0 0/375px 336px no-repeat; }
.ms-kb .ret { position:absolute; left:285px; top:214px; width:86px; height:40px; border-radius:5px; background:#ABB4C1; display:grid; place-items:center; font:400 16px/1 var(--sf); color:#000; }
/* tickets */
.ms-tl { position:absolute; left:0; top:166px; width:375px; }
.ms-tr { position:relative; display:flex; gap:9px; padding:19px 16px 16px; border-bottom:1px solid var(--g95); background:#fff; align-items:center; }
.ms-tr .av.ph { border:1px solid var(--g95); }
.ms-tr .body { flex:1; min-width:0; }
.ms-tr .top { display:flex; align-items:baseline; justify-content:space-between; }
.ms-tr .nm { font:600 17px/22px var(--sf); letter-spacing:-.2px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.ms-pr { font-weight:700; letter-spacing:.5px; margin-left:5px; }
.ms-pr.p3 { color:#AC3322; } .ms-pr.p2 { color:#BB8825; }
.ms-tr .when { font:400 15px/20px var(--sf); color:var(--g30); flex:none; margin-left:8px; }
.ms-tr .lo { display:flex; align-items:center; margin-top:3px; }
.ms-tr .lines { flex:1; min-width:0; }
.ms-tr .ln { font:400 14.6px/20px var(--sf); color:var(--ink); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; letter-spacing:-.1px; }
.ms-tr .ln.b { font-weight:600; }
.ms-tr .aside { flex:none; display:flex; align-items:center; gap:4px; margin-left:6px; }
.ms-own { width:24px; height:24px; border-radius:50%; background-size:cover; background-position:center; border:1px solid var(--g95); flex:none; }
.ms-cnt { min-width:24px; height:24px; border-radius:12px; background:var(--blue); color:#fff; font:500 14px/24px var(--sf); text-align:center; }
.ms-st { height:24px; border-radius:12px; display:flex; align-items:center; gap:5px; padding:0 8px 0 5px; font:500 13.5px/1 var(--sf); color:#fff; white-space:nowrap; }
.ms-st .ic { width:15px; height:15px; color:#fff; }
.ms-st.new { background:var(--blue); } .ms-st.hold { background:#5C5D71; } .ms-st.active { background:var(--green50); } .ms-st.closed { background:#8D8FA5; }
/* ticket chat */
.ms-tc { position:absolute; left:16px; top:122px; width:343px; min-height:100px; border-radius:18px; border:1.5px solid var(--g90); background:linear-gradient(180deg,#EBECFD,#E4E6FA); padding:11px 12px 10px; z-index:24; }
.ms-tc .subj { font:600 15px/20px var(--sf); color:var(--ink); padding-right:40px; letter-spacing:-.1px; }
.ms-tc .pills { display:flex; align-items:center; gap:4px; margin-top:12px; }
.ms-tc .pill { height:24px; border-radius:12px; display:flex; align-items:center; gap:5px; padding:0 9px 0 7px; font:500 14px/1 var(--sf); color:#fff; letter-spacing:.6px; white-space:nowrap; }
.ms-tc .pill.hi { background:#AC3322; } .ms-tc .pill.md { background:#BB8825; } .ms-tc .pill.ip { background:var(--blue); padding-left:5px; }
.ms-tc .pill .ic { width:16px; height:16px; color:#fff; }
.ms-tc .cn { height:24px; border-radius:12px; background:#EFF0FE; display:flex; align-items:center; gap:6px; padding:0 9px 0 8px; font:500 14px/1 var(--sf); }
.ms-tc .cn .ic { width:15px; height:15px; color:#5C5D71; }
.ms-pk { width:343px; margin-left:16px; border-radius:16px; background:#FFD8E9; padding:4px 4px 0; }
.ms-pk .ms-txt { padding:10px 8px 0; }
.ms-pk .ms-meta { padding:6px 8px 14px; color:var(--g40); }
.ms-sys { text-align:center; padding:26px 0 24px; }
.ms-sys .a { font:400 16px/22px var(--sf); color:var(--ink); }
.ms-sys .a b { color:#AC3322; font-weight:600; }
.ms-sys .m { font:400 14.5px/20px var(--sf); color:var(--g30); margin-top:2px; }
.ms-inv { width:335px; height:196px; border-radius:10px; background:linear-gradient(160deg,#EFE9E1,#E2D9CE); position:relative; overflow:hidden; }
.ms-inv .pg { position:absolute; left:92px; top:14px; width:150px; height:196px; background:#fff; border-radius:3px; box-shadow:0 6px 16px rgba(80,60,30,.18); padding:14px 12px; font:700 11px/1 var(--sf); color:#1F3A5F; }
.ms-inv .pg i { display:block; height:4px; border-radius:2px; background:#E3E6EE; margin-top:7px; }
.ms-inv .pg .tot { display:flex; justify-content:space-between; margin-top:12px; font:600 8.5px/1 var(--sf); color:#171A2B; }
`;
if (!document.getElementById('ms-css')) { const st = document.createElement('style'); st.id = 'ms-css'; st.textContent = CSS; document.head.append(st); }

const DOTS = '<svg viewBox="0 0 20 5"><circle cx="2.5" cy="2.5" r="2" fill="currentColor"/><circle cx="10" cy="2.5" r="2" fill="currentColor"/><circle cx="17.5" cy="2.5" r="2" fill="currentColor"/></svg>';
const PLUS = '<svg viewBox="0 0 24 24"><path d="M12 3.5v17M3.5 12h17" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>';
const PERSON = '<svg viewBox="0 0 16 16"><circle cx="8" cy="4.6" r="3.4" fill="currentColor"/><path d="M1.8 14.2c0-3 2.8-4.9 6.2-4.9s6.2 1.9 6.2 4.9c0 .7-.5 1.1-1.1 1.1H2.9c-.6 0-1.1-.4-1.1-1.1Z" fill="currentColor"/></svg>';
const WA = '<svg viewBox="0 0 16 16"><path d="M8 .5a7.5 7.5 0 0 0-6.5 11.2L.5 15.5l3.9-1A7.5 7.5 0 1 0 8 .5Z" fill="#25D366"/><path d="M11.6 9.8c-.2-.1-1.2-.6-1.3-.6-.2-.1-.3-.1-.4.1l-.6.7c-.1.1-.2.1-.4 0a5 5 0 0 1-2.5-2.2c-.2-.3.2-.3.5-1 .1-.1 0-.2 0-.3l-.6-1.4c-.2-.4-.3-.3-.4-.3h-.4a.7.7 0 0 0-.5.2 2.1 2.1 0 0 0-.7 1.6c0 .9.7 1.8.8 2a8 8 0 0 0 3.1 2.7c1.1.5 1.6.5 2.1.4.4 0 1.2-.5 1.3-1 .2-.4.2-.8.1-.9l-.3-.2Z" fill="#fff"/></svg>';

function nav(o) {
  const n = h('div', 'ms-nav', o.hgt ? { height: o.hgt + 'px' } : null);
  n.append(icon('Back 2|Light', 'position:absolute;left:16px;top:30px;width:24px;height:24px'));
  n.append(avatar(o.av, 'nav-av'));
  n.append(h('div', 'nm' + (o.sub ? '' : ' solo'), null, o.name));
  if (o.sub) n.append(h('div', 'sub', null, [o.sub]));
  n.append(svg(DOTS, `position:absolute;top:39px;left:${o.phone ? 298 : 337}px;width:20px;height:5px`));
  if (o.phone) n.append(icon('Call|Light', 'position:absolute;left:335px;top:30px;width:26px;height:26px'));
  if (o.dy) [...n.children].forEach(c => { c.style.marginTop = (c.classList.contains('nm') ? 1 : c.classList.contains('nav-av') ? o.dy - 1.5 : o.dy) + 'px'; }); // absolute children: margin shifts them
  return n;
}
const mav = (p) => h('div', 'mav', { backgroundImage: img(p) });
// bottom-pinned thread (chat semantics): scroll(0) = latest message resting on the composer; scroll(y) reveals y pt of older history.
function pinned(col, vp) {
  let y = 0;
  const max = () => Math.max(0, col.offsetHeight - vp.offsetHeight);
  const place = () => { col.style.transform = y ? `translateY(${Math.max(0, Math.min(max(), y))}px)` : ''; };
  return { place, max, scroll(v) { y = v; place(); } };
}

window.SCREENS = window.SCREENS || {};
const SCREENS = window.SCREENS;

/* ---------------------------------------------------------------- chat */
const REPLY = 'Yes, both are in stock and I’ve reserved two for Saturday morning delivery. Your Monday order ships today and arrives tomorrow by noon. Want a free card for the grand opening? 💐';
const CHIPS = ['Rewrite', 'Longer', 'Friendly', 'Formal', 'Apologize'];

function outBubble(text, who, time, av) {
  return h('div', 'ms-out', null, [h('div', 'ms-txt', null, text),
    h('div', 'ms-meta', null, [mav(av), `${who} · ${time}`, h('span', 'ck', null, icon('Double checkmark|Light', 'width:20px;height:20px;color:#5C5D71'))])]);
}

SCREENS.chat = () => {
  const el = h('div', 'scr375');
  const main = h('div', 'ms-main');
  const vp = h('div', 'ms-vp');
  const col = h('div', 'ms-col');
  const messages = [];
  col.append(h('div', 'ms-sep', null, 'Sep 30, 2026'));
  const m0 = h('div', 'ms-in', null, [h('div', 'ms-txt', 'padding-top:6px', 'Hi! Do you deliver to Brooklyn Heights? I’d love a few potted arrangements for my shop.'), h('div', 'ms-meta', null, 'Kevin · 4:12 pm')]);
  const m1 = outBubble('Yes! We deliver across Brooklyn every day. Send us a photo of what you like and we’ll get it ready for you.', 'Jesse', '4:20 pm', 'jesse');
  m1.style.marginTop = '12px';
  const m2 = h('div', 'ms-in', null, [h('div', 'ph', { backgroundImage: 'url(assets/photos/flowers.png)' }),
    h('div', 'ms-txt', null, 'Hi! Are these still available for Saturday delivery? I’d love two of them for our shop’s grand opening in Brooklyn Heights. I ordered on Monday too. What’s the status on my order?'),
    h('div', 'ms-meta', null, 'Kevin · 9:38 am')]);
  const m3 = outBubble(REPLY, 'Jesse', '9:41 am', 'jesse');
  m3.style.marginTop = '16px';
  col.append(m0, m1, h('div', 'ms-sep', null, 'Today'), m2, m3);
  messages.push(m0, m1, m2, m3);
  const datePill = h('div', 'ms-datepill', null, 'Sep 30, 2026');
  vp.append(col, datePill);

  const slot = h('div', 'ms-slot');
  const generate = h('div', 'ms-gen', null, [icon('Pen / AI / Generate / Edit|Light', 'width:22px;height:22px'), h('span', 't ms-grad', null, 'Generate Reply')]);
  const chipRow = h('div', 'ms-chips');
  const chips = CHIPS.map((t, i) => {
    const c = h('div', 'ms-chip' + (i === 0 ? ' first' : ''), null, i === 0 ? [icon('Pen / AI / Generate / Edit|Light', 'width:20px;height:20px'), h('span', 'ms-grad', null, t)] : [h('span', 'ms-grad', null, t)]);
    chipRow.append(c); return c;
  });
  slot.append(generate, chipRow);

  const bar = h('div', 'ms-bar');
  const plus = svg(PLUS, 'position:absolute;left:16px;width:24px;height:24px');
  const field = h('div', 'ms-field');
  const bolt = icon('Flash / Light|Light', 'position:absolute;left:335px;width:24px;height:24px');
  const send = h('div', 'ms-send', null, icon('Send|Bold', 'width:20px;height:20px;color:#fff'));
  bar.append(plus, field, bolt, send);
  const keyboard = h('div', 'ms-kb', null, h('div', 'ret', null, 'return'));
  main.append(vp, slot, bar, keyboard);
  el.append(main, nav({ av: { photo: 'kevin' }, name: 'Kevin Lui', sub: '+1 (415) 555-0142', phone: true }), statusBar());

  const pin = pinned(col, vp);
  const S = { mode: 'idle', typed: Array.from(REPLY).length, chip: -1 };
  const state = (o = {}) => {
    Object.assign(S, o);
    const m = S.mode, kb = m === 'generating' || m === 'suggest';
    const kv = Math.max(0, Math.min(1, S.kb != null ? S.kb : (kb ? 1 : 0)));
    keyboard.style.display = kv > 0 ? '' : 'none'; keyboard.style.height = (kv * 336).toFixed(2) + 'px'; keyboard.style.overflow = 'hidden';
    bar.classList.toggle('kb', kb);
    const pb = 25 - 16 * kv; bar.style.paddingBottom = pb.toFixed(2) + 'px';
    plus.style.bottom = bolt.style.bottom = (pb + 11.5) + 'px'; send.style.bottom = (pb + 7) + 'px';
    generate.style.display = m === 'idle' ? '' : 'none';
    chipRow.style.display = m === 'suggest' ? '' : 'none';
    chips.forEach((c, i) => c.classList.toggle('on', i === S.chip));
    const sp = m === 'sent' ? Math.max(0, Math.min(1, S.sent != null ? S.sent : 1)) : 0;
    slot.style.height = m === 'sent' ? (64 - 48 * sp).toFixed(2) + 'px' : '64px';
    m3.style.display = m === 'sent' ? '' : 'none';
    if (m === 'sent') { if (!m3._h) { m3.style.marginBottom = ''; m3._h = m3.offsetHeight + 16; }
      m3.style.marginBottom = (-(1 - sp) * m3._h).toFixed(2) + 'px'; m3.style.transformOrigin = '100% 100%';
      m3.style.transform = sp < 1 ? `translateY(${((1 - sp) * 24).toFixed(2)}px) scale(${(.92 + .08 * sp).toFixed(4)})` : ''; m3.style.opacity = Math.min(1, sp * 2.5); }
    bolt.style.display = kb ? 'none' : ''; send.style.display = kb ? '' : 'none';
    send.classList.toggle('off', m === 'generating');
    field.className = 'ms-field' + (m === 'generating' ? ' gen' : m === 'suggest' ? ' foc' : '');
    field.textContent = '';
    if (m === 'generating') field.append(h('span', 'ms-grad', 'background-image:linear-gradient(90deg,#4A6DBB 0%,#7A5CDA 25%,#B246BD 50%,#7A5CDA 75%,#4A6DBB 100%);background-size:200% 100%;background-position:' + ((S.phase || 0) * -200).toFixed(1) + '% 0', 'Generating...'));
    else if (m === 'suggest') field.append(Array.from(REPLY).slice(0, S.typed).join(''), h('span', 'ms-caret'));
    else field.append(h('span', 'ph', null, 'New message'));
    pin.place();
  };
  state();
  return { el, parts: { messages, generate, composer: field, chips, keyboard, send, datePill, content: col, sentMsg: m3 }, state, scroll: pin.scroll, scrollMax: pin.max };
};

/* ---------------------------------------------------------------- tickets */
const TK = [
  { n: '#256', name: 'Judith Rodriguez', p: 3, when: '9:20 am', av: { photo: 'judith' }, s: 'Needs a copy of her latest invoice', l: 'I’ll work on this asap and send it before Friday.', st: 'new', own: 'ethan' },
  { n: '#255', name: 'Jonas Muller', p: 2, when: '9:12 am', av: { photo: 'jonas' }, s: 'Jonas called about a new project', l: 'I’ll pick up this request and call him back today.', st: 'active', own: 'daniela' },
  { n: '#253', name: 'Internal Task', p: 2, when: '9:05 am', av: { kind: 'internal' }, s: 'Prepare the spring tune-up estimate for Premier Real Estate', l: 'Waiting on the parts list from the HVAC team.', cnt: 2, own: 'sophia' },
  { n: '#249', name: 'Barry Hill', p: 3, when: '8:50 am', av: { initials: 'BH' }, s: 'Payment was declined', l: 'Credit card expired. Asked him to update it.', st: 'hold', own: 'michael' },
  { n: '#247', name: 'Keisha Morgan', when: '8:40 am', av: { photo: 'keisha' }, s: 'She needs tax documentation asap', l: 'Emailed it. All set.', st: 'closed', own: 'jesse' },
  { n: '#245', name: 'Internal Task', p: 2, when: '8:25 am', av: { kind: 'internal' }, s: 'Reply to Ivy Turner’s 5-star review on Google', l: 'Draft a thank-you note and share it with the team.', own: 'alexis' },
  { n: '#241', name: 'Ravi Chandran', when: '8:10 am', av: { photo: 'ravi' }, s: 'Ravi can’t open the file we sent', l: 'Let me look into this and resend it as a PDF.', own: 'ivy' },
];
// status glyphs as designed: filled white disc with the pill colour knocked out
const DISC = (inner) => `<svg viewBox="0 0 16 16"><circle cx="8" cy="8" r="6.6" fill="#fff"/>${inner}</svg>`;
const ST_ICON = { hold: DISC('<rect x="4.6" y="7.1" width="6.8" height="1.8" rx=".9" fill="#5C5D71"/>'), closed: DISC('<path d="M5.1 8.2l2 2 3.8-4" fill="none" stroke="#8D8FA5" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>') };
const ST = { new: ['New', 'Dash circle|Bold'], hold: ['On Hold', null], active: ['Active', 'Load Progress|Bold'], closed: ['Closed', null] };

function tRow(r) {
  const av = avatar(r.av);
  if (r.av.photo || r.av.initials) av.classList.add('ph');
  const aside = h('div', 'aside');
  if (r.cnt) aside.append(h('div', 'ms-cnt', null, String(r.cnt)));
  if (r.st) aside.append(h('div', 'ms-st ' + r.st, null, [ST_ICON[r.st] ? svg(ST_ICON[r.st], 'width:16px;height:16px') : icon(ST[r.st][1]), ST[r.st][0]]));
  aside.append(h('div', 'ms-own', { backgroundImage: img(r.own) }));
  const nm = h('div', 'nm', null, [`${r.n} ${r.name}`]);
  if (r.p) nm.append(h('span', 'ms-pr p' + r.p, null, '!'.repeat(r.p)));
  const body = h('div', 'body', null, [
    h('div', 'top', null, [nm, h('div', 'when', null, r.when)]),
    h('div', 'lo', null, [h('div', 'lines', null, [h('div', 'ln b', null, r.s), h('div', 'ln', null, r.l)]), aside]),
  ]);
  return h('div', 'ms-tr', null, [av, body]);
}

SCREENS.tickets = () => {
  const el = h('div', 'scr375');
  const content = h('div', 'ms-tl');
  const rows = TK.map(r => { const e = tRow(r); content.append(e); return e; });
  el.append(content);
  const hdr = header('Tickets', 'raju', ['Sort', 'My Tasks', 'Priority', 'Status']);
  el.append(hdr, statusBar(), tabBar('Tickets'));
  const max = () => Math.max(0, content.scrollHeight + 166 - (812 - 86));
  return { el, parts: { content, rows, hdr }, scrollMax: max, scroll(y) { content.style.transform = `translateY(${-Math.max(0, Math.min(max(), y))}px)`; } };
};

/* ---------------------------------------------------------------- ticket chat */
SCREENS.ticketChat = () => {
  const el = h('div', 'scr375');
  const main = h('div', 'ms-main', 'top:222px');
  const vp = h('div', 'ms-vp');
  const col = h('div', 'ms-col', 'padding-bottom:23px');
  const inv = h('div', 'ms-inv', null, h('div', 'pg', null, [
    'INVOICE', h('div', null, 'font:500 7px/1 var(--sf);color:#74768A;margin-top:5px', 'Summit Tax & Accounting · #1042'),
    h('i', null, 'width:90%'), h('i', null, 'width:70%'), h('i', null, 'width:82%'), h('i', null, 'width:60%'), h('i', null, 'width:88%'),
    h('div', 'tot', null, [h('span', null, null, 'Total due'), h('span', null, null, '$1,250.00')]), h('i', null, 'width:50%;margin-top:10px'), h('i', null, 'width:74%')]));
  const b1 = h('div', 'ms-pk', null, [inv, h('div', 'ms-txt', null, 'Here’s the invoice from August. She needs the latest one.'),
    h('div', 'ms-meta', null, [mav('sophia'), 'Sophia Turner · 8:30 pm'])]);
  const system = h('div', 'ms-sys', null, [h('div', 'a', null, ['Priority changed to ', h('b', null, null, '!!! High')]), h('div', 'm', null, 'Ethan Williams · 8:30 pm')]);
  const b2 = h('div', 'ms-pk', null, [h('div', 'ms-txt', 'padding-top:6px', 'Judith called again this morning. She needs a copy of her latest invoice before Friday for her accountant. Can someone in billing pull it from QuickBooks and email it to her directly today?'),
    h('div', 'ms-meta', null, [mav('ethan'), 'Ethan Williams · 8:30 pm'])]);
  col.append(b1, system, b2);
  vp.append(col);
  const bar = h('div', 'ms-bar');
  const field = h('div', 'ms-field', 'border-color:#FFAFD8;min-height:48px', h('span', 'ph', null, 'Add comment'));
  bar.append(svg(PLUS, 'position:absolute;left:16px;bottom:36.5px;width:24px;height:24px'), field,
    icon('Flash / Light|Light', 'position:absolute;left:335px;bottom:36.5px;width:24px;height:24px'));
  main.append(vp, bar);

  const hi = h('div', 'pill hi', null, '!!! High');
  const card = h('div', 'ms-tc', null, [
    h('div', 'subj', null, 'Needs a copy of her latest invoice before Friday.'),
    icon('Down|Light', 'position:absolute;right:14px;top:17px;width:20px;height:20px'),
    h('div', 'pills', null, [hi, h('div', 'pill ip', null, [icon('Load Progress|Bold'), 'In Progress']), h('div', 'ms-own', { backgroundImage: img('ethan') }),
      h('div', null, 'flex:1'), h('div', 'cn', null, [svg(PERSON, 'width:15px;height:15px;color:#5C5D71'), '1']), h('div', 'cn', null, [icon('Tag|Bold'), '2'])]),
  ]);
  el.append(main, card, h('div', null, 'position:absolute;left:0;top:128px;width:375px;height:94px;background:#fff;z-index:23'),
    nav({ av: { photo: 'judith' }, name: '#256 Judith Rodriguez', dy: -2.5, hgt: 75 }), statusBar());

  const pin = pinned(col, vp);
  const state = (o = {}) => {
    const p = o.priority == null ? 1 : o.priority;
    system.style.display = p ? '' : 'none'; b2.style.marginTop = p ? '' : '16px';
    hi.className = 'pill ' + (p ? 'hi' : 'md'); hi.textContent = p ? '!!! High' : '!! Medium';
    pin.place();
  };
  state();
  return { el, parts: { headerCard: card, messages: [b1, b2], system, composer: field, content: col }, state, scroll: pin.scroll, scrollMax: pin.max };
};
})();

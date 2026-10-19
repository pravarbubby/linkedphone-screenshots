/* iPadOS set — 2064×2752, following the designer's iPad frames (refs/ipad-v9):
   true 3:4 iPad (1467×1936px frame, 27px bezel) holding the mobile UI widened to 614×818pt at 2.3px/pt.
   Pop-outs: the exact on-screen element at 1.2× (2.76px/pt), cropped from the live screen. */
(() => {
const { h, icon, svg, img } = UI;
const { slide, text, pop } = STORE;
const W = 614, H = 818, S = 2.3, K = S * 1.2, BZ = 27.5;
const FW = W * S + 2 * BZ, DX = (2064 - FW) / 2;
const P = (css, kids) => h('div', '', 'position:absolute;' + css, kids);

function ipad(screen, y) {
  const d = h('div', 'dev', { left: DX + 'px', top: y + 'px', width: FW + 'px', height: H * S + 2 * BZ + 'px' });
  d.append(h('div', 'bezel', { borderRadius: '124px', background: '#171A2B' }));
  const sc = h('div', 'screen', { left: BZ + 'px', top: BZ + 'px', width: W * S + 'px', height: H * S + 'px', borderRadius: '98px' });
  const wrap = h('div', 'scr', { width: W + 'px', height: H + 'px', transform: `scale(${S})` });
  wrap.append(screen); sc.append(wrap); d.append(sc);
  return d;
}
const sx = (pt) => DX + BZ + pt * S, sy = (y0, pt) => y0 + BZ + pt * S;
/* crop a region {x,y,w,h} (pt) of a freshly built screen and pop it at 1.2×, centred on the region */
function popCrop(make, y0, R, o = {}) {
  const el = make();
  el.style.position = 'absolute'; el.style.left = -R.x + 'px'; el.style.top = -R.y + 'px';
  el.querySelectorAll('.sbar').forEach(n => n.remove());
  const box = P(`left:0;top:0;width:${R.w}px;height:${R.h}px;overflow:hidden;background:#fff`, el);
  const cx = sx(R.x + R.w / 2), cy = o.top != null ? null : sy(y0, R.y + R.h / 2);
  const y = o.top != null ? sy(y0, o.top) : cy - R.h * K / 2;
  return pop(box, { x: cx - R.w * K / 2, y, w: R.w, h: R.h, k: K, r: o.r || 22, cls: o.cls || '' });
}
const head2 = (e, l1, l2) => e.append(text('hl', 132, 120, l1, 'letter-spacing:-1.2px'), text('hl', 266, 120, l2, 'letter-spacing:-1.2px'));
const head = (e, l1, l2) => e.append(text('hl', 132, 120, l1, 'letter-spacing:-1.2px'), text('sub', 272, 74, l2, 'letter-spacing:-.7px'));
const foot = (e, y) => e.append(text('sub', y, 66, 'Calls, texts, tickets, an AI receptionist.', 'letter-spacing:-.6px'),
  text('sub', y + 86, 66, [['bb', 'Work solo or as a team'], '. All in one app.'], 'letter-spacing:-.6px'));
const Y1 = 442, Y2 = 520;                              // device top: hero slides / content slides

/* ── dark live call with the Business Caller ID card inside the screen ── */
const HANG = '<svg viewBox="0 0 28 28"><path d="M14 10.2c-4.3 0-8.1 1.3-10 3-.7.6-.9 1.4-.7 2.2l.5 1.9c.2.8 1 1.3 1.8 1.2l3.6-.5c.8-.1 1.4-.8 1.4-1.6v-1.7c1.1-.4 2.2-.5 3.4-.5s2.3.1 3.4.5v1.7c0 .8.6 1.5 1.4 1.6l3.6.5c.8.1 1.6-.4 1.8-1.2l.5-1.9c.2-.8 0-1.6-.7-2.2-1.9-1.7-5.7-3-10-3Z" fill="currentColor"/></svg>';
const SHIELD = `<svg viewBox="0 0 220 258"><defs><linearGradient id="ishg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2D4BF0"/><stop offset="1" stop-color="#0B1FB4"/></linearGradient></defs><path d="M110 4 L212 38 V132 C212 190 168 232 110 254 C52 232 8 190 8 132 V38 Z" fill="url(#ishg)" stroke="#5670FF" stroke-width="3"/></svg>`;
function callScreen({ dark = true, callerId = false, who = 'noah', name = 'Noah Anderson', compact = false } = {}) {
  const dy = compact ? -120 : 0;
  const el = h('div', 'scr375', { width: W + 'px', height: H + 'px', background: dark ? '#000' : '#fff' });
  const fg = dark ? '#fff' : '#171A2B';
  el.append(TS.statusBarFor ? TS.statusBarFor(W) : '', P(`left:0;top:0;width:${W}px;height:47px;color:${fg}`, [
    P(`left:30px;top:16px;font:600 14px/18px var(--sf);color:${fg}`, '9:41'),
    P(`left:${W - 72}px;top:18px;display:flex;gap:5px;color:${fg}`, [svg('<svg viewBox="0 0 18 12"><rect x="0" y="8" width="3" height="4" rx=".8" fill="currentColor"/><rect x="5" y="5.5" width="3" height="6.5" rx=".8" fill="currentColor"/><rect x="10" y="3" width="3" height="9" rx=".8" fill="currentColor"/><rect x="15" y="0" width="3" height="12" rx=".8" fill="currentColor"/></svg>', 'width:14px;height:10px'),
      svg('<svg viewBox="0 0 16 12"><path d="M8 2.4c2.3 0 4.4.9 6 2.4l1.2-1.2A10.2 10.2 0 0 0 8 .6 10.2 10.2 0 0 0 .8 3.6L2 4.8a8.5 8.5 0 0 1 6-2.4Zm0 3.4c1.4 0 2.7.5 3.6 1.4l1.2-1.2A6.8 6.8 0 0 0 8 4a6.8 6.8 0 0 0-4.8 2l1.2 1.2c1-.9 2.2-1.4 3.6-1.4Zm0 3.4c.5 0 1 .2 1.3.5L8 11 6.7 9.7c.3-.3.8-.5 1.3-.5Z" fill="currentColor"/></svg>', 'width:14px;height:10px'),
      svg('<svg viewBox="0 0 28 13"><rect x=".5" y=".5" width="24" height="12" rx="3.8" fill="none" stroke="currentColor" opacity=".4"/><rect x="2" y="2" width="21" height="9" rx="2.5" fill="currentColor"/></svg>', 'width:22px;height:11px')])]));
  if (callerId) {
    const card = P(`left:${(W - 460) / 2}px;top:78px;width:460px;height:142px;border-radius:30px;background:#2C2E3E;box-shadow:0 0 0 1px #3A3D55,0 0 60px rgba(60,90,255,.45)`);
    const sh = P('left:20px;top:18px;width:90px;height:106px;filter:drop-shadow(0 0 12px rgba(60,90,255,.6))'); sh.innerHTML = SHIELD;
    sh.append(P('left:0;right:0;top:20px;text-align:center;color:#fff;font:700 12.5px/16px var(--sf)', ['Protect', h('br'), 'Your', h('br'), 'Personal', h('br'), 'Number']));
    card.append(sh, P('left:128px;top:36px;font:700 29px/36px var(--sf);color:#fff;white-space:nowrap', 'Business Caller ID'),
      P('left:128px;top:80px;display:flex;align-items:center;gap:12px;font:400 19px/24px var(--sf);color:#C9CAE0;white-space:nowrap', [h('span', null, 'font-size:22px', '🧘🏻‍♀️'), 'Restore Wellness Clinic']));
    el.append(card);
  } else {
    el.append(P(`left:0;top:47px;width:${W}px;height:70px`, [MS.chev('position:absolute;left:18px;top:24px;width:24px;height:24px;transform:scaleX(-1)'),
      P(`left:52px;top:15px;width:40px;height:40px;border-radius:50%;background:url(assets/defaults/call_disc_out.png) center/cover`),
      P('left:102px;top:14px;font:600 17px/22px var(--sf)', 'Business Call'),
      P('left:102px;top:38px;display:flex;gap:6px;font:400 15px/20px var(--sf);color:#444658', [h('span', null, 'font-size:15px', '🧘🏻‍♀️'), 'Restore Wellness Clinic'])]));
  }
  el.append(P(`left:${(W - 161) / 2}px;top:${257 + dy}px;width:161px;height:161px;border-radius:50%;background:${img(who)} center/cover;box-shadow:0 0 0 1.5px ${dark ? '#2A2C3E' : '#E5EAFF'}`),
    P(`left:0;width:${W}px;top:${436 + dy}px;text-align:center;font:700 21px/26px var(--sf);color:${fg}`, name),
    P(`left:0;width:${W}px;top:${472 + dy}px;text-align:center;font:400 17px/22px var(--sf);font-variant-numeric:tabular-nums;color:${fg}`, '01:46'));
  [['Speaker / Sound On2|Light', 200, 594], ['Dialpad 2|Light', 307, 594], ['Mute / Microphone off / Record|Light', 414, 594],
   ['Call Transfer|Light', 200, 709], [null, 307, 709], ['Add Contact|Light', 414, 709]].filter((b, i) => !compact || i >= 3).map(([ic, x, y]) => [ic, x, compact ? 735 : y]).forEach(([ic, x, y]) =>
    el.append(P(`left:${x - 40.5}px;top:${y - 40.5}px;width:81px;height:81px;border-radius:50%;display:grid;place-items:center;background:${ic ? (dark ? '#2E3042' : '#DFE1F8') : (dark ? '#EE6A55' : '#B23220')}`,
      ic ? icon(ic, `width:26px;height:26px;color:${fg}`) : svg(HANG, `width:36px;height:36px;color:${dark ? '#000' : '#fff'}`))));
  return el;
}

/* ── call summary card (pop) in pt ── */
function summaryCardPt(w) {
  const B = ['Michael called to book a haircut and beard trim.', 'Requested Jessica, his usual barber.', 'Looking for an appointment this Saturday morning.', 'Prefers a time between 10:00 AM and noon.', 'Confirmed for Saturday at 11:30 AM.'];
  return P(`left:0;top:0;width:${w}px;height:240px;background:#fff`, [
    P('left:22px;top:22px;font:700 17px/24px var(--sf)', 'Call Summary'),
    P('right:22px;top:24px;font:600 13.5px/20px var(--sf);background:linear-gradient(90deg,#5E6BE8,#B04FD0);-webkit-background-clip:text;background-clip:text;color:transparent', 'LinkedPhone AI'),
    ...B.map((t, i) => P(`left:40px;top:${62 + i * 26}px;font:400 16px/22px var(--sf);white-space:nowrap`, [P('left:-15px;top:0;color:#444658', '•'), t])),
    P('left:22px;top:196px;display:flex;gap:8px', [['😊', 'Happy'], ['👍🏻', 'Positive']].map(([e, t]) => h('div', '', 'height:32px;border:1px solid #DFE1F8;border-radius:16px;padding:0 12px 0 9px;display:flex;align-items:center;gap:6px;font:400 15px/1 var(--sf)', [h('span', null, 'font-size:15px', e), t])))]);
}

const L = [];
L[1] = ['Your Business Phone. Reinvented.', (e) => {
  head2(e, 'Your Business Phone.', [['blue', 'Reinvented'], '.']);
  e.append(ipad(callScreen({ callerId: true }), Y1));
  foot(e, 2462);
}, 'bg-hero'];
L[2] = ['24/7 AI Receptionist', (e) => {
  head(e, '24/7 AI Receptionist', [['bb', 'Never miss a call'], ', even when busy.']);
  e.append(ipad(TS.receptionist(W, H), Y1));
  // Call Handling block (Call Handling → Lead Capture), starting just below "All Incoming Calls"
  e.append(popCrop(() => TS.receptionist(W, 1200), Y1, { x: 0, y: 548, w: W, h: 356 }, { top: 434 + 12, r: 28 }));
}];
L[3] = ['Customer Conversations', (e) => {
  head(e, 'Customer Conversations', ['Calls, texts, and voicemails. ', ['bb', 'One place'], '.']);
  e.append(ipad(TS.inbox(W, H), Y2));
  e.append(popCrop(() => TS.inbox(W, H), Y2, { x: 0, y: 167.5 + 113 * 3, w: W, h: 113 }));
}];
L[4] = ['AI Call Summaries', (e) => {
  head(e, 'AI Call Summaries', [['bb', 'Every important detail'], ', captured.']);
  const sc = TS.callSummary(W, H), sum = sc.querySelector('.cl-sum');
  // the pop-out replaces the sheet's summary section: hide it and close the gap
  [...sum.children].forEach(c => { const t = parseFloat(c.style.top || getComputedStyle(c).top); if (t >= 150 && t < 530) c.style.display = 'none'; else if (t >= 530) c.style.top = t + 4 + 'px'; });
  e.append(ipad(sc, Y2));
  e.append(pop(summaryCardPt(W), { x: sx(0) - W * .1 * S, y: sy(Y2, 218), w: W, h: 240, k: K, r: 26 }));
}];
L[5] = ['Tickets, Built In', (e) => {
  head(e, 'Tickets, Built In', ['Keep ', ['bb', 'every customer request'], ' on track.']);
  e.append(ipad(TS.tickets(W, H), Y2));
  e.append(popCrop(() => TS.tickets(W, H), Y2, { x: 0, y: 109.5 + 127 + 8, w: W, h: 111 }));
}];
L[6] = ['Auto Attendant', (e) => {
  head(e, 'Auto Attendant', [['bb', 'Every call'], ' goes where it should.']);
  e.append(ipad(TS.autoAttendant(W, H), Y2));
  const cw = W - 64.5 - 16.5;
  e.append(pop(MS.introCard(W - 20), { x: sx(W / 2) - W * K / 2, y: sy(Y2, 351) - 30, w: W, h: 128, k: K, r: 24 }));
}];
L[7] = ['One Number. One Team.', (e) => {
  head(e, 'One Number. One Team.', [['bb', 'Share calls'], ', texts, & customer requests.']);
  e.append(ipad(TS.team(W, H), Y2));
  // same width and 1.2× scale as the other iPad pop-outs: the card re-laid out at the screen width
  const ic = MS.incomingTeam(); const hh = 112;
  ic.style.width = W + 'px'; ic.style.height = hh + 'px';
  const q = (c) => ic.querySelector(c);
  ic.firstChild.style.cssText += ';left:20px;top:28px;width:52px;height:52px';
  q('.l1').style.cssText += ';left:88px;top:12px;font-size:19px'; q('.l2').style.cssText += ';left:88px;top:40px;font-size:16.5px'; q('.l3').style.cssText += ';left:88px;top:64px;font-size:16.5px';
  q('.stk').style.cssText += `;left:${W - 20 - 33 * 3 + 14}px;top:39px`;
  e.append(pop(ic, { x: sx(W / 2) - W * K / 2, y: sy(Y2, 300), w: W, h: hh, k: K, r: 22, cls: 'halo' }));
}];
L[8] = ['Transfer Calls', (e) => {
  head(e, 'Transfer Calls', ['Pass live calls to the ', ['bb', 'right person'], '.']);
  const cs = callScreen({ dark: false, who: 'keisha', name: 'Keisha Morgan' });
  cs.append(P(`left:0;top:0;width:${W}px;height:${H}px;background:rgba(23,26,43,.32)`));
  e.append(ipad(cs, Y2));
  const k = 300 * K / 890;
  e.append(pop(MS.transferCard(), { x: (2064 - 890 * k) / 2, y: sy(Y2, H / 2) - 672 * k / 2, w: 890, h: 672, k, r: 72 }));
}];
L[9] = ['Business Power Texting', (e) => {
  head(e, 'Business Power Texting', ['Auto-replies. ', ['bb', 'AI-powered suggestions'], '.']);
  e.append(ipad(TS.texting(W, H), Y2));
  e.append(MS.suggestRow(K / 2.4667 * .94, 1032, sy(Y2, H - 96) - 140));
}];
L[10] = ['Built to Grow with You', (e) => {
  head(e, 'Built to Grow with You', ['Add numbers for ', ['bb', 'one business or many'], '.']);
  e.append(ipad(TS.profileMulti(W, H), Y2));
  const rw = W - 32;
  [286, 376].forEach((t, i) => { const p = popCrop(() => TS.profileMulti(W, H), Y2, { x: 16, y: 64 + t, w: rw, h: 78 }, { r: 22 }); p.style.top = parseFloat(p.style.top) + (i ? 30 : -30) + 'px'; e.append(p); });
}];

L.forEach((d, n) => { if (!d) return; const [title, fn, bg] = d;
  STORE.ipad[n] = { title, build() { const e = slide('ipad', bg || 'bg-std'); fn(e); return e; } }; });
})();

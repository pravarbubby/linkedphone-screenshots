/* macOS set — 2880×1800, modelled on the real LinkedPhone Mac app.
   One macOS window per slide (1400×840pt app at 1.5px/pt → 2100×1300px), headline above.
   Settings stories use the app's own Menu overlay (two white panels over the dimmed app).
   Rule: a pop-out is the on-screen element at 1.2× (1.8px/pt), centred on the element it comes from. */
(() => {
const { h, icon, img } = UI;
const { slide, text, pop } = STORE;
const S = 1.4, K = S * 1.2, PXF = K / (2.4667 * 1.2), TB = 32;
/* MacBook Pro 14″ (1512×982pt) — maximized window below the menu bar */
const W = 1512, H = 945, WX = (2880 - W * S) / 2, WY = 372;
const wx = (pt) => WX + pt * S, wy = (pt) => WY + (TB + pt) * S;     // app pt → slide px

function macWindow(app) {
  const win = h('div', '', `position:absolute;left:${WX}px;top:${WY}px;width:${W * S}px;height:${(H + TB) * S}px;border-radius:${14 * S}px;overflow:hidden;background:#fff;` +
    `box-shadow:0 0 0 1.5px rgba(23,26,43,.10),0 50px 110px rgba(40,50,110,.20),0 12px 30px rgba(40,50,110,.08)`);
  const inner = h('div', '', `position:absolute;left:0;top:0;width:${W}px;height:${H + TB}px;transform:scale(${S});transform-origin:0 0`);
  const bar = h('div', '', `position:absolute;left:0;top:0;width:${W}px;height:${TB}px;background:#fff;border-bottom:1px solid #ECEDF7;z-index:40`, [
    ...['#FF5F57', '#FEBC2E', '#28C840'].map((c, i) => h('div', '', `position:absolute;left:${14 + i * 20}px;top:9px;width:12px;height:12px;border-radius:50%;background:${c}`)),
    h('div', '', `position:absolute;left:84px;top:0;font:500 13px/${TB}px var(--sf);color:#444658`, 'linkedphone')]);
  app.style.top = TB + 'px';
  inner.append(app, bar); win.append(inner);
  return win;
}
const popAt = (content, cx, cy, wPt, hPt, o = {}) => pop(content, { x: cx - wPt * K / 2 + (o.dx || 0), y: cy - hPt * K / 2 + (o.dy || 0), w: wPt, h: hPt, k: K, r: o.r || 24, cls: o.cls || '', style: o.style || '' });
const popPx = (content, cx, cy, dw, dh, o = {}) => pop(content, { x: cx - dw * PXF / 2 + (o.dx || 0), y: cy - dh * PXF / 2 + (o.dy || 0), w: dw, h: dh, k: PXF, r: o.r || 112, cls: o.cls || '', style: o.style || '' });
const head = (e, l1, l2) => e.append(text('hl', 98, 104, l1, 'letter-spacing:-1.1px'), text('sub', 232, 62, l2, 'letter-spacing:-.6px'));

/* desktop transfer confirmation (real pattern), 430×278pt */
const transferDialog = () => {
  const P = (css, kids) => h('div', '', 'position:absolute;' + css, kids);
  return P('inset:0', [
    P('left:136px;top:18px;width:158px;height:62px;border-radius:22px;background:#D7FDB7'),
    P(`left:146px;top:25px;width:48px;height:48px;border-radius:14px;background:${img('keisha')} center/cover;box-shadow:0 0 0 2px #fff`),
    P(`left:236px;top:25px;width:48px;height:48px;border-radius:14px;background:${img('alexis')} center/cover;box-shadow:0 0 0 2px #fff`),
    icon('Call Transfer|Bold', 'position:absolute;left:202px;top:37px;width:26px;height:26px;color:#3F7D1C'),
    P('left:272px;top:61px;width:14px;height:14px;border-radius:50%;background:#3F8A12;box-shadow:0 0 0 2.5px #fff'),
    P('left:0;right:0;top:96px;text-align:center;font:700 22px/30px var(--sf);letter-spacing:-.2px', 'Transferring call to Sarah'),
    P('left:30px;right:30px;top:134px;text-align:center;font:400 15px/21px var(--sf);color:#444658', ['Once you tap ', h('b', null, 'color:#171A2B', 'Transfer Now'), ', your current call will end and be passed to the selected team member.']),
    P('left:16px;top:204px;width:191px;height:56px;border-radius:16px;background:#DFE1F8;color:#DE260C;display:grid;place-items:center;font:400 17px/1 var(--sf)', 'Cancel'),
    P('left:223px;top:204px;width:191px;height:56px;border-radius:16px;background:#3356FF;color:#fff;display:grid;place-items:center;font:400 17px/1 var(--sf)', 'Transfer Now')]);
};

const M = [];
M[1] = ['Your Business Phone. Reinvented.', (e) => {
  e.append(text('hl', 98, 104, ['Your Business Phone. ', ['blue', 'Reinvented'], '.'], 'letter-spacing:-1.1px'),
    text('sub', 232, 62, ['Calls, texts, tickets, an AI receptionist. ', ['bb', 'Work solo or as a team'], '.'], 'letter-spacing:-.6px'));
  e.append(macWindow(DS.v4calls({ W, H, key: 'noah', live: true }).el));
  // Business Caller ID — beside the live call it belongs to, never on top of it
  const k = .72;
  e.append(pop(MS.callerIdBanner(), { x: wx(88 + 359) + 70, y: WY + (H + TB) * S - 330 * k + 30, w: 1157, h: 330, k, r: 118, cls: 'dark' }));
}, 'bg-hero'];
M[2] = ['24/7 AI Receptionist', (e) => {
  head(e, '24/7 AI Receptionist', [['bb', 'Never miss a call'], ', even when busy.']);
  const lw = 360, rw = 480;
  const { el, o } = DS.menuOverlay({ W, H, base: 'inbox', lw, rw, left: (w, hh) => DS.menuPanel(w, hh), right: (w, hh) => DS.pagePanel(MS.receptionist().el, w, hh) });
  e.append(macWindow(el));
  // Lisa's Jobs comes out of the Call Handling block of the Lisa page
  const cx = wx(o.rx + rw / 2), cy = wy(o.top + (613 - 40 + 145));
  e.append(popPx(MS.lisaJobs(), cx, cy, rw * K / PXF, 897, { dx: 360, dy: -170 }));
}];
M[3] = ['Customer Conversations', (e) => {
  head(e, 'Customer Conversations', ['Calls, texts, and voicemails. ', ['bb', 'One place'], '.']);
  e.append(macWindow(DS.inbox({ W, H, key: 'michael' }).el));
  e.append(popAt(DS.irow(1), wx(72 + 180), wy(117 + 101 + 50), 360, 101, { dx: -140, r: 22 }));
}];
M[4] = ['AI Call Summaries', (e) => {
  head(e, 'AI Call Summaries', [['bb', 'Every important detail'], ', captured.']);
  e.append(macWindow(DS.v4calls({ W, H, key: 'michael' }).el));
  const pw = W - 432, cw = Math.min(768, pw - 64);
  e.append(popPx(MS.summaryCard(), wx(432 + pw / 2), wy(139 + 120 + 105), cw * K / PXF, 977, { dx: 0 }));
}];
M[5] = ['Tickets, Built In', (e) => {
  head(e, 'Tickets, Built In', ['Keep ', ['bb', 'every customer request'], ' on track.']);
  e.append(macWindow(DS.tickets({ W, H }).el));
  e.append(popAt(MS.ticketCard(1, 359), wx(72 + 180), wy(117 + 127 + 63), 359, 127, { dx: -140, r: 22 }));
}];
M[6] = ['Auto Attendant', (e) => {
  head(e, 'Auto Attendant', [['bb', 'Every call'], ' goes where it should.']);
  const lw = 380, rw = 480;
  const { el, o } = DS.menuOverlay({ W, H, base: 'v4calls', lw, rw,
    left: (w, hh) => DS.pagePanel(MS.receptionist().el, w, hh),
    right: (w, hh) => DS.pagePanel(MS.autoAttendant().el, w, hh) });
  e.append(macWindow(el));
  const cw = rw - 64.5 - 16.5;
  e.append(popAt(MS.introCard(cw), wx(o.rx + 64.5 + cw / 2), wy(o.top + 351 - 40 + 50), cw, 112, { dx: 40, r: 24 }));
}];
M[7] = ['One Number. One Team.', (e) => {
  head(e, 'One Number. One Team.', [['bb', 'Share calls'], ', texts, & customer requests.']);
  const lw = 400, rw = 480;
  const { el, o } = DS.menuOverlay({ W, H, base: 'inbox', lw, rw,
    left: (w, hh) => DS.teamList(w, hh, { sel: 2, ringing: [0, 2, 3] }), right: (w, hh) => DS.memberPanel(w, hh) });
  e.append(macWindow(el));
  e.append(popAt(MS.incomingTeam(), 2880 - 90 - 483 * K / 2, WY + 96, 483, 128, { r: 40 }));
}];
M[8] = ['Transfer Calls', (e) => {
  head(e, 'Transfer Calls', ['Pass live calls to the ', ['bb', 'right person'], '.']);
  e.append(macWindow(DS.v4calls({ W, H, key: 'keisha', live: true, transfer: true }).el));
  e.append(popAt(transferDialog(), wx(88 + 359) + 430 * K / 2 + 60, wy(H - 235 + 110) - 40, 430, 278, { r: 26 }));
}];
M[9] = ['Business Power Texting', (e) => {
  head(e, 'Business Power Texting', ['Auto-replies. ', ['bb', 'AI-powered suggestions'], '.']);
  e.append(macWindow(DS.inbox({ W, H, key: 'kevin', typed: 'We’ll have them delivered by noon today. 💐', gap: 110 }).el));
  const pw = W - 360 - 432;
  e.append(MS.suggestRow(.5, wx(432 + pw / 2), wy(H - 82 - 50) - 32));
}];
M[10] = ['Built to Grow with You', (e) => {
  head(e, 'Built to Grow with You', ['Add numbers for ', ['bb', 'one business or many'], '.']);
  const lw = 360, rw = 480;
  const { el, o } = DS.menuOverlay({ W, H, base: 'inbox', lw, rw,
    left: (w, hh) => DS.menuPanel(w, hh, 'num1'), right: (w, hh) => DS.businessBody(w, hh) });
  e.append(macWindow(el));
  const dw = 1300;
  const card = (rowTop, dx, emo, n, s) => pop(MS.numberCard(emo, n, s), { x: wx(o.lx + lw / 2) - dw * PXF / 2 + dx, y: wy(o.top + rowTop + 33) - 300 * PXF / 2, w: dw, h: 300, k: PXF, r: 80, cls: 'num', style: '--tx:70px;--nx:350px' });
  e.append(card(232, -330, '🐣', '+1 (971) 555-1212', 'Bob’s Fried Chicken Shack'), card(298 + 82, -290, '🍔', '+1 (971) 555-1414', 'Bob’s Burger Shack'));
}];

M.forEach((d, n) => { if (!d) return; const [title, fn, bg] = d;
  STORE.mac[n] = { title, build() { const e = slide('mac', bg || 'bg-std'); fn(e); return e; } }; });
})();

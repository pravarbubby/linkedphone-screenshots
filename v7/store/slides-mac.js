/* macOS set — 2880×1800, modelled on the real LinkedPhone Mac app (MacBook Pro 14″, 1512×945pt window).
   · Product slides: the app window at 1.4px/pt.
   · Settings slides: the app's two-panel Menu card on its own (no app behind it) at 1.6px/pt.
   Pop-out rule: the exact on-screen element at 1.2×, centred on itself — it only slightly overlaps its own spot. */
(() => {
const { h, icon, svg, img } = UI;
const { slide, text, pop } = STORE;
const S = 1.4, K = S * 1.2, TB = 32, PXF = K / 2.96;
const W = 1512, H = 945, WX = (2880 - W * S) / 2, WY = 372;
const wx = (pt) => WX + pt * S, wy = (pt) => WY + (TB + pt) * S;
const SF = 1.6, KF = SF * 1.2;                         // frameless Menu cards

function macWindow(app, wy0 = WY) {
  const win = h('div', '', `position:absolute;left:${WX}px;top:${wy0}px;width:${W * S}px;height:${(H + TB) * S}px;border-radius:${14 * S}px;overflow:hidden;background:#fff;` +
    `box-shadow:0 0 0 1.5px rgba(23,26,43,.10),0 50px 110px rgba(40,50,110,.20),0 12px 30px rgba(40,50,110,.08)`);
  const inner = h('div', '', `position:absolute;left:0;top:0;width:${W}px;height:${H + TB}px;transform:scale(${S});transform-origin:0 0`);
  const bar = h('div', '', `position:absolute;left:0;top:0;width:${W}px;height:${TB}px;background:#fff;border-bottom:1px solid #ECEDF7;z-index:40`, [
    ...['#FF5F57', '#FEBC2E', '#28C840'].map((c, i) => h('div', '', `position:absolute;left:${14 + i * 20}px;top:10px;width:12px;height:12px;border-radius:50%;background:${c}`)),
    h('div', '', `position:absolute;left:84px;top:0;font:500 13px/${TB}px var(--sf);color:#444658`, 'linkedphone')]);
  app.style.top = TB + 'px';
  inner.append(app, bar); win.append(inner);
  return win;
}
/* the Menu card (two white panels in one lavender frame), floating on its own */
function card2(left, lw, right, rw, hh, top) {
  const gap = 6, pad = 5, fw = lw + rw + gap + 2 * pad, fh = hh + 2 * pad;
  const x = (2880 - fw * SF) / 2;
  const f = h('div', '', `position:absolute;left:${x}px;top:${top}px;width:${fw * SF}px;height:${fh * SF}px;border-radius:${21 * SF}px;background:#E3E5F8;` +
    `box-shadow:0 50px 110px rgba(40,50,110,.22),0 12px 30px rgba(40,50,110,.08)`);
  const inner = h('div', '', `position:absolute;left:0;top:0;width:${fw}px;height:${fh}px;transform:scale(${SF});transform-origin:0 0`);
  const box = (bx, w, kid) => h('div', '', `position:absolute;left:${bx}px;top:${pad}px;width:${w}px;height:${hh}px;border-radius:16px;overflow:hidden;background:#fff`, kid);
  inner.append(box(pad, lw, left), box(pad + lw + gap, rw, right)); f.append(inner);
  return { el: f, lx: (pt) => x + (pad + pt) * SF, rx: (pt) => x + (pad + lw + gap + pt) * SF, y: (pt) => top + (pad + pt) * SF };
}
const popAt = (content, cx, cy, wPt, hPt, o = {}) => { const k = o.k || K;
  return pop(content, { x: cx - wPt * k / 2 + (o.dx || 0), y: cy - hPt * k / 2 + (o.dy || 0), w: wPt, h: hPt, k, r: o.r || 24, cls: o.cls || '', style: o.style || '' }); };
const popPx = (content, cx, cy, dw, dh, o = {}) => pop(content, { x: cx - dw * PXF / 2 + (o.dx || 0), y: cy - dh * PXF / 2 + (o.dy || 0), w: dw, h: dh, k: PXF, r: o.r || 112, cls: o.cls || '' });
const head = (e, l1, l2) => e.append(text('hl', 98, 104, l1, 'letter-spacing:-1.1px'), text('sub', 232, 62, l2, 'letter-spacing:-.6px'));
const pad16 = (kid, w, hh) => h('div', '', `position:absolute;left:0;top:0;width:${w}px;height:${hh}px`, [(() => { kid.style.left = '18px'; kid.style.top = '16px'; return kid; })()]);

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
/* a Menu row (business number) as it appears in the Menu panel, 360×66pt */
const numRow = (emo, n, s, on) => h('div', '', `position:absolute;inset:0;background:${on ? '#EFF0FE' : '#fff'}`, [
  h('div', '', 'position:absolute;left:14px;top:20px;font-size:22px;line-height:26px', emo),
  h('div', '', 'position:absolute;left:52px;top:11px;font:600 16px/22px var(--sf);white-space:nowrap', n),
  h('div', '', 'position:absolute;left:52px;top:35px;font:400 14px/20px var(--sf);color:#444658;white-space:nowrap', s),
  MS.chev('position:absolute;left:322px;top:22px;width:22px;height:22px;color:#444658')]);

const M = [];
M[1] = ['Your Business Phone. Reinvented.', (e) => {
  const Y1 = 290;
  e.append(text('hl', 92, 132, ['Your Business Phone. ', ['blue', 'Reinvented'], '.'], 'letter-spacing:-1.6px'));
  e.append(h('div', '', 'position:absolute;left:340px;top:420px;width:2200px;height:1200px;border-radius:50%;background:radial-gradient(closest-side,rgba(120,140,255,.18),rgba(120,140,255,0))'));
  e.append(macWindow(DS.v4calls({ W, H, key: 'noah', live: true }).el, Y1));
  // Business Caller ID — breaks out of the right edge, opposite the live call (bottom-left)
  const k = .64, bw = 1157 * k;
  e.append(pop(MS.callerIdBanner(), { x: WX + W * S + 300 - bw, y: Y1 + (TB + 250) * S, w: 1157, h: 330, k, r: 118, cls: 'dark' }));
  e.append(text('sub', 1690, 58, ['Calls, texts, tickets, an AI receptionist. ', ['bb', 'Work solo or as a team'], '.'], 'letter-spacing:-.5px'));
}, 'bg-hero'];
M[2] = ['24/7 AI Receptionist', (e) => {
  head(e, '24/7 AI Receptionist', [['bb', 'Never miss a call'], ', even when busy.']);
  e.append(h('div', '', 'position:absolute;left:160px;top:520px;width:1200px;height:1200px;border-radius:50%;background:radial-gradient(closest-side,rgba(190,240,160,.55),rgba(255,255,255,0))'));
  e.append(h('div', '', 'position:absolute;left:250px;top:420px;width:1000px;height:1380px;background:url(assets/lisa-arms.png) center top/contain no-repeat'));
  const pw = 540, hh = 660, SF2 = 1.7, x0 = 1300, y0 = 420, pad = 5;
  const card = h('div', '', `position:absolute;left:${x0}px;top:${y0}px;width:${(pw + 2 * pad) * SF2}px;height:${(hh + 2 * pad) * SF2}px;border-radius:${21 * SF2}px;background:#E3E5F8;box-shadow:0 50px 110px rgba(40,50,110,.22),0 12px 30px rgba(40,50,110,.08)`);
  const inner = h('div', '', `position:absolute;left:0;top:0;width:${pw + 2 * pad}px;height:${hh + 2 * pad}px;transform:scale(${SF2});transform-origin:0 0`);
  inner.append(h('div', '', `position:absolute;left:${pad}px;top:${pad}px;width:${pw}px;height:${hh}px;border-radius:16px;overflow:hidden;background:#fff`, DS.leadCapture(pw, hh)));
  card.append(inner); e.append(card);
  const lw = pw - 32;
  e.append(popAt(DS.leadList(lw, 'left:0;top:0'), x0 + (pad + 16 + lw / 2) * SF2, y0 + (pad + 300 + 140) * SF2, lw, 280, { k: SF2 * 1.2, r: 16, dy: 30 }));
}];
M[3] = ['Customer Conversations', (e) => {
  head(e, 'Customer Conversations', ['Calls, texts, and voicemails. ', ['bb', 'One place'], '.']);
  e.append(macWindow(DS.inbox({ W, H, key: 'michael' }).el));
  e.append(popAt(DS.irow(2, true), wx(72 + 180), wy(117 + 202 + 50.5), 360, 101, { r: 20 }));
}];
M[4] = ['AI Call Summaries', (e) => {
  head(e, 'AI Call Summaries', [['bb', 'Every important detail'], ', captured.']);
  e.append(macWindow(DS.v4calls({ W, H, key: 'michael' }).el));
  const pw = W - 432, cw = Math.min(768, pw - 64), cl = (pw - cw) / 2, bh = DS.sumBlockH('michael');
  e.append(popAt(pad16(DS.sumBlock('michael', cw), cw + 36, bh + 26), wx(432 + cl + cw / 2), wy(139 + 120 + bh / 2), cw + 36, bh + 26, { r: 20 }));
}];
M[5] = ['Tickets, Built In', (e) => {
  head(e, 'Tickets, Built In', ['Keep ', ['bb', 'every customer request'], ' on track.']);
  e.append(macWindow(DS.tickets({ W, H }).el));
  e.append(popAt(MS.ticketCard(1, 359), wx(72 + 180), wy(117 + 127 + 63.5), 359, 127, { r: 20 }));
}];
M[6] = ['Auto Attendant', (e) => {
  head(e, 'Auto Attendant', [['bb', 'Every call'], ' goes where it should.']);
  const lw = 380, rw = 570, hh = 760;
  const c = card2(DS.pagePanel(MS.autoAttendant().el, lw, hh), lw, DS.greetingEdit(rw, hh), rw, hh, 410);
  e.append(c.el);
  const cw = lw - 64.5 - 16.5;
  e.append(popAt(MS.introCard(cw), c.lx(64.5 + cw / 2), c.y(351 - 40 + 50), cw, 112, { k: KF, r: 24 }));
}];
M[7] = ['One Number. One Team.', (e) => {
  head(e, 'One Number. One Team.', [['bb', 'Share calls'], ', texts, & customer requests.']);
  const lw = 420, rw = 630, hh = 720;
  const c = card2(DS.teamList(lw, hh, { sel: 2, ringing: [0, 2, 3] }), lw, DS.memberPanel(rw, hh), rw, hh, 520);
  e.append(c.el);
  e.append(popAt(MS.incomingTeam(), c.rx(rw) + 220, 360 + 128 * K / 2, 483, 128, { k: K, r: 40, dx: -483 * K / 2 }));
}];
M[8] = ['Transfer Calls', (e) => {
  head(e, 'Transfer Calls', ['Pass live calls to the ', ['bb', 'right person'], '.']);
  const app = DS.v4calls({ W, H, key: 'keisha', live: true }).el;
  app.append(h('div', '', `position:absolute;left:0;top:0;width:${W}px;height:${H}px;background:rgba(23,26,43,.45);z-index:20`));
  e.append(macWindow(app));
  e.append(popAt(transferDialog(), wx(W / 2), wy(H / 2), 430, 278, { r: 26 }));
}];
M[9] = ['Business Power Texting', (e) => {
  head(e, 'Business Power Texting', ['Auto-replies. ', ['bb', 'AI-powered suggestions'], '.']);
  e.append(macWindow(DS.inbox({ W, H, key: 'kevin', typed: 'We’ll have them delivered by noon today. 💐', gap: 110 }).el));
  const pw = W - 360 - 432;
  e.append(MS.suggestRow(.5, wx(432 + pw / 2), wy(H - 82 - 50) - 32));
}];
M[10] = ['Built to Grow with You', (e) => {
  head(e, 'Built to Grow with You', ['Add numbers for ', ['bb', 'one business or many'], '.']);
  const lw = 360, rw = 540, hh = 760;
  const c = card2(DS.menuPanel(lw, hh, 'num1'), lw, DS.businessBody(rw, hh), rw, hh, 420);
  e.append(c.el);
  e.append(popAt(numRow('🐣', '+1 (971) 555-1212', 'Bob’s Fried Chicken Shack'), c.lx(180), c.y(232 + 33), 360, 66, { k: KF, r: 20 }),
           popAt(numRow('🍔', '+1 (971) 555-1414', 'Bob’s Burger Shack'), c.lx(180), c.y(298 + 33), 360, 66, { k: KF, r: 20, dy: 36 }));
}];

M.forEach((d, n) => { if (!d) return; const [title, fn, bg] = d;
  STORE.mac[n] = { title, build() { const e = slide('mac', bg || 'bg-std'); fn(e); return e; } }; });
})();

/* macOS set — 2880×1800. Two kinds of slide:
   · window slides: one macOS window (2 panes, 1040×640pt at 2px/pt), generous margins;
   · frameless slides: one floating UI panel (+ Lisa art) for feature stories.
   Rule: pop-outs are the on-screen element at 1.2× (2.4px/pt), centred over the element they come from. */
(() => {
const { h } = UI;
const { slide, text, pop } = STORE;
const S = 2, K = S * 1.2, PXF = K / (2.4667 * 1.2), TB = 28;
const W = 1040, H = 640, WX = (2880 - W * S) / 2, WY = 420;
const wx = (pt) => WX + pt * S, wy = (pt) => WY + (TB + pt) * S;     // app pt → slide px

const chrome = `box-shadow:0 0 0 ${S}px rgba(23,26,43,.08),0 ${36 * S}px ${80 * S}px rgba(40,50,110,.20),0 ${8 * S}px ${20 * S}px rgba(40,50,110,.08)`;
function macWindow(app) {
  const win = h('div', '', `position:absolute;left:${WX}px;top:${WY}px;width:${W * S}px;height:${(H + TB) * S}px;border-radius:${12 * S}px;overflow:hidden;background:#fff;${chrome}`);
  const inner = h('div', '', `position:absolute;left:0;top:0;width:${W}px;height:${H + TB}px;transform:scale(${S});transform-origin:0 0`);
  const bar = h('div', '', `position:absolute;left:0;top:0;width:${W}px;height:${TB}px;background:#F3F4FB;border-bottom:1px solid #E1E3F4;z-index:40`, [
    ...['#FF5F57', '#FEBC2E', '#28C840'].map((c, i) => h('div', '', `position:absolute;left:${13 + i * 20}px;top:8px;width:12px;height:12px;border-radius:50%;background:${c}`)),
    h('div', '', `position:absolute;left:0;right:0;top:0;text-align:center;font:600 13px/${TB}px var(--sf);color:#5C5D71`, 'LinkedPhone')]);
  app.style.top = TB + 'px';
  inner.append(app, bar); win.append(inner);
  return win;
}
/* frameless floating panel: el is wPt×hPt (optionally cropped from the top) */
function panel(el, { x, y, w, hh, crop = 0, r = 24 }) {
  const p = h('div', '', `position:absolute;left:${x}px;top:${y}px;width:${w * S}px;height:${hh * S}px;border-radius:${r * S}px;overflow:hidden;background:#fff;${chrome}`);
  const inner = h('div', '', `position:absolute;left:0;top:${-crop * S}px;width:${w}px;height:${hh + crop}px;transform:scale(${S});transform-origin:0 0`);
  inner.append(el); p.append(inner);
  return p;
}
const popOver = (content, cx, cy, wPt, hPt, o = {}) => pop(content, { x: cx - wPt * K / 2 + (o.dx || 0), y: cy - hPt * K / 2 + (o.dy || 0), w: wPt, h: hPt, k: K, r: o.r || 32, cls: o.cls || '' });
const popPx = (content, cx, cy, dw, dh, o = {}) => pop(content, { x: cx - dw * PXF / 2 + (o.dx || 0), y: cy - dh * PXF / 2 + (o.dy || 0), w: dw, h: dh, k: PXF, r: o.r || 112, cls: o.cls || '', style: o.style || '' });
const head = (e, l1, l2) => e.append(text('hl', 112, 112, l1, 'letter-spacing:-1.2px'), text('sub', 262, 70, l2, 'letter-spacing:-.7px'));
const app = (name, o = {}) => DS[name]({ W, H, ...o }).el;
const glow = (x, y, w, hh, c) => h('div', '', `position:absolute;left:${x}px;top:${y}px;width:${w}px;height:${hh}px;border-radius:50%;background:radial-gradient(closest-side,${c},rgba(255,255,255,0))`);
const noBar = (el) => { el.querySelectorAll('.sbar').forEach(n => n.remove()); return el; };

const M = [];
M[1] = ['Your Business Phone. Reinvented.', (e) => {
  e.append(text('hl', 112, 112, ['Your Business Phone. ', ['blue', 'Reinvented'], '.'], 'letter-spacing:-1.2px'),
    text('sub', 262, 70, ['Calls, texts, tickets, an AI receptionist. ', ['bb', 'Work solo or as a team'], '.'], 'letter-spacing:-.7px'));
  e.append(macWindow(app('calls', { key: 'noah', overlay: 'live' })));
  // Business Caller ID pops out of the live-call widget header
  e.append(pop(MS.callerIdBanner(), { x: wx(88 + 180) - 1157 * .92 / 2 - 140, y: wy(H - 235) - 330 * .92 + 70, w: 1157, h: 330, k: .92, r: 118, cls: 'dark' }));
}, 'bg-hero'];
M[2] = ['24/7 AI Receptionist', (e) => {
  head(e, '24/7 AI Receptionist', [['bb', 'Never miss a call'], ', even when busy.']);
  e.append(glow(260, 520, 1200, 1200, 'rgba(190,240,160,.55)'));
  e.append(h('div', '', 'position:absolute;left:420px;top:470px;width:1100px;height:1313px;background:url(assets/lisa-phones.png) center top/contain no-repeat'));
  e.append(pop(MS.lisaJobs(), { x: 1480, y: 640, w: 1187, h: 897, k: 1, r: 112 }));
}];
M[3] = ['Customer Conversations', (e) => {
  head(e, 'Customer Conversations', ['Calls, texts, and voicemails. ', ['bb', 'One place'], '.']);
  e.append(macWindow(app('inbox', { key: 'michael' })));
  e.append(popOver(DS.irow(1), wx(72 + 180), wy(117 + 101 + 50), 360, 101, { dx: -150, r: 28 }));
}];
M[4] = ['AI Call Summaries', (e) => {
  head(e, 'AI Call Summaries', [['bb', 'Every important detail'], ', captured.']);
  e.append(macWindow(app('calls', { key: 'michael' })));
  const cw = 544;
  e.append(popPx(MS.summaryCard(), wx(432 + 304), wy(139 + 225), cw * K / PXF, 977, { dx: 120 }));
}];
M[5] = ['Tickets, Built In', (e) => {
  head(e, 'Tickets, Built In', ['Keep ', ['bb', 'every customer request'], ' on track.']);
  e.append(macWindow(app('tickets')));
  e.append(popOver(MS.ticketCard(1, 359), wx(72 + 180), wy(117 + 127 + 63), 359, 127, { dx: -150, r: 28 }));
}];
M[6] = ['Auto Attendant', (e) => {
  head(e, 'Auto Attendant', [['bb', 'Every call'], ' goes where it should.']);
  const pw = 600, ph = 700, crop = 40;
  const px = (2880 - pw * S) / 2, py = 430;
  e.append(panel(noBar(widen(MS.autoAttendant().el, pw, ph + crop)), { x: px, y: py, w: pw, hh: ph, crop }));
  const cw = pw - 64.5 - 16.5;
  e.append(popOver(MS.introCard(cw), px + (64.5 + cw / 2) * S, py + (351 - crop + 50) * S, cw, 112, { r: 30 }));
}];
M[7] = ['One Number. One Team.', (e) => {
  head(e, 'One Number. One Team.', [['bb', 'Share calls'], ', texts, & customer requests.']);
  const pw = 600, ph = 700, crop = 47;
  const px = (2880 - pw * S) / 2, py = 560;
  e.append(panel(noBar(widen(MS.team({ ringing: [0, 1, 5] }).el, pw, ph + crop)), { x: px, y: py, w: pw, hh: ph, crop }));
  e.append(popOver(MS.incomingTeam(), 1440, py - 40, 483, 128, { r: 40 }));
}];
M[8] = ['Transfer Calls', (e) => {
  head(e, 'Transfer Calls', ['Pass live calls to the ', ['bb', 'right person'], '.']);
  e.append(macWindow(app('calls', { key: 'keisha', overlay: 'live' })));
  e.append(popPx(MS.transferCard(), wx(88 + 359) + 330, wy(H - 235) + 100, 890, 672, { r: 72 }));
}];
M[9] = ['Business Power Texting', (e) => {
  head(e, 'Business Power Texting', ['Auto-replies. ', ['bb', 'AI-powered suggestions'], '.']);
  e.append(macWindow(app('inbox', { key: 'kevin', typed: 'We’ll have them delivered by noon today. 💐', gap: 120 })));
  e.append(MS.suggestRow(.68, wx(432 + 304), wy(H - 82 - 56) - 44));
}];
M[10] = ['Built to Grow with You', (e) => {
  head(e, 'Built to Grow with You', ['Add numbers for ', ['bb', 'one business or many'], '.']);
  const pw = 360, ph = 650;
  const px = (2880 - pw * S) / 2, py = 440;
  e.append(panel(DS.menuCol(ph), { x: px, y: py, w: pw, hh: ph }));
  const dw = 1300;
  const card = (row, dx, emo, n, s) => pop(MS.numberCard(emo, n, s), { x: px + 180 * S - dw * PXF / 2 + dx, y: py + (226 + row * 66 + 31) * S - 300 * PXF / 2 + (row ? 70 : -40), w: dw, h: 300, k: PXF, r: 80, cls: 'num', style: '--tx:70px;--nx:350px' });
  e.append(card(0, -330, '🐣', '+1 (971) 555-1212', 'Bob’s Fried Chicken Shack'), card(1, 330, '🍔', '+1 (971) 555-1414', 'Bob’s Burger Shack'));
}];

M.forEach((d, n) => { if (!d) return; const [title, fn, bg] = d;
  STORE.mac[n] = { title, build() { const e = slide('mac', bg || 'bg-std'); fn(e); return e; } }; });
})();

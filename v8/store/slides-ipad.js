/* iPadOS set — 2064×2752. True 3:4 iPad (800×1067pt screen at 2px/pt), sitting on the bottom edge.
   Rule: every pop-out is the on-screen element at 1.2× (2.4px/pt), centred over the element it comes from. */
(() => {
const { h } = UI;
const { slide, text, pop } = STORE;
const W = 800, H = 1067, S = 2, BZ = 19, K = S * 1.2;
const DX = (2064 - (W * S + 2 * BZ)) / 2, DY = 600;
const PXF = K / (2.4667 * 1.2);           // px-designed (iPhone) cards → same 1.2× rule

function ipad(screen, x = DX, y = DY) {
  const d = h('div', 'dev', { left: x + 'px', top: y + 'px', width: W * S + 2 * BZ + 'px', height: H * S + 2 * BZ + 'px' });
  d.append(h('div', 'bezel', { borderRadius: '86px', background: '#171A2B' }));
  const sc = h('div', 'screen', { left: BZ + 'px', top: BZ + 'px', width: W * S + 'px', height: H * S + 'px', borderRadius: '67px' });
  const wrap = h('div', 'scr', { width: W + 'px', height: H + 'px', transform: `scale(${S})` });
  wrap.append(screen); sc.append(wrap); d.append(sc);
  return d;
}
const sx = (pt, x = DX) => x + BZ + pt * S, sy = (pt, y = DY) => y + BZ + pt * S;
/* pt-designed element popped over a source box {x,y,w,h} (screen pt) */
function popOver(content, src, wPt, hPt, { r = 36, cls = '', dx = 0, dy = 0, x0 = DX } = {}) {
  const cx = sx(src.x + src.w / 2, x0), cy = sy(src.y + src.h / 2);
  return pop(content, { x: cx - wPt * K / 2 + dx, y: cy - hPt * K / 2 + dy, w: wPt, h: hPt, k: K, r, cls });
}
/* px-designed (iPhone) card, design size dw×dh, popped over a source box */
function popPx(content, src, dw, dh, { r = 112, cls = '', dx = 0, dy = 0, style = '', x0 = DX } = {}) {
  const cx = sx(src.x + src.w / 2, x0), cy = sy(src.y + src.h / 2);
  return pop(content, { x: cx - dw * PXF / 2 + dx, y: cy - dh * PXF / 2 + dy, w: dw, h: dh, k: PXF, r, cls, style });
}
const PXW = (W * K) / PXF;
const popPxY = (c, src, dw, dh, o) => { const e = popPx(c, src, dw, dh, o); e.style.top = parseFloat(e.style.top) + (src.y < 400 ? -46 : 46) + 'px'; return e; };                 // design width of a full-row px card
const head = (e, l1, l2) => e.append(text('hl', 132, 112, l1, 'letter-spacing:-1.1px'), text('sub', 296, 76, l2, 'letter-spacing:-.8px'));

const L = [];
L[1] = ['Your Business Phone. Reinvented.', (e) => {
  e.append(text('hl', 112, 108, ['Your Business Phone. ', ['blue', 'Reinvented'], '.'], 'letter-spacing:-1.1px'),
    text('sub', 262, 72, 'Calls, texts, tickets, an AI receptionist.', 'letter-spacing:-.8px'),
    text('sub', 352, 72, [['bb', 'Work solo or as a team'], '. All in one app.'], 'letter-spacing:-.8px'));
  e.append(ipad(TS.liveDark(W, H)));
  e.append(pop(MS.callerIdBanner(), { x: (2064 - 1157 * 1.08) / 2, y: sy(150), w: 1157, h: 330, k: 1.08, r: 118, cls: 'dark' }));
}, 'bg-hero'];
L[2] = ['24/7 AI Receptionist', (e) => {
  head(e, '24/7 AI Receptionist', [['bb', 'Never miss a call'], ', even when busy.']);
  e.append(ipad(TS.receptionist(W, H)));
  e.append(popPx(MS.lisaJobs(), { x: 0, y: 560, w: W, h: 330 }, PXW * .92, 897));
}];
L[3] = ['Customer Conversations', (e) => {
  head(e, 'Customer Conversations', ['Calls, texts, and voicemails. ', ['bb', 'One place'], '.']);
  e.append(ipad(TS.inbox(W, H)));
  e.append(popOver(MS.ivyCard(), { x: 0, y: 167.5 + 113 * 3, w: W, h: 113 }, W * .92, 118, { r: 32 }));
}];
L[4] = ['AI Call Summaries', (e) => {
  head(e, 'AI Call Summaries', [['bb', 'Every important detail'], ', captured.']);
  e.append(ipad(TS.callSummary(W, H)));
  e.append(popPx(MS.summaryCard(), { x: 0, y: 330, w: W, h: 190 }, PXW * .92, 977));
}];
L[5] = ['Tickets, Built In', (e) => {
  head(e, 'Tickets, Built In', ['Keep ', ['bb', 'every customer request'], ' on track.']);
  e.append(ipad(TS.tickets(W, H)));
  e.append(popOver(MS.ticketCard(1, W * .92), { x: 0, y: 109.5 + 127, w: W, h: 127 }, W * .92, 129, { r: 32 }));
}];
L[6] = ['Auto Attendant', (e) => {
  head(e, 'Auto Attendant', [['bb', 'Every call'], ' goes where it should.']);
  e.append(ipad(TS.autoAttendant(W, H)));
  const cw = W - 64.5 - 16.5;
  e.append(popOver(MS.introCard(cw), { x: 64.5, y: 351, w: cw, h: 100 }, cw, 112, { r: 30 }));
}];
L[7] = ['One Number. One Team.', (e) => {
  head(e, 'One Number. One Team.', [['bb', 'Share calls'], ', texts, & customer requests.']);
  e.append(ipad(TS.team(W, H, { ringing: [0, 1, 5] })));
  e.append(popOver(MS.incomingTeam(), { x: 0, y: 6, w: W, h: 128 }, 483, 128, { r: 40 }));
}];
L[8] = ['Transfer Calls', (e) => {
  head(e, 'Transfer Calls', ['Pass live calls to the ', ['bb', 'right person'], '.']);
  e.append(ipad(TS.liveLight(W, H)));
  e.append(popPx(MS.transferCard(), { x: 0, y: 500, w: W, h: 200 }, 890, 672, { r: 72 }));
}];
L[9] = ['Business Power Texting', (e) => {
  head(e, 'Business Power Texting', ['Auto-replies. ', ['bb', 'AI-powered suggestions'], '.']);
  e.append(ipad(TS.texting(W, H)));
  e.append(MS.suggestRow(K / 2.4667 * 1.12 * .92, 1032, sy(H - 96) - 150));
}];
L[10] = ['Built to Grow with You', (e) => {
  head(e, 'Built to Grow with You', ['Add numbers for ', ['bb', 'one business or many'], '.']);
  e.append(ipad(TS.profileMulti(W, H)));
  const rw = W - 32, dw = rw * K / PXF;
  const card = (top, dx, emo, n, s) => popPxY(MS.numberCard(emo, n, s), { x: 16, y: top, w: rw, h: 78 }, dw, 300, { r: 80, cls: 'num', dx, style: '--tx:70px;--nx:350px' });
  e.append(card(286 + 64, -60, '🐣', '+1 (971) 555-1212', 'Bob’s Fried Chicken Shack'), card(376 + 64, 60, '🍔', '+1 (971) 555-1414', 'Bob’s Burger Shack'));
}];

L.forEach((d, n) => { if (!d) return; const [title, fn, bg] = d;
  STORE.ipad[n] = { title, build() { const e = slide('ipad', bg || 'bg-std'); fn(e); return e; } }; });
})();

/* macOS set — 2880×1800. One floating macOS window (no laptop), app at 2× so the UI reads,
   two panes (rail · list · content) with room around it; one pop-out per slide breaking the window edge. */
(() => {
const { h } = UI;
const { slide, text, pop } = STORE;
const W = 1040, H = 640, S = 2, TB = 28;
const WX = 400, WY = 410;                       // window origin (px)
const X = (pt) => WX + pt * S, Y = (pt) => WY + (TB + pt) * S;

function macWindow(app, title = 'LinkedPhone') {
  const win = h('div', '', `position:absolute;left:${WX}px;top:${WY}px;width:${W * S}px;height:${(H + TB) * S}px;border-radius:${12 * S}px;overflow:hidden;background:#fff;` +
    `box-shadow:0 0 0 ${S}px rgba(23,26,43,.10),0 ${30 * S}px ${70 * S}px rgba(40,50,110,.22),0 ${8 * S}px ${18 * S}px rgba(40,50,110,.10)`);
  const inner = h('div', '', `position:absolute;left:0;top:0;width:${W}px;height:${H + TB}px;transform:scale(${S});transform-origin:0 0`);
  const bar = h('div', '', `position:absolute;left:0;top:0;width:${W}px;height:${TB}px;background:#F3F4FB;border-bottom:1px solid #E1E3F4;z-index:40`, [
    ...['#FF5F57', '#FEBC2E', '#28C840'].map((c, i) => h('div', '', `position:absolute;left:${13 + i * 20}px;top:8px;width:12px;height:12px;border-radius:50%;background:${c};box-shadow:inset 0 0 0 .5px rgba(0,0,0,.12)`)),
    h('div', '', `position:absolute;left:0;right:0;top:0;text-align:center;font:600 13px/${TB}px var(--sf);color:#5C5D71`, title)]);
  app.style.top = TB + 'px';
  inner.append(app, bar); win.append(inner);
  return win;
}
const head = (e, l1, l2) => e.append(text('hl', 108, 116, l1, 'letter-spacing:-1.2px'), text('sub', 262, 72, l2, 'letter-spacing:-.7px'));
const shadow = () => h('div', 'devshadow', `left:${WX + 100}px;top:${WY + (H + TB) * S - 60}px;width:${W * S - 200}px;height:160px`);
const app = (name, o = {}) => DS[name]({ W, H, ...o }).el;

const M = [];
M[1] = ['Your Business Phone. Reinvented.', (e) => {
  e.append(text('hl', 108, 116, ['Your Business Phone. ', ['blue', 'Reinvented'], '.'], 'letter-spacing:-1.2px'),
    text('sub', 262, 72, ['Calls, texts, tickets, an AI receptionist. ', ['bb', 'Work solo or as a team'], '.'], 'letter-spacing:-.7px'));
  e.append(shadow(), macWindow(app('calls', { key: 'noah', overlay: 'incoming' })));
  e.append(pop(MS.callerIdBanner(), { x: 170, y: 600, w: 1157, h: 330, k: 1.0, r: 118, cls: 'dark' }));
}, 'bg-hero'];
M[2] = ['24/7 AI Receptionist', (e) => {
  head(e, '24/7 AI Receptionist', [['bb', 'Never miss a call'], ', even when busy.']);
  e.append(shadow(), macWindow(app('receptionist')));
  e.append(pop(MS.lisaJobs(), { x: 1660, y: 700, w: 1187, h: 897, k: .92, r: 112 }));
}];
M[3] = ['Customer Conversations', (e) => {
  head(e, 'Customer Conversations', ['Calls, texts, and voicemails. ', ['bb', 'One place'], '.']);
  e.append(shadow(), macWindow(app('inbox', { key: 'michael' })));
  e.append(pop(MS.ivyCard(), { x: 180, y: Y(218) - 30, w: 376.8, h: 118, k: 2.7, r: 36 }));
}];
M[4] = ['AI Call Summaries', (e) => {
  head(e, 'AI Call Summaries', [['bb', 'Every important detail'], ', captured.']);
  e.append(shadow(), macWindow(app('calls', { key: 'michael' })));
  e.append(pop(MS.summaryCard(), { x: 1690, y: 640, w: 1187, h: 977, k: .9, r: 112 }));
}];
M[5] = ['Tickets, Built In', (e) => {
  head(e, 'Tickets, Built In', ['Keep ', ['bb', 'every customer request'], ' on track.']);
  e.append(shadow(), macWindow(app('tickets')));
  e.append(pop(MS.ticketCard(1), { x: 180, y: Y(244) - 34, w: 367.5, h: 124.7, k: 2.7, r: 36 }));
}];
M[6] = ['Auto Attendant', (e) => {
  head(e, 'Auto Attendant', [['bb', 'Every call'], ' goes where it should.']);
  e.append(shadow(), macWindow(app('autoAttendant')));
  e.append(pop(MS.introCard(), { x: 170, y: Y(300) - 40, w: 340, h: 130, k: 2.9, r: 36 }));
}];
M[7] = ['One Number. One Team.', (e) => {
  head(e, 'One Number. One Team.', [['bb', 'Share calls'], ', texts, & customer requests.']);
  e.append(shadow(), macWindow(app('team')));
  e.append(pop(MS.incomingTeam(), { x: 1600, y: 1230, w: 483, h: 128, k: 2.4, r: 40 }));
}];
M[8] = ['Transfer Calls', (e) => {
  head(e, 'Transfer Calls', ['Pass live calls to the ', ['bb', 'right person'], '.']);
  e.append(shadow(), macWindow(app('calls', { key: 'keisha', overlay: 'transfer' })));
  e.append(pop(MS.transferCard(), { x: X(W / 2) - 890 * .9 / 2, y: Y(H / 2) - 672 * .9 / 2, w: 890, h: 672, k: .9, r: 72 }));
}];
M[9] = ['Business Power Texting', (e) => {
  head(e, 'Business Power Texting', ['Auto-replies. ', ['bb', 'AI-powered suggestions'], '.']);
  e.append(shadow(), macWindow(app('inbox', { key: 'kevin', typed: 'We’ll have them delivered by noon today. 💐', gap: 120 })));
  e.append(MS.suggestRow(.86, X(432 + (W - 432) / 2), Y(H - 82 - 58) - 55));
}];
M[10] = ['Built to Grow with You', (e) => {
  head(e, 'Built to Grow with You', ['Add numbers for ', ['bb', 'one business or many'], '.']);
  e.append(shadow(), macWindow(app('business')));
  const card = (f, x, y, w, tx, nx, ...a) => pop(MS.numberCard(...a), { x, y, w, h: 346, k: f, r: 90, cls: 'num', style: `--tx:${tx}px;--nx:${nx}px` });
  e.append(card(.9, 150, 760, 1296, 106, 427, '🐣', '+1 (971) 555-1212', 'Bob’s Fried Chicken Shack'),
           card(.9, 1740, 1160, 1150, 49, 369, '🍔', '+1 (971) 555-1414', 'Bob’s Burger Shack'));
}];

M.forEach((d, n) => { if (!d) return; const [title, fn, bg] = d;
  STORE.mac[n] = { title, build() { const e = slide('mac', bg || 'bg-std'); fn(e); return e; } }; });
})();

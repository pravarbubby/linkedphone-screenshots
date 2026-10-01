/* iPadOS set — 2064×2752. Layout from refs/appstore/ipad refs: one large iPad (slim 19px bezel, r80),
   single-column app UI at ~2× (608pt wide), centred headline + subhead, one pop-out per slide. */
(() => {
const { h } = UI;
const { slide, text, pop } = STORE;
const W = 608, H = 1006, S = 1.95, BZ = 19;
const DX = 420, DY = 604;

function ipad(screen, x = DX, y = DY) {
  const sw = W * S, sh = H * S;
  const d = h('div', 'dev', { left: x + 'px', top: y + 'px', width: sw + 2 * BZ + 'px', height: sh + 2 * BZ + 'px' });
  d.append(h('div', 'bezel', { borderRadius: '80px', background: '#171A2B' }));
  const sc = h('div', 'screen', { left: BZ + 'px', top: BZ + 'px', width: sw + 'px', height: sh + 'px', borderRadius: '61px' });
  const wrap = h('div', 'scr', { width: W + 'px', height: H + 'px', transform: `scale(${S})` });
  wrap.append(screen); sc.append(wrap); d.append(sc);
  return d;
}
/* pt inside the screen → slide px */
const X = (pt, x = DX) => x + BZ + pt * S, Y = (pt, y = DY) => y + BZ + pt * S;
const head = (e, l1, l2) => e.append(text('hl', 120, 110, l1, 'letter-spacing:-1.1px'), text('sub', 282, 76, l2, 'letter-spacing:-.8px'));
const shadow = () => h('div', 'devshadow', 'left:330px;top:2520px;width:1400px;height:170px');

const S_ = [];
S_[1] = ['Your Business Phone. Reinvented.', (e) => {
  e.append(text('hl', 120, 110, ['Your Business Phone. ', ['blue', 'Reinvented'], '.'], 'letter-spacing:-1.1px'),
    text('sub', 282, 76, 'Calls, texts, tickets, an AI receptionist.', 'letter-spacing:-.8px'),
    text('sub', 378, 76, [['bb', 'Work solo or as a team'], '. All in one app.'], 'letter-spacing:-.8px'));
  e.append(shadow(), ipad(TS.liveDark(W, H), DX, 690));
  e.append(pop(MS.callerIdBanner(), { x: 236, y: Y(118, 690), w: 1157, h: 330, k: 1.38, r: 118, cls: 'dark' }));
}, 'bg-hero'];
S_[2] = ['24/7 AI Receptionist', (e) => {
  head(e, '24/7 AI Receptionist', [['bb', 'Never miss a call'], ', even when busy.']);
  e.append(shadow(), ipad(TS.receptionist(W, H)));
  e.append(pop(MS.lisaJobs(), { x: 700, y: 1580, w: 1187, h: 897, k: 1.12, r: 112 }));
}];
S_[3] = ['Customer Conversations', (e) => {
  head(e, 'Customer Conversations', ['Calls, texts, and voicemails. ', ['bb', 'One place'], '.']);
  e.append(shadow(), ipad(TS.inbox(W, H)));
  e.append(pop(MS.ivyCard(), { x: 150, y: Y(167.5 + 113 * 3) - 30, w: 376.8, h: 118, k: 3.0, r: 36 }));
}];
S_[4] = ['AI Call Summaries', (e) => {
  head(e, 'AI Call Summaries', [['bb', 'Every important detail'], ', captured.']);
  e.append(shadow(), ipad(TS.callSummary(W, H)));
  e.append(pop(MS.summaryCard(), { x: 760, y: Y(300), w: 1187, h: 977, k: 1.04, r: 112 }));
}];
S_[5] = ['Tickets, Built In', (e) => {
  head(e, 'Tickets, Built In', ['Keep ', ['bb', 'every customer request'], ' on track.']);
  e.append(shadow(), ipad(TS.tickets(W, H)));
  e.append(pop(MS.ticketCard(1), { x: 150, y: Y(109.5 + 127) - 34, w: 367.5, h: 124.7, k: 3.0, r: 36 }));
}];
S_[6] = ['Auto Attendant', (e) => {
  head(e, 'Auto Attendant', [['bb', 'Every call'], ' goes where it should.']);
  e.append(shadow(), ipad(TS.autoAttendant(W, H)));
  e.append(pop(MS.introCard(), { x: 170, y: Y(338) - 40, w: 340, h: 130, k: 3.3, r: 36 }));
}];
S_[7] = ['One Number. One Team.', (e) => {
  head(e, 'One Number. One Team.', [['bb', 'Share calls'], ', texts, & customer requests.']);
  e.append(shadow(), ipad(TS.team(W, H)));
  e.append(pop(MS.incomingTeam(), { x: 760, y: Y(470), w: 483, h: 128, k: 2.65, r: 40 }));
}];
S_[8] = ['Transfer Calls', (e) => {
  head(e, 'Transfer Calls', ['Pass live calls to the ', ['bb', 'right person'], '.']);
  const x = -230;
  e.append(h('div', 'devshadow', 'left:-200px;top:2520px;width:1300px;height:170px'), ipad(TS.liveLight(W, H), x));
  e.append(pop(MS.transferCard(), { x: 780, y: 1330, w: 890, h: 672, k: 1.22, r: 72 }));
}];
S_[9] = ['Business Power Texting', (e) => {
  head(e, 'Business Power Texting', ['Auto-replies. ', ['bb', 'AI-powered suggestions'], '.']);
  e.append(shadow(), ipad(TS.texting(W, H)));
  e.append(MS.suggestRow(1.05, 1032, Y(H - 95 - 52) - 67));
}];
S_[10] = ['Built to Grow with You', (e) => {
  head(e, 'Built to Grow with You', ['Add numbers for ', ['bb', 'one business or many'], '.']);
  e.append(shadow(), ipad(TS.profileMulti(W, H)));
  const card = (f, x, y, w, tx, nx, ...a) => pop(MS.numberCard(...a), { x, y, w, h: 346, k: f, r: 90, cls: 'num', style: `--tx:${tx}px;--nx:${nx}px` });
  e.append(card(1.05, 110, 1200, 1296, 106, 427, '🐣', '+1 (971) 555-1212', 'Bob’s Fried Chicken Shack'),
           card(1.05, 840, 1640, 1150, 49, 369, '🍔', '+1 (971) 555-1414', 'Bob’s Burger Shack'));
}];

S_.forEach((d, n) => { if (!d) return; const [title, fn, bg] = d;
  STORE.ipad[n] = { title, build() { const e = slide('ipad', bg || 'bg-std'); fn(e); return e; } }; });
})();

/* macOS (2880×1800, MacBook) and iPadOS (2064×2752, portrait iPad) sets.
   Same story, copy, gradients and pop-out cards as the iPhone set; the app is the responsive web UI
   (Mac: 1428pt wide → three panes; iPad: 1032pt wide → two panes). */
(() => {
const { h } = UI;
const { slide, text, pop, macFrame, ipadFrame } = STORE;

const GEO = {
  mac: { W: 1428, H: 901, top: 28, dev: { x: 445, y: 405, s: 1.36 }, hl: [118, 120], sub: [262, 80] },
  ipad: { W: 1032, H: 1352, top: 24, dev: { x: 244, y: 545, s: 1.45 }, hl: [172, 128], sub: [338, 84] },
};
function device(plat, app, dev) {
  const G = GEO[plat];
  const c = h('div', '', `position:absolute;left:0;top:0;width:${G.W}px;height:${G.H + G.top}px;background:${plat === 'ipad' ? 'linear-gradient(90deg,#DFE1F8 72px,#fff 72px)' : '#fff'}`);
  app.style.top = G.top + 'px';
  c.append(plat === 'mac' ? DS.macTitlebar() : DS.ipadStatus(), app);
  const d = Object.assign({}, G.dev, dev || {});
  return plat === 'mac' ? macFrame(c, { ...d, W: G.W, H: G.H + G.top }) : ipadFrame(c, { ...d, W: G.W, H: G.H + G.top });
}
const head = (e, plat, l1, l2) => {
  const G = GEO[plat];
  e.append(text('hl', G.hl[0], G.hl[1], l1, 'letter-spacing:-1.2px'), text('sub', G.sub[0], G.sub[1], l2, 'letter-spacing:-.9px'));
};
const shadow = (plat) => plat === 'mac'
  ? h('div', 'devshadow', 'left:300px;top:1690px;width:2280px;height:150px')
  : h('div', 'devshadow', 'left:200px;top:2560px;width:1664px;height:160px');
/* px-designed cards (built for the 1290-wide iPhone canvas) scaled by f */
const pxCard = (node, w, hh, r, f, x, y, cls = '') => pop(node, { x, y, w, h: hh, k: f, r, cls });
const pills = (f, x, y) => {
  const wrap = h('div', '', `position:absolute;left:${x}px;top:${y}px;width:1500px;height:200px;transform:scale(${f});transform-origin:0 0`);
  MS.rewritePills().forEach(p => { p.style.top = '0px'; p.style.left = parseFloat(p.style.left) + 38 + 'px'; wrap.append(p); });
  return wrap;
};

const S = {};
S[1] = { title: 'Your Business Phone. Reinvented.', build(plat) {
  const e = slide(plat, 'bg-hero');
  const G = GEO[plat];
  if (plat === 'mac') {
    e.append(text('hl', 118, 120, ['Your Business Phone. ', ['blue', 'Reinvented'], '.'], 'letter-spacing:-1.2px'),
      text('sub', 262, 80, ['Calls, texts, tickets, an AI receptionist. ', ['bb', 'Work solo or as a team'], '.'], 'letter-spacing:-.9px'));
    e.append(shadow(plat), device(plat, DS.calls({ W: G.W, H: G.H, key: 'noah', overlay: 'incoming' }).el));
    e.append(pxCard(MS.callerIdBanner(), 1157, 330, 118, .95, 150, 590, 'dark'));
  } else {
    e.append(text('hl', 150, 128, 'Your Business Phone.', 'letter-spacing:-1.2px'), text('hl', 300, 128, [['blue', 'Reinvented'], '.'], 'letter-spacing:-1.2px'));
    e.append(device(plat, DS.calls({ W: G.W, H: G.H, key: 'noah', overlay: 'incoming' }).el, { x: 305, y: 490, s: 1.33 }));
    e.append(pxCard(MS.callerIdBanner(), 1157, 330, 118, 1.4, 222, 780, 'dark'));
    e.append(text('sub', 2448, 80, 'Calls, texts, tickets, an AI receptionist.', 'letter-spacing:-.9px'), text('sub', 2556, 80, [['bb', 'Work solo or as a team'], '. All in one app.'], 'letter-spacing:-.9px'));
  }
  return e;
} };
S[2] = { title: '24/7 AI Receptionist', build(plat) {
  const e = slide(plat); const G = GEO[plat];
  head(e, plat, '24/7 AI Receptionist', [['bb', 'Never miss a call'], ', even when busy.']);
  e.append(shadow(plat), device(plat, DS.receptionist({ W: G.W, H: G.H }).el));
  e.append(plat === 'mac' ? pxCard(MS.lisaJobs(), 1187, 897, 112, .85, 1780, 760) : pxCard(MS.lisaJobs(), 1187, 897, 112, 1.12, 640, 1500));
  return e;
} };
S[3] = { title: 'Customer Conversations', build(plat) {
  const e = slide(plat); const G = GEO[plat];
  head(e, plat, 'Customer Conversations', ['Calls, texts, and voicemails. ', ['bb', 'One place'], '.']);
  e.append(shadow(plat), device(plat, DS.inbox({ W: G.W, H: G.H, key: 'michael' }).el));
  e.append(plat === 'mac' ? pop(MS.ivyCard(), { x: 150, y: 742, w: 376.8, h: 118, k: 2.7, r: 36 }) : pop(MS.ivyCard(), { x: 96, y: 905, w: 376.8, h: 118, k: 3.0, r: 36 }));
  return e;
} };
S[4] = { title: 'AI Call Summaries', build(plat) {
  const e = slide(plat); const G = GEO[plat];
  head(e, plat, 'AI Call Summaries', [['bb', 'Every important detail'], ', captured.']);
  e.append(shadow(plat), device(plat, DS.calls({ W: G.W, H: G.H, key: 'michael' }).el));
  e.append(plat === 'mac' ? pxCard(MS.summaryCard(), 1187, 977, 112, .88, 1690, 700) : pxCard(MS.summaryCard(), 1187, 977, 112, 1.15, 620, 1180));
  return e;
} };
S[5] = { title: 'Tickets, Built In', build(plat) {
  const e = slide(plat); const G = GEO[plat];
  head(e, plat, 'Tickets, Built In', ['Keep ', ['bb', 'every customer request'], ' on track.']);
  e.append(shadow(plat), device(plat, DS.tickets({ W: G.W, H: G.H }).el));
  e.append(plat === 'mac' ? pop(MS.ticketCard(1), { x: 150, y: 772, w: 367.5, h: 124.7, k: 2.7, r: 36 }) : pop(MS.ticketCard(1), { x: 90, y: 945, w: 367.5, h: 124.7, k: 3.1, r: 36 }));
  return e;
} };
S[6] = { title: 'Auto Attendant', build(plat) {
  const e = slide(plat); const G = GEO[plat];
  head(e, plat, 'Auto Attendant', [['bb', 'Every call'], ' goes where it should.']);
  e.append(shadow(plat), device(plat, DS.autoAttendant({ W: G.W, H: G.H }).el));
  e.append(plat === 'mac' ? pop(MS.introCard(), { x: 160, y: 820, w: 340, h: 130, k: 2.9, r: 36 }) : pop(MS.introCard(), { x: 100, y: 1030, w: 340, h: 130, k: 3.3, r: 36 }));
  return e;
} };
S[7] = { title: 'One Number. One Team.', build(plat) {
  const e = slide(plat); const G = GEO[plat];
  head(e, plat, 'One Number. One Team.', [['bb', 'Share calls'], ', texts, & customer requests.']);
  e.append(shadow(plat), device(plat, DS.team({ W: G.W, H: G.H }).el));
  e.append(plat === 'mac' ? pop(MS.incomingTeam(), { x: 1580, y: 1180, w: 483, h: 128, k: 2.4, r: 40 }) : pop(MS.incomingTeam(), { x: 330, y: 1720, w: 483, h: 128, k: 2.9, r: 40 }));
  return e;
} };
S[8] = { title: 'Transfer Calls', build(plat) {
  const e = slide(plat); const G = GEO[plat];
  head(e, plat, 'Transfer Calls', ['Pass live calls to the ', ['bb', 'right person'], '.']);
  e.append(shadow(plat), device(plat, DS.calls({ W: G.W, H: G.H, key: 'keisha', overlay: 'transfer' }).el));
  e.append(plat === 'mac' ? pxCard(MS.transferCard(), 890, 672, 72, .84, 1066, 800) : pxCard(MS.transferCard(), 890, 672, 72, 1.05, 565, 1250));
  return e;
} };
S[9] = { title: 'Business Power Texting', build(plat) {
  const e = slide(plat); const G = GEO[plat];
  head(e, plat, 'Business Power Texting', ['Auto-replies. ', ['bb', 'AI-powered suggestions'], '.']);
  e.append(shadow(plat), device(plat, DS.inbox({ W: G.W, H: G.H, key: 'kevin', typed: 'We’ll have them delivered by noon today. 💐', chips: true }).el));
  e.append(plat === 'mac' ? pills(.8, 1140, 1420) : pills(1.08, 190, 2180));
  return e;
} };
S[10] = { title: 'Built to Grow with You', build(plat) {
  const e = slide(plat); const G = GEO[plat];
  head(e, plat, 'Built to Grow with You', ['Add numbers for ', ['bb', 'one business or many'], '.']);
  e.append(shadow(plat), device(plat, DS.business({ W: G.W, H: G.H }).el));
  const card = (f, x, y, w, tx, nx, ...a) => pop(MS.numberCard(...a), { x, y, w, h: 346, k: f, r: 90, cls: 'num', style: `--tx:${tx}px;--nx:${nx}px` });
  if (plat === 'mac') e.append(card(.85, 120, 800, 1296, 106, 427, '🐣', '+1 (971) 555-1212', 'Bob’s Fried Chicken Shack'), card(.85, 1960, 1130, 1150, 49, 369, '🍔', '+1 (971) 555-1414', 'Bob’s Burger Shack'));
  else e.append(card(1.1, -120, 1240, 1296, 106, 427, '🐣', '+1 (971) 555-1212', 'Bob’s Fried Chicken Shack'), card(1.1, 880, 1720, 1150, 49, 369, '🍔', '+1 (971) 555-1414', 'Bob’s Burger Shack'));
  return e;
} };

['mac', 'ipad'].forEach(plat => { for (let n = 1; n <= 10; n++) STORE[plat][n] = { title: S[n].title, build: () => S[n].build(plat) }; });
})();

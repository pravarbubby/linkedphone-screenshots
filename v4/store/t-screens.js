/* Tablet (iPad) single-column screens: the App Store mobile screens re-laid out at W×H pt.
   TS.<name>(W, H) → widened .scr375 element. */
(() => {
const { h, icon, svg, img } = UI;
const P = (css, kids) => h('div', '', 'position:absolute;' + css, kids);

const WIFI = '<svg viewBox="0 0 16 12"><path d="M8 2.4c2.3 0 4.4.9 6 2.4l1.2-1.2A10.2 10.2 0 0 0 8 .6 10.2 10.2 0 0 0 .8 3.6L2 4.8a8.5 8.5 0 0 1 6-2.4Zm0 3.4c1.4 0 2.7.5 3.6 1.4l1.2-1.2A6.8 6.8 0 0 0 8 4a6.8 6.8 0 0 0-4.8 2l1.2 1.2c1-.9 2.2-1.4 3.6-1.4Zm0 3.4c.5 0 1 .2 1.3.5L8 11 6.7 9.7c.3-.3.8-.5 1.3-.5Z" fill="currentColor"/></svg>';
const SIG = '<svg viewBox="0 0 18 12"><rect x="0" y="8" width="3" height="4" rx=".8" fill="currentColor"/><rect x="5" y="5.5" width="3" height="6.5" rx=".8" fill="currentColor"/><rect x="10" y="3" width="3" height="9" rx=".8" fill="currentColor"/><rect x="15" y="0" width="3" height="12" rx=".8" fill="currentColor"/></svg>';
const BATT = '<svg viewBox="0 0 28 13"><rect x=".5" y=".5" width="24" height="12" rx="3.8" fill="none" stroke="currentColor" opacity=".4"/><rect x="2" y="2" width="21" height="9" rx="2.5" fill="currentColor"/><path d="M26 4.5v4c.8-.3 1.3-1.1 1.3-2s-.5-1.7-1.3-2Z" fill="currentColor" opacity=".45"/></svg>';
/* iPad status bar: small time at the left, glyphs at the right, no notch */
function ipadBar(el) {
  el.querySelectorAll('.sbar').forEach(sb => {
    const dark = sb.classList.contains('dark') || sb.style.background === 'transparent' || !!sb.closest('.cl-top') || getComputedStyle(sb).backgroundColor === 'rgb(0, 0, 0)';
    const c = dark ? '#fff' : '#171A2B';
    const n = h('div', 'sbar', `width:375px;height:47px;background:${dark ? 'transparent' : '#fff'};color:${c}`, [
      P(`left:22px;top:14px;font:600 14px/18px var(--sf);color:${c}`, '9:41'),
      P(`left:290px;top:17px;width:62px;height:12px;display:flex;gap:5px;justify-content:flex-end;align-items:center;color:${c}`, [svg(SIG, `width:15px;height:10px;color:${c}`), svg(WIFI, `width:14px;height:11px;color:${c}`), svg(BATT, `width:24px;height:12px;color:${c}`)]),
    ]);
    sb.replaceWith(n);
  });
  return el;
}
const W_ = (el, W, H, o) => widen(ipadBar(el), W, H, o);

const TS = {};
const vshift = (el, sel, dy) => el.querySelectorAll(sel).forEach(e => e.style.top = parseFloat(e.style.top || getComputedStyle(e).top) + dy + 'px');
/* call screens: identity block in the upper-middle, controls pinned near the bottom */
function callLayout(el, W, H, { idTop, idSel, btnSel }) {
  const ids = [...el.querySelectorAll(idSel)];
  const t0 = Math.min(...ids.map(e => parseFloat(e.style.top || getComputedStyle(e).top)));
  ids.forEach(e => e.style.top = parseFloat(e.style.top || getComputedStyle(e).top) - t0 + idTop + 'px');
  const btns = [...el.querySelectorAll(btnSel)];
  const ys = [...new Set(btns.map(b => parseFloat(b.style.top)))].sort((a, b) => a - b);
  const last = H - 150, gap = 118;
  btns.forEach(b => { const r = ys.indexOf(parseFloat(b.style.top)); b.style.top = last - (ys.length - 1 - r) * gap + 'px'; });
  // spread the 3 columns to a comfortable width
  const xs = [...new Set(btns.map(b => parseFloat(b.style.left)))].sort((a, b) => a - b);
  const cx = W / 2, sp = 150;
  btns.forEach(b => { const c = xs.indexOf(parseFloat(b.style.left)); b.style.left = cx + (c - 1) * sp + 'px'; b.style.marginLeft = '-40px'; });
  return el;
}
TS.liveDark = (W, H) => {
  const el = W_(MS.liveDark().el, W, H, { center: '.cl-btn' });
  const idEls = [...el.children].filter(c => { const t = parseFloat(c.style.top); return t > 240 && t < 500; });
  idEls.forEach(e => e.classList.add('id-blk'));
  el.querySelector('.cl-big').classList.add('id-blk');
  [...el.querySelectorAll('.id-blk')].forEach(e => { if (!e.classList.contains('cl-big')) { e.style.left = '0px'; e.style.width = W + 'px'; } });
  const big = el.querySelector('.cl-big'); big.style.left = (W - 159) / 2 + 'px';
  return callLayout(el, W, H, { idTop: 420, idSel: '.id-blk', btnSel: '.cl-btn' });
};
TS.liveLight = (W, H) => {
  const el = W_(MS.liveLight().el, W, H, { center: '.cl-btn,.cl-big' });
  ['.cl-cname', '.cl-timer-row'].forEach(q => { const e = el.querySelector(q); e.style.left = '0px'; e.style.width = W + 'px'; });
  el.querySelector('.cl-big').style.left = (W - 160) / 2 + 'px';
  el.querySelectorAll('.cl-big,.cl-cname,.cl-timer-row').forEach(e => e.classList.add('id-blk'));
  return callLayout(el, W, H, { idTop: 230, idSel: '.id-blk', btnSel: '.cl-btn' });
};
TS.inbox = (W, H) => W_(MS.inbox().el, W, H);
TS.tickets = (W, H) => W_(MS.tickets().el, W, H);
TS.team = (W, H, o) => W_(MS.team(o).el, W, H);
TS.receptionist = (W, H) => W_(MS.receptionist().el, W, H, { center: '.lisa' });
TS.autoAttendant = (W, H) => W_(MS.autoAttendant().el, W, H);

/* call summary with the whole sheet visible */
TS.callSummary = (W, H) => {
  const el = MS.callSummary().el;
  const sum = el.querySelector('.cl-sum');
  const at = (e, top) => { e.style.top = top + 'px'; sum.append(e); return e; };
  sum.append(h('div', 'cl-seg', null, [h('div', 'on'), h('div', 'lb', 'left:4px', 'AI Summary'), h('div', 'lb off', 'left:172px', 'Transcript')]),
    h('div', 'cl-meta', null, 'Inbound call ended at 9:05 am · Duration 2:34'));
  const ARR = '<svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><path d="M2 7h10M8 3l4 4-4 4"/></svg>';
  const arrow = () => h('div', 'cl-fa', null, svg(ARR, 'width:14px;height:14px'));
  sum.append(h('div', 'cl-flow', null, [h('div', 'cl-fc', null, [h('span', null, 'font-size:15px', '☀️'), 'Start']), arrow(),
    h('div', 'cl-fc', null, [h('div', null, { width: '20px', height: '20px', borderRadius: '50%', background: img('alexis') + ' center/cover' }), 'Ashley answered · 2:34']), arrow(), h('div', 'cl-fc', 'padding:0 11px', 'End')]));
  at(h('div', 'cl-dash'), 320);
  at(h('div', 'cl-h', null, 'Summary'), 337);
  ['Michael called to book a haircut and beard trim.', 'Looking for an appointment this Saturday morning.', 'Confirmed for Saturday at 11:30.'].forEach((t, i) => at(h('div', 'cl-bul', null, t), 371.5 + 34 * i));
  sum.append(h('div', 'cl-feel', 'left:16px;top:480px', [h('b', null, null, '😊'), 'Happy']), h('div', 'cl-feel', 'left:111px;top:480px', [h('b', null, null, '👍🏻'), 'Positive']));
  // follow-ups below
  const move = { 583.5: 538, 598.5: 553, 631: 586 };
  [...sum.children].forEach(c => { const t = parseFloat(c.style.top); if (move[t] != null) c.style.top = move[t] + 'px'; });
  at(h('div', 'cl-card', 'height:89px', [icon('Contact|Light'), h('div', 'tx', null, [h('div', null, null, 'Update contact details with the preferred barber as “Jessica”'), h('a', null, null, 'Accept Edit')])]), 687);
  at(h('div', 'cl-dash'), 794);
  sum.append(h('div', 'cl-pow', 'top:810px', ['Powered by ', h('span', null, null, 'LinkedPhone AI')]));
  sum.style.height = '900px';
  W_(el, W, H);
  const seg = el.querySelector('.cl-seg'), half = (W - 32) / 2;
  seg.style.width = W - 32 + 'px';
  seg.querySelector('.on').style.width = half - 4 + 'px';
  const [l1, l2] = seg.querySelectorAll('.lb'); l1.style.cssText += `;left:4px;width:${half - 4}px`; l2.style.cssText += `;left:${half}px;width:${half - 4}px`;
  return el;
};

/* texting on iPad: conversation fills from the top, composer pinned to the bottom, no keyboard */
TS.texting = (W, H) => {
  const el = h('div', 'scr375', { width: W + 'px', height: H + 'px' });
  const nav = MS.texting().el; // reuse the nav bar artwork
  const navBar = [...nav.children].find(c => c.style.zIndex === '25');
  el.append(navBar); navBar.style.width = W + 'px';
  [...navBar.children].forEach(c => { const l = parseFloat(c.style.left); if (l > 280) c.style.left = l + (W - 375) + 'px'; });
  const col = h('div', '', `position:absolute;left:24px;right:24px;top:122px;display:flex;flex-direction:column;gap:14px`);
  const MW = Math.round(W * .58);
  const pill = (t) => h('div', '', 'align-self:center;height:24px;padding:0 10px;border-radius:9px;background:#EFF0FE;border:1px solid #E3E5FA;font:400 14.5px/22px var(--sf);margin:6px 0', t);
  const inB = (t, meta, photo) => h('div', '', `align-self:flex-start;max-width:${MW}px;border-radius:16px;background:#F0F0F0;padding:${photo ? '4px 4px 10px' : '12px 14px 10px'}`, [
    photo ? h('div', '', `width:${MW - 8}px;height:${Math.round((MW - 8) * .62)}px;border-radius:12px;background:url(assets/photos/flowers.png) center 70%/cover`) : '',
    h('div', '', `font:400 17px/24px var(--sf);letter-spacing:-.2px;${photo ? 'padding:10px 10px 0' : ''}`, t), h('div', '', `margin-top:6px;font:400 14.5px/20px var(--sf);color:#5C5D71;${photo ? 'padding:0 10px' : ''}`, meta)]);
  const outB = (t, meta, who) => h('div', '', `align-self:flex-end;max-width:${MW}px;border-radius:16px;background:#DFE1F8;padding:12px 14px 10px`, [
    h('div', '', 'font:400 17px/24px var(--sf);letter-spacing:-.2px', t),
    h('div', '', 'margin-top:6px;display:flex;align-items:center;gap:7px;font:400 14.5px/20px var(--sf);color:#5C5D71', [h('div', '', `width:18px;height:18px;border-radius:50%;background:${img(who)} center/cover`), meta])]);
  col.append(pill('Sep 30, 2026'),
    inB('Hi! Do you deliver to Brooklyn Heights? I’d love a few potted arrangements for my shop.', 'Richard · 4:12 pm'),
    outB('Yes! We deliver across Brooklyn every day. Send us a photo of what you like and we’ll get it ready.', 'Jesse · 4:20 pm', 'jesse'),
    inB('Perfect, I’ll pick some out tonight.', 'Richard · 4:24 pm'),
    pill('Oct 1, 2026'),
    inB('What’s the status on my order?', 'Richard · 8:30 pm', true));
  el.append(col);
  const comp = h('div', '', `position:absolute;left:0;top:${H - 96}px;width:${W}px;height:96px;background:#fff`, [
    svg('<svg viewBox="0 0 24 24"><path d="M12 4.5v15M4.5 12h15" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>', 'position:absolute;left:20px;top:36px;width:26px;height:26px'),
    h('div', '', `position:absolute;left:60px;top:18px;width:${W - 60 - 76}px;height:58px;border:1.5px solid #171A2B;border-radius:18px;padding:0 16px;display:flex;align-items:center;font:500 17px/24px var(--sf)`, ['We’ll have them delivered by noon today. ', h('span', '', 'font-size:16px;margin-left:4px', '💐'), h('span', 'dk-caret', 'margin-left:3px')]),
    h('div', '', `position:absolute;left:${W - 60}px;top:28px;width:40px;height:40px;border-radius:12px;background:#3356FF;display:grid;place-items:center`, icon('Send|Bold', 'width:22px;height:22px;color:#fff'))]);
  el.append(comp, statusBarFor(W));
  return el;
};
const statusBarFor = (W) => { const e = h('div', '', `position:absolute;left:0;top:0;width:${W}px;height:47px;background:#fff;z-index:30`); const b = ipadBar(h('div', 'scr375', null, h('div', 'sbar'))).firstChild; b.style.width = W + 'px'; b.lastChild.style.left = W - 85 + 'px'; e.append(b); return e; };
/* profile: the business numbers live inside the sheet on iPad */
TS.profileMulti = (W, H) => {
  const el = MS.profileMulti().el;
  const sh = [...el.children].find(c => c.style.borderRadius && c.style.borderRadius.startsWith('14px'));
  const CHEV = '<svg viewBox="0 0 24 24"><path d="M9.5 5.5 16 12l-6.5 6.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  sh.append(P('left:16px;top:252px;font:600 14.5px/22px var(--sf)', 'Business Numbers · 2'));
  [['🐣', '+1 (971) 555-1212', 'Bob’s Fried Chicken Shack'], ['🍔', '+1 (971) 555-1414', 'Bob’s Burger Shack']].forEach(([e, n, s], i) =>
    sh.append(P(`left:16px;top:${286 + i * 90}px;width:343px;height:78px;border-radius:22px;border:1px solid #DFE1F8;background:#fff`, [
      P('left:15px;top:18px;width:42px;height:42px;border-radius:15px;background:#EFF0FE;display:grid;place-items:center;font-size:22px;line-height:1', e),
      P('left:70px;top:14px;font:600 16px/24px var(--sf);white-space:nowrap', n), P('left:70px;top:40px;font:400 14px/20px var(--sf);color:#444658;white-space:nowrap', s),
      svg(CHEV, 'position:absolute;left:303px;top:27px;width:24px;height:24px;color:#444658')])));
  const rows = [...sh.children].filter(c => c.style.height === '89px');
  rows.forEach((r, i) => r.style.top = 476 + i * 89 + 'px');
  const ROW = (top, ic, a, b, color) => P(`left:16px;top:${top}px;width:343px;height:89px`, [icon(ic, `position:absolute;left:0;top:30px;width:24px;height:24px;color:${color || '#171A2B'}`),
    P(`left:32.5px;top:17px;font:600 14px/22px var(--sf);white-space:nowrap;color:${color || '#171A2B'}`, a), b ? P('left:32.5px;top:41px;font:400 14px/20px var(--sf);color:#444658;white-space:nowrap', b) : '',
    svg(CHEV, 'position:absolute;left:319px;top:30px;width:24px;height:24px;color:#444658'), P('left:0;width:343px;top:89px;height:1px;background:#E3E4F6')]);
  sh.append(ROW(654, 'Settings|Light', 'Preferences', 'Productivity & settings'), ROW(743, 'Question / Help|Light', 'Contact Support', 'Help center, chat & email'));
  return W_(el, W, H);
};

window.TS = TS;
})();

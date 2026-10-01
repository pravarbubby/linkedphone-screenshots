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
TS.liveDark = (W, H) => { const el = W_(MS.liveDark().el, W, H, { center: '.cl-btn,.cl-big' }); const d = H - 812;
  [...el.children].forEach(c => { const t = parseFloat(c.style.top); if (t > 200) c.style.top = t + d * .45 + 'px'; }); return el; };
TS.liveLight = (W, H) => { const el = W_(MS.liveLight().el, W, H, { center: '.cl-btn,.cl-big' }); const d = H - 812;
  vshift(el, '.cl-big,.cl-cname,.cl-timer-row', d * .3); vshift(el, '.cl-btn', d * .75); return el; };
TS.inbox = (W, H) => W_(MS.inbox().el, W, H);
TS.tickets = (W, H) => W_(MS.tickets().el, W, H);
TS.team = (W, H) => W_(MS.team().el, W, H);
TS.receptionist = (W, H) => W_(MS.receptionist().el, W, H);
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
  return W_(el, W, H);
};

/* texting: no phone keyboard on iPad — conversation sits above the composer */
TS.texting = (W, H) => {
  const s = MS.texting(); const el = s.el;
  el.querySelectorAll('.ms-kb').forEach(n => n.remove());
  const root = [...el.children];
  root.filter(c => parseFloat(c.style.top) === 500 && c.style.background.includes('208')).forEach(n => n.remove());
  W_(el, W, H);
  const kids = [...el.children];
  const top = (c) => parseFloat(c.style.top);
  const composer = kids.filter(c => top(c) >= 400 && top(c) < 500);
  composer.forEach(c => { c.style.top = top(c) + (H - 500) + 'px'; if (c.style.border.includes('1.5px')) c.style.width = W - 49 - 58 + 'px'; });
  const bubble = kids.filter(c => top(c) >= 60 && top(c) < 270 && !c.style.zIndex);
  const dy = H - 95 - 26 - 288 - 84;
  bubble.forEach(c => c.style.top = top(c) + dy + 'px');
  const pill = kids.find(c => c.textContent === 'Oct 1, 2026'); if (pill) { pill.style.top = 60 + dy - 36 + 'px'; pill.style.left = (W - 100) / 2 + 'px'; }
  const outTop = 60 + dy - 36 - 30 - 96;
  el.append(P(`left:16px;top:${outTop - 22 - 96}px;width:300px;border-radius:16px;background:#F0F0F0;padding:12px 12px 10px`, [
    h('div', null, 'font:400 16px/22px var(--sf);letter-spacing:-.1px', 'Hi! Do you deliver to Brooklyn Heights? I’d love a few potted arrangements.'),
    h('div', null, 'margin-top:8px;font:400 14.5px/20px var(--sf);color:#5C5D71', 'Richard · 4:12 pm')]));
  el.append(P(`right:16px;top:${outTop}px;width:300px;border-radius:16px;background:#DFE1F8;padding:12px 12px 10px`, [
    h('div', null, 'font:400 16px/22px var(--sf);letter-spacing:-.1px', 'Yes! We deliver across Brooklyn every day. Send us a photo of what you like.'),
    h('div', null, 'margin-top:8px;display:flex;align-items:center;gap:7px;font:400 14.5px/20px var(--sf);color:#5C5D71', [h('div', null, `width:18px;height:18px;border-radius:50%;background:${img('jesse')} center/cover`), 'Jesse · 4:20 pm'])]));
  return el;
};

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

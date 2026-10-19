/* Onboarding — replicas of refs "Start Screen", "Select a Business Number" (+ "-1"), "Choose Your Team Size",
   "Review Your Plan", "Business Number Success". All 1× refs (375×812). Class prefix .ob- */
(() => {
const { h, icon, svg, statusBar } = UI;

const CSS = `
.ob-abs { position: absolute; }
.ob-txt { position: absolute; left: 0; width: 375px; text-align: center; white-space: nowrap; }
.ob-logo { position: absolute; left: 107px; top: 74.5px; width: 160px; height: 23px; }
.ob-logo svg { display: block; }
.ob-photo { position: absolute; left: 16px; top: 122px; width: 343px; height: 350px; border-radius: 16px; overflow: hidden;
  background: #ddd url(assets/photos/splash.jpg) no-repeat; }
.ob-pdots { position: absolute; top: 492px; left: 145px; display: flex; gap: 8px; }
.ob-pdots i { display: block; width: 8px; height: 8px; border-radius: 4px; background: var(--g90); }
.ob-pdots i.on { width: 36px; background: var(--ink); }
.ob-btn { position: absolute; left: 16px; width: 343px; height: 56px; border-radius: 16px; background: var(--blue); color: #fff;
  display: flex; align-items: center; justify-content: center; gap: 8px; font: 500 16.3px/1 var(--sf); letter-spacing: -.1px; }
.ob-btn .ic { width: 20px; height: 20px; color: #fff; }
.ob-nav { position: absolute; left: 0; top: 47px; width: 375px; height: 64px; background: #fff; z-index: 20; }
.ob-steps { position: absolute; top: 31px; left: 153px; display: flex; gap: 8px; }
.ob-steps i { display: block; width: 8px; height: 8px; border-radius: 4px; background: var(--g90); }
.ob-steps i.on { width: 36px; background: var(--blue); }
.ob-h1 { font: 700 20px/28px var(--sf); color: var(--ink); letter-spacing: .1px; }
.ob-sub { font: 400 14px/20px var(--sf); color: var(--g30); }
.ob-field { position: absolute; left: 16px; top: 226px; width: 343px; height: 48px; border: 1px solid var(--blue); border-radius: 12px;
  overflow: hidden; background: #fff; z-index: 5; }
.ob-cc { position: absolute; left: 0; top: 0; width: 72px; height: 46px; background: var(--g95); border-right: 1px solid var(--g90); }
.ob-flag { position: absolute; left: 11px; top: 11px; font: 400 22px/24px var(--sf); }
.ob-q { position: absolute; left: 82px; top: 0; height: 46px; display: flex; align-items: center; font: 400 16.4px/1 var(--sf); color: var(--ink); letter-spacing: -.1px; white-space: nowrap; }
.ob-q .ph { color: var(--g60); }
.ob-q .pre { color: var(--g40); }
.ob-caret { display: inline-block; width: 2px; height: 20px; background: var(--blue); border-radius: 1px; margin-left: 1px; }
.ob-clear { position: absolute; right: 13px; top: 16px; width: 16px; height: 14px; border-radius: 4px; background: var(--g40); display: grid; place-items: center; }
.ob-list { position: absolute; left: 0; top: 286px; width: 375px; }
.ob-row { position: relative; height: 56px; display: flex; align-items: center; padding: 0 16px; font: 500 14.2px/1 var(--sf); color: var(--ink); letter-spacing: 0; }
.ob-radio { position: absolute; right: 16px; top: 16px; width: 24px; height: 24px; border-radius: 50%; border: 1.2px solid var(--ink); }
.ob-radio.on { border: 1px solid var(--blue); }
.ob-radio.on::after { content: ""; position: absolute; left: 2px; top: 2px; width: 18px; height: 18px; border-radius: 50%; background: var(--blue); }
.ob-sbar { position: absolute; left: 367px; top: 270px; width: 7px; height: 125px; border-radius: 4px; background: var(--g90); z-index: 6; }
.ob-kb { position: absolute; left: 0; top: 476px; width: 375px; height: 336px; background: url(assets/keyboard-done.png) 0 0 / 375px 336px no-repeat; z-index: 50; }
.ob-foot { position: absolute; left: 0; width: 375px; height: 200px; background: #fff; z-index: 8; }
.ob-box { position: absolute; top: 210px; height: 67px; border: 1px solid var(--g90); border-radius: 20px; background: #fff;
  box-shadow: 0 2px 6px rgba(51,86,255,.06); display: grid; place-items: center; }
.ob-box .ic { width: 26px; height: 26px; color: var(--blue); }
.ob-count { font: 700 36px/1 var(--sf); color: var(--ink); }
.ob-dash { position: absolute; left: 16px; width: 343px; height: 1px;
  background: repeating-linear-gradient(90deg, var(--g95) 0 4px, transparent 4px 8px); }
.ob-total { position: absolute; left: 16px; width: 343px; border-radius: 24px; background: var(--g95); }
.ob-total .lbl { position: absolute; left: 0; width: 100%; text-align: center; font: 600 16.4px/22px var(--sf); color: var(--g30); }
.ob-total .amt { position: absolute; left: 0; width: 100%; text-align: center; font: 800 37px/48px var(--sf); color: var(--blue); letter-spacing: .2px; }
.ob-total .amt small { font: 700 15px/1 var(--sf); letter-spacing: 0; }
.ob-details { position: absolute; left: 16px; top: 166px; width: 343px; height: 227px; border: 1px solid var(--g90); border-radius: 20px;
  background: #fff; box-shadow: 0 2px 8px rgba(23,26,43,.05); }
.ob-drow { position: absolute; left: 16px; right: 16px; }
.ob-drow .l { font: 400 15px/20px var(--sf); color: var(--g30); }
.ob-drow .v { font: 600 17px/22px var(--sf); color: var(--ink); margin-top: 3px; }
.ob-drow .ic { position: absolute; right: 0; top: 11px; width: 24px; height: 24px; color: var(--ink); }
.ob-ddash { position: absolute; left: 16px; right: 16px; height: 1px; background: repeating-linear-gradient(90deg, var(--g90) 0 4px, transparent 4px 8px); }
.ob-legal { position: absolute; left: 16px; width: 343px; font: 400 11px/13.14px var(--sf); color: var(--g30); white-space: nowrap; }
.ob-legal a { color: var(--blue); text-decoration: none; }
.ob-halo { position: absolute; left: 107px; top: 189.5px; width: 162px; height: 162px; border-radius: 50%; background: var(--g95); }
.ob-check { position: absolute; left: 138px; top: 220.5px; width: 100px; height: 100px; border-radius: 50%; background: var(--blue); }
.ob-check svg { position: absolute; left: 0; top: 0; width: 100px; height: 100px; }
.ob-ray { position: absolute; width: 27px; height: 8px; border-radius: 4px; transform-origin: 50% 50%; }
.ob-numcard { position: absolute; left: 16px; top: 525px; width: 343px; height: 97px; border-radius: 24px; background: var(--g95); }
`;
if (!document.getElementById('ob-css')) { const s = document.createElement('style'); s.id = 'ob-css'; s.textContent = CSS; document.head.append(s); }

// SF Pro metrics: place a text box so its cap-top lands at y (content-area centred in line box)
const capTop = (y, f, lh) => y - (lh - 1.193 * f) / 2 - 0.157 * f;
const txt = (cls, y, f, lh, content, style = '') => {
  const e = h('div', cls, `top:${capTop(y, f, lh).toFixed(2)}px;${style}`);
  (Array.isArray(content) ? content : [content]).forEach(c => typeof c === 'string' ? e.insertAdjacentHTML('beforeend', c) : e.append(c));
  return e;
};
const homebar = () => h('div', 'homebar');
const WORDMARK = '<svg viewBox="0 0 527 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M38.2016 61.7984H30.4208C26.1236 61.7985 22.64 65.282 22.64 69.5792C22.64 73.8764 26.1236 77.36 30.4208 77.36C34.718 77.36 38.2015 73.8764 38.2016 69.5792V61.7984ZM77.36 37.8992C77.36 29.4718 70.5282 22.64 62.1008 22.64C53.6734 22.64 46.8416 29.4718 46.8416 37.8992V53.1584H62.1008C70.5282 53.1584 77.36 46.3266 77.36 37.8992ZM86 37.8992C86 51.0983 75.2999 61.7984 62.1008 61.7984H46.8416V69.5792C46.8415 78.6482 39.4897 86 30.4208 86C21.3518 86 14 78.6481 14 69.5792C14 60.5103 21.3518 53.1585 30.4208 53.1584H38.2016V37.8992C38.2016 24.7001 48.9017 14 62.1008 14C75.2999 14 86 24.7001 86 37.8992Z" fill="#3356FF"/><path d="M113.875 73V27.9062H121.938V66.2188H142.625V73H113.875ZM154.5 33.125C151.938 33.125 149.844 31.0938 149.844 28.5312C149.844 26 151.938 23.9375 154.5 23.9375C157.031 23.9375 159.125 26 159.125 28.5312C159.125 31.0938 157.031 33.125 154.5 33.125ZM150.594 73V38.8438H158.375V73H150.594ZM167.938 73V38.8438H175.719V44.0625H176.25C177.875 40.4062 181.156 38.1875 186.094 38.1875C193.719 38.1875 197.875 42.7812 197.875 50.9062V73H190.094V52.7188C190.094 47.4062 187.938 44.7188 183.219 44.7188C178.594 44.7188 175.719 47.9688 175.719 53.0938V73H167.938ZM207.375 73V25.625H215.156V52.8438H215.688L228.281 38.8438H237.281L223.531 53.2812L238.219 73H228.844L217.875 58.2188L215.156 61V73H207.375ZM256.938 73.6875C246.781 73.6875 240.625 66.875 240.625 56V55.9688C240.625 45.2188 246.844 38.1875 256.562 38.1875C266.281 38.1875 272.281 45 272.281 55.3125V57.875H248.406C248.5 64 251.812 67.5625 257.094 67.5625C261.312 67.5625 263.719 65.4375 264.469 63.875L264.562 63.6562H271.969L271.875 63.9375C270.781 68.3438 266.219 73.6875 256.938 73.6875ZM256.656 44.2812C252.312 44.2812 249.062 47.2188 248.469 52.6562H264.688C264.156 47.0625 261 44.2812 256.656 44.2812ZM292.375 73.5625C283.812 73.5625 278.375 66.7812 278.375 55.9688V55.9062C278.375 45.0312 283.719 38.2812 292.375 38.2812C297.062 38.2812 300.969 40.5938 302.75 44.2812H303.281V25.625H311.094V73H303.281V67.6562H302.75C300.875 71.375 297.188 73.5625 292.375 73.5625ZM294.812 67C300.125 67 303.406 62.8125 303.406 55.9688V55.9062C303.406 49.0625 300.094 44.8438 294.812 44.8438C289.531 44.8438 286.281 49.0312 286.281 55.9062V55.9688C286.281 62.8438 289.5 67 294.812 67ZM321.688 73V27.9062H339.688C348.844 27.9062 355.031 33.9375 355.031 42.9688V43.0312C355.031 52.0312 348.844 58.0938 339.688 58.0938H329.75V73H321.688ZM337.719 34.5H329.75V51.5938H337.719C343.5 51.5938 346.875 48.4688 346.875 43.0625V43C346.875 37.5938 343.5 34.5 337.719 34.5ZM363.438 73V25.625H371.219V44.0625H371.75C373.375 40.4062 376.656 38.1875 381.594 38.1875C389.219 38.1875 393.375 42.7812 393.375 50.9062V73H385.594V52.7188C385.594 47.4062 383.438 44.7188 378.719 44.7188C374.094 44.7188 371.219 47.9688 371.219 53.0938V73H363.438ZM417.312 73.6875C407.062 73.6875 400.875 67 400.875 55.9375V55.875C400.875 44.9062 407.156 38.1875 417.312 38.1875C427.5 38.1875 433.750 44.875 433.75 55.875V55.9375C433.75 67 427.531 73.6875 417.312 73.6875ZM417.312 67.375C422.719 67.375 425.781 63.1562 425.781 55.9688V55.9062C425.781 48.7188 422.688 44.4688 417.312 44.4688C411.906 44.4688 408.812 48.7188 408.812 55.9062V55.9688C408.812 63.1562 411.906 67.375 417.312 67.375ZM441.562 73V38.8438H449.344V44.0625H449.875C451.5 40.4062 454.781 38.1875 459.719 38.1875C467.344 38.1875 471.5 42.7812 471.5 50.9062V73H463.719V52.7188C463.719 47.4062 461.562 44.7188 456.844 44.7188C452.219 44.7188 449.344 47.9688 449.344 53.0938V73H441.562ZM495.312 73.6875C485.156 73.6875 479 66.875 479 56V55.9688C479 45.2188 485.219 38.1875 494.938 38.1875C504.656 38.1875 510.656 45 510.656 55.3125V57.875H486.781C486.875 64 490.188 67.5625 495.469 67.5625C499.688 67.5625 502.094 65.4375 502.844 63.875L502.938 63.6562H510.344L510.25 63.9375C509.156 68.3438 504.594 73.6875 495.312 73.6875ZM495.031 44.2812C490.688 44.2812 487.438 47.2188 486.844 52.6562H503.062C502.531 47.0625 499.375 44.2812 495.031 44.2812Z" fill="#171A2B"/></svg>';
// ref wordmark: mark 22.5pt at (107,74.5); lettering cap-L 15.5pt tall, x 136–267 (slightly tighter than brand svg)
const MARK_D = WORDMARK.match(/d="([^"]+)"/g)[0].slice(3, -1), TEXT_D = WORDMARK.match(/d="([^"]+)"/g)[1].slice(3, -1);
const logo = () => {
  const e = h('div', 'ob-logo');
  e.innerHTML = `<svg viewBox="14 14 72 72" style="position:absolute;left:-.5px;top:-.5px;width:23.5px;height:23.5px"><path d="${MARK_D}" fill="#3356FF"/></svg>`
    + `<svg viewBox="113.875 23.9 396.8 49.8" preserveAspectRatio="none" style="position:absolute;left:29px;top:2.1px;width:131px;height:17.13px"><path d="${TEXT_D}" fill="#171A2B"/></svg>`;
  return e;
};
const chevR = (style) => icon('Right Arrow 2|Light', style);
const button = (label, top, chevron) => h('div', 'ob-btn', `top:${top}px` + (chevron ? ';padding-right:8px;gap:9px' : ''), chevron ? [label, chevR('width:22px;height:22px;margin-right:-6px')] : [label]);
const navBar = (steps, opts = {}) => {
  const n = h('div', 'ob-nav');
  if (opts.close) n.append(icon('Close|Light', 'position:absolute;left:16px;top:23px;width:24px;height:24px'));
  else n.append(chevR('position:absolute;left:16px;top:23px;width:24px;height:24px;transform:scaleX(-1)'));
  if (steps) n.append(h('div', 'ob-steps', null, steps.map(on => h('i', on ? 'on' : null))));
  if (opts.title) n.append(txt('ob-txt', 73 - 47, 20, 24, opts.title, 'font:700 20px/24px var(--sf);color:var(--ink)'));
  if (!opts.close) n.append(icon('Info|Light', 'position:absolute;right:17px;top:24px;width:22px;height:22px'));
  return n;
};
window.SCREENS = window.SCREENS || {};

/* 1 ─ Start screen */
SCREENS.start = () => {
  const el = h('div', 'scr375');
  const photo = h('div', 'ob-photo', 'background-size:350px 350px;background-position:-4px 0');
  const title = txt('ob-txt', 524, 28.6, 33, 'Streamlined Business<br>Communications', 'font:700 28.6px/33px var(--sf);letter-spacing:.2px;color:var(--ink)');
  const sub = txt('ob-txt ob-sub', 602, 14, 20, 'Chats, calls, contacts, &amp; customer service tickets in<br>one place.');
  const btn = button('Get Started Free', 666);
  const signIn = txt('ob-txt', 754, 14, 20, 'Already with LinkedPhone? <b style="color:var(--blue);font-weight:600">Sign In</b>', 'font:400 14px/20px var(--sf);color:var(--ink)');
  const dots = h('div', 'ob-pdots', null, [h('i', 'on'), h('i'), h('i'), h('i')]);
  el.append(statusBar(), logo(), photo, dots, title, sub, btn, signIn, homebar());
  return { el, parts: { button: btn, photo, title, subtitle: sub, dots, signIn } };
};

/* 2 ─ Select a Business Number: state({typed, selected, keyboard}) */
const CITIES = ['New York (312)', 'Los Angeles (213)', 'Chicago (312)', 'Houston (713)', 'Phoenix (602)', 'Philadelphia (215)', 'San Antonio (210)', 'San Diego (619)'];
const NUMBERS = [1234, 1235, 1236, 1237, 1238, 1239, 1240, 1241, 1242].map(n => '+1 (312) 555-' + n);
SCREENS.selectNumber = (variant) => {
  const el = h('div', 'scr375');
  const title = txt('ob-txt ob-h1', 131, 20, 28, 'Select a Business Number');
  const sub = txt('ob-txt ob-sub', 166, 14, 20, 'Search by area code, state, or province.<br>Toll-free (8xx) numbers +$5/mo.');
  const field = h('div', 'ob-field');
  const q = h('div', 'ob-q');
  const clear = h('div', 'ob-clear', null, icon('Close|Bold', 'width:10px;height:10px;color:#fff'));
  field.append(h('div', 'ob-cc', null, [h('div', 'ob-flag', null, '🇺🇸'), icon('Down|Light', 'position:absolute;left:39.5px;top:14px;width:19px;height:19px;color:var(--g40)')]), q, clear);
  const cityList = h('div', 'ob-list'), numList = h('div', 'ob-list');
  const mkRow = (label) => h('div', 'ob-row', null, [label, h('div', 'ob-radio')]);
  const cityRows = CITIES.map(c => { const r = mkRow(c); cityList.append(r); return r; });
  const numRows = NUMBERS.map(c => { const r = mkRow(c); numList.append(r); return r; });
  const foot = h('div', 'ob-foot');
  const btn = button('Get This number', 16, true);
  foot.append(btn);
  const kb = h('div', 'ob-kb');
  el.append(statusBar(), navBar([1, 0, 0]), title, sub, cityList, numList, h('div', 'ob-sbar'), field, foot, homebar(), kb);
  const parts = { field, rows: cityRows, cityRows, numRows, button: btn, keyboard: kb, footer: foot, query: q };
  const state = (s = {}) => {
    const typed = Math.max(0, Math.min(3, Math.round(s.typed ?? 0)));
    const sel = s.selected ?? -1, k = Math.max(0, Math.min(1, s.keyboard ?? 1));
    const results = typed >= 3;
    q.innerHTML = '';
    if (results && sel >= 0) q.append(h('span', 'pre', null, '+1 '), NUMBERS[sel].slice(3));
    else if (typed > 0) q.append('312'.slice(0, typed));
    q.append(h('span', 'ob-caret', typed || sel >= 0 ? '' : 'margin:0 0 0 -1px'));
    if (!typed && sel < 0) q.append(h('span', 'ph', 'margin-left:-2px', 'Area code, state, province'));
    clear.style.display = typed ? '' : 'none';
    cityList.style.display = results ? 'none' : '';
    numList.style.display = results ? '' : 'none';
    parts.rows = results ? numRows : cityRows;
    numRows.forEach((r, i) => r.lastChild.className = 'ob-radio' + (results && i === sel ? ' on' : ''));
    kb.style.transform = `translateY(${((1 - k) * 336).toFixed(2)}px)`;
    const btnTop = 726 - k * (726 - 408);
    foot.style.top = (btnTop - 16) + 'px';
    foot.style.display = results && sel >= 0 ? '' : 'none';
  };
  const v0 = variant === 'results' ? { typed: 3, selected: 2, keyboard: 0 } : { typed: 0, selected: -1, keyboard: 1 };
  state(v0);
  return { el, parts, state: (s) => state({ ...v0, ...s }) };
};

/* 3 ─ Choose Your Team Size: state({count}) */
SCREENS.teamSize = () => {
  const el = h('div', 'scr375');
  const title = txt('ob-txt ob-h1', 131, 20, 28, 'Choose Your Team Size');
  const sub = txt('ob-txt ob-sub', 166, 14, 20, 'How many team members need access?');
  const minus = h('div', 'ob-box', 'left:16px;width:67px', svg('<svg viewBox="0 0 26 26"><path d="M3.8 13h18.4" stroke="#3356FF" stroke-width="2.8" stroke-linecap="round"/></svg>'));
  const count = h('div', 'ob-count', null, '1');
  const mid = h('div', 'ob-box', 'left:92px;width:191px', count);
  const plus = h('div', 'ob-box', 'left:292px;width:67px', svg('<svg viewBox="0 0 26 26"><path d="M3.8 13h18.4M13 3.8v18.4" stroke="#3356FF" stroke-width="2.8" stroke-linecap="round"/></svg>'));
  const note = txt('ob-txt ob-sub', 298, 14, 20, '<b style="color:var(--ink);font-weight:700">$5/mo</b> per additional member.<br>Change team size anytime even after signup.');
  const card = h('div', 'ob-total', 'top:382px;height:228px');
  const amt = h('span', null, null, '$19.99');
  card.append(txt('lbl', 460 - 382, 16.4, 22, 'Total after 7-day free trial'), txt('amt', 499 - 382, 37, 48, [amt, '<small>/mo</small>']));
  const foot = txt('ob-txt ob-sub', 638, 14, 20, 'Everyone on your plan gets LinkedPhone on Web &amp;<br>Mobile—full feature set.<br><b style="color:var(--blue);font-weight:600;font-size:14px">Learn More</b>');
  const btn = button('Confirm Team Size', 726, true);
  el.append(statusBar(), navBar([0, 1, 0]), title, sub, minus, mid, plus, note, h('div', 'ob-dash', 'top:357px'), card, foot, btn, h('div', 'ob-sbar'), homebar());
  const state = (s = {}) => {
    const n = Math.max(1, Math.round(s.count ?? 1));
    count.textContent = String(n);
    amt.textContent = '$' + (19.99 + 5 * (n - 1)).toFixed(2);
  };
  state({ count: 1 });
  return { el, parts: { minus, plus, count, total: card, amount: amt, button: btn }, state };
};

/* 4 ─ Review Your Plan */
SCREENS.reviewPlan = () => {
  const el = h('div', 'scr375');
  const sub = txt('ob-txt ob-sub', 118, 14, 20, 'Here’s what’s included. You can tweak anything<br>before starting your free trial.');
  const det = h('div', 'ob-details');
  // card-local coordinates: abs y − 167 (card top 166 + 1px border), x − 17
  const T = (y, f, w, c, text) => txt('ob-abs', y - 167, f, 20, text, `left:16px;white-space:nowrap;font:${w} ${f}px/20px var(--sf);color:${c}`);
  const pen = (y) => icon('Edit|Light', `position:absolute;right:16px;top:${y - 167}px;width:24px;height:24px`);
  det.append(
    T(188, 14, 400, 'var(--g30)', 'New business number'), T(212, 16.4, 600, 'var(--ink)', '+1 (312) 555-1236'), pen(194),
    h('div', 'ob-ddash', 'top:78px'),
    T(267, 14, 400, 'var(--g30)', 'Team size'), T(289, 14, 600, 'var(--ink)', '3 members'), pen(271),
    h('div', 'ob-ddash', 'top:152px'),
    T(341, 14, 400, 'var(--g30)', 'Your verified mobile number'), T(363, 14.3, 400, 'var(--ink)', '+1 (312) 532-5486'),
  );
  const totalCard = h('div', 'ob-total', 'top:410px;height:179px');
  totalCard.append(txt('lbl', 464 - 410, 16.4, 22, 'Total after 7-day free trial'), txt('amt', 503 - 410, 37, 48, ['$44.99', '<small>/mo</small>']));
  const btn = button('Start 7-day Free Trial', 606);
  const legal = h('div', 'ob-legal', `top:${capTop(679.6, 11, 13.14)}px`);
  legal.innerHTML = 'Charged to iTunes Account at the end of the free trial period.<br>Subject to LinkedPhone’s <a>Terms of Service</a>, <a>Privacy Policy</a>, &amp;<br><a>Reasonable Use Policy</a>. Subscription automatically renews unless<br>auto-renew is turned off at least 24-hours before the end of the<br>current period. Account will be charged for renew within 24-hours<br>prior to the end of the current period at the price selected above.<br>Manage your subscription and turn off auto-renewal through<br>iTunes Account Settings.';
  el.append(statusBar(), navBar(null, { close: true, title: 'Review Your Plan' }), sub, det, totalCard, btn, legal, homebar());
  return { el, parts: { detailsCard: det, totalCard, button: btn, legal } };
};

/* 5 ─ Business Number Success: state({burst}) 0..1 */
const RAYS = [ // [centre x, centre y, angle deg, colour]
  [61, 264.5, 0, '#A6B5FF'], [314, 264.5, 0, '#A6B5FF'],
  [84.5, 210.5, 45, '#FFAFD8'], [290.5, 313.5, 45, '#FFAFD8'],
  [290.5, 210.5, -45, '#9AD86C'], [84.5, 313.5, -45, '#9AD86C'],
];
const RC = [187.5, 262.5];
SCREENS.numberReady = () => {
  const el = h('div', 'scr375');
  const halo = h('div', 'ob-halo');
  const check = h('div', 'ob-check');
  check.innerHTML = '<svg viewBox="0 0 100 100"><path d="M28.7 51.2 42.7 65.5 71.3 36.8" fill="none" stroke="#fff" stroke-width="8.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const rays = RAYS.map(([x, y, a, c]) => h('div', 'ob-ray', `left:${x - 13.5}px;top:${y - 4}px;background:${c}`));
  const title = txt('ob-txt', 438, 28, 33, 'Your LinkedPhone<br>number is ready!', 'font:800 28px/33px var(--sf);color:var(--ink);letter-spacing:.1px');
  const numberCard = h('div', 'ob-numcard', null, [
    txt('ob-txt', 545 - 525, 14, 16, 'Business Number', 'width:343px;font:400 14px/16px var(--sf);color:var(--g30)'),
    h('div', 'ob-abs', `left:0;width:343px;top:${capTop(580 - 525, 24, 30)}px;display:flex;justify-content:center;align-items:center;gap:8px;font:700 24px/30px var(--sf);color:var(--blue);letter-spacing:.3px`,
      ['+1 (312) 555-1236', icon('Copy|Light', 'width:22px;height:22px;color:var(--blue)')]),
  ]);
  const foot = txt('ob-txt', 658, 14, 20, 'Let’s finish setting up<br>your account and business.', 'font:400 14px/20px var(--sf);color:var(--ink)');
  const btn = button('Continue', 726, true);
  el.append(statusBar(), logo(), halo, ...rays, check, title, numberCard, foot, btn, homebar());
  const state = (s = {}) => {
    const b = Math.max(0, Math.min(1, s.burst ?? 1));
    check.style.transform = `scale(${b})`;
    halo.style.transform = `scale(${Math.min(1, .6 + .4 * b)})`;
    halo.style.opacity = Math.min(1, b * 1.5);
    const r = Math.max(0, (b - .35) / .65); // rays start after the check
    RAYS.forEach(([x, y, a], i) => {
      const dx = (x - RC[0]) * (r - 1) * .35, dy = (y - RC[1]) * (r - 1) * .35;
      rays[i].style.transform = `translate(${dx.toFixed(2)}px,${dy.toFixed(2)}px) rotate(${a}deg) scaleX(${r})`;
      rays[i].style.opacity = r > 0 ? 1 : 0;
    });
  };
  state({ burst: 1 });
  return { el, parts: { check, halo, rays, title, numberCard, button: btn }, state };
};
})();

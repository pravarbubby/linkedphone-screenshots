/* Profile sheet — refs "Single Number" (1×, 375×852) and "Settings - Multiple Numbers" (2×, 375×840 pt).
   SCREENS.profile() → single business number; SCREENS.profile('multi') → two business number cards (carousel). */
(() => {
const { h, icon, svg, statusBar, img } = UI;
const css = `
.pf-bg { position: absolute; left: 0; top: 0; width: 375px; height: 812px; background: #000; }
.pf-peek { position: absolute; left: 16px; top: 54px; width: 343px; height: 20px; border-radius: 10px 10px 0 0; background: #8D8FA5; }
.pf-sheet { position: absolute; left: 0; top: 64px; width: 375px; height: 900px; background: #fff; border-radius: 14px 14px 0 0; overflow: hidden; }
.pf-in { position: absolute; left: 0; top: 0; width: 375px; }
.pf-x { position: absolute; left: 16px; top: 34px; width: 24px; height: 24px; color: var(--ink); }
.pf-logo { position: absolute; left: 327px; top: 30px; width: 32px; height: 32px; }
.pf-card { position: absolute; left: 16px; top: 90px; width: 343px; height: 132px; border-radius: 24px; border: 1px solid #DFE1F8; overflow: hidden;
  background: radial-gradient(171.5px 81px at 0 66px, #DFE1F8, rgba(255,255,255,0)), radial-gradient(171.5px 81px at 343px 66px, #DFE1F8, rgba(255,255,255,0)), #fff; }
.pf-av { position: absolute; left: 16px; top: 16px; width: 100px; height: 100px; border-radius: 50%; border: 4px solid #fff; background-size: cover; background-position: center; background-color: #fff; }
.pf-name { position: absolute; left: 128px; top: 29px; font: 700 20px/28px var(--sf); letter-spacing: 0; color: var(--ink); white-space: nowrap; }
.pf-stat { position: absolute; left: 128px; top: 66px; height: 36px; border-radius: 18px; border: 1px solid #DFE1F8; display: flex; align-items: center; padding: 0 8px 0 10px; gap: 7px; font: 400 14px/1 var(--sf); color: var(--ink);
  background: radial-gradient(119px 36px at 59px 36px, rgba(215,253,183,.75), rgba(255,255,255,.75) 50%, #fff 100%), #fff; }
.pf-dot { width: 10px; height: 10px; border-radius: 50%; background: #4E8526; box-shadow: 0 0 0 2px #fff; flex: none; }
.pf-tog { width: 32px; height: 20px; border-radius: 10px; background: #4E8526; position: relative; margin-left: 3px; flex: none; }
.pf-tog i { position: absolute; left: 14px; top: 2px; width: 16px; height: 16px; border-radius: 50%; background: #fff; }
.pf-chev { position: absolute; width: 24px; height: 24px; color: var(--g30); }
.pf-lbl { position: absolute; left: 16px; top: 245px; font: 600 14px/22px var(--sf); color: var(--ink); white-space: nowrap; }
.pf-pager { position: absolute; right: 16px; top: 252px; display: flex; gap: 8px; }
.pf-pager i { display: block; width: 8px; height: 8px; border-radius: 4px; background: #DFE1F8; }
.pf-pager i.on { width: 24px; background: var(--blue); }
.pf-nums { position: absolute; left: 16px; top: 282px; display: flex; gap: 12px; }
.pf-num { position: relative; flex: none; height: 78px; border-radius: 24px; border: 1px solid #DFE1F8; background: #fff; }
.pf-num .t { position: absolute; left: 15px; top: 18px; width: 40px; height: 40px; border-radius: 16px; background: #EFF0FE; display: grid; place-items: center; font-size: 22px; line-height: 1; }
.pf-num .n { position: absolute; left: 67px; top: 14px; font: 600 16.3px/24px var(--sf); letter-spacing: 0; color: var(--ink); white-space: nowrap; }
.pf-num .s { position: absolute; left: 67px; top: 40px; font: 400 14px/20px var(--sf); color: var(--g30); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.pf-rows { position: absolute; left: 0; top: 376px; width: 375px; }
.pf-row { position: relative; height: 84px; margin: 0 16px; border-bottom: 1px solid #EFF0FE; }
.pf-row .ri { position: absolute; left: 0; top: 30px; width: 24px; height: 24px; color: var(--blue); }
.pf-row .a { position: absolute; left: 36px; top: 19px; font: 600 14px/22px var(--sf); color: var(--ink); white-space: nowrap; }
.pf-row .b { position: absolute; left: 36px; top: 43px; font: 400 14px/20px var(--sf); color: var(--g30); white-space: nowrap; }
.pf-row .pf-chev { right: 0; top: 30px; }
.pf-out { position: relative; height: 66px; margin: 0 16px; }
.pf-out .ri { position: absolute; left: 0; top: 21px; width: 24px; height: 24px; color: #AC3322; }
.pf-out .a { position: absolute; left: 36px; top: 22px; font: 600 14px/22px var(--sf); color: #AC3322; }

.pf-root .sbar .ic { color: #fff; }
`;
if (!document.getElementById('pf-style')) { const st = document.createElement('style'); st.id = 'pf-style'; st.textContent = css; document.head.append(st); }

const LOGO = '<svg viewBox="0 0 100 100"><path d="M38.2016 61.7984H30.4208C26.1236 61.7985 22.64 65.282 22.64 69.5792C22.64 73.8764 26.1236 77.36 30.4208 77.36C34.718 77.36 38.2015 73.8764 38.2016 69.5792V61.7984ZM77.36 37.8992C77.36 29.4718 70.5282 22.64 62.1008 22.64C53.6734 22.64 46.8416 29.4718 46.8416 37.8992V53.1584H62.1008C70.5282 53.1584 77.36 46.3266 77.36 37.8992ZM86 37.8992C86 51.0983 75.2999 61.7984 62.1008 61.7984H46.8416V69.5792C46.8415 78.6482 39.4897 86 30.4208 86C21.3518 86 14 78.6481 14 69.5792C14 60.5103 21.3518 53.1585 30.4208 53.1584H38.2016V37.8992C38.2016 24.7001 48.9017 14 62.1008 14C75.2999 14 86 24.7001 86 37.8992Z" fill="#3356FF"/></svg>';
const CHEV = '<svg viewBox="0 0 24 24"><path d="M9.5 5.5 16 12l-6.5 6.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const BAG = '<svg viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><path d="M8.5 7.5V6.2c0-1.2 1-2.2 2.2-2.2h2.6c1.2 0 2.2 1 2.2 2.2v1.3"/><rect x="3" y="7.5" width="18" height="13" rx="5"/><path d="M3.3 12.5c2.8 1.3 5.7 2 8.7 2s5.9-.7 8.7-2"/><path d="M12 13.3v2.2" stroke-linecap="round"/></g></svg>';
const SHIELD = '<svg viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><path d="M12 2.8 4.5 5.6v5.7c0 4.6 3.1 8.4 7.5 9.9 4.4-1.5 7.5-5.3 7.5-9.9V5.6Z"/><circle cx="12" cy="10.3" r="2.6"/><path d="M7.6 17.4c1-1.9 2.6-2.9 4.4-2.9s3.4 1 4.4 2.9" stroke-linecap="round"/></g></svg>';
const chev = (st) => { const e = svg(CHEV, st); e.classList.add('pf-chev'); return e; };

const NUMS = [
  { e: '🐣', n: '+1 (971) 555-1212', s: 'Bob’s Fried Chicken Shack' },
  { e: '🍔', n: '+1 (971) 555-1414', s: 'Bob’s Burger Shack' },
];

window.SCREENS = window.SCREENS || {};
SCREENS.profile = (variant) => {
  const multi = variant === 'multi';
  const el = h('div', 'scr375 pf-root');
  el.append(h('div', 'pf-bg'), h('div', 'pf-peek'));
  const sheet = h('div', 'pf-sheet');
  const inn = h('div', 'pf-in');
  const close = icon('Close|Light'); close.classList.add('pf-x');
  const logo = svg(LOGO); logo.classList.add('pf-logo');
  inn.append(close, logo);
  const toggle = h('div', 'pf-tog', null, h('i'));
  const status = h('div', 'pf-stat', null, [h('div', 'pf-dot'), multi ? 'Online' : 'Available', toggle]);
  const profileCard = h('div', 'pf-card', null, [
    h('div', 'pf-av', { backgroundImage: img('bob') }),
    h('div', 'pf-name', null, 'Bob Hart'), status, chev('right:16px;top:54px'),
  ]);
  inn.append(profileCard);
  inn.append(h('div', 'pf-lbl', null, multi ? 'Business Numbers · 2' : 'Business Number'));
  if (multi) inn.append(h('div', 'pf-pager', null, [h('i', 'on'), h('i')]));
  const wrap = h('div', 'pf-nums');
  const numbers = (multi ? NUMS : NUMS.slice(0, 1)).map((x, i) => {
    const w = multi ? (i ? 272 : 266) : 343;
    const c = h('div', 'pf-num', { width: w + 'px' }, [h('div', 't', null, x.e), h('div', 'n', null, x.n), h('div', 's', { width: w - 67 - 46 + 'px' }, x.s), chev('right:16px;top:27px')]);
    if (multi && i) c.querySelector('.pf-chev').style.right = '16px';
    wrap.append(c); return c;
  });
  inn.append(wrap);
  const rl = h('div', 'pf-rows');
  const ROWS = [[icon('Group|Light'), 'Team', '4 members'], [svg(BAG), 'Business Settings', 'Recording, messaging, controls'],
    [icon('Settings|Light'), 'App Preferences', 'Notifications, appearance, connectivity'], [svg(SHIELD), 'Account & Support', 'Billing, security, help, resources']];
  const rows = ROWS.map(([ic, a, b]) => { ic.classList.add('ri'); const r = h('div', 'pf-row', null, [ic, h('div', 'a', null, a), h('div', 'b', null, b), chev()]); rl.append(r); return r; });
  const so = icon('Signout / Logout|Light'); so.classList.add('ri');
  const signOut = h('div', 'pf-out', null, [so, h('div', 'a', null, 'Sign Out')]);
  rl.append(signOut); rows.push(signOut);
  inn.append(rl);
  sheet.append(inn);
  el.append(sheet, statusBar(true));
  const scrollMax = 60;
  return {
    el, parts: { profileCard, status, toggle, numbers, numbersTrack: wrap, rows, signOut, close },
    scrollMax,
    scroll(y) { inn.style.transform = `translateY(${-Math.max(0, Math.min(scrollMax, y))}px)`; },
    state(o = {}) { if (o.carousel != null && multi) wrap.style.transform = `translateX(${-o.carousel * 284}px)`; },
  };
};
})();

/* Google Play phone set — 1440×2880. Each iPhone composition re-framed as an Android phone
   (uniform bezel, Material status bar) on the same background. */
(() => {
const { h, svg } = UI;
const { slide } = STORE;
const SIG = '<svg viewBox="0 0 16 16"><path d="M15 1v14H1Z" fill="currentColor"/></svg>';
const WIFI = '<svg viewBox="0 0 24 24"><path d="M12 20.5 1 8.6A16 16 0 0 1 12 4.3a16 16 0 0 1 11 4.3Z" fill="currentColor"/></svg>';
const BATT = '<svg viewBox="0 0 12 20"><rect x="3.5" y="0" width="5" height="2" rx=".6" fill="currentColor"/><rect x="0" y="1.6" width="12" height="18.4" rx="2" fill="currentColor"/></svg>';
function androidStatus(dark) {
  const c = dark ? '#fff' : '#171A2B';
  return h('div', 'sbar', `background:${dark ? 'transparent' : '#fff'};color:${c}`, [
    h('div', '', `position:absolute;left:26px;top:15px;font:500 15px/18px "InterV", var(--sf);letter-spacing:.2px;color:${c}`, '9:41'),
    h('div', '', `position:absolute;right:24px;top:16px;display:flex;gap:6px;align-items:center;color:${c}`, [svg(WIFI, `width:16px;height:16px;color:${c}`), svg(SIG, `width:14px;height:14px;color:${c}`), svg(BATT, `width:9px;height:15px;color:${c}`)]),
  ]);
}
function androidize(e) {
  e.querySelectorAll('.dev').forEach(d => {
    const bz = d.querySelector(':scope > .bezel'); if (!bz) return;
    const sc = d.querySelector(':scope > .screen');
    const s = d.screenOrigin ? d.screenOrigin[2] : 2.4667;
    bz.style.borderRadius = parseFloat(sc.style.borderRadius) * .62 + parseFloat(sc.style.left) + 'px';
    bz.style.background = '#1B1D24'; bz.style.boxShadow = 'inset 0 0 0 3px #3A3D48';
    sc.style.borderRadius = parseFloat(sc.style.borderRadius) * .62 + 'px';
    sc.querySelectorAll('.sbar').forEach(sb => {
      const dark = sb.classList.contains('dark') || getComputedStyle(sb).color === 'rgb(255, 255, 255)' || sb.style.background === 'transparent' || !!sb.closest('.cl-top') || !!sb.closest('.pf-root');
      sb.replaceWith(androidStatus(dark));
    });
    const scr = sc.querySelector('.scr');
    scr.append(h('div', '', 'position:absolute;left:142px;bottom:7px;width:91px;height:4px;border-radius:2px;background:#171A2B;opacity:.85;z-index:60'));
  });
  e.querySelectorAll('.homebar').forEach(n => n.remove());
}
for (let n = 1; n <= 10; n++) {
  const src = STORE.ios[n];
  STORE.android[n] = { title: src.title, build() {
    const e = slide('android', n === 1 ? 'bg-hero' : 'bg-std');
    const inner = src.build();
    inner.querySelector(':scope > .bg').remove();
    inner.style.background = 'transparent';
    const k = 2880 / 2796;
    inner.style.cssText += `;position:absolute;left:${(1440 - 1290 * k) / 2}px;top:0;transform:scale(${k});transform-origin:0 0;overflow:visible`;
    androidize(inner);
    e.append(inner);
    return e;
  } };
}
/* Android small — 900×1600: the Android phone slides scaled down proportionally to fit the height, centred */
for (let n = 1; n <= 10; n++) {
  STORE.androidS[n] = { title: STORE.android[n].title, build() {
    const e = slide('androidS', n === 1 ? 'bg-hero' : 'bg-std');
    const src = STORE.android[n].build();
    src.querySelector(':scope > .bg').remove();
    const k = 1600 / 2880;
    src.style.cssText += `;position:absolute;left:${(900 - 1440 * k) / 2}px;top:0;transform:scale(${k});transform-origin:0 0;background:transparent;overflow:visible`;
    e.append(src);
    return e;
  } };
}
})();

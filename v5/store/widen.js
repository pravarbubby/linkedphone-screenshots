/* Re-lay a 375×812 mobile screen out at W×H pt (iPad single column).
   Measures every box at 375, then walks top-down: boxes that span their parent stretch with it,
   boxes in the right part move right, centred boxes stay centred, bottom-docked layers move down. */
(() => {
const SKIP = (e) => e instanceof SVGElement || e.closest('svg') || (e.classList && e.classList.contains('ic') && e.parentElement && e.parentElement.closest('.ic'));
const DOCK = '.tabs,.as-tabs,.cl-player,.homebar,[data-dock]';
window.widen = function widen(el, W, H, opts = {}) {
  const host = document.createElement('div');
  host.style.cssText = 'position:absolute;left:-99999px;top:0;width:375px;height:812px';
  document.body.append(host); host.append(el);
  const all = [el, ...el.querySelectorAll('*')].filter(e => !SKIP(e));
  const R = new Map(all.map(e => [e, e.getBoundingClientRect()]));
  const dW = W - 375, dH = H - 812;
  const px = (v) => parseFloat(v) || 0;
  function shiftX(c, d) {
    const cs = getComputedStyle(c);
    if (cs.position === 'absolute' || cs.position === 'relative') c.style.left = px(cs.left) + d + 'px';
    else c.style.transform = (c.style.transform || '') + ` translateX(${d}px)`;
  }
  function walk(p, d) {
    if (!d) return;
    const pr = R.get(p);
    [...p.children].forEach(c => {
      if (SKIP(c) || !R.has(c)) return;
      const r = R.get(c), cs = getComputedStyle(c);
      if (r.width === 0 && r.height === 0) return;
      const l = r.left - pr.left, w = r.width, pw = pr.width;
      const now = c.getBoundingClientRect(), moved = now.left - r.left, grew = now.width - r.width;
      const spans = w >= pw * .55 && pw - (l + w) <= 40;
      const inline = cs.display.startsWith('inline') || (p && getComputedStyle(p).display.includes('flex') && getComputedStyle(p).flexDirection.startsWith('row') && w < pw * .82);
      if (spans && !inline) {
        if (grew < d - .5) { c.style.width = w + d + 'px'; if (cs.maxWidth !== 'none') c.style.maxWidth = 'none'; }
        if (Math.abs(moved) > .5 && cs.position !== 'static') shiftX(c, -moved);
        walk(c, d);
      } else if (c.matches && opts.center && c.matches(opts.center)) {
        if (Math.abs(d / 2 - moved) > .5) shiftX(c, d / 2 - moved);
      } else if (cs.position === 'absolute' || (cs.position === 'relative' && !inline)) {
        if (grew > d * .5) { walk(c, grew); return; }
        const cx = l + w / 2;
        let want = 0;
        const rg = pw - l - w;
        if (l >= pw * .5) want = d;
        else if (Math.abs(l - rg) < 14 && l > pw * .3) want = d / 2;
        if (Math.abs(want - moved) > .5) shiftX(c, want - moved);
      }
    });
  }
  el.style.width = W + 'px'; el.style.height = H + 'px';
  walk(el, dW);
  if (dH) [...el.children].forEach(c => {
    if (SKIP(c) || !R.has(c)) return;
    const r = R.get(c), er = R.get(el), top = r.top - er.top;
    const cs = getComputedStyle(c);
    const now = c.getBoundingClientRect(), moved = now.top - r.top;
    if (r.height >= 760) { if (now.height - r.height < dH - .5 && cs.position === 'absolute') c.style.height = r.height + dH + 'px'; }
    else if (c.matches(DOCK + (opts.dock ? ',' + opts.dock : '')) && Math.abs(moved - dH) > .5) c.style.top = px(cs.top) + dH - moved + 'px';
  });
  host.remove();
  return el;
};
})();

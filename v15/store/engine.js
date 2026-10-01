/* Store screenshot engine. STORE.<platform>[i] = { title, build() → slide element }.
   Geometry is in output pixels; app screens are built in points (1pt = 1px in the kit) and scaled. */
(() => {
const { h } = UI;
const SIZES = { ios: [1290, 2796], ipad: [2064, 2752], mac: [2880, 1800], android: [1440, 2880], androidS: [900, 1600] };

/* Backdrop: near-white surface (design tokens --g98 → --blue98) with three soft, heavily blurred light blobs —
   pink (--pinkbg), lavender (--blue95) and cyan — placed off-centre. Sizes are relative to the canvas. */
const BLOBS = {
  'bg-std':  [['#FCE3F0', .50, -.06, .62, .30, .85], ['#E5EAFF', .92, .55, .55, .38, .9], ['#D5EDF8', .06, .86, .62, .34, .85]],
  'bg-hero': [['#FCE3F0', .62, -.04, .60, .28, .85], ['#D5EDF8', -.04, .40, .50, .40, .8], ['#E5EAFF', .96, .78, .56, .40, .9]],
};
function backdrop(W, H, kind) {
  const b = h('div', 'bg', 'overflow:hidden;background:linear-gradient(180deg,#FDFDFF 0%,#F8F8FF 45%,#F2F4FF 100%)');
  const M = Math.max(W, H);
  (BLOBS[kind] || BLOBS['bg-std']).forEach(([c, x, y, w, hh, o]) => {
    const bw = w * M, bh = hh * M;
    b.append(h('div', '', `position:absolute;left:${x * W - bw / 2}px;top:${y * H - bh / 2}px;width:${bw}px;height:${bh}px;border-radius:50%;background:${c};opacity:${o};filter:blur(${M * .07}px)`));
  });
  return b;
}
const slide = (platform, bg = 'bg-std') => {
  const [W, H] = SIZES[platform];
  const e = h('div', 'slide slide-' + platform, { width: W + 'px', height: H + 'px' });
  e.append(backdrop(W, H, bg));
  return e;
};

// headline + subline. parts: array of strings / ['blue', text] / ['b', text] / ['bb', text] (blue bold)
const rich = (parts) => parts.map(p => {
  if (typeof p === 'string') return p;
  const [k, t] = p;
  return h('span', k === 'blue' ? 'blue' : k === 'b' ? '' : 'blue', k === 'bb' ? 'font-weight:600' : k === 'b' ? 'font-weight:600' : null, t);
});
const text = (cls, y, size, parts, style = '') => h('div', cls, `top:${y}px;font-size:${size}px;line-height:${Math.round(size * 1.18)}px;` + style, rich(Array.isArray(parts) ? parts : [parts]));

/* iPhone: frame at (x,y) with screen scale s (px per pt). Screen = 375×812 pt. */
const phone = (screenEl, { x, y, s = 2.4667, bezel, rOut, rIn, screenH = 812, clipTop = 0 } = {}) => {
  bezel = bezel ?? 29 * s / 2.4667;
  rIn = rIn ?? 47 * s;
  rOut = rOut ?? rIn + bezel;
  const W = 375 * s + 2 * bezel, Ht = screenH * s + 2 * bezel;
  const d = h('div', 'dev', { left: x + 'px', top: y + 'px', width: W + 'px', height: Ht + 'px' });
  d.append(h('div', 'bezel', { borderRadius: rOut + 'px' }));
  const sc = h('div', 'screen', { left: bezel + 'px', top: bezel + 'px', width: 375 * s + 'px', height: screenH * s + 'px', borderRadius: rIn + 'px' });
  const wrap = h('div', 'scr', { width: '375px', height: '812px', transform: `translateY(${-clipTop * s}px) scale(${s})` });
  wrap.append(screenEl);
  sc.append(wrap);
  d.append(sc);
  d.screenOrigin = [x + bezel, y + bezel, s];
  return d;
};

/* Pop-out card: content laid out in points (w×h pt) and drawn at k px/pt, card corner radius r pt. */
const pop = (content, { x, y, w, h: hh, k, r = 32, cls = '', style = '' }) => {
  const c = h('div', 'pop ' + cls, `left:${x}px;top:${y}px;width:${w * k}px;height:${hh * k}px;border-radius:${r * k}px;` + style);
  const inn = h('div', 'in', { width: w + 'px', height: hh + 'px', transform: `scale(${k})` });
  (Array.isArray(content) ? content : [content]).forEach(n => inn.append(n));
  c.append(inn);
  return c;
};

/* MacBook: app content (W×H pt, incl. title bar) on a lid + aluminium base. Returns element; .screenOrigin = [x,y,s]. */
const macbook = (content, { x, y, s, W = 1428, H = 929, bezel = 24, chin = 38 }) => {
  const sw = W * s, sh = H * s, lw = sw + 2 * bezel, lh = sh + bezel + chin;
  const d = h('div', 'dev mac', { left: x + 'px', top: y + 'px', width: lw + 'px', height: lh + 'px' });
  d.append(h('div', '', `position:absolute;inset:0;border-radius:${46}px ${46}px 18px 18px;background:#0C0D11;box-shadow:inset 0 0 0 3px #3A3C44,inset 0 0 0 5px #121318`));
  d.append(h('div', '', `position:absolute;left:${lw / 2 - 5}px;top:${bezel / 2 - 5}px;width:10px;height:10px;border-radius:50%;background:#1E2230;box-shadow:inset 0 0 0 2px #2A2F42`));
  const sc = h('div', 'screen', { left: bezel + 'px', top: bezel + 'px', width: sw + 'px', height: sh + 'px', borderRadius: '16px 16px 4px 4px' });
  const wrap = h('div', 'scr', { width: W + 'px', height: H + 'px', transform: `scale(${s})` });
  wrap.append(content); sc.append(wrap); d.append(sc);
  const bw = lw * 1.17, bx = (lw - bw) / 2;
  d.append(h('div', '', `position:absolute;left:${bx}px;top:${lh - 2}px;width:${bw}px;height:${s * 30}px;border-radius:4px 4px ${s * 30}px ${s * 30}px/4px 4px ${s * 24}px ${s * 24}px;background:linear-gradient(180deg,#E9EBF0 0%,#D2D5DD 35%,#AEB2BC 80%,#8D919B 100%);box-shadow:0 18px 40px rgba(40,50,110,.18)`));
  d.append(h('div', '', `position:absolute;left:${lw / 2 - 170}px;top:${lh - 2}px;width:340px;height:${s * 9}px;border-radius:0 0 18px 18px;background:linear-gradient(180deg,#A9ADB7,#C7CAD2)`));
  return d;
};
/* iPad (portrait): content W×H pt. */
const ipad = (content, { x, y, s, W = 1032, H = 1376, bezel = 40, rIn = 46 }) => {
  const sw = W * s, sh = H * s;
  const d = h('div', 'dev', { left: x + 'px', top: y + 'px', width: sw + 2 * bezel + 'px', height: sh + 2 * bezel + 'px' });
  d.append(h('div', 'bezel', { borderRadius: rIn + bezel + 'px', boxShadow: 'inset 0 0 0 3px #2B2E3E' }));
  d.append(h('div', '', `position:absolute;left:${bezel + sw / 2 - 6}px;top:${bezel / 2 - 6}px;width:12px;height:12px;border-radius:50%;background:#262A3C`));
  const sc = h('div', 'screen', { left: bezel + 'px', top: bezel + 'px', width: sw + 'px', height: sh + 'px', borderRadius: rIn + 'px' });
  const wrap = h('div', 'scr', { width: W + 'px', height: H + 'px', transform: `scale(${s})` });
  wrap.append(content); sc.append(wrap); d.append(sc);
  return d;
};

window.STORE = { SIZES, slide, text, phone, pop, macFrame: macbook, ipadFrame: ipad, ios: [], ipad: [], mac: [], android: [], androidS: [] };
})();

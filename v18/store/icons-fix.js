/* One consistent header action set (search · dialpad · add), drawn once and used everywhere:
   mobile/iPad large-title headers, desktop list headers and nav bars. 1.5px strokes on a 24 grid. */
(() => {
// The Figma export wraps every icon in frame clip paths that slice off stroke edges (sound waves, mic tops,
// handset curves). Drop them once here so every icon, everywhere, draws whole.
for (const k in window.ICONS) window.ICONS[k] = window.ICONS[k].replace(/<clipPath\b[\s\S]*?<\/clipPath>/g, '').replace(/ clip-path="[^"]*"/g, '');
const SEARCH = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="10.6" cy="10.6" r="7.6"/><path d="m16.2 16.2 4.6 4.6"/></svg>';
const DIAL = '<svg viewBox="0 0 24 24" fill="currentColor">' + [5, 12, 19].map(y => [5, 12, 19].map(x => `<circle cx="${x}" cy="${y}" r="1.75"/>`).join('')).join('') + '</svg>';
const ADD = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><rect x="3.25" y="3.25" width="17.5" height="17.5" rx="4.5"/><path d="M12 8.2v7.6M8.2 12h7.6"/></svg>';
Object.assign(window.ICONS, { 'Search|Light': SEARCH, 'DialPad|Light': DIAL, 'Dialpad 2|Light': DIAL, 'Add|Light': ADD });
// kit large-title header used the flattened artwork; swap it for the same three icons
const hdr = UI.header;
UI.header = (...a) => {
  const e = hdr(...a);
  const acts = e.querySelector('.acts');
  if (acts) { acts.innerHTML = ''; acts.style.cssText = 'display:flex;gap:16px;align-items:center;margin-right:0';
    ['Search|Light', 'Dialpad 2|Light', 'Add|Light'].forEach(n => acts.append(UI.icon(n, 'width:26px;height:26px'))); }
  return e;
};
})();

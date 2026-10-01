/* LinkedPhone UI kit helpers. Every screen builder returns { el, parts } where el is a 375×812 .scr375 element
   and parts exposes the pieces the film animates (rows, cards, inputs…). */
(() => {
const h = (tag, cls, style, kids) => {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (style) { if (typeof style === 'string') e.style.cssText = style; else Object.assign(e.style, style); }
  (Array.isArray(kids) ? kids : kids != null ? [kids] : []).forEach(k => e.append(k instanceof Node ? k : document.createTextNode(k)));
  return e;
};
const ICON_ALIAS = {
  search: 'Search|Light', dial: 'DialPad|Light', add: 'Add|Light', filter: 'Filter 2|Light', down: 'Down|Light',
  inbox: 'Inbox|Light', inboxB: 'Inbox|Bold', call: 'Call|Light', callB: 'Call|Bold', setup: 'Star / AI 3|Light', setupB: 'Star / AI 3|Bold',
  ticket: 'Clipboard check / task|Light', ticketB: 'Clipboard check / task|Bold', contact: 'Name / ID Card|Light', contactB: 'Name / ID Card|Bold',
  missed: 'Missed Call|Bold', incoming: 'Incoming Call|Bold', outgoing: 'Outgoing Call|Bold', vm: 'Voice Mail|Bold',
  info: 'Info|Light', back: 'Back 1|Light', close: 'Close|Light', more: 'More|Light', chat: 'Chat|Light', group: 'Group|Bold',
  megaphone: 'Campaign Megaphone Broadcast|Bold', photo: 'Photo / Media|Bold', person: '1 Person|Bold',
};
let icN = 0;
const icon = (name, style) => {
  const key = ICON_ALIAS[name] || name;
  let s = window.ICONS[key] || window.ICONS[key.replace('|Light', '|Bold')] || '';
  // unique ids per instance (shared ids break <use> when another copy is hidden) and no edge clipping
  const u = 'u' + (++icN);
  s = s.replace(/id="([^"]+)"/g, `id="$1${u}"`).replace(/href="#([^"]+)"/g, `href="#$1${u}"`).replace(/url\(#([^)]+)\)/g, `url(#$1${u})`).replace(/<title>.*?<\/title>/, '');
  const e = h('span', 'ic', style); e.innerHTML = s; return e;
};
const svg = (markup, style) => { const e = h('span', 'ic', style); e.innerHTML = markup; return e; };

// iOS status glyphs
const SIG = '<svg viewBox="0 0 18 12"><rect x="0" y="8" width="3" height="4" rx=".8" fill="currentColor"/><rect x="5" y="5.5" width="3" height="6.5" rx=".8" fill="currentColor"/><rect x="10" y="3" width="3" height="9" rx=".8" fill="currentColor"/><rect x="15" y="0" width="3" height="12" rx=".8" fill="currentColor"/></svg>';
const WIFI = '<svg viewBox="0 0 16 12"><path d="M8 2.4c2.3 0 4.4.9 6 2.4l1.2-1.2A10.2 10.2 0 0 0 8 .6 10.2 10.2 0 0 0 .8 3.6L2 4.8a8.5 8.5 0 0 1 6-2.4Zm0 3.4c1.4 0 2.7.5 3.6 1.4l1.2-1.2A6.8 6.8 0 0 0 8 4a6.8 6.8 0 0 0-4.8 2l1.2 1.2c1-.9 2.2-1.4 3.6-1.4Zm0 3.4c.5 0 1 .2 1.3.5L8 11 6.7 9.7c.3-.3.8-.5 1.3-.5Z" fill="currentColor"/></svg>';
const BATT = '<svg viewBox="0 0 28 13"><rect x=".5" y=".5" width="24" height="12" rx="3.8" fill="none" stroke="currentColor" opacity=".4"/><rect x="2" y="2" width="21" height="9" rx="2.5" fill="currentColor"/><path d="M26 4.5v4c.8-.3 1.3-1.1 1.3-2s-.5-1.7-1.3-2Z" fill="currentColor" opacity=".45"/></svg>';
// Fixed chrome uses the exact Figma artwork (3× crops in assets/chrome) so it matches the product 1:1.
const chromeImg = (name, css) => { const i = h('img', '', 'position:absolute;display:block;' + (css || '')); i.src = `assets/chrome/${name}.png`; return i; };
const statusBar = (dark) => dark ? statusBarDrawn(true) : (() => { const e = h('div', 'sbar'); e.append(chromeImg('status', 'left:0;top:0;width:375px;height:47px')); return e; })();
const statusBarDrawn = (dark) => h('div', 'sbar' + (dark ? ' dark' : ''), null, [
  h('div', 'time', null, '9:41'),
  h('div', 'icons', null, [svg(SIG, 'width:18px;height:12px'), svg(WIFI, 'width:16px;height:12px'), svg(BATT, 'width:27px;height:13px')]),
]);
const img = (n) => `url(assets/avatars/${n}.jpg)`;
// default avatar tiles are the exact design artwork (cropped from the 3× Figma renders) — never redraw them
const DEFAULT_AV = { group: 1, campaign: 1, unknown: 1, internal: 1 };
const avatar = (a, cls = '') => {
  const e = h('div', 'av ' + cls);
  if (a.kind && DEFAULT_AV[a.kind]) { e.style.backgroundImage = `url(assets/defaults/${a.kind}.png)`; e.style.backgroundColor = 'transparent'; return e; }
  if (a.photo) e.style.backgroundImage = img(a.photo);
  else if (a.initials) e.textContent = a.initials;
  else if (a.icon) { e.append(icon(a.icon, a.iconStyle || 'width:28px;height:28px')); if (a.bg) e.style.background = a.bg; if (a.fg) e.firstChild.style.color = a.fg; }
  return e;
};
const header = (title, me, chips, opts = {}) => {
  const hd = h('div', 'hdr');
  const r = h('div', 'row', null, [
    h('div', 'me', { backgroundImage: img(me) }),
    h('div', 't', null, title),
    h('div', 'acts', 'position:relative;width:120px;height:50px;margin-right:-16px', [chromeImg('hdr-actions', 'right:0;top:0;width:120px;height:50px')]),
  ]);
  hd.append(r);
  if (chips) {
    const c = h('div', 'chips');
    c.append(h('div', '', 'position:relative;flex:none;width:76.9px;height:40.9px;margin:-1.4px -0.6px -1.5px -0.6px', [chromeImg('chip-filter', 'left:0;top:0;width:76.9px;height:40.9px')]));
    chips.forEach(t => c.append(h('div', 'chip', null, t)));
    hd.append(c);
  }
  return hd;
};
const TABS5 = [['Inbox', 'inbox'], ['Calls', 'call'], ['Setup', 'setup'], ['Tickets', 'ticket'], ['Contacts', 'contact']];
const TAB_ART = { Inbox: 'inbox', Calls: 'calls', Setup: 'setup', Tickets: 'tickets' };
const tabBar = (active) => TAB_ART[active]
  ? (() => { const e = h('div', 'tabs', 'padding:0'); e.append(chromeImg('tabs-' + TAB_ART[active], 'left:0;top:0;width:375px;height:86px')); return e; })()
  : h('div', 'tabs', null, TABS5.map(([l, ic]) => h('div', 'tb' + (l === active ? ' on' : ''), null, [icon(l === active ? ic + 'B' : ic), l])));

window.UI = { h, icon, svg, statusBar, avatar, header, tabBar, img, chromeImg };
})();

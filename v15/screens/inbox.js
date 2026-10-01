/* Inbox — replica of refs "Inbox" (375×1255) with App Store–style example content. */
(() => {
const { h, icon, statusBar, avatar, header, tabBar } = UI;
const ROWS = [
  { av: { photo: 'kevin' }, name: 'Kevin Lui', when: '9:38 am', sub: ['photo', 'Photo'], lines: ['Are these still available for Saturday delivery?'], badge: 2, tag: 'Needs First Response' },
  { av: { photo: 'michael' }, name: 'Michael Brown', when: '3:15 am', sub: ['outgoing', 'Sandy dialed'], lines: ['“Hi Michael, this is Sandy with the quote you…”'] },
  { av: { kind: 'group' }, name: 'Daniela Wilson +2 more', when: '4:05 am', lines: ['I’m really excited about this project and I look forward to working with you!'], clamp: true },
  { av: { kind: 'unknown' }, name: 'keisha.morgan@gmail.com', when: '3:01 am', bold: 'Tax documents for my 2025 return', lines: ['Hi! Attaching my W-2 and 1099 forms for…'], badge: 1, tag: 'Needs First Response' },
  { av: { photo: 'ethan' }, name: 'Ethan Williams', when: '3:15 am', sub: ['incoming', 'Andre answered · Sales'], lines: ['“Ethan, I am so glad you called. I’d like to…”'] },
  { av: { photo: 'ivy' }, name: 'Ivy Turner', when: '3:15 am', sub: ['missed', 'Missed · Voicemail', true], lines: ['“I just left an amazing review for you…”'], italic: true, vm: true },
  { av: { kind: 'campaign' }, name: 'Spring Tune-Up Special', when: '3:15 am', lines: ['Book your AC tune-up before May 31 and save 20% on parts & labor.'], clamp: true, italic: true },
  { av: { kind: 'unknown' }, name: '+1 (512) 555-0187', when: '3:45 am', lines: ['Hi! Do you have any openings this Saturday for a deep clean?'], clamp: true, italic: true, badge: 2 },
  { av: { photo: 'judith' }, name: 'Judith Rodriguez', when: '3:15 am', sub: ['photo', '3 Photos'], lines: [], badge: 3 },
];

function row(r) {
  const body = h('div', 'body', r.badge || r.vm ? 'padding-right:28px' : null);
  body.append(h('div', 'top', r.badge || r.vm ? 'margin-right:-28px' : null, [h('div', 'name', null, r.name), h('div', 'when', null, r.when)]));
  if (r.sub) {
    const [ic, txt, miss] = r.sub;
    const icEl = icon(ic, ic === 'photo' ? 'width:20px;height:20px;color:#5C5D71' : 'width:19px;height:19px;color:' + (miss ? '#DE260C' : '#444658'));
    body.append(h('div', 'line' + (r.italic ? ' i' : ''), null, [icEl, txt]));
  }
  if (r.bold) body.append(h('div', 'line b', null, r.bold));
  r.lines.forEach(l => body.append(h('div', 'line' + (r.clamp ? ' clamp2' : '') + (r.italic ? ' i' : ''), null, l)));
  if (r.tag) body.append(h('div', 'tag', null, r.tag));
  const e = h('div', 'lrow', 'align-items:center', [avatar(r.av), body]);
  if (r.badge) e.append(h('div', 'aside', 'transform:translateY(-50%);margin:0', h('div', 'badge', null, String(r.badge))));
  if (r.vm) e.append(h('div', 'aside', 'transform:translateY(-50%);margin:0', h('div', 'badge', 'padding:0;width:26px;display:grid;place-items:center', icon('Voice Mail 2|Bold', 'width:18px;height:18px;color:#fff'))));
  return e;
}

window.SCREENS = window.SCREENS || {};
SCREENS.inbox = () => {
  const el = h('div', 'scr375');
  const content = h('div', 'list', 'top:163px');
  const rows = ROWS.map(r => { const e = row(r); content.append(e); return e; });
  el.append(content);
  const hdr = header('Inbox', 'bob', ['Unread', 'Response Due', 'Team Chats']);
  el.append(hdr, statusBar(), tabBar('Inbox'));
  return { el, parts: { content, rows, hdr }, scrollMax: () => Math.max(0, content.scrollHeight + 163 - (812 - 86)) };
};
})();

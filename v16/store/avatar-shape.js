/* Avatar shapes, applied after each slide is built. The shape follows the person: team members (the business's
   own staff) are always circles — lists, ticket assignees, chat and comment bubbles, notes, headers — and every
   contact (customer) is a squircle. Each photo belongs to exactly one person, so the photo decides. */
(() => {
const TEAM = new Set(['bob', 'jesse', 'alexis', 'sandy', 'metickets', 'liamj', 'raju', 'priya', 'marcus']);
const SQUIRCLE = '28%';
const photoOf = (e) => ((e.style.backgroundImage || '').match(/assets\/avatars\/([a-z0-9]+)\./) || [])[1];
const isAvatar = (e) => e.classList.contains('av') || /assets\/(avatars|defaults)\//.test(e.style.backgroundImage || '');
const shape = (root) => {
  root.querySelectorAll('*').forEach(e => {
    if (!isAvatar(e)) return;
    const w = e.offsetWidth || parseFloat(e.style.width) || 0;
    if (w > 220) return; // large artwork, not an avatar
    e.style.borderRadius = TEAM.has(photoOf(e)) ? '50%' : SQUIRCLE;
  });
  return root;
};
for (const p of Object.keys(STORE)) {
  const list = STORE[p]; if (!Array.isArray(list)) continue;
  list.forEach(def => { if (!def || def.__shaped) return; const b = def.build; def.build = (...a) => shape(b(...a)); def.__shaped = true; });
}
window.shapeAvatars = shape;
})();

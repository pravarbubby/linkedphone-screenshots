/* Version switcher — shared by every vN/index.html. Reads ../versions.json and adds a picker to the header. */
(() => {
  const cur = (location.pathname.match(/\/(v\d+)\//) || [])[1];
  const fmt = (iso) => { const d = new Date(iso); return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) + ' · ' + d.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' }); };
  fetch('../versions.json?t=' + Date.now()).then(r => r.json()).then(list => {
    const wrap = document.createElement('label');
    wrap.style.cssText = 'display:flex;align-items:center;gap:8px;font:500 13px/1 -apple-system,system-ui;color:#6B6E85';
    const sel = document.createElement('select');
    sel.setAttribute('aria-label', 'Version');
    sel.style.cssText = 'appearance:none;-webkit-appearance:none;font:600 13px/1 -apple-system,system-ui;color:#171A2B;background:#fff url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27%3E%3Cpath d=%27m7 10 5 5 5-5%27 fill=%27none%27 stroke=%27%236B6E85%27 stroke-width=%271.6%27 stroke-linecap=%27round%27/%3E%3C/svg%3E") no-repeat right 8px center/16px;border:1px solid #E3E5F2;border-radius:8px;padding:8px 30px 8px 10px;cursor:pointer';
    [...list].reverse().forEach(({ v, updated }, i) => {
      const o = document.createElement('option'); o.value = v;
      o.textContent = `${v.toUpperCase()}${i === 0 ? ' (latest)' : ''} — ${fmt(updated)}`;
      if (v === cur) o.selected = true; sel.append(o);
    });
    sel.onchange = () => { location.href = `../${sel.value}/index.html`; };
    wrap.append('Version', sel);
    const ver = document.querySelector('.db-ver') || document.querySelector('.ver');
    if (ver) ver.replaceWith(wrap);
    else { wrap.style.cssText += ';position:fixed;top:12px;right:16px;z-index:999;background:#fff;padding:6px 8px;border-radius:10px;box-shadow:0 4px 16px rgba(0,0,0,.15)'; document.body.append(wrap); }
  }).catch(() => {});
})();

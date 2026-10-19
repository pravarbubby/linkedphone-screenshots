// V=v18 node tools/export-headers.mjs [ios,mac,android,win]  → exports/<ver>/headers/<key>.png at store size (no alpha)
// Layout size and export scale come from STORE.hdr[key] (Google Play 2048×1000 @0.5 → 1024×500, Windows 3200×1800 @1.2 → 3840×2160).
import { launch } from '../../lib-chrome.mjs';
import fs from 'fs';
const ver = process.env.V || 'v19', port = process.env.PORT || 8765;
const keys = (process.argv[2] || 'ios,mac,android,win').split(',');
const out = `exports/${ver}/headers`; fs.mkdirSync(out, { recursive: true });
const b = await launch(); const errs = [];
for (const k of keys) {
  const probe = await b.newPage();
  await probe.goto(`http://localhost:${port}/App%20Store%20Screenshots/${ver}/index.html?only=hdr-${k}`, { waitUntil: 'networkidle' });
  const { size, dpr } = await probe.evaluate((k) => ({ size: STORE.hdr[k].size, dpr: STORE.hdr[k].dpr }), k); await probe.close();
  const p = await b.newPage({ viewport: { width: size[0], height: size[1] }, deviceScaleFactor: dpr });
  p.on('pageerror', e => errs.push(k + ': ' + e.message));
  await p.goto(`http://localhost:${port}/App%20Store%20Screenshots/${ver}/index.html?only=hdr-${k}`, { waitUntil: 'networkidle' });
  await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(200);
  // JPEG-free but opaque: screenshot with omitBackground false → no alpha channel issues; flatten via type png + white bg
  await p.screenshot({ path: `${out}/${k}.png`, clip: { x: 0, y: 0, width: size[0], height: size[1] } });
  console.log(k, 'ok', Math.round(size[0] * dpr) + '×' + Math.round(size[1] * dpr));
  await p.close();
}
console.log(errs.length ? 'ERRORS: ' + errs.join(' | ') : 'no page errors');
await b.close();

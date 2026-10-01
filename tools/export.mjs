// node tools/export.mjs ios [1,2,…]  → exports/<ver>/<platform>/NN.png at native size; also prints a pixel diff vs refs for iOS
import { launch } from '../../lib-chrome.mjs';
import fs from 'fs';
const [plat, list] = process.argv.slice(2);
const SIZES = { ios: [1290, 2796], ipad: [2064, 2752], mac: [2880, 1800], android: [1440, 2880], androidS: [900, 1600] };
const [W, H] = SIZES[plat]; const ver = process.env.V || 'v1';
const out = `exports/${ver}/${plat}`; fs.mkdirSync(out, { recursive: true });
const b = await launch(); const p = await b.newPage({ viewport: { width: W, height: H } });
const errs = []; p.on('pageerror', e => errs.push(e.message));
const ns = list ? list.split(',').map(Number) : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
for (const n of ns) {
  await p.goto(`http://localhost:8765/App%20Store%20Screenshots/${ver}/index.html?only=${plat}-${n}`, { waitUntil: 'networkidle' });
  if (!(await p.evaluate(() => !!document.querySelector('.slide')))) { console.log(n, 'not built'); continue; }
  await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(150);
  await p.screenshot({ path: `${out}/${String(n).padStart(2, '0')}.png`, clip: { x: 0, y: 0, width: W, height: H } });
  console.log(n, 'ok');
}
console.log(errs.length ? 'ERRORS: ' + errs.join(' | ') : 'no page errors');
await b.close();

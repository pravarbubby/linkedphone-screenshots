// node tools/eval.mjs ios-3 "js expression"
import { launch } from '../../lib-chrome.mjs';
const [only, js] = process.argv.slice(2);
const b = await launch(); const p = await b.newPage({ viewport: { width: 1290, height: 2796 } });
p.on('pageerror', e => console.log('ERR', e.message));
await p.goto(`http://localhost:8765/App%20Store%20Screenshots/${process.env.V || 'v1'}/index.html?only=${only}`, { waitUntil: 'networkidle' });
console.log(JSON.stringify(await p.evaluate(js), null, 1));
await b.close();

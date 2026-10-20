// Full-page screenshots with headless Chromium over the DevTools protocol (no npm packages).
// Usage: node tools/shot.mjs <url> <out.png> <width> <viewportHeight> [reduced]
// The viewport keeps its real height (so 100svh stays honest); the capture runs past it.
import { spawn } from 'node:child_process';
import { writeFileSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const [url, out, W, H, mode] = process.argv.slice(2);
const port = 9300 + Math.floor(Math.random() * 500);
const prof = mkdtempSync(join(tmpdir(), 'kts-chrome-'));
const chrome = spawn('chromium', ['--headless=new', '--disable-gpu', '--hide-scrollbars', `--remote-debugging-port=${port}`,
  `--user-data-dir=${prof}`, '--force-device-scale-factor=1', 'about:blank'], { stdio: 'ignore' });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let target;
for (let i = 0; i < 50 && !target; i++) {
  await sleep(200);
  try { target = (await (await fetch(`http://127.0.0.1:${port}/json`)).json()).find((t) => t.type === 'page'); } catch {}
}
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener('open', r));
let id = 0; const wait = new Map();
ws.addEventListener('message', (e) => { const m = JSON.parse(e.data); if (m.id && wait.has(m.id)) { wait.get(m.id)(m); wait.delete(m.id); } });
const send = (method, params = {}) => new Promise((r) => { const i = ++id; wait.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
await send('Page.enable');
await send('Emulation.setDeviceMetricsOverride', { width: +W, height: +H, deviceScaleFactor: 1, mobile: +W < 760 });
if (mode === 'reduced') await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
await send('Page.navigate', { url });
await sleep(2500);
const m = await send('Page.getLayoutMetrics');
const { width, height } = m.result.cssContentSize;
const shot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, clip: { x: 0, y: 0, width: Math.ceil(width), height: Math.ceil(height), scale: 1 } });
writeFileSync(out, Buffer.from(shot.result.data, 'base64'));
console.log(out, Math.ceil(width), 'x', Math.ceil(height));
ws.close(); chrome.kill();
process.exit(0);

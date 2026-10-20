// Prints the dust-mote SVG groups for the hero (same seed, count and beam test as brand/system/src/scene.js).
// Motes are split into three drift groups so CSS can move them a few art px at a time.
function rng(seed) {
  let t = seed >>> 0;
  return () => {
    t += 0x6D2B79F5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}
function inBeam(x, y) {
  const xl = 369 - 0.7 * (y - 60);
  const xr = 410 - 0.7 * Math.max(0, y - 150);
  return y > 60 && y < 258 && x > xl && x < xr;
}
const r = rng(7);
const g = [[], [], []], h = [[], [], []];
let n = 0, guard = 0;
while (n < 46 && guard++ < 4000) {
  const x = Math.floor(230 + r() * 190), y = Math.floor(60 + r() * 196);
  if (!inBeam(x, y)) continue;
  const a = (0.25 + r() * 0.7).toFixed(2);
  const tw = n % 5 === 0 ? ' class="tw"' : '';
  g[n % 3].push(`<rect${tw} x="${x}" y="${y}" width="1" height="1" opacity="${a}"/>`);
  if (r() < 0.22) h[n % 3].push(`<circle cx="${x + 0.5}" cy="${y + 0.5}" r="2.2"/>`);
  n++;
}
g.forEach((m, i) => console.log(`<g class="drift d${i + 1}"><g filter="url(#fh)" fill="#cfe0ff" opacity=".35">${h[i].join('')}</g><g fill="#eef4ff" shape-rendering="crispEdges">${m.join('')}</g></g>`));

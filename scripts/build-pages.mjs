// Puts the three sites together into one folder for GitHub Pages (one repo = one Pages site):
//   <root>         beyondcy-site   (the "stay tuned" page)
//   <root>dash/    beyondcy-dash
//   <root>track/   beyondcy-track  (needs `npm run build` with BASE_PATH=<root>track/ first)
// Usage: PAGES_ROOT=/beyondcy.co/ node scripts/build-pages.mjs   → writes ./_site
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { basename, join } from 'node:path';

const ROOT = (process.env.PAGES_ROOT || '/beyondcy.co/').replace(/\/?$/, '/');
const TRACK = `${ROOT}track/`;
const OUT = '_site';

// CNAME files are for the later custom-domain setup; README files are not pages.
const skip = (src) => !['CNAME', 'README.md'].includes(basename(src));

const trackDist = 'beyondcy-track/dist';
if (!existsSync(join(trackDist, 'index.html'))) {
  console.error(`Missing ${trackDist}/index.html: build the tracker first (BASE_PATH=${TRACK} npm run build).`);
  process.exit(1);
}
const trackHtml = readFileSync(join(trackDist, 'index.html'), 'utf8');
if (!trackHtml.includes(`${TRACK}assets/`)) {
  console.error(`The tracker was not built for ${TRACK}. Rebuild it with BASE_PATH=${TRACK}.`);
  process.exit(1);
}

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT);
cpSync('beyondcy-site', OUT, { recursive: true, filter: skip });
cpSync('beyondcy-dash', join(OUT, 'dash'), { recursive: true, filter: skip });
cpSync(trackDist, join(OUT, 'track'), { recursive: true, filter: skip });

// GitHub Pages serves the site-wide 404.html for any unknown path. Deep links into the
// tracker (e.g. <root>track/t/123/calendar) must boot the tracker app, which then routes
// them itself; any other unknown path goes back to the home page.
const guard = `<script>if(!location.pathname.startsWith(${JSON.stringify(TRACK)})&&location.pathname+'/'!==${JSON.stringify(TRACK)})location.replace(${JSON.stringify(ROOT)});</script>`;
writeFileSync(join(OUT, '404.html'), trackHtml.replace('<head>', `<head>\n    ${guard}`));

writeFileSync(join(OUT, '.nojekyll'), ''); // serve files as-is, no Jekyll processing

console.log(`Built ${OUT}/ for ${ROOT}  (site: ${ROOT}  dash: ${ROOT}dash/  tracker: ${TRACK})`);

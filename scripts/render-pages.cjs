// Save a fully rendered copy (after JavaScript runs) of every page in site/urls.txt.
// Use this when pages in site/raw look blank or are missing text: website
// builders such as GoDaddy Website Builder fill in content with JavaScript,
// which wget cannot run.
//
// Setup (once):  npm install playwright && npx playwright install chromium
// Run:           node scripts/render-pages.cjs [urls-file]
//
// Output, per page:
//   site/rendered/<path>/index.html  page HTML after JavaScript ran
//   site/rendered/<path>/page.png    full-page screenshot (what the live site looked like)
//   site/rendered/<path>/text.txt    all visible text (handy for copy edits)

const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const root = path.resolve(__dirname, '..');
const urlsFile = process.argv[2] || path.join(root, 'site', 'urls.txt');
const outDir = path.join(root, 'site', 'rendered');

function folderFor(u) {
  const { pathname, search } = new URL(u);
  let p = decodeURIComponent(pathname).replace(/\/+$/, '').replace(/\.html?$/, '');
  if (search) p += '_' + search.slice(1);
  p = p.replace(/[<>:"\\|?*]/g, '_');
  return path.join(outDir, p || 'home');
}

(async () => {
  if (!fs.existsSync(urlsFile)) {
    console.error(`No URL list at ${urlsFile}. Run scripts/mirror-site.sh first.`);
    process.exit(1);
  }
  const urls = [...new Set(fs.readFileSync(urlsFile, 'utf8').split(/\r?\n/).map(s => s.trim()).filter(Boolean))];
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1366, height: 900 } });
  let failed = 0;

  for (const u of urls) {
    const dir = folderFor(u);
    try {
      await page.goto(u, { waitUntil: 'networkidle', timeout: 60000 });
      // Scroll to the bottom so lazy-loaded images and sections load.
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 600) {
          window.scrollTo(0, y);
          await new Promise(r => setTimeout(r, 150));
        }
        window.scrollTo(0, 0);
      });
      await page.waitForTimeout(1000);
      fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(path.join(dir, 'index.html'), await page.content());
      fs.writeFileSync(path.join(dir, 'text.txt'), await page.evaluate(() => document.body.innerText));
      await page.screenshot({ path: path.join(dir, 'page.png'), fullPage: true });
      console.log('ok    ', u);
    } catch (e) {
      failed++;
      console.log('FAILED', u, '-', e.message.split('\n')[0]);
    }
  }

  await browser.close();
  console.log(`\nRendered ${urls.length - failed}/${urls.length} pages into ${outDir}`);
  process.exit(failed ? 1 : 0);
})();

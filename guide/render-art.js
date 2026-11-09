// Renders hand-drawn illustration sources guide/art/<slug>.svg to guide/images/<slug>.png (1600x900).
// Usage: node guide/render-art.js [slug ...]   (no args = all)
const fs = require("fs"), path = require("path"), { chromium } = require("playwright");
const artDir = path.join(__dirname, "art"), outDir = path.join(__dirname, "images");
(async () => {
  const want = process.argv.slice(2);
  const files = fs.readdirSync(artDir).filter(f => f.endsWith(".svg") && (!want.length || want.includes(f.slice(0, -4))));
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1600, height: 900 } });
  for (const f of files) {
    const svg = fs.readFileSync(path.join(artDir, f), "utf8");
    await page.setContent(`<html><body style="margin:0;background:#fff">${svg}</body></html>`);
    await page.locator("svg").first().screenshot({ path: path.join(outDir, f.replace(/\.svg$/, ".png")) });
    console.log("rendered", f);
  }
  await browser.close();
})();

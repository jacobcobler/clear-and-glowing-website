// Standalone media and local-import verification; no npm dependencies required.
// Run: npm run verify:assets
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { resolve, join, relative, extname } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const sourceRoot = join(root, 'src');
const publicRoot = join(root, 'public');
const errors = [];

function filesUnder(folder) {
  return readdirSync(folder, { withFileTypes: true }).flatMap((entry) => {
    const full = join(folder, entry.name);
    return entry.isDirectory() ? filesUnder(full) : [full];
  });
}

const sourceFiles = filesUnder(sourceRoot).filter((file) => /\.(astro|ts|js)$/.test(file));
let referencedImages = 0;
let imports = 0;
for (const file of sourceFiles) {
  const contents = readFileSync(file, 'utf8');
  // Asset URLs, including centrally registered photo and logo paths.
  for (const match of contents.matchAll(/["'](\/(?:images\/[^"'\n\s]+|favicon(?:-[^"']+)?\.(?:svg|png|ico)|apple-touch-icon\.png))["']/g)) {
    referencedImages++;
    const target = join(publicRoot, match[1].slice(1));
    if (!existsSync(target)) errors.push(`${relative(root, file)}: missing ${match[1]}`);
  }
  for (const match of contents.matchAll(/^\s*import\s+(?:.*?\s+from\s+)?["'](\.{1,2}\/[^"']+)["']/gm)) {
    imports++;
    const target = resolve(file, '..', match[1]);
    if (![target, `${target}.ts`, `${target}.js`, `${target}.mjs`].some(existsSync)) {
      errors.push(`${relative(root, file)}: unresolved import ${match[1]}`);
    }
  }
}

const photoDir = join(publicRoot, 'images', 'album');
const brandDir = join(publicRoot, 'images', 'brand');
const albums = readdirSync(photoDir).filter((n) => n.endsWith('.webp'));
const svgLogos = readdirSync(brandDir).filter((n) => n.endsWith('.svg'));
const webpLogos = readdirSync(brandDir).filter((n) => n.endsWith('.webp'));
if (albums.length !== 79) errors.push(`Expected all 79 original album images; found ${albums.length}`);
if (svgLogos.length !== 15) errors.push(`Expected 15 SVG logo variants; found ${svgLogos.length}`);
if (webpLogos.length !== 15) errors.push(`Expected 15 WebP logo variants; found ${webpLogos.length}`);
for (const item of ['favicon.svg', 'favicon.ico', 'apple-touch-icon.png']) {
  if (!existsSync(join(publicRoot, item))) errors.push(`Missing ${item}`);
}
for (const file of [...filesUnder(photoDir), ...filesUnder(brandDir)]) {
  if (statSync(file).size === 0) errors.push(`Empty asset ${relative(root, file)}`);
}

console.log(`Checked ${sourceFiles.length} source files and ${imports} local imports.`);
console.log(`Checked ${referencedImages} image/favicons URL occurrences.`);
console.log(`Album: ${albums.length} WebP | Logos: ${svgLogos.length} SVG + ${webpLogos.length} WebP.`);
if (errors.length) {
  for (const err of errors) console.error(`ERROR: ${err}`);
  process.exitCode = 1;
} else {
  console.log('PASS: local imports, asset paths, and required media counts.');
}

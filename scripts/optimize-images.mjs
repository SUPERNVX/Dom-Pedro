import { readdir, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { extname, parse, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const DIR = fileURLToPath(new URL('..', import.meta.url));
const SRC = resolve(DIR, 'public');
const DST = resolve(DIR, 'public', 'optimized');

const CONFIG = {
  'exterior.webp': { maxWidth: 1920 },
  'interior.webp': { maxWidth: 1920 },
  'logo.jpeg': { maxWidth: 200 },
};

const DEFAULT_MAX_WIDTH = 1200;
const QUALITY = 80;

async function main() {
  if (!existsSync(DST)) await mkdir(DST, { recursive: true });

  const files = await readdir(SRC);
  const results = [];
  let totalOrig = 0;
  let totalOpt = 0;

  for (const file of files) {
    if (file === 'optimized') continue;
    const srcPath = resolve(SRC, file);
    const ext = extname(file).toLowerCase();
    if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) continue;

    const name = parse(file).name;
    const dstPath = resolve(DST, `${name}.webp`);

    const img = sharp(srcPath);
    const metadata = await img.metadata();
    const origWidth = metadata.width ?? 0;
    const origSize = metadata.size ?? 0;
    totalOrig += origSize;

    const cfg = CONFIG[file] ?? { maxWidth: DEFAULT_MAX_WIDTH };
    const targetWidth = Math.min(origWidth, cfg.maxWidth);

    const outImg = await img
      .resize(targetWidth, undefined, { fit: 'inside', withoutEnlargement: true })
      .rotate()
      .webp({ quality: QUALITY })
      .toFile(dstPath);

    totalOpt += outImg.size;

    const pct = ((outImg.size / origSize) * 100).toFixed(1);
    const origKB = (origSize / 1024).toFixed(0);
    const outKB = (outImg.size / 1024).toFixed(0);
    results.push(
      `${file.padEnd(20)} ${String(origWidth).padStart(5)}px → ${String(outImg.width).padStart(5)}px  ${origKB.padStart(5)} KB → ${outKB.padStart(5)} KB  (${pct}%)`
    );
  }

  console.log('\nOtimização concluída:\n');
  for (const r of results) console.log(r);

  const savedMB = ((totalOrig - totalOpt) / 1024 / 1024).toFixed(1);
  console.log(`\nTotal economizado: ${savedMB} MB`);
  console.log(`Destino: ${DST}`);
}

main().catch(console.error);

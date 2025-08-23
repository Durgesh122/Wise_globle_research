// Simple image generator using sharp
// Produces webp and avif variants at 400, 800, 1200, 1600 widths for each source in src/assets/images
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const srcDir = path.join(__dirname, '..', 'src', 'assets', 'images');
const outDir = path.join(__dirname, '..', 'public', 'assets', 'images');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const widths = [400, 800, 1200, 1600];

async function processImage(file) {
  const name = path.parse(file).name;
  const srcPath = path.join(srcDir, file);
  const img = sharp(srcPath);
  for (const w of widths) {
    const webpOut = path.join(outDir, `${name}-${w}.webp`);
    const avifOut = path.join(outDir, `${name}-${w}.avif`);
    await img.resize(w).webp({ quality: 80 }).toFile(webpOut);
    await img.resize(w).avif({ quality: 60 }).toFile(avifOut);
    console.log(`Generated ${webpOut} and ${avifOut}`);
  }
}

(async () => {
  const files = fs.readdirSync(srcDir).filter(f => /\.(png|jpe?g)$/i.test(f));
  for (const f of files) {
    try {
      await processImage(f);
    } catch (e) {
      console.error('Failed to process', f, e);
    }
  }
  console.log('Image generation complete');
})();

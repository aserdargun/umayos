import sharp from "sharp";
import { mkdir, writeFile, copyFile } from "node:fs/promises";
import { resolve } from "node:path";
process.env.XDG_CACHE_HOME ??= resolve(".cache");
await mkdir(process.env.XDG_CACHE_HOME, { recursive: true });
await mkdir("public/assets", { recursive: true });
await mkdir("public/fonts", { recursive: true });
const inventory = [];
for (const name of ["hero", "teacher", "archive"]) {
  const source = `design/originals/${name}.png`;
  for (const width of [480, 960, 1536]) {
    for (const format of ["avif", "webp"]) {
      const file = `public/assets/${name}-${width}.${format}`;
      const info = await sharp(source)
        .resize({ width, withoutEnlargement: true })
        .toFormat(format, { quality: format === "avif" ? 55 : 80, effort: 4 })
        .toFile(file);
      inventory.push({ file, ...info });
    }
  }
}
for (const width of [480, 956]) {
  for (const format of ["avif", "webp"]) {
    const file = `public/assets/hero-mobile-${width}.${format}`;
    const info = await sharp("design/originals/hero.png")
      .extract({ left: 580, top: 0, width: 956, height: 1024 })
      .resize({ width, withoutEnlargement: true })
      .toFormat(format, { quality: format === "avif" ? 55 : 80, effort: 4 })
      .toFile(file);
    inventory.push({ file, ...info });
  }
}
await copyFile("public/umay-icons/light/apple-touch-icon.png", "public/apple-touch-icon.png");
await copyFile("public/umay-icons/light/favicon.ico", "public/favicon.ico");
const socialText = Buffer.from(
  `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg"><rect width="605" height="630" fill="#0B1F3A"/><text x="151" y="110" fill="white" font-family="sans-serif" font-weight="500" font-size="33">UMAY OS</text><g font-family="sans-serif" font-size="43" font-weight="600" fill="white"><text x="54" y="275">Models change.</text><text x="54" y="340">Experience endures.</text><text x="54" y="405" fill="#20B8BE">Decisions remain human.</text></g><text x="54" y="558" fill="#ccd7e5" font-family="sans-serif" font-size="18">Unified Multi-Agent Advisor for Yield</text></svg>`,
);
const brandIcon = await sharp("public/umay-icons/dark/icon-128.png").resize(88, 88).png().toBuffer();
await sharp("design/originals/hero.png")
  .resize(1200, 800)
  .extract({ left: 0, top: 65, width: 1200, height: 630 })
  .composite([{ input: socialText }, { input: brandIcon, left: 48, top: 47 }])
  .png()
  .toFile("public/og-image.png");
await copyFile(
  "node_modules/@fontsource-variable/inter/LICENSE",
  "public/fonts/Inter-OFL.txt",
);
await writeFile(
  "design/optimized-assets.json",
  JSON.stringify(inventory, null, 2) + "\n",
);
console.log(
  `Created ${inventory.length} responsive derivatives, social image, selected UMAY icons and font license.`,
);

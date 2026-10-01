import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFile, readdir, stat, writeFile } from "node:fs/promises";

for (const file of [
  "index.html", "en/index.html", "404.html", "robots.txt", "sitemap.xml",
  "favicon.ico", "og-image.png", "apple-touch-icon.png",
  "data/synthetic-vibration-v1.csv", "fonts/Inter-OFL.txt",
  "staticwebapp.config.json",
]) {
  assert.ok((await stat(`dist/${file}`)).isFile(), `Missing artifact: ${file}`);
}
const config = JSON.parse(await readFile("dist/staticwebapp.config.json", "utf8"));
for (const theme of ["light", "dark"]) {
  const root = `dist/umay-icons/${theme}`;
  const manifest = JSON.parse(await readFile(`${root}/site.webmanifest`, "utf8"));
  assert.equal(manifest.name, "UMAY OS");
  assert.equal(manifest.start_url, "../../");
  assert.equal(manifest.scope, "../../");
  for (const file of ["icon-128.png", "favicon-32x32.png", "apple-touch-icon.png", "favicon.ico", ...manifest.icons.map(icon => icon.src)])
    assert.ok((await stat(`${root}/${file}`)).isFile(), `Missing icon: ${theme}/${file}`);
}
assert.equal(config.responseOverrides["404"].rewrite, "/404.html");
assert.equal(config.navigationFallback, undefined, "Unknown routes must return 404");
assert.equal(config.mimeTypes[".avif"], "image/avif");
assert.equal(config.mimeTypes[".csv"], "text/csv");
const assets = await readdir("dist/_astro");
for (const extension of [".js", ".css", ".woff2"])
  assert.ok(assets.some((file) => file.endsWith(extension)), `Missing ${extension} asset`);
const files = await readdir("dist");
for (const privatePath of [".git", ".env", "src", "scripts", "docs", "node_modules"])
  assert.ok(!files.includes(privatePath), `Private path in artifact: ${privatePath}`);

const git = (...args) => execFileSync("git", args, { encoding: "utf8" }).trim();
const commit = process.env.GITHUB_SHA ?? git("rev-parse", "HEAD");
assert.match(commit, /^[a-f0-9]{40}$/);
const release = {
  repository: "aserdargun/umayos",
  branch: process.env.GITHUB_REF_NAME ?? git("branch", "--show-current"),
  commit,
  builtAt: new Date().toISOString(),
  workflowRun: process.env.GITHUB_RUN_ID ?? null,
  scope: "Public manifesto website; no UMAY runtime or institution integration.",
};
await writeFile("dist/release.json", `${JSON.stringify(release, null, 2)}\n`);
console.log(`Static artifact verified; release commit ${commit}`);

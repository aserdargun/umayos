import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import { resolve } from "node:path";
import { content, sources } from "../src/data/site.ts";
import {
  firstMean,
  lastMean,
  percentageChange,
} from "../src/data/synthetic.ts";
function parity(a, b, path = "content") {
  if (Array.isArray(a)) {
    assert.ok(Array.isArray(b), path);
    assert.equal(a.length, b.length, path);
    a.forEach((item, i) => parity(item, b[i], `${path}[${i}]`));
  } else if (a && typeof a === "object") {
    assert.deepEqual(Object.keys(a), Object.keys(b), path);
    for (const key of Object.keys(a)) parity(a[key], b[key], `${path}.${key}`);
  } else {
    assert.equal(typeof b, typeof a, path);
    if (typeof b === "string") assert.ok(b.trim(), `${path} cannot be empty`);
  }
}
parity(content.tr, content.en);
assert.equal(content.tr.manifesto.principles.length, 8);
assert.equal(content.tr.scientist.steps.length, 6);
assert.ok(Math.abs(firstMean - 2.1) < 1e-12);
assert.ok(Math.abs(lastMean - 9.1 / 3) < 1e-12);
assert.ok(Math.abs(percentageChange - 44.44444444444444) < 1e-10);
assert.deepEqual(
  sources.map((s) => s.repo),
  [
    "https://github.com/aserdargun/aos",
    "https://github.com/aserdargun/ai-scientist",
  ],
);
let checked = 0;
for (const [file, locale] of [
  ["dist/index.html", "tr"],
  ["dist/en/index.html", "en"],
  ["dist/404.html", "tr"],
]) {
  const html = await readFile(file, "utf8");
  assert.ok(html.includes(`lang="${locale}"`));
  const ids = new Set(
    [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]),
  );
  assert.equal(
    ids.size,
    [...html.matchAll(/\bid="([^"]+)"/g)].length,
    `duplicate IDs in ${file}`,
  );
  for (const [, , value] of html.matchAll(/\b(href|src)="([^"]+)"/g)) {
    if (value.startsWith("http") || value.startsWith("data:")) continue;
    if (value.startsWith("#")) {
      assert.ok(ids.has(value.slice(1)), `${file}: missing ${value}`);
      checked++;
      continue;
    }
    const url = new URL(
      value,
      `https://umayos.org${locale === "en" ? "/en/" : "/"}`,
    );
    let target = resolve("dist", `.${url.pathname}`);
    if ((await stat(target)).isDirectory())
      target = resolve(target, "index.html");
    await stat(target);
    if (url.hash && !target.endsWith("404.html"))
      assert.ok(
        (await readFile(target, "utf8")).includes(`id="${url.hash.slice(1)}"`),
      );
    checked++;
  }
  for (const [, set] of html.matchAll(/\bsrcset="([^"]+)"/g))
    for (const candidate of set.split(",")) {
      const asset = candidate.trim().split(/\s+/)[0];
      await stat(resolve("dist", `.${asset}`));
      checked++;
    }
  assert.ok(
    !/https:\/\/(fonts\.googleapis|fonts\.gstatic|.*analytics)/.test(html),
  );
  assert.ok(!html.includes("SakanaAI"));
}
console.log(
  `Content parity, 8 principles, 6 steps, deterministic statistics, source identities, metadata and ${checked} local link/asset references passed.`,
);

// Keep the public site toolchain telemetry-free and usable in restricted clouds.
import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { readFile } from "node:fs/promises";
const require = createRequire(import.meta.url);
const packagePath = require.resolve("astro/package.json");
const pkg = JSON.parse(await readFile(packagePath, "utf8"));
const cliPath = resolve(
  dirname(packagePath),
  typeof pkg.bin === "string" ? pkg.bin : pkg.bin.astro,
);
process.env.ASTRO_TELEMETRY_DISABLED = "1";
process.argv[1] = cliPath;
await import(pathToFileURL(cliPath).href);

import { defineConfig } from "@playwright/test";
import { existsSync } from "node:fs";
const systemChromium =
  process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH ??
  (existsSync("/usr/bin/chromium") ? "/usr/bin/chromium" : undefined);
const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? "http://127.0.0.1:4327";
export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  workers: process.env.CI ? 2 : 3,
  reporter: [["list"]],
  use: {
    baseURL,
    launchOptions: { executablePath: systemChromium },
    trace: "retain-on-failure",
  },
  webServer: process.env.PLAYWRIGHT_BASE_URL ? undefined : {
    command:
      "node scripts/astro.mjs preview --host 127.0.0.1 --port 4327 --ignore-lock",
    url: "http://127.0.0.1:4327",
    reuseExistingServer: false,
    timeout: 30000,
  },
});

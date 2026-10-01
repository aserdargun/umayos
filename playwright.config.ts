import { defineConfig } from "@playwright/test";
import { existsSync } from "node:fs";
const systemChromium =
  process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH ??
  (existsSync("/usr/bin/chromium") ? "/usr/bin/chromium" : undefined);
export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  workers: process.env.CI ? 2 : 3,
  reporter: [["list"]],
  use: {
    baseURL: "http://127.0.0.1:4327",
    launchOptions: { executablePath: systemChromium },
    trace: "retain-on-failure",
  },
  webServer: {
    command:
      "node scripts/astro.mjs preview --host 127.0.0.1 --port 4327 --ignore-lock",
    url: "http://127.0.0.1:4327",
    reuseExistingServer: false,
    timeout: 30000,
  },
});

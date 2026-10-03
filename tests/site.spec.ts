import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

for (const theme of ["light", "dark"] as const) {
for (const width of [1440, 768, 390, 320]) {
  for (const locale of ["tr", "en"]) {
    test(`${locale} ${theme} at ${width}px: complete surface and preserved language state`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 960 });
      await page.emulateMedia({ colorScheme: theme });
      const errors: string[] = [];
      const failedAssets: string[] = [];
      page.on("pageerror", (error) => errors.push(error.message));
      page.on("console", (message) => {
        if (message.type() === "error") errors.push(message.text());
      });
      page.on("response", (response) => {
        if (response.status() >= 400)
          failedAssets.push(`${response.status()} ${response.url()}`);
      });
      await page.goto(locale === "tr" ? "/" : "/en/");
      await expect(page).toHaveTitle(/UMAY OS/);
      await expect(page.locator("html")).toHaveAttribute("lang", locale);
      await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
      await expect(page.locator("#umay-favicon")).toHaveAttribute("href", `/umay-icons/${theme}/favicon-32x32.png`);
      await expect(page.locator("h1 span")).toHaveCount(3);
      await expect(page.locator(".principles li")).toHaveCount(8);
      await expect(page.locator(".header nav a")).toHaveCount(5);
      await expect(page.locator(".hero-actions a")).toHaveCount(2);
      expect(
        await page
          .locator("h1")
          .evaluate((el) => el.scrollWidth <= el.clientWidth + 1),
      ).toBeTruthy();
      await page.locator(".hero-actions a").first().click();
      await expect(page).toHaveURL(/#manifesto$/);
      await page.locator(".header nav a").nth(1).click();
      await expect(page).toHaveURL(/#architecture$/);
      await page.locator('[data-view="teacher"]').click();
      await expect(page.locator("#panel-teacher")).toBeVisible();
      if (process.env.CAPTURE_THEME_EVIDENCE && locale === "tr" && [1440, 390].includes(width)) {
        await page.locator("#architecture").evaluate(el => el.scrollIntoView({ behavior: "instant", block: "start" }));
        await page.screenshot({ path: `test-results/${theme}-${width}-architecture.jpg`, type: "jpeg" });
      }
      await expect(page.locator("#panel-operation")).toBeHidden();
      await expect(page.locator("#panel-teacher li")).toHaveCount(5);
      await page.locator('[data-view="development"]').click();
      await expect(page.locator("#panel-development")).toBeVisible();
      await page.locator('[data-view="operation"]').click();
      await expect(page.locator(".rented")).toBeVisible();
      await expect(page.locator(".onprem .rented")).toHaveCount(0);
      await page.locator('[data-view="teacher"]').click();
      // Switching at an architecture anchor preserves that section and view.
      await page.locator("#architecture").evaluate((el) => el.scrollIntoView());
      await page
        .locator(`[data-language="${locale === "tr" ? "en" : "tr"}"]`)
        .click();
      await expect(page).toHaveURL(/view=teacher.*#architecture$/);
      await expect(page.locator('[data-view="teacher"]')).toHaveAttribute(
        "aria-selected",
        "true",
      );
      await page.locator('[data-step="2"]').click();
      await expect(page.locator("#step-panel-2")).toBeVisible();
      await expect(page.locator(".stats .positive")).toContainText(/44[.,]4%/);
      await page.locator('[data-direction="next"]').click();
      await expect(page.locator("#step-panel-3")).toBeVisible();
      await page.locator("#scientist").evaluate((el) => el.scrollIntoView());
      await page.locator(`[data-language="${locale}"]`).click();
      await expect(page).toHaveURL(/view=teacher.*step=4.*#scientist$/);
      await expect(page.locator("#step-panel-3")).toBeVisible();
      await page.locator('[data-step="5"]').click();
      await expect(page.locator('[data-direction="next"]')).toBeDisabled();
      await page.locator('[data-step="0"]').click();
      await expect(page.locator('[data-direction="previous"]')).toBeDisabled();
      await page.locator(".data-table summary").click();
      await expect(page.locator(".data-table tbody tr")).toHaveCount(6);
      await page.locator('.header nav a[href="#development"]').click();
      await expect(page).toHaveURL(/#development$/);
      await expect(page.locator(".source-title")).toHaveCount(2);
      await expect(page.locator('.foundation-link[href="https://github.com/aserdargun/aos"]')).toHaveCount(1);
      await expect(page.locator('.foundation-link[href="https://github.com/aserdargun/ai-scientist"]')).toHaveCount(1);
      await expect(page.locator('.foundation-link[href="https://swapp.org.tr/"]')).toHaveCount(1);
      await expect(page.locator('.resource-download')).toHaveAttribute('href', '/resources/umayos-implementation.md');
      for (const href of await page
        .locator(".source-title, .github, .closing a")
        .evaluateAll((links) => links.map((link) => link.getAttribute("href"))))
        expect(href).toMatch(/^https:\/\/github\.com\/aserdargun\//);
      for (const section of [
        "hero",
        "manifesto",
        "architecture",
        "scientist",
        "experience",
        "development",
        "closing",
      ]) {
        await page.locator(`#${section}`).scrollIntoViewIfNeeded();
        await page.waitForTimeout(80);
        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth + 1,
          ),
        ).toBeTruthy();
      }
      await page.locator("#closing").scrollIntoViewIfNeeded();
      await page.waitForFunction(() =>
        [...document.images].every(
          (img) => img.complete && img.naturalWidth > 0,
        ),
      );
      const accessibility = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      expect(accessibility.violations).toEqual([]);
      expect(errors).toEqual([]);
      expect(failedAssets).toEqual([]);
    });
  }
}
}

test("theme choice, icons and language survive reload and system changes", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.getByRole("button", { name: "Açık temaya geç" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await expect(page.locator("#umay-favicon")).toHaveAttribute("href", "/umay-icons/light/favicon-32x32.png");
  await expect(page.locator("#umay-apple-icon")).toHaveAttribute("href", "/umay-icons/light/apple-touch-icon.png");
  await expect(page.locator("#umay-manifest")).toHaveAttribute("href", "/umay-icons/light/site.webmanifest");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.emulateMedia({ colorScheme: "light" });
  await page.emulateMedia({ colorScheme: "dark" });
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.locator('[data-language="en"]').click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.getByRole("button", { name: "Switch to dark theme" }).focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect(page.locator("#umay-favicon")).toHaveAttribute("href", "/umay-icons/dark/favicon-32x32.png");
  await expect(page.locator("#umay-apple-icon")).toHaveAttribute("href", "/umay-icons/dark/apple-touch-icon.png");
  await expect(page.locator("#umay-manifest")).toHaveAttribute("href", "/umay-icons/dark/site.webmanifest");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
});

test("system theme remains live until the visitor chooses a theme", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.emulateMedia({ colorScheme: "dark" });
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
});

test("theme preference stays synchronized across tabs", async ({ page, context }) => {
  await page.goto("/");
  const other = await context.newPage();
  await other.goto("/en/");
  await page.getByRole("button", { name: "Karanlık temaya geç" }).click();
  await expect(other.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect(other.locator("#umay-favicon")).toHaveAttribute("href", "/umay-icons/dark/favicon-32x32.png");
  await other.close();
});

test("theme works when browser storage is unavailable", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, "localStorage", { get() { throw new DOMException("Storage blocked", "SecurityError"); } });
  });
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/");
  await page.getByRole("button", { name: "Karanlık temaya geç" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  expect(errors).toEqual([]);
});

test("language preserves explicit section during programmatic scrolling and follows manual scroll", async ({ page }) => {
  await page.goto("/?view=teacher#architecture");
  await expect(page.locator('[data-view="teacher"]')).toHaveAttribute("aria-selected", "true");
  // Simulate an intermediate viewport during an anchor animation/layout shift.
  await page.locator("#manifesto").evaluate(el => el.scrollIntoView({ behavior: "instant" }));
  await page.waitForTimeout(250);
  await page.locator('[data-language="en"]').click();
  await expect(page).toHaveURL(/view=teacher.*#architecture$/);
  await page.locator("#manifesto").evaluate(el => el.scrollIntoView({ behavior: "instant" }));
  await page.mouse.wheel(0, 1);
  await page.waitForTimeout(250);
  await page.locator('[data-language="tr"]').click();
  await expect(page).toHaveURL(/view=teacher.*#manifesto$/);
});

test("keyboard controls, shareable state and reduced motion", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.locator(".skip-link")).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#main")).toBeFocused();
  await page.goto("/?view=teacher&step=3#architecture");
  await page.locator('[data-view="teacher"]').focus();
  await page.keyboard.press("ArrowRight");
  await expect(page.locator('[data-view="development"]')).toBeFocused();
  await expect(page.locator("#panel-development")).toBeVisible();
  await page.keyboard.press("Home");
  await expect(page.locator('[data-view="operation"]')).toBeFocused();
  await page.locator('[data-step="2"]').focus();
  await page.keyboard.press("End");
  await expect(page.locator("#step-panel-5")).toBeVisible();
  await expect(page.locator('[data-step="5"]')).toBeFocused();
  expect(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    ),
  ).toBe("auto");
  expect(
    await page
      .locator('[data-step="5"]')
      .evaluate((el) => getComputedStyle(el).fontSize),
  ).toBe("15px");
  await page.reload();
  await expect(page.locator("#step-panel-5")).toBeVisible();
});

test("all narrative and architecture remain readable without JavaScript", async ({
  browser,
}, testInfo) => {
  for (const theme of ["light", "dark"] as const) {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    colorScheme: theme,
    viewport: { width: 320, height: 900 },
    baseURL: testInfo.project.use.baseURL,
  });
  const page = await context.newPage();
  for (const path of ["/", "/en/"]) {
    await page.goto(path);
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator(`.header .brand-${theme}`)).toBeVisible();
    await expect(page.locator("[data-theme-toggle]")).toBeHidden();
    expect(await page.locator("body").evaluate(el => getComputedStyle(el).backgroundColor)).toBe(theme === "dark" ? "rgb(11, 31, 58)" : "rgb(255, 255, 255)");
    for (const id of ["panel-operation", "panel-teacher", "panel-development"])
      await expect(page.locator(`#${id}`)).toBeVisible();
    await expect(page.locator("[data-step-panel]")).toHaveCount(6);
    for (const panel of await page.locator("[data-step-panel]").all())
      await expect(panel).toBeVisible();
    await expect(page.locator('[data-controls="architecture"]')).toBeHidden();
    await page.locator(".hero-actions a").first().click();
    await expect(page).toHaveURL(/#manifesto$/);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth + 1,
      ),
    ).toBeTruthy();
  }
  await context.close();
  }
});

test("distribution, canonical metadata, synthetic source and true 404", async ({
  page,
  request,
}) => {
  for (const path of ["/", "/en/"]) {
    await page.goto(path);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      `https://umayos.org${path}`,
    );
    await expect(page.locator('link[hreflang="tr"]')).toHaveAttribute(
      "href",
      "https://umayos.org/",
    );
    await expect(page.locator('link[hreflang="en"]')).toHaveAttribute(
      "href",
      "https://umayos.org/en/",
    );
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
      "content",
      "https://umayos.org/og-image.png",
    );
  }
  for (const asset of [
    "/robots.txt",
    "/sitemap.xml",
    "/og-image.png",
    "/favicon.ico",
    "/apple-touch-icon.png",
    "/fonts/Inter-OFL.txt",
  ])
    expect((await request.get(asset)).status()).toBe(200);
  for (const theme of ["light", "dark"]) {
    const root = `/umay-icons/${theme}/`;
    const manifestResponse = await request.get(`${root}site.webmanifest`);
    expect(manifestResponse.status()).toBe(200);
    const manifest = await manifestResponse.json();
    expect(manifest.name).toBe("UMAY OS");
    expect(manifest.start_url).toBe("../../");
    for (const file of ["favicon.ico", "favicon-32x32.png", "apple-touch-icon.png", ...manifest.icons.map((icon: { src: string }) => icon.src)])
      expect((await request.get(`${root}${file}`)).status()).toBe(200);
  }
  const csv = await request.get("/data/synthetic-vibration-v1.csv");
  expect(await csv.text()).toContain("entirely synthetic");
  expect(
    (await csv.text()).split("\n").filter((line) => /^2026/.test(line)),
  ).toHaveLength(6);
  const pack = await request.get('/resources/umayos-implementation.md');
  expect(pack.status()).toBe(200);
  const markdown = await pack.text();
  for (const name of ['README', 'ARCHITECTURE', 'CONTRACTS', 'LEARNING', 'SCIENTIST', 'PLAN', 'START_HERE'])
    expect(markdown).toContain(`<!-- Source: docs/implementation/${name}.md -->`);
  expect(markdown).not.toContain('<!DOCTYPE html>');
  await page.goto('/');
  const downloadEvent = page.waitForEvent('download');
  await page.locator('.resource-download').click();
  const download = await downloadEvent;
  expect(download.suggestedFilename()).toBe('umayos-implementation.md');
  expect(await download.failure()).toBeNull();
  const response = await page.goto("/a-page-that-does-not-exist/");
  expect(response?.status()).toBe(404);
  await expect(page.locator("h1")).toHaveText("Bu sayfa bulunamadı.");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    "noindex",
  );
});

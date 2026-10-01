import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

for (const width of [1440, 768, 390, 320]) {
  for (const locale of ["tr", "en"]) {
    test(`${locale} at ${width}px: complete surface and preserved language state`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 960 });
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
      await expect(page.locator("h1 span")).toHaveCount(3);
      await expect(page.locator(".principles li")).toHaveCount(8);
      await expect(page.locator(".header nav a")).toHaveCount(3);
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
      await page.locator(".header nav a").nth(2).click();
      await expect(page).toHaveURL(/#development$/);
      await expect(page.locator(".source-title")).toHaveCount(2);
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
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 320, height: 900 },
  });
  const page = await context.newPage();
  for (const path of ["/", "/en/"]) {
    await page.goto(`http://127.0.0.1:4327${path}`);
    await expect(page.locator("h1")).toBeVisible();
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
    "/favicon.svg",
    "/apple-touch-icon.png",
    "/fonts/Inter-OFL.txt",
  ])
    expect((await request.get(asset)).status()).toBe(200);
  const csv = await request.get("/data/synthetic-vibration-v1.csv");
  expect(await csv.text()).toContain("entirely synthetic");
  expect(
    (await csv.text()).split("\n").filter((line) => /^2026/.test(line)),
  ).toHaveLength(6);
  const response = await page.goto("/a-page-that-does-not-exist/");
  expect(response?.status()).toBe(404);
  await expect(page.locator("h1")).toHaveText("Bu sayfa bulunamadı.");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    "noindex",
  );
});

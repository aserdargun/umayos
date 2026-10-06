type Theme = "light" | "dark";
type IconKey = "iconLight" | "iconDark" | "srcsetLight" | "srcsetDark";
const button = document.querySelector<HTMLButtonElement>("[data-theme-toggle]");
let saved: Theme | null = null;
const valid = (value: string | null): value is Theme => value === "light" || value === "dark";
try {
  const value = localStorage.getItem("umayos-theme");
  if (valid(value)) saved = value;
} catch {}

/* The emblem is the page's largest image, so a hidden second <img> would be
   fetched anyway and double the critical path. Each artwork instead names both
   variants once and this rewrites src/srcset for the resolved theme. */
function applyIcons(theme: Theme) {
  for (const image of document.querySelectorAll<HTMLImageElement>("[data-icon-light]")) {
    const data = image.dataset as Record<IconKey, string | undefined>;
    const src = theme === "dark" ? data.iconDark : data.iconLight;
    if (src) image.src = src;
    const srcset = theme === "dark" ? data.srcsetDark : data.srcsetLight;
    if (srcset) image.srcset = srcset;
  }
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  const dark = theme === "dark";
  if (button) {
    button.hidden = false;
    const label = dark ? button.dataset.labelLight! : button.dataset.labelDark!;
    button.setAttribute("aria-label", label);
    button.title = label;
  }
  applyIcons(theme);
  for (const [id, file] of [
    ["umay-favicon", "favicon-32x32.png"],
    ["umay-apple-icon", "apple-touch-icon.png"],
    ["umay-manifest", "site.webmanifest"],
  ]) {
    const link = document.getElementById(id!) as HTMLLinkElement | null;
    if (link) {
      link.href = `/umay-icons/${theme}/${file}`;
      link.removeAttribute("media");
    }
  }
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", dark ? "#0B1F3A" : "#FFFFFF");
}

applyTheme(saved ?? "light");
button?.addEventListener("click", () => {
  saved = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  try { localStorage.setItem("umayos-theme", saved); } catch {}
  applyTheme(saved);
});
window.addEventListener("storage", (event) => {
  if (event.key !== "umayos-theme" && event.key !== null) return;
  saved = valid(event.newValue) ? event.newValue : null;
  applyTheme(saved ?? "light");
});

type Theme = "light" | "dark";
const preference = matchMedia("(prefers-color-scheme: dark)");
const button = document.querySelector<HTMLButtonElement>("[data-theme-toggle]");
let saved: Theme | null = null;
const valid = (value: string | null): value is Theme => value === "light" || value === "dark";
try {
  const value = localStorage.getItem("umayos-theme");
  if (valid(value)) saved = value;
} catch {}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  const dark = theme === "dark";
  if (button) {
    button.hidden = false;
    const label = dark ? button.dataset.labelLight! : button.dataset.labelDark!;
    button.setAttribute("aria-label", label);
    button.title = label;
  }
  document.getElementById("umay-favicon-dark")?.remove();
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

applyTheme(saved ?? (preference.matches ? "dark" : "light"));
button?.addEventListener("click", () => {
  saved = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  try { localStorage.setItem("umayos-theme", saved); } catch {}
  applyTheme(saved);
});
preference.addEventListener("change", () => {
  if (!saved) applyTheme(preference.matches ? "dark" : "light");
});
window.addEventListener("storage", (event) => {
  if (event.key !== "umayos-theme" && event.key !== null) return;
  saved = valid(event.newValue) ? event.newValue : null;
  applyTheme(saved ?? (preference.matches ? "dark" : "light"));
});

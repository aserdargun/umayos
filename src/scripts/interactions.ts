const views = ["operation", "teacher", "development"] as const;
type View = (typeof views)[number];
const params = new URLSearchParams(location.search);
let view: View = views.includes(params.get("view") as View)
  ? (params.get("view") as View)
  : "operation";
const requestedStep = Number(params.get("step"));
let step =
  Number.isInteger(requestedStep) && requestedStep >= 1 && requestedStep <= 6
    ? requestedStep - 1
    : 0;
const viewButtons = [
  ...document.querySelectorAll<HTMLButtonElement>("[data-view]"),
];
const stepButtons = [
  ...document.querySelectorAll<HTMLButtonElement>("[data-step]"),
];
const architecturePanels = [
  ...document.querySelectorAll<HTMLElement>("[data-architecture-panel]"),
];
const stepPanels = [
  ...document.querySelectorAll<HTMLElement>("[data-step-panel]"),
];
const previous = document.querySelector<HTMLButtonElement>(
  '[data-direction="previous"]',
);
const next = document.querySelector<HTMLButtonElement>(
  '[data-direction="next"]',
);
let activeSection = location.hash.slice(1);
let intendedSection = activeSection;
let scrollTimer: ReturnType<typeof setTimeout>;
function rememberSection(section: string) {
  activeSection = section;
  intendedSection = section;
  clearTimeout(scrollTimer);
}
// Anchor animations and layout changes must not replace an explicit selection.
// Start following the visible section again when the visitor scrolls themselves.
const followScroll = () => { intendedSection = ""; };
window.addEventListener("wheel", followScroll, { passive: true });
window.addEventListener("touchmove", followScroll, { passive: true });
window.addEventListener("keydown", (event) => {
  if (event.defaultPrevented || !["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "].includes(event.key)) return;
  const target = event.target;
  if (target instanceof Element && (target.closest("input, textarea, [contenteditable]") || (event.key === " " && target.closest("button, summary")))) return;
  followScroll();
});
window.addEventListener("pointerdown", (event) => {
  if (event.clientX >= document.documentElement.clientWidth) followScroll();
});
window.addEventListener("scroll", () => {
  clearTimeout(scrollTimer);
  scrollTimer = setTimeout(() => {
    if (intendedSection) return;
    const probe = (document.querySelector("header")?.getBoundingClientRect().height ?? 0) + 60;
    const section = [...document.querySelectorAll<HTMLElement>("main section[id]")].find(el => {
      const rect = el.getBoundingClientRect();
      return rect.top <= probe && rect.bottom > probe;
    });
    if (section) activeSection = section.id;
  }, 180);
}, { passive: true });
document.querySelectorAll<HTMLAnchorElement>('a[href*="#"]').forEach(link => link.addEventListener("click", () => {
  const target = new URL(link.href).hash.slice(1);
  if (document.querySelector(`main section[id="${CSS.escape(target)}"]`)) rememberSection(target);
}));
window.addEventListener("hashchange", () => { rememberSection(location.hash.slice(1)); });
function updateUrl() {
  const url = new URL(location.href);
  if (view === "operation") url.searchParams.delete("view");
  else url.searchParams.set("view", view);
  if (step === 0) url.searchParams.delete("step");
  else url.searchParams.set("step", String(step + 1));
  history.replaceState({}, "", url);
}
function renderView() {
  viewButtons.forEach((button) => {
    const selected = button.dataset.view === view;
    button.setAttribute("aria-selected", String(selected));
    button.tabIndex = selected ? 0 : -1;
  });
  architecturePanels.forEach((panel) => {
    panel.hidden = panel.dataset.architecturePanel !== view;
    panel.setAttribute("role", "tabpanel");
    panel.setAttribute(
      "aria-labelledby",
      `tab-${panel.dataset.architecturePanel}`,
    );
  });
}
function renderStep() {
  stepButtons.forEach((button) => {
    const selected = Number(button.dataset.step) === step;
    button.setAttribute("aria-selected", String(selected));
    button.tabIndex = selected ? 0 : -1;
  });
  stepPanels.forEach((panel) => {
    panel.hidden = Number(panel.dataset.stepPanel) !== step;
    panel.setAttribute("role", "tabpanel");
    panel.setAttribute(
      "aria-labelledby",
      `step-tab-${panel.dataset.stepPanel}`,
    );
  });
  if (previous) previous.disabled = step === 0;
  if (next) next.disabled = step === 5;
  const count = document.querySelector("[data-step-count]");
  if (count) count.textContent = `${step + 1} / 6`;
}
function tabKeyboard(
  event: KeyboardEvent,
  buttons: HTMLButtonElement[],
  select: (button: HTMLButtonElement) => void,
) {
  if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;
  const current = buttons.indexOf(event.currentTarget as HTMLButtonElement);
  const index =
    event.key === "Home"
      ? 0
      : event.key === "End"
        ? buttons.length - 1
        : (current + (event.key === "ArrowRight" ? 1 : -1) + buttons.length) %
          buttons.length;
  const button = buttons[index];
  if (button) {
    event.preventDefault();
    select(button);
    button.focus();
  }
}
const selectView = (button: HTMLButtonElement) => {
  view = button.dataset.view as View;
  rememberSection("architecture");
  renderView();
  updateUrl();
};
const selectStep = (button: HTMLButtonElement) => {
  step = Number(button.dataset.step);
  rememberSection("scientist");
  renderStep();
  updateUrl();
};
if (viewButtons.length && stepButtons.length) {
  document.documentElement.classList.add("enhanced");
  document
    .querySelectorAll<HTMLElement>("[data-controls]")
    .forEach((control) => (control.hidden = false));
  renderView();
  renderStep();
  viewButtons.forEach((button) => {
    button.addEventListener("click", () => selectView(button));
    button.addEventListener("keydown", (event) =>
      tabKeyboard(event, viewButtons, selectView),
    );
  });
  stepButtons.forEach((button) => {
    button.addEventListener("click", () => selectStep(button));
    button.addEventListener("keydown", (event) =>
      tabKeyboard(event, stepButtons, selectStep),
    );
  });
  previous?.addEventListener("click", () => {
    step = Math.max(0, step - 1);
    rememberSection("scientist");
    renderStep();
    updateUrl();
  });
  next?.addEventListener("click", () => {
    step = Math.min(5, step + 1);
    rememberSection("scientist");
    renderStep();
    updateUrl();
  });
}
document
  .querySelectorAll<HTMLAnchorElement>("[data-language]")
  .forEach((link) =>
    link.addEventListener("click", () => {
      const destination = new URL(link.href);
      const current = new URL(location.href);
      destination.search = current.search;
      // Use the intended section while a smooth anchor scroll is still moving.
      // A deliberate user scroll resumes visible-section tracking.
      destination.hash = activeSection;
      if (destination.hash === "#hero") destination.hash = "";
      link.href = destination.href;
    }),
  );
window.addEventListener("popstate", () => {
  const state = new URLSearchParams(location.search);
  const candidate = state.get("view");
  view = views.includes(candidate as View) ? (candidate as View) : "operation";
  const number = Number(state.get("step"));
  step =
    Number.isInteger(number) && number >= 1 && number <= 6 ? number - 1 : 0;
  renderView();
  renderStep();
});

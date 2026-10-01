# UMAY OS editorial redesign, 1 October 2026

User scope: improve the complete interface, make it more impressive; retain the
selected UMAY icon set and both themes. Seven fresh built-in Image Gen section
references are in `concepts/v2/`. They are design references, never raster UI.
The implementation direction was selected within the authorized redesign;
these references have not been presented as a user-approved final brand.

## Composition and system locked before implementation

- True white light surface, navy `#0B1F3A` dark surface; teal `#20B8BE` on navy
  and accessible ink teal `#087B80` on white. Dark panels `#142C4A`.
- Local Inter Variable: 700 headings, 400 body, 550 controls. Desktop h1 first
  two lines about 101px at 1536px, third 78px; English scales to preserve unbroken
  statements. H2 74px, signature titles 84–92px; body 17–19px, tabs 15px, captions 13px. Phone h1 fits
  three statements, h2 36px, body 16px, touch targets at least 44px.
- Maximum content 1400px, desktop gutters 56px, phone 20px. Section padding
  100–112px desktop / 68px phone. Hairline separators and open editorial rows.
- 8px radius on buttons, diagram nodes and one evidence sheet; no nested cards.
- Header: original 48px profile + UMAY bold / OS regular, three existing nav
  links, language links, theme control, GitHub. Theme stays visible on phones.
- Hero: distinct text and sculpture columns, no text crossing image. Existing
  optimized glass artwork, edge mask only, no tint. Filled white primary action,
  outlined secondary. Existing Linux note plus a down arrow to the manifesto.
- Manifesto: 35/65 asymmetry, sticky title at desktop, eight open numbered rows;
  single column on mobile. Navy quote bridge, last statement teal.
- Architecture: split heading/intro; numbered three-tab rail; human above the
  full-width Core, three descendants below (Scientist / SWAPP / local knowledge).
  Rented GPU outside the local boundary. Teacher/development retain five-stage
  native flows. Original teacher artwork remains the section bridge.
- Scientist: large title, then 40/60 notebook composition. Left intro, six tabs,
  narrative and previous/next; right chart, horizontal statistics, evidence
  fields and actual HTML table disclosure. Mobile stacks the columns.
- Experience: oversized thesis next to the unchanged white archive image;
  three open product columns and a five-stage rail with square markers.
- Development: three open status columns, large indices, source pins and a
  four-stage uncompleted roadmap. No dates or completion badges invented.
- Closing: two-line thesis plus white GitHub action, original dark profile at
  up to 440px on the right. No second copy of the hero sculpture.
- Native SVG icons: arrow, human, flask, application grid, database, cloud;
  24–40px, stroke 1.7, currentColor, rounded joins. Brand stays byte-preserved.
- Motion: small entrance of hero copy/media and hover arrow movement; reduced
  motion disables animation/transition. No scroll-hidden narrative content.

## Canonical copy and necessary corrections to generated references

`src/data/site.ts` remains the exact TR/EN content authority. Above the fold,
the allowed inventory is existing brand, nav, language/theme labels, GitHub,
three thesis statements, description, two CTAs and Linux note. No eyebrow.

Generated extra navigation, search icons, invented logos, abbreviated source
pins and invented technical claims are excluded. The actual original profile
replaces generated approximations. The accessible teal on white differs from
bright generated teal for WCAG contrast. Existing full body paragraphs and
method provenance take priority over truncations or wording drift in concepts.
Section indices are the sole new visible copy, localized from existing section
names. The dark variant maps semantic surfaces while original artwork keeps
its own navy/white photographic background. JS-free content remains complete.

## Interaction contract

Architecture tabs and six Scientist steps work with click, arrows, Home/End;
URL view/step and language section preservation remain intact. Theme defaults
to OS preference and remembers manual choice. The real synthetic CSV, six-row
table and deterministic 44.4% calculation remain accessible. No runtime or
equipment execution is implied. Validate current desktop and 320/390/768px,
both languages/themes, keyboard, reduced motion and JS-free presentation.

## Prompt set

Built-in Image Gen was used, not the CLI. All prompts specified the seven-section
set, the system above, exact canonical content, native HTML/SVG controls, no
fake claims or decorative hero badges. Hero referenced the original glass
sculpture and original dark icon; experience referenced the original archive;
closing referenced the original dark icon. Manifesto requested a 35/65 numbered
editorial list, architecture a human/Core/three-module diagram, Scientist a
question/evidence notebook, development an open source/status/roadmap table.
The first Scientist output invented branding and evidence details and was
rejected; a fresh strict-copy reference replaced it before implementation.

Visual comparison findings and final evidence are recorded after browser QA.

## Browser fidelity ledger

Fresh concept/render pairs were inspected with `view_image`, not solely from
DOM checks. IAB screenshots were taken at the concepts' native 1536×1024;
320×900 English and 390×844 Turkish were checked in IAB too. The normal desktop
viewport is restored for handoff. Existing automated acceptance additionally
covers 1440/768/390/320, both languages/themes, JS-free and reduced-motion modes.

| Comparison | Evidence and final result |
| --- | --- |
| Hero copy / nav / actions | DOM inventory matches all three thesis statements, canonical description, two CTAs, Linux note and three nav labels exactly. Zero hero eyebrows or badges. |
| Hero composition | Separate columns remove the old image/text overlap. Initial title was too small; first statements enlarged to ~101px, with responsive English scaling. Sculpture has an edge mask, no tint. |
| Manifesto rhythm | Sticky left thesis and eight open numbered rows match the reference's asymmetry. Full canonical paragraphs require more height than the compressed generated list; readability takes priority. |
| Architecture / icons | Human above full-width Core, three peer modules below, original profile and coherent native engineering icons. GPU stays outside local boundary. Mobile side spine fixes misleading sequential links. |
| Scientist hierarchy | Question and evidence sit side by side, statistics in a native row. A too-tall chart was widened to 900×275; section title and question scale enlarged. Exact six points and 44.4% calculation retained. |
| Experience / assets | Original archive on white, emphasized second statement, open three-column method comparison and square-marker rail. Title enlarged after comparison to restore the reference's visual priority. |
| Development / status | Three editorial columns and exact real source pins replace generated placeholder commits. Roadmap markers are unfilled because this is a plan, not claimed completion. |
| Closing / brand | Original supplied profile replaces generated approximation; final image reaches 440px, thesis 92px, filled GitHub action. Closing height enlarged so the final composition fills a desktop viewport. |
| Palette / containers | True white and navy retained. Ink teal on white is deliberately darker for contrast. No fake runtime chrome, extra nav, invented logos or nested card grids. |
| Responsive / motion | English Development tab overflow at 320px fixed with stacked tab indices. Entrance and smooth scrolling gated by enhancement; JS-free anchor delay fixed. Reduced motion remains immediate. |

The selected production design system, rather than generated factual errors,
was the comparison authority. Deliberate deviations are the real three-link
header, exact original icon, complete canonical content, accessible teal,
correct source pins and uncompleted roadmap. Headline/control sizes are locked
in the active system. No unresolved clipping, overflow or placeholder asset
was observed in the final inspected surfaces. Temporary comparison screenshots
are removed after review; the selected user-facing preview remains an artifact.

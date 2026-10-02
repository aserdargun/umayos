# UMAY OS — brand-led editorial redesign

2 October 2026. Scope: the complete Turkish/English publication and 404 page,
preserving the supplied Umay Ana icons and the existing light/dark palette.
This direction is selected within the requested implementation; it is not a
claim of user acceptance. V1/V2 references remain as history.

## Content audit and design contract

The complete source inventory is `src/data/site.ts`: three hero statements,
eight manifesto principles, three architecture views, six Scientist steps,
three knowledge products, five review stages, two pinned repositories, three
development columns, four roadmap stages and the closing statement. All of
these remain available in both languages and without JavaScript. Source-review
dates, repository pins and synthetic data are not changed by a visual redesign.

The existing layout gives too little prominence to the original cultural mark,
omits Scientist and Experience from primary navigation, makes the eight
principles a long narrow list, and crowds the six-step controls into the left
half of the evidence area. The new composition addresses those four problems.

## Design system, established before implementation

- Colors: navy `#0B1F3A`, turquoise `#20B8BE`, pure white `#FFFFFF`;
  ink teal `#087B80` on white for contrast. Dark panels `#142C4A`, rules
  `#425A73`, muted copy `#B8C7D9`. No new brand color or recolored icon.
- Local Inter Variable. Hero first two statements about 88–100px at a 1440px
  desktop; the third has a quieter 40–48px scale. Major section headings
  56–86px. Body 16–18px; labels 12px; controls 14–15px. Responsive English
  sizing keeps all three statements legible without horizontal overflow.
- Content max 1360px; desktop gutters 64px, tablet 32px, phone 20px.
  Section spacing 112px desktop, 68px phone. Fine rules, open lists, intentional
  white space, 4px control corners, one evidence sheet. No nested card grids.
- Existing line icons retain their metaphors, `currentColor`, 1.7px stroke,
  rounded joins and 24–40px sizing. Buttons use the existing native SVG arrow.
- Header: original profile, wordmark, five direct section links, TR/EN,
  theme toggle and GitHub. Compact widths use a second navigation row.
- Hero: navy split composition, two oversized thesis statements (second teal),
  quieter third statement, existing description, turquoise primary CTA and
  outlined secondary. The original dark Umay Ana PNG sits inside two fine
  circular rules. This is decorative CSS framing, not a replacement logo.
  No badge, eyebrow or made-up metric. The Linux note remains at the baseline.
- Manifesto: wide heading with introductory statement alongside; eight open
  numbered entries in two columns (row-major reading order), one on mobile.
  Larger navy quote bridge gives the page a clear change of pace.
- Architecture: three strongly selected tabs; light grid within the on-prem
  boundary, original Core icon, human permission above Core, three peer
  modules below, rented GPU outside. Teacher/development remain native five
  stage flows. The existing teacher illustration remains a smaller bridge.
- Scientist: heading and description above a full-width six-step navigation
  rail. Active question and navigation on the left; larger chart, three
  statistics, evidence and native data disclosure on the right. The exact
  fixture remains `[2.0, 2.2, 2.1, 2.5, 3.2, 3.4]` and change is +44.4%.
- Experience: wide heading; original archive artwork on the left, three
  knowledge products as open numbered rows on the right; review stages below.
- Development: three clearly separated editorial status columns and pinned
  source rows, followed by an uncompleted four-stage roadmap.
- Closing: oversized two-line statement, turquoise GitHub CTA, original mark
  on navy. Footer exposes all five sections and a localized back-to-top link.
- 404: oversized outlined 404, original theme-aware mark, bilingual recovery
  links within the same global visual system.

## Copy and asset authority

`src/data/site.ts` is authoritative over generated concept wording. Above the
fold the only copy is the brand, five section links, TR/EN/theme/GitHub, the
existing three statements, description, two actions and Linux note. Newly
exposed navigation labels reuse existing section names. Footer recovery copy
is localized. All original PNG/ICO files stay byte-identical.

Seven new built-in Image Gen references cover the seven sections. They are
design references only, never runtime backgrounds or rasterized controls.
Any approximated logo, shortened paragraph, incorrect chart point, invented
navigation or illegible text is replaced by the exact source content. Bright
teal text on white uses the existing accessible ink teal. Those corrections
are deliberate fidelity constraints, not product changes.

## Interaction and verification contract

Preserve theme/system preference, cross-tab storage, blocked-storage handling,
favicon/manifest selection, architecture/Scientist keyboard navigation,
shareable URL state, locale/section preservation and JS-free narrative.
Header section tracking should show the current section with an underline and
`aria-current="location"`. A thin reading-progress line is decorative only.
Motion must respect reduced-motion preferences and must never hide content.

Use IAB for real visual and interaction inspection. Run existing Astro,
content and browser regression checks for both themes/languages and
1440/768/390/320px. Inspect final concept/render pairs, record intentional
differences and any repaired mismatches. Do not claim runtime, deployment,
field integration or user acceptance from these website checks.

## Visual verification

Completed on 2 October 2026 against this worktree's local IAB preview at
`http://127.0.0.1:4322/`. All seven references and corresponding browser captures
were opened with `view_image`. The composition, typography, palette, original
assets, content density and responsive behavior were compared; this is a
visual fidelity review, not a claim of pixel identity or user acceptance.

| Section | Reference | Final browser capture | Observed result / intentional difference |
| --- | --- | --- | --- |
| Hero | [hero.png](concepts/v3/hero.png), 1487×1058 | `hero.jpg` | Oversized navy/teal thesis, two actions and circular profile framing match the selected direction. Original Umay Ana asset replaces the generated approximation. Full existing description and Linux note remain. |
| Manifesto | [manifesto.png](concepts/v3/manifesto.png), 1159×1358 | `manifesto.jpg` | Wide title/intro and eight open numbered principles. Row-major order keeps visual, DOM and mobile reading order aligned. Complete source paragraphs make the section taller than the shortened concept. |
| Architecture | [architecture.png](concepts/v3/architecture.png), 1536×1024 | `architecture.jpg` | Split heading, strong selected tab, gridded local boundary, central Core and external GPU column. Existing engineering icons and exact role boundaries replace generated approximations. |
| Scientist | [scientist.png](concepts/v3/scientist.png), 1435×1096 | `scientist.jpg` | Full-width six-step rail, question at left, chart/evidence at right. The six real fixture values replace the concept's incorrect samples; all provenance and caveats remain. |
| Experience | [experience.png](concepts/v3/experience.png), 1469×1071 | `experience.jpg` | Wide heading, archive left, three open knowledge rows right, five review stages below. Original archive retains its quieter white composition and full explanations. |
| Development | [development.png](concepts/v3/development.png), 1435×1096 | `development.jpg` | Three status columns, outlined indices and four uncompleted roadmap stages. Exact repository owners and full reviewed SHAs replace the concept's invented addresses and pins. |
| Closing | [closing.png](concepts/v3/closing.png), 1933×814 | `closing.jpg` | Navy statement, turquoise action, original profile and expanded footer. The 1360px content limit keeps wide displays readable rather than stretching to the raster's full width. |

Final captures are retained as local review artifacts in
`/Users/aserdargun/.codex/visualizations/2026/10/02/01a0faec-5008-7aa1-a914-c08482ed8c4b/umayos-v3/`.
The browser viewport was set to each reference's native dimensions; the native
IAB capture may omit the browser scrollbar gutter. Additional phone captures
are `mobile-hero.jpg` and `mobile-chart.jpg` at 390 CSS pixels.

Corrections made after comparison: enlarged section/knowledge headings,
strengthened the architecture title accent, removed duplicated anchor spacing,
rebalanced the evidence panel, introduced a taller mobile chart coordinate
system to separate axis labels, and widened the English Development tab at
320px. No unresolved clipping or overlapping controls were observed in the
tested states. Small text on white uses ink teal for contrast, while dark
surfaces retain the original bright turquoise.

IAB exercised header navigation, language/theme changes, architecture keyboard
selection, Scientist steps, data disclosure and the mobile 404 recovery link.
Astro checked 29 files with zero errors/warnings/hints; the static build,
123-reference content check and all 24 existing browser tests passed. The
final English tab-width adjustment was then rebuilt and its four 320/390px
light/dark flows passed again. See [validation](../docs/VALIDATION.md).

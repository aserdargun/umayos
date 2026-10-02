# UMAY OS design system — editorial V3

The active direction is [REDESIGN_V3.md](REDESIGN_V3.md), dated 2 October 2026.
Seven section references are in `concepts/v3/`; the exact built-in Image Gen
briefs are in [IMAGE_PROMPTS_V3.md](IMAGE_PROMPTS_V3.md). Earlier concepts and
V2 documentation remain historical references.

## Color, type and geometry

Keep the supplied palette: navy `#0B1F3A`, turquoise `#20B8BE`, white `#FFFFFF`.
Text on white uses accessible ink teal `#087B80`. Dark surfaces use `#142C4A`
panels, `#061528` Core, `#B8C7D9` muted text and `#425A73` rules. The original
light/dark Umay Ana PNG/ICO files are unchanged.

Local Inter Variable; headings 700, body 400, controls 550–650. Hero reaches
100px (English 80px), with a quieter final statement. Section headings reach
72–86px; closing 92px. Body is 16–18px, labels 12–13px, desktop Scientist tabs
15px. Mobile type sizes and chart geometry are separate responsive rules.

1360px maximum content; 64px desktop gutters, 32px tablet, 20px phone.
112px section spacing desktop, 68px phone. Open numbered rows, fine rules,
4px controls and one evidence sheet. Section anchors account for the section's
internal padding so titles arrive just below the sticky navigation.

## Composition

- Header: unchanged profile/wordmark; all five sections; language, theme and
  GitHub controls. Selected section uses `aria-current`; a decorative reading
  line tracks the page. Phone navigation scrolls horizontally where needed.
- Hero: oversized thesis on navy; second statement and primary action teal.
  Original Umay Ana profile inside two fine circular borders. No raster mockup,
  invented hero label, status or metric. Linux note stays at the baseline.
- Manifesto: wide title/intro, eight open two-column principles in row-major
  reading order; single column on phones. Navy statement band follows.
- Architecture: three full-width tabs with a strong selected state; subtle
  on-prem grid, human permission above Core, three peer descendants below,
  rented GPU outside the boundary. The original teacher artwork is retained.
- Scientist: full-width six-step rail, question on the left, evidence on the
  right. Both chart layouts use the same six synthetic source samples. Native
  SVG viewBoxes are 900×220 desktop and 520×290 phone; axes/labels never stretch.
  The HTML data table, source, method, alternatives and missing evidence remain.
- Experience: large heading, original archive image at left, three numbered
  knowledge rows at right, five-stage review line beneath.
- Development: three open status columns, outlined indices, exact source pins,
  and a roadmap whose markers make no claim of completed acceptance.
- Closing: large thesis, turquoise GitHub action, original profile. Footer has
  all five section links, localized back-to-top and the public-narrative note.
- 404: large outlined number, bilingual recovery actions, shared site chrome.

## Interaction and accessibility

Native SVG engineering icons retain their original geometry and stroke. Theme
follows the system until a manual choice and synchronizes icons/manifests,
reloads, languages and tabs. Blocked browser storage remains supported.

Architecture and Scientist controls retain arrows, Home/End, URL state and
locale/section preservation. All narrative and architecture views remain
available without JavaScript. Small entrance/hover motion respects reduced
motion; there is no scroll-hidden content. See `REDESIGN_V3.md` and
`../docs/VALIDATION.md` for the actual visual and automated evidence.

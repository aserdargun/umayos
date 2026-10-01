# UMAY OS design system — editorial V2

The active design is the complete seven-section redesign in
[REDESIGN_V2.md](REDESIGN_V2.md), with fresh section references in `concepts/v2/`.
The first-generation references remain in `concepts/` as design history.

## Palette and type

Light: pure white `#FFFFFF`, navy text `#0B1F3A`, accessible teal `#087B80`.
Dark: navy `#0B1F3A`, text `#EEF4FB`, panel `#142C4A`, deep Core `#061528`,
muted `#B8C7D9`, rules `#425A73`, teal `#20B8BE`. Hero, teacher bridge,
Scientist and closing keep their navy identity in both themes.

Inter Variable is served locally with Latin and Latin Extended subsets. Native
headings use weight 700, body 400 and controls 550. At 1536px the hero reaches
101.4px (80px maximum in English), with the last statement at 77% of that size.
Section titles reach 74px; manifesto and Scientist 84px; experience and closing
92px. Tablet and phone use separate scales. All three hero statements remain
unbroken in TR/EN. Body is 17–19px desktop and 16px phone; captions 12–14px;
Scientist desktop tabs 15px. Controls never inherit browser defaults.

## Layout and geometry

Content is at most 1400px with 56px gutters, 24px on tablets and 20px on phones.
Sections use 104px padding, 76px tablet and 68px phone. Buttons and diagram
nodes have 8px corners; marker squares have 2–4px corners. Open editorial rows,
hairline rails and one evidence sheet replace repetitive card grids.

- Header is sticky: exact Umay Ana profile, UMAY bold / OS regular, three
  navigation links, TR/EN, theme control and GitHub. Small phones use two rows.
- Hero text and glass sculpture occupy separate grid columns. The cropped
  responsive image has an edge mask only. No tinted overlay or hero eyebrow.
- Manifesto has a sticky left title and eight numbered rows at right. On tablets
  and phones the title and list stack. The quote bridge ends in teal.
- Architecture has a numbered tab rail, human above Core and three peer modules
  below. The rented GPU stays outside the on-prem boundary. Phone peers connect
  through a side spine, avoiding a misleading Scientist-to-SWAPP sequence.
- Scientist is a question/evidence notebook. Intro, six steps, narrative and
  previous/next sit left; chart, calculations, provenance, uncertainty and
  actual data-table disclosure sit right. The chart uses a 900×275 native SVG
  canvas with the unchanged six synthetic points. Mobile stacks the notebook.
- Experience uses the original archive image on white, three open knowledge
  columns and a five-stage rail. Development has three open status columns,
  full source pins and an undated roadmap with unfilled markers.
- Closing gives the unchanged original profile its own column, alongside the
  thesis and a filled GitHub action. Footer keeps the navy band.

## Assets, interaction and accessibility

The actual light/dark UMAY Ana icon files from the supplied set are used without
redrawing or recoloring. Their provenance is in `brand/`. Original glass artwork
keeps its own background. Section concepts are never shipped as product UI.
Directional arrows and five engineering icons are native SVG, currentColor,
1.5–1.7px strokes with rounded joins. Focus rings are 3px; controls target at
least 44px. Both themes follow the existing OS/manual/persisted preference
contract, including blocked storage and cross-tab changes.

Architecture and Scientist tabs support arrows, Home/End, shareable URL state
and language preservation. Content stays complete without JavaScript.
Entrance motion only activates after enhancement; native JS-free anchors are
instant. Reduced motion disables animations, transitions and smooth scrolling.
No diagram, synthetic sample or status column implies accepted UMAY runtime.

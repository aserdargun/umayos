# Verification record

## Current editorial V3 redesign — 2 October 2026

Executed locally in `/Users/aserdargun/.codex/worktrees/bff7/umayos` on macOS,
Node **22.23.1**, npm **10.9.8**, Astro **7.3.5**, Playwright **1.63.0**.
The redesign covers the complete Turkish/English publication and shared 404
page. Source review dates, pins, synthetic data and advisory boundaries remain
unchanged. All 42 tracked icon-set files and the root favicon/Apple assets have
no Git diff.

| Check | Result |
| --- | --- |
| `npm ci` | Passed; lockfile unchanged |
| `npm run check` | 29 files; zero errors, warnings or hints |
| `npm run build` | Passed; `/`, `/en/`, `/404.html` generated |
| `npm run test:content` | Passed; TR/EN parity, eight principles, six steps, source identities, exact statistics and **123 local references** |
| `npm run test:e2e` | **24/24 passed**, 50.6 seconds after the responsive chart correction |
| Final narrow English tab adjustment | Rebuilt; content check and all four EN light/dark flows at 320/390px passed again, 19.1 seconds |
| Original branding | 42 icon-set files, root favicon and Apple icon unchanged; original light/dark assets used throughout |
| IAB visual review | Seven concept/render pairs plus 390px TR and 320px EN inspection; native source text and artwork take precedence over generated approximations |
| Local preview | `http://127.0.0.1:4322/`; listener cwd verified as this worktree |

The existing regression suite covers both languages, both themes and
1440/768/390/320px, axe scans, console/page errors, local assets, horizontal
overflow, architecture and Scientist controls, language/section/URL state,
theme persistence/system/cross-tab/blocked-storage behavior, keyboard,
reduced motion, JavaScript-disabled content and a true HTTP 404.

IAB additionally exercised section links and their active indicator, theme and
language changes, architecture keyboard selection, Scientist next/previous and
data disclosure, and the 320px bilingual 404 recovery. Visual inspection found
and corrected duplicated anchor spacing, small section headings, crowded
phone chart labels and an English 320px tab label. The final compact SVG uses
the same six samples and retains its accessible HTML table.

The full comparison ledger, reference links, capture location and deliberate
differences are in [REDESIGN_V3.md](../design/REDESIGN_V3.md). These are local
website checks. Production identity and acceptance are verified separately
through [DEPLOYMENT.md](DEPLOYMENT.md); no UMAY runtime was tested.
Safari/Firefox, screen-reader and Lighthouse testing were not performed.

## Historical records

The entries below describe earlier runs and their environment at that time.
The V3 record above supersedes their layout and asset descriptions; earlier
missing-icon or hosting statements do not describe the current local site.

### Local theme and Azure release preparation — 1 October 2026

**1 October 2026, macOS:** Node **22.23.1**, npm **10.9.8**, Astro **7.3.5**, Playwright **1.63.0**. `npm ci`, asset generation, `npm run validate` and `npm run prepare:release` passed. Astro checked 26 files with zero errors/warnings/hints; content checks verified 140 local references; **24 browser tests passed** across TR/EN, light/dark and 1440/768/390/320px. Both themes passed the existing axe accessibility and console/asset checks. Reload/language persistence, live system preference, cross-tab synchronization, blocked storage, keyboard and both JavaScript-disabled themes were exercised.

The first Linux CI run exposed a language/scroll race: a paused anchor animation could replace the explicitly selected architecture section with an intermediate manifesto section. A new regression reproduced it against the first Azure release (`8c9db4a`), then passed locally after the fix. Explicit section choices now survive programmatic scrolling; wheel/touch/keyboard/scrollbar input resumes visible-section tracking. The full corrected local suite passed 24/24. CI and deployment runners are pinned to Ubuntu 24.04.

The selected icon set's 42 copied files matched the source bytes before the two manifest names were adapted to UMAY OS; PNG/ICO assets remain unchanged. Navbar/footer/favicon/Apple/manifest and the social card use those profiles. IAB directly exercised the theme toggle; desktop/mobile screenshots were reviewed. White reading surfaces change to navy in dark mode; original navy hero/narrative bands and white photographic compositions retain their intended backgrounds. Layout, headline, navigation labels, Inter typography, section order and conceptual artwork remain intact; the requested mark and theme control are the visible additions. Mobile keeps theme/language controls and the closing GitHub link.

Deployment settings and live verification commands: [DEPLOYMENT](DEPLOYMENT.md). This record describes the executed local checks; Azure `Ready`, workflow result and `/release.json` must be checked together for each production release. Custom DNS, device installation and UMAY runtime acceptance are separate.

## Initial cloud site acceptance (historical snapshot)

Date: **1 October 2026**. Linux cloud environment; Node **24.19.0**, npm **11.9.0**, Astro **7.3.5**, Playwright **1.63.0**, system Chromium **151.0.7922.173** (Debian 13). Browser/IAB automation plugin was not available in this session, so the explicitly permitted Playwright Chromium fallback was used. Development and built-static preview were both exercised. No UMAY runtime or model provider was started.

## Acceptance results

| Check | Result | Scope |
| --- | --- | --- |
| `npm ci` | Passed | Frozen lockfile installation; saved install script reproduced setup |
| `npm run assets` | Passed | Three original Image Gen assets → 22 AVIF/WebP variants, OG card, provisional Apple icon and font license; repeated successfully |
| `npm run check` | Passed | 24 files; zero errors, warnings or hints |
| `npm run build` | Passed | Static Turkish, English and real 404 pages; no server adapter |
| `npm run test:content` | Passed | TR/EN structure, eight principles, six steps, exact source identities, deterministic math, unique IDs and 122 local link/asset references |
| `npm run test:e2e` | Passed | **11 passed**, no failed/skipped/disabled tests; three workers, approximately 41 seconds |
| `npm start` / `npm run stop` | Passed | Background start on 127.0.0.1:4321; repeated start retains the PID; status and logs work; stop releases the port and removes the lock; repeated stop succeeds; restart serves TR/EN with HTTP 200 and matching lang attributes |
| Page identity / nonblank / overlay | Passed | Correct titles/lang, real narrative and controls; no framework error overlay |
| Console / assets | Passed | No application console/page errors or failed local asset requests in the tested flows |
| Accessibility | Passed in tested states | axe-core WCAG 2 A/AA and WCAG 2.1 AA scan returned zero violations for both languages at all four widths; manual keyboard/focus and reduced-motion checks passed |
| Publication / DNS / HTTPS | **Unrun** | Hosting has not been selected; no DNS, paid resource or public deployment operation was performed |
| UMAY runtime / SWAPP acceptance | **Unrun** | Outside the public narrative website; upstream source inventory is not runtime acceptance |

Widths: **1440, 768, 390, 320 CSS pixels**. Eight TR/EN flow tests plus keyboard/shareable-state, JavaScript-disabled content, and distribution/404 tests. The test server uses 127.0.0.1:4327 and is owned and stopped by Playwright. Development server uses this project's free port 4321. Other projects' processes were not stopped.

Additional final browser review exercised all six example panels and axe-scanned all three architecture views in both languages at 320px: six scans, zero violations. Ten final hero screenshots cover both languages at the four requested widths and the 1536×1024 native desktop reference size. Section and mobile evidence screenshots were also inspected. The Codex browser-panel open request returned `queued`; this confirms the request was queued, not that the panel was visibly opened. The development server remained available after restart.

## Interaction evidence

Hero → Manifesto → Architecture; Operation → Teacher → Development → Operation. Human/on-prem boundary and rented GPU separation checked. At the Teacher view, switch language → same architecture section and selected Teacher view. Scientist Calculation → Next/Hypotheses → switch language → same Scientist section, `view=teacher` and `step=4`. Source CSV and six table rows checked; first/last step navigation boundaries verified. Keyboard uses Tab/skip link, Enter, Left/Right, Home/End; focus and selected panels update. Shared query state survives reload. JS disabled: all three architecture views and all six example narratives remain readable in TR and EN. Unknown route returns actual **HTTP 404** and the custom page.

Source/GitHub links use the real aserdargun repositories and exact reviewed pins. Native Git read access and pin equality were checked; this is not a claim of browser HTTP status for every external destination. The public source target is [aserdargun/umayos](https://github.com/aserdargun/umayos). Anonymous GitHub repository metadata confirms its public visibility. Source publication is separate from deployment of the website.

## Problems found and corrected

- Astro telemetry attempted to write to an unavailable user config directory. `scripts/astro.mjs` disables telemetry before loading the official CLI; no certificate, checksum or package verification was disabled.
- Astro 7 auto-backgrounding caused the test webServer process to exit early. Test preview now uses documented `--ignore-lock` on its own free port so Playwright owns the foreground process. Only the preview/dev processes created by this task were stopped.
- A language click during a smooth anchor scroll could select the previously visible section. The language switch now retains the intended section while scrolling and updates after natural scroll settles.
- Native button color did not inherit the navy section's light text, producing a 1.27:1 contrast failure. Explicit inherited button color fixes it; the same axe assertion then passed without disabling checks.
- Hero cover-fit clipped part of the sculpture. Contain-fit and edge masks preserve the silhouette without a color overlay.
- Sticky-header and anchor margins duplicated the offset. One scroll-padding offset now keeps section headings visible.
- Diagram branch connectors were detached from the Core row; a dedicated connector grid row now aligns them.
- Phone SVG labels shrank with the chart viewBox. Larger mobile SVG text retains readable dates/values, with an accessible HTML data table available.
- Mobile `srcset` widths were normalized to their real 480/956-pixel derivative widths; duplicated oversized descriptors were removed.
- Native-size reference comparison exposed an overly narrow desktop container and undersized hero title/art/actions. The container is now 1400px, Turkish hero title 88px at 1536px, art 1060px, and primary hero controls 250×62px; phone overrides retain their tested sizes.

## Visual comparison ledger

All nine Image Gen section/mobile references and three originals were inspected with `view_image`; final browser screenshots were inspected against those references. Desktop reference native size **1536×1024** was also captured. Required acceptance widths use 1440×960, 768×960, 390×844 and 320×900. Mobile reference files are 853×1844 design renders of an approximately 390-pixel layout; comparisons use the implemented 390 CSS-pixel view rather than treating their raster pixel width as a tablet breakpoint.

| Observation | Reference → implementation / correction |
| --- | --- |
| Typography | Three unbroken thesis lines in both languages; local Inter and explicit control type. Navy/teal hierarchy retained; English longest line sized to fit 320px. Turkish diacritics checked. |
| First viewport | Quiet brand/nav/language/GitHub header, left thesis/actions, right modular sculpture. No generated hero eyebrow, fake metrics or UI. Clipped art and dev toolbar were removed. |
| Section rhythm | Navy hero → white numbered manifesto → navy quote → open architecture → conceptual workspaces → navy evidence section → white archive/status → navy closing. No repeated boxed-card grid. |
| Palette and media | Exact navy/teal/white tokens, accessible darker teal on white. Artwork uses edge fades, no hero color wash. White archive retains clean edges and shadows. Mobile crop preserves the sculpture. |
| Architecture | Core dominates a single boundary, rented GPU stays outside. Mobile uses readable vertical HTML nodes instead of shrinking the desktop diagram. Teacher progression ends in human promotion/registry and contains no live GUI authority path. |
| Evidence surface | Chart is SVG, text/controls and source fields are HTML. Numbers come from the shared deterministic fixture, not Image Gen. Phone chart labels enlarged; statistics, alternative and missing-evidence fields remain readable. |

Intentional differences: original Umay Ana icon was unavailable, so a wordmark and provisional typographic U are used; it was not redrawn. Reference hallucinations (unrelated source URLs, extra navigation, people, finished-product claims) were corrected to the user's source/content requirements. Longer provenance, role boundaries and method explanation extend some sections beyond their simplified concept viewport; the complete HTML narrative remains visible by scrolling. Closing reuses the hero production asset. These limitations are explicit rather than presented as pixel-identical artwork or completed brand acceptance.

## Boundaries and retained configuration

`install_script` and `start_skill` were saved successfully in the cloud environment draft. The install steps were executed on the current machine and startup was stopped/restarted and verified. Saving is not publication or a fresh-task validation. Static site startup requires no additional secrets or runtime variables. Docs HTTP was blocked by proxy policy; equivalent official documentation was read through its public Git source. An optional Cloudflare preview tunnel was blocked by the restricted egress proxy; required Cloudflare domain access was saved in a configuration draft, but no public preview URL was established.

No Lighthouse/performance score is claimed. axe results do not constitute complete WCAG certification; screen reader, Safari and Firefox testing was not performed. Remaining brand action: supply the selected original Umay Ana icon assets for navbar/favicon/Apple/social-card integration. Hosting, DNS/HTTPS and UMAY runtime acceptance remain separate future work.

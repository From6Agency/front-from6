---
name: FROM 6 AGENCY
description: Paper ground, Ink text and one blue Signal; a single Archivo family set heavy and narrow for headings, upright for text; hairlines, square surfaces, pill buttons, a code-drawn two-lane illustration (desktop) and two short door bands on the first screen, three real marks as proof; the public site of Franck Berthelot's advisory, investment and Darix activity in English and French.
colors:
  ink: "#000000"
  paper: "#FFFFFF"
  fog: "#F2F2F0"
  line: "#E3E3DF"
  steel: "#6E6E68"
  signal: "#2233E8"
  signal-soft: "#6B7CFF"
  signal-wash: "#EDEFFE"
  dark-fog: "#141414"
  dark-line: "#2C2C2C"
  dark-steel: "#A0A09A"
  destructive: "#B42318"
typography:
  display:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "4rem"
    fontWeight: 700
    lineHeight: 0.98
    letterSpacing: "-0.03em"
    fontVariation: "'wdth' 92"
  door-heading:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "3.25rem"
    fontWeight: 700
    lineHeight: 0.95
    letterSpacing: "-0.03em"
    fontVariation: "'wdth' 92"
  headline:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "3.5rem"
    fontWeight: 700
    lineHeight: 1.04
    letterSpacing: "-0.03em"
    fontVariation: "'wdth' 92"
  band-title:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "2.5rem"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.03em"
    fontVariation: "'wdth' 92"
  company-name:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.03em"
    fontVariation: "'wdth' 92"
  title:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.75rem"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "-0.03em"
    fontVariation: "'wdth' 92"
  door-question:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 400
    lineHeight: 1.25
    letterSpacing: "normal"
  lead:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 400
    lineHeight: 1.625
    letterSpacing: "normal"
  body:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.625
    letterSpacing: "normal"
  ui:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: "normal"
  meta:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.375
    letterSpacing: "normal"
    fontFeature: "'tnum'"
  label:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: "0.06em"
  flow-label:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: "0.05em"
rounded:
  none: "0px"
  pill: "9999px"
spacing:
  base: "8px"
  gutter: "24px"
  gutter-md: "40px"
  header-inset: "12px"
  header-inset-md: "16px"
  door: "16px"
  door-md: "20px"
  door-active: "36px"
  door-inactive: "12px"
  flow-lane-gap: "56px"
  mark-row: "24px"
  mark-row-md: "40px"
  row: "16px"
  section-header: "32px"
  section: "64px"
  section-md: "96px"
  home-top: "96px"
  home-top-md: "112px"
  page-top: "112px"
  page-top-md: "144px"
  page-bottom: "80px"
  page-bottom-md: "112px"
  band: "80px"
  band-md: "112px"
  footer: "56px"
components:
  button-primary:
    backgroundColor: "{colors.signal}"
    textColor: "{colors.paper}"
    typography: "{typography.ui}"
    rounded: "{rounded.pill}"
    padding: "0 24px"
    height: "44px"
  button-primary-hover:
    backgroundColor: "{colors.ink}"
  button-primary-lg:
    backgroundColor: "{colors.signal}"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    padding: "0 28px"
    height: "48px"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.ui}"
    rounded: "{rounded.pill}"
    padding: "0 24px"
    height: "44px"
  button-inverted:
    backgroundColor: "{colors.signal}"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    padding: "0 28px"
    height: "48px"
  button-inverted-hover:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    padding: "0 28px"
    height: "48px"
  button-back:
    backgroundColor: "transparent"
    textColor: "{colors.steel}"
    typography: "{typography.ui}"
    rounded: "{rounded.pill}"
    padding: "0 16px"
    height: "44px"
  button-back-hover:
    backgroundColor: "{colors.fog}"
    textColor: "{colors.ink}"
  header-capsule:
    backgroundColor: "rgb(255 255 255 / 0.9)"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "8px 8px 8px 16px"
  header-capsule-md:
    backgroundColor: "rgb(255 255 255 / 0.9)"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "8px 12px 8px 24px"
  nav-link:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.ui}"
    rounded: "{rounded.none}"
    padding: "0"
  nav-link-active:
    textColor: "{colors.signal}"
  flow-hub:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    size: "48px"
  flow-hub-md:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    size: "72px"
  flow-node:
    backgroundColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    size: "13px"
  flow-node-active:
    backgroundColor: "{colors.signal}"
  flow-label:
    backgroundColor: "transparent"
    textColor: "{colors.steel}"
    typography: "{typography.flow-label}"
    rounded: "{rounded.none}"
    padding: "0"
  flow-label-active:
    textColor: "{colors.ink}"
  door-band:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.door-heading}"
    rounded: "{rounded.none}"
    padding: "20px 0"
  door-band-active:
    textColor: "{colors.signal}"
    padding: "36px 0"
  door-band-inactive:
    padding: "12px 0"
  mark-row:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "24px"
  mark-row-md:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "40px"
  mobile-door-bar:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "12px"
  pill-muted:
    backgroundColor: "{colors.fog}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "4px 10px"
  pill-solid:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "4px 10px"
  pill-outline:
    backgroundColor: "transparent"
    textColor: "{colors.steel}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "4px 10px"
  row:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "16px 0"
  closing-band:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.band-title}"
    rounded: "{rounded.none}"
    padding: "{spacing.band} 0"
  closing-panel:
    backgroundColor: "rgb(242 242 240 / 0.6)"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "32px"
  input:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "0 14px"
    height: "44px"
  choice-row:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "12px 16px"
  choice-row-selected:
    backgroundColor: "{colors.signal-wash}"
  form-card:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "24px"
  door-card:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "24px"
  footer:
    backgroundColor: "rgb(242 242 240 / 0.4)"
    textColor: "{colors.steel}"
    typography: "{typography.ui}"
    rounded: "{rounded.none}"
    padding: "{spacing.footer} 24px"
  cookie-sheet:
    backgroundColor: "rgb(255 255 255 / 0.95)"
    textColor: "{colors.steel}"
    typography: "{typography.ui}"
    rounded: "{rounded.none}"
    padding: "20px"
---

# Design System: FROM 6 AGENCY

## Overview

**Creative North Star: "Two Doors on Paper"**

The site is a white page set in black with one blue signature, and its first screen is a structure rather than a picture: a headline and its Steel lead on the left, a code-drawn illustration on the right (from md; phones show the headline, lead and bands alone) in which From 6 is the hub two named lanes leave from, and under both, two short full-width bands facing each other under a hairline, one for company leaders and one for founders. Each band carries the audience word at display size, one question and one Signal link; the four real steps of each path live on the illustration's lanes. Nothing on the ground is tinted; everything structural is Ink on Paper, Steel hairlines, Line dividers and Steel sentences. Signal blue appears exactly where a reader can act, and once more on the door under the pointer and its lane.

One typeface family does every job. Archivo, loaded as a variable font with its width axis, is set heavy and narrow for headings (weight 700, width 92 percent, tracking -0.03em) and upright at normal width for everything read. Dates, years and counters are set in tabular numerals. There is no second face, no mono, no serif, and no kicker or eyebrow above a heading: the heading opens its block alone.

Surfaces are square and bounded by 1px lines, buttons, pills, the hub and the nodes are full circles, and nothing casts a shadow or carries a gradient. The header is a floating Paper capsule detached from the viewport edge. Proof is one sober row of the three company marks, drifting a few pixels on scroll, straight on Paper, then three records side by side. The home has one black band and it is the closing call, not the hero. Motion is one orchestrated entrance on the first screen that ends with the illustration drawing itself, the door and lane hover pair, a continuous dot on each lane, the scroll-linked mark row, 150 to 300ms colour transitions, and reduced-motion fallbacks for all of it. Secondary pages inherit the type, the header and the footer, and otherwise keep the recipes of the previous build: PageHeader, SectionHeader, RowList, ClosingCTA and the multi-step form kit.

**Key Characteristics:**
- Eight neutrals and one accent, unchanged since the September kit: Signal is for the logo dot, links, buttons, the active door heading and its lane; Signal Soft is its form on black; Signal Wash is the selection and selected-row tint.
- One family, two settings: Archivo 700 at 92 percent width and -0.03em for every heading and the `.display` utility; Archivo 400 and 500 at normal width for sentences, UI and labels; `.tnum` on every number that lines up.
- Radius is 0 or a full circle. Bands, panels, inputs, records and the mobile menu are square; buttons, pills, radio marks, progress segments, the header capsule, the illustration's hub, nodes and travelling dot are round.
- No shadows and no gradients. Depth is a 1px hairline, a Fog panel, or the single black band at the end of the home.
- The first viewport is on Paper: intro left, illustration right from md, two short door bands under hairlines. The hover grammar is a pair: one band grows and turns Signal with its lane, the other band and lane fade.
- Illustration is drawn in code from the palette's own materials: Steel hairlines, Ink nodes, uppercase labels and the F6 Mark; no generated imagery.
- The header is a fixed Paper capsule at 90 percent with a blur, inset 12 to 16px from the edge, on every page; the mobile menu is a square Line-bordered panel beneath it.
- Proof is real material, never redrawn: the Darix mark, the MicePro logo in monochrome and the 6WAY wordmark, laid on Paper in one row without panel, caption or label.
- The logo is the kit's inline SVG in `currentColor`, lockup at 120px (mobile header), 136px (desktop header) and 140px (footer); the mark alone at 32px inside the illustration's hub (md and up).
- Every visible string is an EN/FR pair through `<T />`; English is server-rendered.

## Colors

The kit's twelve hex values, declared as `--f6-*` custom properties in `src/app/globals.css` and mapped to Tailwind names through `@theme inline` (`background`, `foreground`, `muted`, `muted-foreground`, `border`, `signal`, `signal-soft`, `signal-wash`, `hero-*`, `destructive`).

### Primary
- **Signal** (`#2233E8`): the single accent. Fill of every primary button (`Button`, `BookCallButton`, `PrimaryButton`, cookie accept, the mobile door bar's first action), colour of every text link (`ArrowLink`, the door calls, footer and nav hover, the active nav item, the cookie policy link, the inline contact link in `ClosingCTA`), the `Row` term on hover, the heading of the active door, the active lane's name, nodes and travelling dot in the illustration, the caret and `accent-color`, `::selection` through its wash, and the focus ring (`2px solid`, offset 3px). In forms it marks the state of an action in progress: selected choice border, filled progress segment, deposited file border, success disc.
- **Signal Soft** (`#6B7CFF`): Signal for black backgrounds. Shipping only through `DoorCard dark` and `nav-link-on-band`, neither of which is rendered on the current home; the closing band's links are buttons, so Signal Soft has no live instance today. Keep it for any future link on `.hero-section`.
- **Signal Wash** (`#EDEFFE`): selection highlight, the fill of a selected `ChoiceGroup` row and of a filled `FileDrop`.

### Neutral
- **Ink** (`#000000`): text and headings, the closing band, primary-button hover fill, solid pills, the border an outline button or card hovers to, the illustration's nodes and travelling dot at rest, the active lane's rail and step labels.
- **Paper** (`#FFFFFF`): the page, the header capsule (at 90 percent with blur), the mobile menu panel, the mobile door bar, the hub's fill and the 2px ring around each node, the ground the mark row sits on, inputs, the form card, the cookie sheet (at 95 percent with blur), text on Signal and on the band, inverted-button hover fill.
- **Fog** (`#F2F2F0`): muted pill fill, the hamburger and back-button hover fill; at 60 percent the inner-page closing panel and the captcha block; at 40 percent the footer. No Fog panel on the home since the proof figures were retired.
- **Line** (`#E3E3DF`): every divider. The capsule border, the `border-y` around the door pair and between the two doors, the rule above the company records, the `/` between EN and FR, row dividers, FAQ dividers, input strokes, unfilled progress segments, the `|` separators in the footer.
- **Steel** (`#6E6E68`): every supporting sentence and the illustration's drawing colour. The home lead and attribution line, roles and years, company descriptions, row definitions, FAQ answers, field hints, placeholders at 70 percent, the inactive language, footer links and group titles; in the illustration the stub, branch and rails, the lane names and step labels at rest, and the hub's ring at 60 percent.

### Band (dark inversion)
- **Dark Fog** (`#141414`): fill of a card on a black band (`DoorCard dark`, not rendered on the current home).
- **Dark Line** (`#2C2C2C`): border of a card on a black band (same status).
- **Dark Steel** (`#A0A09A`): the supporting sentence and the tertiary "Or a 30-minute call" line on the closing band.

### Semantic
- **Destructive** (`#B42318`): field error text and icon, invalid input border, the form alert (border at 30 percent, fill at 5 percent). Forms only.

### Named Rules
**The Signal Rule.** Signal is reserved for the logo dot, links, buttons, the heading of the active door with its lane (name, nodes, dot) and the state of an action in progress (focus ring, selected choice and its wash, filled progress track, deposited file, success disc). It never fills a background, colours a resting heading, tints an icon or decorates a rule. On black it becomes Signal Soft. Emphasis anywhere else is weight, size, Steel or position.

**The One Band Rule.** The home carries exactly one black band and it is the closing call. The first viewport is on Paper. A black band swaps the neutrals, not the logic: Ink becomes Paper, Steel becomes Dark Steel, the primary button stays Signal (`inverted`) and hovers to Paper on Ink, the secondary is a Paper-at-30 percent outline (`ghost`).

**The Steel Body Rule.** Any sentence that supports a heading is Steel, and so is any line that is drawn rather than written. Ink is for headings, questions, terms, the current step title, the nodes, and the strings the reader must not miss.

## Typography

**Display Font:** Archivo (with Helvetica Neue, Arial, sans-serif), variable, weights 100 to 900 and width 62 to 125, loaded through `next/font/google` with `axes: ["wdth"]` as `--font-archivo`
**Body Font:** the same Archivo at normal width
**Label/Mono Font:** none. Labels are Archivo 500; there is no monospace face. Numbers that must align use the `.tnum` utility (`font-variant-numeric: tabular-nums`).

**Character:** One grotesque family doing two jobs through its axes. Headings are set heavy and compressed from the global `h1` to `h6` rule (`font-weight: 700; font-stretch: 92%; letter-spacing: -0.03em`), which the `.display` utility repeats for display text outside a heading tag. Everything read sits at normal width and tracking in weight 400, UI strings in 500. Tracked uppercase text exists in two places only: the 11px `.label` at 0.06em inside pills, footer group titles and the illustration's lane names, and the illustration's step labels at 0.05em. Neither ever sits above a heading.

### Hierarchy
Sizes below are the large-screen values recorded in the frontmatter; the responsive steps are those built.
- **Display** (700, 2rem then 3.5rem at `md` then 4rem at `lg`, 0.98): the home `h1` in the left column beside the illustration, three lines in English and four in French at 1440 and 1280, `text-wrap: balance`.
- **Door Heading** (700, 2rem then 2.75rem at `md` then 3.25rem at `lg`, 0.95): the audience word of each door band, Ink at rest, Signal when the band is active.
- **Headline** (700, 2.25rem then 3.5rem at `md`, 1.04): inner-page `h1` via `PageHeader`, in a 48rem column.
- **Band Title** (700, 1.875rem then 2.5rem at `md`): the closing band `h2`; the inner `ClosingCTA` uses 1.5rem then 1.875rem.
- **Company Name** (700, 1.5rem then 1.875rem at `md`): the `h3` of each company record, with a status `Pill` beside it.
- **Title** (700, 1.5rem then 1.75rem at `md`, 1.25): section `h2` via `SectionHeader` and the home path heading.
- **Door Question** (400, 1.125rem then 1.25rem at `md` then 1.5rem at `lg`, 1.25): the one sentence beside the audience word, a paragraph at normal width so it reads as a question next to the heavy heading.
- **Lead** (400, Steel): the home lead is 0.875rem then 1.125rem at `md` with `leading-snug`, capped at 36rem; `PageHeader` leads are 1.125rem then 1.25rem at 1.625, capped at 42rem; `SectionHeader` leads are 1rem then 1.125rem.
- **Body** (400, 0.9375rem, 1.625): company descriptions, row definitions, FAQ answers, inputs. Row terms are 1rem at 500; FAQ questions are 1.0625rem at 500.
- **UI** (500, 0.875rem): buttons, nav links, arrow links, door calls, field labels, footer links; the language toggle is 0.75rem.
- **Meta** (400, 0.75rem then 0.875rem at `md`, tabular): roles and years under a company name, the attribution line (hidden below `md`), the `n/total` counter in forms.
- **Label** (500, 0.6875rem, 0.06em, uppercase, `.label`): pill text, footer group titles, the lane names "Companies" and "Founders" at the origin of each lane; the classifier at the top of the legacy `DoorCard` on the contact page.
- **Flow Label** (500, 0.6875rem, 0.05em, uppercase): the four step words under each lane's nodes, Steel at rest and Ink on the active lane; a 0.75rem / 0.08em phone setting exists in the component but is not rendered.
- **Step Title** (500, 1.125rem, normal tracking): the `StepRail` heading inside forms is the one `h2` that opts out of the heavy setting through `font-sans tracking-normal font-medium`.

### Named Rules
**The One Family Rule.** Archivo is the only typeface. Hierarchy comes from the axes, never from a second face: 700 at 92 percent width and -0.03em for headings, 400 and 500 at normal width for everything else. No mono, no serif, no system display face.

**The Tabular Rule.** Every date, year, counter, duration and episode number carries `.tnum` so columns and rows of figures hold still.

**The Heading Alone Rule.** No kicker, eyebrow or uppercase label sits above a page, section or door heading. Uppercase lives inside the object it classifies: a `Pill`, a footer column, a lane of the illustration.

## Layout

The home is one 72rem column (`max-w-6xl`, 1152px) with a 24px gutter (40px from `md`), opening 96px below the top (112px from `md`) so the headline sits just under the capsule header. The first screen is a grid, stacked below `lg` with a 32px gap (40px at `md`) and `[1fr 1.1fr]` at `lg` with a 56px gap, both columns vertically centred: intro left (headline, lead 20 to 24px below, attribution 12px below that), illustration right with 16px extra left padding. The illustration is `hidden md:block`: on phones the first screen is headline, lead and the two door bands, both inside a 664px viewport, and the mobile door bar appears once the bands leave the screen. The door pair sits 32px below (48px at `md`). Each door is a `lg` two-column grid `[1fr 2fr]`: audience word left, then a row with the question left and the Signal call pinned right at the baseline; below `lg` the three stack with an 8px gap (24px at `md`). Door padding is 16px vertical (20px at `md`); at `lg` the active door grows to 36px and the inactive one compresses to 12px.

The illustration is a hub and two lanes, rendered from `md`: hub (72px) left, a 32px Steel stub to a vertical branch bar, two 32px horizontal arms into the lanes, lanes stacked 56px apart, each a horizontal rail with its four nodes spread edge to edge and labels aligned start, centre, centre, end. The component also carries a phone layout (48px hub above two vertical columns) that is never shown.

Below the doors, `Section` adds 64px above (96px at `md`); the first home section forces 80px (112px at `md`) and holds the `SectionHeader`, the mark row and the three company records in the column. The mark row's clip box takes negative margins equal to the gutter (`-mx-6` / `-mx-10`) with matching padding, so it is viewport-wide and nothing overflows; 24px vertical padding (40px at `md`); marks in a shrink-to-content flex row, vertically centred, 24px apart on phones, 80px from `md` and 96px from `lg`; from `md` the row's scroll travel is the column's free width, so it starts flush right and ends flush left. The company records sit 24px below on a Line rule, 32px of top padding (40px at `md`), three columns at `md` with a 40px gap. The path block is `[2fr 3fr]` with the 4:5 portrait left. The closing band pads 80px vertically (112px at `md`), its inner grid `[1.2fr 1fr]`. The home body ends with 96px of bottom padding below `lg` so the fixed door bar never covers content.

Inner pages are wrapped in `Page`: gutter 24px (40px from `md`), top padding 112px (144px at `md`), bottom 80px (112px at `md`). Content column is 64rem by default, 48rem for form pages, 56rem for the Darix page, 72rem for portfolio-style pages. `PageHeader` caps the title at 48rem and the lead at 42rem. `Row` is a `md` three-column grid, term then definition spanning two, 16px vertical padding. The footer is 72rem wide with 56px vertical padding, four columns at `md`.

The header is fixed, inset 12px from the top and sides (16px from `md`), a 72rem capsule with 8px vertical padding, 16px left and 8px right padding (24px and 12px from `md`). Links sit 28px apart and appear at `lg`; below it a hamburger opens a square Paper panel 8px under the capsule. Breakpoints are Tailwind defaults (`sm` 640px, `md` 768px, `lg` 1024px). Spacing rhythm is base 8.

## Elevation & Depth

There are no drop shadows and no gradients. Depth is conveyed three ways: a 1px hairline separates and bounds (door bands, rows, FAQ items, the capsule, the mobile panel, inputs); a Fog panel marks a quieter region on inner pages (captcha, closing panel at 60 percent, footer at 40 percent); the single black band inverts the palette for the closing call. The three marks in the proof row sit directly on Paper with no panel or border. The capsule header and the cookie sheet float by translucency and `backdrop-blur-md`, not by shadow. Hover never raises anything: a heading turns Signal, a lane recolours, a border turns Ink, a link turns Ink or Signal, a fill turns Ink or Paper. The only `box-shadow` in the codebase is the 2px focus ring on form controls (Signal at 15 percent, 30 percent on choice rows and the file drop).

### Named Rules
**The No Shadow Rule.** No surface, band, button, sheet, capsule, node or image carries a shadow. If a surface needs an edge, give it a 1px hairline; if it needs weight, give it a Fog or Ink fill.

**The Colour Hover Rule.** Hover changes a colour, not a position or a shadow. The only transforms on hover are the 2 to 4px nudge of an arrow icon and the door pair, where the active band gains padding and the inactive one loses it and fades to 45 percent while its lane fades to 35 percent.

## Shapes

Zero or circle. Every container is a right-angled rectangle: door bands, company records, rows, FAQ items, the mobile menu panel, the mobile door bar, inputs, textareas, choice rows, file drop, alerts, the form card, the closing band and panel, the cookie sheet, the legacy `DoorCard`, and the portrait (a 4:5 image clipped square). Everything that is not a rectangle is a full circle (`9999px`): the header capsule, buttons, status pills, the 36px hamburger hit area, the illustration's hub (48 and 72px), its 13px nodes with a 2px Paper ring and its 7px travelling dot, the radio ring and dot, the 4px progress segments, the 28px file-remove button, the 48px success disc. `--radius` is `0px` and no intermediate radius exists in the tree.

Dividers are 1px solid Line; drawn lines in the illustration are 1px Steel (Ink on the active lane); the hub's ring is 1px Steel at 60 percent. Emphasis borders are 1px Ink on hover (outline buttons, the legacy card). The file drop is dashed Line when empty. Separators inside a line of text are glyphs in Line colour: `/` between EN and FR, `|` in the footer. Nothing is skewed, clipped diagonally or outlined in colour.

### Named Rules
**The Zero or Circle Rule.** A corner is square or the element is a pill. No 4, 8, 12 or 16px radius exists and none may be introduced.

**The Drawn in Code Rule.** An illustration is built from the palette's own materials, 1px Steel lines, Ink circles, uppercase labels and the official Mark, laid out with CSS. No generated imagery, no icon set, no third colour.

## Components

### Capsule Header (signature)
Fixed Paper capsule at 90 percent with `backdrop-blur-md`, 1px Line border, full radius, inset 12px (16px from `md`) from the top and sides, 72rem wide. Left: `LogoHorizontal` at 120px (136px from `md`) in Ink. Centre, from `lg`: five text links at 0.875rem 500, 28px apart, Ink, hover and `aria-current` in Signal (200ms). Right: the EN / FR toggle (0.75rem 500, tabular; active language Ink, inactive Steel, `/` in Line), the 36px Signal "Book a call" pill (hidden below `md`), and below `lg` a 36px round hamburger that hovers to Fog. Same chrome on every page, no scroll state. Open menu: a square Paper panel with a 1px Line border 8px under the capsule, rows at 1rem 500 divided by Line, active row Signal, then a Line-topped row with the 30-minute label in Steel and the Signal pill. While open, `html[data-menu-open="true"]` hides the mobile door bar.

### Flow Illustration (signature, desktop only)
`FlowIllustration`, `aria-hidden`, rendered from `md` only (`hidden md:block`) and driven by the same `active` state as the bands (`HeroDoors` owns it). Hub: a 72px circle on Paper with a 1px ring of Steel at 60 percent holding the F6 `Mark` at 32px. A 1px Steel stub leaves the hub 32px to the right to a 1px Steel branch bar, from which two lanes leave. Each lane: its name in `.label` Steel at the origin, a 1px Steel rail, four 13px Ink nodes with a 2px Paper ring, and a Flow Label under each node (Steel). The lanes are horizontal and 56px apart, nodes spread across the rail, and a 7px Ink dot travels each rail. The vertical two-column phone layout exists in the component but is not rendered, since the illustration is hidden below `md`. Active lane (`data-state="active"`): rail Ink, nodes and dot Signal, labels Ink, lane name Signal, 200ms; the other lane fades to 35 percent over 250ms. The Companies lane reads Quote, Contract, Invoice, Cash; the Founders lane Advisory, Involvement, Investment, Co-founding.

### Door Bands (signature)
Two full-width `Link` bands inside `.doors`, bounded by `border-y` Line and divided by one Line. Each band is short: audience word in Door Heading, one question in Door Question, the call as a 0.875rem 500 Signal inline link with a 16px arrow that nudges 4px on hover. Rest: both bands equal, 20px vertical padding at `md`. Active (pointer or focus, `data-state="active"` on the band, `data-active` on the pair): heading turns Signal (200ms) and the band grows to 36px vertical padding over 0.4s with the standard ease; the same state lights the lane above. Inactive sibling: compresses to 12px and fades to 45 percent over 0.25s. Without a script or pointer the two doors are equal and fully legible; the growth only runs from `lg`.

### Mark Row (signature)
`ProofStrip`, kept under its original file name, is a sober row of the three company marks between the `SectionHeader` and the records, sized by visual weight so the three read as equals: the Darix mark at 80px wide (140px from `md`), the MicePro logo at 120px (210px) in CSS `grayscale`, the 6WAY wordmark at 92px (160px), all real files with embedded origin in `public/portfolio`. A shrink-to-content flex row (`w-max`), vertically centred, gaps 24px on phones, 80px from `md`, 96px from `lg`, 24px vertical padding (40px at `md`), inside a viewport-wide `overflow-hidden` box made with negative gutter margins. Scroll-linked with `motion/react` `useScroll` and `useTransform` over the row's pass through the viewport (`start end` to `end start`). From `md` the whole row travels from the column's free width (inner width minus row width, measured at mount and on resize with a `ResizeObserver`) to 0, so it enters aligned right and leaves aligned left; on top of that each mark drifts at its own pace, Darix 24px to -16px, 6WAY 40px to -28px, MicePro 56px to -40px. Below `md` the row does not travel and the drifts are scaled by 0.35 (8 to -6px, 14 to -10px, 20 to -14px), set by the same measurement that gates the travel, so the last mark never crosses the screen edge on entry. Static under reduced motion. No panel, no caption, no label: `alt` texts are EN/FR pairs through the language context (English server-rendered) and the records below name the companies.

### Company Record
A plain `article` in a three-column grid on a Line rule 24px under the mark row: Company Name with a status `Pill` (solid for Active, outline otherwise), role and year in Meta Steel tabular, description in Body Steel filling the column, then one or two `ArrowLink`s (the Darix record links to `/darix`, each record links to its domain).

### Mobile Door Bar
Fixed bottom `nav` below `lg`, Paper with a 1px Line top, 12px padding plus the safe-area inset, a two-column grid of 44px pills: Signal "Companies" and outline "Founders". Visible from first paint when the bands sit below the fold, withdrawn (`translateY(100%)`, 0.35s) while the door pair intersects the viewport or the header menu is open, back once the bands scroll past. The cookie sheet moves up 72px while the bar is visible.

### Buttons
Pills, Archivo 500, colour transition 200ms (150ms in forms).
- **Shape:** fully round, height 44px with 24px horizontal padding at 0.875rem; large 48px with 28px padding at 1rem. Header and in-band compact variant: 36px tall, 16px padding.
- **Primary:** Signal fill, Paper text; hover Ink fill. `PrimaryButton` in forms adds a trailing arrow, a spinner while loading, 50 percent opacity disabled. `BookCallButton` is the same recipe with a 14 to 16px calendar icon.
- **Outline:** transparent with a Line border, Ink text; hover border Ink.
- **Inverted:** Signal fill, Paper text on the black band; hover Paper fill, Ink text.
- **Ghost:** on the black band, Paper-at-30 percent border and Paper text; hover border Paper. Also the compact tertiary "Book a slot" in the band.
- **Back:** no border, Steel text, 16px padding; hover Fog fill and Ink text.
- **Focus:** global `:focus-visible` ring, 2px solid Signal, offset 3px.

### Arrow Link
Inline 0.875rem 500 in Signal with a 16px `ArrowRight` (or `ArrowUpRight` when external) at stroke 2; hover turns the text Ink and nudges the arrow 2px (diagonally for external). The door call is the same recipe with a 4px nudge driven by the band's hover.

### Chips (Pill)
- **Style:** fully round, 4px by 10px padding, `.label` (500, 0.6875rem, 0.06em, uppercase).
- **Tones:** muted (Fog fill, Ink text), solid (Ink fill, Paper text, the "Active" status), outline (Line border, Steel text, "In build" or "Beta").

### Row List
`divide-y` and `border-y` Line. Each `Row` is a `md` three-column grid: term at 500 in Ink, definition in Body Steel spanning two columns, 16px vertical padding. Rows may be links; on hover the term turns Signal. Used for the Darix offer and recordings on the home, and for the inner pages.

### Cards / Containers
The home has no cards; its destinations are bands, records and the strip. The square card recipe survives on inner pages:
- **Corner Style:** square.
- **Background:** Paper with a 1px Line border; hover border Ink. No shadow, no lift.
- **Internal Padding:** 24px (28px from `md` on `DoorCard`, 32px from `sm` on `FormCard`).
- **DoorCard** (contact page only): the whole card is the link; `.label` classifier in Steel, title, Body copy, a Signal call with an arrow that nudges 4px. Its `dark` variant (Dark Fog, Dark Line, Signal Soft call) is defined but not rendered anywhere today.

### Inputs / Fields
Inherited from the previous build without change.
- **Style:** 44px tall, square, Paper fill, 1px Line border, 14px horizontal padding, 0.9375rem, placeholder Steel at 70 percent. Textarea min 112px, 10px vertical padding, resizable vertically.
- **Focus:** border to Signal plus a 2px ring of Signal at 15 percent, 150ms on border and shadow only.
- **Error / Disabled:** `aria-invalid` turns the border Destructive; message below in 0.75rem Destructive with a 14px `CircleAlert`. Disabled is 60 percent opacity, `not-allowed`.
- **Label:** 0.875rem 500 above; optional marker 0.75rem Steel right-aligned; hint 0.75rem Steel below.
- **ChoiceGroup:** exclusive options as square rows, 12px by 16px padding, native radio visually hidden; 16px ring (Steel at 50 percent, Signal when checked) with an 8px Signal dot scaling 0 to 1 in 150ms. Selected row: Signal border, Signal Wash fill, label at 500; hover on an unselected row turns the border Ink; keyboard focus shows a 2px ring of Signal at 30 percent.
- **FileDrop:** dashed Line row with an `Upload` icon, hover Ink; filled it becomes a Signal-bordered Signal Wash row with name, size and a round 28px remove button.
- **FormAlert:** square, Destructive border at 30 percent, fill at 5 percent, Destructive text.
- **CaptchaBlock:** Fog at 60 percent, 16px padding, a 1.125rem tabular sum and a 96px input.

### Multi-step Form Frame
Inherited. `FormCard` is the single square card (Paper, 1px Line, 24px then 32px padding); steps never nest a card inside it. `StepRail` above the pane: Step Title, `n/total` in tabular Steel, one 4px round Line track per step that fills with Signal by `scaleX` over 300ms. `StepPane` slides 28px in the direction of travel (240ms in, 140ms out at 60 percent distance) with opacity; reduced motion collapses the offset and shortens to 120 and 80ms. `SuccessCard` opens with a 48px Signal disc holding a Paper check that scales from 0.6 over 350ms, then the reference in tabular Ink.

### FAQ
Native `details/summary` in a Line row list. Question at 1.0625rem 500 with 20px vertical padding and a 16px `Plus` in Steel that rotates 45 degrees over 200ms when open. Answer in Body Steel, capped at 42rem, 24px bottom padding. Where the browser supports `interpolate-size`, the answer's height animates over 300ms. Content is in the HTML at load.

### Closing Call
Two treatments. Home: the one black band, `[1.2fr 1fr]`, Band Title in Paper, lead at 1.125rem in Dark Steel, then stacked large `inverted` and `ghost` pills for the two doors and a tertiary tabular line in Dark Steel with a 36px ghost "Book a slot". Inner pages (`ClosingCTA`): a square Fog-at-60 percent panel, 32px padding (48px at `md`), same grid, primary and outline large pills stacked, plus a Signal inline link underlined in Signal at 30 percent (offset 4px) that hovers to Ink.

### Footer
Fog at 40 percent with a 1px Line top, 72rem wide, 56px vertical padding. Four columns at `md`: `LogoHorizontal` at 140px in Ink over a 24ch Steel tagline, then three link groups titled in `.label` Steel with 0.875rem Steel links that hover Signal. Bottom row after a Line rule: copyright, LinkedIn, legal and privacy separated by `|` in Line colour.

### Cookie Consent
Fixed bottom sheet, 48rem, square, Paper at 95 percent with blur and a 1px Line border, no shadow; one outline pill and one Signal pill at 8px by 16px padding. Sits 72px higher while the mobile door bar is visible.

### Logo
`LogoHorizontal` and `Mark` in `src/components/brand/Logo.tsx` are the kit's official paths inlined as SVG with `fill="currentColor"`; they take the surrounding text colour (Ink on Paper, Paper on the band) and are never recoloured, rotated, shadowed or replaced by a bitmap. Lockup at 120px (mobile header, the minimum), 136px (desktop header) and 140px (footer); the mark alone at 32px inside the illustration's hub (22px in the unrendered phone layout), legible from 20px, default 28px.

### Motion
Standard easing is `--ease-out: cubic-bezier(0.16, 1, 0.3, 1)`; the one drawing ease is `cubic-bezier(0.65, 0, 0.35, 1)`. The first screen opens in CSS with one orchestrated entrance: `.anim-rise` (opacity plus 14px rise, 0.7s, `backwards`) on the headline, lead, attribution, illustration and door pair at `--delay` 0, 120, 200, 260 and 420ms; the final state is the default state, so nothing is missing without animation. Inside the illustration the stub and branch fade in at 420ms (0.4s), each rail draws over 1s from 520ms plus 260ms per lane (`draw-y` on phones, `draw` from `md`), each node pops (scale 0.4 to 1, 0.35s) from 700ms plus 260ms per lane plus 200ms per step, each label fades 80ms after its node, and from 1.8s (plus 3.5s on the second lane) a 7px dot travels each rail in a 7s linear loop, fading in over the first 6 percent and out over the last 6 percent (desktop only). The door and lane hover pair is described above (padding 0.4s, opacity 0.25s, colour 0.2s). The mark row is scroll-linked, not timed: across the row's pass through the viewport the row itself travels from the column's free width to 0 (from `md`), and each mark adds its own drift, Darix 24px to -16px, 6WAY 40px to -28px, MicePro 56px to -40px; below `md` there is no travel and the drifts run at 0.35 (8 to -6, 14 to -10, 20 to -14px). The mobile door bar slides 0.35s; the cookie sheet moves its `bottom` over 300ms. Colour transitions are 150ms in forms, 200ms on buttons, links, nav and the FAQ icon. Forms keep their `motion` transitions (step slide, progress fill, success disc). Under `prefers-reduced-motion` the entrance is removed, the illustration appears complete with no drawing and no travelling dot, the doors keep only opacity and colour, the mark row is static, the bar and the FAQ snap, and `motion` components fade without displacement.

## Do's and Don'ts

### Do:
- **Do** build every surface from Ink, Paper, Fog, Line and Steel; reach for Dark Steel, Dark Fog and Dark Line only inside `.hero-section`, and keep that band to the closing call.
- **Do** spend Signal only on the logo dot, text links, buttons, the active door heading with its lane, and in-progress form states; switch to Signal Soft for any link on black; hover a link to Ink and a primary button to Ink.
- **Do** set every heading through the global `h1` to `h6` rule (Archivo 700, `font-stretch: 92%`, -0.03em) or the `.display` utility, and every sentence, control and label in Archivo at normal width.
- **Do** put `.tnum` on every date, year, counter and duration.
- **Do** open the home with the headline and lead beside the code-drawn illustration (from md), then the two short door bands on Paper; open inner pages with `PageHeader` and every section with `SectionHeader`; the heading carries alone.
- **Do** draw any illustration from 1px Steel lines, Ink circles, uppercase labels and the official Mark, and let it share state with the element it explains.
- **Do** show proof as the companies' real marks laid straight on Paper in one row, in monochrome where a logo would bring a third colour, named by the records beneath and by `alt`.
- **Do** list things as `RowList` rows divided by Line.
- **Do** make every button a pill: 44px medium, 48px large, 36px compact, Archivo 500, primary / outline / inverted / ghost, hover by colour change only.
- **Do** keep the header as the Paper capsule at 90 percent with blur, inset from the edge, on every page.
- **Do** keep controls square with a 1px Line border, and show focus as a Signal border plus a 15 percent Signal ring.
- **Do** insert the logo as the inline SVG from `Logo.tsx` in `currentColor`, lockup at 120px or wider, mark at 20px or wider.
- **Do** ease motion with `cubic-bezier(0.16, 1, 0.3, 1)` (drawing with `cubic-bezier(0.65, 0, 0.35, 1)`), keep colour transitions between 150 and 300ms, make the final state the default state, and honour `prefers-reduced-motion` on anything that moves, loops or follows scroll.
- **Do** ship every visible string as an EN/FR pair through `<T en fr />`, English first in the HTML, in real business French.

### Don't:
- **Don't** use Signal as a background, a resting heading colour, an icon tint or a decorative rule; the only blue fills are buttons, form states, the logo dot and the active lane's nodes and dot.
- **Don't** introduce a gradient, a tinted grey, a second accent, an orb or a dark-mode theme; the black band is a local inversion, not a theme.
- **Don't** put a black band or a card grid in the first viewport; the home hero is Paper with intro, illustration and two door bands under hairlines.
- **Don't** add a drop shadow to anything, including the capsule, the cookie sheet, the door bar, the marks and the portrait; bound surfaces with a 1px hairline instead.
- **Don't** use any radius other than 0 or `9999px`: no `rounded-sm`, `rounded-md`, `rounded-lg`, `rounded-xl`, `rounded-2xl`.
- **Don't** place an uppercase label, kicker or eyebrow above a page, section or door heading.
- **Don't** load a second typeface; no Space Grotesk, no Inter, no mono, no serif, no system display face. Vary Archivo's weight and width instead.
- **Don't** recolour, rotate, outline, shadow, redraw or rasterise the logo; never set the horizontal lockup below 120px.
- **Don't** lift on hover: no translate, no scale, no shadow change on bands, buttons or rows; change padding (doors only), border or text colour instead.
- **Don't** generate, illustrate or redraw proof or imagery; show real marks and logos, in monochrome where a logo would bring a third colour, and draw diagrams in code.
- **Don't** put proof in a grey panel with a caption, nor pile up app screens; the mark row sits on Paper and the records name the companies.
- **Don't** use em or en dashes in visible copy (comma, colon, parentheses; `|` in SEO titles), rhythmic word triplets separated by periods, emojis, hype, or any invented client, figure, testimonial, certification or criterion.

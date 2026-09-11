---
name: FROM 6 AGENCY
description: Black, white and one blue Signal; Space Grotesk titles over Inter text, square surfaces bounded by 1px lines, for Franck Berthelot's advisory, investment and Darix activity in English and French.
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
    fontFamily: "Space Grotesk, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(2.75rem, 2.75rem + 1vw, 3.75rem)"
    fontWeight: 600
    lineHeight: 1.04
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Space Grotesk, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(2.25rem, 2rem + 1.5vw, 3.5rem)"
    fontWeight: 600
    lineHeight: 1.04
    letterSpacing: "-0.02em"
  band-title:
    fontFamily: "Space Grotesk, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1.875rem, 1.5rem + 1vw, 2.5rem)"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Space Grotesk, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1.5rem, 1.375rem + 0.5vw, 1.75rem)"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.02em"
  card-title:
    fontFamily: "Space Grotesk, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1.25rem, 1.125rem + 0.5vw, 1.5rem)"
    fontWeight: 600
    lineHeight: 1.375
    letterSpacing: "-0.02em"
  step-title:
    fontFamily: "Inter, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 500
    lineHeight: 1.375
    letterSpacing: "normal"
  lead:
    fontFamily: "Inter, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1.125rem, 1rem + 0.4vw, 1.25rem)"
    fontWeight: 400
    lineHeight: 1.625
    letterSpacing: "normal"
  body:
    fontFamily: "Inter, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.625
    letterSpacing: "normal"
  ui:
    fontFamily: "Inter, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: "normal"
  label:
    fontFamily: "Inter, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: "0.06em"
rounded:
  none: "0px"
  pill: "9999px"
spacing:
  base: "8px"
  gutter: "24px"
  gutter-md: "40px"
  card: "24px"
  card-md: "28px"
  form-card-sm: "32px"
  row: "16px"
  grid-gap: "16px"
  section-header: "32px"
  section: "64px"
  section-md: "96px"
  page-top: "112px"
  page-top-md: "144px"
  page-bottom: "80px"
  page-bottom-md: "112px"
  closing-pad: "32px"
  closing-pad-md: "48px"
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
    typography: "{typography.ui}"
    rounded: "{rounded.pill}"
    padding: "0 28px"
    height: "48px"
  button-inverted-hover:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.paper}"
    typography: "{typography.ui}"
    rounded: "{rounded.pill}"
    padding: "0 24px"
    height: "44px"
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
  card:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "{spacing.card}"
  card-on-band:
    backgroundColor: "{colors.dark-fog}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
    padding: "{spacing.card}"
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
  nav-link:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.ui}"
    rounded: "{rounded.none}"
    padding: "0"
  nav-link-active:
    textColor: "{colors.signal}"
  nav-link-on-band-active:
    textColor: "{colors.signal-soft}"
  closing-band-inner:
    backgroundColor: "rgb(242 242 240 / 0.6)"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "{spacing.closing-pad}"
  footer:
    backgroundColor: "rgb(242 242 240 / 0.4)"
    textColor: "{colors.steel}"
    typography: "{typography.ui}"
    rounded: "{rounded.none}"
    padding: "56px 24px"
---

# Design System: FROM 6 AGENCY

## Overview

**Creative North Star: "The Signed Brief"**

The site is set like a business brief on white paper in pure black ink, and then signed once in blue. Everything structural is achromatic: Ink text, Paper ground, Fog panels, Line hairlines, Steel for supporting sentences. The one chromatic value, Signal blue, marks exactly the places a reader can act: the dot of the F6 monogram, links, and buttons. Hierarchy comes from two typefaces doing two jobs (Space Grotesk for titles and the brand name, Inter for everything read), from size and weight, and from 1px lines, never from tint or ornament.

Surfaces are square. The only curves in the system are full circles: pill buttons, status pills, radio indicators, progress segments, the success disc, and the dot in the logo. Nothing casts a shadow; a card is a rectangle with a 1px Line border on Paper, and it hovers by turning that border to Ink. The home hero and the home closing call are full-bleed black bands that invert the neutrals (Dark Fog, Dark Line, Dark Steel) and switch links to Signal Soft so the blue stays legible on black.

Density is low and editorial. A page opens with a single Space Grotesk headline (no kicker above it), a Steel lead of two lines at most, then sections separated by 64 to 96px. Lists are hairline rows, not icon grids; cards exist only where an entire thing is a destination. Motion is a one-time CSS opening sequence on the home hero (title rises, a Lead-to-Cash line draws itself, the two doors slide in), one-shot reveals on scroll, direction-aware slides between form steps, and 150 to 300ms colour transitions everywhere else.

**Key Characteristics:**
- Six neutrals and one accent: Signal `#2233E8` appears only on the logo dot, links and buttons; Signal Soft replaces it on black; Signal Wash is the selection and selected-row tint.
- Two faces, two jobs: Space Grotesk 600 with -0.02em tracking on every heading and the brand name; Inter for text, UI and labels. No mono, no serif.
- Radius is 0 or a full circle. Cards, inputs, panels and bands are square; buttons, pills and indicators are round.
- No drop shadows anywhere; depth is a 1px Line border, a Fog panel, or a black band inversion.
- Black bands (`.hero-section`) for the home hero and home closing call, with the neutrals inverted through `hero-fog`, `hero-line`, `hero-steel`.
- The logo is the official inline SVG in `currentColor`: horizontal lockup at 150px in the header and 140px in the footer, never recoloured, rotated or shadowed.
- Every visible string is an EN/FR pair through `<T />`; English is server-rendered.

## Colors

The kit's eight hex values, declared as `--f6-*` custom properties in `src/app/globals.css` and mapped to Tailwind names through `@theme inline` (`background`, `foreground`, `muted`, `muted-foreground`, `border`, `signal`, `signal-soft`, `signal-wash`, `hero-*`).

### Primary
- **Signal** (`#2233E8`): the single accent. Fill of every primary button (`Button`, `BookCallButton`, `PrimaryButton`, cookie accept), colour of every text link (`ArrowLink`, door-card calls, footer and nav hover, active nav item, the underlined contact link, the cookie policy link), the `Row` term on hover, `::selection` through its wash, and the focus ring (`2px solid`, offset 3px). Also the dot of the F6 monogram when the mark is drawn in colour (the inline SVG inherits `currentColor`, so on the site the dot is Ink or Paper).
- **Signal Soft** (`#6B7CFF`): Signal for black backgrounds. Door-card calls on the hero, nav hover and active state over the dark hero, the last station of the Lead-to-Cash line.
- **Signal Wash** (`#EDEFFE`): selection highlight, the fill of a selected `ChoiceGroup` row and of a filled `FileDrop`.

### Neutral
- **Ink** (`#000000`): text, headings, the black bands, primary-button hover fill, solid pills, the border a card or outline button hovers to, the step separator on the advisory process list.
- **Paper** (`#FFFFFF`): page, card and input background, text on Signal and on the bands, inverted-button hover fill.
- **Fog** (`#F2F2F0`): muted pill fill, back-button hover; at 60% the inner-page closing panel and the captcha block; at 40% the footer.
- **Line** (`#E3E3DF`): every border and divider, input strokes, unfilled progress segments, the outline button at rest, the `|` separators in the footer.
- **Steel** (`#6E6E68`): every supporting sentence, leads, row definitions, FAQ answers, field hints, placeholders at 70%, the language toggle, back button text, pill-outline text.

### Band (dark inversion)
- **Dark Fog** (`#141414`): the fill of door cards on the hero.
- **Dark Line** (`#2C2C2C`): borders of hero cards and the Lead-to-Cash rail.
- **Dark Steel** (`#A0A09A`): the attribution line under the hero lead, closing-band lead, labels on hero cards and on the Lead-to-Cash stations. Hero lead copy itself is Paper at 70%.

### Semantic
- **Destructive** (`#B42318`): field error text and icon, invalid input border, the form alert (border at 30%, fill at 5%). Forms only.

### Named Rules
**The Signal Rule.** Signal is reserved for the logo dot, links and buttons. It never fills a background, colours a heading, tints an icon or decorates a rule. On black it becomes Signal Soft. Emphasis anywhere else is weight, size, Steel or position.

**The Inversion Rule.** A black band swaps the neutrals, not the logic: Ink becomes Paper, Fog becomes Dark Fog, Line becomes Dark Line, Steel becomes Dark Steel, Signal becomes Signal Soft. The primary button on a band stays Signal (`inverted`) and hovers to Paper on Ink; the secondary is a Paper-at-30% outline (`ghost`).

**The Steel Body Rule.** Any sentence that supports a heading is Steel. Ink is for headings, terms, the current step title, and the strings the reader must not miss.

## Typography

**Display Font:** Space Grotesk (with Helvetica Neue, Arial, sans-serif), weights 500, 600, 700 loaded through `next/font/google` as `--font-space-grotesk`
**Body Font:** Inter (with Helvetica Neue, Arial, sans-serif), `--font-inter`
**Label/Mono Font:** none. Labels are Inter; there is no monospace face. Numerals that must align use `tabular-nums`.

**Character:** A geometric grotesk with a slightly technical voice carries every heading and the brand name, set tight at -0.02em from the global `h1` to `h6` rule; a neutral humanist sans carries every sentence. Wide letter-spacing belongs to the word AGENCY inside the logo lockup; on the page the only tracked text is the 11px `.label` at 0.06em.

### Hierarchy
- **Display** (Space Grotesk 600, 2.75rem to 3.75rem, 1.04): the home hero `h1` on the black band, `text-wrap: balance`.
- **Headline** (Space Grotesk 600, 2.25rem to 3.5rem, 1.04): inner-page `h1` via `PageHeader`, in a 48rem column.
- **Band Title** (Space Grotesk 600, 1.875rem to 2.5rem): the home closing band `h2`; the inner `ClosingCTA` uses 1.5rem to 1.875rem.
- **Title** (Space Grotesk 600, 1.5rem to 1.75rem, 1.25): section `h2` via `SectionHeader` and the home journey heading.
- **Card Title** (Space Grotesk 600, 1.25rem to 1.5rem, 1.375): `DoorCard` title; company cards use 1.25rem, process steps and the success heading use 1.125rem and 1.5rem.
- **Step Title** (Inter 500, 1.125rem): the `StepRail` heading inside forms is the one `h2` that opts out of the display face (`font-sans`, `tracking-normal`).
- **Lead** (Inter 400, 1.125rem to 1.25rem, 1.625, Steel): the paragraph under a page heading, capped at 42rem; section leads are 1rem to 1.125rem.
- **Body** (Inter 400, 0.9375rem, 1.625): card descriptions, row definitions, FAQ answers, inputs. Row terms are 1rem at weight 500; FAQ questions and advisory symptoms are 1.0625rem.
- **UI** (Inter 500, 0.875rem): buttons, nav links, arrow links, field labels, footer links; the header call drops to 0.75rem below `sm`.
- **Label** (Inter 500, 0.6875rem, 0.06em, uppercase, `.label`): the classifier at the top of a `DoorCard`, pill text, footer group titles, the Lead-to-Cash station names. Field hints and step numerals are 0.75rem Inter without tracking.

### Named Rules
**The Two Faces Rule.** Space Grotesk is for headings (`h1` to `h6`) and the brand name; Inter is for everything else, including labels and buttons. No third face, no mono.

**The Label Inside Rule.** The uppercase `.label` sits inside the object it classifies (top of a card, a pill, a footer column) and never above a page or section heading. The heading opens the block alone.

## Layout

Inner pages are wrapped in `Page`: gutter 24px (40px from `md`), top padding 112px (144px `md`) to clear the fixed header, bottom padding 80px (112px `md`). The content column is 64rem by default, 48rem for form pages, 56rem for the Darix page, 72rem for portfolio-style pages. The home uses 72rem for its bands and body; the header spans 80rem. The kit's 1180px container maps to the 72rem (1152px) home column.

`PageHeader` caps the title at 48rem and the lead at 42rem; `SectionHeader` is a left-aligned title (lead capped at 42rem) with an optional `ArrowLink` pinned to the right at `md`, 32px above the content. `Section` adds 64px above (96px `md`); the first home section forces 80px (112px `md`) after the band. Black bands pad 64 to 128px vertically.

Grids are three-up at `md` for company cards (gap 16px) and process steps (gap 24 to 32px), two-up for the contact doors, `[1.15fr 1fr]` for the hero at `lg` (the two door cards stack in the right column with a 16px gap), `[1.2fr 1fr]` for closing calls, `[2fr 3fr]` for photo plus text. `Row` is a `md` three-column grid, term then definition spanning two, 16px vertical padding. Spacing rhythm is base 8.

Breakpoints are Tailwind defaults (`sm` 640px, `md` 768px, `lg` 1024px). The desktop nav appears at `lg`; below it a hamburger opens a full-width sheet of hairline rows under the header.

## Elevation & Depth

There are no drop shadows. Depth is conveyed three ways: a 1px Line border defines a surface on Paper; a Fog panel at 40 to 60% marks a quieter region (footer, closing panel, captcha); a black band inverts the whole palette for the two moments the site speaks loudest. On a band, cards are Dark Fog with a Dark Line border. Hover never raises anything: a card or outline button turns its border to Ink (Paper on a band), a link turns Signal, a primary button turns Ink. The only `box-shadow` in the codebase is the 2px focus ring on inputs (Signal at 15%).

### Named Rules
**The No Shadow Rule.** No surface, card, button, sheet or image carries a shadow. If a surface needs an edge, give it a 1px Line border; if it needs weight, give it a Fog or Ink fill.

**The Border Hover Rule.** Hover changes a colour, never a position or a shadow: border to Ink, text to Signal, fill to Ink or Paper. The only transforms on hover are the 2 to 4px nudge of an arrow icon and the home door pair, where the door not hovered recedes to 55% opacity and 98.5% scale.

## Shapes

Zero or circle. Every container is a right-angled rectangle: cards, inputs, textareas, choice rows, file drop, alerts, the form card, the closing panel, the cookie sheet, the mobile menu rows and the portrait (a 4:5 image clipped square). Everything that is not a rectangle is a full circle (`9999px`): buttons, status pills, the radio ring and dot, the 4px progress segments, the 28px file-remove button, the 48px success disc, the 11px Lead-to-Cash dots. `--radius` is `0px` and no intermediate Tailwind radius class exists in the tree.

Borders are 1px solid Line. Emphasis borders are 1px Ink: the top rule on each advisory process step and any hovered card. The file drop is dashed Line when empty. Nothing is skewed or diagonally clipped.

### Named Rules
**The Zero or Circle Rule.** A corner is square or the element is a pill. No 4, 8, 12 or 16px radius exists and none may be introduced.

## Components

### Buttons
Pills, Inter 500, colour transition 200ms (150ms in forms).
- **Shape:** fully round, height 44px with 24px horizontal padding at 0.875rem; large 48px with 28px padding at 1rem.
- **Primary:** Signal fill, Paper text; hover Ink fill. `PrimaryButton` in forms adds a trailing arrow, a spinner while loading, 50% opacity disabled. `BookCallButton` (`default`) is the same recipe with a 14 to 16px calendar icon; in the header it shrinks to 36px tall, 16px padding.
- **Outline:** transparent with a Line border, Ink text; hover border Ink.
- **Inverted:** Signal fill, Paper text on a black band; hover Paper fill, Ink text.
- **Ghost:** on a black band, Paper-at-30% border and Paper text; hover border Paper.
- **Back:** no border, Steel text, 16px padding; hover Fog fill and Ink text.
- **Focus:** global `:focus-visible` ring, 2px solid Signal, offset 3px.

### Arrow Link
Inline 0.875rem Inter 500 in Signal with a 16px `ArrowRight` (or `ArrowUpRight` when external) at stroke 2; hover turns the text Ink and nudges the arrow 2px. On a band the same link is Signal Soft.

### Chips (Pill)
- **Style:** fully round, 4px by 10px padding, `.label` (Inter 500, 0.6875rem, 0.06em, uppercase).
- **Tones:** muted (Fog fill, Ink text), solid (Ink fill, Paper text, the "Active" status), outline (Line border, Steel text, "In build").

### Cards / Containers
- **Corner Style:** square.
- **Background:** Paper with a 1px Line border. On a band: Dark Fog with a Dark Line border. No shadow.
- **Hover:** border to Ink (Paper on a band). No lift.
- **Internal Padding:** 24px, 28px from `md` on `DoorCard`, 32px from `sm` on `FormCard`.
- **DoorCard** (signature): the whole card is the link. `.label` classifier in Steel (Dark Steel on a band), Space Grotesk title 12px below, Body copy filling (Paper at 70% on a band), then a 0.875rem Signal call with an arrow that nudges 4px on hover. On the home hero the two doors sit in a `DoorPair`: hovering or focusing one fades the other to 55% and scales it to 98.5%.
- **Company card:** same recipe hand-rolled at 24px with a 1.25rem Space Grotesk name, a status `Pill` top right, role and year in Steel, and a Signal "Discover" call.

### Row List
`divide-y` and `border-y` Line. Each `Row` is a `md` three-column grid: term at Inter 500 in Ink, definition in Body Steel spanning two columns, 16px vertical padding. Rows may be links; on hover the term turns Signal. Used for the Darix offer, symptoms, recordings and the about page.

### Inputs / Fields
- **Style:** 44px tall, square, Paper fill, 1px Line border, 14px horizontal padding, 0.9375rem Inter, placeholder Steel at 70%. Textarea min 112px, 10px vertical padding, resizable vertically.
- **Focus:** border to Signal plus a 2px ring of Signal at 15%, 150ms on border and shadow only (this ring is the only `box-shadow` in the system).
- **Error / Disabled:** `aria-invalid` turns the border Destructive; message below in 0.75rem Destructive with a 14px `CircleAlert`. Disabled is 60% opacity, `not-allowed`.
- **Label:** 0.875rem Inter 500 above; optional marker 0.75rem Steel right-aligned; hint 0.75rem Steel below.
- **ChoiceGroup:** exclusive options as square rows, 12px by 16px padding, native radio visually hidden. Indicator is a 16px ring (Steel at 50%, Signal when checked) with an 8px Signal dot scaling from 0 to 1 in 150ms. Selected row: Signal border, Signal Wash fill, label at weight 500; hover on an unselected row turns the border Ink. Keyboard focus shows through `has-[:focus-visible]` as a 2px ring of Signal at 30%.
- **FileDrop:** dashed Line row with an `Upload` icon, hover border and text Ink; once filled it becomes a Signal-bordered Signal Wash row with name, size and a round 28px remove button (hover Fog).
- **FormAlert:** square, Destructive border at 30%, fill at 5%, Destructive text.
- **CaptchaBlock:** Fog at 60%, 16px padding, a 1.125rem tabular sum and a 96px-wide input.

### Multi-step Form Frame
`FormCard` is the single square card (Paper, 1px Line, 24px then 32px padding); steps never nest a card inside it. `StepRail` above the pane: step title in Inter 500 at 1.125rem (the one heading not in Space Grotesk), `n/total` in tabular Steel, then one 4px round Line track per step that fills with Signal by `scaleX` over 300ms. `StepPane` slides 28px in the direction of travel (240ms in, 140ms out at 60% distance) with opacity; reduced motion collapses the offset and shortens to 120/80ms. `SuccessCard` opens with a 48px Signal disc holding a Paper check that scales from 0.6 over 350ms, then the reference in tabular Ink.

### Navigation
- **Desktop:** plain text links, 0.875rem Inter, 28px apart, centred absolutely, Ink; hover and active state turn Signal. Over the home hero before scroll the links are Paper and turn Signal Soft.
- **Header chrome:** fixed, 80rem wide, 24px gutter (40px `lg`), 16px vertical padding. Transparent until 8px of scroll, then Paper at 95% with `backdrop-blur-md` and a 1px Line bottom border, 300ms colour transitions. Left: `LogoHorizontal` at 150px in `currentColor` (Paper over the hero, Ink otherwise). Right: language toggle (14px `Globe` plus EN/FR at 0.75rem Inter 500, Steel), the 36px Signal `BookCallButton` (`inverted` over the hero, same Signal fill), and the hamburger below `lg`.
- **Mobile:** sheet under the header on Paper with a 1px Line top border; rows at 1rem separated by Line, active row Signal; language toggle in a second Line-topped row.

### FAQ
Native `details/summary` in a Line row list. Question at 1.0625rem Inter 500 with 20px vertical padding and a 16px `Plus` in Steel that rotates 45 degrees over 200ms when open. Answer in Body Steel, capped at 42rem, 24px bottom padding. Where the browser supports `interpolate-size`, the answer's height animates over 300ms. Content is in the HTML at load.

### Closing Call
Two treatments. Home: a second black band, `[1.2fr 1fr]`, Band Title, lead in Dark Steel, an `inverted` large button plus a `ghost` cal.com button. Inner pages (`ClosingCTA`): a square Fog-at-60% panel, 32px padding (48px `md`), same grid, primary and outline large buttons stacked, plus a Signal inline link underlined in Signal at 30% (offset 4px) that hovers to Ink.

### Footer
Fog at 40% with a 1px Line top, 72rem wide, 56px vertical padding. Four columns at `md`: `LogoHorizontal` at 140px in Ink over a 24ch Steel tagline, then three link groups titled in `.label` Steel with 0.875rem Steel links that hover Signal. Bottom row after a Line rule: copyright, LinkedIn, legal and privacy separated by `|` in Line colour.

### Cookie Consent
Fixed bottom sheet, 48rem, square, Paper at 95% with blur and a 1px Line border, no shadow; one outline pill and one Signal pill at 8px by 16px padding.

### Logo
`LogoHorizontal` and `Mark` in `src/components/brand/Logo.tsx` are the kit's official paths inlined as SVG with `fill="currentColor"`; they take the surrounding text colour (Ink on Paper, Paper on a band) and are never recoloured, rotated, shadowed or replaced by a bitmap. Horizontal lockup at 150px (header) and 140px (footer), minimum 120px; the mark alone is legible from 20px and defaults to 28px.

### Motion
Standard easing is `cubic-bezier(0.16, 1, 0.3, 1)`. The home hero opens in CSS, each element carrying its `--delay`: `.anim-rise` (opacity plus 18px rise, 600ms) on title, lead and attribution at 0, 120 and 220ms; `.anim-line` draws the Lead-to-Cash rail by `scaleX` over 1.2s with `cubic-bezier(0.65, 0, 0.35, 1)` from 500ms, `.anim-dot` pops each station (scale 0.4 to 1, 350ms) as the line passes and `.anim-fade` (400ms) brings its label; `.anim-door` slides the two doors in from 28px right (500ms) at 1100 and 1240ms. `Reveal` fades and rises 24px over 600ms once, triggered 80px before entering the viewport; the `photo` effect settles from 104% scale over 900ms; `RevealGroup` staggers items by 70ms at 500ms each. Colour transitions are 150ms in forms, 200ms on buttons, links and the FAQ icon, 300ms on header chrome. Under `prefers-reduced-motion` the hero animations collapse to a 300ms fade, the rail draws instantly, the door pair loses its scale, the FAQ height snaps, and `motion` components fade without displacement.

## Do's and Don'ts

### Do:
- **Do** build every surface from Ink, Paper, Fog, Line and Steel; reach for Dark Fog, Dark Line and Dark Steel only inside `.hero-section`.
- **Do** spend Signal only on the logo dot, text links and buttons, and switch to Signal Soft for links on black; hover a link to Ink and a primary button to Ink.
- **Do** set every heading in Space Grotesk 600 at -0.02em through the global `h1` to `h6` rule, and every sentence, label and control in Inter.
- **Do** open a page with `PageHeader` (Headline, then a Steel lead of at most two lines) and every section with `SectionHeader`; the heading carries alone.
- **Do** list things as `RowList` rows divided by Line unless each item is a whole clickable destination, in which case use a square card with a 1px Line border that hovers to Ink.
- **Do** make every button a pill: 44px medium or 48px large, Inter 500, primary / outline / inverted / ghost, hover by colour change only.
- **Do** put the `.label` (Inter 500, 0.6875rem, 0.06em, uppercase) inside the object it classifies: a `Pill`, the top of a `DoorCard`, a footer column.
- **Do** keep controls square with a 1px Line border, and show focus as a Signal border plus a 15% Signal ring.
- **Do** insert the logo as the inline SVG from `Logo.tsx` in `currentColor`, lockup at 120px or wider, mark at 20px or wider.
- **Do** ease motion with `cubic-bezier(0.16, 1, 0.3, 1)`, keep colour transitions between 150 and 300ms, and honour `prefers-reduced-motion` on anything that moves.
- **Do** ship every visible string as an EN/FR pair through `<T en fr />`, English first in the HTML, in real business French ("revenus", never "le revenue").

### Don't:
- **Don't** use Signal as a background, a heading colour, an icon tint or a decorative rule; the only blue fills are buttons, the selected-row wash and the logo dot.
- **Don't** introduce a gradient, a tinted grey, a second accent or a dark-mode theme; the black bands are a local inversion, not a theme.
- **Don't** add a drop shadow to anything, including the cookie sheet and the portrait; bound surfaces with a 1px Line border instead.
- **Don't** use any radius other than 0 or `9999px`: no `rounded-sm`, `rounded-md`, `rounded-lg`, `rounded-xl`, `rounded-2xl`.
- **Don't** place an uppercase label or any eyebrow above a page or section heading.
- **Don't** use a typeface other than Space Grotesk (headings, brand name) and Inter (everything else); no mono, no serif, no system display face.
- **Don't** recolour, rotate, outline, shadow, redraw or rasterise the logo; never set the horizontal lockup below 120px.
- **Don't** lift on hover: no translate, no shadow change on cards or buttons; change border or text colour instead.
- **Don't** nest a card inside a card, or put a Paper card on a black band; band cards are Dark Fog with a Dark Line border.
- **Don't** use em or en dashes in visible copy (comma, colon, parentheses; `|` in SEO titles), rhythmic word triplets separated by periods, emojis, hype, or any invented client, figure, testimonial, certification or criterion.

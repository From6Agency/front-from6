---
version: 1
slug: "src-app-page-tsx"
primary_target: "src/app/page.tsx"
related_targets: ["src/components/Header.tsx","src/app/globals.css","src/app/layout.tsx","src/components/home/DoorBands.tsx","src/components/home/HeroDoors.tsx","src/components/home/FlowIllustration.tsx","src/components/home/ProofStrip.tsx","src/components/home/MobileDoorBar.tsx"]
---

# Surface brief: home (src/app/page.tsx), header and global tokens

Scope: the public home page of from6agency.com, Persuade mode, plus the header and the
global type and motion tokens it depends on. Audience, product truth and editorial rules live
in PRODUCT.md and are not repeated here.

Job: a B2B company leader and an early-stage founder each find their door within the first
screen, without reading a paragraph. Action: start the diagnostic or present a project; the
30-minute call stays secondary. Proof: the three real companies with their real visuals and
dated statuses, the recordings, the trajectory. Nothing invented, no sport imagery, no third
colour, no metaphorical carrier.

Quality bar named by the owner (2026-10-04): 6way.app (warm restraint, heavy grotesque,
floating capsule nav, real screens), Satisfy / Tracksmith / District Vision (white and black,
held typography, tiny nav), Linear / Vercel / Stripe (giant two-line headline, proof directly
beneath, hairlines, one accent, crisp micro-interactions).

Unresolved: final typeface validated on the built page (Archivo first, one alternate ready);
five nav entries or four; the fixed bottom action bar on mobile (built, to be confirmed on the
captures).

## Direction contract

THESIS: One screen, two doors, no metaphor. The two audiences are the structure of the first
viewport itself: two full-width bands facing each other under one giant headline, each band
named by its audience, carrying its question, its four real steps and one action. It refuses
the category default of a headline beside two cards with four competing buttons.

OWN-WORLD: Paper ground, Ink text, Fog panels, Line hairlines, Steel for supporting sentences;
Signal blue only on the logo dot, links, buttons and the active door. One grotesque family
with a width axis (Archivo) doing two jobs: heavy, tight display at -0.03em, regular text;
tabular numerals on every date, step and year. Square surfaces, 1px hairlines, pill buttons,
no shadow, no gradient, no orbs. A floating capsule header detached from the edge. Motion is
exponential ease-out, 150 to 300 ms, one orchestrated entrance, content visible by default;
the single black band is the closing call.

STORY: The leader reads the headline, sees the Entreprises band with Devis, Contrat, Facture,
Encaissement, understands this is about Lead-to-Cash systems, and clicks "Évaluer mon besoin".
The founder sees the Fondateurs band with Projet, Avis, Ticket, Co-fondation and clicks
"Présenter mon projet". Scrolling, both meet the three companies with real screens and dated
statuses, Darix's six lines, the path, the recordings, the FAQ, then the closing band with the
same two actions.

FIRST VIEWPORT (revised 2026-10-04 after owner feedback): Desktop 1440. Capsule header inset
16px. Left column: headline on three lines at 4rem, one Steel lead line, the attribution line.
Right column: the illustration, drawn in code: the F6 mark in a hub, a branch bar, two lanes
with nodes and small-caps labels (Companies: Quote, Contract, Invoice, Cash; Founders:
Advisory, Involvement, Investment, Co-founding); rails draw on load, nodes and labels arrive in
sequence, a dot travels along each rail. Below, two short full-width bands separated by
hairlines: the audience word at display size, one question, one Signal action. Hovering a band
grows it, turns its heading Signal and lights its lane; the other band and lane fade. Mobile
390: no illustration (the owner judged its phone variant unreadable); headline, lead, then both
bands inside the first screen; the fixed bottom bar with the two actions appears once the bands
leave the screen. The attribution line is hidden below md.

PROOF SECTION (revised twice on 2026-10-04): the owner rejected the mixed strip of app
screens and marks. Now one sober row of the three marks only (Darix, MicePro in grayscale,
6WAY wordmark), sized by visual weight (140, 210 and 160px wide from md; 80, 120 and 92px on
phones), on the Paper ground, no panel, no caption. From md the row enters aligned to the
right of the content column and leaves aligned to the left, so the column's free width is its
travel, each mark adding its own drift; on phones the marks span the width and only drift.
Static under reduced motion. Alt texts are EN/FR pairs through the language context. The three
company records follow side by side.
Under it the three company records side by side.

FORM: The category standard at a named bar, taken through the canon exit after two re-rolls
(seed key 489edbe7, register safer). Grounded list retired: documents, maps, scoreboards,
results sheets. Code-led: no image generation on this machine.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the
verdict, DESIGN.md, and every shipping raster carrying its provenance.

## Adaptations recorded at build (2026-10-04)

- Headline set at 4rem on large screens in the left column beside the illustration: three
  lines in English, four in French, at 1440 and 1280 wide; both doors inside the first viewport
  on desktop. The craft floor's 6rem cap is respected.
- Founders steps read Advisory, Involvement, Investment, Co-founding (the four real forms of
  support in PRODUCT.md) instead of Projet, Avis, Ticket, Co-fondation: the owner rejects the
  "ticket" framing and the Lead-to-Cash chain only belongs to the Companies door.
- The owner reviewed the shipped first version and asked for an illustration instead of text
  in the bands, and for a dynamic right-to-left proof strip instead of grey panels with
  captions. The bands lost their supporting sentence and step row; the steps moved into the
  illustration. No image generation exists here, so the illustration is drawn in code.
- Hover grammar built as a pair: the active band grows and recolours its heading and its lane
  in the illustration; the inactive band and lane fade.
- Closing black band carries the two door actions, the 30-minute call as a tertiary line.
- Proof visuals are sourced, never redrawn: the official Darix mark from the darix repo, the
  MicePro logo from micepro.io, the 6WAY wordmark from the 6way-app repo, each with embedded
  origin. The 6WAY app screens shipped briefly and were removed at the owner's request.

# front-from6 — site public FROM 6 AGENCY

Refonte du site vitrine (from6agency.com), migrée hors de Lovable. Next.js
(App Router), rendu serveur pour de vraies performances SEO/AEO/GEO.

## Règles d'écriture (contenu FR et EN, tout ce qui est visible)

- **Pas de phrase poétique.** Direct, factuel, business. Pas de métaphores
  ronflantes ni de tournures publicitaires vides.
- **Pas de triplet "Mot. Mot. Mot."** (ex: "Advisory. Investments.
  Intelligence.") : un tell IA immédiatement reconnaissable. Si trois
  concepts doivent être listés, une vraie phrase ou une virgule/esperluette,
  jamais des points séparateurs.
- **Pas de tiret cadratin (—) dans le contenu.** Reformuler avec une
  virgule, un point, ou restructurer la phrase. Exception : un titre cité
  tel quel depuis une source externe réelle (ex: le titre publié d'un
  épisode de podcast) — on ne réécrit pas ce qui existe déjà ailleurs sous
  ce nom.
- Vaut pour les titres de page (`<title>`, meta description), le contenu
  des composants, et tout texte ajouté en base Supabase.

## Stack

- Next.js (App Router) + TypeScript, Tailwind v4 (CSS-first, `src/app/globals.css`)
- Police : Geist / Geist Mono (`next/font/google`) — pas de serif, pas de
  Fraunces/DM Sans (essayés puis abandonnés sur retour utilisateur)
- Palette : noir/blanc/gris pur, aucune couleur d'accent. **Pas de dark
  mode** (retiré : `next-themes` désinstallé, pas de classe `.dark`)
- `motion` (successeur de framer-motion) pour les animations au scroll
  (`Reveal`/`RevealGroup`/`RevealItem`) et les formes flottantes en fond
  (`FloatingOrbs`, monochrome, doivent avoir `isolate` sur leur conteneur
  parent sinon leur `z-index` négatif se fait recouvrir par le bg du
  parent — bug déjà rencontré et corrigé)

## Données : Supabase réel, pas de duplication

Ce site lit le **même Supabase que l'admin Lovable** (`from6agencywesbite`,
ref `bsvyanoktklymwhhapec`, org non accessible depuis ce compte — pas
d'accès CLI/Management API en écriture depuis cette session). Tables :
`advisory_services`, `portfolio_companies`, `media_opportunities`,
`featured_videos`, `site_content`, `contact_submissions`.

- **Ne jamais dupliquer ce contenu en dur dans le code.** Tout texte
  éditable (services, portfolio, bio, légal) vient de la base via
  `src/lib/content.ts`. L'admin Lovable reste le seul outil d'édition — ce
  repo est présentation uniquement.
- Chaque table a des colonnes bilingues `*_fr` à côté des colonnes
  anglaises. **Toujours brancher les deux** via `<T en={...} fr={...} />`
  (`src/components/Bilingual.tsx`). Un vrai bug trouvé et corrigé : le
  premier jet du rebuild n'affichait jamais les colonnes `_fr`, y compris
  sur des pages entières (Investments) — vérifier systématiquement après
  tout ajout de contenu Supabase.
- Si du contenu en base contient lui-même un calque anglais mal traduit
  (ex: "du revenue" au lieu de "des revenus"), c'est un problème de
  données, pas de code : le signaler, ne pas le corriger silencieusement
  sans accès en écriture confirmé.

## Langue

`LanguageProvider` (`src/components/providers/LanguageProvider.tsx`) :
contexte client, défaut EN, persisté en `localStorage`. Le SSR rend
toujours l'anglais (visible par les crawlers), le FR est un bonus
client-side. Les traductions FR doivent être un vrai français business,
jamais du mot-à-mot :
- "revenue" → "revenus" (jamais "le revenue" en français)
- "hands-on" → "concrètement" / "sur le terrain" / "opérationnel" selon
  le contexte, jamais laissé tel quel
- jargon accepté tel quel (normal en français startup/SaaS) : RevOps,
  CRM, CPQ, SaaS, GTM, lead-to-cash, stack, scaler, cap table, ticket

## SEO/AEO/GEO

- `SITE_URL` (dans `layout.tsx`, `robots.ts`, `sitemap.ts`) pointe vers
  `https://from6agency.com`, le domaine de production réel — jamais l'URL
  de preview Vercel.
- JSON-LD : `Organization`/`WebSite`/`ProfessionalService` en layout,
  `FAQPage` (FAQ.tsx), `Person` (about), `PodcastEpisode`+`VideoObject`
  (media). Toujours en garder un maximum grounded dans du contenu réel,
  jamais de chiffres ou stats inventés.
- FAQ pensée pour les answer engines (ChatGPT, Perplexity) : questions
  réelles, réponses factuelles courtes, jamais promotionnelles.

## Déploiement

Vercel, projet `franckfrom6s-projects/front-from6`. `vercel.json` force
`"framework": "nextjs"` (nécessaire après la migration Vite → Next.js,
sinon Vercel cherche un dossier `dist`). Déploiement manuel via
`vercel deploy --scope franckfrom6s-projects` (pas de sync Git → Vercel
configuré pour l'instant).

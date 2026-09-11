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
- **Kit de marque v2.0 (septembre 2026)**, source de vérité pour tout le
  visuel : `/Users/franckberthelot/Downloads/f6a brandkit/` (brand-guide.html,
  tokens.css). Assets déjà copiés dans le repo : `public/brand/` (logos SVG
  et PNG officiels), `public/favicon/` (set complet + `site.webmanifest`),
  `public/og/f6-og.png` (1200×630). Le logo s'insère en SVG inline via
  `src/components/brand/Logo.tsx` (`LogoHorizontal`, `Mark`), en
  `currentColor`, jamais recoloré, jamais recréé, jamais de version bitmap
  dans le header/footer. Lockup horizontal 120 px minimum.
- Polices : Space Grotesk 500/600/700 pour les titres et le nom de la
  marque, Inter pour le texte (`next/font/google`, variables
  `--font-space-grotesk` / `--font-inter`). Pas de mono, pas de serif.
  Titres : `letter-spacing: -0.02em`, réglés globalement sur h1-h6 dans
  `globals.css` (ne pas répéter `font-semibold tracking-tight` en classes).
- Palette : Ink `#000000`, Paper `#FFFFFF`, Fog `#F2F2F0`, Line `#E3E3DF`,
  Steel `#6E6E68`, et **une seule couleur vive, Signal `#2233E8`**,
  réservée au point du logo, aux liens et aux boutons (rien d'autre :
  pas de fond, pas de titre, pas d'icône décorative en bleu). Sur fond noir
  : Signal-soft `#6B7CFF` pour les liens, fog/line/steel inversés
  (`--color-hero-fog/line/steel`). Tokens Tailwind : `signal`,
  `signal-soft`, `signal-wash`, `hero-*`. **Pas de dark mode** (retiré :
  `next-themes` désinstallé, pas de classe `.dark`) ; les bandes noires
  (`.hero-section`) sont une inversion locale, pas un thème.
- Rayons : **0 ou cercle complet, jamais d'intermédiaire** (pas de
  `rounded-md/lg/xl/2xl`). Pilules `rounded-full` pour boutons, pastilles,
  indicateurs. Pas d'ombres portées : hiérarchie par filets 1 px (`border`)
  et fond fog. Étiquettes en Inter petites capitales via la classe `.label`.
- `motion` (successeur de framer-motion) pour les animations au scroll
  (`Reveal`/`RevealGroup`/`RevealItem`) et les formes flottantes en fond
  (`FloatingOrbs`, monochrome, doivent avoir `isolate` sur leur conteneur
  parent sinon leur `z-index` négatif se fait recouvrir par le bg du
  parent — bug déjà rencontré et corrigé)

## Données : Supabase réel, pas de duplication

Ce site lit le **même Supabase que l'admin Lovable** (`from6agency`, ref
`qaxeszpfjpjzxlxhwmaq`, org `franckfrom6's Org`, compte
franck.berthelot@from6agency.com). Tables : `advisory_services`,
`portfolio_companies`, `media_opportunities`, `featured_videos`,
`site_content`, `contact_submissions`, `articles`, `site_secrets`,
`user_roles`.

⚠️ **Projet gratuit, pause automatique après 7 jours d'inactivité.** Le
projet précédent (ref `bsvyanoktklymwhhapec`, nom `from6agencywesbite`) a
été mis en pause puis **supprimé définitivement** début septembre 2026 sans
que personne ne s'en aperçoive (le site continuait à tourner sur le
snapshot `fallback-data.json`, ce qui a masqué le problème jusqu'à ce que
les formulaires échouent en prod). Schéma et données ont été reconstruits
le 09/09/2026 via `supabase/migrations/20260909000000_restore_schema_and_content.sql`.
Si les formulaires échouent à nouveau en prod : vérifier d'abord la
résolution DNS du ref courant (`dig @1.1.1.1 qaxeszpfjpjzxlxhwmaq.supabase.co`)
avant de chercher un bug côté code — un NXDOMAIN veut dire projet pausé/supprimé,
pas un bug applicatif. Envisager de passer sur le plan Pro pour éviter la
pause automatique.

- **Ne jamais dupliquer ce contenu en dur dans le code.** Tout texte
  éditable (services, portfolio, bio, légal) vient de la base via
  `src/lib/content.ts`. L'admin Lovable reste le seul outil d'édition pour
  ce contenu. `supabase/migrations/` et `supabase/functions/` existent dans
  ce repo (schéma de référence + edge function de notification), mais ce
  n'est pas un backend applicatif complet : pas de service_role key ici,
  seulement la clé publique anon côté client.
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

## Notifications par email

`supabase/functions/send-contact-notification` envoie un email vers
franck.berthelot@from6agency.com à chaque soumission de formulaire
(contact, diagnostic, proposer-un-projet), via l'API Resend. Secret requis
côté Supabase (Edge Functions → Secrets) : `RESEND_API_KEY`. Le domaine
d'envoi (`from6agency.com`) doit rester vérifié sur le compte Resend, sinon
l'API renvoie 403 et l'email ne part pas silencieusement (l'échec de la
notification ne bloque pas l'enregistrement de la demande ni l'affichage
du succès côté formulaire, les deux sont volontairement découplés).

## Déploiement

Vercel, projet `franckfrom6s-projects/front-from6`. `vercel.json` force
`"framework": "nextjs"` (nécessaire après la migration Vite → Next.js,
sinon Vercel cherche un dossier `dist`). Déploiement manuel via
`vercel deploy --scope franckfrom6s-projects` (pas de sync Git → Vercel
configuré pour l'instant).

# front-from6

Site From6Agency — refonte.

Stack : Vite + React + TypeScript + shadcn/ui + Tailwind + Supabase.

## Dev

```bash
npm install
cp .env.example .env   # puis renseigner VITE_SUPABASE_PUBLISHABLE_KEY
npm run dev
```

## Supabase

Projet : `from6agency` (ref `qaxeszpfjpjzxlxhwmaq`, région eu-west-3).

```bash
supabase link --project-ref qaxeszpfjpjzxlxhwmaq
supabase gen types typescript --project-id qaxeszpfjpjzxlxhwmaq --schema public > src/integrations/supabase/types.ts
```

## Déploiement

Preview Vercel via `vercel`.

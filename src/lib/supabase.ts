import { createClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

// Backend partagé avec l'app d'admin Lovable (from6agencywesbite) : ce site
// lit les mêmes tables, l'admin existant reste la seule interface d'édition.
// Le contenu est lu au build et doit être relu à chaque build. Next garde un
// cache de fetch persistant (.next/cache/fetch-cache) dont la clé inclut les
// en-têtes : un identifiant de build par requête garantit qu'aucun build ne
// resserve l'entrée d'un build précédent (fiche portfolio périmée constatée le
// 04/10/2026). Un `cache: "no-store"` ferait l'affaire mais rendrait les pages
// dynamiques, ce qui casse le prérendu statique voulu.
const BUILD_ID = process.env.VERCEL_DEPLOYMENT_ID ?? process.env.VERCEL_GIT_COMMIT_SHA ?? String(Date.now());

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: { persistSession: false },
  global: { headers: { "x-f6-build": BUILD_ID } },
});

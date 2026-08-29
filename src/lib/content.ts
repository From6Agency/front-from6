import { supabase } from "@/lib/supabase";

// Pages statiques (ISR, voir `revalidate` dans chaque page.tsx) : le fetch a
// lieu au build et à chaque régénération en arrière-plan, jamais pendant une
// vraie visite. Un seul essai, pas de retry : pendant une panne réelle
// (DNS cassé côté fournisseur, pas un blip réseau d'une fraction de seconde),
// retenter dans la même seconde n'aide jamais et ne fait que multiplier les
// requêtes échouées dans les logs d'erreur du projet Supabase. Si l'appel
// échoue, on rend un contenu vide plutôt que de faire planter le build, avec
// un log clair côté Vercel pour garder une trace.
async function withRetry<T>(label: string, fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    console.error(`[content] ${label} failed, rendering empty:`, err);
    return fallback;
  }
}

export async function getSiteContent(section: string): Promise<Record<string, { en: string; fr: string }>> {
  return withRetry(
    `getSiteContent(${section})`,
    async () => {
      const { data, error } = await supabase.from("site_content").select("*").eq("section", section).eq("published", true);
      if (error) throw error;
      const map: Record<string, { en: string; fr: string }> = {};
      for (const row of data) map[row.key] = { en: row.content_en, fr: row.content_fr };
      return map;
    },
    {},
  );
}

export async function getAdvisoryServices(limit?: number) {
  return withRetry(
    "getAdvisoryServices",
    async () => {
      let query = supabase.from("advisory_services").select("*").eq("published", true).order("display_order", { ascending: true });
      if (limit) query = query.limit(limit);
      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
    [],
  );
}

export async function getPortfolioCompanies() {
  return withRetry(
    "getPortfolioCompanies",
    async () => {
      const { data, error } = await supabase
        .from("portfolio_companies")
        .select("*")
        .eq("published", true)
        .order("display_order", { ascending: true });
      if (error) throw error;
      return data;
    },
    [],
  );
}

export async function getMediaOpportunities() {
  return withRetry(
    "getMediaOpportunities",
    async () => {
      const { data, error } = await supabase
        .from("media_opportunities")
        .select("*")
        .eq("published", true)
        .order("date", { ascending: false, nullsFirst: false });
      if (error) throw error;
      return data;
    },
    [],
  );
}

export async function getFeaturedVideos() {
  return withRetry(
    "getFeaturedVideos",
    async () => {
      const { data, error } = await supabase
        .from("featured_videos")
        .select("*")
        .eq("published", true)
        .order("display_order", { ascending: true });
      if (error) throw error;
      return data;
    },
    [],
  );
}

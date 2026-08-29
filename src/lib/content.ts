import { supabase } from "@/lib/supabase";

// Pages statiques (ISR, voir `revalidate` dans chaque page.tsx) : le fetch a
// lieu au build et à chaque régénération en arrière-plan, jamais pendant une
// vraie visite. Un seul essai, aucun retry automatique : une panne Supabase
// se corrige manuellement (redeploy déclenché à la main une fois le service
// revenu), pas en tapant dessus depuis le code pendant que c'est cassé. Si
// l'appel échoue, on rend un contenu vide plutôt que de faire planter le
// build, avec un log clair côté Vercel pour garder une trace.
async function safeFetch<T>(label: string, fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    console.error(`[content] ${label} failed, rendering empty:`, err);
    return fallback;
  }
}

export async function getSiteContent(section: string): Promise<Record<string, { en: string; fr: string }>> {
  return safeFetch(
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
  return safeFetch(
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
  return safeFetch(
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
  return safeFetch(
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
  return safeFetch(
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

import { supabase } from "@/lib/supabase";

// Pages statiques (ISR, revalidate 60s, voir chaque page.tsx) : le fetch a
// lieu au build et à chaque régénération en arrière-plan, jamais pendant une
// vraie visite. `withRetry` encaisse les blips passagers (le genre d'incident
// Supabase vécu le 28/08 : DNS/latence intermittents) ; si tout échoue quand
// même, on rend un contenu vide plutôt que de faire planter le build, mais on
// logge fort pour que ça reste visible dans les logs Vercel au lieu de
// silencieusement livrer une page incomplète sans trace.
async function withRetry<T>(label: string, fn: () => Promise<T>, fallback: T, attempts = 3): Promise<T> {
  let lastError: unknown;
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      if (i < attempts - 1) await new Promise((r) => setTimeout(r, 500 * (i + 1)));
    }
  }
  console.error(`[content] ${label} failed after ${attempts} attempts, rendering empty:`, lastError);
  return fallback;
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

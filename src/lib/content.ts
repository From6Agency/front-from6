import { supabase } from "@/lib/supabase";
import fallback from "@/lib/fallback-data.json";

// Pages statiques (fully static, aucune revalidation) : le fetch a lieu une
// seule fois, au moment du déploiement. Un seul essai, aucun retry
// automatique : une panne Supabase se corrige manuellement (redeploy
// déclenché à la main une fois le service revenu), pas en tapant dessus
// depuis le code pendant que c'est cassé.
//
// `fallback-data.json` est un instantané réel du contenu (capturé le
// 29/08/2026, pendant l'incident DNS Supabase — voir le commit qui l'a
// introduit). Si l'appel échoue, on sert cet instantané au lieu de rendre
// une section vide : le site ne "perd" plus jamais de contenu à cause d'une
// panne fournisseur, il retombe simplement sur la dernière version connue.
// À régénérer une fois Supabase stable (voir scripts/refresh-fallback.md
// ou demander à Claude de le refaire).
async function safeFetch<T>(label: string, fn: () => Promise<T>, fallbackValue: T): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    console.error(`[content] ${label} failed, using fallback snapshot:`, err);
    return fallbackValue;
  }
}

export async function getSiteContent(section: string): Promise<Record<string, { en: string; fr: string }>> {
  const fallbackMap: Record<string, { en: string; fr: string }> = {};
  for (const row of fallback.site_content as Array<{ section: string; key: string; content_en: string; content_fr: string }>) {
    if (row.section === section) fallbackMap[row.key] = { en: row.content_en, fr: row.content_fr };
  }

  return safeFetch(
    `getSiteContent(${section})`,
    async () => {
      const { data, error } = await supabase.from("site_content").select("*").eq("section", section).eq("published", true);
      if (error) throw error;
      const map: Record<string, { en: string; fr: string }> = {};
      for (const row of data) map[row.key] = { en: row.content_en, fr: row.content_fr };
      return map;
    },
    fallbackMap,
  );
}

export async function getAdvisoryServices(limit?: number) {
  const fallbackData = limit ? fallback.advisory_services.slice(0, limit) : fallback.advisory_services;
  return safeFetch(
    "getAdvisoryServices",
    async () => {
      let query = supabase.from("advisory_services").select("*").eq("published", true).order("display_order", { ascending: true });
      if (limit) query = query.limit(limit);
      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
    fallbackData,
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
    fallback.portfolio_companies,
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
    fallback.media_opportunities,
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
    fallback.featured_videos,
  );
}

import { supabase } from "@/lib/supabase";

// Ces pages sont rendues dynamiquement (par requête, voir `dynamic =
// "force-dynamic"` sur chaque page) pour ne plus dépendre de Supabase au
// moment du build. Ça veut dire qu'une vraie panne Supabase peut désormais
// survenir pendant une visite réelle, pas seulement pendant un déploiement :
// chaque fonction ici avale l'erreur et rend un contenu vide plutôt que de
// faire planter la page entière (500) pour le visiteur.

export async function getSiteContent(section: string): Promise<Record<string, { en: string; fr: string }>> {
  try {
    const { data, error } = await supabase.from("site_content").select("*").eq("section", section).eq("published", true);
    if (error) throw error;
    const map: Record<string, { en: string; fr: string }> = {};
    for (const row of data) map[row.key] = { en: row.content_en, fr: row.content_fr };
    return map;
  } catch {
    return {};
  }
}

export async function getAdvisoryServices(limit?: number) {
  try {
    let query = supabase.from("advisory_services").select("*").eq("published", true).order("display_order", { ascending: true });
    if (limit) query = query.limit(limit);
    const { data, error } = await query;
    if (error) throw error;
    return data;
  } catch {
    return [];
  }
}

export async function getPortfolioCompanies() {
  try {
    const { data, error } = await supabase
      .from("portfolio_companies")
      .select("*")
      .eq("published", true)
      .order("display_order", { ascending: true });
    if (error) throw error;
    return data;
  } catch {
    return [];
  }
}

export async function getMediaOpportunities() {
  try {
    const { data, error } = await supabase
      .from("media_opportunities")
      .select("*")
      .eq("published", true)
      .order("date", { ascending: false, nullsFirst: false });
    if (error) throw error;
    return data;
  } catch {
    return [];
  }
}

export async function getFeaturedVideos() {
  try {
    const { data, error } = await supabase
      .from("featured_videos")
      .select("*")
      .eq("published", true)
      .order("display_order", { ascending: true });
    if (error) throw error;
    return data;
  } catch {
    return [];
  }
}

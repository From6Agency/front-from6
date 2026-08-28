import { supabase } from "@/lib/supabase";

export async function getSiteContent(section: string) {
  const { data, error } = await supabase.from("site_content").select("*").eq("section", section).eq("published", true);
  if (error) throw error;
  const map: Record<string, { en: string; fr: string }> = {};
  for (const row of data) map[row.key] = { en: row.content_en, fr: row.content_fr };
  return map;
}

export async function getAdvisoryServices(limit?: number) {
  let query = supabase.from("advisory_services").select("*").eq("published", true).order("display_order", { ascending: true });
  if (limit) query = query.limit(limit);
  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function getPortfolioCompanies() {
  const { data, error } = await supabase
    .from("portfolio_companies")
    .select("*")
    .eq("published", true)
    .order("display_order", { ascending: true });
  if (error) throw error;
  return data;
}

export async function getMediaOpportunities() {
  const { data, error } = await supabase
    .from("media_opportunities")
    .select("*")
    .eq("published", true)
    .order("date", { ascending: false, nullsFirst: false });
  if (error) throw error;
  return data;
}

export async function getFeaturedVideos() {
  const { data, error } = await supabase
    .from("featured_videos")
    .select("*")
    .eq("published", true)
    .order("display_order", { ascending: true });
  if (error) throw error;
  return data;
}

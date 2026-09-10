import type { MetadataRoute } from "next";
import { RESOURCES } from "@/lib/resources";

const SITE_URL = "https://from6agency.com";
const ROUTES = [
  "",
  "/advisory",
  "/darix",
  "/investments",
  "/portfolio",
  "/diagnostic",
  "/proposer-un-projet",
  "/ressources",
  "/media",
  "/about",
  "/contact",
  "/legal-notice",
  "/privacy-policy",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = ROUTES.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
  }));

  const resourceEntries: MetadataRoute.Sitemap = RESOURCES.map((resource) => ({
    url: `${SITE_URL}/ressources/${resource.slug}`,
    lastModified: new Date(resource.publishedAt),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...resourceEntries];
}

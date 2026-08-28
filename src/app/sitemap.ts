import type { MetadataRoute } from "next";

const SITE_URL = "https://front-from6.vercel.app";
const ROUTES = ["", "/advisory", "/investments", "/media", "/about", "/contact", "/legal-notice", "/privacy-policy"];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
  }));
}

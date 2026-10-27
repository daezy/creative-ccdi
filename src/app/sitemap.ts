import type { MetadataRoute } from "next";
import { pageInfo, arms, articles, siteUrl } from "@/lib/content";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "/",
    ...Object.keys(pageInfo).map((s) => `/${s}/`),
    ...arms.map((a) => `/projects/${a.slug}/`),
    ...articles.map((a) => `/blog/${a.slug}/`),
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    changeFrequency: path === "/" ? "monthly" : "yearly",
    priority: path === "/" ? 1 : path.startsWith("/projects/") ? 0.8 : 0.6,
  }));
}

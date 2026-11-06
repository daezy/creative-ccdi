import { cache } from "react";
import { articles as localArticles } from "./content";
import { fetchPublishedArticles, type BlogConfig } from "./blog-content";
export type { Article } from "./blog-content";
export { articleMetadata, articleStructuredData } from "./blog-metadata";

export const staticBlog = process.env.STATIC_EXPORT === "true";
export const getBlogConfig = (): BlogConfig => ({
  projectId: process.env.SANITY_PROJECT_ID || "kpusk3kf",
  dataset: process.env.SANITY_DATASET || "production",
});

// Server deployments read published content on every request. Static exports
// embed an initial snapshot and refresh it in the browser.
export const getArticles = cache(async () => {
  if (process.env.SANITY_USE_LOCAL_CONTENT === "true") return localArticles;
  return fetchPublishedArticles(getBlogConfig(), {
    cache: staticBlog ? "force-cache" : "no-store",
    signal: AbortSignal.timeout(20000),
  });
});

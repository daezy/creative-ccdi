import type { MetadataRoute } from "next";
import { absoluteUrl, seoPages } from "@/lib/seo";
import library from "@/lib/media-library.json";
import { getArticles } from "@/lib/blog";
// Static exports emit a snapshot; server fetches remain uncached and dynamic.
export const revalidate = 60;
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articlePaths = (await getArticles()).map(
    (article) => `/blog/${article.slug}/`,
  );
  return [
    ...Object.keys(seoPages).filter(
      (path) => !path.startsWith("/blog/") || path === "/blog/",
    ),
    ...articlePaths,
  ].map((path) => ({
    url: absoluteUrl(path),
    ...(path === "/gallery/"
      ? {
          images: [
            ...new Set(
              Object.values(library).map((photo) => absoluteUrl(photo.src)),
            ),
          ],
        }
      : {}),
  }));
}

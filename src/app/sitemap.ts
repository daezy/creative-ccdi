import type { MetadataRoute } from "next";
import { absoluteUrl, seoPages } from "@/lib/seo";
import library from "@/lib/media-library.json";
import { getArticles } from "@/lib/blog";
export const dynamic = "force-static";
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

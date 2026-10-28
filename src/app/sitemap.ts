import type { MetadataRoute } from "next";
import { absoluteUrl, seoPages } from "@/lib/seo";
import library from "@/lib/media-library.json";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  return Object.keys(seoPages).map((path) => ({
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

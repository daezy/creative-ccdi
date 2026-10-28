import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/content";
import { indexingEnabled } from "@/lib/seo";
export const dynamic = "force-static";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: indexingEnabled
      ? { userAgent: "*", allow: "/" }
      : { userAgent: "*", disallow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}

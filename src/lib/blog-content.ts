import type { PortableTextBlock } from "@portabletext/types";

export type Article = {
  slug: string;
  title: string;
  description: string;
  category: string;
  author?: string;
  publishedAt?: string;
  coverImage?: { url: string; alt: string };
  body: string[][];
  richBody?: PortableTextBlock[];
};
export type BlogConfig = { projectId: string; dataset: string };

export async function fetchPublishedArticles(
  config: BlogConfig,
  options: RequestInit = {},
): Promise<Article[]> {
  if (
    !/^[a-z0-9]+$/.test(config.projectId) ||
    !/^[a-z0-9_-]+$/.test(config.dataset)
  )
    throw new Error("Invalid blog configuration");
  const query = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    "slug": slug.current, title, description, category, author, publishedAt,
    "coverImage": select(defined(coverImage.asset) => {"url": coverImage.asset->url, "alt": coverImage.alt}),
    "richBody": body
  }`;
  const url = new URL(
    `https://${config.projectId}.api.sanity.io/v2025-02-19/data/query/${config.dataset}`,
  );
  url.searchParams.set(
    "query",
    options.cache === "force-cache"
      ? `${query}\n// export ${process.env.BLOG_BUILD_ID || "snapshot"}`
      : query,
  );
  url.searchParams.set("perspective", "published");
  // Browser reads bypass HTTP caches; exported snapshots use a build-specific
  // query URL so separate cPanel builds cannot reuse an old Next fetch entry.
  const response = await fetch(url, options);
  if (!response.ok)
    throw new Error(`Sanity blog request failed: ${response.status}`);
  const { result } = await response.json();
  if (!Array.isArray(result)) throw new Error("Invalid blog response");
  return result.map((post) => {
    if (
      typeof post.slug !== "string" ||
      !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(post.slug) ||
      typeof post.title !== "string" ||
      typeof post.description !== "string" ||
      typeof post.category !== "string" ||
      !Array.isArray(post.richBody)
    ) {
      throw new Error("A published post has invalid or incomplete content");
    }
    return { ...post, body: [] };
  });
}

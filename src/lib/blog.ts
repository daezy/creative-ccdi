import { cache } from "react";
import type { PortableTextBlock } from "@portabletext/types";
import { articles as localArticles } from "./content";
import {
  absoluteUrl,
  organisationName,
  pageMetadata,
  pageStructuredData,
  seoPages,
} from "./seo";
import type { Metadata } from "next";

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

// Changes every build, so Next's fetch cache can never serve posts from an
// earlier build (the GROQ comment only changes the request URL).
const BUILD_STAMP = Date.now();

// Only published documents are read. Never expose editor credentials to the site.
export const getArticles = cache(async (): Promise<Article[]> => {
  if (process.env.SANITY_USE_LOCAL_CONTENT === "true") return localArticles;
  const project = process.env.SANITY_PROJECT_ID || "z53lde5i";
  if (!/^[a-z0-9]+$/.test(project))
    throw new Error("Invalid SANITY_PROJECT_ID");
  const dataset = process.env.SANITY_DATASET || "production";
  const query = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    "slug": slug.current, title, description, category, author, publishedAt,
    "coverImage": select(defined(coverImage.asset) => {"url": coverImage.asset->url, "alt": coverImage.alt}),
    "richBody": body
  }
  // build ${BUILD_STAMP}`;
  const url = new URL(
    `https://${project}.api.sanity.io/v2025-02-19/data/query/${encodeURIComponent(dataset)}`,
  );
  url.searchParams.set("query", query);
  url.searchParams.set("perspective", "published");
  const response = await fetch(url, {
    // Static export: fetch once at build time. ("no-store" marks the page as
    // dynamic, which a static site cannot render.)
    cache: "force-cache",
    signal: AbortSignal.timeout(20000),
  });
  if (!response.ok)
    throw new Error(`Sanity blog request failed: ${response.status}`);
  const { result } = await response.json();
  if (!Array.isArray(result)) throw new Error("Invalid Sanity blog response");
  // Until the original articles are imported (docs/blog-sanity.md), an empty
  // dataset would leave the blog with no pages and break the static build.
  if (result.length === 0) {
    console.warn(
      "Sanity returned no published posts; using the original local articles.",
    );
    return localArticles;
  }
  return result.map((post: Omit<Article, "body">) => ({ ...post, body: [] }));
});

export function articleMetadata(article: Article): Metadata {
  const path = `/blog/${article.slug}/`;
  if (!article.richBody && seoPages[path]) return pageMetadata(path);
  const title = `${article.title} | CCDI`;
  const image = article.coverImage?.url || absoluteUrl("/social/blog.png");
  return {
    title: { absolute: title },
    description: article.description,
    alternates: { canonical: absoluteUrl(path) },
    openGraph: {
      type: "article",
      title,
      description: article.description,
      url: absoluteUrl(path),
      siteName: organisationName,
      locale: "en_NG",
      publishedTime: article.publishedAt,
      images: [{ url: image, alt: article.coverImage?.alt || article.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: article.description,
      images: [{ url: image, alt: article.coverImage?.alt || article.title }],
    },
  };
}

export function articleStructuredData(article: Article) {
  const path = `/blog/${article.slug}/`;
  if (!article.richBody && seoPages[path]) return pageStructuredData(path);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        headline: article.title,
        description: article.description,
        url: absoluteUrl(path),
        mainEntityOfPage: absoluteUrl(path),
        datePublished: article.publishedAt,
        image: [article.coverImage?.url || absoluteUrl("/social/blog.png")],
        author: {
          "@type": "Organization",
          name: article.author || "CCDI Journal",
        },
        publisher: { "@id": absoluteUrl("/#organisation") },
        articleSection: article.category,
        inLanguage: "en-NG",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: absoluteUrl("/"),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Journal",
            item: absoluteUrl("/blog/"),
          },
          {
            "@type": "ListItem",
            position: 3,
            name: article.title,
            item: absoluteUrl(path),
          },
        ],
      },
    ],
  };
}

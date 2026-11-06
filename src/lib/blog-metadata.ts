import type { Article } from "./blog-content";
import {
  absoluteUrl,
  organisationName,
  pageMetadata,
  pageStructuredData,
  seoPages,
} from "./seo";
import type { Metadata } from "next";

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

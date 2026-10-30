import type { Metadata } from "next";
import pages from "./seo-pages.json";
import { contact, facebook, tiktok, siteUrl } from "./content";
import { photos } from "./media";

export type SeoPage = {
  title: string;
  description: string;
  label: string;
  category: string;
  type?: string;
  parent?: { path: string; name: string };
};
export const seoPages: Record<string, SeoPage> = pages;
export const organisationName = "Creative Craft Development Initiative";
export const absoluteUrl = (path: string) => new URL(path, `${siteUrl}/`).href;
export const socialImagePath = (path: string) =>
  `/social/${path === "/" ? "home" : path.replace(/^\/+|\/+$/g, "").replaceAll("/", "--")}.png`;
export const indexingEnabled =
  process.env.NEXT_PUBLIC_ALLOW_INDEXING !== "false";

/** Supply complete nested objects: Next metadata merging is shallow. */
export function pageMetadata(path: string): Metadata {
  const page = seoPages[path];
  if (!page) throw new Error(`Missing SEO content for ${path}`);
  const title = page.title.includes("CCDI")
    ? page.title
    : `${page.title} | CCDI`;
  const image = {
    url: absoluteUrl(socialImagePath(path)),
    width: 1200,
    height: 630,
    type: "image/png",
    alt: `${page.title} | ${organisationName}`,
  };
  return {
    title: { absolute: title },
    description: page.description,
    alternates: { canonical: absoluteUrl(path) },
    openGraph: {
      type: page.type === "article" ? "article" : "website",
      title,
      description: page.description,
      url: absoluteUrl(path),
      siteName: organisationName,
      locale: "en_NG",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: page.description,
      images: [{ url: image.url, alt: image.alt }],
    },
  };
}

export const siteStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": absoluteUrl("/#organisation"),
      name: organisationName,
      alternateName: "CCDI",
      url: absoluteUrl("/"),
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/images/ccdi-logo-transparent.png"),
        width: 1319,
        height: 1192,
      },
      description: seoPages["/"].description,
      email: contact.email,
      telephone: contact.phones[0].href.replace("tel:", ""),
      address: {
        "@type": "PostalAddress",
        streetAddress: "No. 9, Sanusi Adeyemo Street, Satellite Town",
        addressLocality: "Lagos",
        addressRegion: "Lagos",
        addressCountry: "NG",
      },
      contactPoint: contact.phones.map((phone) => ({
        "@type": "ContactPoint",
        telephone: phone.href.replace("tel:", ""),
        contactType: "Enquiries",
        email: contact.email,
      })),
      sameAs: [facebook, tiktok],
    },
    {
      "@type": "WebSite",
      "@id": absoluteUrl("/#website"),
      url: absoluteUrl("/"),
      name: organisationName,
      alternateName: "CCDI",
      inLanguage: "en-NG",
      publisher: { "@id": absoluteUrl("/#organisation") },
    },
  ],
};

export function pageStructuredData(path: string) {
  const page = seoPages[path];
  const articlePhoto = page.type === "article" ? photos[page.title] : undefined;
  const breadcrumbs = [
    { path: "/", name: "Home" },
    ...(page.parent ? [page.parent] : []),
    ...(path !== "/" ? [{ path, name: page.label }] : []),
  ];
  const breadcrumbId = absoluteUrl(`${path}#breadcrumb`);
  const pageId = absoluteUrl(`${path}#webpage`);
  const graph: Record<string, unknown>[] = [
    {
      "@type":
        path === "/about/"
          ? "AboutPage"
          : path === "/contact/"
            ? "ContactPage"
            : [
                  "/gallery/",
                  "/videos/",
                  "/blog/",
                  "/programmes/",
                  "/projects/",
                  "/documents/",
                ].includes(path)
              ? "CollectionPage"
              : "WebPage",
      "@id": pageId,
      url: absoluteUrl(path),
      name: page.title,
      description: page.description,
      inLanguage: "en-NG",
      isPartOf: { "@id": absoluteUrl("/#website") },
      about: { "@id": absoluteUrl("/#organisation") },
      ...(articlePhoto
        ? {
            primaryImageOfPage: {
              "@type": "ImageObject",
              url: absoluteUrl(articlePhoto.src),
              width: articlePhoto.width,
              height: articlePhoto.height,
            },
          }
        : {}),
      ...(path !== "/" ? { breadcrumb: { "@id": breadcrumbId } } : {}),
    },
  ];
  if (path !== "/")
    graph.push({
      "@type": "BreadcrumbList",
      "@id": breadcrumbId,
      itemListElement: breadcrumbs.map((crumb, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: crumb.name,
        item: absoluteUrl(crumb.path),
      })),
    });
  if (page.type === "article")
    graph.push({
      "@type": "BlogPosting",
      "@id": absoluteUrl(`${path}#article`),
      headline: page.title,
      description: page.description,
      url: absoluteUrl(path),
      mainEntityOfPage: { "@id": pageId },
      image: [absoluteUrl(articlePhoto?.src || socialImagePath(path))],
      author: {
        "@type": "Organization",
        "@id": absoluteUrl("/#organisation"),
        name: organisationName,
        url: absoluteUrl("/"),
      },
      publisher: { "@id": absoluteUrl("/#organisation") },
      inLanguage: "en-NG",
      articleSection: page.category,
    });
  return { "@context": "https://schema.org", "@graph": graph };
}

import { ArrowUpRight } from "lucide-react";
import { StructuredData } from "@/components/structured-data";
import {
  getArticles,
  articleMetadata,
  articleStructuredData,
} from "@/lib/blog";
import { ArticleImage } from "@/components/article-image";
import { PortableText } from "@portabletext/react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Eyebrow, Button, Cta } from "@/components/ui";
export const dynamicParams = false;
export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((a) => ({ slug: a.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = (await getArticles()).find((a) => a.slug === slug);
  return a ? articleMetadata(a) : {};
}
export default async function Article({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = (await getArticles()).find((a) => a.slug === slug);
  if (!a) notFound();
  const headings = a.richBody
    ? a.richBody
        .filter((block) => block.style === "h2")
        .map((block) => ({
          id: `section-${block._key}`,
          text: block.children.map((child) => child.text || "").join(""),
        }))
    : a.body.map(([heading], index) => ({
        id: `article-section-${index + 1}`,
        text: heading,
      }));
  return (
    <>
      <StructuredData data={articleStructuredData(a)} />
      <article className="narrative-article">
        <header className="page-hero article-hero narrative-article-hero">
          <div className="container">
            <div className="breadcrumb">
              <Link href="/">Home</Link>
              <span>/</span>
              <Link href="/blog/">Journal</Link>
            </div>
            <Eyebrow>{a.category}</Eyebrow>
            <h1>{a.title}</h1>
            <p>{a.description}</p>
            <span className="article-byline">
              {a.author || "CCDI Journal"}
              {a.publishedAt && (
                <>
                  {" "}
                  ·{" "}
                  {new Date(a.publishedAt).toLocaleDateString("en-GB", {
                    timeZone: "UTC",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </>
              )}
            </span>
          </div>
        </header>
        <div className="container article-content">
          <div className="article-photo">
            <ArticleImage
              article={a}
              priority
              sizes="(max-width: 1000px) 100vw, 1100px"
            />
          </div>
          <div className="article-reading-layout">
            <nav className="article-contents" aria-label="Article sections">
              {headings.map((heading) => (
                <a href={`#${heading.id}`} key={heading.id}>
                  {heading.text}
                </a>
              ))}
              <Link href="/blog/">
                The CCDI journal{" "}
                <ArrowUpRight className="inline-icon" aria-hidden="true" />
              </Link>
            </nav>
            <div className="prose narrow">
              {a.richBody && (
                <PortableText
                  value={a.richBody}
                  components={{
                    block: {
                      h2: ({ children, value }) => (
                        <h2 id={`section-${value._key}`}>{children}</h2>
                      ),
                    },
                    marks: {
                      link: ({ children, value }) => {
                        const href =
                          typeof value?.href === "string" &&
                          /^(https?:\/\/|mailto:|tel:|\/|#)/i.test(
                            value.href,
                          ) &&
                          !value.href.startsWith("//")
                            ? value.href
                            : undefined;
                        return href ? (
                          <a href={href}>{children}</a>
                        ) : (
                          <>{children}</>
                        );
                      },
                    },
                  }}
                />
              )}
              {a.body.map(([heading, text], index) => (
                <section key={heading} id={`article-section-${index + 1}`}>
                  <h2>{heading}</h2>
                  <p>{text}</p>
                </section>
              ))}
              <div className="article-end">
                <p>
                  Discover practical opportunities to learn, contribute, and
                  grow with CCDI.
                </p>
                <Button href="/programmes/">Explore our programmes</Button>
              </div>
            </div>
          </div>
        </div>
      </article>
      <Cta />
    </>
  );
}

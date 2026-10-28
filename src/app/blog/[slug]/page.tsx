import { pageMetadata } from "@/lib/seo";
import { PageStructuredData } from "@/components/structured-data";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles } from "@/lib/content";
import { Eyebrow, Button, Cta, PhotoSlot } from "@/components/ui";
export const dynamicParams = false;
export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = articles.find((a) => a.slug === slug);
  return a ? pageMetadata(`/blog/${slug}/`) : {};
}
export default async function Article({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = articles.find((a) => a.slug === slug);
  if (!a) notFound();
  const i = articles.indexOf(a);
  return (
    <>
      <PageStructuredData path={`/blog/${slug}/`} />
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
              CCDI Journal · Programme perspective
            </span>
          </div>
        </header>
        <div className="container article-content">
          <div className="article-photo">
            <PhotoSlot label={a.title} />
          </div>
          <div className="article-reading-layout">
            <nav className="article-contents" aria-label="Article sections">
              {a.body.map(([heading], index) => (
                <a href={`#article-section-${index + 1}`} key={heading}>
                  {heading}
                </a>
              ))}
              <Link href="/blog/">The CCDI journal ↗</Link>
            </nav>
            <div className="prose narrow">
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

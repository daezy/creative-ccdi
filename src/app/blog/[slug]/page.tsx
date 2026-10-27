import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles } from "@/lib/content";
import { Eyebrow, Button, Cta } from "@/components/ui";
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
  return a
    ? {
        title: a.title,
        description: a.description,
        alternates: { canonical: `/blog/${slug}/` },
        openGraph: {
          type: "article",
          title: a.title,
          description: a.description,
        },
      }
    : {};
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
      <article>
        <header className="page-hero article-hero">
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
          <div
            className={`journal-art article-art journal-art-${i}`}
            aria-hidden="true"
          >
            <span>{["Aa", "↗", "&"][i]}</span>
            <small>THE CCDI JOURNAL / 0{i + 1}</small>
          </div>
          <div className="prose narrow">
            {a.body.map(([heading, text]) => (
              <section key={heading}>
                <h2>{heading}</h2>
                <p>{text}</p>
              </section>
            ))}
            <div className="article-end">
              <p>
                Discover practical opportunities to learn, contribute, and grow
                with CCDI.
              </p>
              <Button href="/programmes/">Explore our programmes</Button>
            </div>
          </div>
        </div>
      </article>
      <Cta />
    </>
  );
}

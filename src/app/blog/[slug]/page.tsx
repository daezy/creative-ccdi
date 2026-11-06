import {
  getArticles,
  articleMetadata,
  staticBlog,
  getBlogConfig,
} from "@/lib/blog";
import { ArticleView } from "@/components/article-view";
import { LiveArticle } from "@/components/live-blog";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

// Leave dynamicParams at its default so server deployments accept new slugs.
// Apache routes new cPanel article URLs to the exported __live__ shell.
export async function generateStaticParams() {
  const posts = (await getArticles()).map((a) => ({ slug: a.slug }));
  return staticBlog
    ? [{ slug: "__live__" }, ...posts]
    : posts.length
      ? posts
      : [{ slug: "__empty__" }];
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (staticBlog && slug === "__live__")
    return {
      title: "Journal article | CCDI",
      description: "Stories and updates from CCDI.",
      alternates: { canonical: "/blog/" },
      robots: { index: false, follow: true },
    };
  const article = (await getArticles()).find((a) => a.slug === slug);
  return article
    ? articleMetadata(article)
    : { title: "Article not found | CCDI", robots: { index: false } };
}
export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = (await getArticles()).find((a) => a.slug === slug);
  if (staticBlog)
    return <LiveArticle initialArticle={article} config={getBlogConfig()} />;
  if (!article) notFound();
  return <ArticleView article={article} />;
}

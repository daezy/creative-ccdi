"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  fetchPublishedArticles,
  type Article,
  type BlogConfig,
} from "@/lib/blog-content";
import { articleMetadata } from "@/lib/blog-metadata";
import { ArticleView } from "./article-view";
import { BlogCards } from "./blog-cards";

function useLiveArticles(config: BlogConfig, initial: Article[]) {
  const [articles, setArticles] = useState(initial);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const request = useRef<AbortController | null>(null);
  const refresh = useCallback(async () => {
    request.current?.abort();
    const controller = new AbortController();
    request.current = controller;
    const timeout = window.setTimeout(() => controller.abort("timeout"), 20000);
    try {
      const posts = await fetchPublishedArticles(config, {
        cache: "no-store",
        signal: controller.signal,
      });
      if (request.current !== controller) return;
      setArticles(posts);
      setLoaded(true);
      setError(false);
    } catch {
      if (request.current === controller) setError(true);
    } finally {
      window.clearTimeout(timeout);
    }
  }, [config.projectId, config.dataset]);
  useEffect(() => {
    void refresh();
    const visible = () => {
      if (!document.hidden) void refresh();
    };
    const timer = window.setInterval(visible, 60000);
    window.addEventListener("focus", visible);
    document.addEventListener("visibilitychange", visible);
    return () => {
      request.current?.abort();
      request.current = null;
      window.clearInterval(timer);
      window.removeEventListener("focus", visible);
      document.removeEventListener("visibilitychange", visible);
    };
  }, [refresh]);
  return { articles, loaded, error, refresh };
}
function BlogError({ retry }: { retry: () => void }) {
  return (
    <p role="status">
      The latest journal content could not be loaded.{" "}
      <button type="button" onClick={retry}>
        Try again
      </button>
    </p>
  );
}
export function LiveBlogList({
  initialArticles,
  config,
  home = false,
}: {
  initialArticles: Article[];
  config: BlogConfig;
  home?: boolean;
}) {
  const { articles, error, refresh } = useLiveArticles(config, initialArticles);
  return (
    <div className="live-blog">
      <BlogCards articles={articles} home={home} />
      {error && <BlogError retry={refresh} />}
    </div>
  );
}
export function LiveArticle({
  initialArticle,
  config,
}: {
  initialArticle?: Article;
  config: BlogConfig;
}) {
  const { articles, loaded, error, refresh } = useLiveArticles(
    config,
    initialArticle ? [initialArticle] : [],
  );
  const [slug, setSlug] = useState(initialArticle?.slug || "");
  useEffect(() => {
    setSlug(
      decodeURIComponent(
        location.pathname.split("/").filter(Boolean).at(-1) || "",
      ),
    );
  }, []);
  const article = articles.find((a) => a.slug === slug);
  useEffect(() => {
    if (!loaded) return;
    const setMeta = (name: string, content: string, property = false) => {
      const attr = property ? "property" : "name";
      let meta = document.head.querySelector<HTMLMetaElement>(
        `meta[${attr}="${name}"]`,
      );
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute(attr, name);
        document.head.append(meta);
      }
      meta.content = content;
    };
    setMeta("robots", article ? "index, follow" : "noindex, follow");
    setMeta("googlebot", article ? "index, follow" : "noindex, follow");
    if (!article) {
      document.title = "Article not found | CCDI";
      return;
    }
    document.title = `${article.title} | CCDI`;
    setMeta("description", article.description);
    const meta = articleMetadata(article);
    const canonical = String(
      meta.alternates?.canonical || location.href.split("?")[0],
    );
    let link = document.head.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    );
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.append(link);
    }
    link.href = canonical;
    for (const [name, content] of Object.entries({
      "og:title": document.title,
      "og:description": article.description,
      "og:type": "article",
      "og:url": canonical,
      "og:image":
        article.coverImage?.url || new URL("/social/blog.png", canonical).href,
    }))
      setMeta(name, content, true);
    setMeta("twitter:title", document.title);
    setMeta("twitter:description", article.description);
    setMeta(
      "twitter:image",
      article.coverImage?.url || new URL("/social/blog.png", canonical).href,
    );
  }, [article, loaded]);
  return (
    <div className="live-blog">
      {article ? (
        <ArticleView article={article} />
      ) : (
        <div className="container section">
          <h1>
            {loaded
              ? "Article not found"
              : error
                ? "Article unavailable"
                : "Loading article…"}
          </h1>
          {loaded && (
            <p>
              This article may have been unpublished.{" "}
              <a href="/blog/" data-native-navigation>
                Return to the journal
              </a>
              .
            </p>
          )}
        </div>
      )}
      {error && (
        <div className="container">
          <BlogError retry={refresh} />
        </div>
      )}
    </div>
  );
}

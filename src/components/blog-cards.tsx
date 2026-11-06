import { ArrowUpRight } from "lucide-react";
import type { Article } from "@/lib/blog-content";
import { ArticleImage } from "./article-image";
import { SectionHead } from "./ui";

export function BlogCards({
  articles,
  home = false,
}: {
  articles: Article[];
  home?: boolean;
}) {
  const cards = (
    <div className="journal-grid">
      {(home ? articles.slice(0, 3) : articles).map((article) => (
        <a
          className="journal-card"
          href={`/blog/${article.slug}/`}
          key={article.slug}
          data-native-navigation
        >
          <div className="journal-photo">
            <ArticleImage article={article} />
          </div>
          <div className="journal-card-label">
            <span>{article.category}</span>
            <ArrowUpRight size={18} aria-hidden="true" />
          </div>
          {home ? <h3>{article.title}</h3> : <h2>{article.title}</h2>}
          <p>{article.description}</p>
          {home && (
            <span className="home-article-link">
              Read article <ArrowUpRight size={17} aria-hidden="true" />
            </span>
          )}
        </a>
      ))}
      {!articles.length && <p>No journal articles have been published yet.</p>}
    </div>
  );
  return home ? (
    <section
      className="section home-journal"
      id="home-journal"
      aria-label="From the CCDI journal"
    >
      <div className="container">
        <SectionHead
          eyebrow="Journal & updates"
          title={
            <>
              Ideas, stories & <em>perspectives.</em>
            </>
          }
          href="/blog/"
          linkLabel="Visit our blog"
        />
        {cards}
      </div>
    </section>
  ) : (
    cards
  );
}

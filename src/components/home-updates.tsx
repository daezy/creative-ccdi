import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { articles } from "@/lib/content";
import { publicationIds } from "@/lib/media";
import library from "@/lib/media-library.json";
import videos from "@/lib/video-library.json";
import { responsive } from "@/lib/responsive";
import { Eyebrow, PhotoSlot, SectionHead, TextLink } from "./ui";

export function HomePublications() {
  const film = videos.find((video) => video.id === "publication-unveiling")!;
  return (
    <section
      className="section home-publications"
      id="home-publications"
      aria-label="CCDI publications and films"
    >
      <div className="container">
        <SectionHead
          eyebrow="Publications & programme resources"
          title={
            <>
              From the CCDI <em>collection.</em>
            </>
          }
          href="/documents/#publications"
          linkLabel="Explore our resources"
        />
        <div className="home-publications-layout">
          <div className="home-book-grid">
            {publicationIds.map((id) => {
              const book = library[id];
              return (
                <a
                  className="home-book"
                  href={book.src}
                  target="_blank"
                  rel="noreferrer"
                  key={id}
                  aria-label={`View cover: ${book.alt} (opens in a new tab)`}
                >
                  <div className="home-book-cover">
                    <img
                      src={book.src}
                      alt={`Publication cover: ${book.alt}`}
                      width={book.width}
                      height={book.height}
                      loading="lazy"
                      decoding="async"
                      {...responsive(
                        book.src,
                        book.width,
                        "(max-width: 600px) 45vw, (max-width: 1000px) 22vw, 15vw",
                      )}
                    />
                  </div>
                  <h3>{book.alt}</h3>
                  <span className="home-book-link">
                    View cover <ArrowUpRight size={15} aria-hidden="true" />
                  </span>
                </a>
              );
            })}
          </div>
          <div className="home-featured-film">
            <Eyebrow>CCDI in motion</Eyebrow>
            <h3>{film.title}</h3>
            <video
              controls
              playsInline
              preload="none"
              poster={film.poster}
              aria-label={film.title}
            >
              <source src={film.src} type="video/mp4" />
              <a href={film.src}>Watch {film.title}</a>
            </video>
            <span className="home-film-meta">
              {film.category} · {Math.floor(film.duration / 60)}:
              {String(film.duration % 60).padStart(2, "0")}
            </span>
            <TextLink href="/videos/">View all films</TextLink>
          </div>
        </div>
      </div>
    </section>
  );
}

export function HomeJournal() {
  return (
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
        <div className="journal-grid">
          {articles.map((article) => (
            <Link
              className="journal-card"
              href={`/blog/${article.slug}/`}
              key={article.slug}
            >
              <div className="journal-photo">
                <PhotoSlot label={article.title} />
              </div>
              <div className="journal-card-label">
                <span>{article.category}</span>
                <ArrowUpRight size={18} aria-hidden="true" />
              </div>
              <h3>{article.title}</h3>
              <p>{article.description}</p>
              <span className="home-article-link">
                Read article <ArrowUpRight size={17} aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

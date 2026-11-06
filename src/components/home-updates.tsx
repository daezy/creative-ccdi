import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getArticles, staticBlog, getBlogConfig } from "@/lib/blog";
import { BlogCards } from "./blog-cards";
import { LiveBlogList } from "./live-blog";
import { publicationIds } from "@/lib/media";
import library from "@/lib/media-library.json";
import videos from "@/lib/video-library.json";
import { responsive } from "@/lib/responsive";
import { Eyebrow, SectionHead, TextLink } from "./ui";

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

export async function HomeJournal() {
  const articles = await getArticles();
  return staticBlog ? (
    <LiveBlogList initialArticles={articles} config={getBlogConfig()} home />
  ) : (
    <BlogCards articles={articles} home />
  );
}

import { ArrowUpRight } from "lucide-react";
import { responsive, SIZES } from "@/lib/responsive";
import library from "@/lib/media-library.json";
import videos from "@/lib/video-library.json";
import { Eyebrow, SectionHead, TextLink } from "./ui";

export function VideoCollection({
  category,
  compact = false,
}: {
  category?: string;
  compact?: boolean;
}) {
  const items = videos.filter((v) => !category || v.category === category);
  return (
    <section className="video-collection">
      <SectionHead
        eyebrow="CCDI in motion"
        title={
          category
            ? `${category} in action`
            : "Programme films & event highlights"
        }
      />
      <div className="video-grid">
        {items.slice(0, compact ? 2 : undefined).map((v) => (
          <article className="video-card" key={v.id}>
            <video
              controls
              playsInline
              preload="none"
              poster={v.poster}
              aria-label={v.title}
            >
              <source src={v.src} type="video/mp4" />
              Your browser does not support this video.{" "}
              <a href={v.src}>Open {v.title}</a>
            </video>
            <div>
              <span className="card-category">
                {v.category} · {Math.floor(v.duration / 60)}:
                {String(v.duration % 60).padStart(2, "0")}
              </span>
              <h3>{v.title}</h3>
            </div>
          </article>
        ))}
      </div>
      {compact && <TextLink href="/videos/">View all films</TextLink>}
    </section>
  );
}
export function Publications() {
  const books = [
    "godly-pattern",
    "grace-empowered",
    "true-riches",
    "advancing-in-age",
    "purpose-fulfilled",
    "kept-from-falling",
    "hope-dry-tree",
    "helpers-helpmeet",
  ] as const;
  return (
    <>
      <SectionHead
        eyebrow="Publications & programme resources"
        title="From the CCDI collection"
      >
        Publication covers, training materials, and event artwork from the
        supplied archive.
      </SectionHead>
      <div className="publication-grid">
        {books.map((id) => {
          const p = library[id];
          return (
            <a
              className="publication-card"
              href={p.src}
              target="_blank"
              rel="noreferrer"
              key={id}
            >
              <img
                src={p.src}
                alt={`Publication cover: ${p.alt}`}
                width={p.width}
                height={p.height}
                loading="lazy"
                decoding="async"
                {...responsive(p.src, p.width, SIZES.quarter)}
              />
              <h2>{p.alt}</h2>
              <span className="text-link">
                View cover{" "}
                <ArrowUpRight className="inline-icon" aria-hidden="true" />
              </span>
            </a>
          );
        })}
      </div>
      <section className="content-section">
        <SectionHead
          eyebrow="Programme archive"
          title="Training & event materials"
        >
          These flyers record CCDI programmes and past events. Contact CCDI for
          current schedules and enrolment details.
        </SectionHead>
        <div className="flyer-grid">
          {Object.entries(library)
            .filter(([, p]) => p.category === "Programme flyers")
            .map(([id, p]) => (
              <a
                href={p.src}
                target="_blank"
                rel="noreferrer"
                key={id}
                className="flyer-card"
              >
                <img
                  src={p.src}
                  alt={p.alt}
                  width={p.width}
                  height={p.height}
                  loading="lazy"
                  decoding="async"
                  {...responsive(p.src, p.width, SIZES.third)}
                />
                <h3>{p.alt}</h3>
                <span>
                  View full image{" "}
                  <ArrowUpRight className="inline-icon" aria-hidden="true" />
                </span>
              </a>
            ))}
        </div>
      </section>
      <section className="content-section">
        <VideoCollection category="Publications" />
      </section>
    </>
  );
}
export function ProjectPhotos({ slug }: { slug: string }) {
  const groups: Record<string, string[]> = {
    "capacity-development": [
      "sewing-class",
      "catering-class",
      "beauty-training",
      "pastry-practice",
      "tailoring-workshop",
      "certification-event",
    ],
    "social-enterprise": [
      "catering-service",
      "fashion-design",
      "handmade-bags",
      "event-decoration",
      "poultry-enterprise",
      "beadwork",
    ],
    "benevolent-childcare": [
      "welfare-visit",
      "outreach-team",
      "welfare-supplies",
      "outreach-gathering",
    ],
    "creative-community": [
      "couples-blissful-day",
      "family-event-guests",
      "family-talk",
      "community-award",
    ],
  };
  return (
    <section className="content-section">
      <SectionHead
        eyebrow="From our archive"
        title="The initiative in pictures"
      />
      <div className="initiative-photo-grid">
        {(groups[slug] || []).map((id) => {
          const p = library[id as keyof typeof library];
          return (
            <figure key={id}>
              <a
                href={p.src}
                target="_blank"
                rel="noreferrer"
                aria-label={`View ${p.alt}`}
              >
                <img
                  src={p.src}
                  alt={p.alt}
                  width={p.width}
                  height={p.height}
                  loading="lazy"
                  decoding="async"
                  {...responsive(p.src, p.width, SIZES.third)}
                />
              </a>
              <figcaption>{p.alt}</figcaption>
            </figure>
          );
        })}
      </div>
    </section>
  );
}

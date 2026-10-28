import Link from "next/link";
import { ArrowDownRight, FileText, ShieldCheck } from "lucide-react";
import { pageInfo } from "@/lib/content";
import library from "@/lib/media-library.json";
import { communityTestimonials } from "@/lib/testimonials";
import { Eyebrow, TextLink } from "./ui";

type PageDesign = {
  family: string;
  image?: keyof typeof library;
  links: [string, string][];
};
export const pageDesigns: Record<string, PageDesign> = {
  about: {
    family: "identity",
    image: "outreach-volunteers",
    links: [
      ["Who we are", "our-story"],
      ["Board of Trustees & Management Team", "governance"],
    ],
  },
  "vision-mission": {
    family: "identity",
    image: "seminar-audience",
    links: [
      ["Vision statement", "vision-statement"],
      ["Mission statement", "mission-statement"],
    ],
  },
  "core-values": {
    family: "identity",
    image: "outreach-team",
    links: [["Our Core Values", "page-details"]],
  },
  projects: {
    family: "work",
    image: "training-room",
    links: [["Four-Integrated Project-Arm Structure", "page-details"]],
  },
  "skills-training": {
    family: "work",
    image: "baking-trainees",
    links: [
      ["Explore your interests", "training-areas"],
      ["Joining a programme", "registration-guidance"],
    ],
  },
  programmes: {
    family: "work",
    image: "craft-workshop",
    links: [
      ["Youth empowerment", "youth-empowerment"],
      ["Women’s empowerment", "women-empowerment"],
      ["Benevolent & childcare", "benevolent-childcare"],
      ["Community & family strengthening", "community-family"],
    ],
  },
  services: {
    family: "work",
    image: "event-service-team",
    links: [["CCDI Social Enterprise", "page-details"]],
  },
  impact: {
    family: "impact",
    image: "community-celebration",
    links: [
      ["Our impact statistics at a glance", "page-details"],
      ["Reported achievements", "reported-achievements"],
      ["The next chapter", "future-plans"],
    ],
  },
  partners: {
    family: "participate",
    image: "outreach-team",
    links: [
      ["Our partnership opportunities", "partnership-opportunities"],
      ["Membership & service", "membership-guidance"],
    ],
  },
  volunteer: {
    family: "participate",
    image: "sewing-class",
    links: [
      ["Find your contribution", "contribution"],
      ["Membership & service", "membership-guidance"],
      ["Our membership code of conduct", "member-conduct"],
    ],
  },
  donate: {
    family: "participate",
    image: "welfare-visit",
    links: [["Support that opens doors", "page-details"]],
  },
  testimonials: {
    family: "voices",
    links: [
      ["In their own words", "community-stories-heading"],
      ["Leadership & management", "leadership-reflections-heading"],
    ],
  },
  gallery: {
    family: "archive",
    links: [
      ["Gallery of Event Photos", "gallery-collections"],
      ["Photography & dignity", "photo-video-consent"],
    ],
  },
  videos: {
    family: "archive",
    links: [
      ["Programme films & event highlights", "page-details"],
      ["Photography & dignity", "photo-video-consent"],
    ],
  },
  blog: {
    family: "archive",
    image: "family-event-guests",
    links: [["The CCDI journal", "page-details"]],
  },
  documents: {
    family: "reference",
    links: [
      ["Forms & downloads", "forms"],
      ["Publications & programme resources", "publications"],
    ],
  },
  contact: {
    family: "reference",
    links: [
      ["A good place to start", "contact-details"],
      ["Let’s connect", "contact-enquiry"],
    ],
  },
  "privacy-policy": {
    family: "reference",
    links: [
      ["CCDI’s privacy and data protection policy", "organisational-privacy"],
      ["About this website", "website-privacy"],
    ],
  },
  "child-protection": {
    family: "reference",
    links: [
      ["Child safeguarding policy", "safeguarding-policy"],
      ["Photography & dignity", "photo-video-consent"],
    ],
  },
  "financial-transparency": {
    family: "reference",
    links: [
      ["Our commitment", "page-details"],
      ["How our work is supported", "funding-sources"],
      ["How funds are used", "fund-uses"],
    ],
  },
};

export function PageMasthead({ slug }: { slug: string }) {
  const info = pageInfo[slug];
  const design = pageDesigns[slug];
  const photo = design.image ? library[design.image] : undefined;
  return (
    <header
      className={`page-hero narrative-masthead masthead-${design.family} ${photo ? "masthead-photographic" : "masthead-typographic"}`}
    >
      <div className="container">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <span>{info.label}</span>
        </nav>
        <div className="masthead-composition">
          <div className="masthead-copy">
            <Eyebrow>{info.label}</Eyebrow>
            <h1>{info.title}</h1>
            <p>{info.description}</p>
          </div>
          {photo && (
            <figure className="masthead-photograph">
              <img
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                fetchPriority="high"
              />
              <figcaption>{info.label}</figcaption>
            </figure>
          )}
          {design.family === "voices" && (
            <div className="masthead-portraits" aria-hidden="true">
              {communityTestimonials.slice(0, 3).map((story) => (
                <img
                  key={story.id}
                  src={story.portrait}
                  alt=""
                  width={240}
                  height={320}
                  style={{ objectPosition: story.position }}
                />
              ))}
            </div>
          )}
          {design.family === "reference" && (
            <div className="reference-emblem" aria-hidden="true">
              {slug.includes("protection") || slug.includes("privacy") ? (
                <ShieldCheck size={62} strokeWidth={1} />
              ) : (
                <FileText size={62} strokeWidth={1} />
              )}
            </div>
          )}
        </div>
        <nav
          className="page-reading-links"
          aria-label={`${info.label}: page sections`}
        >
          {design.links.map(([label, id]) => (
            <a key={id} href={`#${id}`}>
              {label}
              <ArrowDownRight size={16} aria-hidden="true" />
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function CommunityEvidence({ id }: { id: string }) {
  const story = communityTestimonials.find((s) => s.id === id)!;
  return (
    <aside className="community-evidence">
      <div className="evidence-portrait">
        <img
          src={story.portrait}
          alt={story.name}
          width={300}
          height={380}
          loading="lazy"
          style={{ objectPosition: story.position }}
        />
      </div>
      <div>
        <Eyebrow>{story.category}</Eyebrow>
        <h2>{story.title}</h2>
        <blockquote>
          <p>“{story.excerpt}”</p>
        </blockquote>
        <p className="evidence-attribution">
          <strong>{story.name}</strong>
          <span>{story.role}</span>
        </p>
        <TextLink href={`/testimonials/#story-${story.id}`}>
          Testimonials
        </TextLink>
      </div>
    </aside>
  );
}

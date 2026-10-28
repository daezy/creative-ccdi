import { FormCallout } from "@/components/document-library";
import { ProjectPhotos, VideoCollection } from "@/components/media-collections";
import { projectCopy } from "@/lib/organisation-copy";
import { CopyList } from "@/components/organisation-content";
import { reship } from "@/lib/content";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, ArrowUpRight } from "lucide-react";
import { arms } from "@/lib/content";
import {
  Button,
  Eyebrow,
  PhotoSlot,
  Icon,
  Cta,
  SectionHead,
} from "@/components/ui";
export const dynamicParams = false;
export function generateStaticParams() {
  return arms.map((a) => ({ slug: a.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = arms.find((a) => a.slug === slug);
  return a
    ? {
        title: a.fullName,
        description: a.description,
        alternates: { canonical: `/projects/${slug}/` },
      }
    : {};
}
export default async function Project({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = arms.find((a) => a.slug === slug);
  if (!a) notFound();
  const detail = projectCopy[a.slug];
  return (
    <>
      <section className={`project-hero project-theme-${a.theme}`}>
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/projects/">Projects</Link>
            <span>/</span>
            <span>{a.name}</span>
          </div>
          <div className="project-hero-layout">
            <div>
              <Eyebrow>
                CCDI ARM {a.number} / {a.fullName}
              </Eyebrow>
              <h1>{a.fullName}</h1>
              <p>{a.description}</p>
              <Button
                href={`/contact/?interest=${encodeURIComponent(a.fullName)}`}
              >
                Connect with this initiative
              </Button>
            </div>
            <div className="project-emblem" aria-hidden="true">
              <Icon name={a.icon} size={110} />
              <span>{a.number}</span>
            </div>
          </div>
        </div>
      </section>
      <div className="container page-content">
        <div className="project-photo">
          <PhotoSlot
            label={a.photo}
            variant={
              a.theme === "orange"
                ? "clay"
                : a.theme === "light"
                  ? "cream"
                  : a.theme === "green"
                    ? "sage"
                    : "gold"
            }
            number={a.number}
          />
        </div>
        <section className="split-content content-section">
          <div>
            <Eyebrow>{a.division}</Eyebrow>
            <h2>{a.division}</h2>
            <p>{detail.intro}</p>
            {"body" in detail && <p>{detail.body}</p>}
            <Button
              href={`/contact/?interest=${encodeURIComponent(a.fullName)}`}
            >
              Ask about this arm
            </Button>
          </div>
          <div className="activity-list">
            {detail.coreFunctions.map((item, i) => (
              <div key={item}>
                <span className="number-label">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3>{item}</h3>
                <ArrowUpRight size={19} />
              </div>
            ))}
          </div>
        </section>
        {a.slug === "capacity-development" && (
          <section className="content-section">
            <Eyebrow>Our RESHIP Framework</Eyebrow>
            <h2>Practical, market-relevant life skills</h2>
            <CopyList items={reship.map(([, skill]) => skill)} />
          </section>
        )}
        {detail.purposes.length > 0 && (
          <section className="content-section supplied-purposes">
            <SectionHead eyebrow={a.fullName} title="Our purposes" />
            <ol>
              {detail.purposes.map((purpose, i) => (
                <li key={i}>
                  <span className="number-label">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    {Array.isArray(purpose) ? (
                      <>
                        <h3>{purpose[0]}</h3>
                        <p>{purpose[1]}</p>
                      </>
                    ) : (
                      <p>{purpose}</p>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </section>
        )}
        {a.slug === "capacity-development" && <FormCallout kind="student" />}
        <ProjectPhotos slug={a.slug} />
        <section className="outcomes-panel">
          <Eyebrow>What we work towards</Eyebrow>
          <h2>Change that reaches further.</h2>
          <ul className="check-list">
            {detail.outcomes.map((o) => (
              <li key={o}>
                <Check size={19} />
                {o}
              </li>
            ))}
          </ul>
        </section>
        {a.slug !== "social-enterprise" && (
          <section className="content-section">
            <VideoCollection
              category={
                a.slug === "capacity-development"
                  ? "Skills training"
                  : a.slug === "benevolent-childcare"
                    ? "Welfare outreach"
                    : "Family & community"
              }
              compact
            />
          </section>
        )}
        <section className="content-section">
          <SectionHead
            eyebrow="Connected by purpose"
            title={
              <>
                Explore the
                <br />
                <em>bigger picture.</em>
              </>
            }
          />
          <div className="three-cards">
            {arms
              .filter((other) => other.slug !== a.slug)
              .map((other) => (
                <Link
                  className={`info-card linked-card arm-${other.theme}`}
                  href={`/projects/${other.slug}/`}
                  key={other.slug}
                >
                  <Icon name={other.icon} />
                  <h3>{other.fullName}</h3>
                  <p>{other.description}</p>
                  <ArrowUpRight size={21} />
                </Link>
              ))}
          </div>
        </section>
      </div>
      <Cta />
    </>
  );
}

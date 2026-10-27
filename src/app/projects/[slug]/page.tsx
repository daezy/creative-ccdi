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
              <h1>{a.title}</h1>
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
            <h2>
              Purpose you can
              <br />
              <em>put into practice.</em>
            </h2>
            <p>
              Part of CCDI’s integrated model for empowering people,
              strengthening families, and creating opportunities for productive
              living.
            </p>
            <Button
              href={`/contact/?interest=${encodeURIComponent(a.fullName)}`}
            >
              Ask about this arm
            </Button>
          </div>
          <div className="activity-list">
            {a.activities.map((item, i) => (
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
        <section className="outcomes-panel">
          <Eyebrow>What we work towards</Eyebrow>
          <h2>Change that reaches further.</h2>
          <ul className="check-list">
            {a.outcomes.map((o) => (
              <li key={o}>
                <Check size={19} />
                {o}
              </li>
            ))}
          </ul>
          <p>
            These are the intended outcomes of our programmes, rather than
            independently verified impact figures.
          </p>
        </section>
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

import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { arms } from "@/lib/content";
import { organisationCopy as copy } from "@/lib/organisation-copy";
import { communityTestimonials } from "@/lib/testimonials";
import { Eyebrow, PhotoSlot, TextLink } from "./ui";

export function WorkChapters() {
  return (
    <section
      className="section work-chapters"
      aria-labelledby="work-chapters-heading"
    >
      <div className="container">
        <div className="chapter-heading">
          <div>
            <Eyebrow>Our integrated approach</Eyebrow>
            <h2 id="work-chapters-heading">
              Four-Integrated
              <br />
              <em>Project-Arm Structure.</em>
            </h2>
          </div>
          <p>{copy.integratedIntro}</p>
        </div>
        <div className="work-chapter-grid">
          {arms.map((arm) => (
            <Link
              className={`work-chapter work-chapter-${arm.theme}`}
              href={`/projects/${arm.slug}/`}
              key={arm.slug}
            >
              <div className="work-chapter-image">
                <PhotoSlot label={arm.photo} />
                <span className="chapter-index">
                  {arm.number} / {arm.name}
                </span>
              </div>
              <div className="work-chapter-copy">
                <h3>{arm.fullName}</h3>
                <p>{arm.description}</p>
                <span className="chapter-action">
                  Explore this arm <ArrowUpRight size={21} aria-hidden="true" />
                </span>
              </div>
            </Link>
          ))}
        </div>
        <div className="chapter-footer">
          <span>Skills. Enterprise. Care. Community.</span>
          <TextLink href="/projects/">Meet our four arms</TextLink>
        </div>
      </div>
    </section>
  );
}

export function LearningJourney() {
  return (
    <section
      className="section learning-journey"
      aria-labelledby="learning-journey-heading"
    >
      <div className="container">
        <div className="chapter-heading">
          <div>
            <Eyebrow>The CCDI philosophy</Eyebrow>
            <h2 id="learning-journey-heading">
              Not just a skill.
              <br />
              <em>A way forward.</em>
            </h2>
          </div>
          <div>
            <p>
              Real transformation takes more than a training session. We support
              a journey from self-discovery to meaningful contribution.
            </p>
            <TextLink href="/vision-mission/">What we believe</TextLink>
          </div>
        </div>
        <div className="journey-photographs">
          <figure>
            <PhotoSlot label="A place to create" />
            <figcaption>
              <span>01 / Discover & develop</span>
              <strong>Room to discover what you can do.</strong>
            </figcaption>
          </figure>
          <figure>
            <PhotoSlot label="Learning by doing" />
            <figcaption>
              <span>02 / Practise & master</span>
              <strong>Confidence built through practice.</strong>
            </figcaption>
          </figure>
          <figure>
            <PhotoSlot label="From skill to service" />
            <figcaption>
              <span>03 / Apply & contribute</span>
              <strong>Skills that become opportunities.</strong>
            </figcaption>
          </figure>
        </div>
        <ol className="journey-milestones">
          {[
            ["Learn", "Discover what’s possible."],
            ["Develop", "Build the ability to do more."],
            ["Master", "Grow through practice and support."],
            ["Apply", "Put your skills to work."],
            ["Impact", "Make a difference that reaches further."],
          ].map(([title, text], i) => (
            <li key={title}>
              <span>0{i + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function HumanStory() {
  const story = communityTestimonials.find((s) => s.id === "emadu")!;
  return (
    <section className="human-story" aria-labelledby="human-story-heading">
      <div className="container human-story-grid">
        <figure className="human-story-portrait">
          <img
            src={story.portrait}
            alt={story.name}
            width={720}
            height={1080}
            loading="lazy"
          />
          <figcaption>
            <strong>{story.name}</strong>
            <span>{story.role}</span>
          </figcaption>
        </figure>
        <div className="human-story-copy">
          <Eyebrow>One journey. Lasting possibility.</Eyebrow>
          <h2 id="human-story-heading">
            From student
            <br />
            to <em>professional.</em>
          </h2>
          <blockquote>
            <p>“{story.excerpt}”</p>
          </blockquote>
          <ol className="personal-milestones">
            <li>
              <span>2015</span>
              <strong>A student at CCDI</strong>
            </li>
            <li>
              <span>Growing through experience</span>
              <strong>
                Facilitator{" "}
                <ArrowRight className="inline-icon" aria-hidden="true" /> Office
                Administrator
              </strong>
            </li>
            <li>
              <span>Today</span>
              <strong>Businesswoman & HR Practitioner</strong>
            </li>
          </ol>
          <TextLink href="/testimonials/#story-emadu">
            Read Emadu’s full story
          </TextLink>
        </div>
      </div>
      <div className="container story-more">
        <span>Every journey is personal.</span>
        <Link href="/testimonials/">
          Meet more people behind the impact{" "}
          <ArrowRight size={18} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}

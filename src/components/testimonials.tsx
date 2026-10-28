import { Plus } from "lucide-react";
import {
  communityTestimonials,
  leadershipReflections,
  type Testimonial,
} from "@/lib/testimonials";
import { Button, Eyebrow, SectionHead } from "./ui";
function Story({
  story,
  featured = false,
  leadership = false,
}: {
  story: Testimonial;
  featured?: boolean;
  leadership?: boolean;
}) {
  return (
    <article
      className={`real-story ${featured ? "real-story-featured" : ""} ${leadership ? "real-story-leadership" : ""}`}
      id={`story-${story.id}`}
    >
      <div className="story-portrait">
        <img
          src={story.portrait}
          alt={story.name}
          width={600}
          height={750}
          loading="lazy"
          style={{ objectPosition: story.position || "center" }}
        />
      </div>
      <div className="story-content">
        <Eyebrow>{story.category}</Eyebrow>
        <h3>{story.title}</h3>
        <blockquote className="story-excerpt">
          <p>“{story.excerpt}”</p>
        </blockquote>
        <div className="story-attribution">
          <p>{story.name}</p>
          <span>{story.role}</span>
        </div>
        <details className="full-story">
          <summary>
            <span className="read-story-label">
              Read full {leadership ? "reflection" : "story"}
              <span className="sr-only"> by {story.name}</span>
            </span>
            <span className="close-story-label">
              Close full {leadership ? "reflection" : "story"}
              <span className="sr-only"> by {story.name}</span>
            </span>
            <Plus size={16} aria-hidden="true" />
          </summary>
          <blockquote className="story-full-text">
            {story.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </blockquote>
        </details>
      </div>
    </article>
  );
}
export function Testimonials() {
  return (
    <>
      <section aria-labelledby="community-stories-heading">
        <div className="stories-intro">
          <Eyebrow>In their own words</Eyebrow>
          <h2 id="community-stories-heading">
            Five journeys.
            <br />
            <em>Possibilities made personal.</em>
          </h2>
          <p>
            From learners to professionals, facilitators, and community members.
            These are the experiences they’ve shared about their time with CCDI.
          </p>
        </div>
        <div className="real-stories-grid">
          {communityTestimonials.map((story, i) => (
            <Story key={story.id} story={story} featured={i === 0} />
          ))}
        </div>
      </section>
      <section
        className="content-section"
        aria-labelledby="leadership-reflections-heading"
      >
        <div className="section-head">
          <div>
            <Eyebrow>Leadership & management</Eyebrow>
            <h2 id="leadership-reflections-heading">
              People first.
              <br />
              <em>Purpose always.</em>
            </h2>
            <p className="section-description">
              Personal reflections from CCDI’s Chairman and Trustee Secretary.
            </p>
          </div>
        </div>
        <div className="real-stories-grid leadership-stories">
          {leadershipReflections.map((story) => (
            <Story key={story.id} story={story} leadership />
          ))}
        </div>
      </section>
      <div className="story-invitation">
        <div>
          <Eyebrow>Your experience matters</Eyebrow>
          <h2>Part of the CCDI story?</h2>
          <p>We’d love to hear about your own journey.</p>
        </div>
        <Button href="/contact/?interest=Sharing%20my%20CCDI%20story">
          Share your story
        </Button>
      </div>
    </>
  );
}

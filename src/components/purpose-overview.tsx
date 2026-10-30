import { Compass, HeartHandshake, Target } from "lucide-react";
import { organisationCopy as copy } from "@/lib/organisation-copy";
import { values } from "@/lib/content";
import { Eyebrow, TextLink } from "./ui";

export function PurposeOverview() {
  return (
    <section
      className="section purpose-overview"
      aria-labelledby="purpose-heading"
    >
      <div className="container">
        <div className="purpose-heading">
          <Eyebrow>Our purpose & direction</Eyebrow>
          <h2 id="purpose-heading">
            Potential. Purpose. <em>Possibility.</em>
          </h2>
        </div>
        <div className="purpose-grid">
          <article className="purpose-panel">
            <span className="purpose-icon">
              <Target size={28} aria-hidden="true" />
            </span>
            <h3>Our mission</h3>
            <p>{copy.mission}</p>
            <TextLink href="/vision-mission/#mission-statement">
              Our mission in action
            </TextLink>
          </article>
          <article className="purpose-panel purpose-panel-vision">
            <span className="purpose-icon">
              <Compass size={28} aria-hidden="true" />
            </span>
            <h3>Our vision</h3>
            <p>{copy.vision}</p>
            <TextLink href="/vision-mission/">The future we envision</TextLink>
          </article>
          <article className="purpose-panel purpose-panel-values">
            <span className="purpose-icon">
              <HeartHandshake size={28} aria-hidden="true" />
            </span>
            <h3>Our core values</h3>
            <ul className="purpose-values">
              {values.map(([value]) => (
                <li key={value}>{value}</li>
              ))}
            </ul>
            <TextLink href="/core-values/">The values behind our work</TextLink>
          </article>
        </div>
      </div>
    </section>
  );
}

import { Check } from "lucide-react";
import {
  programmeGroups,
  achievements,
  challenges,
  futurePlans,
} from "@/lib/programmes";
import { Button, Eyebrow, PhotoSlot, SectionHead, TextLink } from "./ui";

export function ProgrammeCatalogue() {
  return (
    <>
      <div className="programme-focus">
        <Eyebrow>Major programmes & activities</Eyebrow>
        <h2>
          Discover potential.
          <br />
          <em>Transform lives.</em>
        </h2>
        <p>
          Through practical training, seminars, conferences, and workshops, we
          help people develop skills, build capacity, and put their potential to
          work.
        </p>
        <nav className="programme-jump-links" aria-label="Programme groups">
          {programmeGroups.map((group) => (
            <a key={group.id} href={`#${group.id}`}>
              {group.title}
              <span aria-hidden="true">↘</span>
            </a>
          ))}
        </nav>
      </div>
      <div className="programme-details">
        {programmeGroups.map((group, i) => (
          <article className="programme-detail" id={group.id} key={group.id}>
            <PhotoSlot
              label={group.image}
              number={`0${i + 1}`}
              variant={group.theme}
            />
            <div>
              <Eyebrow>{group.label}</Eyebrow>
              <h2>{group.title}</h2>
              <p>{group.description}</p>
              <ul className="check-list">
                {group.activities.map((activity) => (
                  <li key={activity}>
                    <Check size={16} aria-hidden="true" />
                    {activity}
                  </li>
                ))}
              </ul>
              <div className="programme-detail-actions">
                <Button
                  href={`/contact/?interest=${encodeURIComponent(group.title)}`}
                >
                  Ask about this programme
                </Button>
                <TextLink href={group.href}>Explore the initiative</TextLink>
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="editorial-note">
        <div>
          <h3>Find your practical starting point</h3>
          <p>
            Explore the vocational training areas that connect learning with
            productive living.
          </p>
          <TextLink href="/skills-training/">View skills training</TextLink>
        </div>
      </div>
    </>
  );
}
export function ReportedProgress() {
  return (
    <section className="content-section" id="reported-achievements">
      <SectionHead
        eyebrow="Reported achievements"
        title={
          <>
            Progress across
            <br />
            <em>people and communities.</em>
          </>
        }
      >
        CCDI reports the following achievements across its programme work.
        Reporting dates and supporting metrics will be added when supplied.
      </SectionHead>
      <div className="values-grid">
        {achievements.map(([title, description], i) => (
          <article className="value-card" key={title}>
            <span className="number-label">0{i + 1}</span>
            <h3>{title}</h3>
            <p>{description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
export function FuturePlans() {
  return (
    <section className="content-section future-plans" id="future-plans">
      <div>
        <Eyebrow>The next chapter</Eyebrow>
        <h2>
          More opportunity.
          <br />
          <em>A wider reach.</em>
        </h2>
        <p>
          Our Board of Trustees and Management Team reaffirm their commitment to
          strengthening CCDI and increasing its impact in the years ahead.
        </p>
        <TextLink href="/partners/">Help shape what comes next</TextLink>
      </div>
      <ul className="check-list">
        {futurePlans.map((plan) => (
          <li key={plan}>
            <Check size={18} aria-hidden="true" />
            {plan}
          </li>
        ))}
      </ul>
    </section>
  );
}
export function DeliveryChallenges() {
  return (
    <section className="content-section">
      <SectionHead
        eyebrow="Challenges & resilience"
        title={
          <>
            What it takes
            <br />
            to <em>keep moving.</em>
          </>
        }
      >
        CCDI identifies the following constraints on programme delivery and
        community outreach.
      </SectionHead>
      <ul className="challenge-list">
        {challenges.map((challenge, i) => (
          <li key={challenge}>
            <span className="number-label">0{i + 1}</span>
            {challenge}
          </li>
        ))}
      </ul>
      <div className="programme-detail-actions">
        <Button href="/partners/">Partner with CCDI</Button>
        <TextLink href="/donate/">Support our work</TextLink>
      </div>
    </section>
  );
}

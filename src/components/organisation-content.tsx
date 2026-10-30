import { MembershipContent } from "./document-content";
import { FormCallout } from "./document-library";
import {
  Check,
  ArrowRight,
  WalletCards,
  ChartNoAxesCombined,
  Sprout,
  ShieldCheck,
  Handshake,
} from "lucide-react";
import { organisationCopy as copy } from "@/lib/organisation-copy";
import { Button, Eyebrow, PhotoSlot, SectionHead, TextLink } from "./ui";

export function CopyList({ items }: { items: readonly string[] }) {
  return (
    <ul className="check-list">
      {items.map((item) => (
        <li key={item}>
          <Check size={17} aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  );
}
export function Commitments() {
  const icons = [
    WalletCards,
    ChartNoAxesCombined,
    Sprout,
    ShieldCheck,
    Handshake,
  ];
  return (
    <section className="content-section supplied-commitment">
      <div className="commitment-intro">
        <Eyebrow light>Our commitment</Eyebrow>
        <ShieldCheck
          className="commitment-seal"
          size={48}
          strokeWidth={1.25}
          aria-hidden="true"
        />
        <h2>We are committed to:</h2>
        <TextLink href="/financial-transparency/">
          Financial transparency
        </TextLink>
      </div>
      <ol className="commitment-list">
        {copy.commitments.map((commitment, i) => {
          const CommitmentIcon = icons[i];
          return (
            <li key={commitment}>
              <span className="commitment-number" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="commitment-icon">
                <CommitmentIcon
                  size={23}
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </span>
              <h3>{commitment}</h3>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
export function VisionMission() {
  return (
    <>
      <section className="statement-panel" id="vision-statement">
        <Eyebrow>Vision statement</Eyebrow>
        <h2>{copy.vision}</h2>
      </section>
      <section className="split-content content-section" id="mission-statement">
        <div>
          <Eyebrow>Our vision</Eyebrow>
          <h2>We envision a society where:</h2>
          <CopyList items={copy.society} />
        </div>
        <div>
          <Eyebrow>Our mission</Eyebrow>
          <p className="large-copy">{copy.missionIntro}</p>
          <h2>Mission statement</h2>
          <p>{copy.mission}</p>
        </div>
      </section>
    </>
  );
}
export function Governance() {
  return (
    <section className="content-section" id="governance">
      <SectionHead
        eyebrow="Governance and management"
        title="Board of Trustees & Management Team"
      />
      <div className="supplied-prose">
        {copy.governance.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
      <figure className="board-photo">
        <img
          src="/images/board-of-trustees.jpeg"
          alt="CCDI Board of Trustees and Management Team group photograph"
          width={1280}
          height={759}
          loading="lazy"
        />
        <figcaption>CCDI Board of Trustees &amp; Management Team</figcaption>
      </figure>
      <div className="trustee-grid">
        {["Gloria Omoze Omagbemi", "Temisan Ignatius Omagbemi"].map(
          (name, i) => (
            <article className="trustee-card" key={name}>
              <PhotoSlot
                label={`${name} · Portrait space`}
                number={`0${i + 1}`}
                variant={i ? "cream" : "sage"}
              />
              <h3>{name}</h3>
              <p>
                {i
                  ? "Trustee Secretary · Life Skill Coach"
                  : "Chairman · Life Skills Coach"}
              </p>
            </article>
          ),
        )}
      </div>
    </section>
  );
}
export function StrategicFocus() {
  return (
    <section className="section">
      <div className="container">
        <SectionHead
          eyebrow="Strategic focus"
          title="Our integrated impact model"
        >
          {copy.strategicFocus}
        </SectionHead>
        <div className="two-cards">
          <article className="info-card">
            <h3>We envision a society where:</h3>
            <CopyList items={copy.society} />
          </article>
          <article className="info-card gold-card">
            <h3>Integrated impact</h3>
            <CopyList items={copy.integratedImpact} />
            <p>
              This creates both immediate intervention and long-term
              generational transformation.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
export function IntegratedModel() {
  return (
    <section className="content-section">
      <SectionHead
        eyebrow="Four-Integrated-Arm Structure"
        title="Empowering Lives Through Skills, Purpose, and Community."
      >
        {copy.integratedIntro}
      </SectionHead>
      <h3>The Four-Integrated-Arm Structure enables CCDI to:</h3>
      <CopyList items={copy.integratedFunctions} />
      <p className="intro-paragraph">{copy.integratedConclusion}</p>
      <div className="statement-panel">
        <Eyebrow>Integrated impact</Eyebrow>
        <h2>Our model is designed to ensure:</h2>
        <CopyList items={copy.integratedImpact} />
        <p>
          This creates both immediate intervention and long-term generational
          transformation.
        </p>
      </div>
    </section>
  );
}
export function ImpactContent() {
  return (
    <>
      <SectionHead
        eyebrow="Our impact statistics at a glance"
        title="From Learning to Practical Application"
      />
      <div className="supplied-prose">
        {copy.impactIntro.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
      <div className="impact-summary impact-summary-confirmed">
        <div>
          <span>18</span>
          <h2>Years of impact</h2>
        </div>
        <div>
          <span>3,000+</span>
          <h2>Beneficiaries annually</h2>
        </div>
        <div>
          <span>12,000+</span>
          <h2>People reached</h2>
        </div>
        <div>
          <span>12+</span>
          <h2>Community reach</h2>
        </div>
      </div>
      <p className="intro-paragraph">{copy.homeReach}</p>
      <section className="content-section">
        <div className="supplied-impact-grid">
          {copy.impactAreas.map((area, i) => (
            <article className="info-card" key={area.title}>
              <span className="number-label">0{i + 1}</span>
              <h2>{area.title}</h2>
              <p>{area.intro}</p>
              {area.items.length > 0 && (
                <>
                  <h3>
                    {i === 0
                      ? "Training areas include:"
                      : "Our family & community programmes include:"}
                  </h3>
                  <CopyList items={area.items} />
                </>
              )}
              {"ending" in area && <p>{area.ending}</p>}
            </article>
          ))}
        </div>
      </section>
      <div className="statement-panel">
        <Eyebrow>Our impact philosophy</Eyebrow>
        <h2>
          {["Learn", "Develop", "Master", "Apply", "Impact"].map((step, i) => (
            <span className="philosophy-step" key={step}>
              {step}
              {i < 4 && (
                <>
                  {" "}
                  <ArrowRight className="inline-icon" aria-hidden="true" />{" "}
                </>
              )}
            </span>
          ))}
        </h2>
        <p>
          From potential to capability.
          <br />
          From capability to productivity.
          <br />
          From productivity to meaningful community impact.
        </p>
      </div>
    </>
  );
}
export function JoinMovement() {
  return (
    <section className="movement-invitation">
      <div className="movement-heading">
        <Eyebrow>Join the movement</Eyebrow>
        <h2>
          <span>Discover. Develop.</span>{" "}
          <span>
            Empower. <em>Transform.</em>
          </span>
        </h2>
      </div>
      <div className="movement-copy">
        <p>{copy.join}</p>
        <div className="movement-actions">
          <Button href="/donate/" variant="gold">
            Donate / Support us
          </Button>
          <Button href="/partners/" variant="outline">
            Partner with us
          </Button>
          <TextLink href="/volunteer/">Volunteer</TextLink>
        </div>
      </div>
    </section>
  );
}
export function PartnershipContent() {
  return (
    <>
      <div className="split-content">
        <div>
          <Eyebrow>Partner with CCDI</Eyebrow>
          <h2>{copy.partnerIntro}</h2>
          <p>{copy.partnerWelcome}</p>
          <Button href="/contact/?interest=Partnership">
            Become a partner
          </Button>
        </div>
        <PhotoSlot
          label="Partners working alongside the CCDI community"
          variant="gold"
        />
      </div>
      <section className="content-section" id="partnership-opportunities">
        <SectionHead
          eyebrow="Collaboration"
          title="Our partnership opportunities"
        />
        <div className="values-grid">
          {copy.partnerships.map(([title, text], i) => (
            <article className="value-card" key={title}>
              <span className="number-label">0{i + 1}</span>
              <h2>{title}</h2>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="content-section supplied-prose">
        <h2>Become a Partner</h2>
        <p>{copy.becomePartner}</p>
        <Button href="/contact/?interest=Partnership">Partner with us</Button>
      </section>
      <MembershipContent partner />
      <FormCallout kind="membership" />
      <JoinMovement />
      <Commitments />
    </>
  );
}

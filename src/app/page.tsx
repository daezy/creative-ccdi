import {
  Commitments,
  Governance,
  StrategicFocus,
  JoinMovement,
} from "@/components/organisation-content";
import { organisationCopy as copy } from "@/lib/organisation-copy";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, Check, MoveUpRight } from "lucide-react";
import { Hero } from "@/components/hero";
import {
  Button,
  Eyebrow,
  SectionHead,
  PhotoSlot,
  Icon,
  Cta,
  TextLink,
} from "@/components/ui";
import { arms, articles } from "@/lib/content";
export const metadata = { alternates: { canonical: "/" } };
export default function Home() {
  return (
    <>
      <Hero />
      <section className="belief-strip">
        <div className="container">
          <span className="belief-star" aria-hidden="true">
            ✳
          </span>
          <p>
            Everyone has potential.
            <span> We help turn it into possibility.</span>
          </p>
          <a href="/vision-mission/" aria-label="Read our vision and mission">
            <ArrowUpRight size={24} />
          </a>
        </div>
      </section>
      <section className="section about-section">
        <div className="container about-grid">
          <div className="about-visual">
            <PhotoSlot
              label="People, purpose, and practical learning"
              variant="cream"
              number="03"
            />
            <div className="about-image-label">
              <span>
                SELF-DISCOVERY IS
                <br />
                JUST THE BEGINNING.
              </span>
              <ArrowUpRight size={32} aria-hidden="true" />
            </div>
          </div>
          <div className="about-copy">
            <Eyebrow>Creative Craft Development Initiative (CCDI)</Eyebrow>
            <h2>Who we are</h2>
            <p className="large-copy">{copy.homeIntro}</p>
            <p>{copy.homeReach}</p>
            <div className="about-checks">
              <span>
                <Check size={17} aria-hidden="true" />
                Practical learning
              </span>
              <span>
                <Check size={17} aria-hidden="true" />
                People-first support
              </span>
              <span>
                <Check size={17} aria-hidden="true" />
                Purposeful living
              </span>
            </div>
            <Button href="/about/">Our story & purpose</Button>
          </div>
        </div>
      </section>
      <StrategicFocus />
      <section className="section arms-section">
        <div className="container">
          <SectionHead
            eyebrow="Our integrated approach"
            title={
              <>
                Four-Integrated
                <br />
                <em>Project-Arm Structure.</em>
              </>
            }
            href="/projects/"
            linkLabel="Meet our four arms"
          >
            {copy.integratedIntro}
          </SectionHead>
          <div className="arms-grid">
            {arms.map((a) => (
              <Link
                href={`/projects/${a.slug}/`}
                className={`arm-card arm-${a.theme}`}
                key={a.slug}
              >
                <div className="arm-card-top">
                  <span>{a.number} /</span>
                  <Icon name={a.icon} size={30} />
                </div>
                <div>
                  <h3>{a.fullName}</h3>
                  <p>{a.description}</p>
                </div>
                <span className="arm-link">
                  Explore this arm <ArrowUpRight size={20} aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="section impact-home">
        <div className="container">
          <div className="impact-intro">
            <Eyebrow light>From potential to purpose</Eyebrow>
            <h2>
              The real impact?
              <br />
              <span>
                What happens <em>next.</em>
              </span>
            </h2>
            <p>
              Learning becomes a livelihood. Confidence becomes independence.
              Stronger families become stronger communities. That is the change
              we work towards.
            </p>
            <Button href="/impact/" variant="white">
              Explore our impact
            </Button>
          </div>
          <div className="impact-facts">
            <div>
              <span className="fact-number">18</span>
              <h3>Years of impact</h3>
            </div>
            <div>
              <span className="fact-number">3,000+</span>
              <h3>Beneficiaries annually</h3>
              <p>
                Through vocational training, skills acquisition, and empowerment
                programs.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="section programmes-section">
        <div className="container">
          <SectionHead
            eyebrow="Find your starting point"
            title={
              <>
                Big futures begin
                <br />
                with <em>practical skills.</em>
              </>
            }
            href="/skills-training/"
            linkLabel="See all training areas"
          />
          <div className="programme-preview">
            {[
              {
                title: "Create something of your own.",
                name: "Fashion & tailoring",
                theme: "sage",
                icon: "fashion",
              },
              {
                title: "Turn a passion into a livelihood.",
                name: "Catering & bakery",
                theme: "gold",
                icon: "food",
              },
              {
                title: "Build confidence for a digital world.",
                name: "ICT & digital skills",
                theme: "clay",
                icon: "digital",
              },
            ].map((p, i) => (
              <Link
                key={p.name}
                href={`/contact/?interest=${encodeURIComponent(p.name)}`}
                className="programme-tile"
              >
                <PhotoSlot
                  label={p.name}
                  variant={p.theme}
                  number={`0${i + 1}`}
                />
                <div className="programme-tile-copy">
                  <span className="programme-icon">
                    <Icon name={p.icon} />
                  </span>
                  <span className="card-category">{p.name}</span>
                  <h3>{p.title}</h3>
                  <span className="round-arrow">
                    <ArrowUpRight size={20} aria-hidden="true" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <div className="programme-footnote">
            <span>
              Learning, mentorship, and the support to take your next step.
            </span>
            <TextLink href="/programmes/">Find a programme</TextLink>
          </div>
        </div>
      </section>
      <section className="section journey-section">
        <div className="container journey-grid">
          <div>
            <Eyebrow>The CCDI philosophy</Eyebrow>
            <h2>
              Not just a skill.
              <br />
              <em>A way forward.</em>
            </h2>
            <p>
              Real transformation takes more than a training session. We support
              a journey from self-discovery to meaningful contribution.
            </p>
            <TextLink href="/vision-mission/">What we believe</TextLink>
          </div>
          <ol className="journey-list">
            {[
              ["Learn", "Discover what’s possible."],
              ["Develop", "Build the ability to do more."],
              ["Master", "Grow through practice and support."],
              ["Apply", "Put your skills to work."],
              ["Impact", "Make a difference that reaches further."],
            ].map(([title, text], i) => (
              <li key={title}>
                <span className="journey-num">0{i + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
                <ArrowUpRight size={20} aria-hidden="true" />
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="community-feature">
        <div className="container">
          <div className="community-feature-copy">
            <Eyebrow>Opportunity grows together</Eyebrow>
            <h2>
              Bring what you know.
              <br />
              Help someone
              <br />
              <em>become who they can.</em>
            </h2>
            <p>
              Your time, expertise, or support can create a place for someone to
              learn, grow, and belong.
            </p>
            <div className="hero-actions">
              <Button href="/volunteer/">Become a volunteer</Button>
              <TextLink href="/partners/">Partner with us</TextLink>
            </div>
          </div>
          <div className="community-visual">
            <PhotoSlot
              label="Mentors, learners, and shared possibilities"
              variant="sage"
              number="04"
            />
            <span className="community-star" aria-hidden="true">
              ✳
            </span>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <Governance />
          <Commitments />
          <JoinMovement />
        </div>
      </section>
      <Cta />
    </>
  );
}

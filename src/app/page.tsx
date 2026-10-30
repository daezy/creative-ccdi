import { pageMetadata } from "@/lib/seo";
import { PageStructuredData } from "@/components/structured-data";
import {
  WorkChapters,
  LearningJourney,
  HumanStory,
} from "@/components/home-story";
import {
  Commitments,
  StrategicFocus,
  JoinMovement,
} from "@/components/organisation-content";
import { organisationCopy as copy } from "@/lib/organisation-copy";
import { PurposeOverview } from "@/components/purpose-overview";
import { HomePublications, HomeJournal } from "@/components/home-updates";
import Link from "next/link";
import { ArrowUpRight, Check, Asterisk } from "lucide-react";
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

export const metadata = pageMetadata("/");
export default function Home() {
  return (
    <>
      <PageStructuredData path="/" />
      <Hero />
      <section className="belief-strip">
        <div className="container">
          <span className="belief-star" aria-hidden="true">
            <Asterisk size="1em" aria-hidden="true" />
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
      <PurposeOverview />
      <section className="section about-section story-introduction">
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
            <div className="about-intro-actions">
              <Button href="/about/">Our story & purpose</Button>
              <TextLink href="/about/#governance">
                Board of Trustees & Management
              </TextLink>
            </div>
          </div>
        </div>
      </section>
      <WorkChapters />
      <LearningJourney />
      <HumanStory />
      <section className="section impact-home story-impact">
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
          <div className="impact-evidence">
            <PhotoSlot label="Benevolent outreach, children’s learning, and welfare support" />
            <div className="impact-facts">
              <div>
                <span className="fact-number">18</span>
                <h3>Years of impact</h3>
              </div>
              <div>
                <span className="fact-number">3,000+</span>
                <h3>Beneficiaries annually</h3>
                <p>
                  Through vocational training, skills acquisition, and
                  empowerment programs.
                </p>
              </div>
              <div>
                <span className="fact-number">12,000+</span>
                <h3>People reached</h3>
              </div>
              <div>
                <span className="fact-number">12+</span>
                <h3>Community reach</h3>
              </div>
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
              <Asterisk size="1em" aria-hidden="true" />
            </span>
          </div>
        </div>
      </section>
      <section className="section story-foundations">
        <div className="container">
          <StrategicFocus />
          <Commitments />
          <JoinMovement />
        </div>
      </section>
      <HomePublications />
      <HomeJournal />
      <Cta />
    </>
  );
}

import {
  ProgrammeCatalogue,
  ReportedProgress,
  FuturePlans,
  DeliveryChallenges,
} from "@/components/programme-content";
import { fundingSources, fundUses } from "@/lib/programmes";
import { Testimonials } from "@/components/testimonials";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  ArrowRight,
  ShieldCheck,
  BookOpen,
  Heart,
  MapPin,
  Facebook,
} from "lucide-react";
import {
  pageInfo,
  arms,
  values,
  training,
  reship,
  articles,
  facebook,
} from "@/lib/content";
import {
  Button,
  Eyebrow,
  SectionHead,
  PhotoSlot,
  Icon,
  Cta,
  TextLink,
  EmptyFeature,
} from "@/components/ui";
import {
  TrainingGrid,
  Gallery,
  EnquiryForm,
  SupportSelector,
} from "@/components/interactive";
export const dynamicParams = false;
export function generateStaticParams() {
  return Object.keys(pageInfo).map((slug) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = pageInfo[slug];
  return p
    ? {
        title: p.label,
        description: p.description,
        alternates: { canonical: `/${slug}/` },
        openGraph: { title: `${p.label} | CCDI`, description: p.description },
      }
    : {};
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = pageInfo[slug];
  if (!p) notFound();
  return (
    <>
      <section className={`page-hero page-hero-${slug}`}>
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>{p.label}</span>
          </div>
          <div className="page-hero-grid">
            <div>
              <Eyebrow>{p.label}</Eyebrow>
              <h1>{p.title}</h1>
              <p>{p.description}</p>
            </div>
            <span className="page-flower" aria-hidden="true">
              ✳
            </span>
          </div>
        </div>
      </section>
      <div className="container page-content">
        <PageContent slug={slug} />
      </div>
      {![
        "contact",
        "donate",
        "privacy-policy",
        "child-protection",
        "financial-transparency",
      ].includes(slug) && <Cta />}
    </>
  );
}
function ArmGrid() {
  return (
    <div className="project-grid">
      {arms.map((a) => (
        <Link
          className={`project-card arm-${a.theme}`}
          key={a.slug}
          href={`/projects/${a.slug}/`}
        >
          <div className="project-card-top">
            <Icon name={a.icon} size={35} />
            <span>{a.number}</span>
          </div>
          <h2>{a.fullName}</h2>
          <p>{a.description}</p>
          <span className="arm-link">
            Explore the initiative
            <ArrowUpRight size={20} />
          </span>
        </Link>
      ))}
    </div>
  );
}
function PageContent({ slug }: { slug: string }) {
  switch (slug) {
    case "about":
      return (
        <>
          <div className="split-content">
            <div>
              <Eyebrow>Who we are</Eyebrow>
              <h2>Empowering lives through skills, purpose, and community.</h2>
              <p className="large-copy">
                Everyone has the ability to learn and master a skill when given
                proper support and training.
              </p>
              <p>
                Creative Craft Development Initiative (CCDI) is committed to
                helping individuals and communities discover their potential,
                develop practical skills, build capacity, and use their
                abilities to create purposeful and sustainable lives.
              </p>
              <p>
                Our work brings together youth empowerment, practical learning,
                child welfare, family strengthening, and sustainable social
                enterprise.
              </p>
              <Button href="/projects/">Meet our four arms</Button>
            </div>
            <PhotoSlot
              label="The people and purpose behind CCDI"
              variant="sage"
            />
          </div>
          <section className="content-section">
            <SectionHead
              eyebrow="What we believe"
              title={
                <>
                  Possibility belongs
                  <br />
                  to <em>everyone.</em>
                </>
              }
            />
            <div className="two-cards">
              <div className="info-card">
                <h3>Our vision</h3>
                <p>
                  A world where everyone can discover, develop, and master
                  meaningful skills needed to live a purposeful and productive
                  life.
                </p>
                <TextLink href="/vision-mission/">Our direction</TextLink>
              </div>
              <div className="info-card gold-card">
                <h3>Our mission</h3>
                <p>
                  To bridge the gap between potential and skills through
                  self-discovery, self-mastery, capacity building, and skills
                  for life.
                </p>
                <TextLink href="/core-values/">Our guiding values</TextLink>
              </div>
            </div>
          </section>
          <section className="content-section" id="governance">
            <SectionHead
              eyebrow="Governance & management"
              title={
                <>
                  People behind
                  <br />
                  <em>the purpose.</em>
                </>
              }
            >
              CCDI operates under the supervision of its Board of Trustees and
              Management Team.
            </SectionHead>
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
            <p className="muted-note">
              Management team and facilitator profiles will be added to this
              section.
            </p>
          </section>
        </>
      );
    case "vision-mission":
      return (
        <>
          <div className="statement-panel">
            <Eyebrow>Our vision</Eyebrow>
            <h2>
              A world where everyone can discover, develop, and master
              meaningful skills for a purposeful and productive life.
            </h2>
          </div>
          <div className="split-content">
            <div>
              <Eyebrow>Our mission</Eyebrow>
              <h2>Bridging the gap between potential and skills.</h2>
              <p>
                Through self-discovery, self-mastery, capacity building, and
                skills for life, we create opportunities for practical learning,
                entrepreneurship, and community transformation.
              </p>
            </div>
            <div className="vision-list">
              {[
                "Children are protected and empowered.",
                "Youth are skilled and self-reliant.",
                "Families are stable and value-driven.",
                "Communities thrive economically and socially.",
              ].map((s, i) => (
                <div key={s}>
                  <span>0{i + 1}</span>
                  <p>{s}</p>
                  <ArrowUpRight size={20} />
                </div>
              ))}
            </div>
          </div>
          <Reship />
        </>
      );
    case "core-values":
      return (
        <div className="values-grid">
          {values.map(([title, text], i) => (
            <article className="value-card" key={title}>
              <span className="number-label">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2>{title}</h2>
              <p>{text}</p>
            </article>
          ))}
        </div>
      );
    case "projects":
      return (
        <>
          <p className="intro-paragraph">
            People’s needs are connected. Our response is, too. Each CCDI arm
            has a distinct mandate, and all four work together to build
            capability, protect dignity, strengthen families, and support
            sustainable development.
          </p>
          <ArmGrid />
          <div className="statement-panel">
            <Eyebrow>One integrated model</Eyebrow>
            <h2>
              Skills reduce vulnerability.
              <br />
              Care restores dignity.
              <br />
              Enterprise supports sustainability.
              <br />
              Community strengthens the future.
            </h2>
          </div>
        </>
      );
    case "skills-training":
      return (
        <>
          <div className="split-content">
            <div>
              <Eyebrow>From learning to doing</Eyebrow>
              <h2>
                Build an ability.
                <br />
                Open a possibility.
              </h2>
              <p>
                Our practical training helps participants discover, develop, and
                master productive skills. The focus is on competence,
                confidence, entrepreneurship, and self-sufficiency.
              </p>
              <Button href="/contact/?interest=Skills%20training">
                Ask about joining
              </Button>
            </div>
            <PhotoSlot label="Practical training at CCDI" variant="gold" />
          </div>
          <section className="content-section" id="training-areas">
            <SectionHead
              eyebrow="Explore your interests"
              title={
                <>
                  Find a skill
                  <br />
                  that <em>speaks to you.</em>
                </>
              }
            />
            <TrainingGrid />
          </section>
          <Reship />
          <Faq />
        </>
      );
    case "programmes":
      return (
        <>
          <ProgrammeCatalogue />
          <Faq />
        </>
      );
    case "services":
      return (
        <>
          <div className="service-intro">
            <Eyebrow>CCDI Social Enterprise</Eyebrow>
            <h2>Where enterprise meets empowerment.</h2>
            <p>
              Our enterprise services create practical opportunities and are
              designed to help sustain CCDI’s wider community work. Contact us
              to discuss your requirements and current availability.
            </p>
          </div>
          <div className="service-grid">
            {arms[1].activities.map((s, i) => (
              <article className="service-card" key={s}>
                <Icon
                  name={
                    [
                      "community",
                      "enterprise",
                      "food",
                      "enterprise",
                      "printing",
                      "fashion",
                      "skills",
                      "agriculture",
                    ][i]
                  }
                  size={30}
                />
                <span className="number-label">0{i + 1}</span>
                <h2>{s}</h2>
                <TextLink href={`/contact/?interest=${encodeURIComponent(s)}`}>
                  Discuss your project
                </TextLink>
              </article>
            ))}
          </div>
        </>
      );
    case "impact":
      return (
        <>
          <div className="impact-summary">
            <div>
              <span>04</span>
              <h2>Integrated arms</h2>
              <p>
                Working together across skills, enterprise, care, and community.
              </p>
            </div>
            <div>
              <span>06</span>
              <h2>Training areas</h2>
              <p>
                Practical pathways from creative skills to productive
                enterprise.
              </p>
            </div>
            <div>
              <span>01</span>
              <h2>Shared purpose</h2>
              <p>Helping people live with greater confidence and capability.</p>
            </div>
          </div>
          <section className="content-section">
            <SectionHead
              eyebrow="The change we work towards"
              title={
                <>
                  Progress you can
                  <br />
                  <em>put into practice.</em>
                </>
              }
            />
            <div className="two-cards">
              {arms.map((a) => (
                <article className="info-card" key={a.slug}>
                  <Icon name={a.icon} />
                  <h3>{a.name}</h3>
                  <ul className="check-list">
                    {a.outcomes.map((o) => (
                      <li key={o}>
                        <Check size={16} />
                        {o}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>
          <ReportedProgress />
          <FuturePlans />
          <div className="statement-panel">
            <Eyebrow>Our impact philosophy</Eyebrow>
            <h2>Learn → Develop → Master → Apply → Impact</h2>
            <p>
              From potential to capability. From capability to productivity.
              From productivity to meaningful community impact.
            </p>
          </div>
          <div className="editorial-note">
            <ShieldCheck size={24} />
            <div>
              <h3>A commitment to measurable impact</h3>
              <p>
                Verified reach figures and detailed impact reports will be added
                as CCDI’s reporting materials are prepared.
              </p>
              <TextLink href="/financial-transparency/">
                Our accountability commitment
              </TextLink>
            </div>
          </div>
        </>
      );
    case "partners":
      return (
        <>
          <div className="split-content">
            <div>
              <Eyebrow>Partner with CCDI</Eyebrow>
              <h2>
                Shared purpose.
                <br />
                Stronger possibilities.
              </h2>
              <p>
                We welcome individuals, businesses, professional organisations,
                educational institutions, government agencies, foundations,
                NGOs, churches, and other development-focused organisations.
              </p>
              <p>
                Whether you contribute expertise, learning resources, programme
                support, or enterprise opportunities, collaboration can help
                more people put their abilities to work.
              </p>
              <Button href="/contact/?interest=Partnership">
                Start a partnership conversation
              </Button>
            </div>
            <PhotoSlot
              label="Partners working alongside the CCDI community"
              variant="gold"
            />
          </div>
          <section className="content-section">
            <SectionHead
              eyebrow="Ways to collaborate"
              title={
                <>
                  Bring your strengths.
                  <br />
                  <em>Build something lasting.</em>
                </>
              }
            />
            <div className="values-grid">
              {[
                [
                  "Training & capacity development",
                  "Support practical training, workshops, seminars, and professional development.",
                ],
                [
                  "Entrepreneurship & social enterprise",
                  "Help people develop businesses and sustainable livelihood opportunities.",
                ],
                [
                  "Family & community development",
                  "Strengthen programmes supporting relationships, families, and communities.",
                ],
                [
                  "Youth & vulnerable-person support",
                  "Support child welfare, education, youth empowerment, and psychosocial development.",
                ],
                [
                  "Mentorship & expertise",
                  "Share professional experience, guidance, resources, and learning opportunities.",
                ],
              ].map(([t, d], i) => (
                <article key={t} className="value-card">
                  <span className="number-label">0{i + 1}</span>
                  <h2>{t}</h2>
                  <p>{d}</p>
                </article>
              ))}
            </div>
          </section>
          <div className="partner-space">
            <span className="number-label">PARTNERS & SPONSORS</span>
            <p>
              A shared space for the organisations helping make this work
              possible.
            </p>
            <div>
              {[
                "Partner logo",
                "Sponsor logo",
                "Partner logo",
                "Sponsor logo",
              ].map((l, i) => (
                <span key={i}>
                  {l}
                  <ArrowUpRight size={16} />
                </span>
              ))}
            </div>
          </div>
        </>
      );
    case "volunteer":
      return (
        <>
          <div className="split-content">
            <div>
              <Eyebrow>Join the movement</Eyebrow>
              <h2>
                You have something
                <br />
                worth sharing.
              </h2>
              <p>
                Your experience can help someone find direction. Your practical
                skills can help a learner take a first step. Your time can
                strengthen a programme and the community around it.
              </p>
              <Button href="/contact/?interest=Volunteering">
                Express your interest
              </Button>
            </div>
            <PhotoSlot
              label="Volunteers and facilitators making room for growth"
              variant="sage"
            />
          </div>
          <section className="content-section">
            <SectionHead
              eyebrow="Find your contribution"
              title={
                <>
                  Many ways to help.
                  <br />
                  <em>One meaningful choice.</em>
                </>
              }
            />
            <div className="three-cards">
              {[
                [
                  "Teach a practical skill",
                  "Share knowledge in a vocational, digital, creative, or enterprise field.",
                  "skills",
                ],
                [
                  "Mentor & encourage",
                  "Offer guidance, help learners build confidence, and support personal growth.",
                  "care",
                ],
                [
                  "Support a programme",
                  "Bring organisational, creative, communication, or event-support skills.",
                  "community",
                ],
              ].map(([t, d, i]) => (
                <article className="info-card" key={t}>
                  <Icon name={i} size={30} />
                  <h3>{t}</h3>
                  <p>{d}</p>
                </article>
              ))}
            </div>
          </section>
          <div className="editorial-note">
            <ShieldCheck size={24} />
            <p>
              Volunteer roles depend on programme needs. Work involving children
              or vulnerable people must follow CCDI’s safeguarding requirements.
            </p>
          </div>
        </>
      );
    case "gallery":
      return <Gallery />;
    case "testimonials":
      return <Testimonials />;
    case "blog":
      return (
        <div className="journal-grid">
          {articles.map((a, i) => (
            <Link
              className="journal-card"
              href={`/blog/${a.slug}/`}
              key={a.slug}
            >
              <div
                className={`journal-art journal-art-${i}`}
                aria-hidden="true"
              >
                <span>{["Aa", "↗", "&"][i]}</span>
                <small>THE CCDI JOURNAL / 0{i + 1}</small>
              </div>
              <div className="journal-card-label">
                <span>{a.category}</span>
                <ArrowUpRight size={18} />
              </div>
              <h2>{a.title}</h2>
              <p>{a.description}</p>
            </Link>
          ))}
        </div>
      );
    case "videos":
      return (
        <EmptyFeature
          title="Our stories, in motion."
          description="Programme films and event highlights will be added here as the CCDI media collection is prepared. Visit our Facebook page for the public posts currently available."
          icon="community"
          action="Explore CCDI on Facebook"
          href={facebook}
        />
      );
    case "documents":
      return (
        <>
          <div className="resource-list">
            {[
              [
                "Programme guides",
                "Information about learning pathways and programme participation.",
              ],
              [
                "Event resources",
                "Materials from CCDI workshops, seminars, and conferences.",
              ],
              [
                "Impact & organisational reports",
                "Reporting on our work, governance, and community outcomes.",
              ],
            ].map(([t, d]) => (
              <article key={t}>
                <BookOpen size={28} />
                <div>
                  <h2>{t}</h2>
                  <p>{d}</p>
                </div>
                <span className="resource-status">Being prepared</span>
              </article>
            ))}
          </div>
          <p className="muted-note">
            Documents will be available to download once approved for
            publication. Contact CCDI if you need a particular resource.
          </p>
        </>
      );
    case "donate":
      return (
        <div className="donate-grid">
          <div>
            <Eyebrow>Support that opens doors</Eyebrow>
            <h2>
              Help possibility
              <br />
              find a place.
            </h2>
            <p>
              Your support can contribute to practical training, learning
              resources, welfare initiatives, and stronger families and
              communities.
            </p>
            <ul className="check-list">
              {[
                "Support practical skills and learning",
                "Contribute resources or professional expertise",
                "Sponsor a programme or community initiative",
                "Discuss giving that aligns with your interests",
              ].map((t) => (
                <li key={t}>
                  <Check size={17} />
                  {t}
                </li>
              ))}
            </ul>
            <div className="editorial-note">
              <ShieldCheck size={24} />
              <p>
                Speak directly with CCDI to confirm current needs, official
                payment details, and arrangements for your contribution.
              </p>
            </div>
            <TextLink href="/financial-transparency/">
              Our transparency commitment
            </TextLink>
          </div>
          <SupportSelector />
        </div>
      );
    case "contact":
      return (
        <div className="contact-grid">
          <aside className="contact-aside">
            <Eyebrow>A good place to start</Eyebrow>
            <h2>
              People.
              <br />
              Purpose.
              <br />
              <em>Possibilities.</em>
            </h2>
            <p>We’d love to learn what brings you to CCDI.</p>
            <div className="contact-channel">
              <Facebook size={22} />
              <div>
                <h3>Our Facebook community</h3>
                <a href={facebook} target="_blank" rel="noreferrer">
                  Visit the official page
                  <ArrowUpRight size={16} />
                </a>
              </div>
            </div>
            <div className="contact-channel">
              <MapPin size={22} />
              <div>
                <h3>Nigeria</h3>
                <p>
                  Please confirm the training venue with CCDI before visiting.
                </p>
              </div>
            </div>
            <div className="contact-placeholder">
              <MapPin size={25} />
              <span>
                Location details will be added
                <br />
                once confirmed by CCDI.
              </span>
            </div>
          </aside>
          <EnquiryForm />
        </div>
      );
    case "privacy-policy":
      return (
        <div className="prose narrow">
          <h2>About this website</h2>
          <p>
            This website introduces Creative Craft Development Initiative and
            its programmes. You do not need an account to browse the pages.
          </p>
          <h2>Preparing an enquiry</h2>
          <p>
            The enquiry form prepares a message on your device. It does not send
            or store your details on a CCDI server. If you choose “Prepare &
            copy enquiry”, your browser may copy the message to your clipboard.
          </p>
          <h2>Third-party services</h2>
          <p>
            Facebook links take you to a third-party service with its own
            privacy practices. Information you send through Facebook is handled
            through that service. Use your judgement about what personal
            information to include.
          </p>
          <h2>Photos and personal stories</h2>
          <p>
            Image and story placeholders will be replaced with material approved
            for publication. Identifying information about children and
            vulnerable people should only be published with appropriate consent
            and safeguarding review.
          </p>
          <h2>Hosting and future updates</h2>
          <p>
            The hosting provider may process technical request information
            needed to deliver this website. A fuller organisational privacy
            notice will be added when CCDI confirms its contact details,
            data-handling practices, and any additional services used on the
            site.
          </p>
          <TextLink href="/contact/">Ask a privacy question</TextLink>
        </div>
      );
    case "child-protection":
      return (
        <div className="prose narrow">
          <h2>Care, dignity, and opportunity</h2>
          <p>
            CCDI’s Benevolent & Childcare Initiative focuses on the rights,
            dignity, and well-being of children, especially vulnerable children,
            orphans, and disadvantaged youth.
          </p>
          <h2>Our programme focus</h2>
          <p>
            The initiative includes education support, life-skills learning,
            mentorship, psychosocial support, welfare assistance, and awareness
            about child abuse, exploitation, neglect, and other harmful
            practices.
          </p>
          <h2>Sharing information responsibly</h2>
          <p>
            Please do not send sensitive or identifying information about a
            child through the website enquiry form. Ask CCDI directly for an
            appropriate and confidential way to raise a concern.
          </p>
          <h2>Detailed safeguarding policy</h2>
          <p>
            CCDI’s approved safeguarding policy, reporting procedure, and
            designated contact details will be published when supplied. This
            page is an overview of the programme’s focus and does not replace
            that policy.
          </p>
          <Button href="/projects/benevolent-childcare/">
            Explore the initiative
          </Button>
        </div>
      );
    case "financial-transparency":
      return (
        <>
          <div className="prose narrow">
            <h2>Our commitment</h2>
            <p>
              CCDI is committed to financial transparency, measurable impact
              reporting, sustainable growth, ethical leadership, and strategic
              partnerships.
            </p>
            <h2>Governance and oversight</h2>
            <p>
              The organisation operates under the supervision of its Board of
              Trustees and Management Team. Its supplied governance statement
              describes periodic meetings to review activities, approve
              programmes, and strengthen organisational effectiveness.
            </p>
            <h2>Sustainable support</h2>
            <p>
              CCDI’s social-enterprise arm is designed to generate income that
              supports its programmes and reduces donor dependency.
            </p>
            <h2>How our work is supported</h2>
            <p>CCDI reports receiving support through:</p>
            <ul className="check-list">
              {fundingSources.map((source) => (
                <li key={source}>
                  <Check size={16} aria-hidden="true" />
                  {source}
                </li>
              ))}
            </ul>
            <h2>How funds are used</h2>
            <p>
              Funds received are used for the organisation’s programme and
              operational needs, including:
            </p>
            <ul className="check-list">
              {fundUses.map((use) => (
                <li key={use}>
                  <Check size={16} aria-hidden="true" />
                  {use}
                </li>
              ))}
            </ul>
            <h2>Reports and financial information</h2>
            <p>
              Approved financial statements, reporting periods, and detailed
              impact publications have not yet been supplied for this website.
              They will be added when available. No payment is collected on this
              website.
            </p>
            <TextLink href="/contact/?interest=Financial%20transparency">
              Ask about reporting and accountability
            </TextLink>
          </div>
          <DeliveryChallenges />
        </>
      );
    default:
      return null;
  }
}
function Reship() {
  return (
    <section className="reship-section">
      <Eyebrow light>The RESHIP framework</Eyebrow>
      <h2>
        Skills for work.
        <br />
        Skills for <em>life.</em>
      </h2>
      <p>
        A practical framework for the abilities and attitudes that support
        productive living.
      </p>
      <div>
        {reship.map(([l, t]) => (
          <article key={l}>
            <span>{l}</span>
            <h3>{t}</h3>
          </article>
        ))}
      </div>
    </section>
  );
}
function Faq() {
  return (
    <section className="content-section faq-section">
      <div>
        <Eyebrow>A little clarity</Eyebrow>
        <h2>
          Your next step,
          <br />
          <em>made simpler.</em>
        </h2>
      </div>
      <div>
        {[
          [
            "How do I join a training programme?",
            "Contact CCDI with your area of interest. The team can confirm current availability, entry requirements, the training venue, fees, and the next steps.",
          ],
          [
            "Who can take part?",
            "CCDI’s work supports children, young people, adults, women, and families. Participation requirements depend on the individual programme.",
          ],
          [
            "Are dates and fees available online?",
            "Confirmed dates, timetables, and fees have not yet been added to this website. Please ask CCDI directly for the latest details.",
          ],
          [
            "Can I volunteer or support a programme?",
            "Yes. CCDI welcomes conversations about sharing expertise, mentoring, partnerships, programme sponsorship, and financial support.",
          ],
        ].map(([q, a]) => (
          <details key={q}>
            <summary>
              {q}
              <span aria-hidden="true">+</span>
            </summary>
            <p>{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

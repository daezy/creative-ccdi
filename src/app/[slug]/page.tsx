import { Publications, VideoCollection } from "@/components/media-collections";
import {
  Commitments,
  VisionMission,
  Governance,
  IntegratedModel,
  ImpactContent,
  PartnershipContent,
  JoinMovement,
} from "@/components/organisation-content";
import { organisationCopy as copy } from "@/lib/organisation-copy";
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
              <p className="large-copy">{copy.whoWeAre}</p>
              <p>{copy.belief}</p>
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
          <section className="content-section">
            <SectionHead
              eyebrow="Explore About CCDI"
              title="Our purpose in practice"
            />
            <div className="two-cards">
              {[
                ["Core Values", "/core-values/"],
                ["Impact Statistics", "/impact/"],
                ["Partnership", "/partners/"],
                ["Vision & Mission", "/vision-mission/"],
              ].map(([label, href]) => (
                <article className="info-card" key={href}>
                  <TextLink href={href}>{label}</TextLink>
                </article>
              ))}
            </div>
          </section>
          <Governance />
          <Commitments />
        </>
      );
    case "vision-mission":
      return <VisionMission />;
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
          <p className="intro-paragraph">{copy.belief}</p>
          <ArmGrid />
          <IntegratedModel />
          <Commitments />
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
          <ImpactContent />
          <ReportedProgress />
          <FuturePlans />
          <Commitments />
        </>
      );
    case "partners":
      return <PartnershipContent />;
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
              <div className="journal-photo">
                <PhotoSlot label={a.title} />
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
      return <VideoCollection />;
    case "documents":
      return <Publications />;
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
            <figure className="contact-centre-photo">
              <PhotoSlot label="CCDI centre" variant="sage" />
              <figcaption>
                The CCDI centre. Confirm your programme venue before visiting.
              </figcaption>
            </figure>
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
            This website features photographs, programme videos, and personal
            stories supplied by CCDI. Please contact CCDI with any question
            about the use of an image or story.
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

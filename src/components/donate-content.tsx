import {
  ArrowUpRight,
  CalendarHeart,
  Check,
  FolderHeart,
  GraduationCap,
  Lightbulb,
  Package,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import library from "@/lib/media-library.json";
import { responsive, SIZES } from "@/lib/responsive";
import { Button, Eyebrow, Icon, SectionHead, TextLink } from "./ui";
import { SupportSelector } from "./interactive";

export const donorProjects = [
  {
    title: "A Touch of Love",
    kind: "Project donor opportunity",
    description: "Support widows, widowers and single mothers.",
    icon: "care",
    photo: "welfare-donation-team",
  },
  {
    title: "Youth & Women Skills",
    kind: "Project donor opportunity",
    description: "Sponsor training, tools and materials.",
    icon: "skills",
    photo: "skills-training-showcase",
  },
  {
    title: "Childcare & Education",
    kind: "Project donor opportunity",
    description: "Sponsor scholarships for vulnerable children’s education.",
    icon: "education",
    photo: "young-learners",
  },
  {
    title: "Community Health",
    kind: "Project sponsor opportunity",
    description: "Sponsor health awareness and preventive programmes.",
    icon: "health",
    photo: "seminar-audience",
  },
  {
    title: "Family Development",
    kind: "Project donor opportunity",
    description: "Support marriage, parenting and community programmes.",
    icon: "community",
    photo: "family-workshop",
  },
  {
    title: "Social Enterprise",
    kind: "Project donor opportunity",
    description: "Sponsor sustainable income-generating initiatives.",
    icon: "enterprise",
    photo: "event-service-team",
  },
] as const satisfies readonly {
  title: string;
  kind: string;
  description: string;
  icon: string;
  photo: keyof typeof library;
}[];

const outcomes = [
  "Empower unemployed youths and women with practical skills.",
  "Support vulnerable children through education and welfare.",
  "Bring hope and assistance to widows and widowers.",
  "Promote health awareness and preventive health care.",
  "Strengthen marriages, families and communities.",
  "Develop sustainable social enterprises that create opportunities.",
];

const partnerWays = [
  { label: "Monthly financial support", icon: CalendarHeart },
  { label: "Project sponsorship", icon: FolderHeart },
  { label: "Skills and professional expertise", icon: Lightbulb },
  { label: "Equipment and material donations", icon: Package },
  {
    label: "Scholarship support for less privileged homes",
    icon: GraduationCap,
  },
];

const enquiry = (topic: string) =>
  `/contact/?interest=${encodeURIComponent(topic)}`;

export function DonateContent() {
  return (
    <>
      <div className="donate-grid">
        <div>
          <Eyebrow>Donate · Sponsor a project · Partner with us</Eyebrow>
          <h2>
            Your giving can
            <br />
            make a difference.
          </h2>
          <p>Your partnership can help us:</p>
          <ul className="check-list">
            {outcomes.map((t) => (
              <li key={t}>
                <Check size={17} aria-hidden="true" />
                {t}
              </li>
            ))}
          </ul>
          <div className="editorial-note">
            <ShieldCheck size={24} aria-hidden="true" />
            <p>
              Speak directly with CCDI to confirm current needs, official
              payment details, and arrangements for your contribution.
            </p>
          </div>
          <TextLink href="/financial-transparency/">
            Our transparency commitment
          </TextLink>
        </div>
        <SupportSelector options={donorProjects} />
      </div>

      <section className="content-section donor-projects" id="sponsor-a-project">
        <SectionHead
          eyebrow="Sponsor a project"
          title="Choose where your gift goes."
        >
          Each project is part of CCDI’s ongoing work. Talk to us about
          funding a programme, a group of learners, or a single event.
        </SectionHead>
        <ol className="donor-project-grid">
          {donorProjects.map((project, i) => {
            const photo = library[project.photo];
            return (
              <li className="donor-project" key={project.title}>
                <div className="donor-project-photo">
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    loading="lazy"
                    decoding="async"
                    width={640}
                    height={480}
                    {...responsive(photo.src, photo.width, SIZES.third)}
                  />
                </div>
                <span className="donor-project-icon">
                  <Icon name={project.icon} size={22} />
                </span>
                <div className="donor-project-copy">
                  <p className="donor-project-kind">
                    <span className="number-label">0{i + 1}</span>
                    {project.kind}
                  </p>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <TextLink href={enquiry(`Sponsoring: ${project.title}`)}>
                    Sponsor this project
                  </TextLink>
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      <section
        className="content-section partner-panel"
        id="become-a-partner"
        aria-labelledby="become-a-partner-heading"
      >
        <div className="partner-panel-intro">
          <Eyebrow light>Become a CCDI partner</Eyebrow>
          <h2 id="become-a-partner-heading">
            Every gift matters. Every partnership counts.{" "}
            <em>Every life is valuable.</em>
          </h2>
          <div className="partner-panel-actions">
            <Button href={enquiry("Becoming a CCDI partner")} variant="gold">
              Become a partner
            </Button>
            <Link className="partner-panel-link" href="/partners/">
              Partnership at CCDI
              <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
        <div>
          <p className="partner-panel-lead">You may partner with us through:</p>
          <ul className="partner-ways">
            {partnerWays.map(({ label, icon: WayIcon }) => (
              <li key={label}>
                <WayIcon size={22} strokeWidth={1.5} aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

import Link from "next/link";
import { photos } from "@/lib/media";
import {
  ArrowUpRight,
  ArrowRight,
  Heart,
  Sprout,
  Users,
  HandHeart,
  Scissors,
  ChefHat,
  Sparkles,
  Monitor,
  Printer,
  BookOpen,
  BriefcaseBusiness,
  Camera,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";
export const icons: Record<string, LucideIcon> = {
  skills: BookOpen,
  enterprise: BriefcaseBusiness,
  care: HandHeart,
  community: Users,
  fashion: Scissors,
  food: ChefHat,
  beauty: Sparkles,
  digital: Monitor,
  agriculture: Sprout,
  printing: Printer,
};
export function Icon({ name, size = 25 }: { name: string; size?: number }) {
  const I = icons[name] || Sprout;
  return <I size={size} strokeWidth={1.5} aria-hidden="true" />;
}
export function Button({
  href,
  children,
  variant = "green",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "green" | "gold" | "outline" | "white";
  className?: string;
}) {
  return (
    <Link className={`button button-${variant} ${className}`} href={href}>
      {children}
      <ArrowUpRight size={18} aria-hidden="true" />
    </Link>
  );
}
export function TextLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link className="text-link" href={href}>
      {children}
      <ArrowRight size={18} aria-hidden="true" />
    </Link>
  );
}
export function Eyebrow({
  children,
  light = false,
}: {
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <p className={`eyebrow ${light ? "eyebrow-light" : ""}`}>
      <span aria-hidden="true" />
      {children}
    </p>
  );
}
export function SectionHead({
  eyebrow,
  title,
  children,
  href,
  linkLabel = "Explore more",
}: {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <div className="section-head">
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2>{title}</h2>
        {children && <p className="section-description">{children}</p>}
      </div>
      {href && <TextLink href={href}>{linkLabel}</TextLink>}
    </div>
  );
}
export function PhotoSlot({
  label,
  number = "01",
  variant = "sage",
  className = "",
}: {
  label: string;
  number?: string;
  variant?: string;
  className?: string;
}) {
  const photo = photos[label];
  if (photo)
    return (
      <div className={`photo-slot has-photo photo-${variant} ${className}`}>
        <img
          className="slot-image"
          src={photo.src}
          alt={photo.alt}
          width={960}
          height={720}
          loading="lazy"
          style={{ objectPosition: photo.objectPosition || "center" }}
        />
      </div>
    );
  return (
    <div
      className={`photo-slot photo-${variant} ${className}`}
      role="img"
      aria-label={`Image placeholder: ${label}`}
    >
      <div className="photo-art" aria-hidden="true">
        <span className="art-circle" />
        <span className="art-arch" />
        <span className="art-leaf" />
        <span className="art-line" />
      </div>
      <div className="photo-slot-top">
        <span>CCDI / {number}</span>
        <Camera size={17} aria-hidden="true" />
      </div>
      <div className="photo-slot-caption">
        <span className="photo-tag">IMAGE SPACE</span>
        <span>{label}</span>
      </div>
    </div>
  );
}
export function Cta() {
  return (
    <section className="cta-section">
      <div className="container cta-inner">
        <div className="cta-symbol" aria-hidden="true">
          <Heart size={53} strokeWidth={1} />
          <span>+</span>
        </div>
        <div>
          <Eyebrow light>There is a place for you here</Eyebrow>
          <h2>
            A little of you.
            <br />A world of <em>difference.</em>
          </h2>
        </div>
        <div className="cta-actions">
          <Button href="/volunteer/" variant="gold">
            Get involved
          </Button>
          <Link href="/partners/">
            Let’s build something together{" "}
            <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
export function EmptyFeature({
  title,
  description,
  icon = "skills",
  action = "Talk to CCDI",
  href = "/contact/",
}: {
  title: string;
  description: string;
  icon?: string;
  action?: string;
  href?: string;
}) {
  return (
    <div className="empty-feature">
      <span className="empty-icon">
        <Icon name={icon} size={34} />
      </span>
      <h2>{title}</h2>
      <p>{description}</p>
      <Button href={href}>{action}</Button>
    </div>
  );
}

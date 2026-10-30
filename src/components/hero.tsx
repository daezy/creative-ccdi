"use client";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { onIntro, prefersReducedMotion } from "@/lib/motion-intro";
import {
  ArrowLeft,
  ArrowRight,
  Pause,
  Play,
  ArrowDownRight,
  ArrowUpRight,
  Asterisk,
} from "lucide-react";
import { Button, Eyebrow, PhotoSlot } from "./ui";
import library from "@/lib/media-library.json";
import { arms } from "@/lib/content";
import { organisationCopy } from "@/lib/organisation-copy";

if (typeof window !== "undefined")
  gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin);
const RADIUS = "round 80px 6px 6px 6px";

function HeroAccent({ children }: { children: ReactNode }) {
  return (
    <span className="hero-accent">
      {children}
      <svg viewBox="0 0 500 18" preserveAspectRatio="none" aria-hidden="true">
        <path d="M4 13 Q230 -3 494 9" />
      </svg>
    </span>
  );
}

/** First-load entrance, started when the preloader lifts. */
function playIntro(root: HTMLElement, delay: number) {
  const h1 = root.querySelector<HTMLElement>(".hero-copy h1")!;
  const split = SplitText.create(h1, {
    type: "words",
    mask: "words",
    ignore: h1.querySelectorAll(".hero-accent"),
  });
  const tl = gsap.timeline({
    delay,
    defaults: { ease: "power3.out", duration: 0.9 },
    onComplete: () => split.revert(),
  });
  tl.from(".hero-backdrop", { scale: 1.08, duration: 2, ease: "power2.out" }, 0)
    .from(".hero-copy .eyebrow", { y: 12, autoAlpha: 0 }, 0.1)
    .from(
      split.words.length ? split.words : [h1],
      { yPercent: 110, stagger: 0.05, duration: 1.1, ease: "power4.out" },
      0.15,
    )
    .from(".hero-accent", { autoAlpha: 0, duration: 0.45 }, 0.15)
    .from(
      ".hero-accent > svg path",
      { drawSVG: "0%", duration: 0.9, ease: "power2.inOut" },
      0.8,
    )
    .from(
      ".hero-description, .hero-actions, .hero-bottom",
      { y: 16, autoAlpha: 0, stagger: 0.08 },
      0.5,
    )
    .fromTo(
      ".hero-photo-main",
      { clipPath: `inset(100% 0% 0% 0% ${RADIUS})` },
      {
        clipPath: `inset(0% 0% 0% 0% ${RADIUS})`,
        duration: 1.2,
        ease: "power3.inOut",
        clearProps: "clipPath",
      },
      0.25,
    )
    .from(
      ".hero-photo-small, .hero-stamp, .hero-note, .carousel-bar",
      { y: 16, autoAlpha: 0, stagger: 0.08 },
      0.8,
    );
  // The background photo drifts slightly slower than the page.
  gsap.to(".hero-backdrop", {
    yPercent: 10,
    ease: "none",
    scrollTrigger: {
      trigger: root,
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });
}

/** Slide change: headline re-sets word by word, photos crossfade. */
function playSlide(root: HTMLElement) {
  const copy = root.querySelector<HTMLElement>(".hero-copy")!;
  const h1 = copy.querySelector<HTMLElement>("h1")!;
  const split = SplitText.create(h1, {
    type: "words",
    mask: "words",
    ignore: h1.querySelectorAll(".hero-accent"),
  });
  gsap
    .timeline({
      defaults: { ease: "power3.out" },
      onComplete: () => split.revert(),
    })
    .from(
      split.words.length ? split.words : [h1],
      { yPercent: 110, duration: 0.8, stagger: 0.035, ease: "power4.out" },
      0,
    )
    .from(
      copy.querySelectorAll(".hero-accent"),
      { autoAlpha: 0, duration: 0.45 },
      0.1,
    )
    .fromTo(
      copy.querySelectorAll(".hero-accent > svg path"),
      { drawSVG: "0%" },
      { drawSVG: "100%", duration: 0.9, ease: "power2.inOut" },
      0.4,
    )
    .from(
      copy.querySelectorAll(".hero-description, .hero-actions"),
      { autoAlpha: 0, duration: 0.6 },
      0.15,
    )
    .from(
      ".hero-photo-main img, .hero-photo-small img, .hero-management-photo img, .hero-arm-card img",
      { autoAlpha: 0, duration: 0.7, ease: "power1.out" },
      0,
    );
}

const heroArms = [
  {
    ...arms[0],
    title: "Capacity Development Initiative",
    heading: "Capacity Development",
    accent: "Initiative",
    tagline:
      "Bridging the Gap Between Potential and Skills Through Self-Discovery, Self-Mastery, capacity building and Skills for Life",
  },
  {
    ...arms[1],
    title: "CCDI Social Enterprise",
    heading: "CCDI Social",
    accent: "Enterprise",
    tagline:
      "Where Enterprise Meets Empowerment. Purpose driven Lasting Community Impact",
  },
  {
    ...arms[2],
    title: "Welfare, Benevolence and Childcare Initiative Arm",
    heading: "Welfare, Benevolence and Childcare",
    accent: "Initiative Arm",
    tagline: "Protecting Children, Empowering Youth, Transforming Futures.",
  },
  {
    ...arms[3],
    title: "Creative Community Initiative",
    heading: "Creative Community",
    accent: "Initiative",
    tagline:
      "Building strong, resilient, peaceful, healthy, and value-driven families and communities",
  },
];
const slides = [
  {
    label: "Creative Craft Development Initiative",
    background: library["seminar-audience"],
    duration: 6500,
  },
  {
    label: "CCDI Vision, Mission & Management",
    background: library["archive-020"],
    duration: 18000,
  },
  ...heroArms.map((arm, i) => ({
    label: arm.title,
    background: [
      library["training-room"],
      library["event-service-team"],
      library["community-outreach"],
      library["community-celebration"],
    ][i],
    duration: 12000,
  })),
];
export function Hero() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [focused, setFocused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [introDone, setIntroDone] = useState(false);
  // Background photos download only when needed: the current slide, plus the
  // next one a moment before it is due, so hidden slides cost nothing upfront.
  const [bgLoaded, setBgLoaded] = useState<number[]>([0]);
  const rootRef = useRef<HTMLElement>(null);
  const introPlayed = useRef(false);
  const lastSlide = useRef(0);
  // Entrance: waits for the preloader, then plays once.
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    let ctx: gsap.Context | undefined;
    const off = onIntro((animate) => {
      setIntroDone(true);
      introPlayed.current = true;
      // No preloader on this load: the hero is already on screen, so skip
      // the entrance rather than hide and replay it.
      if (!animate || prefersReducedMotion()) return;
      const delay = document.documentElement.classList.contains("intro-done")
        ? 0.45
        : 0.05;
      ctx = gsap.context(() => playIntro(root, delay), root);
    });
    return () => {
      off();
      ctx?.revert();
    };
  }, []);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    if (mq.matches) setPlaying(false);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  const slide = slides[active];
  const arm = active > 1 ? heroArms[active - 2] : null;
  const slideMs = slide.duration;
  const running = playing && !focused && !reducedMotion && introDone;
  useLayoutEffect(() => {
    if (lastSlide.current === active) return;
    lastSlide.current = active;
    const root = rootRef.current;
    if (!root || !introPlayed.current || prefersReducedMotion()) return;
    const ctx = gsap.context(() => playSlide(root), root);
    return () => ctx.revert();
  }, [active]);
  // A timeout keyed on the active slide restarts the full interval after
  // every change, so manual navigation never cuts the next slide short.
  useEffect(() => {
    if (!running) return;
    const id = setTimeout(
      () => setActive((v) => (v + 1) % slides.length),
      slideMs,
    );
    return () => clearTimeout(id);
  }, [running, active, slideMs]);
  useEffect(() => {
    const next = (active + 1) % slides.length;
    setBgLoaded((l) => (l.includes(active) ? l : [...l, active]));
    const id = window.setTimeout(
      () => setBgLoaded((l) => (l.includes(next) ? l : [...l, next])),
      2500,
    );
    return () => window.clearTimeout(id);
  }, [active]);
  function change(n: number) {
    setActive((n + slides.length) % slides.length);
  }
  return (
    <section
      ref={rootRef}
      className="home-hero story-hero"
      aria-label="Welcome to CCDI"
      aria-roledescription="carousel"
      data-running={running ? "true" : "false"}
      style={{ ["--slide-ms" as string]: `${slideMs}ms` }}
      onFocusCapture={(e) => {
        if ((e.target as HTMLElement).matches(":focus-visible"))
          setFocused(true);
      }}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node))
          setFocused(false);
      }}
    >
      <div className="hero-backdrop" aria-hidden="true">
        {slides.map((s, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={s.background.src}
            src={bgLoaded.includes(i) ? s.background.src : undefined}
            alt=""
            className={i === active ? "is-active" : undefined}
            loading={i === 0 ? "eager" : "lazy"}
            fetchPriority={i === 0 ? "high" : "auto"}
            decoding="async"
          />
        ))}
      </div>
      <div className="hero-carousel-stage">
        {active === 0 ? (
          <div className="container hero-grid">
            <div className="hero-copy" key={active}>
              <Eyebrow light>
                Creative Craft Development Initiative (CCDI)
              </Eyebrow>
              <h1>
                Creative Craft
                <br />
                Development
                <br />
                <HeroAccent>Initiative.</HeroAccent>
              </h1>
              <p className="hero-description">{organisationCopy.homeIntro}</p>
              <div className="hero-actions">
                <Button href="/programmes/" variant="gold">
                  Explore our programmes
                </Button>
                <a className="hero-secondary" href="/about/">
                  Get to know CCDI{" "}
                  <ArrowDownRight size={18} aria-hidden="true" />
                </a>
              </div>
              <div className="hero-bottom">
                <div className="small-orbit" aria-hidden="true">
                  <span>
                    <Asterisk size="1em" aria-hidden="true" />
                  </span>
                </div>
                <p>
                  Discover. Develop.
                  <br />
                  <strong>Empower. Transform.</strong>
                </p>
                <span className="hero-line" />
                <span className="hero-location">
                  Rooted in Nigeria.
                  <br />
                  Built around people.
                </span>
              </div>
            </div>
            <div className="hero-visual">
              <div className="hero-photo-main hero-logo-panel">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="hero-company-logo"
                  src="/images/ccdi-logo-transparent.png"
                  alt="Creative Craft Development Initiative (CCDI) logo"
                  width={1319}
                  height={1192}
                  fetchPriority="high"
                />
                <div className="hero-photo-caption">
                  <span className="status-dot" /> Where potential finds purpose.
                </div>
              </div>
              <div className="hero-photo-small">
                <PhotoSlot
                  label="Learning together"
                  variant="cream"
                  number="02"
                />
              </div>
              <div className="hero-stamp">
                <svg viewBox="0 0 100 100" aria-hidden="true">
                  <defs>
                    <path
                      id="stamp-circle"
                      d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0"
                    />
                  </defs>
                  <text>
                    <textPath href="#stamp-circle">
                      SELF DISCOVERY · SKILLS FOR LIFE ·{" "}
                    </textPath>
                  </text>
                </svg>
                <span aria-hidden="true">
                  <ArrowUpRight size="1em" />
                </span>
              </div>
              <div className="hero-note">
                <span>THE CCDI WAY</span>
                <p>
                  Potential is everywhere.
                  <br />
                  <strong>Opportunity should be, too.</strong>
                </p>
              </div>
            </div>
          </div>
        ) : active === 1 ? (
          <div className="container hero-grid hero-management" key="management">
            <div className="hero-copy">
              <Eyebrow light>Creative Craft Development Initiative</Eyebrow>
              <h1>
                <HeroAccent>CCDI</HeroAccent>
              </h1>
              <h2 className="hero-management-subheading">
                Empowering Lives Through Skills, Purpose, and Community.
              </h2>
              <p className="hero-description hero-belief">
                We believe everyone has the ability to learn and master a skill
                given proper support and training.
              </p>
              <div className="hero-actions">
                <Button href="/vision-mission/" variant="gold">
                  Our vision & mission
                </Button>
                <a className="hero-secondary" href="/about/#governance">
                  Meet our management{" "}
                  <ArrowUpRight size={18} aria-hidden="true" />
                </a>
              </div>
            </div>
            <div className="hero-management-detail">
              <figure className="hero-management-photo">
                <img
                  src="/images/library/archive-020.webp"
                  width={1280}
                  height={759}
                  alt="CCDI Board of Trustees and Management Team group photograph"
                />
                <figcaption>
                  CCDI Board of Trustees & Management Team
                </figcaption>
              </figure>
              <div className="hero-statements">
                <div>
                  <h3>Our vision</h3>
                  <p>{organisationCopy.vision}</p>
                </div>
                <div>
                  <h3>Our mission</h3>
                  <p>{organisationCopy.mission}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="container hero-grid hero-project" key={arm!.slug}>
            <div className="hero-copy">
              <Eyebrow light>CCDI / Project Arm {arm!.number}</Eyebrow>
              <h1 className="hero-project-title">
                {arm!.heading} <HeroAccent>{arm!.accent}</HeroAccent>
              </h1>
              <p className="hero-description hero-project-tagline">
                {arm!.tagline}
              </p>
              <div className="hero-actions">
                <Button href={`/projects/${arm!.slug}/`} variant="gold">
                  Explore this project arm
                </Button>
                <a className="hero-secondary" href="/projects/">
                  Our four integrated arms{" "}
                  <ArrowUpRight size={18} aria-hidden="true" />
                </a>
              </div>
            </div>
            <div className="hero-visual">
              <div className="hero-photo-main">
                <PhotoSlot label={arm!.photo} />
                <div className="hero-photo-caption">
                  <span className="status-dot" />
                  {arm!.title}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="container carousel-bar">
        <span>ONE MISSION. MANY POSSIBILITIES.</span>
        <div className="carousel-controls">
          <div className="slide-dots">
            {slides.map((s, i) => (
              <button
                key={s.label}
                aria-label={`Show slide ${i + 1}: ${s.label}`}
                aria-pressed={active === i}
                onClick={() => change(i)}
              >
                <span key={active === i ? `on-${active}` : "off"} />
              </button>
            ))}
          </div>
          <span className="slide-count" aria-live="polite">
            0{active + 1}
            <span> / {String(slides.length).padStart(2, "0")}</span>
          </span>
          <button
            className="icon-button"
            onClick={() => change(active - 1)}
            aria-label="Previous slide"
          >
            <ArrowLeft size={18} />
          </button>
          <button
            className="icon-button"
            onClick={() => change(active + 1)}
            aria-label="Next slide"
          >
            <ArrowRight size={18} />
          </button>
          <button
            className="icon-button play-button"
            onClick={() => setPlaying(!playing)}
            aria-label={playing ? "Pause slideshow" : "Play slideshow"}
          >
            {playing ? <Pause size={15} /> : <Play size={15} />}
          </button>
        </div>
      </div>
    </section>
  );
}

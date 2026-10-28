"use client";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Pause,
  Play,
  ArrowDownRight,
} from "lucide-react";
import { Button, Eyebrow, PhotoSlot } from "./ui";
import library from "@/lib/media-library.json";
const SLIDE_MS = 6500;
const slides = [
  {
    first: "Creative Craft",
    second: "Development",
    accent: "Initiative.",
    description:
      "We are a mission-driven organization committed to addressing youth unemployment, community empowerment, healthy living skills, rehabilitation, and education.",
    cta: "Explore our programmes",
    href: "/programmes/",
    photo: "Hands-on skills. Real-world possibility.",
    small: "Learning together",
    theme: "sage",
    background: library["training-room"],
  },
  {
    first: "Where enterprise",
    second: "meets",
    accent: "empowerment.",
    description:
      "This arm drives sustainability through income-generating activities such as fashion and tailoring production, catering and bakery services, ICT and digital services, agriculture, printing and publishing.",
    cta: "Discover our services",
    href: "/services/",
    photo: "Enterprise that empowers.",
    small: "Creating with purpose",
    theme: "gold",
    background: library["event-service-team"],
  },
  {
    first: "Creative",
    second: "Community",
    accent: "Initiative.",
    description:
      "Building strong, resilient, peaceful, healthy, and value-driven families and communities.",
    cta: "Meet our community arm",
    href: "/projects/creative-community/",
    photo: "Stronger families. Thriving communities.",
    small: "Growing together",
    theme: "clay",
    background: library["community-celebration"],
  },
];
export function Hero() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [focused, setFocused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    if (mq.matches) setPlaying(false);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  const running = playing && !focused && !reducedMotion;
  // A timeout keyed on the active slide restarts the full interval after
  // every change, so manual navigation never cuts the next slide short.
  useEffect(() => {
    if (!running) return;
    const id = setTimeout(
      () => setActive((v) => (v + 1) % slides.length),
      SLIDE_MS,
    );
    return () => clearTimeout(id);
  }, [running, active]);
  const slide = slides[active];
  function change(n: number) {
    setActive((n + slides.length) % slides.length);
  }
  return (
    <section
      className="home-hero"
      aria-label="Welcome to CCDI"
      aria-roledescription="carousel"
      data-running={running ? "true" : "false"}
      style={{ ["--slide-ms" as string]: `${SLIDE_MS}ms` }}
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
            src={s.background.src}
            alt=""
            className={i === active ? "is-active" : undefined}
            loading={i === 0 ? "eager" : "lazy"}
            fetchPriority={i === 0 ? "high" : "auto"}
            decoding="async"
          />
        ))}
      </div>
      <div className="container hero-grid">
        <div className="hero-copy" key={active}>
          <Eyebrow light>Creative Craft Development Initiative (CCDI)</Eyebrow>
          <h1>
            {slide.first}
            <br />
            {slide.second}
            <br />
            <span className="hero-accent">
              {slide.accent}
              <svg
                viewBox="0 0 500 18"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path d="M4 13 Q230 -3 494 9" />
              </svg>
            </span>
          </h1>
          <p className="hero-description">{slide.description}</p>
          <div className="hero-actions">
            <Button href={slide.href} variant="gold">
              {slide.cta}
            </Button>
            <a className="hero-secondary" href="/about/">
              Get to know CCDI <ArrowDownRight size={18} aria-hidden="true" />
            </a>
          </div>
          <div className="hero-bottom">
            <div className="small-orbit" aria-hidden="true">
              <span>✳</span>
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
          <div className="hero-photo-main">
            <PhotoSlot
              label={slide.photo}
              priority={active === 0}
              variant={slide.theme}
              number={`0${active + 1}`}
            />
            <div className="hero-photo-caption">
              <span className="status-dot" /> Where potential finds purpose.
            </div>
          </div>
          <div className="hero-photo-small">
            <PhotoSlot label={slide.small} variant="cream" number="02" />
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
            <span aria-hidden="true">↗</span>
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
      <div className="container carousel-bar">
        <span>ONE MISSION. MANY POSSIBILITIES.</span>
        <div className="carousel-controls">
          <div className="slide-dots">
            {slides.map((s, i) => (
              <button
                key={s.first}
                aria-label={`Show slide ${i + 1}: ${s.first}`}
                aria-pressed={active === i}
                onClick={() => change(i)}
              >
                <span key={active === i ? `on-${active}` : "off"} />
              </button>
            ))}
          </div>
          <span className="slide-count" aria-live="polite">
            0{active + 1}
            <span> / 03</span>
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

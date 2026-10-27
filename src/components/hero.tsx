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
const slides = [
  {
    first: "A skill today.",
    second: "A world of",
    accent: "possibility.",
    description:
      "We help people discover their potential, develop practical skills, and create purposeful lives. Because a stronger future begins with what’s already inside you.",
    cta: "Explore our programmes",
    href: "/programmes/",
    photo: "Hands-on skills. Real-world possibility.",
    small: "Learning together",
    theme: "sage",
  },
  {
    first: "Good work.",
    second: "A greater",
    accent: "purpose.",
    description:
      "From fashion and food to digital services and farming, we connect enterprise with empowerment to help communities build sustainable livelihoods.",
    cta: "Discover our services",
    href: "/services/",
    photo: "Enterprise that empowers.",
    small: "Creating with purpose",
    theme: "gold",
  },
  {
    first: "Stronger homes.",
    second: "A shared",
    accent: "future.",
    description:
      "We bring families and communities together through practical learning, healthier relationships, and opportunities for every generation to thrive.",
    cta: "Meet our community arm",
    href: "/projects/creative-community/",
    photo: "Stronger families. Thriving communities.",
    small: "Growing together",
    theme: "clay",
  },
];
export function Hero() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [hovered, setHovered] = useState(false);
  useEffect(() => {
    if (
      !playing ||
      hovered ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const id = setInterval(
      () => setActive((v) => (v + 1) % slides.length),
      7000,
    );
    return () => clearInterval(id);
  }, [playing, hovered]);
  const slide = slides[active];
  function change(n: number) {
    setPlaying(false);
    setActive((n + slides.length) % slides.length);
  }
  return (
    <section
      className="home-hero"
      aria-label="Welcome to CCDI"
      aria-roledescription="carousel"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setHovered(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node))
          setHovered(false);
      }}
    >
      <div className="container hero-grid">
        <div className="hero-copy" key={active}>
          <Eyebrow>Empowering people. Transforming communities.</Eyebrow>
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
            <Button href={slide.href}>{slide.cta}</Button>
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
                <span />
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

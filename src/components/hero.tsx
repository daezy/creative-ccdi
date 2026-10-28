"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
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
} from "lucide-react";
import { Button, Eyebrow, PhotoSlot } from "./ui";
import library from "@/lib/media-library.json";
const SLIDE_MS = 6500;
if (typeof window !== "undefined")
  gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin);
const RADIUS = "round 80px 6px 6px 6px";

/** First-load entrance, started when the preloader lifts. */
function playIntro(root: HTMLElement, delay: number) {
  const h1 = root.querySelector<HTMLElement>(".hero-copy h1")!;
  const split = SplitText.create(h1, { type: "words", mask: "words" });
  const tl = gsap.timeline({
    delay,
    defaults: { ease: "expo.out", duration: 1.2 },
    onComplete: () => split.revert(),
  });
  tl.from(
    ".hero-backdrop",
    { scale: 1.16, duration: 2.6, ease: "power3.out" },
    0,
  )
    .from(".hero-copy .eyebrow", { x: -24, autoAlpha: 0, duration: 0.9 }, 0.1)
    .from(split.words, { yPercent: 115, stagger: 0.06, duration: 1.3 }, 0.2)
    .from(
      ".hero-accent > svg path",
      { drawSVG: "0%", duration: 1.1, ease: "power2.inOut" },
      0.95,
    )
    .from(".hero-description", { y: 26, autoAlpha: 0 }, 0.55)
    .from(".hero-actions > *", { y: 26, autoAlpha: 0, stagger: 0.08 }, 0.65)
    .from(".hero-bottom > *", { y: 18, autoAlpha: 0, stagger: 0.06 }, 0.8)
    .fromTo(
      ".hero-photo-main",
      { clipPath: `inset(100% 0% 0% 0% ${RADIUS})` },
      {
        clipPath: `inset(0% 0% 0% 0% ${RADIUS})`,
        duration: 1.5,
        ease: "expo.inOut",
        clearProps: "clipPath",
      },
      0.25,
    )
    .from(".hero-photo-main img", { scale: 1.4, duration: 2.2 }, 0.25)
    .from(".hero-photo-caption", { yPercent: 100, duration: 0.9 }, 1.15)
    .from(
      ".hero-photo-small",
      {
        y: 140,
        rotation: -28,
        autoAlpha: 0,
        duration: 1.4,
        ease: "back.out(1.3)",
      },
      0.75,
    )
    .from(
      ".hero-stamp",
      { scale: 0, rotation: -220, duration: 1.5, ease: "back.out(1.6)" },
      1.0,
    )
    .from(".hero-note", { y: 22, autoAlpha: 0 }, 1.2)
    .from(".carousel-bar", { y: 22, autoAlpha: 0 }, 1.05);
  // Scroll away: content lifts and fades, photography drifts slower.
  gsap.to(".hero-grid", {
    yPercent: -10,
    opacity: 0.25,
    ease: "none",
    scrollTrigger: {
      trigger: root,
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });
  gsap.to(".hero-backdrop", {
    yPercent: 18,
    ease: "none",
    scrollTrigger: {
      trigger: root,
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });
}

/** Slide change: headline re-sets word by word, photos wipe in. */
function playSlide(root: HTMLElement) {
  const copy = root.querySelector<HTMLElement>(".hero-copy")!;
  const h1 = copy.querySelector<HTMLElement>("h1")!;
  const split = SplitText.create(h1, { type: "words", mask: "words" });
  const tl = gsap.timeline({
    defaults: { ease: "expo.out" },
    onComplete: () => split.revert(),
  });
  tl.from(split.words, { yPercent: 115, duration: 1.05, stagger: 0.045 }, 0)
    .from(
      copy.querySelector(".hero-accent > svg path"),
      { drawSVG: "0%", duration: 0.9, ease: "power2.inOut" },
      0.45,
    )
    .from(
      copy.querySelectorAll(".hero-description, .hero-actions > *"),
      { y: 20, autoAlpha: 0, duration: 0.9, stagger: 0.07 },
      0.15,
    )
    .fromTo(
      ".hero-photo-main",
      { clipPath: `inset(0% 0% 0% 100% ${RADIUS})` },
      {
        clipPath: `inset(0% 0% 0% 0% ${RADIUS})`,
        duration: 1.15,
        ease: "expo.inOut",
        clearProps: "clipPath",
      },
      0,
    )
    .from(".hero-photo-main img", { scale: 1.25, duration: 1.7 }, 0)
    .from(
      ".hero-photo-small",
      {
        y: 50,
        rotation: -18,
        autoAlpha: 0,
        duration: 1.1,
        ease: "back.out(1.6)",
      },
      0.2,
    );
}
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
  const [introDone, setIntroDone] = useState(false);
  const rootRef = useRef<HTMLElement>(null);
  const introPlayed = useRef(false);
  const lastSlide = useRef(0);
  // Entrance: waits for the preloader, then plays once.
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    let ctx: gsap.Context | undefined;
    const off = onIntro(() => {
      setIntroDone(true);
      introPlayed.current = true;
      if (prefersReducedMotion()) return;
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
      ref={rootRef}
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

"use client";
/**
 * Site-wide motion layer (GSAP), kept deliberately quiet. Mounted once in the
 * root layout, it:
 *  - plays the preloader exit and releases the first-load intro
 *  - reveals content once as it scrolls into view: headings rise line by
 *    line, blocks and cards fade up gently, photos unmask, numbers count up
 *  - hides the header on scroll down and brings it back on scroll up
 *  - plays a curtain transition between pages
 * Everything is skipped when the visitor prefers reduced motion.
 */
import { useLayoutEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { flushIntro, onIntro, prefersReducedMotion } from "@/lib/motion-intro";

declare global {
  interface Window {
    __ccdiMotion?: boolean;
  }
}

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

const EASE = "expo.out";
const CLEAR = "transform,opacity,visibility,transition";

/** Containers whose children arrive as a soft stagger. */
const GROUPS = [
  ".arms-grid",
  ".two-cards",
  ".three-cards",
  ".values-grid",
  ".training-grid",
  ".service-grid",
  ".journal-grid",
  ".programme-preview",
  ".project-grid",
  ".trustee-grid",
  ".team-photo-grid",
  ".initiative-photo-grid",
  ".real-stories-grid",
  ".publication-grid",
  ".flyer-grid",
  ".video-grid",
  ".document-card-grid",
  ".donate-grid",
  ".support-options",
  ".supplied-impact-grid",
  ".impact-facts",
  ".check-list",
  ".about-checks",
  ".journey-list",
  ".activity-list",
  ".challenge-list",
  ".supplied-purposes ol",
  ".gallery-masonry",
].join(",");
/** Individual blocks that fade up. */
const SINGLES = [
  ".eyebrow",
  "p",
  ".button",
  ".text-link",
  "blockquote",
  "figcaption",
  ".contact-channel",
  ".enquiry-form",
  ".gallery-tags",
  ".filter-bar",
  ".cta-actions",
  ".hero-actions",
  "details",
  "table",
  ".cta-symbol",
].join(",");

/** Client-rendered areas whose DOM React may update. */
const CLIENT_ZONES =
  ".gallery-collections, .enquiry-form, .document-library, .support-selector, .site-header";

const norm = (p: string) => p.replace(/\/+$/, "") || "/";

/** Set by the browser's back/forward buttons, which should keep their position. */
let historyNav = false;

/** Jump (not smooth-scroll) to the top, or to the #anchor if the link has one. */
function resetScroll() {
  const target = location.hash
    ? document.getElementById(decodeURIComponent(location.hash.slice(1)))
    : null;
  if (target) target.scrollIntoView({ behavior: "instant", block: "start" });
  else window.scrollTo({ top: 0, left: 0, behavior: "instant" });
}

export function Motion() {
  const pathname = usePathname();
  const router = useRouter();
  const navSeen = useRef(false);
  const state = useRef({
    first: true,
    preloader: false,
    reduced: false,
    curtainCovering: false,
    uncover: () => {},
  });

  // ---------------------------------------------------------------- global
  useLayoutEffect(() => {
    window.__ccdiMotion = true;
    const onPop = () => {
      historyNav = true;
    };
    window.addEventListener("popstate", onPop);
    const s = state.current;
    s.reduced = prefersReducedMotion();
    const html = document.documentElement;
    const pre = document.getElementById("preloader");

    if (s.reduced) {
      pre?.classList.add("is-done");
      flushIntro(false);
      return;
    }

    s.preloader =
      !!pre &&
      !html.classList.contains("preloader-skip") &&
      getComputedStyle(pre).display !== "none" &&
      getComputedStyle(pre).visibility !== "hidden";

    const cleanups: Array<() => void> = [];
    const header = document.querySelector<HTMLElement>(".site-header");

    // Header + top bar drop in with the intro (only when the preloader hid them).
    if (s.preloader) {
      onIntro(() => {
        gsap.from(".announcement .container > *, .header-inner > *", {
          y: -22,
          autoAlpha: 0,
          duration: 1,
          stagger: 0.05,
          ease: EASE,
          delay: 0.25,
          clearProps: CLEAR,
        });
      });
    }

    // Preloader exit.
    if (s.preloader && pre) {
      const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
      const loaded = new Promise<void>((r) => {
        if (document.readyState === "complete") r();
        else window.addEventListener("load", () => r(), { once: true });
      });
      const fonts = document.fonts?.ready ?? Promise.resolve();
      Promise.race([
        Promise.all([
          loaded,
          fonts,
          wait(Math.max(0, 2150 - performance.now())),
        ]),
        wait(4800),
      ]).then(() => {
        pre.classList.add("is-leaving");
        const tl = gsap.timeline({
          onComplete: () => {
            // Hide rather than remove: React owns this node.
            pre.classList.add("is-done");
            ScrollTrigger.refresh();
          },
        });
        tl.to(pre.querySelector(".preloader-bar span"), {
          scaleX: 1,
          duration: 0.35,
          ease: "power2.out",
        })
          .to(
            pre.querySelectorAll(".preloader-word span"),
            { yPercent: -110, duration: 0.5, stagger: 0.05, ease: "power3.in" },
            "+=0.05",
          )
          .to(
            pre.querySelectorAll(".preloader-tag, .preloader-bar"),
            { autoAlpha: 0, duration: 0.3 },
            "<",
          )
          .to(
            pre.querySelector(".preloader-emblem"),
            {
              scale: 0.7,
              rotation: -12,
              autoAlpha: 0,
              duration: 0.6,
              ease: "power3.in",
            },
            "<0.05",
          )
          .add(() => flushIntro(), "-=0.1")
          .to(
            pre,
            {
              clipPath: "inset(0% 0% 100% 0%)",
              duration: 0.95,
              ease: "power4.inOut",
            },
            "-=0.25",
          );
      });
    } else {
      pre?.classList.add("is-done");
      flushIntro(false);
    }

    // Header hides on scroll down, returns on scroll up.
    let headerHidden = false;
    const headerST = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        if (!header) return;
        const busy = document.querySelector(
          ".nav-dropdown, .mobile-panel, .gallery-dialog",
        );
        const hide = self.direction === 1 && self.scroll() > 520 && !busy;
        if (hide === headerHidden) return;
        headerHidden = hide;
        gsap.to(header, {
          yPercent: hide ? -100 : 0,
          duration: hide ? 0.3 : 0.45,
          ease: hide ? "power2.in" : "power3.out",
          overwrite: true,
        });
      },
    });
    cleanups.push(() => headerST.kill());

    // Keep trigger positions right as images load and content changes size.
    let refreshTimer = 0;
    const ro = new ResizeObserver(() => {
      clearTimeout(refreshTimer);
      refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 200);
    });
    ro.observe(document.body);
    cleanups.push(() => ro.disconnect());

    // Page-to-page curtain.
    const curtain = document.querySelector<HTMLElement>(".page-curtain");
    let curtainSafety = 0;
    if (curtain) gsap.set(curtain, { y: 0, yPercent: 101, autoAlpha: 1 });
    const uncover = () => {
      clearTimeout(curtainSafety);
      if (!curtain || !s.curtainCovering) return;
      gsap
        .timeline({
          onComplete: () => {
            s.curtainCovering = false;
            gsap.set(curtain, { yPercent: 101 });
          },
        })
        .to(
          curtain.querySelectorAll(".page-curtain-emblem, .page-curtain-label"),
          {
            y: -30,
            autoAlpha: 0,
            duration: 0.4,
            stagger: 0.04,
            ease: "power3.in",
          },
        )
        .to(
          curtain,
          { yPercent: -101, duration: 0.85, ease: "power4.inOut" },
          "-=0.2",
        );
    };
    s.uncover = uncover;
    const onClick = (e: MouseEvent) => {
      if (
        !curtain ||
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey ||
        s.curtainCovering
      )
        return;
      const a = (e.target as Element)?.closest?.(
        "a[href]",
      ) as HTMLAnchorElement | null;
      if (
        !a ||
        (a.target && a.target !== "_self") ||
        a.hasAttribute("download")
      )
        return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin) return;
      if (norm(url.pathname) === norm(location.pathname)) return;
      if (/\.(pdf|jpe?g|png|webp|gif|mp4|zip|docx?|xlsx?)$/i.test(url.pathname))
        return;
      e.preventDefault();
      s.curtainCovering = true;
      const text = (a.getAttribute("aria-label") || a.textContent || "")
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 48);
      const labelEl = curtain.querySelector<HTMLElement>(
        ".page-curtain-label",
      )!;
      labelEl.textContent = text && text.length > 1 ? text : "CCDI";
      gsap
        .timeline({
          onComplete: () => {
            router.push(url.pathname + url.search + url.hash);
            curtainSafety = window.setTimeout(uncover, 5000);
          },
        })
        .fromTo(
          curtain,
          { yPercent: 101 },
          { yPercent: 0, duration: 0.7, ease: "power4.inOut" },
        )
        .fromTo(
          curtain.querySelectorAll(".page-curtain-emblem, .page-curtain-label"),
          { y: 40, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.06, ease: EASE },
          "-=0.35",
        );
    };
    window.addEventListener("click", onClick, true);
    cleanups.push(() => window.removeEventListener("click", onClick, true));

    return () => cleanups.forEach((f) => f());
  }, []);

  // -------------------------------------------------------------- per page
  useLayoutEffect(() => {
    const s = state.current;
    // Every newly opened page starts at the top. The site uses smooth
    // scrolling, which used to leave the new page part-way down.
    if (!navSeen.current) navSeen.current = true;
    else if (historyNav) historyNav = false;
    else {
      resetScroll();
      requestAnimationFrame(resetScroll);
    }
    if (s.reduced) return;
    const isFirst = s.first;
    s.first = false;
    const header = document.querySelector<HTMLElement>(".site-header");
    if (header && !isFirst) gsap.set(header, { yPercent: 0 });
    // On a plain first load (no preloader), content already on screen is
    // left alone so nothing flashes; everything below the fold still reveals.
    const animateInView = !isFirst || s.preloader;
    const fromCurtain = s.curtainCovering;
    const teardown = setupPage(isFirst, animateInView, fromCurtain);
    if (fromCurtain) {
      resetScroll();
      s.uncover();
    }
    requestAnimationFrame(() => ScrollTrigger.refresh());
    return teardown;
  }, [pathname]);

  return null;
}

// ---------------------------------------------------------------- page setup
function setupPage(
  isFirst: boolean,
  animateInView: boolean,
  fromCurtain: boolean,
) {
  const ctx = gsap.context(() => {});
  const roots = [
    document.querySelector("main"),
    document.querySelector(".site-footer"),
  ].filter(Boolean) as HTMLElement[];
  const all = (sel: string) =>
    roots.flatMap((r) => Array.from(r.querySelectorAll<HTMLElement>(sel)));
  const claimed = new Set<Element>();
  const isClaimed = (el: Element) => {
    for (let p: Element | null = el; p; p = p.parentElement)
      if (claimed.has(p)) return true;
    return false;
  };
  const skip = (el: Element) =>
    !!el.closest(".home-hero, [role=dialog], .sr-only, .preloader, [hidden]");
  const vh = window.innerHeight;

  // Reveal once on enter; things arriving together get a small stagger.
  const pending = new Map<Element, (delay: number) => void>();
  const io = new IntersectionObserver(
    (entries) => {
      entries
        .filter((e) => e.isIntersecting && pending.has(e.target))
        .map((e) => e.target)
        .sort((a, b) =>
          a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING
            ? -1
            : 1,
        )
        .forEach((t, i) => {
          const play = pending.get(t)!;
          pending.delete(t);
          io.unobserve(t);
          ctx.add(() =>
            play(Math.min(i * 0.06, 0.3) + (fromCurtain ? 0.35 : 0)),
          );
        });
    },
    { rootMargin: "0px 0px -8% 0px" },
  );
  const reveal = (
    el: Element,
    prep: () => void,
    play: (delay: number) => void,
  ) => {
    if (!animateInView && el.getBoundingClientRect().top < vh * 0.98) return;
    ctx.add(prep);
    pending.set(el, play);
    io.observe(el);
  };
  const fadeUp = (els: Element | Element[], delay: number, stagger = 0) =>
    gsap.to(els, {
      autoAlpha: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
      delay,
      stagger,
      clearProps: CLEAR,
    });
  const hidden = { autoAlpha: 0, y: 20, transition: "none" };

  // Safety net: anything still waiting once it is on screen gets revealed.
  let sweepTimer = 0;
  const onScroll = () => {
    clearTimeout(sweepTimer);
    sweepTimer = window.setTimeout(() => {
      pending.forEach((play, el) => {
        const r = el.getBoundingClientRect();
        if (r.top < vh && r.bottom > 0) {
          pending.delete(el);
          io.unobserve(el);
          ctx.add(() => play(0));
        }
      });
    }, 160);
  };
  window.addEventListener("scroll", onScroll, { passive: true });

  // 1. Page hero entrance.
  const hero = document.querySelector<HTMLElement>(
    "main .page-hero, main .project-hero, main .article-hero",
  );
  if (hero) {
    claimed.add(hero);
    const run = () =>
      ctx.add(() => heroEntrance(hero, fromCurtain ? 0.45 : 0.1));
    if (isFirst) onIntro((animate) => animate && run());
    else run();
  }

  // 2. Groups: children rise a little, one after another.
  all(GROUPS).forEach((group) => {
    if (skip(group) || isClaimed(group)) return;
    const items = Array.from(group.children) as HTMLElement[];
    if (!items.length) return;
    claimed.add(group);
    // Long grids (e.g. the gallery) reveal item by item as they scroll in.
    if (items.length > 10)
      items.forEach((it) =>
        reveal(
          it,
          () => gsap.set(it, hidden),
          (d) => fadeUp(it, d),
        ),
      );
    else
      reveal(
        group,
        () => gsap.set(items, hidden),
        (d) => fadeUp(items, d, 0.07),
      );
  });

  // 3. Headings: masked line-by-line rise, the one signature move.
  all("h1, h2").forEach((h) => {
    if (skip(h) || isClaimed(h) || !h.textContent?.trim()) return;
    claimed.add(h);
    reveal(
      h,
      () => gsap.set(h, { autoAlpha: 0 }),
      (delay) => {
        // Interactive React regions get a plain fade (no DOM splitting).
        if (h.closest(CLIENT_ZONES)) {
          gsap.set(h, { y: 20 });
          fadeUp(h, delay);
          return;
        }
        const split = SplitText.create(h, { type: "lines", mask: "lines" });
        gsap.set(h, { autoAlpha: 1 });
        gsap.from(split.lines, {
          yPercent: 105,
          duration: 0.9,
          ease: "power4.out",
          stagger: 0.08,
          delay,
          onComplete: () => split.revert(),
        });
      },
    );
  });

  // 4. Photos: a soft unmask.
  all(".photo-slot.has-photo, figure > img").forEach((el) => {
    if (skip(el) || isClaimed(el)) return;
    claimed.add(el);
    reveal(
      el,
      () => gsap.set(el, { clipPath: "inset(6% 6% 6% 6%)", autoAlpha: 0 }),
      (delay) =>
        gsap.to(el, {
          clipPath: "inset(0% 0% 0% 0%)",
          autoAlpha: 1,
          duration: 1.1,
          ease: "power3.out",
          delay,
          clearProps: "clipPath,opacity,visibility",
        }),
    );
  });

  // 5. Text and small blocks fade up.
  all(SINGLES).forEach((el) => {
    if (skip(el) || isClaimed(el) || el.closest(".photo-slot")) return;
    claimed.add(el);
    reveal(
      el,
      () => gsap.set(el, hidden),
      (d) => fadeUp(el, d),
    );
  });

  // 6. Counters.
  all(".fact-number").forEach((el) => {
    const m = el.textContent?.trim().match(/^([\d,]+)(.*)$/);
    if (!m) return;
    const target = parseInt(m[1].replace(/,/g, ""), 10);
    const suffix = m[2];
    const original = el.textContent!;
    el.setAttribute("aria-label", original);
    reveal(
      el,
      () => {
        el.textContent = `0${suffix}`;
      },
      (delay) => {
        const o = { v: 0 };
        gsap.to(o, {
          v: target,
          duration: 1.6,
          ease: "power3.out",
          delay: delay + 0.1,
          onUpdate: () => {
            el.textContent = `${Math.round(o.v).toLocaleString("en-NG")}${suffix}`;
          },
          onComplete: () => {
            el.textContent = original;
          },
        });
      },
    );
    ctx.add(() => () => {
      el.textContent = original;
    });
  });

  return () => {
    io.disconnect();
    window.removeEventListener("scroll", onScroll);
    clearTimeout(sweepTimer);
    ctx.revert();
  };
}

function heroEntrance(hero: HTMLElement, delay: number) {
  const q = (sel: string) =>
    Array.from(hero.querySelectorAll<HTMLElement>(sel));
  gsap.set(q(".container > *"), { autoAlpha: 1 });
  const tl = gsap.timeline({
    delay,
    defaults: { ease: "power3.out", duration: 0.8 },
  });
  const h1 = hero.querySelector("h1");
  if (h1) {
    const split = SplitText.create(h1, { type: "lines", mask: "lines" });
    tl.from(
      split.lines,
      {
        yPercent: 105,
        duration: 1,
        ease: "power4.out",
        stagger: 0.08,
        onComplete: () => split.revert(),
      },
      0,
    );
  }
  const rest = q(
    ".breadcrumb, .eyebrow, .container p:not(.eyebrow), .container .button, .container .text-link, .page-flower, .project-emblem, .photo-slot",
  ).filter(
    (el, _, arr) =>
      !el.closest("h1") && !arr.some((o) => o !== el && o.contains(el)),
  );
  if (rest.length)
    tl.from(
      rest,
      { y: 16, autoAlpha: 0, stagger: 0.05, clearProps: CLEAR },
      0.15,
    );
  return tl;
}

"use client";
/**
 * Site-wide motion layer (GSAP). Mounted once in the root layout, it:
 *  - plays the preloader exit and releases the first-load intro
 *  - animates every page on arrival: split-line headings, staggered grids,
 *    clip-path image reveals, counters, parallax and scroll-linked details
 *  - adds page-to-page curtain transitions, a scroll progress bar, an
 *    auto-hiding header, magnetic buttons and a contextual cursor
 * Everything is skipped when the visitor prefers reduced motion.
 */
import { useLayoutEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import {
  flushIntro,
  isIntroDone,
  onIntro,
  prefersReducedMotion,
} from "@/lib/motion-intro";

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

/** Containers whose children reveal as a stagger. */
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
  ".enquiry-steps",
  ".programme-jump-links",
  ".gallery-masonry",
  ".footer-top",
].join(",");
/** Groups that slide in from the side rather than rise. */
const LIST_GROUPS =
  ".check-list, .about-checks, .journey-list, .activity-list, .challenge-list, .impact-facts, .supplied-purposes ol, .enquiry-steps";
/** Individual blocks that fade up. */
const SINGLES = [
  "p:not(.eyebrow)",
  ".button",
  ".text-link",
  "blockquote",
  "figcaption",
  ".contact-channel",
  ".form-row",
  ".enquiry-form > label",
  ".gallery-tags",
  ".filter-bar",
  ".cta-actions",
  ".hero-actions",
  "details",
  "table",
  ".footer-bottom",
  ".cta-symbol",
].join(",");
/** Cursor labels for "open me" surfaces. */
const CURSOR_VIEW: Array<[string, string]> = [
  [".video-card", "Play"],
  [".journal-card, .real-story, .story-content", "Read"],
  [".arm-card, .project-card, .programme-tile, .linked-card", "Explore"],
  [".gallery-item, .publication-card, .flyer-card, .document-card", "View"],
];

/** Client-rendered areas whose DOM React may update. */
const CLIENT_ZONES =
  ".gallery-collections, .enquiry-form, .document-library, .support-selector, .site-header";

/** An image may scale only if its parent crops it. */
const canZoom = (img: Element) => {
  const parent = img.parentElement;
  return !!parent && getComputedStyle(parent).overflow !== "visible";
};

const norm = (p: string) => p.replace(/\/+$/, "") || "/";

export function Motion() {
  const pathname = usePathname();
  const router = useRouter();
  const state = useRef({
    first: true,
    preloader: false,
    curtainCovering: false,
    reduced: false,
  });

  // ---------------------------------------------------------------- global
  useLayoutEffect(() => {
    window.__ccdiMotion = true;
    const s = state.current;
    s.reduced = prefersReducedMotion();
    const html = document.documentElement;
    const pre = document.getElementById("preloader");

    if (s.reduced) {
      pre?.classList.add("is-done");
      flushIntro();
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
            try {
              sessionStorage.setItem("ccdi-preloaded", "1");
            } catch {}
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
      flushIntro();
    }

    // Scroll progress bar.
    const bar = document.querySelector(".scroll-progress");
    if (bar) {
      const t = gsap.fromTo(
        bar,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
        },
      );
      cleanups.push(() => t.scrollTrigger?.kill());
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
          duration: hide ? 0.35 : 0.55,
          ease: hide ? "power2.in" : EASE,
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

    const finePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;

    // Magnetic buttons.
    if (finePointer) {
      const MAG =
        ".button, .donate-button, .icon-button, .round-arrow, .belief-strip a";
      let current: HTMLElement | null = null;
      const release = (el: HTMLElement) =>
        gsap.to(el, {
          "--mx": "0px",
          "--my": "0px",
          duration: 0.8,
          ease: "elastic.out(1, 0.4)",
        });
      const onMove = (e: PointerEvent) => {
        const el = (e.target as Element)?.closest?.(MAG) as HTMLElement | null;
        if (current && current !== el) release(current);
        current = el;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const dx = ((e.clientX - (r.left + r.width / 2)) / r.width) * 14;
        const dy = ((e.clientY - (r.top + r.height / 2)) / r.height) * 10;
        gsap.to(el, {
          "--mx": `${dx}px`,
          "--my": `${dy}px`,
          duration: 0.4,
          ease: "power3.out",
        });
      };
      const onLeaveDoc = () => {
        if (current) release(current);
        current = null;
      };
      document.addEventListener("pointermove", onMove);
      document.documentElement.addEventListener("pointerleave", onLeaveDoc);
      cleanups.push(() => {
        document.removeEventListener("pointermove", onMove);
        document.documentElement.removeEventListener(
          "pointerleave",
          onLeaveDoc,
        );
      });
    }

    // Contextual cursor.
    const cursor = document.querySelector<HTMLElement>(".cursor");
    if (finePointer && cursor) {
      const label = cursor.querySelector<HTMLElement>(".cursor-label")!;
      gsap.set(cursor, { xPercent: -50, yPercent: -50 });
      const xTo = gsap.quickTo(cursor, "x", { duration: 0.45, ease: "power3" });
      const yTo = gsap.quickTo(cursor, "y", { duration: 0.45, ease: "power3" });
      let shown = false;
      const onMove = (e: PointerEvent) => {
        if (e.pointerType !== "mouse") return;
        if (!shown) {
          gsap.set(cursor, { x: e.clientX, y: e.clientY });
          shown = true;
        }
        xTo(e.clientX);
        yTo(e.clientY);
        const t = e.target as Element;
        cursor.classList.add("is-visible");
        const hideOver = t.closest?.(
          "input, textarea, select, iframe, video, .preloader, .gallery-dialog",
        );
        let view = "";
        for (const [sel, text] of CURSOR_VIEW) {
          if (t.closest?.(sel)) {
            view = text;
            break;
          }
        }
        const interactive =
          !view && t.closest?.("a, button, [role=button], label, summary");
        cursor.classList.toggle("is-hidden", !!hideOver);
        cursor.classList.toggle("is-view", !!view && !hideOver);
        cursor.classList.toggle("is-hover", !!interactive && !hideOver);
        if (view) label.textContent = view;
      };
      const onOut = (e: PointerEvent) => {
        if (!e.relatedTarget) cursor.classList.remove("is-visible");
      };
      const onDown = () => cursor.classList.add("is-down");
      const onUp = () => cursor.classList.remove("is-down");
      document.addEventListener("pointermove", onMove);
      document.addEventListener("pointerout", onOut);
      document.addEventListener("pointerdown", onDown);
      document.addEventListener("pointerup", onUp);
      cleanups.push(() => {
        document.removeEventListener("pointermove", onMove);
        document.removeEventListener("pointerout", onOut);
        document.removeEventListener("pointerdown", onDown);
        document.removeEventListener("pointerup", onUp);
      });
    }

    // Page-to-page curtain.
    const curtain = document.querySelector<HTMLElement>(".page-curtain");
    let curtainSafety = 0;
    if (curtain) gsap.set(curtain, { y: 0, yPercent: 101, autoAlpha: 1 });
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
    (state.current as unknown as { uncover: () => void }).uncover = uncover;
    window.addEventListener("click", onClick, true);
    cleanups.push(() => window.removeEventListener("click", onClick, true));

    return () => cleanups.forEach((f) => f());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // -------------------------------------------------------------- per page
  useLayoutEffect(() => {
    const s = state.current;
    if (s.reduced) return;
    const isFirst = s.first;
    s.first = false;
    const fromCurtain = s.curtainCovering;
    const header = document.querySelector<HTMLElement>(".site-header");
    if (header && !isFirst) gsap.set(header, { yPercent: 0 });

    // On a plain first load (no preloader), content already on screen is
    // left alone so nothing flashes; everything below the fold still animates.
    const animateInView = !isFirst || s.preloader;
    const { teardown } = setupPage({ isFirst, fromCurtain, animateInView });
    if (fromCurtain) {
      window.scrollTo(0, 0);
      (s as unknown as { uncover?: () => void }).uncover?.();
    }
    requestAnimationFrame(() => ScrollTrigger.refresh());
    return teardown;
  }, [pathname]);

  return null;
}

// ---------------------------------------------------------------- page setup
function setupPage({
  isFirst,
  fromCurtain,
  animateInView,
}: {
  isFirst: boolean;
  fromCurtain: boolean;
  animateInView: boolean;
}) {
  const ctx = gsap.context(() => {});
  const roots = [
    document.querySelector("main"),
    document.querySelector(".site-footer"),
  ].filter(Boolean) as HTMLElement[];
  const all = <T extends Element = HTMLElement>(sel: string) =>
    roots.flatMap((r) =>
      Array.from(r.querySelectorAll<T & Element>(sel)),
    ) as T[];
  const claimed = new Set<Element>();
  const isClaimed = (el: Element) => {
    for (let p: Element | null = el; p; p = p.parentElement)
      if (claimed.has(p)) return true;
    return false;
  };
  const skip = (el: Element) =>
    !!el.closest(".home-hero, [role=dialog], .sr-only, .preloader, [hidden]");
  const vh = window.innerHeight;
  const onScreen = (el: Element) => el.getBoundingClientRect().top < vh * 0.98;

  // Reveal on enter, staggering whatever arrives in the same frame.
  const pending = new Map<Element, (delay: number) => void>();
  const io = new IntersectionObserver(
    (entries) => {
      const hits = entries
        .filter((e) => e.isIntersecting && pending.has(e.target))
        .map((e) => e.target)
        .sort((a, b) =>
          a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING
            ? -1
            : 1,
        );
      hits.forEach((t, i) => {
        const play = pending.get(t)!;
        pending.delete(t);
        io.unobserve(t);
        ctx.add(() =>
          play(Math.min(i * 0.08, 0.48) + (fromCurtain ? 0.35 : 0)),
        );
      });
    },
    { rootMargin: "0px 0px -6% 0px" },
  );
  const reveal = (
    el: Element,
    prep: () => void,
    play: (delay: number) => void,
  ) => {
    if (!animateInView && onScreen(el)) return;
    ctx.add(prep);
    pending.set(el, play);
    io.observe(el);
  };
  // Safety net: anything still waiting once it is on screen gets revealed.
  const sweep = () => {
    pending.forEach((play, el) => {
      const r = el.getBoundingClientRect();
      if (r.top < vh && r.bottom > 0) {
        pending.delete(el);
        io.unobserve(el);
        ctx.add(() => play(0));
      }
    });
  };
  let sweepTimer = 0;
  const onScroll = () => {
    clearTimeout(sweepTimer);
    sweepTimer = window.setTimeout(sweep, 160);
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
    if (isFirst) onIntro(run);
    else run();
  }

  // 2. Staggered groups.
  all(GROUPS).forEach((group) => {
    if (skip(group) || isClaimed(group)) return;
    const items = Array.from(group.children).filter(
      (c) => !(c instanceof HTMLTemplateElement),
    ) as HTMLElement[];
    if (!items.length) return;
    claimed.add(group);
    const isList = group.matches(LIST_GROUPS);
    const from = isList
      ? { autoAlpha: 0, x: -32, transition: "none" }
      : {
          autoAlpha: 0,
          y: 64,
          scale: 0.96,
          transformOrigin: "50% 100%",
          transition: "none",
        };
    const images = (els: Element[]) =>
      els
        .map((i) => i.querySelector(".slot-image, .gallery-thumb, img"))
        .filter((img): img is HTMLElement => !!img && canZoom(img));
    const show = (els: HTMLElement[], delay: number) => {
      gsap.to(els, {
        autoAlpha: 1,
        x: 0,
        y: 0,
        scale: 1,
        duration: isList ? 0.9 : 1.2,
        ease: EASE,
        stagger: isList ? 0.07 : 0.1,
        delay,
        clearProps: CLEAR,
      });
      const imgs = images(els);
      if (imgs.length)
        gsap.to(imgs, {
          scale: 1,
          duration: 1.8,
          ease: EASE,
          stagger: 0.1,
          delay,
          clearProps: "transform,transition",
        });
    };
    const prep = (els: HTMLElement[]) => () => {
      gsap.set(els, from);
      const imgs = images(els);
      if (!isList && imgs.length)
        gsap.set(imgs, { scale: 1.25, transition: "none" });
    };
    // Long grids (e.g. the gallery) reveal item by item as they scroll in.
    if (items.length > 10)
      items.forEach((it) => reveal(it, prep([it]), (d) => show([it], d)));
    else reveal(group, prep(items), (d) => show(items, d));
  });

  // 3. Headings: masked line-by-line rise.
  all("h1, h2").forEach((h) => {
    if (skip(h) || isClaimed(h) || !h.textContent?.trim()) return;
    claimed.add(h);
    reveal(
      h,
      () => gsap.set(h, { autoAlpha: 0 }),
      (delay) => {
        // Interactive React regions get a plain rise (no DOM splitting).
        if (h.closest(CLIENT_ZONES)) {
          gsap.fromTo(
            h,
            { autoAlpha: 0, y: 30 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 1,
              ease: EASE,
              delay,
              clearProps: CLEAR,
            },
          );
          return;
        }
        const split = SplitText.create(h, { type: "lines", mask: "lines" });
        gsap.set(h, { autoAlpha: 1 });
        gsap.from(split.lines, {
          yPercent: 115,
          duration: 1.25,
          ease: EASE,
          stagger: 0.1,
          delay,
          onComplete: () => split.revert(),
        });
      },
    );
  });

  // 4. Eyebrows: label slides in, dot pops.
  all(".eyebrow").forEach((el) => {
    if (skip(el) || isClaimed(el)) return;
    claimed.add(el);
    const dot = el.querySelector("span");
    reveal(
      el,
      () => {
        gsap.set(el, { autoAlpha: 0, x: -18 });
        if (dot) gsap.set(dot, { scale: 0 });
      },
      (delay) => {
        gsap.to(el, {
          autoAlpha: 1,
          x: 0,
          duration: 0.9,
          ease: EASE,
          delay,
          clearProps: CLEAR,
        });
        if (dot)
          gsap.to(dot, {
            scale: 1,
            duration: 0.7,
            ease: "back.out(4)",
            delay: delay + 0.15,
            clearProps: "transform",
          });
      },
    );
  });

  // 5. Images: clip-path unmask with a slow zoom-out; large ones get parallax.
  all(".photo-slot.has-photo, figure > img").forEach((el) => {
    if (skip(el) || isClaimed(el)) return;
    claimed.add(el);
    const found = (
      el.matches("img") ? el : el.querySelector("img")
    ) as HTMLElement | null;
    // Only zoom images that sit inside a cropping frame.
    const img = found && canZoom(found) ? found : null;
    const big =
      !!img && !el.matches("img") && el.getBoundingClientRect().height > 340;
    reveal(
      el,
      () => {
        gsap.set(el, { clipPath: "inset(14% 10% 14% 10%)" });
        if (img) gsap.set(img, { scale: 1.35, transition: "none" });
      },
      (delay) => {
        gsap.to(el, {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.5,
          ease: "expo.inOut",
          delay,
          clearProps: "clipPath",
        });
        if (img)
          gsap.to(img, {
            scale: big ? 1.14 : 1,
            duration: 2,
            ease: EASE,
            delay,
            clearProps: big ? "transition" : "transform,transition",
          });
      },
    );
    if (big && img)
      ctx.add(() =>
        gsap.fromTo(
          img,
          { yPercent: -6 },
          {
            yPercent: 6,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        ),
      );
  });

  // 6. Text and small blocks fade up.
  all(SINGLES).forEach((el) => {
    if (skip(el) || isClaimed(el) || el.closest(".photo-slot")) return;
    claimed.add(el);
    const isSymbol = el.matches(".cta-symbol");
    reveal(
      el,
      () =>
        gsap.set(
          el,
          isSymbol
            ? { autoAlpha: 0, scale: 0.3, rotation: -60 }
            : { autoAlpha: 0, y: 30, transition: "none" },
        ),
      (delay) =>
        gsap.to(el, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          rotation: 0,
          duration: isSymbol ? 1.6 : 1,
          ease: isSymbol ? "elastic.out(1, 0.5)" : EASE,
          delay,
          clearProps: CLEAR,
        }),
    );
  });

  // 7. Counters.
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
          duration: 2.2,
          ease: "power3.out",
          delay: delay + 0.2,
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

  // 8. Scroll-linked details: stars turn as you scroll past.
  all(".belief-star, .community-star, .page-flower, .project-emblem").forEach(
    (el) => {
      ctx.add(() =>
        gsap.to(el, {
          rotation: 180,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        }),
      );
    },
  );

  // 9. Gentle drift on the dark impact panel's heading block.
  const impact = document.querySelector(".impact-intro");
  if (impact)
    ctx.add(() =>
      gsap.fromTo(
        impact,
        { y: 40 },
        {
          y: -40,
          ease: "none",
          scrollTrigger: {
            trigger: impact.closest("section") ?? impact,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      ),
    );

  return {
    teardown: () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      clearTimeout(sweepTimer);
      ctx.revert();
    },
  };
}

function heroEntrance(hero: HTMLElement, delay: number) {
  const q = <T extends Element = HTMLElement>(sel: string) =>
    Array.from(hero.querySelectorAll<T & Element>(sel)) as T[];
  gsap.set(q(".container > *"), { autoAlpha: 1 });
  const tl = gsap.timeline({ delay, defaults: { ease: EASE, duration: 1.1 } });
  const crumbs = hero.querySelector(".breadcrumb");
  const eyebrow = hero.querySelector(".eyebrow");
  const h1 = hero.querySelector("h1");
  if (crumbs)
    tl.from(
      crumbs,
      { y: -14, autoAlpha: 0, duration: 0.8, clearProps: CLEAR },
      0,
    );
  if (eyebrow)
    tl.from(eyebrow, { x: -20, autoAlpha: 0, clearProps: CLEAR }, 0.1);
  if (h1) {
    const split = SplitText.create(h1, { type: "lines", mask: "lines" });
    tl.from(
      split.lines,
      {
        yPercent: 115,
        duration: 1.3,
        stagger: 0.1,
        onComplete: () => split.revert(),
      },
      0.15,
    );
  }
  const rest = q(
    ".container p:not(.eyebrow), .container .button, .container .text-link, .container .project-hero-layout > div:not(:first-child) > *",
  ).filter((el) => !el.closest(".breadcrumb") && !el.closest(".eyebrow"));
  if (rest.length)
    tl.from(
      rest,
      { y: 26, autoAlpha: 0, stagger: 0.08, clearProps: CLEAR },
      0.4,
    );
  const decor = q(".page-flower, .project-emblem");
  if (decor.length)
    tl.from(
      decor,
      {
        scale: 0.2,
        autoAlpha: 0,
        duration: 1.6,
        ease: "elastic.out(1, 0.55)",
        clearProps: "opacity,visibility",
      },
      0.3,
    );
  const photos = q(".photo-slot.has-photo");
  photos.forEach((p) => {
    tl.fromTo(
      p,
      { clipPath: "inset(100% 0% 0% 0%)" },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1.4,
        ease: "expo.inOut",
        clearProps: "clipPath",
      },
      0.25,
    );
  });
  return tl;
}

export { isIntroDone };

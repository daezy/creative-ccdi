"use client";

import { useEffect } from "react";

/** Enhance native disclosures without removing their server-rendered content. */
export function DisclosureMotion() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const active = new Map<
      HTMLDetailsElement,
      {
        animation: Animation;
        open: boolean;
        overflow: string;
      }
    >();

    function finishAll() {
      active.forEach((state, details) => {
        state.animation.cancel();
        details.open = state.open;
        details.style.overflow = state.overflow;
      });
      active.clear();
    }

    function onClick(event: MouseEvent) {
      if (
        reduced.matches ||
        event.button !== 0 ||
        !(event.target instanceof Element)
      )
        return;
      const summary = event.target.closest("summary");
      const details = summary?.parentElement;
      if (
        !(details instanceof HTMLDetailsElement) ||
        !details.closest("#page-details")
      )
        return;
      if (event.target.closest("a, button, input, select, textarea")) return;
      if (typeof details.animate !== "function") return;
      event.preventDefault();

      const previous = active.get(details);
      const open = !(previous?.open ?? details.open);
      const from = details.getBoundingClientRect().height;
      const overflow = previous?.overflow ?? details.style.overflow;
      previous?.animation.cancel();
      details.open = true;
      const style = getComputedStyle(details);
      const edge = (property: string) =>
        parseFloat(style.getPropertyValue(property)) || 0;
      const to = open
        ? details.getBoundingClientRect().height
        : summary!.getBoundingClientRect().height +
          edge("padding-top") +
          edge("padding-bottom") +
          edge("border-top-width") +
          edge("border-bottom-width");
      details.style.overflow = "hidden";
      const animation = details.animate(
        [{ height: `${from}px` }, { height: `${to}px` }],
        {
          duration: 200,
          easing: style.getPropertyValue("--ease-out").trim() || "ease-out",
        },
      );
      active.set(details, { animation, open, overflow });
      animation.onfinish = () => {
        if (active.get(details)?.animation !== animation) return;
        details.open = open;
        details.style.overflow = overflow;
        active.delete(details);
      };
    }

    document.addEventListener("click", onClick);
    reduced.addEventListener("change", finishAll);
    return () => {
      document.removeEventListener("click", onClick);
      reduced.removeEventListener("change", finishAll);
      finishAll();
    };
  }, []);
  return null;
}

"use client";
import { useEffect } from "react";

/**
 * Registers /sw.js, which keeps images, videos, fonts and build files on the
 * visitor's device after their first download. Production only, and after
 * the page has loaded so it never competes with the first paint.
 */
export function ServiceWorker() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (!("serviceWorker" in navigator)) return;
    const register = () =>
      navigator.serviceWorker
        .register("/sw.js", { scope: "/" })
        .catch(() => {});
    if (document.readyState === "complete") register();
    else window.addEventListener("load", register, { once: true });
  }, []);
  return null;
}

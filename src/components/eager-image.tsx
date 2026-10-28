"use client";
import type { ImgHTMLAttributes } from "react";

/**
 * An above-the-fold image rendered from a client component. Server-rendered
 * eager images get a "preload" hint inside every page's prefetch data, so
 * each page would start downloading other pages' banner photos. Rendering
 * them here keeps the preload on their own page only.
 */
export function EagerImage(props: ImgHTMLAttributes<HTMLImageElement>) {
  // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
  return <img {...props} />;
}

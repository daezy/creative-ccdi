import type { Article } from "@/lib/blog";
import { EagerImage } from "./eager-image";
import { PhotoSlot } from "./ui";

const WIDTHS = [640, 1024, 1600];

/**
 * Article cover. Sanity's image CDN resizes on request, so the browser gets a
 * size that fits the layout. `priority` is for the article page itself, where
 * the cover is the first thing on screen.
 */
export function ArticleImage({
  article,
  priority = false,
  sizes = "(max-width: 760px) 100vw, 50vw",
}: {
  article: Article;
  priority?: boolean;
  sizes?: string;
}) {
  if (!article.coverImage?.url)
    return <PhotoSlot label={article.title} priority={priority} />;
  const base = article.coverImage.url;
  const at = (w: number) => `${base}?auto=format&w=${w}&fit=max`;
  const Img = priority ? EagerImage : "img";
  return (
    <div className="photo-slot">
      <Img
        src={at(1600)}
        srcSet={WIDTHS.map((w) => `${at(w)} ${w}w`).join(", ")}
        sizes={sizes}
        alt={article.coverImage.alt || article.title}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </div>
  );
}

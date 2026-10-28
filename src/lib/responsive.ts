/**
 * Smaller copies of large library photos for grids and tiles.
 * scripts/make_thumbnails.py writes /images/library/640/<name>.webp for every
 * library image 800px or wider; the browser picks the copy that fits.
 */
const LIBRARY = "/images/library/";
const SMALL = 640;
const MIN_WIDTH = 800;

export const SIZES = {
  half: "(max-width: 760px) 100vw, 50vw",
  third: "(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 33vw",
  quarter: "(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 25vw",
};

export function responsive(
  src?: string,
  width?: number,
  sizes: string = SIZES.half,
): { srcSet?: string; sizes?: string } {
  if (!src || !width || width < MIN_WIDTH || !src.startsWith(LIBRARY))
    return {};
  const name = src.slice(LIBRARY.length);
  if (name.includes("/")) return {};
  return { srcSet: `${LIBRARY}640/${name} ${SMALL}w, ${src} ${width}w`, sizes };
}

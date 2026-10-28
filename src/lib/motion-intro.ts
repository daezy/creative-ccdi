/**
 * Coordinates the first-load "intro" moment. Components register entrance
 * animations with onIntro(); they all start together when the preloader
 * lifts (or immediately when there is no preloader).
 *
 * Callbacks receive `animate`: false on a load without the preloader, so
 * content that is already on screen shows immediately instead of waiting for
 * an entrance (better first paint). Later client-side visits always animate.
 */
type IntroCallback = (animate: boolean) => void;
let done = false;
const queue: IntroCallback[] = [];

export function onIntro(cb: IntroCallback) {
  if (done) {
    cb(true);
    return () => {};
  }
  queue.push(cb);
  return () => {
    const i = queue.indexOf(cb);
    if (i >= 0) queue.splice(i, 1);
  };
}

export function flushIntro(animate = true) {
  if (done) return;
  done = true;
  queue.splice(0).forEach((cb) => cb(animate));
  document.documentElement.classList.add("intro-done");
}

export function isIntroDone() {
  return done;
}

export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

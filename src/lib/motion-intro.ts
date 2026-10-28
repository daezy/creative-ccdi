/**
 * Coordinates the first-load "intro" moment. Components register entrance
 * animations with onIntro(); they all start together when the preloader
 * lifts (or immediately when there is no preloader).
 */
let done = false;
const queue: Array<() => void> = [];

export function onIntro(cb: () => void) {
  if (done) {
    cb();
    return () => {};
  }
  queue.push(cb);
  return () => {
    const i = queue.indexOf(cb);
    if (i >= 0) queue.splice(i, 1);
  };
}

export function flushIntro() {
  if (done) return;
  done = true;
  queue.splice(0).forEach((cb) => cb());
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

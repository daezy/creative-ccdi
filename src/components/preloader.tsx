/** The approved transparent CCDI logo, shared by loading and page transitions. */
export function Emblem({
  className = "",
  id = "em",
}: {
  className?: string;
  id?: string;
}) {
  return (
    <img
      id={id}
      className={`emblem ${className}`}
      src="/images/ccdi-logo-432.png"
      width={432}
      height={390}
      alt=""
      aria-hidden="true"
    />
  );
}

const LETTERS = [
  { ch: "C", color: "#0b7d37" },
  { ch: "C", color: "#f28c00" },
  { ch: "D", color: "#e10600" },
  { ch: "I", color: "#f5c400" },
];

export function Preloader() {
  return (
    <div id="preloader" className="preloader" aria-hidden="true">
      <div className="preloader-inner">
        <Emblem className="preloader-emblem" id="pl" />
        <div className="preloader-word">
          {LETTERS.map((l, i) => (
            <span
              key={i}
              style={{ color: l.color, "--i": i } as React.CSSProperties}
            >
              {l.ch}
            </span>
          ))}
        </div>
        <p className="preloader-tag">
          Self Discovery · Capacity Building · Skills for Life
        </p>
        <div className="preloader-bar">
          <span />
        </div>
      </div>
    </div>
  );
}

/** Overlay used for animated page-to-page transitions. */
export function PageCurtain() {
  return (
    <div className="page-curtain" aria-hidden="true">
      <div className="page-curtain-inner">
        <Emblem className="page-curtain-emblem" id="pc" />
        <span className="page-curtain-label" />
      </div>
    </div>
  );
}

/**
 * Runs before first paint. Marks the document for motion (enables the
 * preloader and hero pre-hide styles; it plays on every fresh open of the
 * site) and fails safe if the motion script never starts.
 */
export const motionBootScript = `(function(){var d=document.documentElement;try{if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){d.classList.add('reduce-motion');return;}d.classList.add('motion-ready');}catch(e){}setTimeout(function(){if(!window.__ccdiMotion){d.classList.remove('motion-ready');d.classList.add('preloader-skip','intro-done');}},6000);})();`;

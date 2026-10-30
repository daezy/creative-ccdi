/**
 * The CCDI emblem redrawn as vector shapes — the hexagonal "room" with the
 * cube at its centre — so it can be animated piece by piece. Server-rendered
 * so the preloader appears on first paint, before any JavaScript runs.
 */
const OUTER = "20,54 100,8 180,54 180,146 100,192 20,146";
const PANELS = [
  { points: "20,54 100,8 100,50 56,75", fill: "#e30613", dx: -10, dy: -12 },
  { points: "100,8 180,54 144,75 100,50", fill: "#0b8a3c", dx: 10, dy: -12 },
  { points: "180,54 180,146 144,125 144,75", fill: "#f47b00", dx: 16, dy: 0 },
  {
    points: "180,146 100,192 100,150 144,125",
    fill: "#ffe100",
    dx: 10,
    dy: 12,
  },
  { points: "100,192 20,146 56,125 100,150", fill: "#0b8a3c", dx: -10, dy: 12 },
  { points: "20,146 20,54 56,75 56,125", fill: "#ffe100", dx: -16, dy: 0 },
];

export function Emblem({
  className = "",
  id = "em",
}: {
  className?: string;
  id?: string;
}) {
  return (
    <svg
      className={`emblem ${className}`}
      viewBox="0 0 200 200"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={`${id}-left`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ff9a1a" />
          <stop offset="1" stopColor="#ff5f00" />
        </linearGradient>
        <linearGradient id={`${id}-right`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f0175a" />
          <stop offset="1" stopColor="#e00000" />
        </linearGradient>
        <linearGradient id={`${id}-top`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff36b" />
          <stop offset="1" stopColor="#ffe100" />
        </linearGradient>
      </defs>
      <g className="em-panels">
        {PANELS.map((p, i) => (
          <polygon
            key={p.points}
            className="em-panel"
            points={p.points}
            fill={p.fill}
            style={
              {
                "--i": i,
                "--dx": `${p.dx}px`,
                "--dy": `${p.dy}px`,
              } as React.CSSProperties
            }
          />
        ))}
      </g>
      <g className="em-cube">
        <polygon
          className="em-face em-left"
          points="56,75 100,100 100,150 56,125"
          fill={`url(#${id}-left)`}
        />
        <polygon
          className="em-face em-right"
          points="100,100 144,75 144,125 100,150"
          fill={`url(#${id}-right)`}
        />
        <polygon
          className="em-face em-top"
          points="100,50 144,75 100,100 56,75"
          fill={`url(#${id}-top)`}
        />
      </g>
      <polygon className="em-outline" points={OUTER} pathLength={540} />
    </svg>
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

"use client";
import library from "@/lib/media-library.json";
import { useEffect, useState, type FormEvent } from "react";
import { Dialog } from "@base-ui/react/dialog";
import {
  Check,
  Copy,
  ArrowUpRight,
  X,
  Camera,
  ArrowRight,
  Heart,
} from "lucide-react";
import { training, facebook } from "@/lib/content";
import { PhotoSlot, Icon, Button } from "./ui";
export function TrainingGrid() {
  const [filter, setFilter] = useState("All skills");
  const filters = [
    "All skills",
    "Creative skills",
    "Digital skills",
    "Enterprise skills",
    "Food & hospitality",
  ];
  return (
    <>
      <div className="filter-bar" aria-label="Filter training areas">
        {filters.map((f) => (
          <button
            key={f}
            className={filter === f ? "active" : ""}
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
          >
            {f}
          </button>
        ))}
      </div>
      <div className="training-grid" aria-live="polite">
        {training
          .filter((t) => filter === "All skills" || t.category === filter)
          .map((t, i) => (
            <article className="training-card" key={t.title}>
              <PhotoSlot
                label={t.title}
                number={`0${i + 1}`}
                variant={["sage", "gold", "clay", "cream"][i % 4]}
              />
              <div className="training-card-body">
                <span className="card-category">{t.category}</span>
                <h3>{t.title}</h3>
                <p>{t.description}</p>
                <a
                  href={`/contact/?interest=${encodeURIComponent(t.title)}`}
                  className="text-link"
                >
                  Enquire about training
                  <ArrowUpRight size={17} aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
      </div>
    </>
  );
}
const galleryItems = Object.entries(library)
  .filter(
    ([, p]) =>
      !["Programme flyers", "Publications", "Team"].includes(p.category),
  )
  .map(([id, p]) => ({ ...p, id }));
export function Gallery() {
  const [filter, setFilter] = useState("All moments");
  const [limit, setLimit] = useState(18);
  const filtered = galleryItems.filter(
    (g) => filter === "All moments" || g.category === filter,
  );
  return (
    <>
      <div className="gallery-notice">
        <Camera size={18} aria-hidden="true" />
        <p>
          CCDI’s own photographs of practical learning, enterprise, welfare
          outreach, and community life. Select a photograph to see it in full.
        </p>
      </div>
      <div className="filter-bar" aria-label="Filter gallery">
        {["All moments", ...new Set(galleryItems.map((g) => g.category))].map(
          (f) => (
            <button
              key={f}
              onClick={() => {
                setFilter(f);
                setLimit(18);
              }}
              aria-pressed={filter === f}
              className={filter === f ? "active" : ""}
            >
              {f}
            </button>
          ),
        )}
      </div>
      <p className="media-result-count" aria-live="polite">
        Showing {Math.min(limit, filtered.length)} of {filtered.length}{" "}
        photographs
      </p>
      <div className="gallery-grid">
        {filtered.slice(0, limit).map((g) => (
          <Dialog.Root key={g.id}>
            <Dialog.Trigger className="gallery-item">
              <img
                className="gallery-thumb"
                src={g.src}
                alt={g.alt}
                width={g.width}
                height={g.height}
                loading="lazy"
              />
              <span className="gallery-item-caption">
                <span>
                  {g.alt}
                  <small>{g.category}</small>
                </span>
                <ArrowUpRight size={20} aria-hidden="true" />
              </span>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Backdrop className="dialog-backdrop" />
              <Dialog.Popup className="gallery-dialog">
                <Dialog.Close
                  className="icon-button gallery-close"
                  aria-label="Close image preview"
                >
                  <X />
                </Dialog.Close>
                <img
                  className="gallery-full-image"
                  src={g.src}
                  alt={g.alt}
                  width={g.width}
                  height={g.height}
                />
                <Dialog.Title>{g.alt}</Dialog.Title>
                <Dialog.Description>
                  {g.category} · From the CCDI photo archive.
                </Dialog.Description>
              </Dialog.Popup>
            </Dialog.Portal>
          </Dialog.Root>
        ))}
      </div>
      {limit < filtered.length && (
        <div className="gallery-load-more">
          <button
            className="button button-outline"
            onClick={() => setLimit((n) => n + 18)}
          >
            Show more photographs <ArrowRight size={18} />
          </button>
        </div>
      )}
    </>
  );
}
export function EnquiryForm() {
  const [interest, setInterest] = useState("General enquiry");
  const [copied, setCopied] = useState(false);
  const [draft, setDraft] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    const value = new URLSearchParams(window.location.search).get("interest");
    if (value) setInterest(value);
  }, []);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const data = new FormData(e.currentTarget);
    const message = `Hello CCDI,\n\nMy name is ${data.get("name")}. I’m interested in ${data.get("interest")}.\n\n${data.get("message")}\n\nYou can reach me at: ${data.get("email")}${data.get("phone") ? `\nPhone: ${data.get("phone")}` : ""}`;
    setDraft(message);
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
    } catch {
      setError(
        "Your message is ready below. Select and copy it, then send it to CCDI on Facebook.",
      );
    }
  }
  return (
    <form className="enquiry-form" onSubmit={submit}>
      <div className="form-heading">
        <h2>What would you like to explore?</h2>
        <p>
          Prepare your message here, then send it to CCDI through Facebook.
          Nothing is submitted from this form.
        </p>
      </div>
      <div className="form-row">
        <label>
          Full name <span>*</span>
          <input
            name="name"
            autoComplete="name"
            required
            placeholder="Your full name…"
          />
        </label>
        <label>
          Email address <span>*</span>
          <input
            type="email"
            name="email"
            autoComplete="email"
            spellCheck={false}
            required
            placeholder="you@example.com…"
          />
        </label>
      </div>
      <div className="form-row">
        <label>
          Phone <small>(optional)</small>
          <input
            type="tel"
            name="phone"
            autoComplete="tel"
            placeholder="+234…"
          />
        </label>
        <label>
          I’m interested in
          <input
            name="interest"
            value={interest}
            onChange={(e) => {
              setInterest(e.target.value);
              setCopied(false);
            }}
            list="interests"
          />
          <datalist id="interests">
            {[
              "General enquiry",
              "Skills training",
              "Volunteering",
              "Partnership",
              "Donating",
              "Enterprise services",
            ].map((i) => (
              <option key={i} value={i} />
            ))}
          </datalist>
        </label>
      </div>
      <label>
        Your message <span>*</span>
        <textarea
          name="message"
          required
          rows={5}
          placeholder="Tell us a little about what you have in mind…"
        />
      </label>
      <p className="form-privacy">
        Only share information needed for your enquiry. Please do not include
        sensitive information about children or other people.{" "}
        <a href="/privacy-policy/">Privacy information</a>
      </p>
      <button className="button button-green" type="submit">
        {copied ? (
          <>
            <Check size={17} />
            Message copied
          </>
        ) : (
          <>
            <Copy size={17} />
            Prepare & copy enquiry
          </>
        )}
      </button>
      <div role="status" className="form-status">
        {copied && (
          <p>
            Your message is copied. Open CCDI’s Facebook page and paste it into
            a message.
          </p>
        )}
        {error && <p>{error}</p>}
      </div>
      {draft && (
        <div className="prepared-message">
          <label>
            Your prepared enquiry
            <textarea
              readOnly
              value={draft}
              rows={8}
              onFocus={(e) => e.target.select()}
            />
          </label>
          <a
            href={facebook}
            target="_blank"
            rel="noreferrer"
            className="button button-outline"
          >
            Continue on Facebook <ArrowUpRight size={17} />
          </a>
        </div>
      )}
    </form>
  );
}
export function SupportSelector() {
  const [choice, setChoice] = useState("Skills & learning");
  return (
    <div className="support-selector">
      <h2>What would you like to support?</h2>
      <p>
        Choose an area, then speak with CCDI about the most useful way to
        contribute.
      </p>
      <div
        className="support-options"
        role="group"
        aria-label="Area to support"
      >
        {[
          "Skills & learning",
          "Child welfare",
          "Family & community",
          "Where it’s needed most",
        ].map((s, i) => (
          <button
            key={s}
            onClick={() => setChoice(s)}
            aria-pressed={choice === s}
            className={choice === s ? "selected" : ""}
          >
            <Icon name={["skills", "care", "community", "enterprise"][i]} />
            <span>{s}</span>
            <span className="choice-indicator">
              {choice === s && <Check size={14} />}
            </span>
          </button>
        ))}
      </div>
      <Button
        href={`/contact/?interest=${encodeURIComponent(`Donating: ${choice}`)}`}
      >
        Discuss your support
      </Button>
      <p className="support-note">
        <Heart size={14} aria-hidden="true" />
        No payment is taken on this website.
      </p>
    </div>
  );
}

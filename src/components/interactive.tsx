"use client";
import { responsive, SIZES } from "@/lib/responsive";
import library from "@/lib/media-library.json";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { Dialog } from "@base-ui/react/dialog";
import {
  Check,
  ArrowUpRight,
  X,
  Camera,
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  Heart,
} from "lucide-react";
import { contactFormEndpoint } from "@/lib/contact-form";
import { training, facebook, contact } from "@/lib/content";
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
const galleryItems = Object.entries(library).map(([id, p]) => ({ ...p, id }));
const galleryCategories = [
  "Skills training",
  "Enterprise",
  "Welfare outreach",
  "Family & community",
  "CCDI community",
  "Team",
  "Testimonials",
  "Publications",
  "Programme flyers",
  "Brand & references",
];
const collectionSlug = (category: string) =>
  category.toLowerCase().replace(/[^a-z0-9]+/g, "-");
export function Gallery() {
  const [filter, setFilter] = useState("All collections");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [originId, setOriginId] = useState<string | null>(null);
  useEffect(() => {
    const sync = () => {
      const slug = new URLSearchParams(window.location.search).get(
        "collection",
      );
      setFilter(
        galleryCategories.find((c) => collectionSlug(c) === slug) ||
          "All collections",
      );
    };
    sync();
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);
  function chooseCollection(category: string) {
    setFilter(category);
    const url = new URL(window.location.href);
    if (category === "All collections") url.searchParams.delete("collection");
    else url.searchParams.set("collection", collectionSlug(category));
    window.history.pushState(null, "", url.pathname + url.search + url.hash);
  }
  const groups = galleryCategories
    .filter((category) => filter === "All collections" || filter === category)
    .map((category) => ({
      category,
      items: galleryItems.filter((g) => g.category === category),
    }));
  const visibleItems = groups.flatMap((g) => g.items);
  const selectedIndex = Math.max(
    0,
    visibleItems.findIndex((g) => g.id === selectedId),
  );
  const selected = visibleItems[selectedIndex];
  function move(delta: number) {
    setSelectedId(
      visibleItems[
        (selectedIndex + delta + visibleItems.length) % visibleItems.length
      ].id,
    );
  }
  return (
    <Dialog.Root
      open={previewOpen}
      onOpenChange={setPreviewOpen}
      triggerId={originId}
    >
      <div className="gallery-collections" id="gallery-collections">
        <nav className="gallery-tags" aria-label="Filter gallery collections">
          {["All collections", ...galleryCategories].map((category) => (
            <button
              key={category}
              onClick={() => chooseCollection(category)}
              aria-pressed={filter === category}
              className={filter === category ? "active" : ""}
            >
              {category}
            </button>
          ))}
        </nav>
        <p className="gallery-collection-total" aria-live="polite">
          {visibleItems.length} images · {groups.length}{" "}
          {groups.length === 1 ? "collection" : "collections"}
        </p>
        {groups.map((group) => (
          <section
            className="gallery-collection"
            key={group.category}
            aria-label={`${group.category} collection`}
          >
            <header className="gallery-collection-heading">
              <h2>{group.category}</h2>
              <span>{String(group.items.length).padStart(2, "0")} images</span>
            </header>
            <div className="gallery-masonry">
              {group.items.map((g) => (
                <Dialog.Trigger
                  key={g.id}
                  id={`gallery-photo-${g.id}`}
                  className="gallery-item"
                  aria-label={`View ${g.alt}`}
                  onClick={() => {
                    setSelectedId(g.id);
                    setOriginId(`gallery-photo-${g.id}`);
                  }}
                >
                  <img
                    className="gallery-thumb"
                    src={g.src}
                    alt={g.alt}
                    width={g.width}
                    height={g.height}
                    loading="lazy"
                    decoding="async"
                    {...responsive(g.src, g.width, SIZES.third)}
                  />
                  <span className="gallery-expand" aria-hidden="true">
                    <ArrowUpRight size={20} />
                  </span>
                </Dialog.Trigger>
              ))}
            </div>
          </section>
        ))}
        <a className="text-link gallery-return" href="#gallery-collections">
          Back to collections{" "}
          <ArrowUp className="inline-icon" aria-hidden="true" />
        </a>
      </div>
      <Dialog.Portal>
        <Dialog.Backdrop className="dialog-backdrop" />
        <Dialog.Popup
          className="gallery-dialog gallery-viewer"
          onKeyDown={(event) => {
            if (event.key === "ArrowRight") {
              event.preventDefault();
              move(1);
            }
            if (event.key === "ArrowLeft") {
              event.preventDefault();
              move(-1);
            }
          }}
        >
          <Dialog.Close
            className="icon-button gallery-close"
            aria-label="Close image preview"
          >
            <X />
          </Dialog.Close>
          <div className="gallery-viewer-image">
            <img
              className="gallery-full-image"
              src={selected.src}
              alt={selected.alt}
              width={selected.width}
              height={selected.height}
            />
          </div>
          <div className="gallery-viewer-caption">
            <Dialog.Title>{selected.alt}</Dialog.Title>
            <Dialog.Description>{selected.category}</Dialog.Description>
          </div>
          <div className="gallery-viewer-controls">
            <button
              className="icon-button"
              aria-label="Previous image"
              onClick={() => move(-1)}
            >
              <ArrowLeft size={20} />
            </button>
            <span aria-live="polite" aria-atomic="true">
              {selectedIndex + 1} of {visibleItems.length}
            </span>
            <button
              className="icon-button"
              aria-label="Next image"
              onClick={() => move(1)}
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
export function EnquiryForm() {
  const [interest, setInterest] = useState("General enquiry");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [error, setError] = useState("");
  const inFlight = useRef(false);
  useEffect(() => {
    const value = new URLSearchParams(window.location.search).get("interest");
    if (value) setInterest(value.slice(0, 160));
  }, []);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (inFlight.current) return;
    const form = e.currentTarget;
    const data = new FormData(form);
    for (const field of ["name", "email", "message", "interest"]) {
      data.set(field, String(data.get(field) || "").trim());
    }
    if (!data.get("name") || !data.get("email") || !data.get("message")) {
      setError("Please enter your name, email address and message.");
      setStatus("error");
      return;
    }
    data.set(
      "subject",
      `CCDI enquiry: ${data.get("interest") || "General enquiry"}`,
    );
    // Include the page path without copying URL query strings or personal data.
    data.set("source", window.location.origin + window.location.pathname);
    inFlight.current = true;
    setStatus("sending");
    setError("");
    try {
      const response = await fetch(contactFormEndpoint, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
        signal: AbortSignal.timeout(30000),
      });
      if (!response.ok) {
        if (response.status === 429)
          throw new Error(
            "The enquiry service is busy. Please try again later or email CCDI directly.",
          );
        throw new Error(
          "Your enquiry could not be sent. Please try again or email CCDI directly.",
        );
      }
      form.reset();
      setStatus("sent");
    } catch (cause) {
      setStatus("error");
      setError(
        cause instanceof Error && cause.name === "Error"
          ? cause.message
          : "We could not confirm delivery. Your message is still here. Please check your connection or email CCDI directly.",
      );
    } finally {
      inFlight.current = false;
    }
  }

  return (
    <form
      className="enquiry-form"
      action={contactFormEndpoint}
      method="POST"
      onSubmit={submit}
      aria-busy={status === "sending"}
      onChange={() => {
        if (!inFlight.current) {
          setStatus("idle");
          setError("");
        }
      }}
    >
      <div className="form-heading">
        <h2>What would you like to explore?</h2>
        <p>
          Send your enquiry to CCDI. Share a little about what you have in mind
          and we’ll reply by email.
        </p>
        <a className="text-link" href={`mailto:${contact.email}`}>
          Email {contact.email} <ArrowUpRight size={16} aria-hidden="true" />
        </a>
        <a
          className="text-link"
          href={facebook}
          target="_blank"
          rel="noreferrer"
        >
          Message CCDI directly on Facebook{" "}
          <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </div>
      <ol className="enquiry-steps" aria-label="Enquiry steps">
        <li>
          <span>1</span>Write
        </li>
        <li>
          <span>2</span>Send enquiry
        </li>
        <li>
          <span>3</span>Hear from CCDI
        </li>
      </ol>
      <fieldset
        disabled={status === "sending"}
        style={{ border: 0, padding: 0, margin: 0, minWidth: 0 }}
      >
        <legend className="sr-only">Your enquiry details</legend>
        <input
          type="hidden"
          name="subject"
          value={`CCDI enquiry: ${interest}`}
        />
        <div hidden aria-hidden="true">
          <label>
            Leave this field empty
            <input
              name="_gotcha"
              type="text"
              tabIndex={-1}
              autoComplete="off"
            />
          </label>
        </div>
        <div className="form-row">
          <label>
            Full name <span>*</span>
            <input
              name="name"
              autoComplete="name"
              required
              maxLength={120}
              placeholder="Your full name…"
            />
          </label>
          <label>
            Email address <span>*</span>
            <input
              type="email"
              name="email"
              autoComplete="email"
              required
              maxLength={254}
              spellCheck={false}
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
              maxLength={40}
              placeholder="+234…"
            />
          </label>
          <label>
            I’m interested in
            <input
              name="interest"
              value={interest}
              maxLength={160}
              onChange={(e) => setInterest(e.target.value)}
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
                "Membership",
                "Returning a completed form",
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
            maxLength={10000}
            placeholder="Tell us a little about what you have in mind…"
          />
        </label>
        <p className="form-privacy">
          Your enquiry is sent securely through Formspree to CCDI. Please do not
          include sensitive information about children or other people.{" "}
          <a href="/privacy-policy/">Privacy information</a>
        </p>
        <button
          className="button button-green"
          type="submit"
          disabled={status === "sending"}
        >
          {status === "sending" ? (
            "Sending…"
          ) : (
            <>
              <ArrowUpRight size={17} aria-hidden="true" />
              Send enquiry
            </>
          )}
        </button>
      </fieldset>
      <div role="status" aria-live="polite" className="form-status">
        {status === "sent" && (
          <p>
            Thank you. Your enquiry has been sent to CCDI. We’ll reply to the
            email address you provided.
          </p>
        )}
      </div>
      {error && (
        <p role="alert" className="form-status">
          {error} <a href={`mailto:${contact.email}`}>Email {contact.email}</a>
        </p>
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

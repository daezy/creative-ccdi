import { ArrowUpRight, Download, FileText } from "lucide-react";
import documents from "@/lib/documents.json";
import { Button, Eyebrow, SectionHead, TextLink } from "./ui";

export function DocumentLibrary() {
  return (
    <section className="document-library" id="forms">
      <SectionHead
        eyebrow="Forms & downloads"
        title="Your next step starts here."
      >
        View the documents online or download a copy to keep. The registration
        and membership PDFs are printable forms.
      </SectionHead>
      <div className="document-card-grid">
        {documents.map((doc) => (
          <article className="document-card" id={doc.id} key={doc.id}>
            <a
              className="document-preview"
              href={doc.src}
              target="_blank"
              rel="noreferrer"
              aria-label={`View ${doc.title} PDF in a new tab`}
            >
              <img
                src={doc.preview}
                alt={`First page of ${doc.title}`}
                width={doc.width}
                height={doc.height}
                loading="lazy"
              />
              <span>
                View document <ArrowUpRight size={16} aria-hidden="true" />
              </span>
            </a>
            <div className="document-card-copy">
              <span className="card-category">{doc.label}</span>
              <h3>{doc.title}</h3>
              <p>{doc.description}</p>
              <div className="document-meta">
                <FileText size={14} aria-hidden="true" />
                <span>
                  PDF · {doc.pages} {doc.pages === 1 ? "page" : "pages"} ·{" "}
                  {doc.size}
                </span>
              </div>
              {doc.id === "membership" && (
                <p className="document-detail">The form is on page 1.</p>
              )}
              {doc.id === "privacy-safeguarding" && (
                <p className="document-detail">
                  Version 1.0. Effective date and designated contact fields are
                  not completed in the supplied document.
                </p>
              )}
              <div className="document-actions">
                <a
                  className="button button-green"
                  href={doc.src}
                  target="_blank"
                  rel="noreferrer"
                >
                  View PDF <ArrowUpRight size={16} aria-hidden="true" />
                </a>
                <a
                  className="document-download"
                  href={doc.src}
                  download
                  aria-label={`Download ${doc.title} PDF`}
                >
                  <Download size={17} aria-hidden="true" />
                  Download
                </a>
              </div>
              {doc.id === "privacy-safeguarding" && (
                <a
                  className="document-consent-link"
                  href={`${doc.src}#page=7`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open photo/video consent form · page 7{" "}
                  <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
      <div className="form-next-steps">
        <div>
          <Eyebrow>Completing a form</Eyebrow>
          <h3>Download. Complete. Contact CCDI.</h3>
          <p>
            Download and print your form, complete the relevant sections, and
            sign where required. Contact CCDI to confirm how to return it. Read
            the membership roles and code of conduct alongside the membership
            form.
          </p>
        </div>
        <Button href="/contact/?interest=Returning%20a%20completed%20form">
          Ask about returning a form
        </Button>
      </div>
    </section>
  );
}
export function FormCallout({ kind }: { kind: "student" | "membership" }) {
  const doc = documents.find(
    (d) =>
      d.id === (kind === "student" ? "student-registration" : "membership"),
  )!;
  return (
    <aside className="form-callout">
      <span className="form-callout-icon">
        <FileText size={30} aria-hidden="true" />
      </span>
      <div>
        <Eyebrow>
          {kind === "student"
            ? "Register your interest"
            : "Become part of CCDI"}
        </Eyebrow>
        <h3>{doc.title}</h3>
        <p>
          {kind === "student"
            ? "Download the student registration form and contact CCDI about your programme and next steps."
            : "Download the membership form, read the roles and code of conduct, and speak with CCDI about joining."}
        </p>
        <div className="form-callout-actions">
          <a className="text-link" href={doc.src} download>
            Download form <Download size={16} aria-hidden="true" />
          </a>
          <TextLink href={`/documents/#${doc.id}`}>
            View forms & guidance
          </TextLink>
        </div>
      </div>
    </aside>
  );
}
export function FrameworkLinks({
  safeguarding = false,
}: {
  safeguarding?: boolean;
}) {
  return (
    <section className="framework-download">
      <Eyebrow>CCDI document</Eyebrow>
      <h2>Privacy & Safeguarding Framework</h2>
      <p>
        The supplied framework brings together privacy and data protection, a
        website privacy notice, child safeguarding, and a photo/video consent
        form.
      </p>
      <div className="hero-actions">
        <a
          className="button button-green"
          href={`/documents/privacy-safeguarding.pdf#page=${safeguarding ? 5 : 1}`}
          target="_blank"
          rel="noreferrer"
        >
          Read the framework <ArrowUpRight size={16} aria-hidden="true" />
        </a>
        <a
          className="text-link"
          href="/documents/privacy-safeguarding.pdf"
          download
        >
          Download PDF <Download size={16} aria-hidden="true" />
        </a>
      </div>
      <p className="document-detail">
        7 pages · Version 1.0. The effective date and designated contact fields
        are not completed in the supplied document.
      </p>
      {safeguarding && (
        <a
          className="text-link"
          href="/documents/privacy-safeguarding.pdf#page=7"
          target="_blank"
          rel="noreferrer"
        >
          Photo/video consent form · page 7{" "}
          <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      )}
    </section>
  );
}

import { ArrowUpRight } from "lucide-react";
import { contact, mapEmbedUrl, mapDirectionsUrl } from "@/lib/content";
import { Eyebrow } from "./ui";

export function ContactMap() {
  return (
    <section
      className="contact-map-section"
      aria-labelledby="contact-map-heading"
      id="find-ccdi"
    >
      <div className="contact-map-heading">
        <div>
          <Eyebrow>Visit CCDI</Eyebrow>
          <h2 id="contact-map-heading">Find us in Lagos.</h2>
          <p>{contact.address}</p>
        </div>
        <a
          className="button button-green"
          href={mapDirectionsUrl}
          target="_blank"
          rel="noreferrer"
        >
          Get directions <ArrowUpRight size={18} aria-hidden="true" />
        </a>
      </div>
      <div className="contact-map-frame">
        <iframe
          src={mapEmbedUrl}
          title="Google Maps preview of Sanusi Adeyemo Street, Satellite Town, Lagos"
          width="1200"
          height="420"
          loading="eager"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
      <p className="contact-map-note">
        The map shows the street area. Confirm your programme venue with the
        team before visiting.
      </p>
    </section>
  );
}

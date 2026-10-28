import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { socials, contact } from "@/lib/content";
import { SocialIcon } from "@/components/social-icon";
export function Footer() {
  return (
    <footer className="site-footer branded-footer" id="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-intro">
            <Link href="/" className="footer-logo" aria-label="CCDI home">
              <img
                src="/images/ccdi-logo-120.webp"
                srcSet="/images/ccdi-logo-120.webp 1x, /images/ccdi-logo-240.webp 2x"
                alt=""
                width={108}
                height={98}
                loading="lazy"
                decoding="async"
              />
              <span className="footer-brand-name">
                Creative Craft
                <br />
                Development Initiative
              </span>
            </Link>
            <p>
              Empowering lives through
              <br />
              skills, purpose, and community.
            </p>
            <nav
              className="footer-social-links"
              aria-label="CCDI social channels"
            >
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="social-link"
                >
                  <SocialIcon platform={social.label} size={16} />
                  {social.action} <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              ))}
            </nav>
          </div>
          <nav className="footer-nav" aria-label="Discover">
            <p className="footer-heading">Discover</p>
            <Link href="/about/">About CCDI</Link>
            <Link href="/projects/">Our four arms</Link>
            <Link href="/skills-training/">Skills training</Link>
            <Link href="/impact/">Our impact</Link>
          </nav>
          <nav className="footer-nav" aria-label="Be part of it">
            <p className="footer-heading">Be part of it</p>
            <Link href="/volunteer/">Volunteer</Link>
            <Link href="/partners/">Partner with us</Link>
            <Link href="/donate/">Donate & support</Link>
            <Link href="/contact/">Contact us</Link>
          </nav>
          <nav className="footer-nav" aria-label="Stay curious">
            <p className="footer-heading">Stay curious</p>
            <Link href="/blog/">Journal & updates</Link>
            <Link href="/gallery/">Photo gallery</Link>
            <Link href="/documents/">Resources</Link>
            <Link href="/financial-transparency/">Financial transparency</Link>
          </nav>
        </div>
        <div className="footer-contact-strip">
          <p>
            <MapPin size={18} aria-hidden="true" />
            <span>{contact.address}</span>
          </p>
          <div className="footer-phone-links">
            <Phone size={18} aria-hidden="true" />
            <div>
              {contact.phones.map((phone) => (
                <a href={phone.href} key={phone.href}>
                  {phone.label}
                </a>
              ))}
            </div>
          </div>
          <a href={`mailto:${contact.email}`}>
            <Mail size={18} aria-hidden="true" />
            <span>{contact.email}</span>
          </a>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} Creative Craft Development Initiative.
          </span>
          <div>
            <Link href="/privacy-policy/">Privacy policy</Link>
            <Link href="/child-protection/">Child protection</Link>
            <a href="#main">Back to top ↑</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

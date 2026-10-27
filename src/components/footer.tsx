import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { facebook } from "@/lib/content";
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-intro">
            <Link href="/" className="footer-logo">
              CCDI
              <span className="logo-dot" />
            </Link>
            <p>
              Empowering lives through
              <br />
              skills, purpose, and community.
            </p>
            <a
              href={facebook}
              target="_blank"
              rel="noreferrer"
              className="social-link"
            >
              Find us on Facebook <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </div>
          <div>
            <p className="footer-heading">Discover</p>
            <Link href="/about/">About CCDI</Link>
            <Link href="/projects/">Our four arms</Link>
            <Link href="/skills-training/">Skills training</Link>
            <Link href="/impact/">Our impact</Link>
          </div>
          <div>
            <p className="footer-heading">Be part of it</p>
            <Link href="/volunteer/">Volunteer</Link>
            <Link href="/partners/">Partner with us</Link>
            <Link href="/donate/">Donate & support</Link>
            <Link href="/contact/">Contact us</Link>
          </div>
          <div>
            <p className="footer-heading">Stay curious</p>
            <Link href="/blog/">Journal & updates</Link>
            <Link href="/gallery/">Photo gallery</Link>
            <Link href="/documents/">Resources</Link>
            <Link href="/financial-transparency/">Financial transparency</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} Creative Craft Development Initiative.
          </span>
          <div>
            <Link href="/privacy-policy/">Privacy policy</Link>
            <Link href="/child-protection/">Child protection</Link>
            <span>Made for possibility.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

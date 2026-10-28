"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Popover } from "@base-ui/react/popover";
import { Dialog } from "@base-ui/react/dialog";
import {
  ArrowUpRight,
  ChevronDown,
  Facebook,
  Heart,
  Mail,
  MapPin,
  Menu,
  Phone,
  X,
} from "lucide-react";
import { navigation, contact, socials } from "@/lib/content";
export function Header() {
  const path = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);
  // Only one desktop dropdown may be open at a time.
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  useEffect(() => setOpenMenu(null), [path]);
  const isHome = path === "/";
  const [scrolled, setScrolled] = useState(false);
  // On the homepage the header floats over the hero carousel and switches
  // back to its solid theme as soon as the visitor starts scrolling.
  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);
  const isCurrent = (href: string) => path === href;
  const isGroupActive = (item: (typeof navigation)[number]) =>
    (item.href !== "/" && path.startsWith(item.href)) ||
    Boolean(item.links?.some((child) => isCurrent(child.href)));
  function changeMobileOpen(open: boolean) {
    setMobileOpen(open);
    if (open)
      setExpandedGroup(
        navigation.find((item) => item.links && isGroupActive(item))?.label ||
          null,
      );
  }
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <div className="announcement">
        <div className="container">
          <ul className="announcement-contact" aria-label="Contact CCDI">
            <li>
              <Phone size={13} aria-hidden="true" />
              {contact.phones.map((p, i) => (
                <span key={p.href}>
                  {i > 0 && <span className="announcement-sep">/</span>}
                  <a href={p.href}>{p.label}</a>
                </span>
              ))}
            </li>
            <li className="announcement-email">
              <Mail size={13} aria-hidden="true" />
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </li>
            <li className="announcement-address" title={contact.address}>
              <MapPin size={13} aria-hidden="true" />
              <span>{contact.addressShort}</span>
            </li>
          </ul>
          <div className="announcement-social">
            <span>Follow us</span>
            {socials.map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`CCDI on ${s.label}`}
              >
                <Facebook size={14} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <header
        className={`site-header${isHome ? " site-header-overlay" : ""}${
          isHome && !scrolled && !mobileOpen ? " is-transparent" : ""
        }`}
      >
        <div className="container header-inner">
          <Link href="/" className="brand" aria-label="CCDI home">
            <img
              src="/images/ccdi-logo-116.png"
              srcSet="/images/ccdi-logo-116.png 116w, /images/ccdi-logo-232.png 232w"
              sizes="58px"
              width="58"
              height="53"
              alt=""
              decoding="async"
            />
            <span className="brand-type">
              CCDI
              <span>
                Creative Craft
                <br />
                Development Initiative
              </span>
            </span>
          </Link>
          <nav className="desktop-nav" aria-label="Main navigation">
            {navigation.map((item) =>
              item.links ? (
                <Popover.Root
                  key={item.label + path}
                  open={openMenu === item.label}
                  onOpenChange={(open) =>
                    setOpenMenu((current) =>
                      open
                        ? item.label
                        : current === item.label
                          ? null
                          : current,
                    )
                  }
                >
                  <Popover.Trigger
                    openOnHover
                    delay={150}
                    closeDelay={120}
                    className={`nav-link ${isGroupActive(item) ? "current" : ""}`}
                  >
                    {item.label}
                    <ChevronDown size={12} aria-hidden="true" />
                  </Popover.Trigger>
                  <Popover.Portal>
                    <Popover.Positioner
                      sideOffset={16}
                      className="nav-positioner"
                    >
                      <Popover.Popup
                        className="nav-dropdown"
                        aria-label={`${item.label} links`}
                      >
                        <span className="dropdown-label">{item.label}</span>
                        {item.links.map((child, i) => (
                          <Link
                            key={`${child.href}-${i}`}
                            href={child.href}
                            aria-current={
                              isCurrent(child.href) ? "page" : undefined
                            }
                          >
                            {child.label}
                            <ArrowUpRight size={14} aria-hidden="true" />
                          </Link>
                        ))}
                      </Popover.Popup>
                    </Popover.Positioner>
                  </Popover.Portal>
                </Popover.Root>
              ) : (
                <Link
                  key={item.label}
                  className={`nav-link ${path === item.href ? "current" : ""}`}
                  href={item.href}
                  aria-current={path === item.href ? "page" : undefined}
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>
          <Link href="/donate/" className="donate-button">
            <Heart size={15} aria-hidden="true" />
            Donate
            <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
          <Dialog.Root open={mobileOpen} onOpenChange={changeMobileOpen}>
            <Dialog.Trigger
              className="mobile-trigger"
              aria-label="Open navigation"
            >
              <Menu size={25} />
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Backdrop className="dialog-backdrop" />
              <Dialog.Popup className="mobile-panel">
                <div className="mobile-panel-head">
                  <Dialog.Title>Explore CCDI</Dialog.Title>
                  <Dialog.Close
                    className="icon-button"
                    aria-label="Close navigation"
                  >
                    <X />
                  </Dialog.Close>
                </div>
                <div className="mobile-quick-links">
                  <Link
                    href="/skills-training/"
                    onClick={() => setMobileOpen(false)}
                  >
                    Find training <ArrowUpRight size={17} aria-hidden="true" />
                  </Link>
                  <Link href="/contact/" onClick={() => setMobileOpen(false)}>
                    Get in touch <ArrowUpRight size={17} aria-hidden="true" />
                  </Link>
                </div>
                <nav aria-label="Mobile navigation">
                  {navigation.map((item, index) => (
                    <div key={item.label} className="mobile-group">
                      {item.links ? (
                        <>
                          <button
                            type="button"
                            className={`mobile-section-toggle ${isGroupActive(item) ? "current" : ""}`}
                            aria-expanded={expandedGroup === item.label}
                            aria-controls={`mobile-section-${index}`}
                            onClick={() =>
                              setExpandedGroup((group) =>
                                group === item.label ? null : item.label,
                              )
                            }
                          >
                            {item.label}
                            <ChevronDown size={18} aria-hidden="true" />
                          </button>
                          <div
                            id={`mobile-section-${index}`}
                            hidden={expandedGroup !== item.label}
                            className="mobile-submenu"
                          >
                            {item.links.map((child, i) => (
                              <Link
                                key={`${child.href}-${i}`}
                                href={child.href}
                                aria-current={
                                  isCurrent(child.href) ? "page" : undefined
                                }
                                onClick={() => setMobileOpen(false)}
                              >
                                {child.label}
                                <ArrowUpRight size={14} aria-hidden="true" />
                              </Link>
                            ))}
                          </div>
                        </>
                      ) : (
                        <Link
                          href={item.href}
                          aria-current={
                            isCurrent(item.href) ? "page" : undefined
                          }
                          onClick={() => setMobileOpen(false)}
                        >
                          {item.label}
                          <ArrowUpRight size={17} aria-hidden="true" />
                        </Link>
                      )}
                    </div>
                  ))}
                </nav>
                <Link
                  href="/donate/"
                  onClick={() => setMobileOpen(false)}
                  className="button button-gold"
                >
                  Support our work <Heart size={17} />
                </Link>
              </Dialog.Popup>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </header>
    </>
  );
}

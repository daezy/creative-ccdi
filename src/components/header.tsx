"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Popover } from "@base-ui/react/popover";
import { Dialog } from "@base-ui/react/dialog";
import { ArrowUpRight, ChevronDown, Heart, Menu, X } from "lucide-react";
import { navigation, facebook } from "@/lib/content";
export function Header() {
  const path = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <div className="announcement">
        <div className="container">
          <span>Self-discovery. Capacity building. Skills for life.</span>
          <a href={facebook} target="_blank" rel="noreferrer">
            Meet our community <ArrowUpRight size={13} aria-hidden="true" />
          </a>
        </div>
      </div>
      <header className="site-header">
        <div className="container header-inner">
          <Link href="/" className="brand" aria-label="CCDI home">
            <img src="/images/ccdi-logo.jpg" width="58" height="53" alt="" />
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
                <Popover.Root key={item.label + path}>
                  <Popover.Trigger
                    openOnHover
                    delay={150}
                    closeDelay={120}
                    className={`nav-link ${path.startsWith(item.href) ? "current" : ""}`}
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
                          <Link key={`${child.href}-${i}`} href={child.href}>
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
          <Dialog.Root open={mobileOpen} onOpenChange={setMobileOpen}>
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
                <nav aria-label="Mobile navigation">
                  {navigation.map((item) => (
                    <div key={item.label} className="mobile-group">
                      <Link
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                      >
                        {item.label}
                        <ArrowUpRight size={17} aria-hidden="true" />
                      </Link>
                      {item.links && (
                        <div>
                          {item.links.map((child, i) => (
                            <Link
                              key={`${child.href}-${i}`}
                              href={child.href}
                              onClick={() => setMobileOpen(false)}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
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

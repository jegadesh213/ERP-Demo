import { useState, useEffect } from "react";
import "./Navbar.css";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Modules", href: "#modules" },
  { label: "Pricing", href: "#pricing" },
  { label: "Resources", href: "#resources" },
];

export default function Navbar({ onGetStarted }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("");

  // Shrink/elevate navbar on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`navbar-header ${scrolled ? "scrolled" : ""}`}>
      <nav className="navbar-pill">

        {/* ── Brand / Logo ── */}
        <div className="navbar-brand">
          <span className="navbar-brand-name">Univerona</span>
        </div>

        {/* ── Center Nav Links (desktop) ── */}
        <ul className="navbar-links" role="list">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className={`navbar-link ${activeLink === link.href ? "active" : ""}`}
                onClick={() => setActiveLink(link.href)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* ── Right CTA ── */}
        <div className="navbar-right">
          <button className="navbar-cta" onClick={onGetStarted}>
            <span className="cta-gradient-border" aria-hidden="true" />
            <span className="cta-label">Get Started</span>
          </button>
        </div>
      </nav>

    </header>
  );
}

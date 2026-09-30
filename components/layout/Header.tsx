"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import { LanguageSwitcher } from "./LanguageSwitcher";

const NAV = [
  { href: "/services", key: "services" as const },
  { href: "/blog", key: "journal" as const },
  { href: "/about", key: "about" as const },
];

export function Header() {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);

  return (
    <header className="hf-header">
      <div className="hf-header-inner">
        <Link href="/" className="hf-logo" aria-label="Homefront Journal — home">
          <span className="hf-logo-mark">HF</span>
          <span className="hf-logo-text">
            <span className="hf-logo-name">Homefront</span>
            <span className="hf-logo-sub">Journal</span>
          </span>
        </Link>

        <nav className="hf-nav" aria-label="Primary">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="hf-nav-link">
              {t(item.key)}
            </Link>
          ))}
          <LanguageSwitcher />
          <Link href="/quote" className="btn btn-primary hf-nav-cta">
            {t("quote")}
          </Link>
        </nav>

        <button
          className="hf-menu-btn"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <X size={22} strokeWidth={1.7} />
          ) : (
            <Menu size={22} strokeWidth={1.7} />
          )}
        </button>
      </div>

      {open && (
        <div className="hf-mobile-nav">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hf-mobile-link"
              onClick={() => setOpen(false)}
            >
              {t(item.key)}
            </Link>
          ))}
          <div className="hf-mobile-lang">
            <LanguageSwitcher />
          </div>
          <Link
            href="/quote"
            className="btn btn-primary"
            onClick={() => setOpen(false)}
          >
            {t("quote")}
          </Link>
        </div>
      )}

      <style jsx>{`
        .hf-header {
          position: sticky;
          top: 0;
          z-index: 60;
          background: color-mix(in oklab, var(--bg) 96%, transparent);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border-bottom: 1px solid
            color-mix(in oklab, var(--gold) 35%, transparent);
        }
        .hf-header-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 16px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
        }
        .hf-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          color: var(--ink);
          position: relative;
          z-index: 2;
        }
        .hf-logo:hover {
          color: var(--ink);
        }
        .hf-logo-mark {
          width: 40px;
          height: 40px;
          display: grid;
          place-items: center;
          border: 1px solid var(--gold);
          border-radius: 50%;
          color: var(--gold);
          font-family: var(--font-accent);
          font-weight: 700;
          font-size: 0.85rem;
          letter-spacing: 0.05em;
          flex-shrink: 0;
        }
        .hf-logo-text {
          display: flex;
          flex-direction: column;
          line-height: 1;
          min-width: 0;
        }
        .hf-logo-name {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 1.15rem;
          letter-spacing: -0.01em;
        }
        .hf-logo-sub {
          font-family: var(--font-accent);
          text-transform: uppercase;
          letter-spacing: 0.28em;
          font-size: 0.6rem;
          color: var(--gold);
          margin-top: 3px;
        }
        .hf-nav {
          display: flex;
          align-items: center;
          gap: 28px;
        }
        .hf-nav-link {
          font-family: var(--font-accent);
          text-transform: uppercase;
          letter-spacing: 0.16em;
          font-size: 0.72rem;
          font-weight: 600;
          color: var(--ink);
          position: relative;
          padding: 6px 0;
        }
        .hf-nav-link::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          height: 1px;
          width: 0;
          background: var(--red);
          transition: width var(--motion-duration) var(--motion-ease);
        }
        .hf-nav-link:hover {
          color: var(--red);
        }
        .hf-nav-link:hover::after {
          width: 100%;
        }
        .hf-nav-cta {
          padding: 0.7rem 1.2rem;
          font-size: 0.7rem;
        }
        .hf-menu-btn {
          display: none;
          background: transparent;
          border: 1px solid var(--border);
          color: var(--ink);
          border-radius: var(--radius-sm);
          padding: 8px;
          cursor: pointer;
        }
        .hf-mobile-nav {
          display: none;
          flex-direction: column;
          gap: 4px;
          padding: 16px 24px 24px;
          border-top: 1px solid var(--border);
          background: var(--surface);
        }
        .hf-mobile-link {
          font-family: var(--font-accent);
          text-transform: uppercase;
          letter-spacing: 0.16em;
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--ink);
          padding: 14px 4px;
          border-bottom: 1px solid var(--border);
        }
        .hf-mobile-lang {
          padding: 12px 4px;
        }
        @media (max-width: 820px) {
          .hf-nav {
            display: none;
          }
          .hf-menu-btn {
            display: grid;
            place-items: center;
          }
          .hf-mobile-nav {
            display: flex;
          }
        }
      `}</style>
    </header>
  );
}
"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

const SERVICE_KEYS = [
  { href: "/services/pool", key: "pool" as const },
  { href: "/services/hvac", key: "hvac" as const },
  { href: "/services/pest-control", key: "pest" as const },
  { href: "/services/plumbing", key: "plumbing" as const },
  { href: "/services/holiday-lighting", key: "lighting" as const },
  { href: "/services/landscape", key: "landscape" as const },
  { href: "/services/hardscape", key: "hardscape" as const },
];

export function Footer() {
  const tSvc = useTranslations("services");
  const t = useTranslations("footer");

  const company = [
    { href: "/about", label: t("about") },
    { href: "/blog", label: t("journal") },
    { href: "/quote", label: t("quote") },
    { href: "/our-brands", label: t("brands") },
  ];

  return (
    <footer className="hf-footer">
      <div className="hf-footer-inner">
        <div className="hf-footer-brand">
          <div className="hf-logo-mark">HF</div>
          <p className="hf-footer-tag">{t("tagline")}</p>
        </div>

        <div className="hf-footer-col">
          <p className="accent-label">{t("services")}</p>
          <ul>
            {SERVICE_KEYS.map((s) => (
              <li key={s.href}>
                <Link href={s.href}>{tSvc(s.key)}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="hf-footer-col">
          <p className="accent-label">{t("company")}</p>
          <ul>
            {company.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <hr className="hairline" style={{ maxWidth: 1200, margin: "32px auto 0" }} />

      <div className="hf-footer-base">
        <p className="hf-footer-disclosure">{t("disclosure")}</p>
        <p className="hf-footer-copy">
          © {new Date().getFullYear()} Homefront Journal. {t("rights")}
        </p>
      </div>

      <style jsx>{`
        .hf-footer {
          background: var(--surface-alt);
          border-top: 1px solid color-mix(in oklab, var(--gold) 35%, transparent);
          margin-top: 80px;
          padding: 56px 24px 32px;
        }
        .hf-footer-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.4fr 1fr 1fr;
          gap: 48px;
        }
        .hf-footer-brand {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .hf-logo-mark {
          width: 44px;
          height: 44px;
          display: grid;
          place-items: center;
          border: 1px solid var(--gold);
          border-radius: 50%;
          color: var(--gold);
          font-family: var(--font-accent);
          font-weight: 700;
          font-size: 0.9rem;
        }
        .hf-footer-tag {
          font-family: var(--font-display);
          font-style: italic;
          font-size: 1.05rem;
          color: var(--ink-muted);
          max-width: 32ch;
          line-height: 1.5;
        }
        .hf-footer-col ul {
          list-style: none;
          padding: 0;
          margin: 12px 0 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .hf-footer-col li :global(a) {
          color: var(--ink-muted);
          font-size: 0.9rem;
        }
        .hf-footer-col li :global(a):hover {
          color: var(--red);
        }
        .hf-footer-base {
          max-width: 1200px;
          margin: 24px auto 0;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 32px;
          flex-wrap: wrap;
        }
        .hf-footer-disclosure {
          font-size: 0.78rem;
          color: var(--ink-muted);
          max-width: 62ch;
          line-height: 1.6;
          font-style: italic;
        }
        .hf-footer-copy {
          font-size: 0.75rem;
          color: var(--ink-muted);
          font-family: var(--font-accent);
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }
        @media (max-width: 820px) {
          .hf-footer-inner {
            grid-template-columns: 1fr;
            gap: 32px;
          }
        }
      `}</style>
    </footer>
  );
}
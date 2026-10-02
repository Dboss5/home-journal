"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRight, ArrowUpRight, ShieldCheck } from "lucide-react";

const STYLES = `
.hf-brands {
  padding-bottom: 0;
}
.hf-brands-hero {
  position: relative;
  margin: 0 -24px;
  padding: 100px 24px 80px;
  background:
    radial-gradient(ellipse at 50% 0%, color-mix(in oklab, var(--gold) 18%, transparent), transparent 60%),
    var(--bg);
  border-bottom: 1px solid color-mix(in oklab, var(--gold) 40%, transparent);
  text-align: center;
}
.hf-brands-hero-inner {
  max-width: 780px;
  margin: 0 auto;
}
.hf-brands-hero-title {
  font-family: var(--font-display);
  font-size: clamp(2.2rem, 4.5vw, 3.4rem);
  line-height: 1.1;
  letter-spacing: -0.02em;
  margin: 14px 0 22px;
}
.hf-brands-hero-sub {
  font-family: var(--font-body);
  font-size: 1.1rem;
  line-height: 1.7;
  color: var(--ink-muted);
  max-width: 62ch;
  margin: 0 auto;
}

.hf-brands-body {
  max-width: 860px;
  margin: 0 auto;
  padding: 80px 0;
}
.hf-brands-intro {
  font-size: 1.15rem;
  line-height: 1.7;
  color: var(--ink);
  margin: 0 0 56px;
  text-align: center;
}

.hf-brands-card {
  padding: 40px 36px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-left: 3px solid var(--gold);
  border-radius: var(--radius-lg);
  margin-bottom: 28px;
  transition: all var(--motion-duration) var(--motion-ease);
}
.hf-brands-card:hover {
  border-color: var(--gold);
  box-shadow: var(--shadow-md);
}
.hf-brands-card-eyebrow {
  font-family: var(--font-accent);
  text-transform: uppercase;
  letter-spacing: 0.18em;
  font-size: 0.68rem;
  font-weight: 600;
  color: var(--gold);
  margin-bottom: 12px;
}
.hf-brands-card-title {
  font-family: var(--font-display);
  font-size: 1.7rem;
  margin: 0 0 16px;
  color: var(--ink);
}
.hf-brands-card-body {
  font-family: var(--font-body);
  font-size: 1.05rem;
  line-height: 1.7;
  color: var(--ink-muted);
  margin: 0 0 20px;
}
.hf-brands-card-services {
  list-style: none;
  padding: 0;
  margin: 0 0 24px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.hf-brands-card-services li {
  padding: 5px 12px;
  background: var(--surface-alt);
  border-radius: 999px;
  font-family: var(--font-accent);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 0.65rem;
  font-weight: 600;
  color: var(--ink-muted);
}
.hf-brands-card-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-accent);
  text-transform: uppercase;
  letter-spacing: 0.14em;
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--red);
  transition: gap var(--motion-duration) var(--motion-ease);
}
.hf-brands-card-link:hover {
  gap: 12px;
}

.hf-brands-partner {
  padding: 28px 32px;
  background: var(--surface-alt);
  border-radius: var(--radius-md);
  margin-bottom: 40px;
}
.hf-brands-partner-title {
  font-family: var(--font-display);
  font-size: 1.25rem;
  margin: 0 0 12px;
  color: var(--ink);
}
.hf-brands-partner-body {
  font-size: 1rem;
  line-height: 1.7;
  color: var(--ink-muted);
  margin: 0;
}

.hf-brands-trust {
  display: flex;
  gap: 20px;
  align-items: flex-start;
  padding: 32px;
  background: var(--surface);
  border: 1px solid color-mix(in oklab, var(--gold) 40%, transparent);
  border-radius: var(--radius-lg);
  margin-top: 56px;
}
.hf-brands-trust-icon {
  color: var(--gold);
  flex-shrink: 0;
  margin-top: 2px;
}
.hf-brands-trust-title {
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: 600;
  margin: 0 0 10px;
  color: var(--ink);
}
.hf-brands-trust-body {
  font-size: 1rem;
  line-height: 1.7;
  color: var(--ink-muted);
  margin: 0;
}

.hf-brands-cta {
  background: var(--surface-alt);
  margin: 80px -24px 0;
  padding: 80px 24px;
  text-align: center;
}
.hf-brands-cta-inner {
  max-width: 620px;
  margin: 0 auto;
}
.hf-brands-cta-title {
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 3.4vw, 2.4rem);
  margin: 0 0 16px;
}
.hf-brands-cta-sub {
  color: var(--ink-muted);
  font-size: 1.05rem;
  margin: 0 0 28px;
  line-height: 1.6;
}
`;

export function OurBrandsContent() {
  const t = useTranslations("ourBrands");

  return (
    <div className="hf-brands">
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      {/* HERO */}
      <section className="hf-brands-hero">
        <div className="hf-brands-hero-inner">
          <p className="accent-label">{t("eyebrow")}</p>
          <h1 className="hf-brands-hero-title">{t("title")}</h1>
          <p className="hf-brands-hero-sub">{t("subtitle")}</p>
        </div>
      </section>

      {/* BODY */}
      <section className="hf-brands-body">
        <p className="hf-brands-intro">{t("intro")}</p>

        {/* Poolburg */}
        <div className="hf-brands-card">
          <p className="hf-brands-card-eyebrow">{t("familyLabel")}</p>
          <h2 className="hf-brands-card-title">Poolburg</h2>
          <p className="hf-brands-card-body">{t("poolburgBody")}</p>
          <ul className="hf-brands-card-services">
            <li>{t("poolburgService1")}</li>
            <li>{t("poolburgService2")}</li>
            <li>{t("poolburgService3")}</li>
            <li>{t("poolburgService4")}</li>
          </ul>
          <a
            href="https://poolburg.com?utm_source=homefront&utm_medium=referral&utm_campaign=our_brands"
            target="_blank"
            rel="noopener noreferrer"
            className="hf-brands-card-link"
          >
            {t("visitSite")}
            <ArrowUpRight size={14} strokeWidth={2} />
          </a>
        </div>

        {/* Supremacy */}
        <div className="hf-brands-card">
          <p className="hf-brands-card-eyebrow">{t("familyLabel")}</p>
          <h2 className="hf-brands-card-title">Supremacy Service</h2>
          <p className="hf-brands-card-body">{t("supremacyBody")}</p>
          <ul className="hf-brands-card-services">
            <li>{t("supremacyService1")}</li>
            <li>{t("supremacyService2")}</li>
            <li>{t("supremacyService3")}</li>
            <li>{t("supremacyService4")}</li>
            <li>{t("supremacyService5")}</li>
            <li>{t("supremacyService6")}</li>
            <li>{t("supremacyService7")}</li>
          </ul>
          <a
            href="https://supremacyservice.com?utm_source=homefront&utm_medium=referral&utm_campaign=our_brands"
            target="_blank"
            rel="noopener noreferrer"
            className="hf-brands-card-link"
          >
            {t("visitSite")}
            <ArrowUpRight size={14} strokeWidth={2} />
          </a>
        </div>

        {/* Trusted Partners */}
        <div className="hf-brands-partner">
          <h3 className="hf-brands-partner-title">{t("partnersTitle")}</h3>
          <p className="hf-brands-partner-body">{t("partnersBody")}</p>
        </div>

        {/* Trust block */}
        <div className="hf-brands-trust">
          <ShieldCheck size={26} strokeWidth={1.7} className="hf-brands-trust-icon" />
          <div>
            <p className="hf-brands-trust-title">{t("trustTitle")}</p>
            <p className="hf-brands-trust-body">{t("trustBody")}</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="hf-brands-cta">
        <div className="hf-brands-cta-inner">
          <h2 className="hf-brands-cta-title">{t("ctaTitle")}</h2>
          <p className="hf-brands-cta-sub">{t("ctaSub")}</p>
          <Link href="/quote" className="btn btn-primary">
            {t("ctaButton")}
            <ArrowRight size={16} strokeWidth={2} />
          </Link>
        </div>
      </section>
    </div>
  );
}
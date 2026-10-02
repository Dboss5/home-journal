"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRight, ShieldCheck, Users, BookOpen, Scale } from "lucide-react";

const STYLES = `
.hf-about {
  padding-bottom: 0;
}
.hf-about-hero {
  position: relative;
  margin: 0 -24px;
  padding: 100px 24px 80px;
  background:
    radial-gradient(ellipse at 50% 0%, color-mix(in oklab, var(--gold) 18%, transparent), transparent 60%),
    var(--bg);
  border-bottom: 1px solid color-mix(in oklab, var(--gold) 40%, transparent);
  text-align: center;
}
.hf-about-hero-inner {
  max-width: 780px;
  margin: 0 auto;
}
.hf-about-hero-title {
  font-family: var(--font-display);
  font-size: clamp(2.4rem, 5vw, 4rem);
  line-height: 1.05;
  letter-spacing: -0.02em;
  margin: 14px 0 22px;
}
.hf-about-hero-sub {
  font-family: var(--font-body);
  font-size: 1.15rem;
  line-height: 1.6;
  color: var(--ink-muted);
  font-style: italic;
  max-width: 58ch;
  margin: 0 auto;
}

.hf-about-section {
  max-width: 780px;
  margin: 0 auto;
  padding: 80px 0;
}
.hf-about-section p {
  font-family: var(--font-body);
  font-size: 1.08rem;
  line-height: 1.8;
  color: var(--ink);
  margin: 0 0 24px;
}
.hf-about-section p.lead {
  font-size: 1.25rem;
  line-height: 1.6;
  color: var(--ink);
}
.hf-about-section h2 {
  font-family: var(--font-display);
  font-size: clamp(1.7rem, 3vw, 2.4rem);
  margin: 56px 0 24px;
  color: var(--ink);
}
.hf-about-section h2:first-child {
  margin-top: 0;
}

.hf-about-values {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin: 48px 0;
}
.hf-about-value {
  padding: 24px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.hf-about-value-icon {
  color: var(--gold);
}
.hf-about-value-title {
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
  color: var(--ink);
}
.hf-about-value-body {
  color: var(--ink-muted);
  font-size: 0.95rem;
  line-height: 1.6;
  margin: 0;
}

.hf-about-quote {
  border-left: 3px solid var(--gold);
  padding-left: 28px;
  margin: 40px 0;
  font-family: var(--font-display);
  font-style: italic;
  font-size: 1.3rem;
  line-height: 1.5;
  color: var(--ink);
}

.hf-about-cta {
  background: var(--surface-alt);
  margin: 80px -24px 0;
  padding: 80px 24px;
  text-align: center;
}
.hf-about-cta-inner {
  max-width: 620px;
  margin: 0 auto;
}
.hf-about-cta-title {
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 3.4vw, 2.4rem);
  margin: 0 0 16px;
}
.hf-about-cta-sub {
  color: var(--ink-muted);
  font-size: 1.05rem;
  margin: 0 0 28px;
  line-height: 1.6;
}
.hf-about-cta-row {
  display: flex;
  gap: 14px;
  justify-content: center;
  flex-wrap: wrap;
}

@media (max-width: 640px) {
  .hf-about-values {
    grid-template-columns: 1fr;
  }
}
`;

export function AboutContent() {
  const t = useTranslations("about");

  return (
    <div className="hf-about">
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      {/* HERO */}
      <section className="hf-about-hero">
        <div className="hf-about-hero-inner">
          <p className="accent-label">{t("eyebrow")}</p>
          <h1 className="hf-about-hero-title">{t("title")}</h1>
          <p className="hf-about-hero-sub">{t("subtitle")}</p>
        </div>
      </section>

      {/* BODY */}
      <section className="hf-about-section">
        <p className="lead">{t("lead")}</p>

        <h2>{t("whyTitle")}</h2>
        <p>{t("whyBody1")}</p>
        <p>{t("whyBody2")}</p>

        <div className="hf-about-quote">{t("quote")}</div>

        <h2>{t("howTitle")}</h2>
        <p>{t("howBody")}</p>

        <div className="hf-about-values">
          <Value
            icon={<ShieldCheck size={22} strokeWidth={1.7} />}
            title={t("value1Title")}
            body={t("value1Body")}
          />
          <Value
            icon={<Scale size={22} strokeWidth={1.7} />}
            title={t("value2Title")}
            body={t("value2Body")}
          />
          <Value
            icon={<BookOpen size={22} strokeWidth={1.7} />}
            title={t("value3Title")}
            body={t("value3Body")}
          />
          <Value
            icon={<Users size={22} strokeWidth={1.7} />}
            title={t("value4Title")}
            body={t("value4Body")}
          />
        </div>

        <h2>{t("whoTitle")}</h2>
        <p>{t("whoBody")}</p>
      </section>

      {/* CTA */}
      <section className="hf-about-cta">
        <div className="hf-about-cta-inner">
          <h2 className="hf-about-cta-title">{t("ctaTitle")}</h2>
          <p className="hf-about-cta-sub">{t("ctaSub")}</p>
          <div className="hf-about-cta-row">
            <Link href="/quote" className="btn btn-primary">
              {t("ctaPrimary")}
              <ArrowRight size={16} strokeWidth={2} />
            </Link>
            <Link href="/our-brands" className="btn btn-ghost">
              {t("ctaSecondary")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function Value({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="hf-about-value">
      <span className="hf-about-value-icon">{icon}</span>
      <h3 className="hf-about-value-title">{title}</h3>
      <p className="hf-about-value-body">{body}</p>
    </div>
  );
}
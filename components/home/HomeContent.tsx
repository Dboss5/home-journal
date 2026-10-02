"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  Waves,
  Wind,
  Bug,
  Wrench,
  Sparkles,
  Trees,
  BrickWall,
  ShieldCheck,
  Users,
  Star,
  ArrowRight,
} from "lucide-react";
import { FeaturedAnimations } from "./FeaturedAnimations";

/* ============================================================
   HOME STYLES
   ============================================================ */
const HOME_STYLES = `
/* ---------- HERO ---------- */
.hf-hero {
  position: relative;
  overflow: hidden;
  margin: 0 -24px;
  padding: 120px 24px 100px;
  border-bottom: 1px solid color-mix(in oklab, var(--gold) 40%, transparent);
  isolation: isolate;
}

/* Slideshow background */
.hf-hero-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}
.hf-hero-slide {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  opacity: 0;
  transition: opacity 2400ms cubic-bezier(0.22, 1, 0.36, 1);
  will-change: opacity;
  filter: saturate(0.65) contrast(0.92) brightness(1.02);
}
.hf-hero-slide.is-active {
  opacity: 1;
}

/* Tinted veil keeps text legible over any image */
.hf-hero-veil {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(
      ellipse at 30% 20%,
      color-mix(in oklab, var(--red) 22%, transparent),
      transparent 60%
    ),
    radial-gradient(
      ellipse at 80% 80%,
      color-mix(in oklab, var(--gold) 14%, transparent),
      transparent 55%
    ),
    linear-gradient(
      to bottom,
      color-mix(in oklab, var(--bg) 78%, transparent) 0%,
      color-mix(in oklab, var(--bg) 88%, transparent) 60%,
      color-mix(in oklab, var(--bg) 96%, transparent) 100%
    );
}

/* Hero content */
.hf-hero-inner {
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
  position: relative;
  z-index: 2;
}
.hf-hero-title {
  font-family: var(--font-display);
  font-size: clamp(2.6rem, 6vw, 5rem);
  line-height: 1.05;
  letter-spacing: -0.02em;
  color: var(--ink);
  margin: 20px 0 24px;
}
.hf-hero-sub {
  font-family: var(--font-body);
  font-size: clamp(1.05rem, 1.6vw, 1.25rem);
  line-height: 1.6;
  color: var(--ink-muted);
  max-width: 60ch;
  margin: 0 auto;
}
.hf-hero-ctas {
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-top: 40px;
  flex-wrap: wrap;
}

/* Grain overlay */
.hf-hero-grain {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.35;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/></svg>");
  mix-blend-mode: overlay;
  z-index: 1;
}

/* Special-needs modes */
[data-calm="true"] .hf-hero-slide,
[data-focus="true"] .hf-hero-slide {
  transition: none !important;
}
[data-calm="true"] .hf-hero-bg {
  opacity: 0.5;
}
[data-focus="true"] .hf-hero-bg {
  display: none;
}

/* ---------- TRUST STRIP ---------- */
.hf-trust {
  padding: 24px 0;
  border-bottom: 1px solid var(--border);
}
.hf-trust-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  gap: 48px;
  flex-wrap: wrap;
}
.hf-trust-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: var(--font-accent);
  text-transform: uppercase;
  letter-spacing: 0.16em;
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--gold);
}

/* ---------- SECTION HEADS ---------- */
.hf-section-head,
.hf-section-head-center {
  text-align: center;
  margin-bottom: 56px;
}
.hf-section-head-center .accent-label {
  display: block;
}
.hf-section-title {
  font-family: var(--font-display);
  font-size: clamp(1.9rem, 3.4vw, 2.8rem);
  margin: 12px 0 0;
  color: var(--ink);
}

/* ---------- SERVICES ---------- */
.hf-services {
  padding: 96px 0;
}
.hf-services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
}
.hf-service-card {
  position: relative;
  padding: 28px 24px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  display: flex;
  flex-direction: column;
  gap: 16px;
  transition: all var(--motion-duration) var(--motion-ease);
  overflow: hidden;
}
.hf-service-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  height: 2px;
  width: 0;
  background: var(--red);
  transition: width var(--motion-duration) var(--motion-ease);
}
.hf-service-card:hover {
  border-color: var(--gold);
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}
.hf-service-card:hover::before {
  width: 100%;
}
.hf-service-icon {
  color: var(--gold);
  display: inline-flex;
}
.hf-service-card:hover .hf-service-icon {
  color: var(--red);
}
.hf-service-label {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 1.15rem;
  color: var(--ink);
}
.hf-service-arrow {
  margin-top: auto;
  color: var(--red);
  transition: transform var(--motion-duration) var(--motion-ease);
}
.hf-service-card:hover .hf-service-arrow {
  transform: translateX(6px);
}

/* ---------- HOW IT WORKS ---------- */
.hf-how {
  padding: 96px 24px;
  background: var(--surface-alt);
  margin: 0 -24px;
}
.hf-how-grid {
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
}
.hf-how-step {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.hf-how-num {
  font-family: var(--font-display);
  font-size: 3.6rem;
  font-weight: 700;
  color: var(--gold);
  line-height: 1;
  letter-spacing: -0.02em;
}
.hf-how-title {
  font-family: var(--font-display);
  font-size: 1.3rem;
  margin: 0;
}
.hf-how-body {
  color: var(--ink-muted);
  line-height: 1.6;
}
@media (max-width: 820px) {
  .hf-how-grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }
}

/* ---------- WHY US ---------- */
.hf-why {
  padding: 96px 0;
}
.hf-why-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: center;
}
.hf-why-image {
  aspect-ratio: 4 / 5;
  background: var(--surface-alt);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  position: relative;
}
.hf-why-image-inner {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(
      circle at 30% 30%,
      color-mix(in oklab, var(--red) 30%, transparent),
      transparent 60%
    ),
    radial-gradient(
      circle at 70% 70%,
      color-mix(in oklab, var(--gold) 20%, transparent),
      transparent 60%
    );
}
.hf-why-copy {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.hf-why-copy .hf-section-title {
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 3vw, 2.4rem);
  margin: 0;
}
.hf-why-body {
  color: var(--ink-muted);
  line-height: 1.7;
  font-size: 1.02rem;
}
.hf-why-cta {
  align-self: flex-start;
  margin-top: 8px;
}
@media (max-width: 820px) {
  .hf-why-inner {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  .hf-why-image {
    aspect-ratio: 16 / 10;
  }
}

/* ---------- JOURNAL PREVIEW ---------- */
.hf-journal {
  padding: 96px 0;
}
.hf-journal-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}
.hf-journal-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  transition: all var(--motion-duration) var(--motion-ease);
}
.hf-journal-card:hover {
  border-color: var(--gold);
  transform: translateY(-3px);
}
.hf-journal-cat {
  font-family: var(--font-accent);
  text-transform: uppercase;
  letter-spacing: 0.18em;
  font-size: 0.68rem;
  font-weight: 600;
  color: var(--gold);
}
.hf-journal-title {
  font-family: var(--font-display);
  font-size: 1.25rem;
  line-height: 1.3;
  margin: 0;
}
.hf-journal-excerpt {
  color: var(--ink-muted);
  line-height: 1.6;
  font-size: 0.94rem;
  margin: 0;
}
.hf-journal-link {
  margin-top: auto;
  padding-top: 12px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-accent);
  text-transform: uppercase;
  letter-spacing: 0.14em;
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--red);
}
.hf-journal-footer {
  display: flex;
  justify-content: center;
  margin-top: 48px;
}

/* ---------- FINAL CTA ---------- */
.hf-cta {
  background: var(--red);
  color: #fff;
  padding: 80px 24px;
  margin: 96px -24px 0;
  text-align: center;
}
.hf-cta-inner {
  max-width: 700px;
  margin: 0 auto;
}
.hf-cta-title {
  font-family: var(--font-display);
  font-size: clamp(2rem, 4vw, 3rem);
  color: #fff;
  margin: 0 0 16px;
}
.hf-cta-sub {
  color: color-mix(in oklab, #fff 80%, transparent);
  font-size: 1.1rem;
  margin: 0 0 32px;
}
.hf-cta-btn {
  background: #fff;
  color: var(--red);
  border-color: var(--gold);
}
.hf-cta-btn:hover {
  background: var(--gold);
  color: #1A1614;
}
`;

/* ============================================================
   HERO SLIDESHOW IMAGES
   Drop 3 images into /public/images/hero/ and name them here.
   ============================================================ */
const HERO_IMAGES = [
  "/images/hero/hero-1.avif",
  "/images/hero/hero-2.avif",
  "/images/hero/hero-3.avif",
] as const;

const HERO_INTERVAL_MS = 7000;

/* ============================================================
   ROOT
   ============================================================ */
export function HomeContent() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: HOME_STYLES }} />
      <Hero />
      <TrustStrip />
      <ServicesGrid />
      <HowItWorks />
      <FeaturedAnimations />
      <WhyUs />
      <JournalPreview />
      <FinalCTA />
    </>
  );
}

/* ---------- HERO ---------- */
function Hero() {
  const t = useTranslations("home");
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((i) => (i + 1) % HERO_IMAGES.length);
    }, HERO_INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="hf-hero">
      <div className="hf-hero-bg" aria-hidden>
        {HERO_IMAGES.map((src, i) => (
          <div
            key={src}
            className={`hf-hero-slide ${i === current ? "is-active" : ""}`}
            style={{ backgroundImage: `url(${src})` }}
          />
        ))}
        <div className="hf-hero-veil" />
      </div>

      <div className="hf-hero-inner">
        <p className="accent-label">{t("eyebrow")}</p>
        <h1 className="hf-hero-title">{t("heroTitle")}</h1>
        <p className="hf-hero-sub">{t("heroSub")}</p>
        <div className="hf-hero-ctas">
          <Link href="/quote" className="btn btn-primary">
            {t("cta")}
            <ArrowRight size={16} strokeWidth={2} />
          </Link>
          <Link href="/services" className="btn btn-ghost">
            {t("heroCta2")}
          </Link>
        </div>
      </div>

      <div className="hf-hero-grain" aria-hidden />
    </section>
  );
}

/* ---------- TRUST STRIP ---------- */
function TrustStrip() {
  const t = useTranslations("home");
  const items = [
    { icon: ShieldCheck, key: "trustVetted" as const },
    { icon: Users, key: "trustLocal" as const },
    { icon: Star, key: "trustRated" as const },
  ];
  return (
    <section className="hf-trust">
      <div className="hf-trust-inner">
        {items.map(({ icon: Icon, key }) => (
          <div key={key} className="hf-trust-item">
            <Icon size={18} strokeWidth={1.6} />
            <span>{t(key)}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- SERVICES GRID ---------- */
const SERVICES = [
  { key: "pool", href: "/services/pool", icon: Waves },
  { key: "hvac", href: "/services/hvac", icon: Wind },
  { key: "pest", href: "/services/pest-control", icon: Bug },
  { key: "plumbing", href: "/services/plumbing", icon: Wrench },
  { key: "lighting", href: "/services/holiday-lighting", icon: Sparkles },
  { key: "landscape", href: "/services/landscape", icon: Trees },
  { key: "hardscape", href: "/services/hardscape", icon: BrickWall },
] as const;

function ServicesGrid() {
  const t = useTranslations("services");
  const th = useTranslations("home");
  return (
    <section className="hf-services">
      <div className="hf-section-head">
        <p className="accent-label">{th("servicesEyebrow")}</p>
        <h2 className="hf-section-title">{th("servicesTitle")}</h2>
      </div>
      <div className="hf-services-grid">
        {SERVICES.map(({ key, href, icon: Icon }) => (
          <Link key={key} href={href} className="hf-service-card">
            <span className="hf-service-icon">
              <Icon size={26} strokeWidth={1.5} />
            </span>
            <span className="hf-service-label">{t(key)}</span>
            <span className="hf-service-arrow">
              <ArrowRight size={16} strokeWidth={2} />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* ---------- HOW IT WORKS ---------- */
function HowItWorks() {
  const t = useTranslations("home");
  const steps = [
    { n: "01", titleKey: "howStep1Title" as const, bodyKey: "howStep1Body" as const },
    { n: "02", titleKey: "howStep2Title" as const, bodyKey: "howStep2Body" as const },
    { n: "03", titleKey: "howStep3Title" as const, bodyKey: "howStep3Body" as const },
  ];
  return (
    <section className="hf-how">
      <div className="hf-section-head-center">
        <p className="accent-label">{t("howEyebrow")}</p>
        <h2 className="hf-section-title">{t("howTitle")}</h2>
      </div>
      <div className="hf-how-grid">
        {steps.map((s) => (
          <div key={s.n} className="hf-how-step">
            <span className="hf-how-num">{s.n}</span>
            <h3 className="hf-how-title">{t(s.titleKey)}</h3>
            <p className="hf-how-body">{t(s.bodyKey)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- WHY US ---------- */
function WhyUs() {
  const t = useTranslations("home");
  return (
    <section className="hf-why">
      <div className="hf-why-inner">
        <div className="hf-why-image" aria-hidden>
          <div className="hf-why-image-inner" />
        </div>
        <div className="hf-why-copy">
          <p className="accent-label">{t("whyEyebrow")}</p>
          <h2 className="hf-section-title">{t("whyTitle")}</h2>
          <p className="hf-why-body">{t("whyBody1")}</p>
          <p className="hf-why-body">{t("whyBody2")}</p>
          <Link href="/about" className="btn btn-ghost hf-why-cta">
            {t("whyCta")}
            <ArrowRight size={16} strokeWidth={2} />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ---------- JOURNAL PREVIEW ---------- */
function JournalPreview() {
  const t = useTranslations("home");
  const tIndex = useTranslations("blogIndex");
  const posts = [
    {
      slug: "how-often-service-pool",
      title: "How often should you actually service your pool?",
      category: "Pool",
      excerpt: "Most homeowners do it wrong. Here's what the pros know about keeping water clear without wasting money.",
    },
    {
      slug: "signs-ac-about-to-fail",
      title: "Signs your AC is about to fail (and what to do)",
      category: "HVAC",
      excerpt: "Catch it early and you'll save thousands. Here are the warning signs that matter.",
    },
    {
      slug: "real-cost-holiday-lighting",
      title: "The real cost of holiday light installation",
      category: "Lighting",
      excerpt: "DIY vs pro, and why the numbers might surprise you.",
    },
  ];
  return (
    <section className="hf-journal">
      <div className="hf-section-head-center">
        <p className="accent-label">{t("journalEyebrow")}</p>
        <h2 className="hf-section-title">{t("journalTitle")}</h2>
      </div>
      <div className="hf-journal-grid">
        {posts.map((p) => (
          <article key={p.slug} className="hf-journal-card">
            <span className="hf-journal-cat">{p.category}</span>
            <h3 className="hf-journal-title">{p.title}</h3>
            <p className="hf-journal-excerpt">{p.excerpt}</p>
            <Link href={`/blog/${p.slug}`} className="hf-journal-link">
              {t("journalRead")}
              <ArrowRight size={14} strokeWidth={2} />
            </Link>
          </article>
        ))}
      </div>
      <div className="hf-journal-footer">
        <Link href="/blog" className="btn btn-ghost">
          {t("journalBrowse")}
          <ArrowRight size={16} strokeWidth={2} />
        </Link>
      </div>
    </section>
  );
}

/* ---------- FINAL CTA ---------- */
function FinalCTA() {
  const t = useTranslations("home");
  return (
    <section className="hf-cta">
      <div className="hf-cta-inner">
        <h2 className="hf-cta-title">{t("finalTitle")}</h2>
        <p className="hf-cta-sub">{t("finalSub")}</p>
        <Link href="/quote" className="btn hf-cta-btn">
          {t("cta")}
          <ArrowRight size={16} strokeWidth={2} />
        </Link>
      </div>
    </section>
  );
}
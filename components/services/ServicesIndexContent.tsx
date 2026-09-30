"use client";

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
  ArrowRight,
  ShieldCheck,
  Users,
  Star,
  Sparkle,
} from "lucide-react";
import { SERVICE_IMAGES } from "@/lib/serviceImages";

const SERVICES = [
  { key: "pool", href: "/services/pool", icon: Waves },
  { key: "hvac", href: "/services/hvac", icon: Wind },
  { key: "pest", href: "/services/pest-control", icon: Bug },
  { key: "plumbing", href: "/services/plumbing", icon: Wrench },
  { key: "lighting", href: "/services/holiday-lighting", icon: Sparkles },
  { key: "landscape", href: "/services/landscape", icon: Trees },
  { key: "hardscape", href: "/services/hardscape", icon: BrickWall },
] as const;

const STYLES = `
.hf-svc-idx { padding-bottom: 0; }

/* HERO */
.hf-svc-idx-hero {
  position: relative;
  margin: 0 -24px;
  padding: 100px 24px 80px;
  background:
    radial-gradient(ellipse at 50% 0%, color-mix(in oklab, var(--gold) 20%, transparent), transparent 60%),
    var(--bg);
  border-bottom: 1px solid color-mix(in oklab, var(--gold) 40%, transparent);
  text-align: center;
}
.hf-svc-idx-hero-inner { max-width: 780px; margin: 0 auto; }
.hf-svc-idx-hero-title {
  font-family: var(--font-display);
  font-size: clamp(2.4rem, 5vw, 4rem);
  line-height: 1.05;
  letter-spacing: -0.02em;
  margin: 14px 0 20px;
}
.hf-svc-idx-hero-sub {
  font-size: 1.1rem; color: var(--ink-muted);
  line-height: 1.6; max-width: 58ch; margin: 0 auto;
}

/* TRUST */
.hf-svc-idx-trust {
  padding: 24px 0;
  border-bottom: 1px solid var(--border);
  margin-bottom: 96px;
}
.hf-svc-idx-trust-inner {
  max-width: 1200px; margin: 0 auto;
  display: flex; justify-content: center;
  gap: 48px; flex-wrap: wrap;
}
.hf-svc-idx-trust-item {
  display: flex; align-items: center; gap: 10px;
  font-family: var(--font-accent); text-transform: uppercase;
  letter-spacing: 0.16em; font-size: 0.72rem;
  font-weight: 600; color: var(--gold);
}

/* GRID */
.hf-svc-idx-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 28px;
  max-width: 1200px;
  margin: 0 auto 96px;
}
.hf-svc-idx-card {
  position: relative;
  display: flex;
  flex-direction: column;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: all var(--motion-duration) var(--motion-ease);
}
.hf-svc-idx-card:hover {
  border-color: var(--gold);
  transform: translateY(-6px);
  box-shadow: var(--shadow-lg);
}
.hf-svc-idx-card-img {
  position: relative;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background: var(--surface-alt);
}
.hf-svc-idx-card-img img {
  width: 100%; height: 100%; object-fit: cover;
  transition: transform 600ms var(--motion-ease);
}
.hf-svc-idx-card:hover .hf-svc-idx-card-img img {
  transform: scale(1.05);
}
.hf-svc-idx-card-img::after {
  content: "";
  position: absolute; inset: 0;
  background: linear-gradient(
    to bottom,
    transparent 40%,
    color-mix(in oklab, var(--ink) 55%, transparent) 100%
  );
  pointer-events: none;
}
.hf-svc-idx-card-icon {
  position: absolute;
  top: 20px; left: 20px;
  width: 48px; height: 48px;
  display: grid; place-items: center;
  background: color-mix(in oklab, var(--bg) 92%, transparent);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  border: 1px solid color-mix(in oklab, var(--gold) 50%, transparent);
  border-radius: 50%;
  color: var(--gold);
  z-index: 2;
}
.hf-svc-idx-card-body {
  padding: 24px 26px 26px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
}
.hf-svc-idx-card-label {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 1.35rem;
  color: var(--ink);
  margin: 0;
}
.hf-svc-idx-card-desc {
  color: var(--ink-muted);
  font-size: 0.95rem;
  line-height: 1.6;
  margin: 0;
}
.hf-svc-idx-card-cta {
  margin-top: auto;
  padding-top: 14px;
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
.hf-svc-idx-card:hover .hf-svc-idx-card-cta { gap: 14px; }

/* MID CTA */
.hf-svc-idx-mid {
  background: var(--surface-alt);
  padding: 80px 24px;
  margin: 0 -24px;
  text-align: center;
}
.hf-svc-idx-mid-inner {
  max-width: 720px; margin: 0 auto;
  display: flex; flex-direction: column;
  gap: 20px; align-items: center;
}
.hf-svc-idx-mid-title {
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 3.2vw, 2.6rem);
  margin: 0;
}
.hf-svc-idx-mid-sub {
  color: var(--ink-muted);
  font-size: 1.05rem;
  line-height: 1.6;
  max-width: 52ch;
}

/* FINAL CTA */
.hf-svc-idx-final {
  background: var(--red);
  color: #fff;
  padding: 80px 24px;
  margin: 0 -24px;
  text-align: center;
}
.hf-svc-idx-final-inner { max-width: 700px; margin: 0 auto; }
.hf-svc-idx-final-title {
  font-family: var(--font-display);
  font-size: clamp(2rem, 4vw, 3rem);
  color: #fff;
  margin: 0 0 16px;
}
.hf-svc-idx-final-sub {
  color: color-mix(in oklab, #fff 80%, transparent);
  font-size: 1.1rem;
  margin: 0 0 32px;
}
.hf-svc-idx-final-btn {
  background: #fff;
  color: var(--red);
  border: 1px solid var(--gold);
}
.hf-svc-idx-final-btn:hover {
  background: var(--gold);
  color: #1A1614;
}
`;

export function ServicesIndexContent() {
  const t = useTranslations("services");
  const tIdx = useTranslations("servicesIndex");

  return (
    <div className="hf-svc-idx">
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      {/* HERO */}
      <section className="hf-svc-idx-hero">
        <div className="hf-svc-idx-hero-inner">
          <p className="accent-label">{tIdx("eyebrow")}</p>
          <h1 className="hf-svc-idx-hero-title">{tIdx("title")}</h1>
          <p className="hf-svc-idx-hero-sub">{tIdx("subtitle")}</p>
        </div>
      </section>

      {/* TRUST */}
      <section className="hf-svc-idx-trust">
        <div className="hf-svc-idx-trust-inner">
          <div className="hf-svc-idx-trust-item">
            <ShieldCheck size={18} strokeWidth={1.6} />
            <span>{tIdx("trustVetted")}</span>
          </div>
          <div className="hf-svc-idx-trust-item">
            <Users size={18} strokeWidth={1.6} />
            <span>{tIdx("trustLocal")}</span>
          </div>
          <div className="hf-svc-idx-trust-item">
            <Star size={18} strokeWidth={1.6} />
            <span>{tIdx("trustRated")}</span>
          </div>
        </div>
      </section>

      {/* GRID */}
      <section className="hf-svc-idx-grid">
        {SERVICES.map(({ key, href, icon: Icon }) => (
          <Link key={key} href={href} className="hf-svc-idx-card">
            <div className="hf-svc-idx-card-img">
              <span className="hf-svc-idx-card-icon">
                <Icon size={22} strokeWidth={1.6} />
              </span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={SERVICE_IMAGES[key]}
                alt={t(key)}
                loading="lazy"
              />
            </div>
            <div className="hf-svc-idx-card-body">
              <h3 className="hf-svc-idx-card-label">{t(key)}</h3>
              <p className="hf-svc-idx-card-desc">
                {tIdx(`descriptions.${key}` as any)}
              </p>
              <span className="hf-svc-idx-card-cta">
                {tIdx("cardCta")}
                <ArrowRight size={14} strokeWidth={2} />
              </span>
            </div>
          </Link>
        ))}
      </section>

      {/* MID CTA */}
      <section className="hf-svc-idx-mid">
        <div className="hf-svc-idx-mid-inner">
          <Sparkle size={28} strokeWidth={1.5} style={{ color: "var(--gold)" }} />
          <h2 className="hf-svc-idx-mid-title">{tIdx("midTitle")}</h2>
          <p className="hf-svc-idx-mid-sub">{tIdx("midSub")}</p>
          <Link href="/quote" className="btn btn-primary">
            {tIdx("cta")}
            <ArrowRight size={16} strokeWidth={2} />
          </Link>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="hf-svc-idx-final">
        <div className="hf-svc-idx-final-inner">
          <h2 className="hf-svc-idx-final-title">{tIdx("finalTitle")}</h2>
          <p className="hf-svc-idx-final-sub">{tIdx("finalSub")}</p>
          <Link href="/quote" className="btn hf-svc-idx-final-btn">
            {tIdx("cta")}
            <ArrowRight size={16} strokeWidth={2} />
          </Link>
        </div>
      </section>
    </div>
  );
}
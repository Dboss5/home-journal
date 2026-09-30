"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import { LottiePlayer } from "@/components/common/LottiePlayer";

const FEATURED = [
  { key: "pool" as const, href: "/services/pool" },
  { key: "hvac" as const, href: "/services/hvac" },
  { key: "landscape" as const, href: "/services/landscape" },
];

const STYLES = `
.hf-feat {
  padding: 96px 0;
  border-top: 1px solid color-mix(in oklab, var(--gold) 35%, transparent);
  border-bottom: 1px solid color-mix(in oklab, var(--gold) 35%, transparent);
}
.hf-feat-head {
  text-align: center;
  margin-bottom: 64px;
}
.hf-feat-title {
  font-family: var(--font-display);
  font-size: clamp(1.9rem, 3.4vw, 2.8rem);
  margin: 12px 0 0;
}
.hf-feat-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  max-width: 1100px;
  margin: 0 auto;
}
.hf-feat-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 20px;
  padding: 32px 24px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  transition: all var(--motion-duration) var(--motion-ease);
}
.hf-feat-card:hover {
  border-color: var(--gold);
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}
.hf-feat-lottie {
  width: 100%;
  aspect-ratio: 1 / 1;
  max-width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.hf-feat-label {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 1.2rem;
  color: var(--ink);
}
.hf-feat-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-accent);
  text-transform: uppercase;
  letter-spacing: 0.14em;
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--red);
  transition: gap var(--motion-duration) var(--motion-ease);
}
.hf-feat-card:hover .hf-feat-link {
  gap: 12px;
}
@media (max-width: 820px) {
  .hf-feat-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }
}
`;

export function FeaturedAnimations() {
  const t = useTranslations("services");
  const th = useTranslations("home");

  return (
    <section className="hf-feat">
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <div className="hf-feat-head">
        <p className="accent-label">{th("featuredEyebrow")}</p>
        <h2 className="hf-feat-title">{th("featuredTitle")}</h2>
      </div>

      <div className="hf-feat-grid">
        {FEATURED.map(({ key, href }) => (
          <Link key={key} href={href} className="hf-feat-card">
            <LottiePlayer
              name={key}
              className="hf-feat-lottie"
              ariaLabel={`${t(key)} animation`}
            />
            <span className="hf-feat-label">{t(key)}</span>
            <span className="hf-feat-link">
              {th("featuredCta")}
              <ArrowRight size={14} strokeWidth={2} />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
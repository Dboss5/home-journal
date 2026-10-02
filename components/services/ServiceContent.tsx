"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  ArrowRight,
  Check,
  ShieldCheck,
  DollarSign,
  HelpCircle,
  Waves,
  Wind,
  Bug,
  Wrench,
  Sparkles,
  Trees,
  BrickWall,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";
import type { ServiceData } from "@/lib/services";

const ICONS: Record<string, LucideIcon> = {
  pool: Waves,
  hvac: Wind,
  pest: Bug,
  plumbing: Wrench,
  lighting: Sparkles,
  landscape: Trees,
  hardscape: BrickWall,
};

export function ServiceContent({ service }: { service: ServiceData }) {
  const t = useTranslations("services");
  const tsvc = useTranslations("servicePage");

  const Icon = ICONS[service.key] ?? Waves;

  return (
    <>
      {/* HERO */}
      <section className="hf-svc-hero">
        <div className="hf-svc-hero-inner">
          <span className="hf-svc-hero-icon">
            <Icon size={40} strokeWidth={1.4} />
          </span>
          <p className="accent-label">{tsvc("eyebrow")}</p>
          <h1 className="hf-svc-hero-title">{t(service.key as any)}</h1>
          <p className="hf-svc-hero-sub">{tsvc("subtitle")}</p>
          <div className="hf-svc-hero-ctas">
            <Link href="/quote" className="btn btn-primary">
              {tsvc("cta")}
              <ArrowRight size={16} strokeWidth={2} />
            </Link>
            <Link href="/services" className="btn btn-ghost">
              {tsvc("back")}
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="hf-svc-section">
        <div className="hf-svc-section-head">
          <p className="accent-label">
            <Check size={14} strokeWidth={2} style={{ display: "inline", marginRight: 6, verticalAlign: "-2px" }} />
            {tsvc("featuresTitle")}
          </p>
          <h2 className="hf-svc-section-title">{tsvc("featuresHeadline")}</h2>
        </div>
        <div className="hf-svc-features">
          {service.features.map((f) => (
            <div key={f} className="hf-svc-feature">
              <span className="hf-svc-feature-dot" />
              <span>{f}</span>
            </div>
          ))}
        </div>
      </section>

      {/* VETTING */}
      <section className="hf-svc-section hf-svc-section-alt">
        <div className="hf-svc-section-inner">
          <div className="hf-svc-section-head">
            <p className="accent-label">
              <ShieldCheck size={14} strokeWidth={2} style={{ display: "inline", marginRight: 6, verticalAlign: "-2px" }} />
              {tsvc("vettingTitle")}
            </p>
            <h2 className="hf-svc-section-title">{tsvc("vettingHeadline")}</h2>
          </div>
          <ul className="hf-svc-vetting">
            {service.vetting.map((v) => (
              <li key={v}>
                <Check size={18} strokeWidth={2.4} />
                <span>{v}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* COSTS */}
      <section className="hf-svc-section">
        <div className="hf-svc-section-head">
          <p className="accent-label">
            <DollarSign size={14} strokeWidth={2} style={{ display: "inline", marginRight: 6, verticalAlign: "-2px" }} />
            {tsvc("costsTitle")}
          </p>
          <h2 className="hf-svc-section-title">{tsvc("costsHeadline")}</h2>
        </div>
        <div className="hf-svc-costs">
          {service.costs.map((c) => (
            <div key={c.label} className="hf-svc-cost-row">
              <span className="hf-svc-cost-label">{c.label}</span>
              <span className="hf-svc-cost-range">{c.range}</span>
            </div>
          ))}
        </div>
        <p className="hf-svc-cost-note">{tsvc("costsNote")}</p>
      </section>

      {/* FAQ */}
      <section className="hf-svc-section hf-svc-section-alt">
        <div className="hf-svc-section-inner">
          <div className="hf-svc-section-head">
            <p className="accent-label">
              <HelpCircle size={14} strokeWidth={2} style={{ display: "inline", marginRight: 6, verticalAlign: "-2px" }} />
              {tsvc("faqTitle")}
            </p>
            <h2 className="hf-svc-section-title">{tsvc("faqHeadline")}</h2>
          </div>
          <div className="hf-svc-faq">
            {service.faqs.map((f, i) => (
              <FaqItem key={i} question={f.q} answer={f.a} defaultOpen={i === 0} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="hf-svc-cta">
        <div className="hf-svc-cta-inner">
          <h2 className="hf-svc-cta-title">{tsvc("finalTitle")}</h2>
          <p className="hf-svc-cta-sub">{tsvc("finalSub")}</p>
          <Link href={`/quote?service=${service.key}`} className="btn btn-primary">
            {tsvc("cta")}
            <ArrowRight size={16} strokeWidth={2} />
          </Link>
        </div>
      </section>

      <style jsx>{`
        /* HERO */
        .hf-svc-hero {
          position: relative;
          overflow: hidden;
          margin: 0 -24px;
          padding: 100px 24px 80px;
          background:
            radial-gradient(
              ellipse at 50% 0%,
              color-mix(in oklab, var(--gold) 18%, transparent),
              transparent 60%
            ),
            var(--bg);
          border-bottom: 1px solid color-mix(in oklab, var(--gold) 35%, transparent);
          text-align: center;
        }
        .hf-svc-hero-inner {
          max-width: 780px;
          margin: 0 auto;
        }
        .hf-svc-hero-icon {
          display: inline-flex;
          color: var(--gold);
          margin-bottom: 20px;
        }
        .hf-svc-hero-title {
          font-family: var(--font-display);
          font-size: clamp(2.4rem, 5vw, 4rem);
          line-height: 1.05;
          letter-spacing: -0.02em;
          margin: 12px 0 20px;
        }
        .hf-svc-hero-sub {
          font-size: 1.1rem;
          color: var(--ink-muted);
          line-height: 1.6;
          max-width: 56ch;
          margin: 0 auto;
        }
        .hf-svc-hero-ctas {
          display: flex;
          gap: 14px;
          justify-content: center;
          margin-top: 36px;
          flex-wrap: wrap;
        }

        /* SECTIONS */
        .hf-svc-section {
          padding: 88px 0;
        }
        .hf-svc-section-alt {
          background: var(--surface-alt);
          margin: 0 -24px;
          padding-left: 24px;
          padding-right: 24px;
        }
        .hf-svc-section-inner {
          max-width: 1100px;
          margin: 0 auto;
        }
        .hf-svc-section-head {
          text-align: center;
          margin-bottom: 48px;
        }
        .hf-svc-section-title {
          font-family: var(--font-display);
          font-size: clamp(1.7rem, 3vw, 2.4rem);
          margin: 14px 0 0;
        }

        /* FEATURES */
        .hf-svc-features {
          max-width: 800px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px 40px;
        }
        .hf-svc-feature {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          font-size: 1.02rem;
          line-height: 1.5;
        }
        .hf-svc-feature-dot {
          flex-shrink: 0;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--red);
          margin-top: 9px;
        }

        /* VETTING */
        .hf-svc-vetting {
          max-width: 720px;
          margin: 0 auto;
          list-style: none;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 18px;
        }
        .hf-svc-vetting li {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          font-size: 1.05rem;
          line-height: 1.5;
          color: var(--ink);
        }
        .hf-svc-vetting li :global(svg) {
          color: var(--gold);
          flex-shrink: 0;
          margin-top: 3px;
        }

        /* COSTS */
        .hf-svc-costs {
          max-width: 720px;
          margin: 0 auto;
          border-top: 1px solid var(--border);
        }
        .hf-svc-cost-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 0;
          border-bottom: 1px solid var(--border);
          gap: 24px;
        }
        .hf-svc-cost-label {
          font-family: var(--font-body);
          font-size: 1rem;
          color: var(--ink);
        }
        .hf-svc-cost-range {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: 1.05rem;
          color: var(--red);
          white-space: nowrap;
        }
        .hf-svc-cost-note {
          max-width: 720px;
          margin: 24px auto 0;
          font-size: 0.85rem;
          color: var(--ink-muted);
          font-style: italic;
          text-align: center;
          line-height: 1.5;
        }

        /* FAQ */
        .hf-svc-faq {
          max-width: 800px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        /* CTA */
        .hf-svc-cta {
          background: var(--red);
          color: #fff;
          padding: 80px 24px;
          margin: 0 -24px;
          text-align: center;
        }
        .hf-svc-cta-inner {
          max-width: 640px;
          margin: 0 auto;
        }
        .hf-svc-cta-title {
          font-family: var(--font-display);
          font-size: clamp(1.8rem, 3.5vw, 2.6rem);
          color: #fff;
          margin: 0 0 14px;
        }
        .hf-svc-cta-sub {
          color: color-mix(in oklab, #fff 80%, transparent);
          font-size: 1.05rem;
          margin: 0 0 28px;
        }
        .hf-svc-cta :global(.hf-svc-cta-btn) {
          background: #fff;
          color: var(--red);
          border-color: var(--gold);
        }
        .hf-svc-cta :global(.hf-svc-cta-btn):hover {
          background: var(--gold);
          color: #1A1614;
        }

        @media (max-width: 720px) {
          .hf-svc-features {
            grid-template-columns: 1fr;
          }
          .hf-svc-cost-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 6px;
          }
        }
      `}</style>
    </>
  );
}

/* ---------- FAQ ITEM ---------- */
function FaqItem({
  question,
  answer,
  defaultOpen = false,
}: {
  question: string;
  answer: string;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={`hf-faq-item ${open ? "is-open" : ""}`}>
      <button
        className="hf-faq-trigger"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span>{question}</span>
        <span className="hf-faq-icon">{open ? "−" : "+"}</span>
      </button>
      {open && <div className="hf-faq-answer">{answer}</div>}

      <style jsx>{`
        .hf-faq-item {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          transition: all var(--motion-duration) var(--motion-ease);
        }
        .hf-faq-item.is-open {
          border-color: var(--gold);
        }
        .hf-faq-trigger {
          width: 100%;
          background: transparent;
          border: 0;
          padding: 20px 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          cursor: pointer;
          font-family: var(--font-display);
          font-weight: 600;
          font-size: 1.05rem;
          color: var(--ink);
          text-align: left;
        }
        .hf-faq-icon {
          font-family: var(--font-display);
          font-size: 1.5rem;
          color: var(--red);
          line-height: 1;
          flex-shrink: 0;
        }
        .hf-faq-answer {
          padding: 0 24px 22px;
          color: var(--ink-muted);
          line-height: 1.7;
          font-size: 0.98rem;
        }
      `}</style>
    </div>
  );
}
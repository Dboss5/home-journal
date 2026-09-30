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
} from "lucide-react";

const SERVICES = [
  { key: "pool", href: "/services/pool", icon: Waves },
  { key: "hvac", href: "/services/hvac", icon: Wind },
  { key: "pest", href: "/services/pest-control", icon: Bug },
  { key: "plumbing", href: "/services/plumbing", icon: Wrench },
  { key: "lighting", href: "/services/holiday-lighting", icon: Sparkles },
  { key: "landscape", href: "/services/landscape", icon: Trees },
  { key: "hardscape", href: "/services/hardscape", icon: BrickWall },
] as const;

export function ServicesIndexContent() {
  const t = useTranslations("services");

  return (
    <section className="hf-svc-index">
      <div className="hf-svc-index-head">
        <p className="accent-label">Services</p>
        <h1 className="hf-svc-index-title">Every corner of your property.</h1>
        <p className="hf-svc-index-sub">
          Seven categories. Vetted pros. Transparent pricing. Pick what you
          need.
        </p>
      </div>

      <div className="hf-svc-index-grid">
        {SERVICES.map(({ key, href, icon: Icon }) => (
          <Link key={key} href={href} className="hf-svc-index-card">
            <span className="hf-svc-index-icon">
              <Icon size={28} strokeWidth={1.5} />
            </span>
            <span className="hf-svc-index-label">{t(key)}</span>
            <span className="hf-svc-index-arrow">
              <ArrowRight size={16} strokeWidth={2} />
            </span>
          </Link>
        ))}
      </div>

      <style jsx>{`
        .hf-svc-index {
          padding: 96px 0;
        }
        .hf-svc-index-head {
          text-align: center;
          max-width: 720px;
          margin: 0 auto 64px;
        }
        .hf-svc-index-title {
          font-family: var(--font-display);
          font-size: clamp(2.2rem, 4.5vw, 3.4rem);
          line-height: 1.1;
          margin: 14px 0 20px;
        }
        .hf-svc-index-sub {
          color: var(--ink-muted);
          font-size: 1.05rem;
          line-height: 1.6;
        }
        .hf-svc-index-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 20px;
        }
        .hf-svc-index-card {
          padding: 32px 28px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          display: flex;
          flex-direction: column;
          gap: 18px;
          transition: all var(--motion-duration) var(--motion-ease);
          position: relative;
          overflow: hidden;
        }
        .hf-svc-index-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          height: 2px;
          width: 0;
          background: var(--red);
          transition: width var(--motion-duration) var(--motion-ease);
        }
        .hf-svc-index-card:hover {
          border-color: var(--gold);
          transform: translateY(-4px);
          box-shadow: var(--shadow-md);
        }
        .hf-svc-index-card:hover::before {
          width: 100%;
        }
        .hf-svc-index-icon {
          color: var(--gold);
          display: inline-flex;
        }
        .hf-svc-index-card:hover .hf-svc-index-icon {
          color: var(--red);
        }
        .hf-svc-index-label {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: 1.25rem;
        }
        .hf-svc-index-arrow {
          margin-top: auto;
          color: var(--red);
          transition: transform var(--motion-duration) var(--motion-ease);
        }
        .hf-svc-index-card:hover .hf-svc-index-arrow {
          transform: translateX(6px);
        }
      `}</style>
    </section>
  );
}
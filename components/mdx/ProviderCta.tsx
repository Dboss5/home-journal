"use client";

import { getPartnerForService, buildPartnerUrl } from "@/lib/partners";
import { ArrowUpRight, ShieldCheck } from "lucide-react";

const STYLES = `
.hf-provider-cta {
  margin: 48px 0;
  padding: 28px;
  background: color-mix(in oklab, var(--gold) 8%, var(--surface));
  border: 1px solid color-mix(in oklab, var(--gold) 40%, transparent);
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
}
.hf-provider-cta-icon {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--surface);
  border: 1px solid var(--gold);
  display: grid;
  place-items: center;
  color: var(--gold);
  flex-shrink: 0;
}
.hf-provider-cta-body {
  flex: 1;
  min-width: 240px;
}
.hf-provider-cta-eyebrow {
  font-family: var(--font-accent);
  text-transform: uppercase;
  letter-spacing: 0.16em;
  font-size: 0.62rem;
  font-weight: 600;
  color: var(--gold);
  margin: 0 0 4px;
}
.hf-provider-cta-title {
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 4px;
  color: var(--ink);
}
.hf-provider-cta-desc {
  font-family: var(--font-body);
  font-size: 0.92rem;
  color: var(--ink-muted);
  line-height: 1.5;
  margin: 0;
}
.hf-provider-cta-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: var(--red);
  color: #fff;
  border-radius: var(--radius-md);
  font-family: var(--font-accent);
  text-transform: uppercase;
  letter-spacing: 0.14em;
  font-size: 0.7rem;
  font-weight: 600;
  text-decoration: none;
  flex-shrink: 0;
  transition: all var(--motion-duration) var(--motion-ease);
}
.hf-provider-cta-link:hover {
  background: var(--red-hover);
  box-shadow: 0 0 0 1px var(--gold) inset;
}
`;

interface Props {
  service:
    | "pool"
    | "hvac"
    | "pest"
    | "plumbing"
    | "lighting"
    | "landscape"
    | "hardscape";
  campaign?: string;
}

export function ProviderCta({ service, campaign }: Props) {
  const partner = getPartnerForService(service);
  if (!partner) return null;

  const url = buildPartnerUrl(
    partner,
    service,
    campaign ?? `blog_${service}_cta`
  );

  return (
    <div className="hf-provider-cta">
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <span className="hf-provider-cta-icon">
        <ShieldCheck size={20} strokeWidth={1.8} />
      </span>
      <div className="hf-provider-cta-body">
        <p className="hf-provider-cta-eyebrow">Vetted DFW provider</p>
        <h4 className="hf-provider-cta-title">{partner.name}</h4>
        <p className="hf-provider-cta-desc">{partner.shortBlurb}</p>
      </div>
      <a
        href={url}
        target="_blank"
        rel="noopener"
        className="hf-provider-cta-link"
      >
        Visit site
        <ArrowUpRight size={14} strokeWidth={2} />
      </a>
    </div>
  );
}
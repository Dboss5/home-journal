"use client";

import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

const TABLE_STYLES = `
.hf-mdx-table {
  margin: 40px 0;
  border: 1px solid color-mix(in oklab, var(--gold) 45%, transparent);
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: var(--surface);
}
.hf-mdx-table-head {
  padding: 20px 24px 16px;
  background: color-mix(in oklab, var(--gold) 8%, transparent);
  border-bottom: 1px solid color-mix(in oklab, var(--gold) 35%, transparent);
}
.hf-mdx-table-label {
  font-family: var(--font-accent);
  text-transform: uppercase;
  letter-spacing: 0.18em;
  font-size: 0.65rem;
  font-weight: 600;
  color: var(--gold);
  margin: 0 0 6px;
}
.hf-mdx-table-title {
  font-family: var(--font-display);
  font-size: 1.15rem;
  margin: 0;
  color: var(--ink);
}
.hf-mdx-table-rows {
  display: flex;
  flex-direction: column;
}
.hf-mdx-table-row {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 24px;
  padding: 16px 24px;
  border-bottom: 1px solid var(--border);
  align-items: baseline;
}
.hf-mdx-table-row:last-child {
  border-bottom: 0;
}
.hf-mdx-table-row:nth-child(even) {
  background: color-mix(in oklab, var(--surface-alt) 55%, transparent);
}
.hf-mdx-table-key {
  font-family: var(--font-body);
  font-size: 0.98rem;
  color: var(--ink);
  line-height: 1.5;
}
.hf-mdx-table-value {
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--red);
  text-align: right;
  line-height: 1.4;
}
.hf-mdx-table-foot {
  padding: 14px 24px;
  background: var(--surface-alt);
  border-top: 1px solid var(--border);
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-style: italic;
  color: var(--ink-muted);
  line-height: 1.5;
}

.hf-cost-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
  margin: 40px 0;
}
.hf-cost-card {
  padding: 24px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  display: flex;
  flex-direction: column;
  gap: 10px;
  transition: all var(--motion-duration) var(--motion-ease);
}
.hf-cost-card:hover {
  border-color: var(--gold);
  transform: translateY(-3px);
}
.hf-cost-card-label {
  font-family: var(--font-accent);
  text-transform: uppercase;
  letter-spacing: 0.14em;
  font-size: 0.62rem;
  font-weight: 600;
  color: var(--ink-muted);
}
.hf-cost-card-price {
  font-family: var(--font-display);
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--red);
  line-height: 1.2;
}
.hf-cost-card-note {
  font-family: var(--font-body);
  font-size: 0.85rem;
  color: var(--ink-muted);
  line-height: 1.5;
  margin: 0;
}

.hf-callout {
  margin: 32px 0;
  padding: 24px 28px;
  background: color-mix(in oklab, var(--gold) 8%, var(--surface));
  border-left: 3px solid var(--gold);
  border-radius: var(--radius-md);
  display: flex;
  gap: 16px;
  align-items: flex-start;
}
.hf-callout-icon {
  color: var(--gold);
  flex-shrink: 0;
  margin-top: 2px;
}
.hf-callout-body {
  font-family: var(--font-body);
  font-size: 1rem;
  line-height: 1.7;
  color: var(--ink);
  margin: 0;
}
.hf-callout-body strong {
  color: var(--ink);
  font-weight: 700;
}

.hf-mdx-cta {
  margin: 48px 0;
  padding: 32px 28px;
  background: var(--red);
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  flex-wrap: wrap;
  color: #fff;
}
.hf-mdx-cta-text {
  font-family: var(--font-display);
  font-size: 1.15rem;
  margin: 0;
  color: #fff;
  line-height: 1.4;
  flex: 1;
  min-width: 240px;
}
.hf-mdx-cta-btn {
  background: #fff;
  color: var(--red);
  border: 1px solid var(--gold);
  flex-shrink: 0;
}
.hf-mdx-cta-btn:hover {
  background: var(--gold);
  color: #1A1614;
}

[data-calm="true"] .hf-cost-card:hover {
  transform: none;
}
`;

/* ---------- Type helpers ---------- */

interface PriceRow {
  label: string;
  value: string;
}

/**
 * MDX sometimes passes array props as children instead of as a serialized
 * array prop. This helper accepts either shape and returns a clean array.
 */
function coerceRows<T>(prop: unknown, children: ReactNode): T[] {
  if (Array.isArray(prop)) return prop as T[];

  // MDX can pass the array's items as children
  const kids = Array.isArray(children) ? children : children ? [children] : [];
  // Filter out whitespace / text nodes
  const real = kids.filter(
    (c): c is any =>
      typeof c === "object" && c !== null && "props" in (c as any)
  );
  if (real.length) {
    return real.map((c: any) => c.props);
  }
  return [];
}

/* ---------- Components ---------- */

export interface PriceTableProps {
  label?: string;
  title?: string;
  rows?: PriceRow[];
  footnote?: string;
  children?: ReactNode;
}

export function PriceTable({
  label,
  title,
  rows: rowsProp,
  footnote,
  children,
}: PriceTableProps) {
  const rows = coerceRows<PriceRow>(rowsProp, children);

  return (
    <div className="hf-mdx-table">
      <style dangerouslySetInnerHTML={{ __html: TABLE_STYLES }} />
      {(label || title) && (
        <div className="hf-mdx-table-head">
          {label && <p className="hf-mdx-table-label">{label}</p>}
          {title && <h3 className="hf-mdx-table-title">{title}</h3>}
        </div>
      )}
      <div className="hf-mdx-table-rows">
        {rows.map((r, i) => (
          <div key={i} className="hf-mdx-table-row">
            <span className="hf-mdx-table-key">{r.label}</span>
            <span className="hf-mdx-table-value">{r.value}</span>
          </div>
        ))}
      </div>
      {footnote && <div className="hf-mdx-table-foot">{footnote}</div>}
    </div>
  );
}

export interface CostCard {
  label: string;
  price: string;
  note?: string;
}

export function CostGrid({
  items: itemsProp,
  children,
}: {
  items?: CostCard[];
  children?: ReactNode;
}) {
  const items = coerceRows<CostCard>(itemsProp, children);

  return (
    <div className="hf-cost-grid">
      <style dangerouslySetInnerHTML={{ __html: TABLE_STYLES }} />
      {items.map((c, i) => (
        <div key={i} className="hf-cost-card">
          <span className="hf-cost-card-label">{c.label}</span>
          <span className="hf-cost-card-price">{c.price}</span>
          {c.note && <p className="hf-cost-card-note">{c.note}</p>}
        </div>
      ))}
    </div>
  );
}

export function Callout({
  children,
  icon,
}: {
  children: ReactNode;
  icon?: ReactNode;
}) {
  return (
    <div className="hf-callout">
      <style dangerouslySetInnerHTML={{ __html: TABLE_STYLES }} />
      {icon && <span className="hf-callout-icon">{icon}</span>}
      <div className="hf-callout-body">{children}</div>
    </div>
  );
}

export function MdxCta({
  text,
  button,
  href,
}: {
  text: string;
  button: string;
  href: string;
}) {
  return (
    <div className="hf-mdx-cta">
      <style dangerouslySetInnerHTML={{ __html: TABLE_STYLES }} />
      <p className="hf-mdx-cta-text">{text}</p>
      <Link href={href} className="btn hf-mdx-cta-btn">
        {button}
        <ArrowRight size={16} strokeWidth={2} />
      </Link>
    </div>
  );
}
"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  Waves,
  Wind,
  Bug,
  Wrench,
  Sparkles,
  Trees,
  BrickWall,
  ChevronDown,
  type LucideIcon,
} from "lucide-react";
import {
  CITIES,
  CITY_SERVICES,
  getCityText,
  type City,
  type ServiceKey,
} from "@/lib/locations";
import { getCityFaqs } from "@/lib/cityFaqs";
import { CityStructuredData } from "./CityStructuredData";

const ICONS: Record<string, LucideIcon> = {
  Waves,
  Wind,
  Bug,
  Wrench,
  Sparkles,
  Trees,
  BrickWall,
};

interface ServiceShape {
  key: ServiceKey;
  labelKey: string;
  icon: string;
}

const STYLES = `
.hf-city { padding-bottom: 0; }
.hf-city-hero {
  position: relative; margin: 0 -24px; padding: 100px 24px 80px;
  background:
    radial-gradient(ellipse at 50% 0%, color-mix(in oklab, var(--gold) 18%, transparent), transparent 60%),
    var(--bg);
  border-bottom: 1px solid color-mix(in oklab, var(--gold) 35%, transparent);
  text-align: center;
}
.hf-city-hero-inner { max-width: 820px; margin: 0 auto; }
.hf-city-hero-icon { display: inline-flex; color: var(--gold); margin-bottom: 20px; }
.hf-city-hero-title {
  font-family: var(--font-display);
  font-size: clamp(2.2rem, 4.8vw, 3.6rem);
  line-height: 1.05; letter-spacing: -0.02em; margin: 12px 0 20px;
}
.hf-city-hero-sub {
  font-size: 1.1rem; color: var(--ink-muted); line-height: 1.7;
  max-width: 60ch; margin: 0 auto;
}
.hf-city-section { max-width: 820px; margin: 0 auto; padding: 72px 0; }
.hf-city-section-alt {
  background: var(--surface-alt); margin: 0 -24px;
  padding-left: 24px; padding-right: 24px;
}
.hf-city-section h2 {
  font-family: var(--font-display);
  font-size: clamp(1.6rem, 3vw, 2.2rem);
  margin: 0 0 20px; color: var(--ink);
}
.hf-city-section p {
  font-family: var(--font-body); font-size: 1.05rem;
  line-height: 1.75; color: var(--ink); margin: 0 0 20px;
}
.hf-city-section p:last-child { margin-bottom: 0; }
.hf-city-citybox {
  padding: 24px 28px;
  background: color-mix(in oklab, var(--gold) 8%, var(--surface));
  border-left: 3px solid var(--gold); border-radius: var(--radius-md);
  margin: 32px 0; display: flex; gap: 20px; flex-wrap: wrap;
}
.hf-city-citybox-item { flex: 1; min-width: 180px; }
.hf-city-citybox-label {
  font-family: var(--font-accent); text-transform: uppercase;
  letter-spacing: 0.14em; font-size: 0.62rem;
  font-weight: 600; color: var(--gold); margin: 0 0 6px;
}
.hf-city-citybox-value {
  font-family: var(--font-display); font-size: 1rem;
  color: var(--ink); margin: 0; line-height: 1.4;
}
.hf-city-checklist {
  list-style: none; padding: 0; margin: 24px 0 0;
  display: flex; flex-direction: column; gap: 14px;
}
.hf-city-checklist li {
  display: flex; gap: 14px; align-items: flex-start;
  font-size: 1rem; line-height: 1.6; color: var(--ink);
}
.hf-city-checklist li svg {
  color: var(--gold); flex-shrink: 0; margin-top: 3px;
}
.hf-city-provider {
  padding: 32px; background: var(--surface);
  border: 1px solid color-mix(in oklab, var(--gold) 45%, transparent);
  border-radius: var(--radius-lg); margin: 40px 0;
  display: flex; gap: 24px; align-items: center; flex-wrap: wrap;
}
.hf-city-provider-body { flex: 1; min-width: 240px; }
.hf-city-provider-eyebrow {
  font-family: var(--font-accent); text-transform: uppercase;
  letter-spacing: 0.16em; font-size: 0.62rem;
  font-weight: 600; color: var(--gold); margin: 0 0 6px;
}
.hf-city-provider-title {
  font-family: var(--font-display); font-size: 1.15rem; margin: 0 0 6px;
}
.hf-city-provider-desc {
  font-size: 0.94rem; color: var(--ink-muted); line-height: 1.6; margin: 0;
}
.hf-city-provider-link {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 12px 20px; background: var(--red); color: #fff;
  border-radius: var(--radius-md); font-family: var(--font-accent);
  text-transform: uppercase; letter-spacing: 0.14em;
  font-size: 0.7rem; font-weight: 600; text-decoration: none;
  flex-shrink: 0;
}
.hf-city-provider-link:hover {
  background: var(--red-hover); box-shadow: 0 0 0 1px var(--gold) inset;
}
.hf-city-crosslinks { padding: 72px 0; max-width: 820px; margin: 0 auto; }
.hf-city-crosslinks h3 {
  font-family: var(--font-display); font-size: 1.25rem;
  margin: 0 0 20px; color: var(--ink);
}
.hf-city-crosslinks h3:not(:first-child) { margin-top: 48px; }
.hf-city-crosslink-grid { display: flex; flex-wrap: wrap; gap: 10px; }
.hf-city-crosslink {
  padding: 10px 16px; background: var(--surface);
  border: 1px solid var(--border); border-radius: 999px;
  font-family: var(--font-accent); text-transform: uppercase;
  letter-spacing: 0.12em; font-size: 0.68rem; font-weight: 600;
  color: var(--ink);
  transition: all var(--motion-duration) var(--motion-ease);
}
.hf-city-crosslink:hover { border-color: var(--gold); color: var(--red); }
.hf-city-faq { max-width: 820px; margin: 0 auto; padding: 72px 0; }
.hf-city-faq h2 {
  font-family: var(--font-display);
  font-size: clamp(1.6rem, 3vw, 2.2rem);
  margin: 0 0 32px;
}
.hf-city-faq-list {
  display: flex; flex-direction: column; gap: 12px;
}
.hf-city-faq-item {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  transition: border-color var(--motion-duration) var(--motion-ease);
}
.hf-city-faq-item.is-open { border-color: var(--gold); }
.hf-city-faq-trigger {
  width: 100%; background: transparent; border: 0;
  padding: 20px 24px; display: flex; justify-content: space-between;
  align-items: center; gap: 16px; cursor: pointer;
  font-family: var(--font-display); font-weight: 600;
  font-size: 1.02rem; color: var(--ink); text-align: left;
}
.hf-city-faq-icon {
  color: var(--red); flex-shrink: 0;
  transition: transform var(--motion-duration) var(--motion-ease);
}
.hf-city-faq-item.is-open .hf-city-faq-icon { transform: rotate(180deg); }
.hf-city-faq-answer {
  padding: 0 24px 22px;
  color: var(--ink-muted); line-height: 1.7; font-size: 0.98rem;
}
.hf-city-cta {
  background: var(--red); color: #fff; padding: 80px 24px;
  margin: 0 -24px; text-align: center;
}
.hf-city-cta-inner { max-width: 640px; margin: 0 auto; }
.hf-city-cta-title {
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 3.4vw, 2.6rem);
  color: #fff; margin: 0 0 14px;
}
.hf-city-cta-sub {
  color: color-mix(in oklab, #fff 80%, transparent);
  font-size: 1.05rem; margin: 0 0 28px;
}
.hf-city-cta-btn {
  background: #fff; color: var(--red); border: 1px solid var(--gold);
}
.hf-city-cta-btn:hover { background: var(--gold); color: #1A1614; }
`;

export function ServiceCityContent({
  service,
  city,
  locale,
  siblingUrl,
}: {
  service: ServiceShape;
  city: City;
  locale: string;
  siblingUrl: string;
}) {
  const tSvc = useTranslations("services");
  const t = useTranslations("serviceCity");

  const Icon = ICONS[service.icon] ?? Waves;
  const serviceLabel = tSvc(service.labelKey as any);
  const cityText = getCityText(city, locale);

  const providerName = service.key === "pool" ? "Poolburg" : "Supremacy Service";
  const providerBlurb =
    service.key === "pool"
      ? t("providerPoolBlurb", { city: city.name })
      : t("providerSupremacyBlurb", {
          service: serviceLabel.toLowerCase(),
          city: city.name,
        });

  const otherCities = CITIES.filter((c) => c.slug !== city.slug);
  const otherServices = CITY_SERVICES.filter((s) => s.key !== service.key);
  const faqs = getCityFaqs(service.key, city.name, locale);

  const trackedUrl = `${siblingUrl}${
    siblingUrl.includes("?") ? "&" : "?"
  }utm_source=homefront&utm_medium=referral&utm_campaign=service_${service.key}_${city.slug}`;

  return (
    <div className="hf-city">
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      <CityStructuredData
        serviceName={serviceLabel}
        serviceDescription={`${serviceLabel} in ${city.name}, ${city.state} — costs, vetted providers, and what to expect.`}
        cityName={city.name}
        citySlug={city.slug}
        state={city.state}
        lat={city.lat}
        lng={city.lng}
        locale={locale}
      />

      {/* HERO */}
      <section className="hf-city-hero">
        <div className="hf-city-hero-inner">
          <span className="hf-city-hero-icon">
            <Icon size={40} strokeWidth={1.4} />
          </span>
          <p className="accent-label">
            {city.name}, {city.state}
          </p>
          <h1 className="hf-city-hero-title">
            {serviceLabel} in {city.name}
          </h1>
          <p className="hf-city-hero-sub">{cityText.intro}</p>
        </div>
      </section>

      {/* LOCAL CONTEXT */}
      <section className="hf-city-section">
        <h2>{t("knowTitle", { service: serviceLabel.toLowerCase(), city: city.name })}</h2>
        <p>{cityText.localIssue}</p>

        <div className="hf-city-citybox">
          <div className="hf-city-citybox-item">
            <p className="hf-city-citybox-label">{t("populationLabel")}</p>
            <p className="hf-city-citybox-value">{city.population}</p>
          </div>
          <div className="hf-city-citybox-item">
            <p className="hf-city-citybox-label">{t("pricingLabel")}</p>
            <p className="hf-city-citybox-value">{cityText.pricingNote}</p>
          </div>
        </div>
      </section>

      {/* WHAT TO LOOK FOR + PROVIDER */}
      <section className="hf-city-section hf-city-section-alt">
        <h2>{t("lookForTitle", { service: serviceLabel.toLowerCase() })}</h2>
        <ul className="hf-city-checklist">
          <li>
            <ShieldCheck size={18} strokeWidth={2} />
            <span>{t("checklistLicense")}</span>
          </li>
          <li>
            <ShieldCheck size={18} strokeWidth={2} />
            <span>{t("checklistEstimate")}</span>
          </li>
          <li>
            <ShieldCheck size={18} strokeWidth={2} />
            <span>{t("checklistReferences", { city: city.name })}</span>
          </li>
          <li>
            <ShieldCheck size={18} strokeWidth={2} />
            <span>{t("checklistWarranty")}</span>
          </li>
          <li>
            <ShieldCheck size={18} strokeWidth={2} />
            <span>{t("checklistNoPressure")}</span>
          </li>
        </ul>

        <div className="hf-city-provider">
          <div className="hf-city-provider-body">
            <p className="hf-city-provider-eyebrow">
              {t("providerEyebrow", { city: city.name })}
            </p>
            <h3 className="hf-city-provider-title">{providerName}</h3>
            <p className="hf-city-provider-desc">{providerBlurb}</p>
          </div>
          <a
            href={trackedUrl}
            target="_blank"
            rel="noopener"
            className="hf-city-provider-link"
          >
            {t("visitSite")}
            <ArrowUpRight size={14} strokeWidth={2} />
          </a>
        </div>
      </section>

      {/* FAQ */}
      {faqs.length > 0 && (
        <section className="hf-city-faq">
          <h2>
            {t("faqTitle", { service: serviceLabel.toLowerCase(), city: city.name })}
          </h2>
          <div className="hf-city-faq-list">
            {faqs.map((f, i) => (
              <FaqItem key={i} faq={f} />
            ))}
          </div>
        </section>
      )}

      {/* CROSS-LINKS */}
      <section className="hf-city-crosslinks">
        <h3>{t("otherServicesTitle", { city: city.name })}</h3>
        <div className="hf-city-crosslink-grid">
          {otherServices.map((s) => (
            <Link
              key={s.key}
              href={`/services/${s.key}/${city.slug}`}
              className="hf-city-crosslink"
            >
              {tSvc(s.labelKey as any)}
            </Link>
          ))}
        </div>

        <h3>{t("otherCitiesTitle", { service: serviceLabel })}</h3>
        <div className="hf-city-crosslink-grid">
          {otherCities.map((c) => (
            <Link
              key={c.slug}
              href={`/services/${service.key}/${c.slug}`}
              className="hf-city-crosslink"
            >
              {c.name}
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="hf-city-cta">
        <div className="hf-city-cta-inner">
          <h2 className="hf-city-cta-title">
            {t("finalTitle", { service: serviceLabel.toLowerCase(), city: city.name })}
          </h2>
          <p className="hf-city-cta-sub">{t("finalSub")}</p>
          <Link
            href={`/quote?service=${service.key}&city=${city.slug}`}
            className="hf-city-cta-btn btn"
          >
            {t("ctaButton")}
            <ArrowRight size={16} strokeWidth={2} />
          </Link>
        </div>
      </section>
    </div>
  );
}

/* ---------- FAQ ITEM ---------- */
function FaqItem({ faq }: { faq: { q: string; a: string } }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`hf-city-faq-item ${open ? "is-open" : ""}`}>
      <button
        className="hf-city-faq-trigger"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span>{faq.q}</span>
        <ChevronDown size={18} strokeWidth={2} className="hf-city-faq-icon" />
      </button>
      {open && <div className="hf-city-faq-answer">{faq.a}</div>}
    </div>
  );
}
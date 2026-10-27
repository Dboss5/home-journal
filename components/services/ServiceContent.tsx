"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { BookOpen, Waves, Wind, Bug, Wrench, Sparkles, Trees, BrickWall, Check, ClipboardList, Compass, FileText, MapPin, Plus } from "lucide-react";
import type { ServiceData } from "@/lib/services";
import type { ServiceGuide } from "@/lib/serviceGuides";
import { CITIES } from "@/lib/locations";
import { HomeIllustration } from "@/components/home/HomeIllustrations";
import { SERVICE_IMAGES } from "@/lib/serviceImages";
import { getServiceUi, type ServiceExpansion } from "@/lib/serviceExpansion";
import { CALCULATORS } from "@/lib/calculators/engine";
import { getCalculatorContent } from "@/lib/calculators/content";
import styles from "./ServiceContent.module.css";

export function ServiceContent({ service, guide, expansion, reading }: {
  service: ServiceData; guide: ServiceGuide; expansion: ServiceExpansion;
  reading: {slug: string; title: string; excerpt: string}[];
}) {
  const t = useTranslations("services");
  const g = useTranslations("serviceGuide");
  const locale = useLocale();
  const name = t(service.key);
  const ui = getServiceUi(locale);
  const ServiceIcon = ({pool: Waves, hvac: Wind, pest: Bug, plumbing: Wrench, lighting: Sparkles, landscape: Trees, hardscape: BrickWall})[service.key] ?? Compass;
  const calculators = CALCULATORS.filter(c => c.service === service.key);
  const calculatorContent = getCalculatorContent(locale);
  const quote = `/quote?service=${service.key}`;
  const provider = service.key === "pool" ? "Poolburg" : "Supremacy Service";

  return (
    <div className={styles.page} lang={locale}>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <Link href="/services" className={styles.eyebrow}>{g("breadcrumb")}</Link>
          <h1>{expansion.seoTitle}</h1>
          <p className={styles.dek}>{expansion.heading}</p>
          <p>{guide.intro}</p>
          <div className={styles.actions}>
            <Link href={quote} className="btn btn-primary">{g("discuss")}</Link>
            <a href="#scope" className="btn btn-ghost">{g("explore")}</a>
          </div>
          <span className={styles.location}><MapPin size={15} aria-hidden="true" /> {g("location")}</span>
        </div>
        <figure className={styles.heroPhoto}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={SERVICE_IMAGES[service.key]} alt={expansion.imageAlt} width={1400} height={1050} fetchPriority="high" />
          <figcaption><ServiceIcon size={20} aria-hidden="true" /><span>{name}<small>{ui.region}</small></span></figcaption>
          <div className={styles.illustrationStamp} aria-hidden="true"><HomeIllustration kind={service.key} /></div>
        </figure>
      </section>

      <nav className={styles.jump} aria-label={g("navLabel", { name })}>
        <a href="#start">{g("jumpStart")}</a><a href="#scope">{g("jumpScope")}</a><a href="#quote">{g("jumpQuote")}</a><a href="#prepare">{g("jumpPrepare")}</a><a href="#questions">{g("jumpQuestions")}</a>
      </nav>

      <section id="service-options" className={`${styles.section} ${styles.options}`}>
        <header><span className={styles.eyebrow}>{ui.optionsLabel}</span><h2>{expansion.solutionsTitle}</h2><p>{expansion.overview}</p></header>
        <div className={styles.solutionGrid}>{expansion.solutions.map((item, index) => <article key={item.title}>
          <div className={styles.solutionTop}><ServiceIcon size={25} aria-hidden="true" /><span>0{index + 1}</span></div>
          <h3>{item.title}</h3><p>{item.body}</p><a href="#quote">{g("jumpQuote")}</a>
        </article>)}</div>
      </section>

      <section id="start" className={styles.section}>
        <header><span className={styles.eyebrow}>{g("startLabel")}</span><h2>{g("startTitle")}</h2></header>
        <div className={styles.cards}>
          {guide.scenarios.map((item, i) => <article className={styles.card} key={item.title}><span className={styles.number}>0{i + 1}</span><h3>{item.title}</h3><p>{item.body}</p></article>)}
        </div>
      </section>

      <section id="scope" className={`${styles.section} ${styles.scope}`}>
        <header><span className={styles.eyebrow}>{g("scopeLabel")}</span><h2>{g("scopeTitle")}</h2><p>{g("scopeNote")}</p></header>
        <div className={styles.scopeList}>
          {guide.scope.map((item, i) => <article key={item.title}><div className={styles.scopeIcon}>{i === 0 ? <Compass aria-hidden="true" /> : i === 1 ? <ClipboardList aria-hidden="true" /> : <Check aria-hidden="true" />}</div><div><h3>{item.title}</h3><p>{item.body}</p></div></article>)}
        </div>
      </section>

      <section id="quote" className={styles.section}>
        <header><span className={styles.eyebrow}>{g("quoteLabel")}</span><h2>{g("quoteTitle")}</h2></header>
        <div className={styles.quoteGrid}>
          <article className={styles.factors}><h3>{g("factorsTitle")}</h3><ul>{guide.drivers.map(item => <li key={item}><Check size={18} aria-hidden="true" /><span>{item}</span></li>)}</ul><p className={styles.note}>{g("priceNote")}</p></article>
          <article className={styles.quoteSheet}><span className={styles.eyebrow}>{g("sheetLabel")}</span><h3>{g("sheetTitle")}</h3><ol>{guide.questions.map(item => <li key={item}>{item}</li>)}</ol>{guide.article && <Link href={`/blog/${guide.article}`} className={styles.textLink}>{g("readGuide")}</Link>}</article>
        </div>
      </section>

      <section id="prepare" className={`${styles.section} ${styles.prepare}`}>
        <header><span className={styles.eyebrow}>{g("prepareLabel")}</span><h2>{g("prepareTitle")}</h2></header>
        <ol>{guide.prepare.map((item,i) => <li key={item}><span className={styles.prepNumber}>0{i+1}</span><p>{item}</p></li>)}</ol>
      </section>

      <section id="questions" className={`${styles.section} ${styles.faqSection}`}>
        <header><span className={styles.eyebrow}>{g("faqLabel")}</span><h2>{g("faqTitle")}</h2><p>{g("faqNote")}</p></header>
        <div>{guide.faqs.map(faq => <details className={styles.faq} key={faq.q}><summary>{faq.q}<Plus size={19} aria-hidden="true" /></summary><p>{faq.a}</p></details>)}</div>
      </section>

      {reading.length > 0 && <section className={`${styles.section} ${styles.reading}`}>
        <header><span className={styles.eyebrow}>{ui.guidesLabel}</span><h2>{ui.guidesTitle}</h2></header>
        <div className={styles.readingGrid}>{reading.map(post => <Link href={`/blog/${post.slug}`} key={post.slug}>
          <BookOpen size={23} aria-hidden="true" /><h3>{post.title}</h3><p>{post.excerpt}</p><span>{ui.read}</span>
        </Link>)}</div>
      </section>}

      {calculators.length > 0 && <section className={styles.section}>
        <header><span className={styles.eyebrow}>{calculatorContent.ui.label}</span><h2>{calculatorContent.ui.all}</h2></header>
        <div className={styles.readingGrid}>{calculators.map(calc => <Link href={`/calculators/${calc.slug}`} key={calc.slug}><ClipboardList size={24} aria-hidden="true" /><h3>{calculatorContent.calculators[calc.slug].title}</h3><p>{calculatorContent.calculators[calc.slug].description}</p><span>{calculatorContent.ui.open}</span></Link>)}</div>
      </section>}

      <aside className={styles.provider} aria-label={g("providerLabel")}>
        <FileText size={28} aria-hidden="true" /><div><span className={styles.eyebrow}>{g("providerEyebrow")}</span><h2>{g("providerTitle", { provider })}</h2><p>{g("providerBody", { provider, name })}</p><Link href="/our-brands" className={styles.textLink}>{g("brands")}</Link></div>
      </aside>

      <section className={styles.section}>
        <header><span className={styles.eyebrow}>{g("citiesLabel")}</span><h2>{g("citiesTitle", { name })}</h2></header>
        <div className={styles.cities}>{CITIES.map(city => <Link key={city.slug} href={`/services/${service.slug}/${city.slug}`}><MapPin size={14} aria-hidden="true" />{city.name}</Link>)}</div>
      </section>

      <div className={styles.source}><p>{g("sourceLabel")}: <a href={guide.source.url}>{guide.source.label}</a></p><p>{g("updated")}</p></div>
      <section className={styles.final}><span className={styles.eyebrow}>{g("finalLabel")}</span><h2>{g("finalTitle")}</h2><p>{g("finalBody")}</p><Link href={quote} className="btn btn-primary">{g("finalCta")}</Link></section>
    </div>
  );
}

"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Check, ClipboardList, Compass, FileText, MapPin, Plus } from "lucide-react";
import type { ServiceData } from "@/lib/services";
import { SERVICE_GUIDES } from "@/lib/serviceGuides";
import { CITIES } from "@/lib/locations";
import { HomeIllustration } from "@/components/home/HomeIllustrations";
import styles from "./ServiceContent.module.css";

export function ServiceContent({ service }: { service: ServiceData }) {
  const t = useTranslations("services");
  const guide = SERVICE_GUIDES[service.key];
  const name = t(service.key);
  const quote = `/quote?service=${service.key}`;
  const provider = service.key === "pool" ? "Poolburg" : "Supremacy Service";

  return (
    <div className={styles.page} lang="en">
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <Link href="/services" className={styles.eyebrow}>Homefront / Services</Link>
          <h1>{name}</h1>
          <p className={styles.dek}>{guide.kicker}</p>
          <p>{guide.intro}</p>
          <div className={styles.actions}>
            <Link href={quote} className="btn btn-primary">Discuss your project</Link>
            <a href="#scope" className="btn btn-ghost">Explore the service</a>
          </div>
          <span className={styles.location}><MapPin size={15} aria-hidden="true" /> Dallas–Fort Worth homeowner guide</span>
        </div>
        <div className={styles.heroArt}>
          <HomeIllustration kind={service.key} />
          <span className={styles.artLabel}>THE HOMEFRONT FIELD GUIDE</span>
        </div>
      </section>

      <nav className={styles.jump} aria-label={`${name} page sections`}>
        <a href="#start">Find your starting point</a><a href="#scope">Explore the work</a><a href="#quote">Compare quotes</a><a href="#prepare">Plan your visit</a><a href="#questions">Questions</a>
      </nav>

      <section id="start" className={styles.section}>
        <header><span className={styles.eyebrow}>01 / Your starting point</span><h2>What brings you here?</h2></header>
        <div className={styles.cards}>
          {guide.scenarios.map((item, i) => <article className={styles.card} key={item.title}><span className={styles.number}>0{i + 1}</span><h3>{item.title}</h3><p>{item.body}</p></article>)}
        </div>
      </section>

      <section id="scope" className={`${styles.section} ${styles.scope}`}>
        <header><span className={styles.eyebrow}>02 / Understand the work</span><h2>Look beyond the service name.</h2><p>Use these scopes as a conversation starter. The provider’s written proposal determines what is included.</p></header>
        <div className={styles.scopeList}>
          {guide.scope.map((item, i) => <article key={item.title}><div className={styles.scopeIcon}>{i === 0 ? <Compass aria-hidden="true" /> : i === 1 ? <ClipboardList aria-hidden="true" /> : <Check aria-hidden="true" />}</div><div><h3>{item.title}</h3><p>{item.body}</p></div></article>)}
        </div>
      </section>

      <section id="quote" className={styles.section}>
        <header><span className={styles.eyebrow}>03 / Before you approve</span><h2>A useful quote explains the whole job.</h2></header>
        <div className={styles.quoteGrid}>
          <article className={styles.factors}><h3>What changes the total?</h3><ul>{guide.drivers.map(item => <li key={item}><Check size={18} aria-hidden="true" /><span>{item}</span></li>)}</ul><p className={styles.note}>Prices need a dated, property-specific estimate. This guide does not claim a verified current DFW price survey.</p></article>
          <article className={styles.quoteSheet}><span className={styles.eyebrow}>Take this to the conversation</span><h3>Three questions worth asking.</h3><ol>{guide.questions.map(item => <li key={item}>{item}</li>)}</ol>{guide.article && <Link href={`/blog/${guide.article}`} className={styles.textLink}>Read the detailed guide</Link>}</article>
        </div>
      </section>

      <section id="prepare" className={`${styles.section} ${styles.prepare}`}>
        <header><span className={styles.eyebrow}>04 / Make the visit useful</span><h2>A little preparation goes a long way.</h2></header>
        <ol>{guide.prepare.map((item,i) => <li key={item}><span className={styles.prepNumber}>0{i+1}</span><p>{item}</p></li>)}</ol>
      </section>

      <section id="questions" className={`${styles.section} ${styles.faqSection}`}>
        <header><span className={styles.eyebrow}>05 / Clear answers</span><h2>Before you book.</h2><p>Start here, then discuss the details of your property with the provider.</p></header>
        <div>{guide.faqs.map(faq => <details className={styles.faq} key={faq.q}><summary>{faq.q}<Plus size={19} aria-hidden="true" /></summary><p>{faq.a}</p></details>)}</div>
      </section>

      <aside className={styles.provider} aria-label="Provider relationship">
        <FileText size={28} aria-hidden="true" /><div><span className={styles.eyebrow}>Know who receives your request</span><h2>Our connection to {provider}.</h2><p>{provider} is one of our service brands. Requests for {name.toLowerCase()} may be referred to that team. Confirm availability, scope, credentials, and the estimate directly before booking.</p><Link href="/our-brands" className={styles.textLink}>Meet our brands</Link></div>
      </aside>

      <section className={styles.section}>
        <header><span className={styles.eyebrow}>Around the metroplex</span><h2>Explore {name.toLowerCase()} near you.</h2></header>
        <div className={styles.cities}>{CITIES.map(city => <Link key={city.slug} href={`/services/${service.slug}/${city.slug}`}><MapPin size={14} aria-hidden="true" />{city.name}</Link>)}</div>
      </section>

      <div className={styles.source}><p>Further reading: <a href={guide.source.url}>{guide.source.label}</a></p><p>Editorial guide updated October 26, 2026. Scope and availability vary by property and provider.</p></div>
      <section className={styles.final}><span className={styles.eyebrow}>Your next step</span><h2>Tell us about your property.</h2><p>Start with the problem or project. Review the plan before you commit.</p><Link href={quote} className="btn btn-primary">Request a conversation</Link></section>
    </div>
  );
}

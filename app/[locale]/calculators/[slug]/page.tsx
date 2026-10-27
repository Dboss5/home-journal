import {notFound} from 'next/navigation';
import {setRequestLocale} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {getCalculatorContent, REFERENCES} from '@/lib/calculators/content';
import {CALCULATORS,getCalculator} from '@/lib/calculators/engine';
import {SERVICE_IMAGES} from '@/lib/serviceImages';
import {getServiceExpansion} from '@/lib/serviceExpansion';
import {serviceMetadata,SERVICE_BASE} from '@/lib/serviceSeo';
import {CalculatorForm} from '@/components/calculators/CalculatorForm';
import {CalculatorCards} from '@/components/calculators/CalculatorCards';
import styles from '@/components/calculators/Calculators.module.css';
type Props = {params: Promise<{locale: string; slug: string}>};
export function generateStaticParams() { return CALCULATORS.map(c => ({slug:c.slug})); }
export async function generateMetadata({params}: Props) {
  const {locale,slug} = await params;
  const calc = getCalculator(slug);
  if (!calc) return {};
  const copy = getCalculatorContent(locale).calculators[calc.slug];
  return serviceMetadata(locale, `/calculators/${slug}`, copy.title, copy.description, SERVICE_IMAGES[calc.service]);
}
export default async function CalculatorPage({params}: Props) {
  const {locale,slug} = await params;
  setRequestLocale(locale);
  const calc = getCalculator(slug);
  if (!calc) notFound();
  const {ui,calculators} = getCalculatorContent(locale);
  const copy = calculators[calc.slug];
  const expansion = getServiceExpansion(calc.service,locale);
  const pageUrl = `${SERVICE_BASE}/${locale}/calculators/${slug}`;
  const schema = {'@context':'https://schema.org','@graph':[
    {'@type':'WebPage','@id':pageUrl,url:pageUrl,name:copy.title,description:copy.description,inLanguage:locale,primaryImageOfPage:`${SERVICE_BASE}${SERVICE_IMAGES[calc.service]}`},
    {'@type':'BreadcrumbList',itemListElement:[{name:ui.home,url:`${SERVICE_BASE}/${locale}`},{name:ui.all,url:`${SERVICE_BASE}/${locale}/calculators`},{name:copy.title,url:pageUrl}].map((b,i) => ({'@type':'ListItem',position:i+1,name:b.name,item:b.url}))},
    {'@type':'FAQPage',mainEntity:[{'@type':'Question',name:copy.question,acceptedAnswer:{'@type':'Answer',text:copy.answer}}]},
  ]};
  return <div className={styles.page}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,'\\u003c')}} />
    <nav className={styles.breadcrumbs} aria-label={ui.all}><Link href="/">{ui.home}</Link><span aria-hidden="true">/</span><Link href="/calculators">{ui.all}</Link><span aria-hidden="true">/</span><span>{copy.title}</span></nav>
    <header className={styles.hero}><div><span className={styles.eyebrow}>{ui.label}</span><h1>{copy.title}</h1><p>{copy.description}</p><p className={styles.small}>{ui.privacy}</p></div>
      <figure className={styles.photo}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={SERVICE_IMAGES[calc.service]} alt={expansion.imageAlt} width={1400} height={1050} fetchPriority="high" />
        <figcaption>{ui.estimate}</figcaption>
      </figure>
    </header>
    <CalculatorForm calculator={calc} locale={locale} />
    <section className={styles.method}><h2>{ui.method}</h2><p className={styles.formula}>{copy.formula}</p><h3>{ui.before}</h3><p>{copy.caveat}</p><div className={styles.references}><span>{ui.source}:</span>{REFERENCES[calc.slug].map(source => <a key={source.url} href={source.url}>{source.label}</a>)}</div></section>
    <section className={styles.faq}><h2>{ui.faq}</h2><details><summary>{copy.question}</summary><p>{copy.answer}</p></details></section>
    <aside className={styles.next}><p>{ui.provider} {calc.service === 'pool' ? 'Poolburg' : 'Supremacy Service'}.</p><Link href={`/services/${calc.serviceSlug}`} className="btn btn-ghost">{ui.guide}</Link><Link href={`/quote?service=${calc.service}`} className="btn btn-primary">{ui.quote}</Link></aside>
    <section className={styles.related}><h2>{ui.related}</h2><CalculatorCards locale={locale} exclude={calc.slug} /></section>
  </div>;
}

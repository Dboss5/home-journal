import {setRequestLocale} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {getCalculatorContent} from '@/lib/calculators/content';
import {CalculatorCards} from '@/components/calculators/CalculatorCards';
import {serviceMetadata, SERVICE_BASE} from '@/lib/serviceSeo';
import {CALCULATORS} from '@/lib/calculators/engine';
import styles from '@/components/calculators/Calculators.module.css';
export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const {ui} = getCalculatorContent(locale);
  return serviceMetadata(locale, '/calculators', ui.all, ui.description, '/images/services/pool.webp');
}
export default async function CalculatorsPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const {ui,calculators} = getCalculatorContent(locale);
  const schema = {'@context':'https://schema.org','@type':'CollectionPage',name:ui.all,url:`${SERVICE_BASE}/${locale}/calculators`,inLanguage:locale,
    mainEntity:{'@type':'ItemList',itemListElement:CALCULATORS.map((c,i) => ({'@type':'ListItem',position:i+1,name:calculators[c.slug].title,url:`${SERVICE_BASE}/${locale}/calculators/${c.slug}`}))}};
  return <div className={styles.page}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,'\\u003c')}} />
    <nav className={styles.breadcrumbs} aria-label={ui.all}><Link href="/">{ui.home}</Link><span aria-hidden="true">/</span><span>{ui.all}</span></nav>
    <header className={styles.indexHero}><span className={styles.eyebrow}>{ui.label}</span><h1>{ui.title}</h1><p>{ui.description}</p><p className={styles.small}>{ui.privacy}</p></header>
    <CalculatorCards locale={locale} />
  </div>;
}

import { Link } from '@/i18n/navigation';
import { getCalculatorContent } from '@/lib/calculators/content';
import { CALCULATORS, type CalculatorSlug } from '@/lib/calculators/engine';
import { SERVICE_IMAGES } from '@/lib/serviceImages';
import { getServiceExpansion } from '@/lib/serviceExpansion';
import styles from './Calculators.module.css';
export function CalculatorCards({locale, exclude}: {locale: string; exclude?: CalculatorSlug}) {
  const {calculators,ui} = getCalculatorContent(locale);
  return <div className={styles.grid}>{CALCULATORS.filter(c => c.slug !== exclude).map(calc => <Link key={calc.slug} href={`/calculators/${calc.slug}`} className={styles.card}>
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src={SERVICE_IMAGES[calc.service]} alt={getServiceExpansion(calc.service, locale).imageAlt} width={640} height={400} loading="lazy" />
    <div><span className={styles.eyebrow}>{ui.estimate}</span><h2>{calculators[calc.slug].title}</h2><p>{calculators[calc.slug].description}</p><strong>{ui.open} →</strong></div>
  </Link>)}</div>;
}

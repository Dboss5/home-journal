import en from './en.json';
import es from './es.json';
import fr from './fr.json';
import type { CalculatorSlug } from './engine';
const locales = {en, es, fr};
export function getCalculatorContent(locale: string) { return locales[locale as keyof typeof locales] ?? en; }
export const REFERENCES: Record<CalculatorSlug, {label: string; url: string}[]> = {
  'pool-volume': [{label: 'NIST · SI conversion factors', url: 'https://www.nist.gov/pml/special-publication-811/nist-guide-si-appendix-b-conversion-factors/nist-guide-si-appendix-b8'}],
  'ac-running-cost': [{label: 'U.S. EIA · Measuring electricity', url: 'https://www.eia.gov/energyexplained/electricity/measuring-electricity.php'}],
  'water-leak-waste': [{label: 'U.S. EPA WaterSense · Fix a Leak', url: 'https://www.epa.gov/watersense/fix-leak-week'}],
  'holiday-light-cost': [{label: 'U.S. EIA · Measuring electricity', url: 'https://www.eia.gov/energyexplained/electricity/measuring-electricity.php'}, {label: 'U.S. CPSC · Seasonal lighting', url: 'https://www.cpsc.gov/Business--Manufacturing/Business-Education/Business-Guidance/Household-Electrical-Products/Seasonal-and-Decorative-Lighting-Products'}],
  'mulch-quantity': [{label: 'Iowa State University Extension · Mulch quantity', url: 'https://yardandgarden.extension.iastate.edu/how-to/how-determine-amount-mulch-needed-garden-bed'}],
  'patio-pavers': [{label: 'Keystone Hardscapes · Technical guide', url: 'https://www.keystonehardscapes.com/technical-resources/KHS%20Tech%20Guide.pdf'}],
};

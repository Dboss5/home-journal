import en from './serviceExpansion.en.json';
import es from './serviceExpansion.es.json';
import fr from './serviceExpansion.fr.json';
import ui from './serviceExpansionUi.json';

export interface ServiceExpansion {
  seoTitle: string; description: string; heading: string; overview: string;
  solutionsTitle: string; solutions: {title: string; body: string}[];
  faqs: {q: string; a: string}[]; imageAlt: string; articles: string[];
}
const all: Record<string, Record<string, ServiceExpansion>> = { en, es, fr };
export function getServiceExpansion(key: string, locale: string): ServiceExpansion {
  const value = all[locale]?.[key];
  if (!value) throw new Error(`Missing service expansion: ${locale}/${key}`);
  return value;
}
export function getServiceUi(locale: string) {
  return ui[locale as keyof typeof ui] ?? ui.en;
}

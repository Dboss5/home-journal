import { getServiceGuide } from './serviceGuidesLocalized';
import { getServiceExpansion } from './serviceExpansion';
import { getCityUi, cityServiceKey } from './cityProfiles';
export interface CityFaq {q: string; a: string}
// Exact same answers are rendered in native details and serialized in FAQ data.
export function getCityFaqs(serviceKey: string, cityName: string, locale: string): CityFaq[] {
 const key=cityServiceKey(serviceKey);const guide=getServiceGuide(key,locale);
 const expansion=getServiceExpansion(key,locale);const ui=getCityUi(locale);
 const label=expansion.seoTitle.split(' Dallas')[0].replace(/ (in|en|à)$/, '');
 return [
  {q:ui.faqPrice.replace('{service}',label).replace('{city}',cityName),a:ui.faqPriceAnswer},
  ...guide.faqs,...expansion.faqs,
  {q:ui.faqAccess.replace('{city}',cityName),a:ui.faqAccessAnswer},
 ];
}

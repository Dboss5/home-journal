import en from './cityProfiles.en.json';
import es from './cityProfiles.es.json';
import fr from './cityProfiles.fr.json';
import ui from './cityPageUi.json';
import credits from './cityImageCredits.json';
export interface CityProfile {
 heading: string; intro: string; context: string; imageAlt: string; checks: string[];
 places: string[]; source: {label: string; url: string}; serviceNotes: Record<string,string>;
}
const profiles: Record<string, Record<string,CityProfile>> = {en,es,fr};
export function getCityProfile(slug: string, locale: string): CityProfile {
 const value=profiles[locale]?.[slug];
 if(!value) throw new Error(`Missing city profile: ${locale}/${slug}`);
 return value;
}
export function getCityUi(locale: string) {return ui[locale as keyof typeof ui] ?? ui.en;}
export function getCityImageCredit(slug: string) {return credits[slug as keyof typeof credits];}
export function cityServiceKey(slug: string) {return slug === 'pest-control' ? 'pest' : slug === 'holiday-lighting' ? 'lighting' : slug;}

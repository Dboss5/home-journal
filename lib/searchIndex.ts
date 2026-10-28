import 'server-only';
import {getAllPosts} from './blog';
import {SERVICES} from './services';
import {CITIES} from './locations';
import {getServiceExpansion} from './serviceExpansion';
import {getCityProfile} from './cityProfiles';
import {CALCULATORS} from './calculators/engine';
import {getCalculatorContent} from './calculators/content';
import en from '@/messages/en.json';
import es from '@/messages/es.json';
import fr from '@/messages/fr.json';
import type {SearchEntry} from './search';
export function getSearchIndex(locale: string): SearchEntry[] {
  const entries: SearchEntry[]=[];
  const names=({en,es,fr}[locale as "en"|"es"|"fr"] ?? en).services;
  for(const service of SERVICES){
    const content=getServiceExpansion(service.key,locale);
    entries.push({href:`/services/${service.slug}`,title:content.seoTitle,description:content.description,kind:'service',keywords:content.overview});
    for(const city of CITIES){
      const profile=getCityProfile(city.slug,locale);
      entries.push({href:`/services/${service.slug}/${city.slug}`,title:`${names[service.key as keyof typeof names]} · ${city.name}`,description:profile.serviceNotes[service.key],kind:'city',keywords:`${city.name} ${content.seoTitle} ${profile.intro}`});
    }
  }
  for(const post of getAllPosts(locale)) entries.push({href:`/blog/${post.slug}`,title:post.title,description:post.excerpt,kind:'article'});
  const calculators=getCalculatorContent(locale);
  for(const calc of CALCULATORS){const c=calculators.calculators[calc.slug];entries.push({href:`/calculators/${calc.slug}`,title:c.title,description:c.description,kind:'calculator',keywords:c.instructions});}
  return entries;
}

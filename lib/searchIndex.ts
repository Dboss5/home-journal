import 'server-only';
import {getAllPosts} from './blog';
import {SERVICES} from './services';
import {CITIES} from './locations';
import {getServiceExpansion} from './serviceExpansion';
import {getCityProfile} from './cityProfiles';
import {CALCULATORS} from './calculators/engine';
import {getCalculatorContent} from './calculators/content';
import {normalizeSearch, type SearchEntry} from './search';
import en from '@/messages/en.json';
import es from '@/messages/es.json';
import fr from '@/messages/fr.json';
function articleService(category: string): string | undefined {
  const value=normalizeSearch(category);
  if (/pool|piscin/.test(value)) return 'pool';
  if (/hvac|cvc|climat|chauffage/.test(value)) return 'hvac';
  if (/plumb|fontan|plomer/.test(value)) return 'plumbing';
  if (/pest|plagas|nuisibles|antiparasitaire/.test(value)) return 'pest';
  if (/electr/.test(value)) return 'electrical';
  if (/light|ilumina|eclairage/.test(value)) return 'lighting';
}
function plainBody(content: string) {
  return content.replace(/```[\s\S]*?```/g,' ').replace(/<[^>]*>/g,' ').replace(/\[([^\]]+)\]\([^)]+\)/g,'$1').replace(/[#*_`]/g,' ').replace(/\s+/g,' ').trim();
}
export function getSearchIndex(locale: string): SearchEntry[] {
  const entries: SearchEntry[]=[];
  const messages=({en,es,fr}[locale as 'en'|'es'|'fr'] ?? en);const names=messages.services;
  for(const service of SERVICES){
    const content=getServiceExpansion(service.key,locale);const brand=service.key==='pool'?'Poolburg':'Supremacy Service';
    entries.push({href:`/services/${service.slug}`,title:content.seoTitle,description:content.description,kind:'service',service:service.key,brand,keywords:content.overview});
    for(const city of CITIES){
      const profile=getCityProfile(city.slug,locale);
      entries.push({href:`/services/${service.slug}/${city.slug}`,title:`${names[service.key as keyof typeof names]} · ${city.name}`,description:profile.serviceNotes[service.key],kind:'city',service:service.key,brand,city:city.slug,cityName:city.name,
        keywords:`${content.overview} ${city.name} ${names[service.key as keyof typeof names]} ${profile.intro} ${profile.context} ${profile.places.join(' ')} ${profile.checks.join(' ')} ${profile.faqs?.map(f=>`${f.q} ${f.a}`).join(' ') ?? ''}`});
    }
  }
  for(const post of getAllPosts(locale)){
    const service=articleService(post.category);
    entries.push({href:`/blog/${post.slug}`,title:post.title,description:post.excerpt,kind:'article',service,brand:service==='pool'?'Poolburg':service?'Supremacy Service':undefined,keywords:plainBody(post.content)});
  }
  const calculators=getCalculatorContent(locale);
  for(const calc of CALCULATORS){const c=calculators.calculators[calc.slug];entries.push({href:`/calculators/${calc.slug}`,title:c.title,description:c.description,kind:'calculator',service:calc.service,brand:calc.service==='pool'?'Poolburg':'Supremacy Service',keywords:`${c.instructions} ${c.formula}`});}
  entries.push(
    {href:'/',title:'Homefront Journal',description:messages.home.heroSub,kind:'page'},
    {href:'/services',title:messages.home.servicesTitle,description:messages.home.servicesSub,kind:'page'},
    {href:'/blog',title:messages.home.journalTitle,description:messages.home.journalSub,kind:'page'},
    {href:'/calculators',title:calculators.ui.all,description:calculators.ui.description,kind:'page'},
    {href:'/about',title:messages.about.title,description:messages.about.lead,kind:'page'},
    {href:'/our-brands',title:messages.footer.brands,description:messages.home.whyBody2,kind:'page'},
    {href:'/quote',title:messages.quote.title,description:messages.quote.subtitle,kind:'page',keywords:messages.nav.quote},
  );
  return entries;
}

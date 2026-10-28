import type {Metadata} from 'next';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {HomeContent} from '@/components/home/HomeContent';
import {serviceMetadata, SERVICE_BASE} from '@/lib/serviceSeo';

type Props = {params: Promise<{locale: string}>};
export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale,namespace:'home'});
  return serviceMetadata(locale,'',t('metaTitle'),t('metaDescription'),'/images/hero/homefront-backyard.webp');
}
export default async function HomePage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations({locale,namespace:'home'});
  const faqs = t.raw('faqs') as {q: string; a: string}[];
  const url = `${SERVICE_BASE}/${locale}`;
  const schema = {'@context':'https://schema.org','@graph':[
    {'@type':'WebSite','@id':`${url}#website`,name:'Homefront Journal',url,inLanguage:locale,description:t('metaDescription')},
    {'@type':'WebPage','@id':url,url,name:t('heroTitle'),description:t('metaDescription'),inLanguage:locale,
      isPartOf:{'@id':`${url}#website`},primaryImageOfPage:`${SERVICE_BASE}/images/hero/homefront-backyard.webp`,hasPart:{'@id':`${url}#home-questions`}},
    {'@type':'FAQPage','@id':`${url}#home-questions`,mainEntity:faqs.map(faq=>({'@type':'Question',name:faq.q,acceptedAnswer:{'@type':'Answer',text:faq.a}}))},
  ]};
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,'\\u003c')}} />
    <HomeContent />
  </>;
}

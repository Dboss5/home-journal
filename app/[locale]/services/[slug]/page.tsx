import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { getService, SERVICES } from "@/lib/services";
import { getServiceGuide } from "@/lib/serviceGuidesLocalized";
import { ServiceContent } from "@/components/services/ServiceContent";

import { getServiceExpansion, getServiceUi } from "@/lib/serviceExpansion";
import { SERVICE_IMAGES } from "@/lib/serviceImages";
import { serviceMetadata, SERVICE_BASE } from "@/lib/serviceSeo";
import { getPostBySlug } from "@/lib/blog";

export async function generateMetadata({ params }: {params: Promise<{locale: string; slug: string}>}): Promise<Metadata> {
  const {locale, slug} = await params;
  const service = getService(slug);
  if (!service) return {};
  const content = getServiceExpansion(service.key, locale);
  return serviceMetadata(locale, `/services/${slug}`, content.seoTitle, content.description, SERVICE_IMAGES[service.key]);
}

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const service = getService(slug);
  if (!service) notFound();

  const expansion = getServiceExpansion(service.key, locale);
  const baseGuide = getServiceGuide(service.key, locale);
  const guide = {...baseGuide, faqs: [...baseGuide.faqs, ...expansion.faqs]};
  const ui = getServiceUi(locale);
  const pageUrl = `${SERVICE_BASE}/${locale}/services/${slug}`;
  const reading = expansion.articles.map(article => getPostBySlug(article, locale))
    .filter((post): post is NonNullable<typeof post> => post !== null)
    .map(post => ({slug: post.slug, title: post.title, excerpt: post.excerpt}));
  const schema = {
    '@context': 'https://schema.org', '@graph': [
      {'@type': 'WebPage', '@id': pageUrl, url: pageUrl, name: expansion.seoTitle,
        description: expansion.description, inLanguage: locale,
        primaryImageOfPage: `${SERVICE_BASE}${SERVICE_IMAGES[service.key]}`},
      {'@type': 'Service', '@id': `${pageUrl}#service`, name: expansion.seoTitle,
        description: expansion.overview, url: pageUrl,
        areaServed: {'@type': 'Place', name: 'Dallas–Fort Worth, Texas'},
        provider: {'@type': 'Organization', name: service.key === 'pool' ? 'Poolburg' : 'Supremacy Service'}},
      {'@type': 'BreadcrumbList', itemListElement: [
        {'@type': 'ListItem', position: 1, name: ui.home, item: `${SERVICE_BASE}/${locale}`},
        {'@type': 'ListItem', position: 2, name: ui.services, item: `${SERVICE_BASE}/${locale}/services`},
        {'@type': 'ListItem', position: 3, name: expansion.seoTitle, item: pageUrl},
      ]},
      {'@type': 'FAQPage', mainEntity: guide.faqs.map(faq => ({'@type': 'Question', name: faq.q,
        acceptedAnswer: {'@type': 'Answer', text: faq.a}}))},
    ],
  };
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(schema).replace(/</g, '\\u003c')}} />
    <ServiceContent service={service} guide={guide} expansion={expansion} reading={reading} />
  </>;
}
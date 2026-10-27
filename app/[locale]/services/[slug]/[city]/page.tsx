import { getServiceExpansion } from "@/lib/serviceExpansion";
import { SERVICE_IMAGES } from "@/lib/serviceImages";
import { serviceMetadata } from "@/lib/serviceSeo";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import {
  CITIES,
  CITY_SERVICES,
  getCity,
  getService,
  resolveSiblingUrl,
} from "@/lib/locations";
import { ServiceCityContent } from "@/components/services/ServiceCityContent";

export function generateStaticParams() {
  const locales = ["en", "es", "fr"];
  const params: { locale: string; slug: string; city: string }[] = [];

  for (const locale of locales) {
    for (const service of CITY_SERVICES) {
      for (const city of CITIES) {
        params.push({
          locale,
          slug: service.key,
          city: city.slug,
        });
      }
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string; city: string }>;
}): Promise<Metadata> {
  const { locale, slug, city: citySlug } = await params;
  const service = getService(slug);
  const city = getCity(citySlug);

  if (!service || !city) return {};

  const key = slug === 'pest-control' ? 'pest' : slug === 'holiday-lighting' ? 'lighting' : slug;
  const content = getServiceExpansion(key, locale);
  const label = content.seoTitle.split(' Dallas')[0].replace(/ (in|en|à)$/, '');
  const title = `${label} ${{en: 'in', es: 'en', fr: 'à'}[locale] ?? 'in'} ${city.name}, TX`;
  const description = `${title}. ${content.description}`;
  return serviceMetadata(locale, `/services/${slug}/${citySlug}`, title, description, SERVICE_IMAGES[key]);
}

export default async function ServiceCityPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string; city: string }>;
}) {
  const { locale, slug, city: citySlug } = await params;
  setRequestLocale(locale);

  const service = getService(slug);
  const city = getCity(citySlug);

  if (!service || !city) notFound();

  // Resolve on the server — pass plain strings to the client
  const siblingUrl = resolveSiblingUrl(service, city.slug);

  // Strip the service down to serializable-only fields
  const serializableService = {
    key: service.key,
    labelKey: service.labelKey,
    icon: service.icon,
  };

  return (
    <ServiceCityContent
      service={serializableService}
      city={city}
      locale={locale}
      siblingUrl={siblingUrl}
    />
  );
}
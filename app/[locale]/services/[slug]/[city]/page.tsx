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

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://homefrontjournal.com";

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

  const serviceName: Record<string, Record<string, string>> = {
    en: {
      pool: "Pool Service",
      hvac: "HVAC Service",
      "pest-control": "Pest Control",
      plumbing: "Plumbing Repair",
      "holiday-lighting": "Holiday Lighting",
      landscape: "Landscaping",
      hardscape: "Hardscaping",
    },
    es: {
      pool: "Servicio de Piscina",
      hvac: "Servicio de Climatización",
      "pest-control": "Control de Plagas",
      plumbing: "Reparación de Plomería",
      "holiday-lighting": "Iluminación Navideña",
      landscape: "Jardinería",
      hardscape: "Paisajismo Duro",
    },
    fr: {
      pool: "Entretien de Piscine",
      hvac: "Service CVC",
      "pest-control": "Lutte Antiparasitaire",
      plumbing: "Réparation de Plomberie",
      "holiday-lighting": "Éclairage des Fêtes",
      landscape: "Aménagement Paysager",
      hardscape: "Aménagement Minéral",
    },
  };

  const name = serviceName[locale]?.[slug] ?? serviceName.en[slug] ?? slug;
  const title = `${name} in ${city.name}, TX — Costs, Vetted Pros, and What to Expect`;

  const descriptions: Record<string, string> = {
    en: `What ${name.toLowerCase()} costs in ${city.name}, TX, what to look for in a pro, and how to get matched with someone vetted. Real DFW numbers.`,
    es: `Cuánto cuesta ${name.toLowerCase()} en ${city.name}, TX, qué buscar en un profesional, y cómo encontrar uno verificado. Números reales de DFW.`,
    fr: `Combien coûte ${name.toLowerCase()} à ${city.name}, TX, ce qu'il faut rechercher chez un pro, et comment trouver quelqu'un de vérifié.`,
  };
  const description = descriptions[locale] ?? descriptions.en;

  return {
    metadataBase: new URL(BASE_URL),
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/${locale}/services/${slug}/${citySlug}`,
      languages: {
        en: `${BASE_URL}/en/services/${slug}/${citySlug}`,
        es: `${BASE_URL}/es/services/${slug}/${citySlug}`,
        fr: `${BASE_URL}/fr/services/${slug}/${citySlug}`,
        "x-default": `${BASE_URL}/en/services/${slug}/${citySlug}`,
      },
    },
    openGraph: {
      type: "website",
      title,
      description,
      url: `${BASE_URL}/${locale}/services/${slug}/${citySlug}`,
    },
  };
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
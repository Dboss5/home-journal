interface CityStructuredDataProps {
  serviceName: string;
  serviceSlug: string;
  serviceDescription: string;
  cityName: string;
  citySlug: string;
  state: string;
  lat: number;
  lng: number;
  locale: string;
}

export function CityStructuredData({
  serviceName,
  serviceSlug,
  serviceDescription,
  cityName,
  citySlug,
  state,
  lat,
  lng,
  locale,
}: CityStructuredDataProps) {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://homefrontjournal.com";

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${serviceName} ${{en: "in", es: "en", fr: "à"}[locale] ?? "in"} ${cityName}, ${state}`,
    description: serviceDescription,
    areaServed: {
      "@type": "City",
      name: cityName,
      address: {
        "@type": "PostalAddress",
        addressLocality: cityName,
        addressRegion: state,
        addressCountry: "US",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: lat,
        longitude: lng,
      },
    },
    provider: {
      "@type": "Organization",
      name: serviceSlug === "pool" ? "Poolburg" : "Supremacy Service",
      url: serviceSlug === "pool" ? "https://poolburg.com" : "https://supremacyservice.com",
    },
    url: `${base}/${locale}/services/${serviceSlug}/${citySlug}`,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: ({en: "Home", es: "Inicio", fr: "Accueil"})[locale] ?? "Home",
        item: `${base}/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: ({en: "Services", es: "Servicios", fr: "Services"})[locale] ?? "Services",
        item: `${base}/${locale}/services`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${serviceName} ${{en: "in", es: "en", fr: "à"}[locale] ?? "in"} ${cityName}`,
        item: `${base}/${locale}/services/${serviceSlug}/${citySlug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema).replace(/</g, "\\u003c") }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
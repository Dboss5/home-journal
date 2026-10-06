interface CityStructuredDataProps {
  serviceName: string;
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
    name: `${serviceName} in ${cityName}, ${state}`,
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
      name: "Homefront Journal",
      url: base,
    },
    url: `${base}/${locale}/services/${serviceName
      .toLowerCase()
      .replace(/\s+/g, "-")}/${citySlug}`,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${base}/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: `${base}/${locale}/services`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${serviceName} in ${cityName}`,
        item: `${base}/${locale}/services/${serviceName
          .toLowerCase()
          .replace(/\s+/g, "-")}/${citySlug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
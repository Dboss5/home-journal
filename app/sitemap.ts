import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/blog";
import { CITIES, CITY_SERVICES } from "@/lib/locations";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://homefrontjournal.com";

const LOCALES = ["en", "es", "fr"] as const;

const STATIC_ROUTES = [
  { path: "", priority: 1.0, changeFrequency: "weekly" as const },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/blog", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/our-brands", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/quote", priority: 0.9, changeFrequency: "monthly" as const },
];

const SERVICE_SLUGS = [
  "pool",
  "hvac",
  "pest-control",
  "plumbing",
  "holiday-lighting",
  "landscape",
  "hardscape",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  const now = new Date();

  // Static routes × locales
  for (const locale of LOCALES) {
    for (const route of STATIC_ROUTES) {
      entries.push({
        url: `${BASE_URL}/${locale}${route.path}`,
        lastModified: now,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates: {
          languages: Object.fromEntries(
            LOCALES.map((l) => [l, `${BASE_URL}/${l}${route.path}`])
          ),
        },
      });
    }

    // Service category pages
    for (const slug of SERVICE_SLUGS) {
      entries.push({
        url: `${BASE_URL}/${locale}/services/${slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.8,
        alternates: {
          languages: Object.fromEntries(
            LOCALES.map((l) => [l, `${BASE_URL}/${l}/services/${slug}`])
          ),
        },
      });
    }

    // City × service pages
    for (const service of CITY_SERVICES) {
      for (const city of CITIES) {
        const path = `/services/${service.key}/${city.slug}`;
        entries.push({
          url: `${BASE_URL}/${locale}${path}`,
          lastModified: now,
          changeFrequency: "monthly",
          priority: 0.7,
          alternates: {
            languages: Object.fromEntries(
              LOCALES.map((l) => [l, `${BASE_URL}/${l}${path}`])
            ),
          },
        });
      }
    }

    // Blog posts
    const slugs = getAllSlugs(locale);
    for (const slug of slugs) {
      entries.push({
        url: `${BASE_URL}/${locale}/blog/${slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: {
          languages: Object.fromEntries(
            LOCALES.map((l) => [l, `${BASE_URL}/${l}/blog/${slug}`])
          ),
        },
      });
    }
  }

  return entries;
}
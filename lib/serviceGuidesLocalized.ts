import { SERVICE_GUIDES, type ServiceGuide } from "./serviceGuides";
import es from "./serviceGuides.es.json";
import fr from "./serviceGuides.fr.json";
import type { Locale } from "@/i18n/routing";

const guides: Record<Locale, Record<string, ServiceGuide>> = { en: SERVICE_GUIDES, es, fr };
export function getServiceGuide(key: string, locale: string): ServiceGuide {
  const guide = guides[locale as Locale]?.[key];
  if (!guide) throw new Error(`Missing service guide: ${locale}/${key}`);
  return guide;
}

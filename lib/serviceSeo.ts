import type { Metadata } from 'next';
export const SERVICE_BASE = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://homefrontjournal.com').replace(/\/$/, '');
export function serviceMetadata(locale: string, path: string, title: string, description: string, image?: string): Metadata {
  const url = `${SERVICE_BASE}/${locale}${path}`;
  const imageUrl = image ? `${SERVICE_BASE}${image}` : undefined;
  return {
    metadataBase: new URL(SERVICE_BASE), title, description,
    alternates: { canonical: url, languages: {
      ...Object.fromEntries(['en','es','fr'].map(l => [l, `${SERVICE_BASE}/${l}${path}`])),
      'x-default': `${SERVICE_BASE}/en${path}`,
    } },
    openGraph: { type: 'website', title, description, url,
      locale: {en: 'en_US', es: 'es_ES', fr: 'fr_FR'}[locale],
      ...(imageUrl ? {images: [{url: imageUrl, alt: title}]} : {}),
    },
    twitter: {card: 'summary_large_image', title, description, ...(imageUrl ? {images: [imageUrl]} : {})},
  };
}

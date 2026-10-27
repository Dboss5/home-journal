import type { Metadata } from "next";
import { getServiceUi } from "@/lib/serviceExpansion";
import { serviceMetadata } from "@/lib/serviceSeo";
import { setRequestLocale } from "next-intl/server";
import { ServicesIndexContent } from "@/components/services/ServicesIndexContent";

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;
  const ui = getServiceUi(locale);
  return serviceMetadata(locale, '/services', ui.directoryTitle, ui.directoryDescription, '/images/services/pool.webp');
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ServicesIndexContent />;
}
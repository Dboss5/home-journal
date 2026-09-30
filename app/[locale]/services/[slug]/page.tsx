import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { getService, SERVICES } from "@/lib/services";
import { ServiceContent } from "@/components/services/ServiceContent";

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

  return <ServiceContent service={service} />;
}
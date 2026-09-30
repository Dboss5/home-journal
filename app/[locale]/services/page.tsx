import { setRequestLocale } from "next-intl/server";
import { ServicesIndexContent } from "@/components/services/ServicesIndexContent";

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ServicesIndexContent />;
}
import { setRequestLocale } from "next-intl/server";
import { OurBrandsContent } from "@/components/brands/OurBrandsContent";

export default async function OurBrandsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <OurBrandsContent />;
}
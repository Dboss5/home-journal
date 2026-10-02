import { setRequestLocale } from "next-intl/server";
import { QuoteContent } from "@/components/quote/QuoteContent";

export default async function QuotePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <QuoteContent />;
}
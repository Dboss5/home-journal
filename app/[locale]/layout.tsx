import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { PreferencesProvider } from "@/components/providers/PreferencesProvider";
import { getServerPreferences } from "@/lib/preferences.server";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PreferencesPanel } from "@/components/layout/PreferencesPanel";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);

  const [messages, prefs] = await Promise.all([
    getMessages(),
    getServerPreferences(),
  ]);

  return (
    <NextIntlClientProvider messages={messages}>
      <PreferencesProvider initial={prefs}>
        <Header />
        <main className="hf-main">{children}</main>
        <Footer />
        <PreferencesPanel />
      </PreferencesProvider>
    </NextIntlClientProvider>
  );
}
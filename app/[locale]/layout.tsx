import { notFound } from "next/navigation";
import {
  LOCALES,
  isValidLocale,
  getDict,
  type Locale,
} from "@/lib/i18n";
import { Header } from "@/components/Header";
import { AppDownloadBanner } from "@/components/AppDownloadBanner";
import { Footer } from "@/components/Footer";
import { DictionaryProvider } from "@/components/DictionaryProvider";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const messages = getDict(locale as Locale);

  return (
    <DictionaryProvider locale={locale as Locale} messages={messages}>
      <Header />
      <AppDownloadBanner />
      {children}
      <Footer />
    </DictionaryProvider>
  );
}

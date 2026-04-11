import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PrivacyContent } from "../../privacy/PrivacyContent";
import {
  LOCALES,
  SITE_URL,
  getDictionary,
  localePath,
  generateAlternates,
  localeToOgLocale,
  type Locale,
  isValidLocale,
} from "@/lib/i18n";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const dict = await getDictionary(locale);

  return {
    title: dict.nav.privacy,
    description: dict.nav.privacy,
    alternates: {
      canonical: `${SITE_URL}${localePath(locale, "/privacy")}`,
      languages: generateAlternates("/privacy"),
    },
    openGraph: {
      title: dict.nav.privacy,
      url: `${SITE_URL}${localePath(locale, "/privacy")}`,
      locale: localeToOgLocale(locale),
    },
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  return (
    <main className="flex-1">
      <PrivacyContent />
    </main>
  );
}

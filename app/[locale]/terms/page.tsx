import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TermsContent } from "../../terms/TermsContent";
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
    title: dict.nav.terms,
    description: dict.nav.terms,
    alternates: {
      canonical: `${SITE_URL}${localePath(locale, "/terms")}`,
      languages: generateAlternates("/terms"),
    },
    openGraph: {
      title: dict.nav.terms,
      url: `${SITE_URL}${localePath(locale, "/terms")}`,
      locale: localeToOgLocale(locale),
    },
  };
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  return (
    <main className="flex-1">
      <TermsContent />
    </main>
  );
}

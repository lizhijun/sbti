import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RankingsContent } from "../../rankings/RankingsContent";
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
    title: dict.rankings.h1,
    description: dict.rankings.desc,
    alternates: {
      canonical: `${SITE_URL}${localePath(locale, "/rankings")}`,
      languages: generateAlternates("/rankings"),
    },
    openGraph: {
      title: dict.rankings.h1,
      description: dict.rankings.desc,
      url: `${SITE_URL}${localePath(locale, "/rankings")}`,
      locale: localeToOgLocale(locale),
    },
  };
}

export default async function RankingsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "SBTI", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Rankings",
        item: `${SITE_URL}${localePath(locale as Locale, "/rankings")}`,
      },
    ],
  };

  return (
    <main className="flex-1">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <RankingsContent />
    </main>
  );
}

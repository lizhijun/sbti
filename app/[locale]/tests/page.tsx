import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TestsContent } from "../../tests/TestsContent";
import { miniTests } from "@/lib/mini-tests";
import { fetchRankedTests, type RankedTest } from "@/lib/mini-test-ranking";
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

export const revalidate = 60;

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
    title: dict.tests.h1,
    description: dict.tests.desc,
    alternates: {
      canonical: `${SITE_URL}${localePath(locale, "/tests")}`,
      languages: generateAlternates("/tests"),
    },
    openGraph: {
      title: dict.tests.h1,
      description: dict.tests.desc,
      url: `${SITE_URL}${localePath(locale, "/tests")}`,
      locale: localeToOgLocale(locale),
    },
  };
}

export default async function TestsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  let ranked: RankedTest[];
  try {
    ranked = await fetchRankedTests();
  } catch {
    // Fallback: use default priority if Supabase is unavailable
    ranked = miniTests.map((t) => ({
      testId: t.id,
      totalTakes: 0,
      score: t.defaultPriority,
    }));
    ranked.sort((a, b) => b.score - a.score);
  }

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "SBTI", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Tests",
        item: `${SITE_URL}${localePath(locale as Locale, "/tests")}`,
      },
    ],
  };

  return (
    <main className="flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <TestsContent ranked={ranked} />
    </main>
  );
}

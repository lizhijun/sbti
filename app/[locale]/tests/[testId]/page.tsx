import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TestContent } from "../../../tests/[testId]/TestContent";
import { miniTests, miniTestBySlug } from "@/lib/mini-tests";
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
  return LOCALES.flatMap((locale) =>
    miniTests.map((t) => ({ locale, testId: t.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; testId: string }>;
}): Promise<Metadata> {
  const { locale, testId } = await params;
  if (!isValidLocale(locale) || !miniTestBySlug[testId]) return {};
  const dict = await getDictionary(locale);
  const test = miniTestBySlug[testId];

  // Title/desc come from flat dict via getDictionary fallback
  const title = `${dict.tests.h1} — ${test.icon}`;
  const desc = dict.tests.desc;

  return {
    title,
    description: desc,
    alternates: {
      canonical: `${SITE_URL}${localePath(locale, `/tests/${testId}`)}`,
      languages: generateAlternates(`/tests/${testId}`),
    },
    openGraph: {
      title,
      description: desc,
      url: `${SITE_URL}${localePath(locale, `/tests/${testId}`)}`,
      locale: localeToOgLocale(locale),
    },
  };
}

export default async function TestDetailPage({
  params,
}: {
  params: Promise<{ locale: string; testId: string }>;
}) {
  const { locale, testId } = await params;
  if (!isValidLocale(locale) || !miniTestBySlug[testId]) notFound();

  const test = miniTestBySlug[testId];

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
      {
        "@type": "ListItem",
        position: 3,
        name: test.icon,
        item: `${SITE_URL}${localePath(locale as Locale, `/tests/${testId}`)}`,
      },
    ],
  };

  return (
    <main className="flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <TestContent testSlug={testId} />
    </main>
  );
}

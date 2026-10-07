import { personalityTypes } from "@/lib/types";
import type { RankingEntry } from "@/lib/types";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchRankings as fetchDatabaseRankings } from "@/lib/db";
import { TypesContent } from "../../types/TypesContent";
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

export const dynamic = "force-dynamic";

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
    title: dict.types.h1,
    description: dict.types.desc,
    alternates: {
      canonical: `${SITE_URL}${localePath(locale, "/types")}`,
      languages: generateAlternates("/types"),
    },
    openGraph: {
      title: dict.types.h1,
      description: dict.types.desc,
      url: `${SITE_URL}${localePath(locale, "/types")}`,
      locale: localeToOgLocale(locale),
    },
  };
}

async function fetchRankings(): Promise<{ rankings: RankingEntry[]; total: number }> {
  try {
    return await fetchDatabaseRankings();
  } catch {
    return { rankings: [], total: 0 };
  }
}

export default async function TypesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const { rankings, total } = await fetchRankings();

  const rankMap: Record<string, { rank: number; count: number; pct: number }> = {};
  rankings.forEach((r, i) => {
    rankMap[r.code] = {
      rank: i + 1,
      count: r.count,
      pct: total > 0 ? (r.count / total) * 100 : 0,
    };
  });

  const types = personalityTypes.map((t) => ({
    code: t.code,
    cn: t.cn,
    intro: t.intro,
    slug: t.slug,
    image: t.image,
    rank: rankMap[t.code]?.rank ?? null,
    count: rankMap[t.code]?.count ?? 0,
    pct: rankMap[t.code]?.pct ?? 0,
  }));

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "SBTI", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Types",
        item: `${SITE_URL}${localePath(locale as Locale, "/types")}`,
      },
    ],
  };

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "27 SBTI Personality Types",
    numberOfItems: personalityTypes.length,
    itemListElement: personalityTypes.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: `${t.cn} (${t.code})`,
      url: `${SITE_URL}/result/${t.slug}`,
      image: `${SITE_URL}${t.image}`,
    })),
  };

  return (
    <main className="flex-1">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      <TypesContent types={types} />
    </main>
  );
}

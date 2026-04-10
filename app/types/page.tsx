import { personalityTypes } from "@/lib/types";
import type { RankingEntry } from "@/lib/types";
import type { Metadata } from "next";
import { getSupabase } from "@/lib/supabase";
import { TypesContent } from "./TypesContent";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "27 种 SBTI 人格类型总览 | 拿捏者、尤物、吗喽、小丑...",
  description: "浏览全部 27 种 SBTI 人格类型：CTRL 拿捏者、SEXY 尤物、MALO 吗喽、JOKE-R 小丑、ZZZZ 装死者等。每种人格都有专属插画、详细描述和十五维落点。",
  alternates: { canonical: "https://sbti.xiachat.com/types" },
  openGraph: {
    title: "27 种 SBTI 人格类型总览",
    description: "浏览全部 27 种 SBTI 人格类型，每种都有专属插画和详细描述。",
    url: "https://sbti.xiachat.com/types",
  },
};

const SITE_URL = "https://sbti.xiachat.com";

async function fetchRankings(): Promise<{ rankings: RankingEntry[]; total: number }> {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase.from("sbti_rankings").select("type_code");
    if (error || !data) return { rankings: [], total: 0 };
    const counts: Record<string, number> = {};
    for (const row of data) {
      counts[row.type_code] = (counts[row.type_code] ?? 0) + 1;
    }
    const rankings = Object.entries(counts)
      .map(([code, count]) => ({ code, count }))
      .sort((a, b) => b.count - a.count);
    return { rankings, total: data.length };
  } catch {
    return { rankings: [], total: 0 };
  }
}

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "首页", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "人格类型", item: `${SITE_URL}/types` },
  ],
};

const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "27 种 SBTI 人格类型",
  description: "全部 SBTI 人格测试结果类型列表",
  numberOfItems: personalityTypes.length,
  itemListElement: personalityTypes.map((t, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: `${t.cn} (${t.code})`,
    url: `${SITE_URL}/result/${t.slug}`,
    image: `${SITE_URL}${t.image}`,
  })),
};

const collectionJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "27 种 SBTI 人格类型总览",
  description: "浏览全部 27 种 SBTI 人格类型，每种都有专属插画和详细描述。",
  url: `${SITE_URL}/types`,
  isPartOf: { "@type": "WebSite", name: "SBTI 人格测试", url: SITE_URL },
};

export default async function TypesPage() {
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

  return (
    <main className="flex-1">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }} />
      <TypesContent types={types} />
    </main>
  );
}

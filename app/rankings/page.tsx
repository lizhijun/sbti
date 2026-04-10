import { typeByCode } from "@/lib/types";
import type { RankingEntry } from "@/lib/types";
import type { Metadata } from "next";
import { getSupabase } from "@/lib/supabase";
import { RankingsContent } from "./RankingsContent";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "SBTI 人格排行榜 | 实时统计最常见的人格类型",
  description: "查看 SBTI 人格排行榜，实时统计 27 种人格类型的提交数据和排名。当前最热门：尤物 SEXY、多情者 LOVE-R、拿捏者 CTRL。看看你的人格排第几？",
  alternates: { canonical: "https://sbti.xiachat.com/rankings" },
  openGraph: {
    title: "SBTI 人格排行榜 | 实时统计最常见的人格类型",
    description: "查看 27 种 SBTI 人格类型的实时排名和提交数据。",
    url: "https://sbti.xiachat.com/rankings",
  },
};

async function fetchRankings(): Promise<{ rankings: RankingEntry[]; total: number }> {
  const supabase = getSupabase();
  // Supabase 默认每次最多返回 1000 行，需要分页获取全部数据
  const allData: { type_code: string }[] = [];
  const pageSize = 1000;
  let from = 0;

  while (true) {
    const { data, error } = await supabase
      .from("sbti_rankings")
      .select("type_code")
      .range(from, from + pageSize - 1);
    if (error || !data || data.length === 0) break;
    allData.push(...data);
    if (data.length < pageSize) break;
    from += pageSize;
  }

  const counts: Record<string, number> = {};
  for (const row of allData) {
    counts[row.type_code] = (counts[row.type_code] ?? 0) + 1;
  }
  const rankings = Object.entries(counts)
    .map(([code, count]) => ({ code, count }))
    .sort((a, b) => b.count - a.count);
  return { rankings, total: allData.length };
}

const SITE_URL = "https://sbti.xiachat.com";

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "首页", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "人格排行榜", item: `${SITE_URL}/rankings` },
  ],
};

export default async function RankingsPage() {
  const { rankings, total } = await fetchRankings();

  const enriched = rankings.map((item) => {
    const t = typeByCode[item.code];
    return {
      code: item.code,
      count: item.count,
      cn: t?.cn ?? item.code,
      slug: t?.slug ?? "",
    };
  });

  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10);
  const timeStr = now.toTimeString().slice(0, 5);

  return (
    <main className="flex-1">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <RankingsContent
        rankings={enriched}
        total={total}
        dateStr={dateStr}
        timeStr={timeStr}
      />
    </main>
  );
}

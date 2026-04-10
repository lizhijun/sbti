import { personalityTypes, typeByCode } from "@/lib/types";
import type { RankingEntry } from "@/lib/types";
import { getSupabase } from "@/lib/supabase";
import { HomeContent } from "./HomeContent";

async function fetchTopRankings(): Promise<{ top3: { rank: number; code: string; cn: string; slug: string; count: number; pct: string }[]; total: number }> {
  try {
    const supabase = getSupabase();
    const { data } = await supabase.from("sbti_rankings").select("type_code");
    if (!data || data.length === 0) {
      return { top3: [], total: 0 };
    }
    const counts: Record<string, number> = {};
    for (const row of data) {
      counts[row.type_code] = (counts[row.type_code] ?? 0) + 1;
    }
    const sorted = Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);
    const total = data.length;
    const top3 = sorted.map(([code, count], i) => {
      const t = typeByCode[code];
      return {
        rank: i + 1,
        code,
        cn: t?.cn ?? code,
        slug: t?.slug ?? "",
        count,
        pct: ((count / total) * 100).toFixed(1) + "%",
      };
    });
    return { top3, total };
  } catch {
    return { top3: [], total: 0 };
  }
}

const SITE_URL = "https://sbti.xiachat.com";

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "SBTI",
  alternateName: ["SBTI 人格测试在线测试", "SBTI人格测试", "SBTI测试", "SBTI Personality Test"],
  url: SITE_URL,
  description: "SBTI 人格测试在线测试入口。立即测出你的 SBTI 人格类型，查看 27 种人格结果、十五维人格落点和详细解读。",
  inLanguage: ["zh-CN", "en", "ja", "ko"],
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/types`,
    "query-input": "required name=search_term_string",
  },
};

const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "SBTI 人格测试",
  url: SITE_URL,
  applicationCategory: "EntertainmentApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "CNY",
    availability: "https://schema.org/InStock",
  },
  description: "32 道题测出你的 SBTI 人格类型，27 种结果 + 15 维度落点分析。免费、无需注册。",
  inLanguage: ["zh-CN", "en", "ja", "ko"],
  availableLanguage: [
    { "@type": "Language", name: "Chinese", alternateName: "zh" },
    { "@type": "Language", name: "English", alternateName: "en" },
    { "@type": "Language", name: "Japanese", alternateName: "ja" },
    { "@type": "Language", name: "Korean", alternateName: "ko" },
  ],
};

export const revalidate = 60;

export default async function HomePage() {
  const { top3: topRankings, total: rankingsTotal } = await fetchTopRankings();

  const heroCards = [
    typeByCode["CTRL"],
    typeByCode["MUM"],
    typeByCode["OH-NO"],
  ].filter(Boolean).map((t) => ({
    code: t!.code,
    cn: t!.cn,
    intro: t!.intro,
    image: t!.image,
  }));

  return (
    <main className="flex-1">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }} />
      <HomeContent heroCards={heroCards} topRankings={topRankings} rankingsTotal={rankingsTotal} />
    </main>
  );
}

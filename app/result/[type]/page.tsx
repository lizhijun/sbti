import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { typeBySlug, personalityTypes } from "@/lib/types";
import { DIMENSION_CODES } from "@/lib/dimensions";
import type { Metadata } from "next";
import type { Level } from "@/lib/dimensions";
import { SubmitRanking } from "@/components/SubmitRanking";
import { SocialShare } from "@/components/SocialShare";
import { ResultContent } from "./ResultContent";

export function generateStaticParams() {
  return personalityTypes.map((t) => ({ type: t.slug }));
}

const SITE_URL = "https://sbti.xiachat.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ type: string }>;
}): Promise<Metadata> {
  const { type: slug } = await params;
  const t = typeBySlug[slug];
  if (!t) return { title: "未找到人格类型" };
  return {
    title: `${t.cn} ${t.code} | SBTI 人格测试结果`,
    description: `你的 SBTI 人格类型是「${t.cn}」(${t.code})。${t.intro} 查看十五维人格落点和详细解读。`,
    alternates: { canonical: `${SITE_URL}/result/${slug}` },
    openGraph: {
      title: `${t.cn} ${t.code} | SBTI 人格测试结果`,
      description: `SBTI 人格类型「${t.cn}」：${t.intro}`,
      url: `${SITE_URL}/result/${slug}`,
      images: [{ url: `${SITE_URL}${t.image}`, width: 600, height: 600, alt: `${t.cn} ${t.code}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `我是「${t.cn}」${t.code} | SBTI 人格测试`,
      description: t.intro,
      images: [`${SITE_URL}${t.image}`],
    },
  };
}

function parsePattern(pattern: string): Level[] {
  return pattern.split("-").join("").split("") as Level[];
}

export default async function ResultPage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type: slug } = await params;
  const t = typeBySlug[slug];
  if (!t) notFound();

  const hasPattern = !!t.pattern;
  const levels = hasPattern ? parsePattern(t.pattern) : [];

  const otherTypes = personalityTypes.filter((o) => o.slug !== t.slug);
  const related = otherTypes.sort(() => Math.random() - 0.5).slice(0, 3);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "首页", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "人格类型", item: `${SITE_URL}/types` },
      { "@type": "ListItem", position: 3, name: `${t.cn} ${t.code}`, item: `${SITE_URL}/result/${t.slug}` },
    ],
  };

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${t.cn} (${t.code}) — SBTI 人格类型详解`,
    description: t.intro,
    image: `${SITE_URL}${t.image}`,
    url: `${SITE_URL}/result/${t.slug}`,
    publisher: { "@type": "Organization", name: "SBTI 人格测试", url: SITE_URL },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/result/${t.slug}` },
  };

  const dimensionData = hasPattern
    ? DIMENSION_CODES.map((dimCode, idx) => ({
        dimCode,
        level: levels[idx] as Level,
      }))
    : [];

  const relatedData = related.map((r) => ({
    slug: r.slug,
    code: r.code,
    cn: r.cn,
    intro: r.intro,
    image: r.image,
  }));

  return (
    <main className="flex-1">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      <ResultContent
        code={t.code}
        cn={t.cn}
        intro={t.intro}
        desc={t.desc}
        slug={t.slug}
        image={t.image}
        hasPattern={hasPattern}
        dimensions={dimensionData}
        related={relatedData}
      />
    </main>
  );
}

import { typeByCode } from "@/lib/types";
import { HomeContent } from "../HomeContent";
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
import type { Metadata } from "next";
import { notFound } from "next/navigation";

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
    title: {
      default: dict.home.h1,
      template: "%s | SBTI",
    },
    description: dict.home.desc,
    keywords: [
      "SBTI", "SBTI测试", "SBTI人格测试", "SBTI在线测试", "SBTI人格类型",
      "SBTI排行榜", "SBTI 27种人格", "搞笑人格测试", "人格测试",
      "SBTI personality test", "personality test", "SBTI test online",
    ],
    alternates: {
      canonical: `${SITE_URL}${localePath(locale, "/")}`,
      languages: generateAlternates("/"),
    },
    openGraph: {
      title: dict.home.h1,
      description: dict.home.desc,
      url: `${SITE_URL}${localePath(locale, "/")}`,
      siteName: "SBTI",
      locale: localeToOgLocale(locale),
      type: "website",
      images: [
        {
          url: `${SITE_URL}/images/types/ctrl.png`,
          width: 732,
          height: 704,
          alt: "SBTI",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.home.h1,
      description: dict.home.desc,
      images: [`${SITE_URL}/images/types/ctrl.png`],
    },
  };
}

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

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const heroCards = [typeByCode["CTRL"], typeByCode["MUM"], typeByCode["OH-NO"]]
    .filter(Boolean)
    .map((t) => ({
      code: t!.code,
      cn: t!.cn,
      intro: t!.intro,
      image: t!.image,
      slug: t!.slug,
    }));

  return (
    <main className="flex-1">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }} />
      <HomeContent heroCards={heroCards} />
    </main>
  );
}

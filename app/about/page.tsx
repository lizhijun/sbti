import type { Metadata } from "next";
import { AboutContent } from "./AboutContent";

export const metadata: Metadata = {
  title: "关于 SBTI 测试 | 五组切面 · 十五维度 · 27 种人格",
  description: "了解 SBTI 人格测试的设计原理。五组人格切面（自我、情感、态度、行动驱力、社交），十五个维度，27 种人格结果。不用术语定义你，更贴近日常状态的人格测试。",
  alternates: { canonical: "https://sbti.xiachat.com/about" },
  openGraph: {
    title: "关于 SBTI 测试 | 五组切面 · 十五维度 · 27 种人格",
    description: "了解 SBTI 人格测试的五组切面和十五维度评分系统。",
    url: "https://sbti.xiachat.com/about",
  },
};

const SITE_URL = "https://sbti.xiachat.com";

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "首页", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "关于测试", item: `${SITE_URL}/about` },
  ],
};

const aboutJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "关于 SBTI 测试",
  description: "了解 SBTI 人格测试的设计原理。五组人格切面，十五个维度，27 种人格结果。",
  url: `${SITE_URL}/about`,
  isPartOf: { "@type": "WebSite", name: "SBTI 人格测试", url: SITE_URL },
};

export default function AboutPage() {
  return (
    <main className="flex-1">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }} />
      <AboutContent />
    </main>
  );
}

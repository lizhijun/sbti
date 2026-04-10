import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Analytics } from '@vercel/analytics/next';

const SITE_URL = "https://sbti.xiachat.com";
const SITE_NAME = "SBTI 人格测试";
const SITE_DESC = "SBTI 人格测试在线测试入口。立即测出你的 SBTI 人格类型，查看 27 种人格结果、十五维人格落点和详细解读。免费、无需注册，3 分钟完成。";

export const metadata: Metadata = {
  title: {
    default: "SBTI 人格测试在线测试 | 27 种抽象人格，测测你是哪一种",
    template: "%s | SBTI 人格测试",
  },
  description: SITE_DESC,
  keywords: [
    "SBTI", "SBTI测试", "SBTI人格测试", "SBTI在线测试", "SBTI人格类型",
    "SBTI排行榜", "SBTI人格排行榜", "SBTI 27种人格", "搞笑人格测试",
    "MBTI搞笑版", "人格测试", "性格测试", "在线人格测试", "免费人格测试",
    "抽象人格测试", "中文人格测试", "sbti.xiachat.com",
  ],
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
    languages: {
      "zh-CN": "/",
      "zh-Hans": "/",
      "zh-Hant": "/",
      "x-default": "/",
    },
  },
  openGraph: {
    title: "SBTI 人格测试在线测试 | 27 种抽象人格",
    description: SITE_DESC,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "zh_CN",
    alternateLocale: ["zh_TW", "zh_HK"],
    type: "website",
    images: [
      {
        url: `${SITE_URL}/images/types/ctrl.png`,
        width: 732,
        height: 704,
        alt: "SBTI 人格测试",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SBTI 人格测试在线测试 | 27 种抽象人格",
    description: SITE_DESC,
    images: [`${SITE_URL}/images/types/ctrl.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "applicable-device": "pc,mobile",
    "mobile-agent": `format=html5; url=${SITE_URL}`,
    "renderer": "webkit",
    "force-rendering": "webkit",
    "msapplication-TileColor": "#f7f4ed",
    "geo.region": "CN",
    "geo.placename": "China",
    "content-language": "zh-CN",
    "distribution": "global",
    "rating": "general",
    "revisit-after": "7 days",
  },
  category: "entertainment",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "SBTI 人格测试",
  url: SITE_URL,
  logo: `${SITE_URL}/images/types/ctrl.png`,
  sameAs: [],
  areaServed: [
    { "@type": "Country", name: "CN" },
    { "@type": "Country", name: "TW" },
    { "@type": "Country", name: "HK" },
    { "@type": "Country", name: "MO" },
    { "@type": "Country", name: "SG" },
    { "@type": "Country", name: "MY" },
  ],
  knowsLanguage: ["zh-CN", "zh-TW"],
};

const siteNavigationJsonLd = {
  "@context": "https://schema.org",
  "@type": "SiteNavigationElement",
  name: "SBTI 导航",
  hasPart: [
    { "@type": "WebPage", name: "首页", url: SITE_URL },
    { "@type": "WebPage", name: "开始测试", url: `${SITE_URL}/test` },
    { "@type": "WebPage", name: "人格类型", url: `${SITE_URL}/types` },
    { "@type": "WebPage", name: "人格排行榜", url: `${SITE_URL}/rankings` },
    { "@type": "WebPage", name: "关于测试", url: `${SITE_URL}/about` },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <head>
        <meta name="google-adsense-account" content="ca-pub-8592502425550051" />
        <meta name="theme-color" content="#f7f4ed" />
        <meta name="color-scheme" content="light" />
        <link rel="canonical" href={SITE_URL} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteNavigationJsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Header />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}

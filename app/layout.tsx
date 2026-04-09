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
    languages: { "zh-CN": "/" },
  },
  openGraph: {
    title: "SBTI 人格测试在线测试 | 27 种抽象人格",
    description: SITE_DESC,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "zh_CN",
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
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <head>
        <meta name="theme-color" content="#f7f4ed" />
        <meta name="color-scheme" content="light" />
        <link rel="canonical" href={SITE_URL} />
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

import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "SBTI 人格测试在线测试",
    template: "%s | SBTI",
  },
  description: "SBTI 人格测试在线测试入口。立即测出你的 SBTI 人格类型，查看 27 种人格结果、十五维人格落点和详细解读。",
  keywords: "SBTI,SBTI测试,SBTI人格测试,SBTI在线测试,SBTI人格类型,SBTI排行榜,27种人格,搞笑人格测试",
  metadataBase: new URL("https://sbti.dev"),
  openGraph: {
    title: "SBTI 人格测试在线测试 | SBTI",
    description: "SBTI 人格测试在线测试入口。立即测出你的 SBTI 人格类型，查看 27 种人格结果、十五维人格落点和详细解读。",
    siteName: "SBTI",
    locale: "zh_CN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <head>
        <meta name="theme-color" content="#f7f4ed" />
        <meta name="color-scheme" content="light" />
      </head>
      <body className="min-h-full flex flex-col">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

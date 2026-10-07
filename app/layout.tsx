import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { localeToHtmlLang, type Locale, SITE_URL } from "@/lib/i18n";

const SITE_NAME = "SBTI 人格测试";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
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
    "distribution": "global",
    "rating": "general",
    "revisit-after": "7 days",
  },
  category: "entertainment",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
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
  knowsLanguage: ["zh-CN", "zh-TW", "en", "ja", "ko"],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const locale = (headersList.get("x-locale") || "zh") as Locale;
  const htmlLang = localeToHtmlLang(locale);

  return (
    <html lang={htmlLang} className="h-full antialiased" suppressHydrationWarning>
      <head>
        <meta name="google-adsense-account" content="ca-pub-8592502425550051" />
        <meta name="theme-color" content="#f7f4ed" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#0f1419" media="(prefers-color-scheme: dark)" />
        <meta name="color-scheme" content="light dark" />
        {/* Prevent FOUC for dark mode */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("sbti-theme");var d=t==="dark"||(t!=="light"&&window.matchMedia("(prefers-color-scheme:dark)").matches);if(d)document.documentElement.classList.add("dark")}catch(e){}})()`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-beige dark:bg-dark-bg dark:text-slate-200 transition-colors">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

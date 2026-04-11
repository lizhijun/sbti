import { zh } from "./zh";
import { en } from "./en";
import { ja } from "./ja";
import { ko } from "./ko";

// ── Locale types & constants ──

export const LOCALES = ["zh", "en", "ja", "ko", "zh-TW"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "zh";
export const SITE_URL = "https://sbti.xiachat.com";

export const LOCALE_INFO: { code: Locale; label: string; flag: string }[] = [
  { code: "zh", label: "中文", flag: "\u{1F1E8}\u{1F1F3}" },
  { code: "en", label: "English", flag: "\u{1F1FA}\u{1F1F8}" },
  { code: "ja", label: "日本語", flag: "\u{1F1EF}\u{1F1F5}" },
  { code: "ko", label: "한국어", flag: "\u{1F1F0}\u{1F1F7}" },
  { code: "zh-TW", label: "繁體", flag: "\u{1F1F9}\u{1F1FC}" },
];

export const LOCALE_LABELS: Record<Locale, string> = {
  zh: "中文",
  en: "EN",
  ja: "日本語",
  ko: "한국어",
  "zh-TW": "繁體",
};

export function isValidLocale(v: string): v is Locale {
  return (LOCALES as readonly string[]).includes(v);
}

export function localePath(locale: Locale, path: string): string {
  if (locale === DEFAULT_LOCALE) return path;
  return `/${locale}${path}`;
}

// ── SEO helpers ──

const HTML_LANG_MAP: Record<Locale, string> = {
  zh: "zh-CN",
  en: "en",
  ja: "ja",
  ko: "ko",
  "zh-TW": "zh-TW",
};

export function localeToHtmlLang(locale: Locale): string {
  return HTML_LANG_MAP[locale] ?? "zh-CN";
}

const HREFLANG_MAP: Record<Locale, string> = {
  zh: "zh-CN",
  en: "en",
  ja: "ja",
  ko: "ko",
  "zh-TW": "zh-TW",
};

export function generateAlternates(path: string): Record<string, string> {
  const languages: Record<string, string> = {
    "x-default": `${SITE_URL}${path}`,
  };
  for (const loc of LOCALES) {
    languages[HREFLANG_MAP[loc]] = `${SITE_URL}${localePath(loc, path)}`;
  }
  return languages;
}

const OG_LOCALE_MAP: Record<Locale, string> = {
  zh: "zh_CN",
  en: "en_US",
  ja: "ja_JP",
  ko: "ko_KR",
  "zh-TW": "zh_TW",
};

export function localeToOgLocale(locale: Locale): string {
  return OG_LOCALE_MAP[locale] ?? "zh_CN";
}

// ── Flat-key translation (client-side t() function) ──

const flatDictionaries: Record<string, Record<string, string>> = { zh, en, ja, ko };

export function t(
  locale: Locale,
  key: string,
  replacements?: Record<string, string | number>,
): string {
  const locKey = locale === "zh-TW" ? "zh" : locale;
  let text = flatDictionaries[locKey]?.[key] ?? flatDictionaries.zh[key] ?? key;
  if (replacements) {
    for (const [k, v] of Object.entries(replacements)) {
      text = text.replace(new RegExp(`\\{${k}\\}`, "g"), String(v));
    }
  }
  return text;
}

export function getDict(locale: Locale): Record<string, string> {
  const locKey = locale === "zh-TW" ? "zh" : locale;
  return flatDictionaries[locKey] ?? flatDictionaries.zh;
}

// ── Structured dictionary (server-side, async) ──

export interface Dictionary {
  nav: { types: string; rankings: string; about: string; startTest: string; privacy: string; terms: string; testCollection: string };
  privacy: { title: string };
  terms: { title: string };
  footer: {
    brand: string;
    brandDesc: string;
    tipTitle: string;
    tipText: string;
    home: string;
  };
  home: {
    badge: string;
    h1: string;
    desc: string;
    startTest: string;
    browse27: string;
    learnMore: string;
    stat1Label: string;
    stat1Sub: string;
    stat2Label: string;
    stat2Sub: string;
    stat3Label: string;
    stat3Sub: string;
    modelsTitle: string;
    modelsDesc: string;
    faqTitle: string;
    faqDesc: string;
    viewAllTypes: string;
    viewAbout: string;
    viewRankings: string;
    rankingsTitle: string;
    rankingsDesc: string;
    viewFullRankings: string;
    totalSubs: string;
  };
  test: {
    h1: string;
    desc: string;
    progress: string;
    prev: string;
    next: string;
    computing: string;
  };
  types: { h1: string; desc: string; viewDetail: string; startTest: string };
  rankings: {
    h1: string;
    desc: string;
    totalSubs: string;
    rankedTypes: string;
    types: string;
    lastUpdate: string;
    fullRanking: string;
    noDataTitle: string;
    noDataDesc: string;
    startTest: string;
    viewAll: string;
    times: string;
  };
  about: {
    h1: string;
    desc: string;
    questionsLabel: string;
    questionsVal: string;
    resultsLabel: string;
    resultsVal: string;
    dimsLabel: string;
    dimsVal: string;
    modelsTitle: string;
    modelsDesc: string;
    ctaTitle: string;
    ctaDesc: string;
    ctaButton: string;
  };
  result: {
    sketch: string;
    codeLabel: string;
    dimsTitle: string;
    dimsDesc: string;
    specialTitle: string;
    specialDesc: string;
    retest: string;
    viewRankings: string;
    viewAll: string;
    otherTypes: string;
    high: string;
    mid: string;
    low: string;
  };
  faq: { q: string; a: string }[];
  modelGroups: { title: string; code: string; desc: string }[];
  questions: { text: string; options: string[] }[];
  drinkQuestions: { text: string; options: string[] }[];
  typeNames: Record<string, { name: string; intro: string; desc: string }>;
  dimensionNames: Record<string, { name: string; model: string }>;
  dimensionExplanations: Record<string, { H: string; M: string; L: string }>;
  tests: { h1: string; desc: string };
}

const structuredDictionaries: Record<
  Locale,
  () => Promise<{ default: Dictionary }>
> = {
  zh: () => import("@/dictionaries/zh"),
  en: () => import("@/dictionaries/en"),
  ja: () => import("@/dictionaries/ja"),
  ko: () => import("@/dictionaries/ko"),
  "zh-TW": () => import("@/dictionaries/zh-TW"),
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  const loader =
    structuredDictionaries[locale] ?? structuredDictionaries[DEFAULT_LOCALE];
  const mod = await loader();
  return mod.default;
}

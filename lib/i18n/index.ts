export type Locale = "zh" | "en" | "ja" | "ko";

export const LOCALES: { code: Locale; label: string; flag: string }[] = [
  { code: "zh", label: "中文", flag: "🇨🇳" },
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "ja", label: "日本語", flag: "🇯🇵" },
  { code: "ko", label: "한국어", flag: "🇰🇷" },
];

export const DEFAULT_LOCALE: Locale = "zh";

import { zh } from "./zh";
import { en } from "./en";
import { ja } from "./ja";
import { ko } from "./ko";

const dictionaries: Record<Locale, Record<string, string>> = { zh, en, ja, ko };

export function t(locale: Locale, key: string, replacements?: Record<string, string | number>): string {
  let text = dictionaries[locale]?.[key] ?? dictionaries.zh[key] ?? key;
  if (replacements) {
    for (const [k, v] of Object.entries(replacements)) {
      text = text.replace(new RegExp(`\\{${k}\\}`, "g"), String(v));
    }
  }
  return text;
}

export function getDict(locale: Locale): Record<string, string> {
  return dictionaries[locale] ?? dictionaries.zh;
}

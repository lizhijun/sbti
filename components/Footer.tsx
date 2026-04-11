"use client";

import { LocaleLink } from "./LocaleLink";
import { useDictionary } from "./DictionaryProvider";

export function Footer() {
  const { t } = useDictionary();

  return (
    <footer className="border-t border-black/5 dark:border-white/10 bg-[rgba(255,255,255,0.7)] dark:bg-[rgba(26,32,40,0.7)]">
      <div className="mx-auto grid w-full max-w-7xl gap-6 px-5 py-10 text-sm text-slate-600 dark:text-slate-400 sm:px-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-3">
          <p className="text-lg text-slate-900 dark:text-slate-100 font-semibold">SBTI</p>
          <p className="max-w-2xl leading-7">
            {t("footer.desc")}
          </p>
          <div className="flex flex-wrap gap-4 pt-1 text-sm font-medium text-slate-700 dark:text-slate-300">
            <LocaleLink className="transition hover:text-slate-950 dark:hover:text-white" href="/">{t("footer.home")}</LocaleLink>
            <LocaleLink className="transition hover:text-slate-950 dark:hover:text-white" href="/test">{t("nav.startTest")}</LocaleLink>
            <LocaleLink className="transition hover:text-slate-950 dark:hover:text-white" href="/types">{t("nav.types")}</LocaleLink>
            <LocaleLink className="transition hover:text-slate-950 dark:hover:text-white" href="/rankings">{t("nav.rankings")}</LocaleLink>
            <LocaleLink className="transition hover:text-slate-950 dark:hover:text-white" href="/about">{t("nav.about")}</LocaleLink>
            <a className="transition hover:text-slate-950 dark:hover:text-white" href="https://apps.apple.com/us/app/%E5%B0%8F%E9%BE%99%E8%99%BE-%E7%9C%9F%E6%AD%A3%E8%83%BD%E5%B9%B2%E6%B4%BB%E7%9A%84-ai-%E5%8A%A9%E6%89%8B/id6759594177" target="_blank" rel="noopener noreferrer">{t("nav.xiaoLongXia")}</a>
            <a className="transition hover:text-slate-950 dark:hover:text-white" href="https://xiachat.com/clawchat" target="_blank" rel="noopener noreferrer">{t("nav.socialMatching")}</a>
            <LocaleLink className="transition hover:text-slate-950 dark:hover:text-white" href="/privacy">{t("footer.privacy")}</LocaleLink>
            <LocaleLink className="transition hover:text-slate-950 dark:hover:text-white" href="/terms">{t("footer.terms")}</LocaleLink>
          </div>
        </div>
        <div className="space-y-3">
          <p className="font-medium text-slate-900 dark:text-slate-100">{t("footer.disclaimer")}</p>
          <p className="leading-7">
            {t("footer.disclaimerText")}
          </p>
        </div>
      </div>
    </footer>
  );
}

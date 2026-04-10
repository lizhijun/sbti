"use client";

import { useCallback, useState } from "react";
import { useLocale } from "./Providers";

const SITE_URL = "https://sbti.xiachat.com";

interface TypeCardShareProps {
  code: string;
  cn: string;
  intro: string;
  slug: string;
  rank: number | null;
  rarity: string;
}

const ShareIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
);

export function TypeCardShare({ code, cn, intro, slug, rank, rarity }: TypeCardShareProps) {
  const { t } = useLocale();
  const [copied, setCopied] = useState(false);

  const resultUrl = `${SITE_URL}/result/${slug}`;

  const handleShare = useCallback(async () => {
    const rankText = rank ? t("typeCard.rankText", { rank }) : t("typeCard.noRank");
    const shareText = t("typeCard.shareText", { cn, code, intro, rankText, rarity, url: resultUrl });

    if (navigator.share) {
      try {
        await navigator.share({ title: t("typeCard.shareTitle", { cn, code }), text: shareText, url: resultUrl });
        return;
      } catch {
        // Fall through to clipboard
      }
    }

    await navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [code, cn, intro, slug, rank, rarity, resultUrl, t]);

  return (
    <button
      onClick={(e: { preventDefault: () => void; stopPropagation: () => void }) => {
        e.preventDefault();
        e.stopPropagation();
        handleShare();
      }}
      className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 dark:border-slate-600 bg-white/80 dark:bg-white/10 px-3.5 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 shadow-sm transition hover:border-emerald-300 dark:hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 hover:text-emerald-700 dark:hover:text-emerald-300"
      title={t("share.button")}
    >
      <ShareIcon />
      {copied ? t("share.copied") : t("share.button")}
    </button>
  );
}

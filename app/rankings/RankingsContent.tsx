"use client";

import Link from "next/link";
import { useLocale } from "@/components/Providers";

interface RankingItem {
  code: string;
  count: number;
  cn: string;
  slug: string;
}

interface Props {
  rankings: RankingItem[];
  total: number;
  dateStr: string;
  timeStr: string;
}

export function RankingsContent({ rankings, total, dateStr, timeStr }: Props) {
  const { t } = useLocale();

  const top3 = rankings.slice(0, 3);
  const rest = rankings.slice(3);
  const maxCount = rankings[0]?.count ?? 1;
  const typeCount = rankings.length;

  return (
    <section className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-8">
      <h1 className="font-display text-4xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-5xl">
        {t("rankings.title")}
      </h1>
      <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600 dark:text-slate-400">
        {t("rankings.desc")}
      </p>

      {/* Stat cards */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-[28px] border border-black/5 dark:border-white/10 bg-white/85 dark:bg-dark-card px-6 py-6 shadow-[0_18px_48px_rgba(15,23,42,0.06)] dark:shadow-none">
          <p className="text-3xl font-bold text-slate-900 dark:text-white">{total.toLocaleString()}</p>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{t("rankings.totalSubmissions")}</p>
        </div>
        <div className="rounded-[28px] border border-black/5 dark:border-white/10 bg-white/85 dark:bg-dark-card px-6 py-6 shadow-[0_18px_48px_rgba(15,23,42,0.06)] dark:shadow-none">
          <p className="text-3xl font-bold text-slate-900 dark:text-white">{typeCount} {t("rankings.typesUnit")}</p>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{t("rankings.typesOnBoard")}</p>
        </div>
        <div className="rounded-[28px] border border-black/5 dark:border-white/10 bg-white/85 dark:bg-dark-card px-6 py-6 shadow-[0_18px_48px_rgba(15,23,42,0.06)] dark:shadow-none">
          <p className="text-3xl font-bold text-slate-900 dark:text-white">{dateStr}</p>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{t("rankings.lastUpdated")} {timeStr}</p>
        </div>
      </div>

      {/* Top 3 */}
      {top3.length > 0 && (
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {top3.map((item, i) => {
            const pct = total > 0 ? ((item.count / total) * 100).toFixed(1) : "0.0";
            return (
              <Link
                key={item.code}
                href={`/result/${item.slug}`}
                className="flex flex-col items-center rounded-[30px] border border-black/5 dark:border-white/10 bg-white/85 dark:bg-dark-card px-6 py-8 shadow-[0_18px_48px_rgba(15,23,42,0.06)] dark:shadow-none transition hover:shadow-[0_18px_48px_rgba(15,23,42,0.10)]"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-900/40 text-xl font-bold text-emerald-800 dark:text-emerald-300">
                  #{i + 1}
                </span>
                <p className="mt-4 text-2xl font-bold text-slate-900 dark:text-white">{item.cn}</p>
                <span className="mt-2 inline-block rounded-full bg-emerald-100 dark:bg-emerald-900/40 px-3 py-0.5 text-xs font-semibold tracking-widest text-emerald-800 dark:text-emerald-300 uppercase">
                  {item.code}
                </span>
                <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                  {item.count} {t("home.timesUnit")} / {pct}%
                </p>
              </Link>
            );
          })}
        </div>
      )}

      {/* Full ranking list */}
      {rest.length > 0 && (
        <div className="mt-10 rounded-[30px] border border-black/5 dark:border-white/10 bg-white/85 dark:bg-dark-card px-6 py-6 shadow-[0_18px_48px_rgba(15,23,42,0.06)] dark:shadow-none">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{t("rankings.fullRanking")}</h2>

          <div className="mt-5 flex flex-col gap-3">
            {rest.map((item, i) => {
              const rank = i + 4;
              const pct = total > 0 ? ((item.count / total) * 100).toFixed(1) : "0.0";
              const barWidth = (item.count / maxCount) * 100;
              return (
                <Link
                  key={item.code}
                  href={`/result/${item.slug}`}
                  className="flex items-center gap-4 rounded-2xl px-3 py-2.5 transition hover:bg-emerald-50/60 dark:hover:bg-emerald-900/20"
                >
                  <span className="w-8 text-right text-sm font-semibold text-slate-400">{rank}</span>
                  <span className="w-24 truncate text-sm font-semibold text-slate-900 dark:text-slate-100 sm:w-32">{item.cn}</span>
                  <span className="inline-block rounded-full bg-emerald-100 dark:bg-emerald-900/40 px-2.5 py-0.5 text-[11px] font-semibold tracking-wider text-emerald-800 dark:text-emerald-300 uppercase">
                    {item.code}
                  </span>
                  <div className="flex flex-1 items-center gap-3">
                    <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
                      <div className="absolute inset-y-0 left-0 rounded-full bg-emerald-500 dark:bg-emerald-400" style={{ width: `${barWidth}%` }} />
                    </div>
                    <span className="w-20 text-right text-xs text-slate-500 dark:text-slate-400">
                      {item.count} / {pct}%
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Empty state */}
      {rankings.length === 0 && (
        <div className="mt-10 rounded-[30px] border border-black/5 dark:border-white/10 bg-white/85 dark:bg-dark-card px-6 py-12 text-center shadow-[0_18px_48px_rgba(15,23,42,0.06)] dark:shadow-none">
          <p className="text-lg font-semibold text-slate-900 dark:text-white">{t("rankings.noData")}</p>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{t("rankings.noDataDesc")}</p>
        </div>
      )}

      {/* Bottom CTA */}
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Link href="/test" className="inline-flex items-center rounded-full bg-emerald-600 dark:bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 dark:hover:bg-emerald-400">
          {t("nav.startTest")}
        </Link>
        <Link href="/types" className="inline-flex items-center rounded-full border border-slate-300 dark:border-slate-600 bg-white dark:bg-dark-card px-6 py-3 text-sm font-semibold text-slate-800 dark:text-slate-200 shadow-sm transition hover:bg-slate-50 dark:hover:bg-white/10">
          {t("rankings.viewAllTypes")}
        </Link>
      </div>
    </section>
  );
}

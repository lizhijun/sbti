"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/components/Providers";
import { TypeCardShare } from "@/components/TypeCardShare";

interface TypeItem {
  code: string;
  cn: string;
  intro: string;
  slug: string;
  image: string;
  rank: number | null;
  count: number;
  pct: number;
}

function getRarityLabel(pct: number): { label: string; color: string } {
  if (pct <= 0) return { label: "?", color: "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300" };
  if (pct < 1) return { label: "SSR", color: "bg-purple-100 dark:bg-purple-900/40 text-purple-800 dark:text-purple-300" };
  if (pct < 3) return { label: "SR", color: "bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300" };
  if (pct < 6) return { label: "R", color: "bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300" };
  if (pct < 10) return { label: "N", color: "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300" };
  return { label: "C", color: "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300" };
}

export function TypesContent({ types }: { types: TypeItem[] }) {
  const { t } = useLocale();

  return (
    <section className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-8">
      <h1 className="font-display text-4xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-5xl">
        {t("types.title")}
      </h1>
      <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600 dark:text-slate-400">
        {t("types.desc")}
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {types.map((tp) => {
          const { label: rarityLabel, color: rarityColor } = getRarityLabel(tp.pct);

          return (
            <div
              key={tp.code}
              className="relative flex flex-col items-center rounded-[30px] border border-black/5 dark:border-white/10 bg-white/88 dark:bg-dark-card px-6 py-8 shadow-[0_18px_48px_rgba(15,23,42,0.06)] dark:shadow-none transition hover:shadow-[0_18px_48px_rgba(15,23,42,0.10)]"
            >
              {tp.rank !== null && (
                <span className="absolute top-4 left-4 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-900/40 text-xs font-bold text-emerald-800 dark:text-emerald-300">
                  #{tp.rank}
                </span>
              )}

              <span className={`absolute top-4 right-4 rounded-full px-2.5 py-0.5 text-[11px] font-bold ${rarityColor}`}>
                {rarityLabel}
              </span>

              {(() => {
                const tpCn = t(`type.${tp.slug}.cn`) !== `type.${tp.slug}.cn` ? t(`type.${tp.slug}.cn`) : tp.cn;
                const tpIntro = t(`type.${tp.slug}.intro`) !== `type.${tp.slug}.intro` ? t(`type.${tp.slug}.intro`) : tp.intro;
                return (<>
              <div className="relative h-[200px] w-[200px] overflow-hidden rounded-2xl">
                <Image src={tp.image} alt={tpCn} width={200} height={200} className="object-cover" />
              </div>

              <span className="mt-5 inline-block rounded-full bg-emerald-100 dark:bg-emerald-900/40 px-4 py-1 text-xs font-semibold tracking-widest text-emerald-800 dark:text-emerald-300 uppercase">
                {tp.code}
              </span>

              <h2 className="mt-3 text-2xl font-bold text-slate-900 dark:text-white">{tpCn}</h2>

              <p className="mt-2 text-center text-sm leading-6 text-slate-600 dark:text-slate-400">{tpIntro}</p>
                </>);
              })()}

              <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
                {tp.count > 0 ? (
                  <span>{tp.count} {t("types.personUnit")} · {tp.pct.toFixed(1)}%</span>
                ) : (
                  <span>{t("types.noData")}</span>
                )}
              </div>

              <div className="mt-4 flex items-center gap-3">
                <Link href={`/result/${tp.slug}`} className="text-sm font-medium text-emerald-700 dark:text-emerald-400 transition hover:text-emerald-900 dark:hover:text-emerald-300">
                  {t("types.viewDetail")} &rarr;
                </Link>
                <TypeCardShare
                  code={tp.code}
                  cn={tp.cn}
                  intro={tp.intro}
                  slug={tp.slug}
                  rank={tp.rank}
                  rarity={rarityLabel}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-12 flex justify-center">
        <Link href="/test" className="inline-flex items-center rounded-full bg-emerald-600 dark:bg-emerald-500 px-8 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 dark:hover:bg-emerald-400">
          {t("nav.startTest")}
        </Link>
      </div>
    </section>
  );
}

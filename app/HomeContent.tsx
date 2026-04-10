"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/components/Providers";

interface HeroCard {
  code: string;
  cn: string;
  intro: string;
  image: string;
}

interface RankingItem {
  rank: number;
  code: string;
  cn: string;
  slug: string;
  count: number;
  pct: string;
}

interface Props {
  heroCards: HeroCard[];
  topRankings: RankingItem[];
  rankingsTotal: number;
}

const modelKeys = [
  { titleKey: "model.self", descKey: "model.self.desc", code: "S1 · S2 · S3" },
  { titleKey: "model.emotion", descKey: "model.emotion.desc", code: "E1 · E2 · E3" },
  { titleKey: "model.attitude", descKey: "model.attitude.desc", code: "A1 · A2 · A3" },
  { titleKey: "model.action", descKey: "model.action.desc", code: "Ac1 · Ac2 · Ac3" },
  { titleKey: "model.social", descKey: "model.social.desc", code: "So1 · So2 · So3" },
];

export function HomeContent({ heroCards, topRankings, rankingsTotal }: Props) {
  const { t } = useLocale();

  const stats = [
    { label: t("home.stat1Label"), sub: t("home.stat1Sub") },
    { label: t("home.stat2Label"), sub: t("home.stat2Sub") },
    { label: t("home.stat3Label"), sub: t("home.stat3Sub") },
  ];

  const faqList = [
    { q: t("faq.q1"), a: t("faq.a1") },
    { q: t("faq.q2"), a: t("faq.a2") },
    { q: t("faq.q3"), a: t("faq.a3") },
    { q: t("faq.q4"), a: t("faq.a4") },
  ];

  return (
    <>
      {/* ── Hero ── */}
      <section className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-8">
        <div className="mx-auto grid max-w-7xl lg:grid-cols-[1.15fr_0.85fr] lg:items-center gap-12 lg:gap-16">
          <div className="flex flex-col gap-6">
            <span className="inline-block w-fit rounded-full bg-emerald-100 dark:bg-emerald-900/40 px-4 py-1.5 text-xs font-semibold tracking-[0.18em] text-emerald-900 dark:text-emerald-300 uppercase">
              {t("home.badge")}
            </span>

            <h1 className="font-display text-5xl font-bold leading-[1.15] tracking-tight text-slate-950 dark:text-white sm:text-6xl lg:text-7xl">
              {t("home.title")}
            </h1>

            <p className="max-w-xl text-base leading-8 text-slate-600 dark:text-slate-400">
              {t("home.desc")}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link href="/test" className="inline-flex items-center rounded-full bg-emerald-600 dark:bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 dark:hover:bg-emerald-400">
                {t("home.startTest")}
              </Link>
              <Link href="/types" className="inline-flex items-center rounded-full border border-slate-300 dark:border-slate-600 bg-white dark:bg-dark-card px-6 py-3 text-sm font-semibold text-slate-800 dark:text-slate-200 shadow-sm transition hover:bg-slate-50 dark:hover:bg-white/10">
                {t("home.browseTypes")}
              </Link>
              <Link href="/about" className="inline-flex items-center px-3 py-3 text-sm font-medium text-slate-500 dark:text-slate-400 transition hover:text-slate-800 dark:hover:text-white">
                {t("home.aboutLink")} &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-4">
              {stats.map((s) => (
                <div key={s.label} className="rounded-[28px] border border-black/5 dark:border-white/10 bg-white/85 dark:bg-dark-card px-5 py-5 shadow-[0_18px_48px_rgba(15,23,42,0.06)] dark:shadow-none">
                  <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">{s.label}</p>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{s.sub}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {heroCards.map((tc) => (
              <div key={tc.code} className="flex items-center gap-5 rounded-[28px] border border-black/5 dark:border-white/10 bg-white/85 dark:bg-dark-card px-5 py-5 shadow-[0_18px_48px_rgba(15,23,42,0.06)] dark:shadow-none">
                <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl">
                  <Image src={tc.image} alt={tc.cn} fill className="object-cover" />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-xs font-semibold tracking-widest text-slate-400 uppercase">{tc.code}</p>
                  <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">{tc.cn}</p>
                  <p className="text-sm leading-6 text-slate-500 dark:text-slate-400">{tc.intro}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5 Models Section ── */}
      <section className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-8">
        <h2 className="font-display font-semibold text-4xl text-slate-950 dark:text-white sm:text-5xl">
          {t("home.modelsTitle")}
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-400">
          {t("home.modelsDesc")}
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {modelKeys.map((g) => (
            <div key={g.code} className="rounded-[30px] border border-black/5 dark:border-white/10 bg-white/85 dark:bg-dark-card px-5 py-6 shadow-[0_18px_48px_rgba(15,23,42,0.06)] dark:shadow-none">
              <p className="text-xs font-semibold tracking-widest text-emerald-700 dark:text-emerald-400 uppercase">{g.code}</p>
              <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-slate-100">{t(g.titleKey)}</p>
              <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-400">{t(g.descKey)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ Section ── */}
      <section className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-8">
        <h2 className="font-display font-semibold text-4xl text-slate-950 dark:text-white sm:text-5xl">
          {t("home.faqTitle")}
        </h2>

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {faqList.map((faq) => (
            <div key={faq.q} className="rounded-[30px] border border-black/5 dark:border-white/10 bg-white/85 dark:bg-dark-card px-6 py-6 shadow-[0_18px_48px_rgba(15,23,42,0.06)] dark:shadow-none">
              <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">{faq.q}</p>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">{faq.a}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link href="/types" className="inline-flex items-center rounded-full border border-slate-300 dark:border-slate-600 bg-white dark:bg-dark-card px-6 py-3 text-sm font-semibold text-slate-800 dark:text-slate-200 shadow-sm transition hover:bg-slate-50 dark:hover:bg-white/10">
            {t("home.viewAllTypes")}
          </Link>
          <Link href="/about" className="inline-flex items-center rounded-full border border-slate-300 dark:border-slate-600 bg-white dark:bg-dark-card px-6 py-3 text-sm font-semibold text-slate-800 dark:text-slate-200 shadow-sm transition hover:bg-slate-50 dark:hover:bg-white/10">
            {t("home.viewAbout")}
          </Link>
          <Link href="/rankings" className="inline-flex items-center rounded-full border border-slate-300 dark:border-slate-600 bg-white dark:bg-dark-card px-6 py-3 text-sm font-semibold text-slate-800 dark:text-slate-200 shadow-sm transition hover:bg-slate-50 dark:hover:bg-white/10">
            {t("home.viewRankings")}
          </Link>
        </div>
      </section>

      {/* ── Rankings Preview ── */}
      <section className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-8">
        <h2 className="font-display font-semibold text-4xl text-slate-950 dark:text-white sm:text-5xl">
          {t("home.rankingsTitle")}
        </h2>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <div className="flex flex-col justify-between rounded-[32px] border border-black/5 dark:border-white/10 bg-white/85 dark:bg-dark-card px-6 py-8 shadow-[0_18px_48px_rgba(15,23,42,0.06)] dark:shadow-none">
            <div>
              <p className="text-6xl font-bold tracking-tight text-slate-900 dark:text-white">{rankingsTotal.toLocaleString()}</p>
              <p className="mt-2 text-sm leading-7 text-slate-500 dark:text-slate-400">
                {t("home.rankingsDesc")}
              </p>
            </div>
            <Link href="/rankings" className="mt-6 inline-flex w-fit items-center rounded-full bg-emerald-600 dark:bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 dark:hover:bg-emerald-400">
              {t("home.viewFullRankings")}
            </Link>
          </div>

          <div className="flex flex-col gap-4">
            {topRankings.map((r) => (
              <Link key={r.slug} href={`/result/${r.slug}`} className="flex items-center gap-5 rounded-[28px] border border-black/5 dark:border-white/10 bg-white/85 dark:bg-dark-card px-5 py-5 shadow-[0_18px_48px_rgba(15,23,42,0.06)] dark:shadow-none transition hover:shadow-[0_18px_48px_rgba(15,23,42,0.10)]">
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-sm font-bold text-emerald-800 dark:text-emerald-300">
                  #{r.rank}
                </span>
                <div className="flex flex-col gap-0.5">
                  <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                    {r.cn}{" "}
                    <span className="text-sm font-medium text-slate-400">{r.code}</span>
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {r.count} {t("home.timesUnit")} / {r.pct}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

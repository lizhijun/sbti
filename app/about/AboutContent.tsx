"use client";

import Link from "next/link";
import { useLocale } from "@/components/Providers";
import { type DimensionCode } from "@/lib/dimensions";

const modelKeys = [
  { titleKey: "model.self", descKey: "model.self.desc", code: "S1 · S2 · S3", dimensions: ["S1", "S2", "S3"] as DimensionCode[] },
  { titleKey: "model.emotion", descKey: "model.emotion.desc", code: "E1 · E2 · E3", dimensions: ["E1", "E2", "E3"] as DimensionCode[] },
  { titleKey: "model.attitude", descKey: "model.attitude.desc", code: "A1 · A2 · A3", dimensions: ["A1", "A2", "A3"] as DimensionCode[] },
  { titleKey: "model.action", descKey: "model.action.desc", code: "Ac1 · Ac2 · Ac3", dimensions: ["Ac1", "Ac2", "Ac3"] as DimensionCode[] },
  { titleKey: "model.social", descKey: "model.social.desc", code: "So1 · So2 · So3", dimensions: ["So1", "So2", "So3"] as DimensionCode[] },
];

export function AboutContent() {
  const { t } = useLocale();

  const stats = [
    { label: t("about.statQuestionsLabel"), value: t("about.statQuestionsValue") },
    { label: t("about.statResultsLabel"), value: t("about.statResultsValue") },
    { label: t("about.statDimsLabel"), value: t("about.statDimsValue") },
  ];

  return (
    <>
      <section className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-8">
        <h1 className="font-display text-5xl font-bold leading-[1.15] tracking-tight text-slate-950 dark:text-white sm:text-6xl">
          {t("about.title")}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-400">
          {t("about.desc")}
        </p>
      </section>

      <section className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="grid gap-4 sm:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label} className="rounded-[28px] border border-black/5 dark:border-white/10 bg-white/85 dark:bg-dark-card px-6 py-6 shadow-[0_18px_48px_rgba(15,23,42,0.06)] dark:shadow-none">
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{s.label}</p>
              <p className="mt-1 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">{s.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-8">
        <h2 className="font-display font-semibold text-4xl text-slate-950 dark:text-white sm:text-5xl">
          {t("about.modelsTitle")}
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-400">
          {t("about.modelsDesc")}
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {modelKeys.map((g) => (
            <div key={g.code} className="rounded-[30px] border border-black/5 dark:border-white/10 bg-white/85 dark:bg-dark-card px-6 py-6 shadow-[0_18px_48px_rgba(15,23,42,0.06)] dark:shadow-none">
              <p className="text-xs font-semibold tracking-widest text-emerald-700 dark:text-emerald-400 uppercase">{g.code}</p>
              <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-slate-100">{t(g.titleKey)}</p>
              <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-400">{t(g.descKey)}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {g.dimensions.map((d) => (
                  <span key={d} className="rounded-full bg-slate-100 dark:bg-slate-700 px-3 py-1 text-xs font-medium text-slate-600 dark:text-slate-300">
                    {d}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-8">
        <div className="rounded-[32px] border border-black/5 dark:border-white/10 bg-white/85 dark:bg-dark-card px-8 py-12 text-center shadow-[0_18px_48px_rgba(15,23,42,0.06)] dark:shadow-none">
          <h2 className="font-display font-semibold text-4xl text-slate-950 dark:text-white sm:text-5xl">
            {t("about.ctaTitle")}
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-8 text-slate-600 dark:text-slate-400">
            {t("about.ctaDesc")}
          </p>
          <Link href="/test" className="mt-6 inline-flex items-center rounded-full bg-emerald-600 dark:bg-emerald-500 px-8 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 dark:hover:bg-emerald-400">
            {t("about.ctaButton")}
          </Link>
        </div>
      </section>
    </>
  );
}

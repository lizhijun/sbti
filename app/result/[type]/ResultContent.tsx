"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/components/Providers";
import type { Level, DimensionCode } from "@/lib/dimensions";
import { SubmitRanking } from "@/components/SubmitRanking";
import { SocialShare } from "@/components/SocialShare";

interface DimensionItem {
  dimCode: DimensionCode;
  level: Level;
}

interface RelatedType {
  slug: string;
  code: string;
  cn: string;
  intro: string;
  image: string;
}

interface Props {
  code: string;
  cn: string;
  intro: string;
  desc: string;
  slug: string;
  image: string;
  hasPattern: boolean;
  dimensions: DimensionItem[];
  related: RelatedType[];
}

function levelColor(level: Level) {
  switch (level) {
    case "H": return "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300";
    case "M": return "bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300";
    case "L": return "bg-rose-100 dark:bg-rose-900/40 text-rose-800 dark:text-rose-300";
  }
}

export function ResultContent({ code, cn, intro, desc, slug, image, hasPattern, dimensions, related }: Props) {
  const { t } = useLocale();

  const localCn = t(`type.${slug}.cn`) !== `type.${slug}.cn` ? t(`type.${slug}.cn`) : cn;
  const localIntro = t(`type.${slug}.intro`) !== `type.${slug}.intro` ? t(`type.${slug}.intro`) : intro;
  const localDesc = t(`type.${slug}.desc`) !== `type.${slug}.desc` ? t(`type.${slug}.desc`) : desc;

  return (
    <section className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-8">
      {/* ── Hero ── */}
      <div className="flex flex-col items-center text-center">
        <div className="relative h-[300px] w-[300px] overflow-hidden rounded-3xl">
          <Image src={image} alt={localCn} width={300} height={300} className="object-cover" priority />
        </div>

        <span className="mt-6 inline-block rounded-full bg-emerald-100 dark:bg-emerald-900/40 px-5 py-1.5 text-xs font-semibold tracking-[0.18em] text-emerald-800 dark:text-emerald-300 uppercase">
          {code}
        </span>

        <h1 className="font-display mt-4 text-4xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-5xl">
          {localCn}
        </h1>

        <p className="mt-3 max-w-xl text-base leading-8 text-slate-600 dark:text-slate-400">
          {localIntro}
        </p>
      </div>

      {/* ── Description card ── */}
      <div className="mt-10 rounded-[30px] border border-black/5 dark:border-white/10 bg-white/88 dark:bg-dark-card px-6 py-8 shadow-[0_18px_48px_rgba(15,23,42,0.06)] dark:shadow-none">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{t("result.portrait")}</h2>
        <p className="mt-4 text-sm leading-8 text-slate-700 dark:text-slate-300">{localDesc}</p>
      </div>

      {/* ── Mode kicker ── */}
      <div className="mt-6 rounded-[30px] border border-black/5 dark:border-white/10 bg-white/88 dark:bg-dark-card px-6 py-6 shadow-[0_18px_48px_rgba(15,23,42,0.06)] dark:shadow-none">
        <p className="text-xs font-semibold tracking-widest text-emerald-700 dark:text-emerald-400 uppercase">
          {t("result.codeLabel")}
        </p>
        <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
          {code}{" "}
          <span className="text-sm font-normal text-slate-500 dark:text-slate-400">— {localCn}</span>
        </p>
      </div>

      {/* ── 15 Dimension Profile ── */}
      <div className="mt-10">
        <h2 className="font-display text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
          {t("result.dimensionsTitle")}
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-400">
          {t("result.dimensionsDesc")}
        </p>

        {hasPattern ? (
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {dimensions.map(({ dimCode, level }) => {
              const explanation = t(`dim.${dimCode}.${level}`);
              const modelKey = dimCode.startsWith("S") ? "model.self"
                : dimCode.startsWith("E") ? "model.emotion"
                : dimCode.startsWith("A") && !dimCode.startsWith("Ac") ? "model.attitude"
                : dimCode.startsWith("Ac") ? "model.action"
                : "model.social";
              return (
                <div key={dimCode} className="rounded-[28px] border border-black/5 dark:border-white/10 bg-white/88 dark:bg-dark-card px-5 py-5 shadow-[0_18px_48px_rgba(15,23,42,0.06)] dark:shadow-none">
                  <p className="text-xs font-semibold tracking-widest text-emerald-700 dark:text-emerald-400 uppercase">
                    {t(modelKey)}
                  </p>
                  <p className="mt-2 text-base font-semibold text-slate-900 dark:text-white">
                    {t(`dim.${dimCode}`)}
                  </p>
                  <span className={`mt-2 inline-block rounded-full px-3 py-0.5 text-xs font-semibold ${levelColor(level)}`}>
                    {t(`level.${level}`)} ({level})
                  </span>
                  <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                    {explanation}
                  </p>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="mt-8 rounded-[28px] border border-black/5 dark:border-white/10 bg-white/88 dark:bg-dark-card px-6 py-8 text-center shadow-[0_18px_48px_rgba(15,23,42,0.06)] dark:shadow-none">
            <p className="text-lg font-semibold text-slate-900 dark:text-white">
              {t("result.specialType")}
            </p>
            <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-400">
              {localCn}（{code}）{t("result.specialDesc")}
            </p>
          </div>
        )}
      </div>

      {/* ── Action buttons ── */}
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <SubmitRanking typeCode={code} />
        <Link href="/test" className="inline-flex items-center rounded-full bg-emerald-600 dark:bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 dark:hover:bg-emerald-400">
          {t("result.retakeTest")}
        </Link>
        <Link href="/rankings" className="inline-flex items-center rounded-full border border-slate-300 dark:border-slate-600 bg-white dark:bg-dark-card px-6 py-3 text-sm font-semibold text-slate-800 dark:text-slate-200 shadow-sm transition hover:bg-slate-50 dark:hover:bg-white/10">
          {t("result.viewRankings")}
        </Link>
        <Link href="/types" className="inline-flex items-center rounded-full border border-slate-300 dark:border-slate-600 bg-white dark:bg-dark-card px-6 py-3 text-sm font-semibold text-slate-800 dark:text-slate-200 shadow-sm transition hover:bg-slate-50 dark:hover:bg-white/10">
          {t("result.viewAllTypes")}
        </Link>
        <a
          href="https://xiachat.com/clawchat"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-full border border-emerald-300 dark:border-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 px-6 py-3 text-sm font-semibold text-emerald-800 dark:text-emerald-300 shadow-sm transition hover:bg-emerald-100 dark:hover:bg-emerald-900/50"
        >
          {t("nav.socialMatching")}
        </a>
      </div>

      {/* ── Social sharing ── */}
      <SocialShare code={code} cn={localCn} intro={localIntro} slug={slug} image={image} />

      {/* ── More tests ── */}
      <div className="mt-14">
        <h2 className="font-display text-2xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-3xl">
          {t("nav.moreTests")}
        </h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-3">
          <a
            href="https://xiachat.com/soul-quiz"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center rounded-[28px] border border-black/5 dark:border-white/10 bg-white/88 dark:bg-dark-card px-5 py-6 shadow-[0_18px_48px_rgba(15,23,42,0.06)] dark:shadow-none transition hover:shadow-[0_18px_48px_rgba(15,23,42,0.10)]"
          >
            <span className="text-4xl">🔮</span>
            <p className="mt-3 text-base font-semibold text-slate-900 dark:text-white">{t("nav.soulQuiz")}</p>
          </a>
          <a
            href="https://xiachat.com/soulmate"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center rounded-[28px] border border-black/5 dark:border-white/10 bg-white/88 dark:bg-dark-card px-5 py-6 shadow-[0_18px_48px_rgba(15,23,42,0.06)] dark:shadow-none transition hover:shadow-[0_18px_48px_rgba(15,23,42,0.10)]"
          >
            <span className="text-4xl">💕</span>
            <p className="mt-3 text-base font-semibold text-slate-900 dark:text-white">{t("nav.soulmate")}</p>
          </a>
          <a
            href="https://mbti.xiachat.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center rounded-[28px] border border-black/5 dark:border-white/10 bg-white/88 dark:bg-dark-card px-5 py-6 shadow-[0_18px_48px_rgba(15,23,42,0.06)] dark:shadow-none transition hover:shadow-[0_18px_48px_rgba(15,23,42,0.10)]"
          >
            <span className="text-4xl">🧠</span>
            <p className="mt-3 text-base font-semibold text-slate-900 dark:text-white">{t("nav.mbti")}</p>
          </a>
        </div>
      </div>

      {/* ── Related types ── */}
      <div className="mt-14">
        <h2 className="font-display text-2xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-3xl">
          {t("result.otherTypes")}
        </h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-3">
          {related.map((r) => {
            const rCn = t(`type.${r.slug}.cn`) !== `type.${r.slug}.cn` ? t(`type.${r.slug}.cn`) : r.cn;
            const rIntro = t(`type.${r.slug}.intro`) !== `type.${r.slug}.intro` ? t(`type.${r.slug}.intro`) : r.intro;
            return (
            <Link
              key={r.slug}
              href={`/result/${r.slug}`}
              className="flex flex-col items-center rounded-[28px] border border-black/5 dark:border-white/10 bg-white/88 dark:bg-dark-card px-5 py-6 shadow-[0_18px_48px_rgba(15,23,42,0.06)] dark:shadow-none transition hover:shadow-[0_18px_48px_rgba(15,23,42,0.10)]"
            >
              <div className="relative h-20 w-20 overflow-hidden rounded-2xl">
                <Image src={r.image} alt={rCn} fill className="object-cover" />
              </div>
              <span className="mt-3 text-xs font-semibold tracking-widest text-slate-400 uppercase">{r.code}</span>
              <p className="mt-1 text-base font-semibold text-slate-900 dark:text-white">{rCn}</p>
              <p className="mt-1 text-center text-sm text-slate-500 dark:text-slate-400">{rIntro}</p>
            </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

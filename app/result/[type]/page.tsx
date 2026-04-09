import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { typeBySlug, personalityTypes } from "@/lib/types";
import {
  dimensionMeta,
  dimensionExplanations,
  DIMENSION_CODES,
  modelGroups,
} from "@/lib/dimensions";
import type { Metadata } from "next";
import type { Level, DimensionCode } from "@/lib/dimensions";

/* ── Static params for all 27 types ── */
export function generateStaticParams() {
  return personalityTypes.map((t) => ({ type: t.slug }));
}

/* ── Dynamic metadata ── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ type: string }>;
}): Promise<Metadata> {
  const { type: slug } = await params;
  const t = typeBySlug[slug];
  if (!t) return { title: "未找到人格类型" };
  return {
    title: `${t.cn} (${t.code})`,
    description: t.intro,
  };
}

/* ── Helper: parse pattern string into 15 levels ── */
function parsePattern(pattern: string): Level[] {
  return pattern
    .split("-")
    .join("")
    .split("") as Level[];
}

/* ── Level badge colour ── */
function levelColor(level: Level) {
  switch (level) {
    case "H":
      return "bg-emerald-100 text-emerald-800";
    case "M":
      return "bg-amber-100 text-amber-800";
    case "L":
      return "bg-rose-100 text-rose-800";
  }
}

function levelLabel(level: Level) {
  switch (level) {
    case "H":
      return "High";
    case "M":
      return "Mid";
    case "L":
      return "Low";
  }
}

/* ── Page ── */
export default async function ResultPage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type: slug } = await params;
  const t = typeBySlug[slug];
  if (!t) notFound();

  const hasPattern = !!t.pattern;
  const levels = hasPattern ? parsePattern(t.pattern) : [];

  /* Pick 3 random related types (excluding current) */
  const otherTypes = personalityTypes.filter((o) => o.slug !== t.slug);
  const related = otherTypes.sort(() => Math.random() - 0.5).slice(0, 3);

  return (
    <main className="flex-1">
      <section className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-8">
        {/* ── Hero ── */}
        <div className="flex flex-col items-center text-center">
          <div className="relative h-[300px] w-[300px] overflow-hidden rounded-3xl">
            <Image
              src={t.image}
              alt={t.cn}
              width={300}
              height={300}
              className="object-cover"
              priority
            />
          </div>

          <span className="mt-6 inline-block rounded-full bg-emerald-100 px-5 py-1.5 text-xs font-semibold tracking-[0.18em] text-emerald-800 uppercase">
            {t.code}
          </span>

          <h1 className="font-display mt-4 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            {t.cn}
          </h1>

          <p className="mt-3 max-w-xl text-base leading-8 text-slate-600">
            {t.intro}
          </p>
        </div>

        {/* ── Description card ── */}
        <div className="mt-10 rounded-[30px] border border-black/5 bg-white/88 px-6 py-8 shadow-[0_18px_48px_rgba(15,23,42,0.06)]">
          <h2 className="text-lg font-semibold text-slate-900">人格速写</h2>
          <p className="mt-4 text-sm leading-8 text-slate-700">{t.desc}</p>
        </div>

        {/* ── Mode kicker ── */}
        <div className="mt-6 rounded-[30px] border border-black/5 bg-white/88 px-6 py-6 shadow-[0_18px_48px_rgba(15,23,42,0.06)]">
          <p className="text-xs font-semibold tracking-widest text-emerald-700 uppercase">
            人格代码
          </p>
          <p className="mt-2 text-lg font-semibold text-slate-900">
            {t.code}{" "}
            <span className="text-sm font-normal text-slate-500">
              — {t.cn}
            </span>
          </p>
        </div>

        {/* ── 15 Dimension Profile ── */}
        <div className="mt-10">
          <h2 className="font-display text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            十五维人格落点
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-8 text-slate-600">
            以下是该人格在五大模型、十五个维度上的具体表现。
          </p>

          {hasPattern ? (
            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {DIMENSION_CODES.map((dimCode, idx) => {
                const meta = dimensionMeta[dimCode];
                const level = levels[idx] as Level;
                const explanation =
                  dimensionExplanations[dimCode]?.[level] ?? "";
                return (
                  <div
                    key={dimCode}
                    className="rounded-[28px] border border-black/5 bg-white/88 px-5 py-5 shadow-[0_18px_48px_rgba(15,23,42,0.06)]"
                  >
                    <p className="text-xs font-semibold tracking-widest text-emerald-700 uppercase">
                      {meta.model}
                    </p>
                    <p className="mt-2 text-base font-semibold text-slate-900">
                      {meta.name}
                    </p>
                    <span
                      className={`mt-2 inline-block rounded-full px-3 py-0.5 text-xs font-semibold ${levelColor(level)}`}
                    >
                      {levelLabel(level)} ({level})
                    </span>
                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      {explanation}
                    </p>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="mt-8 rounded-[28px] border border-black/5 bg-white/88 px-6 py-8 text-center shadow-[0_18px_48px_rgba(15,23,42,0.06)]">
              <p className="text-lg font-semibold text-slate-900">
                该人格为特殊类型
              </p>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                {t.cn}（{t.code}
                ）是系统中的特殊人格类型，不包含标准的十五维落点模式。请参阅上方的人格速写了解详情。
              </p>
            </div>
          )}
        </div>

        {/* ── Action buttons ── */}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link
            href="/test"
            className="inline-flex items-center rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
          >
            重新测试
          </Link>
          <Link
            href="/rankings"
            className="inline-flex items-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50"
          >
            查看排行榜
          </Link>
          <Link
            href="/types"
            className="inline-flex items-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50"
          >
            查看所有人格
          </Link>
        </div>

        {/* ── Related types ── */}
        <div className="mt-14">
          <h2 className="font-display text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
            其他人格类型
          </h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/result/${r.slug}`}
                className="flex flex-col items-center rounded-[28px] border border-black/5 bg-white/88 px-5 py-6 shadow-[0_18px_48px_rgba(15,23,42,0.06)] transition hover:shadow-[0_18px_48px_rgba(15,23,42,0.10)]"
              >
                <div className="relative h-20 w-20 overflow-hidden rounded-2xl">
                  <Image
                    src={r.image}
                    alt={r.cn}
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="mt-3 text-xs font-semibold tracking-widest text-slate-400 uppercase">
                  {r.code}
                </span>
                <p className="mt-1 text-base font-semibold text-slate-900">
                  {r.cn}
                </p>
                <p className="mt-1 text-center text-sm text-slate-500">
                  {r.intro}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

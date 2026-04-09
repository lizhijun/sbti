import type { Metadata } from "next";
import Link from "next/link";
import { modelGroups } from "@/lib/dimensions";

export const metadata: Metadata = {
  title: "关于 SBTI 测试",
  description:
    "SBTI 是一套轻松向的人格测试，从五个维度、十五个子指标观察你的行为倾向，共 27 种人格结果。",
};

const stats = [
  { label: "题目数量", value: "32 道" },
  { label: "人格结果", value: "27 种" },
  { label: "核心结构", value: "15 维" },
];

export default function AboutPage() {
  return (
    <main className="flex-1">
      {/* ── Title ── */}
      <section className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-8">
        <h1 className="font-display text-5xl font-bold leading-[1.15] tracking-tight text-slate-950 sm:text-6xl">
          关于 SBTI 测试
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
          SBTI
          是一套轻松向的人格测试。它不会把人塞进非常严肃的术语体系里，而是更关注日常状态、行为倾向和社交反应，让结果读起来更直观。
        </p>
      </section>

      {/* ── Stat cards ── */}
      <section className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="grid gap-4 sm:grid-cols-3">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-[28px] border border-black/5 bg-white/85 px-6 py-6 shadow-[0_18px_48px_rgba(15,23,42,0.06)]"
            >
              <p className="text-sm font-medium text-slate-500">{s.label}</p>
              <p className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
                {s.value}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5 Model groups ── */}
      <section className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-8">
        <h2 className="font-display font-semibold text-4xl text-slate-950 sm:text-5xl">
          五套人格切面
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-8 text-slate-600">
          SBTI 从五个维度观察一个人的行为倾向，每个维度包含三个子指标，合计十五维。
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {modelGroups.map((g) => (
            <div
              key={g.title}
              className="rounded-[30px] border border-black/5 bg-white/85 px-6 py-6 shadow-[0_18px_48px_rgba(15,23,42,0.06)]"
            >
              <p className="text-xs font-semibold tracking-widest text-emerald-700 uppercase">
                {g.code}
              </p>
              <p className="mt-2 text-lg font-semibold text-slate-900">{g.title}</p>
              <p className="mt-2 text-sm leading-7 text-slate-600">{g.desc}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {g.dimensions.map((d) => (
                  <span
                    key={d}
                    className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
                  >
                    {d}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-8">
        <div className="rounded-[32px] border border-black/5 bg-white/85 px-8 py-12 text-center shadow-[0_18px_48px_rgba(15,23,42,0.06)]">
          <h2 className="font-display font-semibold text-4xl text-slate-950 sm:text-5xl">
            最简单的方式是直接开始测试
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-8 text-slate-600">
            整套测试大约需要 3-5 分钟，测完之后可以查看十五维落点和人格结果详细解读。
          </p>
          <Link
            href="/test"
            className="mt-6 inline-flex items-center rounded-full bg-emerald-600 px-8 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
          >
            进入测试
          </Link>
        </div>
      </section>
    </main>
  );
}

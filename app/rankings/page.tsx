import Link from "next/link";
import { typeByCode } from "@/lib/types";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "人格排行榜",
};

const rankingData = [
  { code: "SEXY", count: 426 },
  { code: "LOVE-R", count: 385 },
  { code: "CTRL", count: 282 },
  { code: "THIN-K", count: 276 },
  { code: "ZZZZ", count: 245 },
  { code: "MALO", count: 233 },
  { code: "SOLO", count: 211 },
  { code: "FUCK", count: 200 },
  { code: "OJBK", count: 198 },
  { code: "WOC!", count: 189 },
  { code: "IMSB", count: 176 },
  { code: "MUM", count: 172 },
  { code: "MONK", count: 167 },
  { code: "FAKE", count: 164 },
  { code: "ATM-er", count: 145 },
  { code: "JOKE-R", count: 145 },
  { code: "SHIT", count: 138 },
  { code: "GOGO", count: 137 },
  { code: "BOSS", count: 135 },
  { code: "THAN-K", count: 117 },
  { code: "DEAD", count: 99 },
  { code: "Dior-s", count: 95 },
  { code: "OH-NO", count: 84 },
  { code: "DRUNK", count: 84 },
  { code: "POOR", count: 20 },
  { code: "IMFW", count: 13 },
  { code: "HHHH", count: 1 },
];

const TOTAL = 4537;

export default function RankingsPage() {
  const top3 = rankingData.slice(0, 3);
  const rest = rankingData.slice(3);
  const maxCount = rankingData[0].count;

  return (
    <main className="flex-1">
      <section className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-8">
        <h1 className="font-display text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
          SBTI 人格排行榜
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
          当前排行榜只统计用户在结果页主动提交的真实测试结果，默认展示总提交数与实时排名。
        </p>

        {/* Stat cards */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-[28px] border border-black/5 bg-white/85 px-6 py-6 shadow-[0_18px_48px_rgba(15,23,42,0.06)]">
            <p className="text-3xl font-bold text-slate-900">{TOTAL.toLocaleString()}</p>
            <p className="mt-1 text-sm text-slate-500">总提交数</p>
          </div>
          <div className="rounded-[28px] border border-black/5 bg-white/85 px-6 py-6 shadow-[0_18px_48px_rgba(15,23,42,0.06)]">
            <p className="text-3xl font-bold text-slate-900">27 种</p>
            <p className="mt-1 text-sm text-slate-500">上榜人格</p>
          </div>
          <div className="rounded-[28px] border border-black/5 bg-white/85 px-6 py-6 shadow-[0_18px_48px_rgba(15,23,42,0.06)]">
            <p className="text-3xl font-bold text-slate-900">2026-04-09</p>
            <p className="mt-1 text-sm text-slate-500">最近更新 21:17</p>
          </div>
        </div>

        {/* Top 3 */}
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {top3.map((item, i) => {
            const t = typeByCode[item.code];
            const pct = ((item.count / TOTAL) * 100).toFixed(1);
            return (
              <Link
                key={item.code}
                href={`/result/${t?.slug ?? ""}`}
                className="flex flex-col items-center rounded-[30px] border border-black/5 bg-white/85 px-6 py-8 shadow-[0_18px_48px_rgba(15,23,42,0.06)] transition hover:shadow-[0_18px_48px_rgba(15,23,42,0.10)]"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-xl font-bold text-emerald-800">
                  #{i + 1}
                </span>
                <p className="mt-4 text-2xl font-bold text-slate-900">
                  {t?.cn ?? item.code}
                </p>
                <span className="mt-2 inline-block rounded-full bg-emerald-100 px-3 py-0.5 text-xs font-semibold tracking-widest text-emerald-800 uppercase">
                  {item.code}
                </span>
                <p className="mt-3 text-sm text-slate-500">
                  {item.count} 次 / {pct}%
                </p>
              </Link>
            );
          })}
        </div>

        {/* Full ranking list */}
        <div className="mt-10 rounded-[30px] border border-black/5 bg-white/85 px-6 py-6 shadow-[0_18px_48px_rgba(15,23,42,0.06)]">
          <h2 className="text-lg font-semibold text-slate-900">完整排名</h2>

          <div className="mt-5 flex flex-col gap-3">
            {rest.map((item, i) => {
              const rank = i + 4;
              const t = typeByCode[item.code];
              const pct = ((item.count / TOTAL) * 100).toFixed(1);
              const barWidth = (item.count / maxCount) * 100;
              return (
                <Link
                  key={item.code}
                  href={`/result/${t?.slug ?? ""}`}
                  className="flex items-center gap-4 rounded-2xl px-3 py-2.5 transition hover:bg-emerald-50/60"
                >
                  <span className="w-8 text-right text-sm font-semibold text-slate-400">
                    {rank}
                  </span>
                  <span className="w-24 truncate text-sm font-semibold text-slate-900 sm:w-32">
                    {t?.cn ?? item.code}
                  </span>
                  <span className="inline-block rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-semibold tracking-wider text-emerald-800 uppercase">
                    {item.code}
                  </span>
                  <div className="flex flex-1 items-center gap-3">
                    <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="absolute inset-y-0 left-0 rounded-full bg-emerald-500"
                        style={{ width: `${barWidth}%` }}
                      />
                    </div>
                    <span className="w-20 text-right text-xs text-slate-500">
                      {item.count} / {pct}%
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link
            href="/test"
            className="inline-flex items-center rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
          >
            开始测试
          </Link>
          <Link
            href="/types"
            className="inline-flex items-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50"
          >
            查看所有人格
          </Link>
        </div>
      </section>
    </main>
  );
}

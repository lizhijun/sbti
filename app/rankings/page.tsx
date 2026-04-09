import Link from "next/link";
import { typeByCode } from "@/lib/types";
import type { RankingEntry } from "@/lib/types";
import type { Metadata } from "next";
import { getSupabase } from "@/lib/supabase";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "SBTI 人格排行榜 | 实时统计最常见的人格类型",
  description: "查看 SBTI 人格排行榜，实时统计 27 种人格类型的提交数据和排名。当前最热门：尤物 SEXY、多情者 LOVE-R、拿捏者 CTRL。看看你的人格排第几？",
  alternates: { canonical: "https://sbti.xiachat.com/rankings" },
  openGraph: {
    title: "SBTI 人格排行榜 | 实时统计最常见的人格类型",
    description: "查看 27 种 SBTI 人格类型的实时排名和提交数据。",
    url: "https://sbti.xiachat.com/rankings",
  },
};

async function fetchRankings(): Promise<{ rankings: RankingEntry[]; total: number }> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("sbti_rankings")
    .select("type_code");

  if (error || !data) {
    return { rankings: [], total: 0 };
  }

  const counts: Record<string, number> = {};
  for (const row of data) {
    counts[row.type_code] = (counts[row.type_code] ?? 0) + 1;
  }

  const rankings = Object.entries(counts)
    .map(([code, count]) => ({ code, count }))
    .sort((a, b) => b.count - a.count);

  return { rankings, total: data.length };
}

export default async function RankingsPage() {
  const { rankings, total } = await fetchRankings();

  const top3 = rankings.slice(0, 3);
  const rest = rankings.slice(3);
  const maxCount = rankings[0]?.count ?? 1;
  const typeCount = rankings.length;
  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10);
  const timeStr = now.toTimeString().slice(0, 5);

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
            <p className="text-3xl font-bold text-slate-900">{total.toLocaleString()}</p>
            <p className="mt-1 text-sm text-slate-500">总提交数</p>
          </div>
          <div className="rounded-[28px] border border-black/5 bg-white/85 px-6 py-6 shadow-[0_18px_48px_rgba(15,23,42,0.06)]">
            <p className="text-3xl font-bold text-slate-900">{typeCount} 种</p>
            <p className="mt-1 text-sm text-slate-500">上榜人格</p>
          </div>
          <div className="rounded-[28px] border border-black/5 bg-white/85 px-6 py-6 shadow-[0_18px_48px_rgba(15,23,42,0.06)]">
            <p className="text-3xl font-bold text-slate-900">{dateStr}</p>
            <p className="mt-1 text-sm text-slate-500">最近更新 {timeStr}</p>
          </div>
        </div>

        {/* Top 3 */}
        {top3.length > 0 && (
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {top3.map((item, i) => {
              const t = typeByCode[item.code];
              const pct = total > 0 ? ((item.count / total) * 100).toFixed(1) : "0.0";
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
        )}

        {/* Full ranking list */}
        {rest.length > 0 && (
          <div className="mt-10 rounded-[30px] border border-black/5 bg-white/85 px-6 py-6 shadow-[0_18px_48px_rgba(15,23,42,0.06)]">
            <h2 className="text-lg font-semibold text-slate-900">完整排名</h2>

            <div className="mt-5 flex flex-col gap-3">
              {rest.map((item, i) => {
                const rank = i + 4;
                const t = typeByCode[item.code];
                const pct = total > 0 ? ((item.count / total) * 100).toFixed(1) : "0.0";
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
        )}

        {/* Empty state */}
        {rankings.length === 0 && (
          <div className="mt-10 rounded-[30px] border border-black/5 bg-white/85 px-6 py-12 text-center shadow-[0_18px_48px_rgba(15,23,42,0.06)]">
            <p className="text-lg font-semibold text-slate-900">暂无提交数据</p>
            <p className="mt-2 text-sm text-slate-500">完成测试后提交结果，即可在排行榜中显示。</p>
          </div>
        )}

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

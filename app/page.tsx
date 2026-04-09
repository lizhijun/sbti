import Image from "next/image";
import Link from "next/link";
import { personalityTypes, typeByCode } from "@/lib/types";
import { modelGroups } from "@/lib/dimensions";

const heroCards = [
  typeByCode["CTRL"],
  typeByCode["MUM"],
  typeByCode["OH-NO"],
];

const faqList = [
  {
    q: "SBTI 是什么？",
    a: "SBTI 是一个轻松向的人格测试。它不用一堆术语去定义你，而是从自我认知、感情投入、行动方式和社交边界这些日常状态出发，帮你看见自己更像哪一种人格。",
  },
  {
    q: "SBTI 和 MBTI 有什么区别？",
    a: "MBTI 更像一套经典人格分类工具，SBTI 则更贴近中文互联网语境里的表达方式。你在这里测到的，不是一本正经的标签，而是更接近日常行为和真实反应的一面。",
  },
  {
    q: "SBTI 人格测试会测什么？",
    a: "整套测试分成五组切面：自我模型、情感模型、态度模型、行动驱力模型和社交模型。测完之后，可以看到十五维落点和最终人格结果。",
  },
  {
    q: "测完 SBTI 之后能看到什么？",
    a: "你会拿到一个专属结果页，里面有人格名称、人格解读、十五维落点，以及其他人格类型的详情页入口，方便继续对照和分享。",
  },
];

const stats = [
  { label: "15 维模型", sub: "5 套人格切面" },
  { label: "27 种结果", sub: "25 常规 + 2 特殊" },
  { label: "32 道题", sub: "含隐藏饮酒分支" },
];

const topRankings = [
  { rank: 1, code: "SEXY", cn: "尤物", slug: "sexy", count: 421, pct: "9.4%" },
  { rank: 2, code: "LOVE-R", cn: "多情者", slug: "love-r", count: 380, pct: "8.5%" },
  { rank: 3, code: "CTRL", cn: "拿捏者", slug: "ctrl", count: 273, pct: "6.1%" },
];

export default function HomePage() {
  return (
    <main className="flex-1">
      {/* ── Hero ── */}
      <section className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-8">
        <div className="mx-auto grid max-w-7xl lg:grid-cols-[1.15fr_0.85fr] lg:items-center gap-12 lg:gap-16">
          {/* Left */}
          <div className="flex flex-col gap-6">
            <span className="inline-block w-fit rounded-full bg-emerald-100 px-4 py-1.5 text-xs font-semibold tracking-[0.18em] text-emerald-900 uppercase">
              Silly Behavioral Type Indicator
            </span>

            <h1 className="font-display text-5xl font-bold leading-[1.15] tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
              SBTI 人格测试在线测试，测测你到底是哪一种抽象人格。
            </h1>

            <p className="max-w-xl text-base leading-8 text-slate-600">
              SBTI 现已支持在线测试。现在就可以开始答题，测出自己的 SBTI
              人格类型；测完之后，还能继续查看十五维落点和每一种人格的详细解读。
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
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
                浏览 27 种人格
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center px-3 py-3 text-sm font-medium text-slate-500 transition hover:text-slate-800"
              >
                了解测试说明 &rarr;
              </Link>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-3 gap-3 pt-4">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-[28px] border border-black/5 bg-white/85 px-5 py-5 shadow-[0_18px_48px_rgba(15,23,42,0.06)]"
                >
                  <p className="text-lg font-semibold text-slate-900">{s.label}</p>
                  <p className="mt-1 text-sm text-slate-500">{s.sub}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — personality card previews */}
          <div className="flex flex-col gap-4">
            {heroCards.map((t) =>
              t ? (
                <div
                  key={t.code}
                  className="flex items-center gap-5 rounded-[28px] border border-black/5 bg-white/85 px-5 py-5 shadow-[0_18px_48px_rgba(15,23,42,0.06)]"
                >
                  <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl">
                    <Image
                      src={t.image}
                      alt={t.cn}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-xs font-semibold tracking-widest text-slate-400 uppercase">
                      {t.code}
                    </p>
                    <p className="text-lg font-semibold text-slate-900">{t.cn}</p>
                    <p className="text-sm leading-6 text-slate-500">{t.intro}</p>
                  </div>
                </div>
              ) : null
            )}
          </div>
        </div>
      </section>

      {/* ── 5 Models Section ── */}
      <section className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-8">
        <h2 className="font-display font-semibold text-4xl text-slate-950 sm:text-5xl">
          五套人格切面
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-8 text-slate-600">
          SBTI 从五个维度观察一个人的行为倾向，每个维度包含三个子指标，合计十五维。
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {modelGroups.map((g) => (
            <div
              key={g.title}
              className="rounded-[30px] border border-black/5 bg-white/85 px-5 py-6 shadow-[0_18px_48px_rgba(15,23,42,0.06)]"
            >
              <p className="text-xs font-semibold tracking-widest text-emerald-700 uppercase">
                {g.code}
              </p>
              <p className="mt-2 text-lg font-semibold text-slate-900">{g.title}</p>
              <p className="mt-2 text-sm leading-7 text-slate-600">{g.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ Section ── */}
      <section className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-8">
        <h2 className="font-display font-semibold text-4xl text-slate-950 sm:text-5xl">
          常见问题
        </h2>

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {faqList.map((faq) => (
            <div
              key={faq.q}
              className="rounded-[30px] border border-black/5 bg-white/85 px-6 py-6 shadow-[0_18px_48px_rgba(15,23,42,0.06)]"
            >
              <p className="text-lg font-semibold text-slate-900">{faq.q}</p>
              <p className="mt-3 text-sm leading-7 text-slate-600">{faq.a}</p>
            </div>
          ))}
        </div>

        {/* Link buttons after FAQ */}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            href="/types"
            className="inline-flex items-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50"
          >
            查看所有人格类型
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50"
          >
            查看关于页面
          </Link>
          <Link
            href="/rankings"
            className="inline-flex items-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50"
          >
            查看人格排行榜
          </Link>
        </div>
      </section>

      {/* ── Rankings Preview ── */}
      <section className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-8">
        <h2 className="font-display font-semibold text-4xl text-slate-950 sm:text-5xl">
          做完测试后，可以把结果手动提交进站内人格榜。
        </h2>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          {/* Left — total submissions */}
          <div className="flex flex-col justify-between rounded-[32px] border border-black/5 bg-white/85 px-6 py-8 shadow-[0_18px_48px_rgba(15,23,42,0.06)]">
            <div>
              <p className="text-6xl font-bold tracking-tight text-slate-900">4477</p>
              <p className="mt-2 text-sm leading-7 text-slate-500">
                累计收到的人格提交次数。排行榜每天更新一次，展示所有人格类型的提交占比和排名趋势。
              </p>
            </div>
            <Link
              href="/rankings"
              className="mt-6 inline-flex w-fit items-center rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
            >
              查看完整排行榜
            </Link>
          </div>

          {/* Right — top 3 */}
          <div className="flex flex-col gap-4">
            {topRankings.map((r) => (
              <Link
                key={r.slug}
                href={`/result/${r.slug}`}
                className="flex items-center gap-5 rounded-[28px] border border-black/5 bg-white/85 px-5 py-5 shadow-[0_18px_48px_rgba(15,23,42,0.06)] transition hover:shadow-[0_18px_48px_rgba(15,23,42,0.10)]"
              >
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-800">
                  #{r.rank}
                </span>
                <div className="flex flex-col gap-0.5">
                  <p className="text-lg font-semibold text-slate-900">
                    {r.cn}{" "}
                    <span className="text-sm font-medium text-slate-400">{r.code}</span>
                  </p>
                  <p className="text-sm text-slate-500">
                    {r.count} 次 / {r.pct}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

import Image from "next/image";
import Link from "next/link";
import { personalityTypes } from "@/lib/types";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "人格类型总览",
};

export default function TypesPage() {
  return (
    <main className="flex-1">
      <section className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-8">
        <h1 className="font-display text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
          27 种 SBTI 人格类型总览
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
          这里收录了全部 SBTI
          结果类型。可以先快速浏览每一种人格，也可以直接进入测试页面，看看最后落到哪一种结果上。
        </p>

        {/* Grid */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {personalityTypes.map((t) => (
            <div
              key={t.code}
              className="flex flex-col items-center rounded-[30px] border border-black/5 bg-white/88 px-6 py-8 shadow-[0_18px_48px_rgba(15,23,42,0.06)] transition hover:shadow-[0_18px_48px_rgba(15,23,42,0.10)]"
            >
              <div className="relative h-[200px] w-[200px] overflow-hidden rounded-2xl">
                <Image
                  src={t.image}
                  alt={t.cn}
                  width={200}
                  height={200}
                  className="object-cover"
                />
              </div>

              <span className="mt-5 inline-block rounded-full bg-emerald-100 px-4 py-1 text-xs font-semibold tracking-widest text-emerald-800 uppercase">
                {t.code}
              </span>

              <h2 className="mt-3 text-2xl font-bold text-slate-900">
                {t.cn}
              </h2>

              <p className="mt-2 text-center text-sm leading-6 text-slate-600">
                {t.intro}
              </p>

              <Link
                href={`/result/${t.slug}`}
                className="mt-4 text-sm font-medium text-emerald-700 transition hover:text-emerald-900"
              >
                查看人格详情 &rarr;
              </Link>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 flex justify-center">
          <Link
            href="/test"
            className="inline-flex items-center rounded-full bg-emerald-600 px-8 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
          >
            开始测试
          </Link>
        </div>
      </section>
    </main>
  );
}

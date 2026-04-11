"use client";

import { useState } from "react";
import { useDictionary } from "@/components/DictionaryProvider";
import { LocaleLink } from "@/components/LocaleLink";
import { miniTests, miniTestBySlug } from "@/lib/mini-tests";
import type { RankedTest } from "@/lib/mini-test-ranking";

const TAG_KEYS = [
  { id: "all", key: "tests.tagAll" },
  { id: "fun", key: "tests.tagFun" },
  { id: "emotion", key: "tests.tagEmotion" },
  { id: "career", key: "tests.tagCareer" },
  { id: "practical", key: "tests.tagPractical" },
  { id: "social", key: "tests.tagSocial" },
];

function formatCount(n: number): string {
  if (n >= 10000) return `${(n / 10000).toFixed(1)}w`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

export function TestsContent({ ranked }: { ranked: RankedTest[] }) {
  const { t } = useDictionary();
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState("all");

  // Build ordered test list from ranking
  const orderedTests = ranked
    .map((r) => {
      const test = miniTestBySlug[r.testId];
      if (!test) return null;
      return { ...test, totalTakes: r.totalTakes };
    })
    .filter(Boolean) as (typeof miniTests[number] & { totalTakes: number })[];

  // Filter by search and tag
  const filtered = orderedTests.filter((test) => {
    const title = t(`minitest.${test.id}.title`);
    const subtitle = t(`minitest.${test.id}.subtitle`);
    const matchesSearch =
      !search ||
      title.toLowerCase().includes(search.toLowerCase()) ||
      subtitle.toLowerCase().includes(search.toLowerCase());
    const matchesTag =
      activeTag === "all" || test.tags.includes(activeTag);
    return matchesSearch && matchesTag;
  });

  return (
    <section className="mx-auto w-full max-w-3xl px-5 py-12 sm:px-8">
      {/* Hero */}
      <div className="mb-10 text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl border border-emerald-900/10 bg-white text-4xl shadow-lg dark:border-emerald-400/15 dark:bg-dark-card">
          🧩
        </div>
        <h1 className="font-display text-4xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-5xl">
          {t("tests.title")}
        </h1>
        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-slate-500 dark:text-slate-400">
          {t("tests.desc")}
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <svg
          className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t("tests.search")}
          className="w-full rounded-2xl border border-black/5 bg-white/80 py-3.5 pl-11 pr-4 text-sm text-slate-900 outline-none backdrop-blur-sm transition placeholder:text-slate-400 focus:border-emerald-500/30 focus:ring-2 focus:ring-emerald-500/10 dark:border-white/10 dark:bg-white/5 dark:text-slate-100 dark:placeholder:text-slate-500"
        />
      </div>

      {/* Tag filter */}
      <div className="mb-8 flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {TAG_KEYS.map((tag) => (
          <button
            key={tag.id}
            onClick={() => setActiveTag(tag.id)}
            className={`shrink-0 rounded-full border px-5 py-2 text-sm font-medium transition ${
              activeTag === tag.id
                ? "border-emerald-600/20 bg-emerald-50 text-emerald-800 dark:border-emerald-400/25 dark:bg-emerald-900/30 dark:text-emerald-300"
                : "border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
            }`}
          >
            {t(tag.key)}
          </button>
        ))}
      </div>

      {/* Test cards */}
      <div className="flex flex-col gap-4">
        {filtered.map((test) => (
          <LocaleLink
            key={test.id}
            href={`/tests/${test.slug}`}
            className="group relative flex items-start gap-4 rounded-3xl border border-black/5 bg-white/85 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-white/8 dark:bg-dark-card sm:p-6"
          >
            {/* Accent top line */}
            <div
              className="absolute left-0 right-0 top-0 h-0.5 rounded-t-3xl opacity-0 transition-opacity group-hover:opacity-100"
              style={{ backgroundColor: test.accent }}
            />

            {/* Icon */}
            <div
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-3xl transition group-hover:-rotate-6 group-hover:scale-110"
              style={{
                backgroundColor: test.accentLight + "60",
                border: `1px solid ${test.accent}20`,
              }}
            >
              {test.icon}
            </div>

            {/* Content */}
            <div className="min-w-0 flex-1">
              <div className="mb-1 flex flex-wrap items-center gap-2">
                <span className="text-base font-bold text-slate-900 dark:text-white">
                  {t(`minitest.${test.id}.title`)}
                </span>
                {test.tags.includes("fun") && (
                  <span
                    className="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase text-white"
                    style={{ backgroundColor: test.accent }}
                  >
                    HOT
                  </span>
                )}
              </div>
              <p className="mb-3 text-sm text-slate-500 dark:text-slate-400">
                {t(`minitest.${test.id}.subtitle`)}
              </p>
              <div className="flex items-center gap-4 text-xs text-slate-400 dark:text-slate-500">
                <span className="flex items-center gap-1">
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                  {t("tests.duration", { min: test.questionCount <= 10 ? "2" : "3" })}
                </span>
                <span>{t("tests.questions", { count: String(test.questionCount) })}</span>
                {test.totalTakes > 0 && (
                  <span className="flex items-center gap-1">
                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                    {t("tests.popularity", { count: formatCount(test.totalTakes) })}
                  </span>
                )}
              </div>
            </div>

            {/* Arrow */}
            <div className="mt-2 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-black/5 bg-slate-50 transition group-hover:translate-x-1 dark:border-white/8 dark:bg-white/5">
              <svg
                className="h-4 w-4 text-slate-300 transition group-hover:text-slate-500 dark:text-slate-600 dark:group-hover:text-slate-300"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </LocaleLink>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-16 text-center text-sm text-slate-400 dark:text-slate-500">
          {t("tests.noResults")}
        </div>
      )}

      <p className="mt-12 text-center text-xs text-slate-300 dark:text-slate-600">
        {t("tests.disclaimer")}
      </p>
    </section>
  );
}

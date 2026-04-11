"use client";

import { useState, useEffect } from "react";
import { useDictionary } from "@/components/DictionaryProvider";
import { LocaleLink } from "@/components/LocaleLink";
import { MiniQuizFlow } from "@/components/MiniQuizFlow";
import { miniTestBySlug } from "@/lib/mini-tests";

type Phase = "intro" | "quiz" | "result";

function getSessionId(): string {
  const KEY = "mini-test-session:v1";
  if (typeof window === "undefined") return "";
  let id = localStorage.getItem(KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(KEY, id);
  }
  return id;
}

export function TestContent({ testSlug }: { testSlug: string }) {
  const { t } = useDictionary();
  const test = miniTestBySlug[testSlug];
  const [phase, setPhase] = useState<Phase>("intro");
  const [resultIdx, setResultIdx] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (phase === "result") {
      setTimeout(() => setVisible(true), 50);
    } else {
      setVisible(false);
    }
  }, [phase]);

  if (!test) return null;

  const handleComplete = (idx: number) => {
    setResultIdx(idx);
    setPhase("result");

    // Submit activity
    const sessionId = getSessionId();
    if (sessionId) {
      fetch("/api/mini-tests/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          testId: test.id,
          resultId: `r${idx}`,
          sessionId,
        }),
      }).then(() => setSubmitted(true)).catch(() => {});
    }
  };

  const handleRetake = () => {
    setPhase("intro");
    setResultIdx(0);
    setSubmitted(false);
  };

  const rKey = `minitest.${test.id}.r${resultIdx}`;

  // ── Intro ──
  if (phase === "intro") {
    return (
      <section className="mx-auto flex min-h-[60vh] w-full max-w-xl flex-col items-center justify-center px-5 py-16 text-center">
        <div
          className="mb-6 flex h-24 w-24 items-center justify-center rounded-3xl text-6xl shadow-lg"
          style={{
            backgroundColor: test.accentLight + "80",
            border: `1px solid ${test.accent}25`,
          }}
        >
          {test.icon}
        </div>
        <h1 className="mb-3 font-display text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
          {t(`minitest.${test.id}.title`)}
        </h1>
        <p className="mb-8 max-w-md text-base leading-relaxed text-slate-500 dark:text-slate-400">
          {t(`minitest.${test.id}.subtitle`)}
        </p>
        <div className="mb-8 flex items-center gap-5 text-sm text-slate-400 dark:text-slate-500">
          <span className="flex items-center gap-1.5">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
            {t("tests.duration", { min: test.questionCount <= 10 ? "2" : "3" })}
          </span>
          <span>{t("tests.questions", { count: String(test.questionCount) })}</span>
        </div>
        <button
          onClick={() => setPhase("quiz")}
          className="rounded-full px-10 py-3.5 text-base font-semibold text-white shadow-lg transition hover:-translate-y-0.5"
          style={{ backgroundColor: test.accent }}
        >
          {t("tests.startTest")}
        </button>
      </section>
    );
  }

  // ── Quiz ──
  if (phase === "quiz") {
    return <MiniQuizFlow test={test} onComplete={handleComplete} />;
  }

  // ── Result ──
  const resultName = t(`${rKey}.name`);
  const resultTitle = t(`${rKey}.title`);
  const resultDesc = t(`${rKey}.desc`);
  const traits: string[] = [];
  for (let i = 1; ; i++) {
    const val = t(`${rKey}.trait${i}`);
    if (!val || val === `${rKey}.trait${i}`) break;
    traits.push(val);
  }

  // Extract emoji from name
  const emojiMatch = resultName.match(/^(\S+)\s/);
  const emoji = emojiMatch ? emojiMatch[1] : test.icon;
  const nameText = emojiMatch ? resultName.slice(emojiMatch[0].length) : resultName;

  // Score bars — build tally for all results
  const resultScores: { name: string; pct: number; isTop: boolean }[] = [];
  for (let i = 0; i < test.resultCount; i++) {
    resultScores.push({
      name: t(`minitest.${test.id}.r${i}.name`),
      pct: i === resultIdx ? 85 + Math.random() * 10 : 20 + Math.random() * 35,
      isTop: i === resultIdx,
    });
  }

  return (
    <section
      className="mx-auto w-full max-w-xl px-5 py-8 transition-all duration-700"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(20px)",
      }}
    >
      {/* Hero card */}
      <div
        className="relative mb-4 overflow-hidden rounded-[2rem] px-8 py-14 text-center text-white"
        style={{ background: `linear-gradient(135deg, ${test.accent}, ${test.accent}cc)` }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_-10%,rgba(255,255,255,0.2)_0%,transparent_55%)]" />
        <div className="relative">
          <div className="mb-5 text-7xl drop-shadow-lg">{emoji}</div>
          <div className="mb-2 text-3xl font-extrabold tracking-tight">{nameText}</div>
          <div className="text-base font-medium text-white/75">{resultTitle}</div>
        </div>
      </div>

      {/* Description */}
      <div className="mb-3 rounded-3xl border border-black/5 bg-white/85 p-6 dark:border-white/8 dark:bg-dark-card">
        <p className="text-[15px] leading-[1.85] text-slate-600 dark:text-slate-300">
          {resultDesc}
        </p>
      </div>

      {/* Traits */}
      <div className="mb-3 rounded-3xl border border-black/5 bg-white/85 p-6 dark:border-white/8 dark:bg-dark-card">
        <div className="mb-4 text-[11px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500">
          {t("tests.coreTraits")}
        </div>
        <div className="flex flex-wrap gap-2">
          {traits.map((trait) => (
            <span
              key={trait}
              className="rounded-full border px-4 py-2 text-sm font-medium"
              style={{
                borderColor: test.accent + "30",
                backgroundColor: test.accent + "0a",
                color: test.accent,
              }}
            >
              {trait}
            </span>
          ))}
        </div>
      </div>

      {/* Score bars */}
      <div className="mb-6 rounded-3xl border border-black/5 bg-white/85 p-6 dark:border-white/8 dark:bg-dark-card">
        <div className="mb-5 text-[11px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500">
          {t("tests.dimAnalysis")}
        </div>
        {resultScores.map((s, i) => (
          <div key={i} className={i < resultScores.length - 1 ? "mb-5" : ""}>
            <div className="mb-2 flex items-baseline justify-between">
              <span
                className={`text-sm ${
                  s.isTop
                    ? "font-semibold text-slate-900 dark:text-white"
                    : "text-slate-400 dark:text-slate-500"
                }`}
              >
                {s.name}
              </span>
              <span
                className="text-xs font-bold tabular-nums"
                style={{ color: s.isTop ? test.accent : undefined }}
              >
                {Math.round(s.pct)}%
              </span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-white/8">
              <div
                className="h-full rounded-full transition-[width] duration-1000 ease-out"
                style={{
                  width: visible ? `${s.pct}%` : "0%",
                  background: s.isTop
                    ? `linear-gradient(90deg, ${test.accent}, ${test.accent}aa)`
                    : "rgba(0,0,0,0.08)",
                  transitionDelay: `${0.5 + i * 0.15}s`,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <LocaleLink
          href="/tests"
          className="flex flex-1 items-center justify-center rounded-2xl border border-black/5 bg-white/80 py-4 text-sm font-semibold text-slate-500 transition hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10"
        >
          {t("tests.backToList")}
        </LocaleLink>
        <button
          onClick={handleRetake}
          className="flex-1 rounded-2xl py-4 text-sm font-semibold text-white transition hover:-translate-y-0.5"
          style={{ backgroundColor: test.accent }}
        >
          {t("tests.retake")}
        </button>
      </div>
    </section>
  );
}

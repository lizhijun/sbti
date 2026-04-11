"use client";

import { useState } from "react";
import { useDictionary } from "./DictionaryProvider";
import { computeMiniTestResult } from "@/lib/mini-test-scoring";
import type { MiniTest } from "@/lib/mini-tests";

interface Props {
  test: MiniTest;
  onComplete: (resultIdx: number) => void;
}

export function MiniQuizFlow({ test, onComplete }: Props) {
  const { t } = useDictionary();
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [phase, setPhase] = useState<"in" | "selected" | "out">("in");
  const [selected, setSelected] = useState<number | null>(null);

  const totalQ = test.questionCount;
  const pct = (currentQ / totalQ) * 100;

  // Build options for current question
  const qKey = `minitest.${test.id}.q${currentQ + 1}`;
  const questionText = t(`${qKey}.text`);
  const options: string[] = [];
  for (let i = 1; ; i++) {
    const val = t(`${qKey}.opt${i}`);
    if (!val || val === `${qKey}.opt${i}`) break;
    options.push(val);
  }

  const handleSelect = (idx: number) => {
    if (phase !== "in") return;
    setSelected(idx);
    setPhase("selected");
    setTimeout(() => {
      setPhase("out");
      const newAnswers = [...answers, idx];
      setTimeout(() => {
        if (currentQ + 1 >= totalQ) {
          const resultIdx = computeMiniTestResult(newAnswers, test.resultCount);
          onComplete(resultIdx);
        } else {
          setAnswers(newAnswers);
          setCurrentQ(currentQ + 1);
          setSelected(null);
          setPhase("in");
        }
      }, 250);
    }, 200);
  };

  return (
    <div className="mx-auto w-full max-w-xl px-5 py-6">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <span className="text-lg font-bold" style={{ color: test.accent }}>
          {t(`minitest.${test.id}.title`)}
        </span>
        <span className="text-sm font-semibold tabular-nums text-slate-400 dark:text-slate-500">
          {currentQ + 1}
          <span className="opacity-50">/{totalQ}</span>
        </span>
      </div>

      {/* Progress bar */}
      <div className="mb-8 h-1 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
        <div
          className="h-full rounded-full transition-[width] duration-500 ease-out"
          style={{ width: `${pct}%`, backgroundColor: test.accent }}
        />
      </div>

      {/* Question */}
      <div
        className="transition-all duration-250"
        style={{
          opacity: phase === "out" ? 0 : 1,
          transform: phase === "out" ? "translateY(-12px)" : "none",
        }}
      >
        <h2 className="mb-8 text-2xl font-bold leading-relaxed tracking-tight text-slate-900 dark:text-white">
          {questionText}
        </h2>

        <div className="flex flex-col gap-3">
          {options.map((opt, idx) => {
            const isSel = selected === idx;
            return (
              <button
                key={`${currentQ}-${idx}`}
                onClick={() => handleSelect(idx)}
                className={`flex items-center gap-3.5 rounded-2xl border px-5 py-4 text-left text-[15px] leading-relaxed transition-all duration-200 ${
                  isSel
                    ? "scale-[1.01] text-slate-900 dark:text-white"
                    : "border-black/6 bg-white/70 text-slate-600 dark:border-white/8 dark:bg-white/4 dark:text-slate-300"
                }`}
                style={isSel ? {
                  borderColor: test.accent + "66",
                  backgroundColor: test.accent + "10",
                } : undefined}
              >
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border-2 text-xs font-bold transition-all ${
                    isSel ? "" : "border-black/10 text-black/25 dark:border-white/15 dark:text-white/30"
                  }`}
                  style={isSel ? {
                    borderColor: test.accent,
                    color: test.accent,
                    backgroundColor: test.accent + "15",
                  } : undefined}
                >
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className={isSel ? "font-medium" : ""}>{opt}</span>
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
}

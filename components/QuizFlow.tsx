"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { questions, drinkQuestions } from "@/lib/questions";
import { computeResult, createSubmissionId, writeResultSnapshot } from "@/lib/scoring";
import { dimensionMeta } from "@/lib/dimensions";

type Phase = "quiz" | "drink_gate" | "drink_trigger" | "computing";

export function QuizFlow() {
  const router = useRouter();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [phase, setPhase] = useState<Phase>("quiz");
  const [isDrunk, setIsDrunk] = useState(false);

  /* ---- derive current question ---- */
  const drinkGate = drinkQuestions.find((q) => q.kind === "drink_gate")!;
  const drinkTrigger = drinkQuestions.find((q) => q.kind === "drink_trigger")!;

  const currentQuestion =
    phase === "quiz"
      ? questions[currentIndex]
      : phase === "drink_gate"
        ? drinkGate
        : drinkTrigger;

  const questionId = currentQuestion.id;
  const selectedValue = answers[questionId] as number | undefined;

  /* ---- display number ---- */
  const displayNumber =
    phase === "quiz" ? currentIndex + 1 : questions.length + 1;
  const totalDisplay = questions.length + 1; // 31

  /* ---- dimension label (only for regular questions) ---- */
  const dimInfo =
    phase === "quiz" && "dim" in currentQuestion
      ? dimensionMeta[currentQuestion.dim]
      : null;

  /* ---- handlers ---- */
  function selectOption(value: number) {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
    // 选中后自动进入下一题（短暂延迟让用户看到选中态）
    setTimeout(() => {
      handleNextWith(value);
    }, 300);
  }

  function handleNextWith(value: number) {
    if (phase === "quiz") {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex((i) => i + 1);
      } else {
        setPhase("drink_gate");
      }
    } else if (phase === "drink_gate") {
      if (value === 3) {
        setPhase("drink_trigger");
      } else {
        finishQuiz(false);
      }
    } else if (phase === "drink_trigger") {
      const drunk = value === 2;
      setIsDrunk(drunk);
      finishQuiz(drunk);
    }
  }

  function handleNext() {
    if (selectedValue === undefined) return;
    handleNextWith(selectedValue);
  }

  function handlePrev() {
    if (phase === "drink_trigger") {
      setPhase("drink_gate");
    } else if (phase === "drink_gate") {
      setCurrentIndex(questions.length - 1);
      setPhase("quiz");
    } else if (phase === "quiz" && currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
    }
  }

  function finishQuiz(drunk: boolean) {
    setPhase("computing");
    const result = computeResult(answers, drunk);
    const submissionId = createSubmissionId();
    writeResultSnapshot({
      ...result,
      finalTypeCode: result.finalType.code,
      submissionId,
    });
    router.push(`/result/${result.finalType.slug}`);
  }

  /* ---- computing state ---- */
  if (phase === "computing") {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-24">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-200 border-t-emerald-700" />
        <p className="text-sm text-slate-500">正在计算你的人格结果...</p>
      </div>
    );
  }

  /* ---- can go back? ---- */
  const canGoBack =
    phase !== "quiz" || currentIndex > 0;

  return (
    <div className="rounded-[36px] border border-black/5 bg-white/90 px-8 py-10 shadow-[0_28px_80px_rgba(15,23,42,0.08)]">
      {/* progress */}
      <p className="text-xs font-medium uppercase tracking-widest text-slate-400">
        第 {displayNumber} / {totalDisplay} 题
      </p>

      {/* dimension info */}
      {dimInfo && (
        <p className="mt-2 text-xs font-medium text-emerald-700/70">
          {dimInfo.model} &middot; {dimInfo.name}
        </p>
      )}

      {/* question text */}
      <h2 className="mt-5 text-xl leading-relaxed text-slate-950 sm:text-2xl">
        {currentQuestion.text}
      </h2>

      {/* options */}
      <div className="mt-8 flex flex-col gap-3">
        {currentQuestion.options.map((opt) => {
          const isSelected = selectedValue === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => selectOption(opt.value)}
              className={`w-full rounded-[20px] border px-5 py-4 text-left text-sm leading-relaxed transition sm:text-base ${
                isSelected
                  ? "border-emerald-900 bg-emerald-50 text-slate-900"
                  : "border-black/5 bg-white/85 text-slate-700 hover:border-slate-300"
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>

      {/* nav buttons */}
      <div className="mt-10 flex items-center justify-between">
        <button
          type="button"
          onClick={handlePrev}
          disabled={!canGoBack}
          className="rounded-full border border-black/5 bg-white px-5 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-30"
        >
          上一题
        </button>

        <button
          type="button"
          onClick={handleNext}
          disabled={selectedValue === undefined}
          className="rounded-full bg-emerald-900 px-6 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
        >
          下一题
        </button>
      </div>
    </div>
  );
}

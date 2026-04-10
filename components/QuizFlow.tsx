"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { questions, drinkQuestions } from "@/lib/questions";
import { computeResult, createSubmissionId, writeResultSnapshot } from "@/lib/scoring";
import { dimensionMeta } from "@/lib/dimensions";
import { useLocale } from "./Providers";

type Phase = "quiz" | "drink_gate" | "drink_trigger" | "computing";

export function QuizFlow() {
  const router = useRouter();
  const { t } = useLocale();

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
  const totalDisplay = questions.length + 1;

  /* ---- dimension label (only for regular questions) ---- */
  const dimInfo =
    phase === "quiz" && "dim" in currentQuestion
      ? dimensionMeta[currentQuestion.dim]
      : null;

  /* ---- handlers ---- */
  function selectOption(value: number) {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
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
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-200 dark:border-emerald-800 border-t-emerald-700 dark:border-t-emerald-400" />
        <p className="text-sm text-slate-500 dark:text-slate-400">{t("quiz.computing")}</p>
      </div>
    );
  }

  /* ---- can go back? ---- */
  const canGoBack =
    phase !== "quiz" || currentIndex > 0;

  return (
    <div className="rounded-[36px] border border-black/5 dark:border-white/10 bg-white/90 dark:bg-dark-card px-8 py-10 shadow-[0_28px_80px_rgba(15,23,42,0.08)] dark:shadow-none">
      {/* progress */}
      <p className="text-xs font-medium uppercase tracking-widest text-slate-400">
        {t("quiz.progress", { current: displayNumber, total: totalDisplay })}
      </p>

      {/* dimension info */}
      {dimInfo && (() => {
        const dimCode = dimInfo.code;
        const modelKey = dimCode.startsWith("S") ? "model.self"
          : dimCode.startsWith("E") ? "model.emotion"
          : dimCode.startsWith("A") && !dimCode.startsWith("Ac") ? "model.attitude"
          : dimCode.startsWith("Ac") ? "model.action"
          : "model.social";
        return (
          <p className="mt-2 text-xs font-medium text-emerald-700/70 dark:text-emerald-400/70">
            {t(modelKey)} &middot; {t(`dim.${dimCode}`)}
          </p>
        );
      })()}

      {/* question text */}
      <h2 className="mt-5 text-xl leading-relaxed text-slate-950 dark:text-white sm:text-2xl">
        {t(`q.${questionId}.text`)}
      </h2>

      {/* options */}
      <div className="mt-8 flex flex-col gap-3">
        {currentQuestion.options.map((opt, idx) => {
          const isSelected = selectedValue === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => selectOption(opt.value)}
              className={`w-full rounded-[20px] border px-5 py-4 text-left text-sm leading-relaxed transition sm:text-base ${
                isSelected
                  ? "border-emerald-900 dark:border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30 text-slate-900 dark:text-slate-100"
                  : "border-black/5 dark:border-white/10 bg-white/85 dark:bg-dark-card text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-500"
              }`}
            >
              {t(`q.${questionId}.opt${idx + 1}`)}
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
          className="rounded-full border border-black/5 dark:border-white/10 bg-white dark:bg-dark-card px-5 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-300 transition hover:bg-slate-50 dark:hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30"
        >
          {t("quiz.prev")}
        </button>

        <button
          type="button"
          onClick={handleNext}
          disabled={selectedValue === undefined}
          className="rounded-full bg-emerald-900 dark:bg-emerald-700 px-6 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-emerald-800 dark:hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
        >
          {t("quiz.next")}
        </button>
      </div>
    </div>
  );
}

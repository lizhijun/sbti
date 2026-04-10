"use client";

import { useEffect, useState } from "react";
import { readResultSnapshot } from "@/lib/scoring";
import { useLocale } from "./Providers";

type Status = "idle" | "submitting" | "done" | "error" | "already";

export function SubmitRanking({ typeCode }: { typeCode: string }) {
  const { t } = useLocale();
  const [status, setStatus] = useState<Status>("idle");
  const [snapshot, setSnapshot] = useState<ReturnType<typeof readResultSnapshot> & { submissionId?: string; finalTypeCode?: string } | null>(null);

  useEffect(() => {
    const raw = readResultSnapshot() as ReturnType<typeof readResultSnapshot> & { submissionId?: string; finalTypeCode?: string } | null;
    if (raw && raw.finalTypeCode === typeCode && raw.submissionId) {
      setSnapshot(raw);
    }
  }, [typeCode]);

  if (!snapshot) return null;

  async function handleSubmit() {
    if (!snapshot) return;
    setStatus("submitting");
    try {
      const res = await fetch("/api/rankings/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          typeCode: snapshot.finalTypeCode,
          submissionId: snapshot.submissionId,
          rawScores: snapshot.rawScores,
          levels: snapshot.levels,
          similarity: snapshot.similarity,
        }),
      });
      if (res.status === 409) {
        setStatus("already");
      } else if (res.ok) {
        setStatus("done");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-full border border-emerald-200 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-900/30 px-6 py-3 text-sm font-semibold text-emerald-700 dark:text-emerald-300">
        {t("submit.done")}
      </div>
    );
  }

  if (status === "already") {
    return (
      <div className="rounded-full border border-amber-200 dark:border-amber-700 bg-amber-50 dark:bg-amber-900/30 px-6 py-3 text-sm font-semibold text-amber-700 dark:text-amber-300">
        {t("submit.already")}
      </div>
    );
  }

  return (
    <button
      onClick={handleSubmit}
      disabled={status === "submitting"}
      className="inline-flex items-center rounded-full bg-emerald-600 dark:bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 dark:hover:bg-emerald-400 disabled:opacity-50"
    >
      {status === "submitting" ? t("submit.submitting") : t("submit.button")}
    </button>
  );
}

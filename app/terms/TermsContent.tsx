"use client";

import { useDictionary } from "@/components/DictionaryProvider";

export function TermsContent() {
  const { t } = useDictionary();

  return (
    <section className="mx-auto w-full max-w-3xl px-5 py-10 sm:px-8">
      <h1 className="font-display text-4xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-5xl">
        {t("terms.title")}
      </h1>
      <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
        {t("terms.updated")}
      </p>

      <div className="mt-8 space-y-8 text-base leading-7 text-slate-700 dark:text-slate-300">
        <div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">{t("terms.s1.title")}</h2>
          <p className="mt-2">{t("terms.s1.text")}</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">{t("terms.s2.title")}</h2>
          <p className="mt-2">{t("terms.s2.text")}</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">{t("terms.s3.title")}</h2>
          <p className="mt-2">{t("terms.s3.text")}</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">{t("terms.s4.title")}</h2>
          <p className="mt-2">{t("terms.s4.text")}</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">{t("terms.s5.title")}</h2>
          <p className="mt-2">{t("terms.s5.text")}</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">{t("terms.s6.title")}</h2>
          <p className="mt-2">{t("terms.s6.text")}</p>
        </div>
      </div>
    </section>
  );
}

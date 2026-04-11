"use client";

import { LocaleLink } from "@/components/LocaleLink";
import { useCallback, useEffect, useState } from "react";
import QRCode from "qrcode";
import { useDictionary } from "@/components/DictionaryProvider";
import { typeByCode } from "@/lib/types";

const SITE_URL = "https://sbti.xiachat.com";

/* ── Canvas helpers ── */

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

/* ── SVG icons ── */

const DownloadIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

interface RankingItem {
  code: string;
  count: number;
  cn: string;
  slug: string;
}

export function RankingsContent() {
  const { t } = useDictionary();
  const [rankings, setRankings] = useState<RankingItem[]>([]);
  const [total, setTotal] = useState<number | null>(null);
  const [generating, setGenerating] = useState(false);

  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10);
  const timeStr = now.toTimeString().slice(0, 5);

  useEffect(() => {
    fetch("/api/rankings")
      .then((res) => res.json())
      .then((data: { rankings: { code: string; count: number }[]; total: number }) => {
        setTotal(data.total);
        setRankings(
          data.rankings.map((item) => {
            const tp = typeByCode[item.code];
            return {
              code: item.code,
              count: item.count,
              cn: tp?.cn ?? item.code,
              slug: tp?.slug ?? "",
            };
          })
        );
      })
      .catch(() => {});
  }, []);

  const loading = total === null;
  const top3 = rankings.slice(0, 3);
  const rest = rankings.slice(3);
  const maxCount = rankings[0]?.count ?? 1;
  const typeCount = rankings.length;

  const generateAndDownload = useCallback(async () => {
    setGenerating(true);
    try {
      const displayItems = rankings.slice(0, 15);
      const rowH = 48;
      const headerH = 200;
      const footerH = 140;
      const W = 750;
      const H = headerH + displayItems.length * rowH + footerH + 40;
      const pad = 40;

      const canvas = document.createElement("canvas");
      canvas.width = W;
      canvas.height = H;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      await document.fonts.ready;

      // Background
      ctx.fillStyle = "#f7f4ed";
      ctx.fillRect(0, 0, W, H);

      // Card
      ctx.fillStyle = "#ffffff";
      roundRect(ctx, pad, pad, W - pad * 2, H - pad * 2, 28);
      ctx.fill();
      ctx.strokeStyle = "rgba(0,0,0,0.06)";
      ctx.lineWidth = 1;
      roundRect(ctx, pad, pad, W - pad * 2, H - pad * 2, 28);
      ctx.stroke();

      const cx = pad + 30;

      // Title
      ctx.fillStyle = "#0f172a";
      ctx.font = 'bold 32px "Noto Sans SC", system-ui, sans-serif';
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      ctx.fillText(t("rankings.title"), cx, pad + 30);

      // Stats line
      ctx.fillStyle = "#64748b";
      ctx.font = '400 16px "Noto Sans SC", system-ui, sans-serif';
      ctx.fillText(
        `${t("rankings.totalSubmissions")} ${(total ?? 0).toLocaleString()}  ·  ${typeCount} ${t("rankings.typesUnit")}${t("rankings.typesOnBoard")}  ·  ${dateStr}`,
        cx, pad + 76
      );

      // Divider
      const divY1 = pad + 110;
      ctx.strokeStyle = "rgba(0,0,0,0.08)";
      ctx.beginPath();
      ctx.moveTo(cx, divY1);
      ctx.lineTo(W - pad - 30, divY1);
      ctx.stroke();

      // Column header
      const startY = pad + 130;
      ctx.fillStyle = "#94a3b8";
      ctx.font = '600 13px "Noto Sans SC", system-ui, sans-serif';
      ctx.textAlign = "left";
      ctx.fillText("#", cx, startY);
      ctx.fillText(t("nav.types"), cx + 40, startY);
      ctx.textAlign = "right";
      ctx.fillText("%", W - pad - 30, startY);

      // Ranking rows
      const barMaxW = 240;
      const barX = 330;
      const barH = 16;

      displayItems.forEach((item, i) => {
        const y = headerH + i * rowH;
        const rank = i + 1;
        const t_ = total ?? 0;
        const pct = t_ > 0 ? ((item.count / t_) * 100).toFixed(1) : "0.0";
        const barW = (item.count / maxCount) * barMaxW;

        // Rank number
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        if (rank <= 3) {
          ctx.fillStyle = "#065f46";
          ctx.font = 'bold 16px "Noto Sans SC", system-ui, sans-serif';
        } else {
          ctx.fillStyle = "#64748b";
          ctx.font = '400 15px "Noto Sans SC", system-ui, sans-serif';
        }
        ctx.fillText(`${rank}`, cx, y + rowH / 2);

        // Name
        ctx.fillStyle = "#0f172a";
        ctx.font = rank <= 3
          ? 'bold 16px "Noto Sans SC", system-ui, sans-serif'
          : '400 15px "Noto Sans SC", system-ui, sans-serif';
        ctx.fillText(item.cn, cx + 40, y + rowH / 2);

        // Code badge
        ctx.font = '600 11px "Noto Sans SC", system-ui, sans-serif';
        const codeW = ctx.measureText(item.code).width + 16;
        const codeX = cx + 170;
        ctx.fillStyle = "#ecfdf5";
        roundRect(ctx, codeX, y + rowH / 2 - 10, codeW, 20, 10);
        ctx.fill();
        ctx.fillStyle = "#065f46";
        ctx.textAlign = "left";
        ctx.fillText(item.code, codeX + 8, y + rowH / 2);

        // Bar bg
        ctx.fillStyle = "#f1f5f9";
        roundRect(ctx, barX, y + rowH / 2 - barH / 2, barMaxW, barH, 8);
        ctx.fill();

        // Bar fill
        if (barW > 0) {
          ctx.fillStyle = rank <= 3 ? "#10b981" : "#6ee7b7";
          roundRect(ctx, barX, y + rowH / 2 - barH / 2, Math.max(barW, 8), barH, 8);
          ctx.fill();
        }

        // Count + percentage
        ctx.fillStyle = "#475569";
        ctx.font = '400 13px "Noto Sans SC", system-ui, sans-serif';
        ctx.textAlign = "right";
        ctx.fillText(`${item.count}  (${pct}%)`, W - pad - 30, y + rowH / 2);
      });

      // Footer divider
      const footerY = headerH + displayItems.length * rowH + 10;
      ctx.strokeStyle = "rgba(0,0,0,0.08)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(cx, footerY);
      ctx.lineTo(W - pad - 30, footerY);
      ctx.stroke();

      // QR code
      const qrDataUrl = await QRCode.toDataURL(`${SITE_URL}/rankings`, {
        width: 200, margin: 1, color: { dark: "#0f172a", light: "#ffffff" },
      });
      const qrImg = await loadImage(qrDataUrl);
      const qrSize = 90;
      const qrY = footerY + 20;
      ctx.drawImage(qrImg, cx, qrY, qrSize, qrSize);

      // Footer text
      ctx.fillStyle = "#0f172a";
      ctx.font = 'bold 18px "Noto Sans SC", system-ui, sans-serif';
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      ctx.fillText(t("share.canvasQr"), cx + qrSize + 20, qrY + 10);

      ctx.fillStyle = "#64748b";
      ctx.font = '400 14px "Noto Sans SC", system-ui, sans-serif';
      ctx.fillText("sbti.xiachat.com/rankings", cx + qrSize + 20, qrY + 38);

      ctx.fillStyle = "#94a3b8";
      ctx.font = '400 13px "Noto Sans SC", system-ui, sans-serif';
      ctx.fillText(t("rankings.shareTag"), cx + qrSize + 20, qrY + 62);

      // Download
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `SBTI-Rankings-${dateStr}.png`;
      link.href = dataUrl;
      link.click();
    } finally {
      setGenerating(false);
    }
  }, [rankings, total, maxCount, typeCount, dateStr, t]);

  return (
    <section className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-8">
      <h1 className="font-display text-4xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-5xl">
        {t("rankings.title")}
      </h1>
      <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600 dark:text-slate-400">
        {t("rankings.desc")}
      </p>

      {/* Share button */}
      <div className="mt-6">
        <button
          onClick={generateAndDownload}
          disabled={generating || loading}
          className="inline-flex items-center gap-2 rounded-full bg-emerald-600 dark:bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 dark:hover:bg-emerald-400 disabled:opacity-50"
        >
          {generating ? (
            <>
              <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              {t("rankings.generating")}
            </>
          ) : (
            <>
              <DownloadIcon />
              {t("rankings.share")}
            </>
          )}
        </button>
        <span className="ml-3 text-sm text-slate-500 dark:text-slate-400">{t("rankings.shareDesc")}</span>
      </div>

      {/* Stat cards */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-[28px] border border-black/5 dark:border-white/10 bg-white/85 dark:bg-dark-card px-6 py-6 shadow-[0_18px_48px_rgba(15,23,42,0.06)] dark:shadow-none">
          {loading ? (
            <div className="h-9 w-28 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-700" />
          ) : (
            <p className="text-3xl font-bold text-slate-900 dark:text-white">{total.toLocaleString()}</p>
          )}
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{t("rankings.totalSubmissions")}</p>
        </div>
        <div className="rounded-[28px] border border-black/5 dark:border-white/10 bg-white/85 dark:bg-dark-card px-6 py-6 shadow-[0_18px_48px_rgba(15,23,42,0.06)] dark:shadow-none">
          {loading ? (
            <div className="h-9 w-20 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-700" />
          ) : (
            <p className="text-3xl font-bold text-slate-900 dark:text-white">{typeCount} {t("rankings.typesUnit")}</p>
          )}
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{t("rankings.typesOnBoard")}</p>
        </div>
        <div className="rounded-[28px] border border-black/5 dark:border-white/10 bg-white/85 dark:bg-dark-card px-6 py-6 shadow-[0_18px_48px_rgba(15,23,42,0.06)] dark:shadow-none">
          <p className="text-3xl font-bold text-slate-900 dark:text-white">{dateStr}</p>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{t("rankings.lastUpdated")} {timeStr}</p>
        </div>
      </div>

      {/* Top 3 */}
      {loading ? (
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col items-center rounded-[30px] border border-black/5 dark:border-white/10 bg-white/85 dark:bg-dark-card px-6 py-8 shadow-[0_18px_48px_rgba(15,23,42,0.06)] dark:shadow-none">
              <div className="h-14 w-14 animate-pulse rounded-full bg-slate-200 dark:bg-slate-700" />
              <div className="mt-4 h-7 w-24 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-700" />
              <div className="mt-2 h-5 w-16 animate-pulse rounded-full bg-slate-200 dark:bg-slate-700" />
              <div className="mt-3 h-4 w-20 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
            </div>
          ))}
        </div>
      ) : top3.length > 0 ? (
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {top3.map((item, i) => {
            const pct = total! > 0 ? ((item.count / total!) * 100).toFixed(1) : "0.0";
            return (
              <LocaleLink
                key={item.code}
                href={`/result/${item.slug}`}
                className="flex flex-col items-center rounded-[30px] border border-black/5 dark:border-white/10 bg-white/85 dark:bg-dark-card px-6 py-8 shadow-[0_18px_48px_rgba(15,23,42,0.06)] dark:shadow-none transition hover:shadow-[0_18px_48px_rgba(15,23,42,0.10)]"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-900/40 text-xl font-bold text-emerald-800 dark:text-emerald-300">
                  #{i + 1}
                </span>
                <p className="mt-4 text-2xl font-bold text-slate-900 dark:text-white">{item.cn}</p>
                <span className="mt-2 inline-block rounded-full bg-emerald-100 dark:bg-emerald-900/40 px-3 py-0.5 text-xs font-semibold tracking-widest text-emerald-800 dark:text-emerald-300 uppercase">
                  {item.code}
                </span>
                <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                  {item.count} {t("home.timesUnit")} / {pct}%
                </p>
              </LocaleLink>
            );
          })}
        </div>
      ) : null}

      {/* Full ranking list */}
      {loading ? (
        <div className="mt-10 rounded-[30px] border border-black/5 dark:border-white/10 bg-white/85 dark:bg-dark-card px-6 py-6 shadow-[0_18px_48px_rgba(15,23,42,0.06)] dark:shadow-none">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{t("rankings.fullRanking")}</h2>
          <div className="mt-5 flex flex-col gap-3">
            {Array.from({ length: 8 }, (_, i) => (
              <div key={i} className="flex items-center gap-4 rounded-2xl px-3 py-2.5">
                <div className="h-5 w-8 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
                <div className="h-5 w-24 animate-pulse rounded bg-slate-200 dark:bg-slate-700 sm:w-32" />
                <div className="h-5 w-14 animate-pulse rounded-full bg-slate-200 dark:bg-slate-700" />
                <div className="flex flex-1 items-center gap-3">
                  <div className="h-2 flex-1 animate-pulse rounded-full bg-slate-200 dark:bg-slate-700" />
                  <div className="h-4 w-20 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : rest.length > 0 ? (
        <div className="mt-10 rounded-[30px] border border-black/5 dark:border-white/10 bg-white/85 dark:bg-dark-card px-6 py-6 shadow-[0_18px_48px_rgba(15,23,42,0.06)] dark:shadow-none">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{t("rankings.fullRanking")}</h2>

          <div className="mt-5 flex flex-col gap-3">
            {rest.map((item, i) => {
              const rank = i + 4;
              const pct = total! > 0 ? ((item.count / total!) * 100).toFixed(1) : "0.0";
              const barWidth = (item.count / maxCount) * 100;
              return (
                <LocaleLink
                  key={item.code}
                  href={`/result/${item.slug}`}
                  className="flex items-center gap-4 rounded-2xl px-3 py-2.5 transition hover:bg-emerald-50/60 dark:hover:bg-emerald-900/20"
                >
                  <span className="w-8 text-right text-sm font-semibold text-slate-400">{rank}</span>
                  <span className="w-24 truncate text-sm font-semibold text-slate-900 dark:text-slate-100 sm:w-32">{item.cn}</span>
                  <span className="inline-block rounded-full bg-emerald-100 dark:bg-emerald-900/40 px-2.5 py-0.5 text-[11px] font-semibold tracking-wider text-emerald-800 dark:text-emerald-300 uppercase">
                    {item.code}
                  </span>
                  <div className="flex flex-1 items-center gap-3">
                    <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
                      <div className="absolute inset-y-0 left-0 rounded-full bg-emerald-500 dark:bg-emerald-400" style={{ width: `${barWidth}%` }} />
                    </div>
                    <span className="w-20 text-right text-xs text-slate-500 dark:text-slate-400">
                      {item.count} / {pct}%
                    </span>
                  </div>
                </LocaleLink>
              );
            })}
          </div>
        </div>
      ) : null}

      {/* Empty state */}
      {!loading && rankings.length === 0 && (
        <div className="mt-10 rounded-[30px] border border-black/5 dark:border-white/10 bg-white/85 dark:bg-dark-card px-6 py-12 text-center shadow-[0_18px_48px_rgba(15,23,42,0.06)] dark:shadow-none">
          <p className="text-lg font-semibold text-slate-900 dark:text-white">{t("rankings.noData")}</p>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{t("rankings.noDataDesc")}</p>
        </div>
      )}

      {/* Bottom CTA */}
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <LocaleLink href="/test" className="inline-flex items-center rounded-full bg-emerald-600 dark:bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 dark:hover:bg-emerald-400">
          {t("nav.startTest")}
        </LocaleLink>
        <LocaleLink href="/types" className="inline-flex items-center rounded-full border border-slate-300 dark:border-slate-600 bg-white dark:bg-dark-card px-6 py-3 text-sm font-semibold text-slate-800 dark:text-slate-200 shadow-sm transition hover:bg-slate-50 dark:hover:bg-white/10">
          {t("rankings.viewAllTypes")}
        </LocaleLink>
      </div>
    </section>
  );
}

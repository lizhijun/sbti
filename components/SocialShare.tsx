"use client";

import { useCallback, useState, useEffect, useRef } from "react";
import QRCode from "qrcode";
import { useLocale } from "./Providers";

const SITE_URL = "https://sbti.xiachat.com";

interface ShareProps {
  code: string;
  cn: string;
  intro: string;
  slug: string;
  image: string;
}

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

function wrapText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number): number {
  const chars = text.split("");
  let line = "";
  let lineY = y;
  for (const char of chars) {
    const testLine = line + char;
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && line) {
      ctx.fillText(line, x, lineY);
      line = char;
      lineY += lineHeight;
    } else {
      line = testLine;
    }
  }
  if (line) {
    ctx.fillText(line, x, lineY);
    lineY += lineHeight;
  }
  return lineY;
}

/* ── SVG icons ── */

const WechatIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
    <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.63-1.78 6.22.186.53.467 1.01.825 1.434a.617.617 0 0 1 .083.196l-.386 1.462a.296.296 0 0 0-.012.071.293.293 0 0 0 .29.295.326.326 0 0 0 .167-.054l1.522-.89a.864.864 0 0 1 .717-.098 8.277 8.277 0 0 0 2.276.318c3.874 0 7.017-2.78 7.017-6.21-.001-3.22-2.878-5.861-6.439-6.53zm-2.985 3.178c.529 0 .96.436.96.972s-.43.972-.96.972a.968.968 0 0 1-.958-.972c0-.536.43-.972.958-.972zm4.788 0c.529 0 .96.436.96.972s-.43.972-.96.972a.968.968 0 0 1-.957-.972c0-.536.43-.972.957-.972z" />
  </svg>
);

const XiaohongshuIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.615 13.846H7.385V8.154h2.461v5.384h4.308V8.154h2.461v7.692z" />
  </svg>
);

const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const DownloadIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

/* ── Component ── */

export function SocialShare({ code, cn, intro, slug, image }: ShareProps) {
  const { t } = useLocale();
  const [showModal, setShowModal] = useState<"wechat" | "xiaohongshu" | null>(null);
  const [qrDataUrl, setQrDataUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [cardPreview, setCardPreview] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);

  const resultUrl = `${SITE_URL}/result/${slug}`;

  useEffect(() => {
    QRCode.toDataURL(resultUrl, { width: 200, margin: 1, color: { dark: "#0f172a", light: "#ffffff" } }).then(setQrDataUrl);
  }, [resultUrl]);

  useEffect(() => {
    if (!showModal) return;
    const handler = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) setShowModal(null);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [showModal]);

  useEffect(() => {
    if (!showModal) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setShowModal(null); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [showModal]);

  const generateShareImage = useCallback(async (): Promise<string | null> => {
    if (!qrDataUrl) return null;
    setGenerating(true);
    try {
      const W = 750, H = 1050;
      const canvas = document.createElement("canvas");
      canvas.width = W; canvas.height = H;
      const ctx = canvas.getContext("2d");
      if (!ctx) return null;

      await document.fonts.ready;

      ctx.fillStyle = "#f7f4ed";
      ctx.fillRect(0, 0, W, H);

      const pad = 40;
      ctx.fillStyle = "#ffffff";
      roundRect(ctx, pad, pad, W - pad * 2, H - pad * 2, 28);
      ctx.fill();
      ctx.strokeStyle = "rgba(0,0,0,0.06)";
      ctx.lineWidth = 1;
      roundRect(ctx, pad, pad, W - pad * 2, H - pad * 2, 28);
      ctx.stroke();

      const img = await loadImage(image);
      const imgSize = 240;
      const imgX = (W - imgSize) / 2;
      const imgY = pad + 50;
      ctx.save();
      roundRect(ctx, imgX, imgY, imgSize, imgSize, 24);
      ctx.clip();
      ctx.drawImage(img, imgX, imgY, imgSize, imgSize);
      ctx.restore();

      ctx.font = '600 18px "Noto Sans SC", system-ui, sans-serif';
      const badgeW = ctx.measureText(code).width + 36;
      const badgeH = 34;
      const badgeX = (W - badgeW) / 2;
      const badgeY = imgY + imgSize + 28;
      ctx.fillStyle = "#ecfdf5";
      roundRect(ctx, badgeX, badgeY, badgeW, badgeH, 17);
      ctx.fill();
      ctx.fillStyle = "#065f46";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(code, W / 2, badgeY + badgeH / 2);

      ctx.fillStyle = "#0f172a";
      ctx.font = 'bold 40px "Noto Sans SC", system-ui, sans-serif';
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      const nameY = badgeY + badgeH + 24;
      ctx.fillText(cn, W / 2, nameY);

      ctx.fillStyle = "#475569";
      ctx.font = '400 20px "Noto Sans SC", system-ui, sans-serif';
      ctx.textAlign = "center";
      const introY = nameY + 52;
      const introBottom = wrapText(ctx, intro, W / 2, introY, W - pad * 2 - 80, 30);

      const divY = Math.max(introBottom + 16, introY + 50);
      ctx.strokeStyle = "rgba(0,0,0,0.08)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(pad + 50, divY);
      ctx.lineTo(W - pad - 50, divY);
      ctx.stroke();

      const qrImg = await loadImage(qrDataUrl);
      const qrSize = 110;
      const bottomY = divY + 24;
      const qrX = pad + 60;
      ctx.drawImage(qrImg, qrX, bottomY, qrSize, qrSize);

      ctx.fillStyle = "#0f172a";
      ctx.font = 'bold 20px "Noto Sans SC", system-ui, sans-serif';
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      ctx.fillText(t("share.canvasQr"), qrX + qrSize + 24, bottomY + 12);

      ctx.fillStyle = "#64748b";
      ctx.font = '400 16px "Noto Sans SC", system-ui, sans-serif';
      ctx.fillText("sbti.xiachat.com", qrX + qrSize + 24, bottomY + 44);

      ctx.fillStyle = "#94a3b8";
      ctx.font = '400 14px "Noto Sans SC", system-ui, sans-serif';
      ctx.fillText(t("share.canvasTag"), qrX + qrSize + 24, bottomY + 72);

      const dataUrl = canvas.toDataURL("image/png");
      setCardPreview(dataUrl);
      return dataUrl;
    } finally {
      setGenerating(false);
    }
  }, [image, code, cn, intro, qrDataUrl, t]);

  const handleDownload = useCallback(async () => {
    const dataUrl = cardPreview || (await generateShareImage());
    if (!dataUrl) return;
    const link = document.createElement("a");
    link.download = `SBTI-${code}-${cn}.png`;
    link.href = dataUrl;
    link.click();
  }, [generateShareImage, cardPreview, code, cn]);

  const handleWechat = useCallback(async () => {
    if (!cardPreview) await generateShareImage();
    setShowModal("wechat");
  }, [generateShareImage, cardPreview]);

  const handleXiaohongshu = useCallback(async () => {
    if (!cardPreview) await generateShareImage();
    setShowModal("xiaohongshu");
  }, [generateShareImage, cardPreview]);

  const handleTwitter = useCallback(() => {
    const text = t("share.tweetText", { cn, code, intro });
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(resultUrl)}`;
    window.open(url, "_blank", "width=600,height=400");
  }, [cn, code, intro, resultUrl, t]);

  const copyShareText = useCallback(async () => {
    const text = t("share.shareText", { cn, code, intro, url: resultUrl });
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [cn, code, intro, resultUrl, t]);

  const saveImage = useCallback(async () => {
    const dataUrl = cardPreview || (await generateShareImage());
    if (!dataUrl) return;
    const link = document.createElement("a");
    link.download = `SBTI-${code}-${cn}.png`;
    link.href = dataUrl;
    link.click();
  }, [generateShareImage, cardPreview, code, cn]);

  return (
    <>
      <div className="mt-10 rounded-[30px] border border-black/5 dark:border-white/10 bg-white/88 dark:bg-dark-card px-6 py-8 shadow-[0_18px_48px_rgba(15,23,42,0.06)] dark:shadow-none">
        <h2 className="text-center text-lg font-semibold text-slate-900 dark:text-white">{t("share.title")}</h2>
        <p className="mt-2 text-center text-sm text-slate-500 dark:text-slate-400">{t("share.subtitle")}</p>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button onClick={handleWechat} disabled={generating} className="inline-flex items-center gap-2 rounded-full bg-[#07C160] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#06ae56] disabled:opacity-50">
            <WechatIcon /> {t("share.wechat")}
          </button>
          <button onClick={handleXiaohongshu} disabled={generating} className="inline-flex items-center gap-2 rounded-full bg-[#FF2442] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#e61f3b] disabled:opacity-50">
            <XiaohongshuIcon /> {t("share.xiaohongshu")}
          </button>
          <button onClick={handleTwitter} className="inline-flex items-center gap-2 rounded-full bg-[#0f1419] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#272c30]">
            <TwitterIcon /> Twitter
          </button>
          <button onClick={handleDownload} disabled={generating} className="inline-flex items-center gap-2 rounded-full border border-slate-300 dark:border-slate-600 bg-white dark:bg-dark-card px-5 py-2.5 text-sm font-semibold text-slate-800 dark:text-slate-200 shadow-sm transition hover:bg-slate-50 dark:hover:bg-white/10 disabled:opacity-50">
            <DownloadIcon /> {generating ? t("share.generating") : t("share.download")}
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div ref={modalRef} className="relative max-h-[90vh] w-full max-w-md overflow-y-auto rounded-3xl bg-white dark:bg-dark-card p-6 shadow-2xl">
            <button onClick={() => setShowModal(null)} className="absolute top-4 right-4 rounded-full p-1 text-slate-400 transition hover:bg-slate-100 dark:hover:bg-white/10 hover:text-slate-600 dark:hover:text-white">
              <CloseIcon />
            </button>

            {showModal === "wechat" && (
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#07C160]/10 text-[#07C160]">
                  <WechatIcon />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{t("share.wechatTitle")}</h3>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{t("share.wechatDesc")}</p>

                {qrDataUrl && (
                  <div className="mt-5 rounded-2xl border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 p-4">
                    <img src={qrDataUrl} alt="QR" className="h-48 w-48" />
                  </div>
                )}

                <p className="mt-3 text-xs text-slate-400">
                  {t("share.scanQr")} — {cn} ({code})
                </p>

                {cardPreview && (
                  <div className="mt-5 w-full">
                    <p className="mb-2 text-sm font-medium text-slate-600 dark:text-slate-300">{t("share.orSaveCard")}</p>
                    <img src={cardPreview} alt="Share card" className="w-full rounded-2xl border border-slate-100 dark:border-slate-700" />
                  </div>
                )}

                <div className="mt-5 flex gap-3">
                  <button onClick={saveImage} className="inline-flex items-center gap-2 rounded-full bg-[#07C160] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#06ae56]">
                    <DownloadIcon /> {t("share.saveImage")}
                  </button>
                  <button onClick={copyShareText} className="inline-flex items-center rounded-full border border-slate-300 dark:border-slate-600 bg-white dark:bg-dark-card px-5 py-2.5 text-sm font-semibold text-slate-800 dark:text-slate-200 transition hover:bg-slate-50 dark:hover:bg-white/10">
                    {copied ? t("share.copied") : t("share.copyLink")}
                  </button>
                </div>
              </div>
            )}

            {showModal === "xiaohongshu" && (
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#FF2442]/10 text-[#FF2442]">
                  <XiaohongshuIcon />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{t("share.xhsTitle")}</h3>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{t("share.xhsDesc")}</p>

                {cardPreview && (
                  <div className="mt-5 w-full">
                    <img src={cardPreview} alt="Share card" className="w-full rounded-2xl border border-slate-100 dark:border-slate-700" />
                  </div>
                )}

                <div className="mt-5 w-full rounded-2xl bg-slate-50 dark:bg-slate-800 p-4 text-left">
                  <p className="text-sm leading-6 text-slate-700 dark:text-slate-300">
                    {t("share.tweetText", { cn, code, intro })}
                    <br /><br />
                    {resultUrl}
                    <br /><br />
                    <span className="text-[#FF2442]">#SBTI #PersonalityTest</span>
                  </p>
                </div>

                <div className="mt-5 flex gap-3">
                  <button onClick={saveImage} className="inline-flex items-center gap-2 rounded-full bg-[#FF2442] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#e61f3b]">
                    <DownloadIcon /> {t("share.saveImage")}
                  </button>
                  <button onClick={copyShareText} className="inline-flex items-center rounded-full border border-slate-300 dark:border-slate-600 bg-white dark:bg-dark-card px-5 py-2.5 text-sm font-semibold text-slate-800 dark:text-slate-200 transition hover:bg-slate-50 dark:hover:bg-white/10">
                    {copied ? t("share.copied") : t("share.copyText")}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

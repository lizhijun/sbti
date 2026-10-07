"use client";

import { useState, useEffect } from "react";
import QRCode from "qrcode";

const DISMISS_KEY = "app-banner-dismissed";
const APP_STORE_URL = "https://apps.apple.com/cn/app/id6759594177";
const DEEP_LINK = "xiachat://";

function isMobile() {
  if (typeof navigator === "undefined") return false;
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
}

const CloseIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
    <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
  </svg>
);

const AppleIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
  </svg>
);

const ArrowIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 transition-transform group-hover:translate-x-0.5">
    <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
  </svg>
);

const SparkleIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
    <path d="M12 2l1.6 5.2L19 9l-5.4 1.8L12 16l-1.6-5.2L5 9l5.4-1.8L12 2zM19 14l.9 2.4L22 17l-2.1.6L19 20l-.9-2.4L16 17l2.1-.6L19 14zM5 14l.9 2.4L8 17l-2.1.6L5 20l-.9-2.4L2 17l2.1-.6L5 14z" />
  </svg>
);

export function AppDownloadBanner() {
  const [visible, setVisible] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string>("");

  useEffect(() => {
    if (!localStorage.getItem(DISMISS_KEY)) {
      setVisible(true);
    }
  }, []);

  useEffect(() => {
    if (!visible) return;
    QRCode.toDataURL(APP_STORE_URL, {
      width: 240,
      margin: 1,
      color: { dark: "#064e3b", light: "#ffffff" },
    })
      .then(setQrDataUrl)
      .catch(() => {});
  }, [visible]);

  if (!visible) return null;

  const dismiss = () => {
    setVisible(false);
    localStorage.setItem(DISMISS_KEY, "1");
  };

  const handleClick = (e: React.MouseEvent) => {
    if (!isMobile()) return;
    e.preventDefault();
    window.location.href = DEEP_LINK;
    setTimeout(() => {
      if (!document.hidden) {
        window.location.href = APP_STORE_URL;
      }
    }, 500);
  };

  return (
    <div className="relative overflow-hidden border-b border-emerald-900/10 dark:border-white/[0.06] bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 dark:from-emerald-950/40 dark:via-teal-950/30 dark:to-emerald-950/40">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-emerald-300/30 blur-3xl dark:bg-emerald-500/10"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-10 -bottom-20 h-60 w-60 rounded-full bg-teal-300/30 blur-3xl dark:bg-teal-500/10"
      />

      <div className="relative mx-auto flex w-full max-w-7xl items-center gap-4 px-5 py-4 sm:gap-6 sm:px-8 sm:py-5">
        <div className="hidden shrink-0 sm:block">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/30 ring-1 ring-white/40 dark:ring-white/10">
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
              <path d="M12 2a2 2 0 012 2v1h2a3 3 0 013 3v11a3 3 0 01-3 3H8a3 3 0 01-3-3V8a3 3 0 013-3h2V4a2 2 0 012-2zm-1.5 10.5a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm-3-2a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5zm8 0a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5z" />
            </svg>
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center gap-1.5">
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-600/10 dark:bg-emerald-400/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
              <SparkleIcon />
              小龙虾 App
            </span>
            <span className="hidden text-[11px] text-emerald-700/70 dark:text-emerald-300/70 sm:inline">
              SBTI 官方 App · 免费下载
            </span>
          </div>
          <p className="text-[15px] font-semibold leading-snug text-slate-900 dark:text-slate-100 sm:text-base">
            下载 App，<span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent dark:from-emerald-400 dark:to-teal-400">深度解读你的人格</span>
          </p>
          <p className="mt-0.5 hidden text-[13px] text-slate-600 dark:text-slate-400 sm:block">
            解锁 AI 深度人格分析、专属成长建议，还有更多趣味测试等你来玩
          </p>
        </div>

        {qrDataUrl ? (
          <div className="hidden shrink-0 md:flex md:items-center md:gap-3">
            <div className="text-right">
              <p className="text-[11px] font-medium uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                扫码下载
              </p>
              <p className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">
                iOS · 免费使用
              </p>
            </div>
            <div className="rounded-xl bg-white p-1.5 shadow-md shadow-emerald-900/10 ring-1 ring-emerald-900/5 dark:ring-white/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={qrDataUrl} alt="扫码下载小龙虾 App" className="h-16 w-16" />
            </div>
          </div>
        ) : null}

        <a
          href={APP_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
          className="group inline-flex shrink-0 items-center gap-1.5 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-emerald-500/30 transition hover:from-emerald-500 hover:to-teal-500 hover:shadow-lg hover:shadow-emerald-500/40 sm:px-5 sm:py-2.5"
        >
          <AppleIcon />
          <span className="hidden sm:inline">免费下载</span>
          <span className="sm:hidden">下载 App</span>
          <ArrowIcon />
        </a>

        <button
          onClick={(e) => {
            e.preventDefault();
            dismiss();
          }}
          className="shrink-0 rounded-full p-1.5 text-slate-400 dark:text-slate-500 transition hover:bg-black/5 hover:text-slate-600 dark:hover:bg-white/10 dark:hover:text-slate-300"
          aria-label="关闭"
        >
          <CloseIcon />
        </button>
      </div>
    </div>
  );
}

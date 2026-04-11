"use client";

import { useState, useEffect } from "react";

const DISMISS_KEY = "app-banner-dismissed";
const APP_STORE_URL =
  "https://apps.apple.com/us/app/%E5%B0%8F%E9%BE%99%E8%99%BE-%E7%9C%9F%E6%AD%A3%E8%83%BD%E5%B9%B2%E6%B4%BB%E7%9A%84-ai-%E5%8A%A9%E6%89%8B/id6759594177";
const DEEP_LINK = "xiachat://";

function isMobile() {
  if (typeof navigator === "undefined") return false;
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
}

const CloseIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
    <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
  </svg>
);

const AppleIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
  </svg>
);

const ArrowIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5">
    <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
  </svg>
);

export function AppDownloadBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(DISMISS_KEY)) {
      setVisible(true);
    }
  }, []);

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
    <div className="border-b border-black/[0.03] dark:border-white/[0.06] bg-emerald-950/[0.04] dark:bg-white/[0.03]">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-center gap-3 px-5 py-2 sm:px-8 sm:py-2.5">
        <a
          href={APP_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
          className="group flex items-center gap-3 sm:gap-4"
        >
          <p className="text-[13px] text-slate-600 dark:text-slate-400 sm:text-sm">
            <span className="font-medium text-slate-800 dark:text-slate-200">匹配不靠刷脸，靠灵魂共振</span>
            <span className="mx-1.5 hidden text-slate-300 dark:text-slate-600 sm:inline">·</span>
            <span className="hidden sm:inline">AI 从兴趣、价值观、聊天风格三维度找到真正聊得来的人</span>
          </p>

          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-800/20 dark:border-emerald-500/20 bg-emerald-900/[0.08] dark:bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-800 dark:text-emerald-400 transition group-hover:bg-emerald-900/[0.14] dark:group-hover:bg-emerald-400/[0.18]">
            <AppleIcon />
            <span className="hidden sm:inline">免费下载 App</span>
            <span className="sm:hidden">下载</span>
            <ArrowIcon />
          </span>
        </a>

        <button
          onClick={(e) => {
            e.preventDefault();
            dismiss();
          }}
          className="shrink-0 rounded-full p-1 text-slate-400 dark:text-slate-500 transition hover:text-slate-600 dark:hover:text-slate-300"
          aria-label="关闭"
        >
          <CloseIcon />
        </button>
      </div>
    </div>
  );
}

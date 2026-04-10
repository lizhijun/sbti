"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { type Locale, DEFAULT_LOCALE, t as translate } from "@/lib/i18n";

// ── Theme Context ──

type Theme = "light" | "dark" | "system";

interface ThemeCtx {
  theme: Theme;
  resolved: "light" | "dark";
  setTheme: (t: Theme) => void;
}

const ThemeContext = createContext<ThemeCtx>({
  theme: "system",
  resolved: "light",
  setTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

// ── Locale Context ──

interface LocaleCtx {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string, replacements?: Record<string, string | number>) => string;
}

const LocaleContext = createContext<LocaleCtx>({
  locale: DEFAULT_LOCALE,
  setLocale: () => {},
  t: (key) => key,
});

export function useLocale() {
  return useContext(LocaleContext);
}

// ── Combined Provider ──

function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyThemeClass(resolved: "light" | "dark") {
  const root = document.documentElement;
  if (resolved === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
}

export function Providers({ children }: { children: ReactNode }) {
  // ── Theme state ──
  const [theme, setThemeState] = useState<Theme>("system");
  const [resolved, setResolved] = useState<"light" | "dark">("light");

  // Initialize theme from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("sbti-theme") as Theme | null;
    const initial = stored && ["light", "dark", "system"].includes(stored) ? stored : "system";
    setThemeState(initial);
    const r = initial === "system" ? getSystemTheme() : initial;
    setResolved(r);
    applyThemeClass(r);
  }, []);

  // Listen for system theme changes
  useEffect(() => {
    if (theme !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => {
      const r = e.matches ? "dark" : "light";
      setResolved(r);
      applyThemeClass(r);
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [theme]);

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    localStorage.setItem("sbti-theme", t);
    const r = t === "system" ? getSystemTheme() : t;
    setResolved(r);
    applyThemeClass(r);
  }, []);

  // ── Locale state ──
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  useEffect(() => {
    const stored = localStorage.getItem("sbti-locale") as Locale | null;
    if (stored && ["zh", "en", "ja", "ko"].includes(stored)) {
      setLocaleState(stored);
    }
  }, []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    localStorage.setItem("sbti-locale", l);
    document.cookie = `sbti-locale=${l};path=/;max-age=31536000;SameSite=Lax`;
    document.documentElement.lang = l === "zh" ? "zh-CN" : l;
  }, []);

  const t = useCallback(
    (key: string, replacements?: Record<string, string | number>) =>
      translate(locale, key, replacements),
    [locale],
  );

  return (
    <ThemeContext.Provider value={{ theme, resolved, setTheme }}>
      <LocaleContext.Provider value={{ locale, setLocale, t }}>
        {children}
      </LocaleContext.Provider>
    </ThemeContext.Provider>
  );
}

import Link from "next/link";
import { Logo } from "./Logo";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-[rgba(247,244,237,0.82)] backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <Link href="/" className="flex items-center gap-3 text-sm font-semibold text-slate-900">
          <span className="flex h-11 w-11 items-center justify-center rounded-[18px] border border-emerald-900/12 bg-white shadow-[0_12px_30px_rgba(15,118,110,0.12)]">
            <Logo />
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-[1.18rem] tracking-[0.18em] text-slate-950 uppercase font-semibold">SBTI</span>
            <span className="mt-1 text-[0.63rem] font-medium tracking-[0.22em] text-slate-500 uppercase">人格测试</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-slate-700 md:flex">
          <Link className="transition hover:text-slate-950" href="/types">人格类型</Link>
          <Link className="transition hover:text-slate-950" href="/rankings">人格排行榜</Link>
          <Link className="transition hover:text-slate-950" href="/about">关于测试</Link>
          <Link className="transition hover:text-slate-950" href="/test">开始测试</Link>
          <a className="transition hover:text-slate-950" href="https://apps.apple.com/us/app/%E5%B0%8F%E9%BE%99%E8%99%BE-%E7%9C%9F%E6%AD%A3%E8%83%BD%E5%B9%B2%E6%B4%BB%E7%9A%84-ai-%E5%8A%A9%E6%89%8B/id6759594177" target="_blank" rel="noopener noreferrer">🦞 小龙虾AI</a>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/test"
            className="inline-flex items-center rounded-full bg-emerald-900 px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-emerald-800"
          >
            开始测试
          </Link>
        </div>
      </div>
    </header>
  );
}

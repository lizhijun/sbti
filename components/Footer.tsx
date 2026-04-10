import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-black/5 bg-[rgba(255,255,255,0.7)]">
      <div className="mx-auto grid w-full max-w-7xl gap-6 px-5 py-10 text-sm text-slate-600 sm:px-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-3">
          <p className="text-lg text-slate-900 font-semibold">SBTI</p>
          <p className="max-w-2xl leading-7">
            这里是 SBTI 人格测试网站。如果最近正好刷到 SBTI，想知道自己到底属于哪一种人格，直接从首页开始测试即可。
          </p>
          <div className="flex flex-wrap gap-4 pt-1 text-sm font-medium text-slate-700">
            <Link className="transition hover:text-slate-950" href="/">首页</Link>
            <Link className="transition hover:text-slate-950" href="/test">开始测试</Link>
            <Link className="transition hover:text-slate-950" href="/types">人格类型</Link>
            <Link className="transition hover:text-slate-950" href="/rankings">人格排行榜</Link>
            <Link className="transition hover:text-slate-950" href="/about">关于测试</Link>
            <a className="transition hover:text-slate-950" href="https://apps.apple.com/us/app/%E5%B0%8F%E9%BE%99%E8%99%BE-%E7%9C%9F%E6%AD%A3%E8%83%BD%E5%B9%B2%E6%B4%BB%E7%9A%84-ai-%E5%8A%A9%E6%89%8B/id6759594177" target="_blank" rel="noopener noreferrer">🦞 小龙虾AI</a>
          </div>
        </div>
        <div className="space-y-3">
          <p className="font-medium text-slate-900">友情提示</p>
          <p className="leading-7">
            SBTI 更适合拿来娱乐、对照和自我观察，不适合作为严肃的心理诊断结果。你可以把它当成一个更好玩、更接近日常状态的人格测试。
          </p>
        </div>
      </div>
    </footer>
  );
}

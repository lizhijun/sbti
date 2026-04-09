import { QuizFlow } from "@/components/QuizFlow";

export const metadata = {
  title: "开始测试",
  description:
    "进入 SBTI 人格测试。新站采用分步测试流程，保留原题库与结果逻辑，并在完成后跳转到可分享的人格详情页。",
};

export default function TestPage() {
  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-16 sm:px-6">
      <div className="mb-10 text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
          一题一题答，最后直接落到你的人格页。
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-slate-500 sm:text-base">
          这版测试保留原始 SBTI
          题目与结果映射，但交互改成了更像正式产品的单题推进式流程。你完成后会被直接送到对应人格详情页。
        </p>
      </div>

      <QuizFlow />
    </main>
  );
}

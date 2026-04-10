import { QuizFlow } from "@/components/QuizFlow";
import { TestPageContent } from "./TestPageContent";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "开始 SBTI 人格测试 | 32 道题测出你的抽象人格",
  description: "进入 SBTI 人格测试，32 道趣味题目，选中自动下一题，3 分钟测出你的人格类型。免费在线测试，测完即看十五维落点和详细人格解读。",
  alternates: { canonical: "https://sbti.xiachat.com/test" },
  openGraph: {
    title: "开始 SBTI 人格测试 | 32 道题测出你的抽象人格",
    description: "32 道趣味题目，3 分钟测出你的 SBTI 人格类型，免费在线测试。",
    url: "https://sbti.xiachat.com/test",
  },
};

export default function TestPage() {
  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-16 sm:px-6">
      <TestPageContent />
      <QuizFlow />
    </main>
  );
}

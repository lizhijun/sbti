import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export const revalidate = 60; // ISR: 每 60 秒重新验证

export async function GET() {
  const supabase = getSupabase();

  // 使用 RPC 或直接查询聚合
  const { data, error } = await supabase
    .from("sbti_rankings")
    .select("type_code");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // 在应用层聚合（Supabase JS client 不支持 GROUP BY + COUNT）
  const counts: Record<string, number> = {};
  for (const row of data ?? []) {
    counts[row.type_code] = (counts[row.type_code] ?? 0) + 1;
  }

  const rankings = Object.entries(counts)
    .map(([code, count]) => ({ code, count }))
    .sort((a, b) => b.count - a.count);

  const total = data?.length ?? 0;

  return NextResponse.json({ rankings, total });
}

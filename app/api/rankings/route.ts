import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export const revalidate = 60; // ISR: 每 60 秒重新验证

export async function GET() {
  const supabase = getSupabase();

  // Supabase 默认每次最多返回 1000 行，需要分页获取全部数据
  const allData: { type_code: string }[] = [];
  const pageSize = 1000;
  let from = 0;

  while (true) {
    const { data, error } = await supabase
      .from("sbti_rankings")
      .select("type_code")
      .range(from, from + pageSize - 1);
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    if (!data || data.length === 0) break;
    allData.push(...data);
    if (data.length < pageSize) break;
    from += pageSize;
  }

  // 在应用层聚合（Supabase JS client 不支持 GROUP BY + COUNT）
  const counts: Record<string, number> = {};
  for (const row of allData) {
    counts[row.type_code] = (counts[row.type_code] ?? 0) + 1;
  }

  const rankings = Object.entries(counts)
    .map(([code, count]) => ({ code, count }))
    .sort((a, b) => b.count - a.count);

  const total = allData.length;

  return NextResponse.json({ rankings, total });
}

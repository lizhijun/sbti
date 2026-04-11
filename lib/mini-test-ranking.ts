import { getSupabase } from "./supabase";
import { miniTests } from "./mini-tests";

export interface TestStats {
  testId: string;
  totalTakes: number;
  lastTestedAt: string | null;
}

// Reference epoch: 2026-01-01T00:00:00Z
const REFERENCE_EPOCH = 1767225600;
const DECAY_FACTOR = 45000;

export function hotScore(totalTakes: number, lastTestedAt: string | null): number {
  const popularity = Math.log10(Math.max(totalTakes, 1));
  if (!lastTestedAt) return popularity;
  const epoch = new Date(lastTestedAt).getTime() / 1000;
  return popularity + (epoch - REFERENCE_EPOCH) / DECAY_FACTOR;
}

export async function fetchTestStats(): Promise<TestStats[]> {
  const supabase = getSupabase();
  const allData: { test_id: string; created_at: string }[] = [];
  const pageSize = 1000;
  let from = 0;

  while (true) {
    const { data, error } = await supabase
      .from("mini_test_activity")
      .select("test_id, created_at")
      .range(from, from + pageSize - 1);
    if (error || !data || data.length === 0) break;
    allData.push(...data);
    if (data.length < pageSize) break;
    from += pageSize;
  }

  const statsMap: Record<string, { total: number; latest: string }> = {};
  for (const row of allData) {
    const existing = statsMap[row.test_id];
    if (!existing) {
      statsMap[row.test_id] = { total: 1, latest: row.created_at };
    } else {
      existing.total += 1;
      if (row.created_at > existing.latest) existing.latest = row.created_at;
    }
  }

  return miniTests.map((t) => {
    const s = statsMap[t.id];
    return {
      testId: t.id,
      totalTakes: s?.total ?? 0,
      lastTestedAt: s?.latest ?? null,
    };
  });
}

export interface RankedTest {
  testId: string;
  totalTakes: number;
  score: number;
}

export async function fetchRankedTests(): Promise<RankedTest[]> {
  const stats = await fetchTestStats();
  return stats
    .map((s) => ({
      testId: s.testId,
      totalTakes: s.totalTakes,
      score:
        s.totalTakes > 0
          ? hotScore(s.totalTakes, s.lastTestedAt)
          : miniTests.find((t) => t.id === s.testId)!.defaultPriority * -0.0001,
    }))
    .sort((a, b) => b.score - a.score);
}

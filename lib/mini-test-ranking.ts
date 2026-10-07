import { fetchMiniTestStats } from "./db";
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
  const statsMap = new Map(
    (await fetchMiniTestStats()).map((stats) => [stats.testId, stats]),
  );

  return miniTests.map((t) => {
    const s = statsMap.get(t.id);
    return {
      testId: t.id,
      totalTakes: s?.totalTakes ?? 0,
      lastTestedAt: s?.lastTestedAt ?? null,
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

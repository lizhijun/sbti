import "server-only";
import { neon } from "@neondatabase/serverless";
import type { RankingEntry } from "./types";

export function getSql() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("Missing DATABASE_URL");
  return neon(url);
}

export async function fetchRankings(): Promise<{ rankings: RankingEntry[]; total: number }> {
  const rows = await getSql()`
    SELECT type_code AS code, count(*) AS count
    FROM sbti_rankings
    GROUP BY type_code
    ORDER BY count DESC, type_code ASC
  `;
  const rankings = rows.map((row) => ({ code: String(row.code), count: Number(row.count) }));
  return { rankings, total: rankings.reduce((total, row) => total + row.count, 0) };
}

export interface RankingSubmission {
  typeCode: string;
  submissionId: string;
  rawScores: Record<string, number>;
  levels: Record<string, string>;
  similarity: number;
}

export async function submitRanking(input: RankingSubmission): Promise<boolean> {
  const rows = await getSql()`
    INSERT INTO sbti_rankings (type_code, submission_id, raw_scores, levels, similarity)
    VALUES (
      ${input.typeCode}, ${input.submissionId},
      ${JSON.stringify(input.rawScores)}::jsonb,
      ${JSON.stringify(input.levels)}::jsonb, ${input.similarity}
    )
    ON CONFLICT (submission_id) DO NOTHING
    RETURNING id
  `;
  return rows.length > 0;
}

export interface MiniTestSubmission {
  testId: string;
  resultId: string;
  sessionId: string;
}

export async function submitMiniTest(input: MiniTestSubmission): Promise<boolean> {
  const rows = await getSql()`
    INSERT INTO mini_test_activity (test_id, result_id, session_id)
    VALUES (${input.testId}, ${input.resultId}, ${input.sessionId})
    ON CONFLICT (session_id, test_id) DO NOTHING
    RETURNING id
  `;
  return rows.length > 0;
}

export async function fetchMiniTestStats() {
  const rows = await getSql()`
    SELECT test_id, count(*) AS total, max(created_at) AS latest
    FROM mini_test_activity
    GROUP BY test_id
  `;
  return rows.map((row) => ({
    testId: String(row.test_id),
    totalTakes: Number(row.total),
    lastTestedAt: new Date(row.latest).toISOString(),
  }));
}

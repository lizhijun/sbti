import { NextRequest, NextResponse } from "next/server";
import { submitRanking, type RankingSubmission } from "@/lib/db";
import { typeByCode } from "@/lib/types";
import { isIdentifier, isRecord } from "@/lib/submission-validation";

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  if (!isRecord(body)) {
    return NextResponse.json({ error: "Invalid submission" }, { status: 400 });
  }
  const { typeCode, submissionId } = body;
  const rawScores = body.rawScores ?? {};
  const levels = body.levels ?? {};
  const similarity = body.similarity ?? 0;

  if (
    !isIdentifier(typeCode) || !Object.hasOwn(typeByCode, typeCode) ||
    !isIdentifier(submissionId) ||
    !isRecord(rawScores) || !Object.values(rawScores).every(Number.isFinite) ||
    !isRecord(levels) || !Object.values(levels).every((level) => typeof level === "string" && ["L", "M", "H"].includes(level)) ||
    typeof similarity !== "number" || !Number.isInteger(similarity) || similarity < 0 || similarity > 100
  ) {
    return NextResponse.json({ error: "Invalid submission" }, { status: 400 });
  }

  try {
    const inserted = await submitRanking({
      typeCode, submissionId, rawScores, levels, similarity,
    } as RankingSubmission);
    return inserted
      ? NextResponse.json({ ok: true })
      : NextResponse.json({ error: "Already submitted" }, { status: 409 });
  } catch {
    console.error("Failed to save SBTI ranking to Neon");
    return NextResponse.json({ error: "Submission unavailable" }, { status: 503 });
  }
}

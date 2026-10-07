import { NextRequest, NextResponse } from "next/server";
import { submitMiniTest } from "@/lib/db";
import { miniTests } from "@/lib/mini-tests";
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
  const { testId, resultId, sessionId } = body;
  const test = miniTests.find((test) => test.id === testId);
  if (
    !test || !isIdentifier(testId) || !isIdentifier(sessionId) ||
    !isIdentifier(resultId) || !/^r\d+$/.test(resultId) ||
    Number(resultId.slice(1)) >= test.resultCount
  ) {
    return NextResponse.json({ error: "Invalid submission" }, { status: 400 });
  }

  try {
    const inserted = await submitMiniTest({ testId, resultId, sessionId });
    return inserted
      ? NextResponse.json({ ok: true })
      : NextResponse.json({ error: "Already submitted" }, { status: 409 });
  } catch {
    console.error("Failed to save mini-test activity to Neon");
    return NextResponse.json({ error: "Submission unavailable" }, { status: 503 });
  }
}

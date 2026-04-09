import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { typeCode, submissionId, rawScores, levels, similarity } = body;

  if (!typeCode || !submissionId) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 },
    );
  }

  const supabase = getSupabase();
  const { error } = await supabase.from("sbti_rankings").insert({
    type_code: typeCode,
    submission_id: submissionId,
    raw_scores: rawScores,
    levels: levels,
    similarity: similarity,
  });

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json(
        { error: "Already submitted" },
        { status: 409 },
      );
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

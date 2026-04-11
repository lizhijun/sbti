import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { testId, resultId, sessionId } = body;

  if (!testId || !resultId || !sessionId) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 },
    );
  }

  const supabase = getSupabase();
  const { error } = await supabase.from("mini_test_activity").insert({
    test_id: testId,
    result_id: resultId,
    session_id: sessionId,
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

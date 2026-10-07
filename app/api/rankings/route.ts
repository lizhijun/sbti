import { NextResponse } from "next/server";
import { fetchRankings } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    return NextResponse.json(await fetchRankings(), {
      headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=60" },
    });
  } catch {
    console.error("Failed to fetch SBTI rankings from Neon");
    return NextResponse.json({ error: "Rankings unavailable" }, { status: 503 });
  }
}

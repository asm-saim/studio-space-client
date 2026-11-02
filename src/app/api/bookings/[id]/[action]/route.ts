import { NextResponse } from "next/server";
import { forward } from "@/lib/route-auth";

const ACTIONS = new Set(["cancel", "confirm", "decline"]);

// PATCH /api/bookings/[id]/cancel | confirm | decline
export async function PATCH(_request: Request, { params }: { params: Promise<{ id: string; action: string }> }) {
  const { id, action } = await params;
  if (!ACTIONS.has(action)) return NextResponse.json({ message: "Not found" }, { status: 404 });
  return forward(`/bookings/${encodeURIComponent(id)}/${action}`, { method: "PATCH" });
}

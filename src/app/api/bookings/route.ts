import { forward } from "@/lib/route-auth";

// POST /api/bookings: request a booking. 401 without a valid JWT cookie.
export async function POST(request: Request) {
  return forward("/bookings", { method: "POST", request, successStatus: 201 });
}
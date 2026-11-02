import { forward } from "@/lib/route-auth";

// POST /api/studios: create a studio. 401 without a valid JWT cookie.
export async function POST(request: Request) {
  return forward("/studios", { method: "POST", request, successStatus: 201, revalidateStudios: true });
}
import { forward } from "@/lib/route-auth";

type Context = { params: Promise<{ id: string }> };

// PUT /api/studios/[id]: update your own studio. 401 without a valid JWT cookie.
export async function PUT(request: Request, { params }: Context) {
  const { id } = await params;
  return forward(`/studios/${encodeURIComponent(id)}`, { method: "PUT", request, revalidateStudios: true });
}

// DELETE /api/studios/[id]: delete your own studio. 401 without a valid JWT cookie.
export async function DELETE(_request: Request, { params }: Context) {
  const { id } = await params;
  return forward(`/studios/${encodeURIComponent(id)}`, { method: "DELETE", revalidateStudios: true });
}
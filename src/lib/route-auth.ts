import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { ApiError, apiRequest } from "@/lib/api";
import { JWT_COOKIE, verifyToken, type TokenUser } from "@/lib/jwt";

/** Reads and verifies the HttpOnly JWT cookie. Null means "not authenticated". */
export async function authenticate(): Promise<{ token: string; user: TokenUser } | null> {
  const token = (await cookies()).get(JWT_COOKIE)?.value;
  if (!token) return null;
  const user = await verifyToken(token);
  return user ? { token, user } : null;
}

export function unauthorized() {
  return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
}

type ForwardOptions = {
  method: "POST" | "PUT" | "PATCH" | "DELETE";
  /** Request whose JSON body is forwarded (read only after authentication succeeds). */
  request?: Request;
  successStatus?: number;
  /** Refresh cached studio lists after the change. */
  revalidateStudios?: boolean;
};

/** Authenticates the cookie JWT (401 if missing/invalid), then forwards the call to Express. */
export async function forward(path: string, { method, request, successStatus = 200, revalidateStudios = false }: ForwardOptions) {
  const auth = await authenticate();
  if (!auth) return unauthorized();

  let body: unknown;
  if (request) {
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
    }
  }

  try {
    const data = await apiRequest<object>(path, { method, body, token: auth.token });
    if (revalidateStudios) revalidateTag("studios", { expire: 0 });
    return NextResponse.json(data, { status: successStatus });
  } catch (error) {
    if (error instanceof ApiError) {
      return NextResponse.json({ message: error.message, errors: error.fieldErrors }, { status: error.status });
    }
    console.error(error);
    return NextResponse.json({ message: "Something went wrong." }, { status: 500 });
  }
}
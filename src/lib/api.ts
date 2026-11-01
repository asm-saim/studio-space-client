import type { SessionUser } from "@/lib/session";

const API_URL = process.env.API_URL ?? "http://localhost:5000";

export class ApiError extends Error {
  status: number;
  fieldErrors?: Record<string, string>;

  constructor(message: string, status: number, fieldErrors?: Record<string, string>) {
    super(message);
    this.status = status;
    this.fieldErrors = fieldErrors;
  }
}

type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  /** Pass the verified session user for protected endpoints. */
  user?: SessionUser;
};

/** Server-side only: it attaches the shared secret that Express checks. */
export async function apiRequest<T>(path: string, { method = "GET", body, user }: RequestOptions = {}): Promise<T> {
  const headers: Record<string, string> = {};
  if (body !== undefined) headers["Content-Type"] = "application/json";
  if (user) {
    headers["x-internal-key"] = process.env.INTERNAL_API_KEY ?? "";
    headers["x-user-email"] = user.email;
    headers["x-user-name"] = encodeURIComponent(user.name);
    if (user.image) headers["x-user-image"] = encodeURIComponent(user.image);
  }

  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  const data = await res.json().catch(() => null);
  if (!res.ok) {
    throw new ApiError(data?.message ?? `Request failed (${res.status})`, res.status, data?.errors);
  }
  return data as T;
}
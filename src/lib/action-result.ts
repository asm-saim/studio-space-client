import { ApiError } from "@/lib/api";

export type ActionResult<T extends object = object> =
  | ({ ok: true } & T)
  | { ok: false; error: string; fieldErrors?: Record<string, string> };

export function toActionError(error: unknown): { ok: false; error: string; fieldErrors?: Record<string, string> } {
  if (error instanceof ApiError) {
    return { ok: false, error: error.message, fieldErrors: error.fieldErrors };
  }
  console.error(error);
  return { ok: false, error: "Something went wrong. Please try again." };
}
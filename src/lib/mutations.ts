import type { BookingInput } from "@/lib/bookings";
import type { StudioInput } from "@/lib/studios";

export type MutationResult<T extends object = object> =
  | ({ ok: true } & T)
  | { ok: false; error: string; fieldErrors?: Record<string, string> };

/**
 * Calls a protected /api route. The HttpOnly JWT cookie travels automatically.
 * If the JWT has expired (401), ask for a fresh one from the login session and retry once.
 */
async function send<T extends object = object>(url: string, method: string, body?: unknown): Promise<MutationResult<T>> {
  const request = () =>
    fetch(url, {
      method,
      headers: body === undefined ? undefined : { "Content-Type": "application/json" },
      body: body === undefined ? undefined : JSON.stringify(body),
    });

  try {
    let res = await request();
    if (res.status === 401) {
      const refreshed = await fetch("/api/session", { method: "POST" });
      if (refreshed.ok) res = await request();
    }

    const data = await res.json().catch(() => null);
    if (!res.ok) {
      return {
        ok: false,
        error: res.status === 401 ? "Please log in to continue." : (data?.message ?? "Something went wrong. Please try again."),
        fieldErrors: data?.errors,
      };
    }
    return { ok: true, ...(data ?? {}) } as MutationResult<T>;
  } catch {
    return { ok: false, error: "Could not reach the server. Please try again." };
  }
}

const enc = encodeURIComponent;

export const createStudio = (input: StudioInput) => send<{ id: string }>("/api/studios", "POST", input);
export const updateStudio = (id: string, input: StudioInput) => send(`/api/studios/${enc(id)}`, "PUT", input);
export const deleteStudio = (id: string) => send(`/api/studios/${enc(id)}`, "DELETE");

export const createBooking = (input: BookingInput) => send<{ id: string }>("/api/bookings", "POST", input);
export const cancelBooking = (id: string) => send(`/api/bookings/${enc(id)}/cancel`, "PATCH");
export const confirmBooking = (id: string) => send(`/api/bookings/${enc(id)}/confirm`, "PATCH");
export const declineBooking = (id: string) => send(`/api/bookings/${enc(id)}/decline`, "PATCH");
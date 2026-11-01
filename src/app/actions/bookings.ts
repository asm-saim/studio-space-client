"use server";


import { ActionResult, toActionError } from "@/lib/action-result";
import { apiRequest } from "@/lib/api";
import type { BookingInput } from "@/lib/bookings";
import { getSessionUser } from "@/lib/session";


const LOGIN_REQUIRED = { ok: false, error: "Please log in to continue." } as const;

export async function createBooking(input: BookingInput): Promise<ActionResult<{ id: string }>> {
  const user = await getSessionUser();
  if (!user) return LOGIN_REQUIRED;
  try {
    const { id } = await apiRequest<{ id: string }>("/bookings", { method: "POST", body: input, user });
    return { ok: true, id };
  } catch (error) {
    return toActionError(error);
  }
}

export async function cancelBooking(id: string): Promise<ActionResult> {
  const user = await getSessionUser();
  if (!user) return LOGIN_REQUIRED;
  try {
    await apiRequest(`/bookings/${encodeURIComponent(id)}/cancel`, { method: "PATCH", user });
    return { ok: true };
  } catch (error) {
    return toActionError(error);
  }
}
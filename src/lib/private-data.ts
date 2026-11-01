import { apiRequest } from "@/lib/api";
import type { Booking } from "@/lib/bookings";
import type { SessionUser } from "@/lib/session";
import type { StudioSummary } from "@/lib/studios";

// Per-user data: never cached. Call from inside a <Suspense> boundary.

export function getMyStudios(user: SessionUser) {
  return apiRequest<StudioSummary[]>("/studios/mine", { user });
}

export function getMyBookings(user: SessionUser) {
  return apiRequest<Booking[]>("/bookings/mine", { user });
}
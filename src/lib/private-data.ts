import { apiRequest } from "@/lib/api";
import type { Booking, BookingRequest } from "@/lib/bookings";
import { signToken } from "@/lib/jwt";
import type { SessionUser } from "@/lib/session";
import type { StudioSummary } from "@/lib/studios";

// Per-user data: never cached. Call from inside a <Suspense> boundary.
// The user was already verified from the login session, so a short-lived JWT is minted for Express.

export async function getMyStudios(user: SessionUser) {
  return apiRequest<StudioSummary[]>("/studios/mine", { token: await signToken(user) });
}

export async function getMyBookings(user: SessionUser) {
  return apiRequest<Booking[]>("/bookings/mine", { token: await signToken(user) });
}

export async function getBookingRequests(user: SessionUser) {
  return apiRequest<BookingRequest[]>("/bookings/requests", { token: await signToken(user) });
}
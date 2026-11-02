import { Suspense } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Clock, CloudOff, Inbox, MapPin, Users } from "lucide-react";
import { EmptyState } from "@/components/shared/empty-state";
import { PageContainer } from "@/components/shared/page-container";
import { ListSkeleton } from "@/components/shared/skeletons";
import { BookingStatusBadge } from "@/components/studios/booking-status-badge";
import { Button } from "@/components/ui/button";
import { formatDate, formatMoney, formatTime } from "@/lib/format";
import { getBookingRequests } from "@/lib/private-data";
import { requireUser } from "@/lib/session";
import { BookingRequestActions } from "@/components/studios/booking-request-actions";

export const metadata: Metadata = { title: "Booking requests" };

async function Requests() {
  const user = await requireUser("/booking-requests");

  let requests: Awaited<ReturnType<typeof getBookingRequests>> = [];
  try {
    requests = await getBookingRequests(user);
  } catch (error) {
    console.error("Failed to load booking requests", error);
    return (
      <EmptyState
        icon={CloudOff}
        title="We couldn't load booking requests"
        description="Something went wrong on our side. Please try again in a moment."
      >
        <Button nativeButton={false} render={<Link href="/booking-requests" />}>
          Try again
        </Button>
      </EmptyState>
    );
  }

  if (requests.length === 0) {
    return (
      <EmptyState
        icon={Inbox}
        title="No booking requests yet"
        description="When someone books one of your studios, the request will appear here for you to confirm or decline."
      >
        <Button nativeButton={false} render={<Link href="/my-listings" />}>
          View my listings
        </Button>
      </EmptyState>
    );
  }

  return (
    <ul className="space-y-4">
      {requests.map((booking) => (
        <li key={booking.id} className="flex flex-col gap-4 rounded-2xl border bg-card p-4 sm:flex-row sm:items-center">
          <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-xl bg-muted sm:w-40">
            {booking.studioImage && (
              <Image
                src={booking.studioImage}
                alt={booking.studioTitle}
                fill
                sizes="(min-width: 640px) 160px, 100vw"
                className="object-cover"
              />
            )}
          </div>

          <div className="min-w-0 flex-1 space-y-2">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="font-heading truncate text-lg font-semibold">{booking.studioTitle}</h2>
              <BookingStatusBadge status={booking.status} />
            </div>
            <p className="text-sm text-muted-foreground">
              Requested by <span className="font-medium text-foreground">{booking.userName || "a guest"}</span> (
              {booking.userEmail})
            </p>
            <ul className="grid gap-x-6 gap-y-1.5 text-sm text-muted-foreground sm:grid-cols-2">
              <li className="flex items-center gap-1.5">
                <CalendarDays aria-hidden="true" className="size-4 shrink-0" />
                {formatDate(booking.date)}
              </li>
              <li className="flex items-center gap-1.5">
                <Clock aria-hidden="true" className="size-4 shrink-0" />
                {formatTime(booking.startTime)} – {formatTime(booking.endTime)} ({booking.hours} hr)
              </li>
              <li className="flex items-center gap-1.5">
                <Users aria-hidden="true" className="size-4 shrink-0" />
                {booking.guests} {booking.guests === 1 ? "guest" : "guests"}
              </li>
              <li className="flex items-center gap-1.5">
                <MapPin aria-hidden="true" className="size-4 shrink-0" />
                <span className="truncate">{booking.studioLocation}</span>
              </li>
            </ul>
            {booking.notes && <p className="text-sm text-muted-foreground">Note: {booking.notes}</p>}
            <p className="text-sm font-semibold">{formatMoney(booking.totalPrice)}</p>
          </div>

          {booking.status === "Pending" && <BookingRequestActions id={booking.id} guestName={booking.userName} />}
        </li>
      ))}
    </ul>
  );
}

export default function BookingRequestsPage() {
  return (
    <PageContainer title="Booking requests" description="Reservations guests have requested for your studios.">
      <Suspense fallback={<ListSkeleton />}>
        <Requests />
      </Suspense>
    </PageContainer>
  );
}

import { Suspense } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Clock, MapPin, Users } from "lucide-react";
import { PageContainer } from "@/components/shared/page-container";

import { Button } from "@/components/ui/button";
import { requireUser } from "@/lib/session";
import { getMyBookings } from "@/lib/private-data";
import { BookingStatusBadge } from "@/components/studios/booking-status-badge";
import { formatDate, formatMoney, formatTime } from "@/lib/format";
import { CancelBookingButton } from "@/components/studios/cancel-booking-button";


export const metadata: Metadata = { title: "My bookings" };

async function Bookings() {
  const user = await requireUser("/my-bookings");

  let bookings: Awaited<ReturnType<typeof getMyBookings>> = [];
  try {
    bookings = await getMyBookings(user);
  } catch (error) {
    console.error("Failed to load bookings", error);
    return (
      <div className="rounded-2xl border border-dashed p-10 text-center text-muted-foreground">
        We couldn&apos;t load your bookings right now. Please refresh in a moment.
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed p-10 text-center">
        <p className="text-muted-foreground">You haven&apos;t booked a studio yet.</p>
        <Button nativeButton={false} render={<Link href="/studios" />}>
          Explore studios
        </Button>
      </div>
    );
  }

  return (
    <ul className="space-y-4">
      {bookings.map((booking) => (
        <li key={booking.id} className="flex flex-col gap-4 rounded-2xl border bg-card p-4 sm:flex-row sm:items-center">
          <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-xl bg-muted sm:w-44">
            {booking.studioImage && <Image src={booking.studioImage} alt={booking.studioTitle} fill sizes="(min-width: 640px) 176px, 100vw" className="object-cover" />}
          </div>

          <div className="min-w-0 flex-1 space-y-2">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="font-heading truncate text-lg font-semibold">
                <Link href={`/studios/${booking.studioId}`} className="hover:underline">
                  {booking.studioTitle}
                </Link>
              </h2>
              <BookingStatusBadge status={booking.status} />
            </div>
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
            <p className="text-sm">
              <span className="font-semibold">{formatMoney(booking.totalPrice)}</span>
              <span className="text-muted-foreground"> + {formatMoney(booking.securityDeposit)} deposit</span>
            </p>
          </div>

          {booking.status === "Pending" && <CancelBookingButton id={booking.id} title={booking.studioTitle} />}
        </li>
      ))}
    </ul>
  );
}

export default function MyBookingsPage() {
  return (
    <PageContainer title="My bookings" description="Your studio reservations and their status.">
      <Suspense
        fallback={
          <div aria-hidden="true" className="space-y-4">
            {Array.from({ length: 3 }, (_, i) => (
              <div key={i} className="h-40 animate-pulse rounded-2xl bg-muted" />
            ))}
          </div>
        }
      >
        <Bookings />
      </Suspense>
    </PageContainer>
  );
}
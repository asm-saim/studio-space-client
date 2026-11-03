import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { BookingStatusBadge } from "@/components/studios/booking-status-badge";
import { CancelBookingButton } from "@/components/studios/cancel-booking-button";
import { Button } from "@/components/ui/button";
import type { Booking } from "@/lib/bookings";
import { formatDate, formatTime } from "@/lib/format";
import { PanelEmpty, StudioThumb } from "./dashboard-panel";

/** The three newest bookings the user made (the API returns newest first). */
export function RecentBookings({ bookings }: { bookings: Booking[] }) {
  const recent = bookings.slice(0, 3);

  if (recent.length === 0) {
    return (
      <PanelEmpty icon={CalendarDays} title="No bookings yet" description="Find a space for your next shoot, recording, or workshop.">
        <Button size="sm" nativeButton={false} render={<Link href="/studios" />}>
          Explore studios
        </Button>
      </PanelEmpty>
    );
  }

  return (
    <ul className="divide-y">
      {recent.map((booking) => (
        <li key={booking.id} className="space-y-3 py-4 first:pt-0 last:pb-0">
          <div className="flex items-start gap-3">
            <StudioThumb src={booking.studioImage} />
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium">{booking.studioTitle}</p>
              <p className="text-sm text-muted-foreground">
                {formatDate(booking.date)} · {formatTime(booking.startTime)} – {formatTime(booking.endTime)}
              </p>
            </div>
            <div className="shrink-0">
              <BookingStatusBadge status={booking.status} />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" nativeButton={false} render={<Link href={`/studios/${booking.studioId}`} />}>
              View studio
            </Button>
            {booking.status === "Pending" && <CancelBookingButton id={booking.id} title={booking.studioTitle} />}
          </div>
        </li>
      ))}
    </ul>
  );
}
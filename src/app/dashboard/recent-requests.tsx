import Link from "next/link";
import { Inbox } from "lucide-react";
import { BookingRequestActions } from "@/components/studios/booking-request-actions";
import { BookingStatusBadge } from "@/components/studios/booking-status-badge";
import { Button } from "@/components/ui/button";
import type { BookingRequest } from "@/lib/bookings";
import { formatDate, formatTime } from "@/lib/format";
import { PanelEmpty, StudioThumb } from "./dashboard-panel";

/** The three newest requests for the user's studios (the API returns newest first). */
export function RecentRequests({ requests }: { requests: BookingRequest[] }) {
  const recent = requests.slice(0, 3);

  if (recent.length === 0) {
    return (
      <PanelEmpty icon={Inbox} title="No booking requests yet" description="When someone books one of your studios, the request will show up here.">
        <Button variant="outline" size="sm" nativeButton={false} render={<Link href="/my-listings" />}>
          View my listings
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
              <p className="truncate text-sm text-muted-foreground">
                {booking.userName || "A guest"} · {booking.userEmail}
              </p>
              <p className="text-sm text-muted-foreground">
                {formatDate(booking.date)} · {formatTime(booking.startTime)} – {formatTime(booking.endTime)}
              </p>
            </div>
            <div className="shrink-0">
              <BookingStatusBadge status={booking.status} />
            </div>
          </div>
          {booking.status === "Pending" && <BookingRequestActions id={booking.id} guestName={booking.userName} />}
        </li>
      ))}
    </ul>
  );
}
import { BadgeCheck, CheckCircle2, Clock, XCircle, type LucideIcon } from "lucide-react";
import type { BookingStatus } from "@/lib/bookings";
import { cn } from "@/lib/utils";

const STATUS_STYLES: Record<BookingStatus, { icon: LucideIcon; className: string }> = {
  Pending: { icon: Clock, className: "bg-primary/15 text-primary" },
  Confirmed: { icon: CheckCircle2, className: "bg-foreground/10 text-foreground" },
  Completed: { icon: BadgeCheck, className: "bg-muted text-muted-foreground" },
  Cancelled: { icon: XCircle, className: "bg-destructive/15 text-destructive" },
};

export function BookingStatusBadge({ status }: { status: BookingStatus }) {
  const { icon: Icon, className } = STATUS_STYLES[status] ?? STATUS_STYLES.Pending;
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium", className)}>
      <Icon aria-hidden="true" className="size-3.5" />
      {status}
    </span>
  );
}
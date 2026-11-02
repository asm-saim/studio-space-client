"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { createBooking } from "@/lib/mutations";
import { useAuth } from "@/components/auth/auth-provider";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/shared/spinner";
import { textareaClass } from "@/components/studios/form-parts";
import { formatMoney, toMinutes } from "@/lib/format";

export type BookingStudio = {
  id: string;
  title: string;
  hourlyRate: number;
  securityDeposit: number;
  maxCapacity: number;
  ownerEmail: string;
};

export function BookingModal({ studio }: { studio: BookingStudio }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isPending: authPending } = useAuth();
  const [pending, startTransition] = React.useTransition();

  const [open, setOpen] = React.useState(false);
  const [today, setToday] = React.useState("");
  const [date, setDate] = React.useState("");
  const [startTime, setStartTime] = React.useState("10:00");
  const [endTime, setEndTime] = React.useState("12:00");
  const [guests, setGuests] = React.useState("1");
  const [notes, setNotes] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);

  const isOwner = !!user && user.email === studio.ownerEmail;

  const start = toMinutes(startTime);
  const end = toMinutes(endTime);
  const hours = start !== null && end !== null && end > start ? (end - start) / 60 : 0;
  const rentalTotal = Math.round(studio.hourlyRate * hours * 100) / 100;

  function handleOpen() {
    if (!user) {
      toast.info("Please log in to book this studio.");
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
      return;
    }
    // Read the clock in an event handler, not during render.
    setToday(new Date().toLocaleDateString("en-CA"));
    setError(null);
    setOpen(true);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const guestCount = Number(guests);
    if (!date) return setError("Choose a date.");
    if (hours < 1) return setError("Choose an end time at least 1 hour after the start.");
    if (!Number.isInteger(guestCount) || guestCount < 1 || guestCount > studio.maxCapacity) {
      return setError(`Guests must be between 1 and ${studio.maxCapacity}.`);
    }

    startTransition(async () => {
      const result = await createBooking({
        studioId: studio.id,
        date,
        startTime,
        endTime,
        guests: guestCount,
        notes: notes.trim(),
      });
      if (!result.ok) {
        setError(result.error);
        toast.error(result.error);
        return;
      }
      toast.success("Booking request sent. It's pending host confirmation.");
      setOpen(false);
      router.push("/my-bookings");
    });
  }

  return (
    <>
      <Button size="lg" className="h-12 w-full text-base" disabled={authPending || isOwner} onClick={handleOpen}>
        {isOwner ? "This is your listing" : "Book Workspace Now"}
      </Button>

      <Dialog open={open} onOpenChange={(next) => !pending && setOpen(next)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Book {studio.title}</DialogTitle>
            <DialogDescription>Pick a date and your hours. The host confirms your request.</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="booking-date">Date</Label>
              <Input id="booking-date" type="date" min={today} value={date} onChange={(e) => setDate(e.target.value)} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="booking-start">Start time</Label>
                <Input id="booking-start" type="time" step="1800" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="booking-end">End time</Label>
                <Input id="booking-end" type="time" step="1800" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="booking-guests">Guests (max {studio.maxCapacity})</Label>
              <Input id="booking-guests" type="number" inputMode="numeric" min="1" max={studio.maxCapacity} value={guests} onChange={(e) => setGuests(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="booking-notes">
                Notes for the host <span className="font-normal text-muted-foreground">(optional)</span>
              </Label>
              <textarea id="booking-notes" value={notes} onChange={(e) => setNotes(e.target.value)} maxLength={500} placeholder="What are you planning to shoot or record?" className={`${textareaClass} min-h-20`} />
            </div>

            <dl className="space-y-1.5 rounded-lg border bg-muted/40 p-4 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">
                  {formatMoney(studio.hourlyRate)} × {hours || 0} hr
                </dt>
                <dd className="font-medium">{formatMoney(rentalTotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Security deposit</dt>
                <dd className="font-medium">{formatMoney(studio.securityDeposit)}</dd>
              </div>
              <div className="flex justify-between border-t pt-2 text-base font-semibold">
                <dt>Estimated total</dt>
                <dd>{formatMoney(rentalTotal + studio.securityDeposit)}</dd>
              </div>
            </dl>

            {error && (
              <p role="alert" className="text-sm text-destructive">
                {error}
              </p>
            )}

            <DialogFooter>
              <Button type="button" variant="outline" disabled={pending} onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={pending}>
                {pending && <Spinner />}
                {pending ? "Sending…" : "Request booking"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
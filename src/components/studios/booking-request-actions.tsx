"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { Spinner } from "@/components/shared/spinner";
import { Button } from "@/components/ui/button";
import { confirmBooking, declineBooking } from "@/lib/mutations";

export function BookingRequestActions({ id, guestName }: { id: string; guestName: string }) {
  const router = useRouter();
  const [declineOpen, setDeclineOpen] = React.useState(false);
  const [confirming, startConfirm] = React.useTransition();
  const [declining, startDecline] = React.useTransition();

  function handleConfirm() {
    startConfirm(async () => {
      const result = await confirmBooking(id);
      if (!result.ok) {
        toast.error(result.error);
        return;
      }
      toast.success("Booking confirmed.");
      router.refresh();
    });
  }

  function handleDecline() {
    startDecline(async () => {
      const result = await declineBooking(id);
      if (!result.ok) {
        toast.error(result.error);
        return;
      }
      toast.success("Booking declined.");
      setDeclineOpen(false);
      router.refresh();
    });
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Button type="button" disabled={confirming || declining} onClick={handleConfirm}>
        {confirming && <Spinner />}
        Confirm
      </Button>
      <Button type="button" variant="outline" className="text-destructive hover:text-destructive" disabled={confirming || declining} onClick={() => setDeclineOpen(true)}>
        Decline
      </Button>
      <ConfirmDialog
        open={declineOpen}
        onOpenChange={setDeclineOpen}
        title="Decline this request?"
        description={`${guestName || "The guest"} will see their booking as cancelled.`}
        confirmLabel="Decline request"
        cancelLabel="Keep request"
        pending={declining}
        onConfirm={handleDecline}
      />
    </div>
  );
}
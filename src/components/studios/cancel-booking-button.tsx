"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { cancelBooking } from "@/app/actions/bookings";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "../shared/confirm-dialog";

export function CancelBookingButton({ id, title }: { id: string; title: string }) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [pending, startTransition] = React.useTransition();

  function handleConfirm() {
    startTransition(async () => {
      const result = await cancelBooking(id);
      if (!result.ok) {
        toast.error(result.error);
        return;
      }
      toast.success("Your booking was cancelled.");
      setOpen(false);
      router.refresh();
    });
  }

  return (
    <>
      <Button type="button" variant="outline" className="text-destructive hover:text-destructive" onClick={() => setOpen(true)}>
        Cancel Booking
      </Button>
      <ConfirmDialog
        open={open}
        onOpenChange={setOpen}
        title="Cancel this booking?"
        description={`Your pending request for "${title}" will be cancelled.`}
        confirmLabel="Cancel booking"
        cancelLabel="Keep booking"
        pending={pending}
        onConfirm={handleConfirm}
      />
    </>
  );
}
"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { deleteStudio } from "@/app/actions/studios";

import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "../shared/confirm-dialog";

export function DeleteStudioButton({ id, title }: { id: string; title: string }) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [pending, startTransition] = React.useTransition();

  function handleConfirm() {
    startTransition(async () => {
      const result = await deleteStudio(id);
      if (!result.ok) {
        toast.error(result.error);
        return;
      }
      toast.success(`"${title}" was deleted.`);
      setOpen(false);
      router.refresh();
    });
  }

  return (
    <>
      <Button type="button" variant="outline" className="text-destructive hover:text-destructive" onClick={() => setOpen(true)}>
        <Trash2 aria-hidden="true" />
        Delete
      </Button>
      <ConfirmDialog
        open={open}
        onOpenChange={setOpen}
        title="Delete this studio?"
        description={`"${title}" will be permanently removed from your listings. This can't be undone.`}
        confirmLabel="Delete studio"
        pending={pending}
        onConfirm={handleConfirm}
      />
    </>
  );
}
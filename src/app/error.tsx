"use client";

import * as React from "react";
import Link from "next/link";
import { CloudOff } from "lucide-react";
import { toast } from "sonner";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  React.useEffect(() => {
    console.error(error);
    toast.error("Something went wrong. Please try again.", { id: "route-error" });
  }, [error]);

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-20">
      <EmptyState
        icon={CloudOff}
        title="Something went wrong"
        description="We hit an unexpected problem loading this page. You can try again or head back home."
      >
        <Button onClick={reset}>Try again</Button>
        <Button variant="outline" nativeButton={false} render={<Link href="/" />}>
          Return to Home
        </Button>
      </EmptyState>
    </div>
  );
}

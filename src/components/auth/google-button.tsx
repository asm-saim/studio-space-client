"use client";

import * as React from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

function GoogleIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5">
      <path fill="#4285F4" d="M23.5 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.45a5.52 5.52 0 0 1-2.4 3.62v3h3.88c2.27-2.09 3.57-5.17 3.57-8.81Z" />
      <path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.95-2.91l-3.88-3a7.2 7.2 0 0 1-10.72-3.78H1.34v3.09A12 12 0 0 0 12 24Z" />
      <path fill="#FBBC05" d="M5.35 14.31a7.2 7.2 0 0 1 0-4.62V6.6H1.34a12 12 0 0 0 0 10.8l4.01-3.09Z" />
      <path fill="#EA4335" d="M12 4.75c1.76 0 3.34.61 4.59 1.8l3.44-3.44A11.5 11.5 0 0 0 12 0 12 12 0 0 0 1.34 6.6l4.01 3.09A7.17 7.17 0 0 1 12 4.75Z" />
    </svg>
  );
}

export function GoogleButton({ callbackURL = "/" }: { callbackURL?: string }) {
  const [pending, setPending] = React.useState(false);

  async function handleClick() {
    setPending(true);
    try {
      const { error } = await authClient.signIn.social({ provider: "google", callbackURL });
      if (error) {
        toast.error(error.message || "Google sign-in failed. Please try again.");
        setPending(false);
      }
      // On success the browser is redirected to Google.
    } catch {
      toast.error("Google sign-in failed. Please try again.");
      setPending(false);
    }
  }

  return (
    <Button type="button" variant="outline" size="lg" className="h-11 w-full gap-3" disabled={pending} onClick={handleClick}>
      <GoogleIcon />
      {pending ? "Redirecting…" : "Continue with Google"}
    </Button>
  );
}
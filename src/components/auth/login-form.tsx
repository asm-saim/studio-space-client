"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GoogleButton } from "@/components/auth/google-button";
import { PasswordField } from "@/components/auth/password-field";
import { Spinner } from "@/components/shared/spinner";
import { authClient } from "@/lib/auth-client";
import { getSafeRedirect, withRedirect } from "@/lib/safe-redirect";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = getSafeRedirect(searchParams.get("redirect"));
  const hasRedirect = searchParams.has("redirect");

  React.useEffect(() => {
    if (hasRedirect) toast.info("Please log in to continue.", { id: "login-required" });
  }, [hasRedirect]);
  const [pending, setPending] = React.useState(false);
  const [formError, setFormError] = React.useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") ?? "").trim();
    const password = String(data.get("password") ?? "");

    if (!email || !password) {
      const message = "Enter your email and password.";
      setFormError(message);
      toast.error(message);
      return;
    }

    setPending(true);
    setFormError(null);
    try {
      const { error } = await authClient.signIn.email({ email, password });
      if (error) {
        const message = error.message || "Invalid email or password.";
        setFormError(message);
        toast.error(message);
        return;
      }
      // Issue the HttpOnly JWT cookie that guards mutations.
      await fetch("/api/session", { method: "POST" }).catch(() => null);
      toast.success("Welcome back!");
      router.push(redirectTo);
      router.refresh();
    } catch {
      const message = "Could not reach the server. Please try again.";
      setFormError(message);
      toast.error(message);
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="rounded-2xl border bg-card p-6 sm:p-8">
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" autoComplete="email" placeholder="you@example.com" />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <button
              type="button"
              onClick={() => toast.info("Password reset isn't available yet.")}
              className="text-sm text-primary hover:underline"
            >
              Forgot password?
            </button>
          </div>
          <PasswordField id="password" name="password" autoComplete="current-password" placeholder="Your password" />
        </div>

        {formError && (
          <p role="alert" className="text-sm text-destructive">
            {formError}
          </p>
        )}

        <Button type="submit" size="lg" className="h-11 w-full" disabled={pending}>
          {pending && <Spinner />}
          {pending ? "Logging in…" : "Login"}
        </Button>
      </form>

      <div className="my-6 flex items-center gap-3 text-sm text-muted-foreground">
        <span className="h-px flex-1 bg-border" />
        or
        <span className="h-px flex-1 bg-border" />
      </div>

      <GoogleButton callbackURL={redirectTo} />

      <p className="mt-6 text-center text-sm text-muted-foreground">
        New to StudioSpace?{" "}
        <Link href={withRedirect("/register", redirectTo)} className="font-medium text-primary hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
}
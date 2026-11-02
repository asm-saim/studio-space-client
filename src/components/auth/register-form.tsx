"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Check, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GoogleButton } from "@/components/auth/google-button";
import { PasswordField } from "@/components/auth/password-field";
import { Spinner } from "@/components/shared/spinner";
import { authClient } from "@/lib/auth-client";
import { PASSWORD_RULES, getPasswordErrors } from "@/lib/password";
import { getSafeRedirect, withRedirect } from "@/lib/safe-redirect";
import { cn } from "@/lib/utils";

type FieldErrors = { name?: string; email?: string; photo?: string };

function isHttpUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="text-sm text-destructive">
      {message}
    </p>
  );
}

export function RegisterForm() {
  const router = useRouter();
  const redirectTo = getSafeRedirect(useSearchParams().get("redirect"));
  const [password, setPassword] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);
  const [errors, setErrors] = React.useState<FieldErrors>({});
  const [formError, setFormError] = React.useState<string | null>(null);
  const [pending, setPending] = React.useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const photo = String(data.get("photo") ?? "").trim();

    const next: FieldErrors = {};
    if (!name) next.name = "Enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(email)) next.email = "Enter a valid email address.";
    if (photo && !isHttpUrl(photo)) next.photo = "Enter a valid image URL starting with https://";

    setErrors(next);
    setSubmitted(true);
    setFormError(null);

    if (Object.keys(next).length > 0 || getPasswordErrors(password).length > 0) {
      toast.error("Please fix the highlighted fields.");
      return;
    }

    setPending(true);
    try {
      const { error } = await authClient.signUp.email({
        name,
        email,
        password,
        image: photo || undefined,
      });
      if (error) {
        const message = error.message || "Could not create your account.";
        setFormError(message);
        toast.error(message);
        return;
      }
      toast.success("Account created. Please log in.");
      router.push(withRedirect("/login", redirectTo));
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
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" autoComplete="name" placeholder="Your full name" aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} />
          <FieldError id="name-error" message={errors.name} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" autoComplete="email" placeholder="you@example.com" aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} />
          <FieldError id="email-error" message={errors.email} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="photo">
            Photo URL <span className="font-normal text-muted-foreground">(optional)</span>
          </Label>
          <Input id="photo" name="photo" type="url" autoComplete="photo" placeholder="https://example.com/me.jpg" aria-invalid={!!errors.photo} aria-describedby={errors.photo ? "photo-error" : undefined} />
          <FieldError id="photo-error" message={errors.photo} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <PasswordField
            id="password"
            name="password"
            autoComplete="new-password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-invalid={submitted && getPasswordErrors(password).length > 0}
            aria-describedby="password-rules"
          />
          <ul id="password-rules" className="space-y-1 text-sm">
            {PASSWORD_RULES.map((rule) => {
              const met = rule.test(password);
              return (
                <li
                  key={rule.id}
                  className={cn(
                    "flex items-center gap-2",
                    met ? "text-foreground" : submitted ? "text-destructive" : "text-muted-foreground",
                  )}
                >
                  {met ? <Check aria-hidden="true" className="size-4 text-primary" /> : <X aria-hidden="true" className="size-4" />}
                  {rule.label}
                </li>
              );
            })}
          </ul>
        </div>

        {formError && (
          <p role="alert" className="text-sm text-destructive">
            {formError}
          </p>
        )}

        <Button type="submit" size="lg" className="h-11 w-full" disabled={pending}>
          {pending && <Spinner />}
          {pending ? "Creating account…" : "Register"}
        </Button>
      </form>

      <div className="my-6 flex items-center gap-3 text-sm text-muted-foreground">
        <span className="h-px flex-1 bg-border" />
        or
        <span className="h-px flex-1 bg-border" />
      </div>

      <GoogleButton callbackURL={redirectTo} />

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href={withRedirect("/login", redirectTo)} className="font-medium text-primary hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}
import { Suspense } from "react";
import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/login-form";


export const metadata: Metadata = { title: "Log in" };

export default function LoginPage() {
  return (
    <div className="mx-auto w-full max-w-md px-6 py-12 sm:py-20">
      <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">Log in</h1>
      <p className="mt-2 mb-8 text-muted-foreground">Welcome back. Log in to book and manage your studios.</p>
      <Suspense fallback={<div className="h-96 animate-pulse rounded-2xl bg-muted" />}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
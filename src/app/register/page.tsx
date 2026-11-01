import { Suspense } from "react";
import type { Metadata } from "next";
import { RegisterForm } from "@/components/auth/register-form";


export const metadata: Metadata = { title: "Register" };

export default function RegisterPage() {
  return (
    <div className="mx-auto w-full max-w-md px-6 py-12 sm:py-20">
      <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">Create your account</h1>
      <p className="mt-2 mb-8 text-muted-foreground">Join StudioSpace to book spaces or list your own.</p>
      <Suspense fallback={<div className="h-[34rem] animate-pulse rounded-2xl bg-muted" />}>
        <RegisterForm />
      </Suspense>
    </div>
  );
}
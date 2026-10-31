import type { Metadata } from "next"
import Link from "next/link"
import { DemoSignIn } from "@/components/auth/demo-sign-in"

export const metadata: Metadata = {
  title: "Log In",
}

export default function LoginPage() {
  return (
    <div className="mx-auto flex w-full max-w-xl flex-col items-center justify-center px-4 py-24 text-center">
      <p className="text-sm font-semibold tracking-widest text-muted-foreground uppercase">
        Account
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
        Welcome back
      </h1>
      <p className="mt-4 leading-relaxed text-muted-foreground">
        Sign in to manage your studios and bookings. The full email and Google
        sign-in flow arrives with the authentication task — the demo account
        lets you preview your logged-in navigation right now.
      </p>
      <div className="mt-8 w-full">
        <DemoSignIn />
      </div>
      <p className="mt-6 text-sm text-muted-foreground">
        New to StudioSpace?{" "}
        <Link
          href="/register"
          className="font-medium text-primary underline-offset-4 hover:underline"
        >
          Create an account
        </Link>
      </p>
    </div>
  )
}

import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Register",
}

export default function RegisterPage() {
  return (
    <div className="mx-auto flex w-full max-w-xl flex-col items-center justify-center px-4 py-24 text-center">
      <p className="text-sm font-semibold tracking-widest text-muted-foreground uppercase">
        Join StudioSpace
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
        Create your account
      </h1>
      <p className="mt-4 leading-relaxed text-muted-foreground">
        List your studio, set your rates, and start taking bookings. The
        registration form — name, email, photo URL, and password rules —
        arrives with the authentication task.
      </p>
      <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row">
        <Button nativeButton={false} render={<Link href="/login" />}>
          I already have an account
        </Button>
        <Button
          variant="outline"
          nativeButton={false}
          render={<Link href="/" />}
        >
          Back to Home
        </Button>
      </div>
    </div>
  )
}

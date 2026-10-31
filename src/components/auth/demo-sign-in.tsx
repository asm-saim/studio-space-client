"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowRight } from "lucide-react"
import { useAuth } from "@/components/auth/auth-provider"
import { Button } from "@/components/ui/button"

/**
 * Stand-in sign-in button used until the real BetterAuth email/Google flow
 * is built. Switches the shared AuthProvider into its authenticated state so
 * the logged-in navbar can be previewed end to end.
 */
export function DemoSignIn() {
  const { login } = useAuth()
  const router = useRouter()

  function handleSignIn() {
    login()
    router.push("/")
  }

  return (
    <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row">
      <Button onClick={handleSignIn}>
        Sign in with demo account
        <ArrowRight aria-hidden="true" />
      </Button>
      <Button
        variant="outline"
        nativeButton={false}
        render={<Link href="/register" />}
      >
        Create an account
      </Button>
    </div>
  )
}

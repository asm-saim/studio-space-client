"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { authClient } from "@/lib/auth-client"

export type AuthUser = {
  name: string
  email: string
  image?: string
}

type AuthContextValue = {
  user: AuthUser | null
  /** True while the session is being loaded on first render. */
  isPending: boolean
  logout: () => Promise<void>
}

const AuthContext = React.createContext<AuthContextValue | null>(null)

/**
 * Backed by the BetterAuth session (HTTPOnly cookie). The session is read on
 * the client, so a page refresh keeps the user logged in.
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { data: session, isPending } = authClient.useSession()
  const sessionUser = session?.user

  const user = React.useMemo<AuthUser | null>(
    () =>
      sessionUser
        ? {
            name: sessionUser.name,
            email: sessionUser.email,
            image: sessionUser.image ?? undefined,
          }
        : null,
    [sessionUser]
  )

  const logout = React.useCallback(async () => {
    try {
      const { error } = await authClient.signOut()
      if (error) {
        toast.error(error.message || "Could not log out. Please try again.")
        return
      }
      toast.success("You have been logged out")
      router.push("/")
      router.refresh()
    } catch {
      toast.error("Could not log out. Please try again.")
    }
  }, [router])

  const value = React.useMemo(
    () => ({ user, isPending, logout }),
    [user, isPending, logout]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
"use client"

import * as React from "react"
import { toast } from "sonner"

export type AuthUser = {
  name: string
  email: string
  image: string
}

type AuthContextValue = {
  user: AuthUser | null
  login: () => void
  logout: () => void
}

/**
 * Temporary demo user so the authenticated navbar can be built and verified
 * before BetterAuth is wired up. Replace the internals of this provider with
 * a real BetterAuth session — consumers (header/footer) won't need to change.
 */
const DEMO_USER: AuthUser = {
  name: "Ava Rahman",
  email: "ava@studiospace.io",
  image: "https://i.pravatar.cc/128?img=47",
}

const AuthContext = React.createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<AuthUser | null>(null)

  const login = React.useCallback(() => {
    setUser(DEMO_USER)
    toast.success("Welcome back to StudioSpace, Ava!")
  }, [])

  const logout = React.useCallback(() => {
    setUser(null)
    toast.success("You have been logged out")
  }, [])

  const value = React.useMemo(
    () => ({ user, login, logout }),
    [user, login, logout]
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

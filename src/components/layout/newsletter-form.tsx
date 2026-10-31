"use client"

import * as React from "react"
import { Send } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function NewsletterForm() {
  const [email, setEmail] = React.useState("")

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!EMAIL_PATTERN.test(email.trim())) {
      toast.error("Please enter a valid email address")
      return
    }

    toast.success("You're on the list! Studio tips are headed your way.")
    setEmail("")
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-sm items-center gap-2"
      noValidate
    >
      <Input
        type="email"
        name="email"
        autoComplete="email"
        placeholder="you@example.com"
        aria-label="Email address for the newsletter"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <Button type="submit" className="shrink-0">
        <Send aria-hidden="true" />
        Subscribe
      </Button>
    </form>
  )
}

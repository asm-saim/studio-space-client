import type { Metadata } from "next"
import { Building } from "lucide-react"
import { PlaceholderPage } from "@/components/layout/placeholder-page"

export const metadata: Metadata = {
  title: "My Studio Listings",
}

export default function MyListingsPage() {
  return (
    <PlaceholderPage
      label="Private Route"
      title="Your Studio Listings"
      description="Every space you host — with update and delete controls — will be listed here. You'll only ever see your own listings, matched by your account email."
      icon={Building}
    />
  )
}

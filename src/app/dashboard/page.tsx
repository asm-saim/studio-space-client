import type { Metadata } from "next"
import { LayoutDashboard } from "lucide-react"
import { PlaceholderPage } from "@/components/layout/placeholder-page"

export const metadata: Metadata = {
  title: "Dashboard",
}

export default function DashboardPage() {
  return (
    <PlaceholderPage
      label="Private Route"
      title="Your StudioSpace Dashboard"
      description="An overview of your listings, upcoming bookings, and account settings will live here once authentication is wired up."
      icon={LayoutDashboard}
    />
  )
}

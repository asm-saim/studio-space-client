import type { Metadata } from "next"
import { CalendarCheck } from "lucide-react"
import { PlaceholderPage } from "@/components/layout/placeholder-page"

export const metadata: Metadata = {
  title: "My Bookings",
}

export default function MyBookingsPage() {
  return (
    <PlaceholderPage
      label="Private Route"
      title="Your Reservations"
      description="Upcoming and past studio bookings with status badges — Pending, Confirmed, Completed, Cancelled — and cancellation for pending slots will appear here."
      icon={CalendarCheck}
    />
  )
}

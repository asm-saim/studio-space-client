import type { Metadata } from "next"
import { FileText } from "lucide-react"
import { PlaceholderPage } from "@/components/layout/placeholder-page"

export const metadata: Metadata = {
  title: "Terms of Service",
}

export default function TermsPage() {
  return (
    <PlaceholderPage
      label="Legal"
      title="Terms of Service"
      description="The full terms governing listings, bookings, cancellations, and host responsibilities will be published here before launch."
      icon={FileText}
    />
  )
}

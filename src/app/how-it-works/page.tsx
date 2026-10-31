import type { Metadata } from "next"
import { Lightbulb } from "lucide-react"
import { PlaceholderPage } from "@/components/layout/placeholder-page"

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "How booking a studio on StudioSpace works — four simple steps from discovery to production.",
}

export default function HowItWorksPage() {
  return (
    <PlaceholderPage
      label="How Booking Works"
      title="From Discovery to Production"
      description="Four steps: discover spaces, select your shoot hours, book instantly, and create & produce. The full step-by-step guide lands with the home page build."
      icon={Lightbulb}
    />
  )
}

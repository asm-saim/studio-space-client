import type { Metadata } from "next"
import { Building } from "lucide-react"
import { PlaceholderPage } from "@/components/layout/placeholder-page"

export const metadata: Metadata = {
  title: "Explore Studios",
  description:
    "Browse photo studios, sound stages, podcast rooms, music suites, and art workshops with transparent hourly rates.",
}

export default function StudiosPage() {
  return (
    <PlaceholderPage
      label="Explore Studios"
      title="Find Your Next Creative Space"
      description="A live grid of studios with category filters, hourly rates, ratings, and location is coming in the Explore Studios task — category links from the footer will pre-select the filter."
      icon={Building}
    />
  )
}

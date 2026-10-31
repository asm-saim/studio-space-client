import type { Metadata } from "next"
import { Info } from "lucide-react"
import { PlaceholderPage } from "@/components/layout/placeholder-page"

export const metadata: Metadata = {
  title: "About Us",
  description:
    "StudioSpace is a peer-to-peer marketplace where creators rent and share professional creative spaces.",
}

export default function AboutPage() {
  return (
    <PlaceholderPage
      label="About Us"
      title="The Marketplace for Creative Spaces"
      description="StudioSpace is built for creators, filmmakers, photographers, podcasters, and musicians — pairing hosts who own professional spaces with creators who need them, by the hour."
      icon={Info}
    />
  )
}

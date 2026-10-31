import type { Metadata } from "next"
import { ShieldCheck } from "lucide-react"
import { PlaceholderPage } from "@/components/layout/placeholder-page"

export const metadata: Metadata = {
  title: "Privacy Notice",
}

export default function PrivacyPage() {
  return (
    <PlaceholderPage
      label="Legal"
      title="Privacy Notice"
      description="How StudioSpace collects, uses, and protects your personal data, studio listings, and booking information will be detailed here before launch."
      icon={ShieldCheck}
    />
  )
}

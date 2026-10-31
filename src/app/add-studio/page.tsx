import type { Metadata } from "next"
import { CirclePlus } from "lucide-react"
import { PlaceholderPage } from "@/components/layout/placeholder-page"

export const metadata: Metadata = {
  title: "Add New Studio",
}

export default function AddStudioPage() {
  return (
    <PlaceholderPage
      label="Private Route"
      title="List a New Studio"
      description="The listing form — title, category, hourly rate, deposit, capacity, photos, and amenities — arrives with the CRUD task."
      icon={CirclePlus}
    />
  )
}

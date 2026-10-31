import { ArrowLeft, type LucideIcon } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

type PlaceholderPageProps = {
  /** Small uppercase kicker shown above the heading */
  label: string
  /** Main page heading */
  title: string
  /** One or two real sentences explaining what will live here */
  description: string
  icon: LucideIcon
}

/**
 * Temporary branded shell for routes whose full feature is coming in a later
 * task. Keeps every navbar/footer link click-through safe (no 404s).
 * Replace the whole page file when building the real feature.
 */
export function PlaceholderPage({
  label,
  title,
  description,
  icon: Icon,
}: PlaceholderPageProps) {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col items-center justify-center px-4 py-24 text-center">
      <div className="mb-6 flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/20">
        <Icon className="size-8" aria-hidden="true" />
      </div>
      <p className="text-sm font-semibold tracking-widest text-muted-foreground uppercase">
        {label}
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
        {title}
      </h1>
      <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">
        {description}
      </p>
      <Button
        className="mt-8"
        nativeButton={false}
        render={<Link href="/" />}
      >
        <ArrowLeft aria-hidden="true" />
        Back to Home
      </Button>
    </div>
  )
}

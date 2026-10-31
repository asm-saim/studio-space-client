import Image from "next/image"
import Link from "next/link"
import { cn } from "cn"

type LogoProps = {
  href?: string
  className?: string
}

/**
 * Shared StudioSpace logo (brand aperture icon + wordmark).
 * Used in both the header and the footer so branding stays identical everywhere.
 */
export function Logo({ href = "/", className }: LogoProps) {
  return (
    <Link
      href={href}
      className={cn("inline-flex shrink-0 items-center gap-2 text-foreground", className)}
    >
      <Image
        src="/icon.png"
        alt=""
        aria-hidden="true"
        width={500}
        height={500}
        className="size-9 shrink-0"
      />
      <span className="text-lg font-bold tracking-tight">
        Studio<span className="text-primary">Space</span>
      </span>
    </Link>
  )
}

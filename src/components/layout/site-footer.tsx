import { Camera, Clapperboard, Disc, Mic, Palette } from "lucide-react"
import Link from "next/link"
import { NewsletterForm } from "@/components/layout/newsletter-form"
import { Logo } from "@/components/layout/logo"

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "Explore Studios", href: "/studios" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "About Us", href: "/about" },
]

const CATEGORIES = [
  { label: "Photo Studios", slug: "photo-studios", icon: Camera },
  { label: "Sound Stages", slug: "sound-stages", icon: Clapperboard },
  { label: "Podcast Rooms", slug: "podcast-rooms", icon: Mic },
  { label: "Music Suites", slug: "music-suites", icon: Disc },
  { label: "Art Workshops", slug: "art-workshops", icon: Palette },
]

const SOCIAL_LINKS = [
  {
    label: "StudioSpace on X",
    href: "https://x.com/studiospace",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.451-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644Z" />
      </svg>
    ),
  },
  {
    label: "StudioSpace on Instagram",
    href: "https://instagram.com/studiospace",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Zm0 2a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Zm5-3.25a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Z" />
      </svg>
    ),
  },
  {
    label: "StudioSpace on YouTube",
    href: "https://youtube.com/@studiospace",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.4 31.4 0 0 0 0 12a31.4 31.4 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.4 31.4 0 0 0 24 12a31.4 31.4 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z" />
      </svg>
    ),
  },
  {
    label: "StudioSpace on LinkedIn",
    href: "https://linkedin.com/company/studiospace",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z" />
      </svg>
    ),
  },
]

export async function SiteFooter() {
  "use cache"
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border/70 bg-muted/30">
      <div className="mx-auto w-full max-w-7xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-4">
            <Logo />
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              StudioSpace connects creators with professional studios — from
              photo cyc walls to cinema sound stages — so every idea finds the
              space it deserves.
            </p>
            <div className="flex items-center gap-2">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex size-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  <span className="[&>svg]:size-4">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Footer quick links" className="flex flex-col gap-3">
            <h2 className="text-sm font-semibold tracking-wide uppercase">
              Quick Links
            </h2>
            {QUICK_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <nav aria-label="Popular studio categories" className="flex flex-col gap-3">
            <h2 className="text-sm font-semibold tracking-wide uppercase">
              Popular Categories
            </h2>
            {CATEGORIES.map((category) => (
              <Link
                key={category.slug}
                href={`/studios?category=${category.slug}`}
                className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <category.icon className="size-4 shrink-0 text-primary" aria-hidden="true" />
                {category.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-3">
            <h2 className="text-sm font-semibold tracking-wide uppercase">
              Stay in the Loop
            </h2>
            <p className="text-sm text-muted-foreground">
              New studios, booking tips, and creator stories — once a month,
              no noise.
            </p>
            <NewsletterForm />
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border/70 pt-6 text-sm text-muted-foreground sm:flex-row">
          <p>
            © {year} StudioSpace. All rights reserved. By using StudioSpace you
            agree to our terms.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="transition-colors hover:text-foreground">
              Terms of Service
            </Link>
            <Link href="/privacy" className="transition-colors hover:text-foreground">
              Privacy Notice
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

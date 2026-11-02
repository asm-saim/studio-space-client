import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CtaPanel } from "@/components/shared/cta-panel";
import { GUARANTEES } from "@/components/content/guarantees";
import { STUDIO_CATEGORIES, categoryHref } from "@/components/home/categories";
import "@/components/content/content-pages.css";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "StudioSpace is a peer-to-peer marketplace where creators rent and share professional creative spaces.",
};

export default function AboutPage() {
  return (
    <>
      {/* Editorial split hero: brand story on the left, studio scene on the right. */}
      <header className="px-6 pt-14 sm:px-8 sm:pt-20 lg:px-12">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
          <div className="hero-enter">
            <p className="text-sm font-semibold tracking-widest text-primary uppercase">
              About us
            </p>
            <h1 className="font-heading mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
              The Marketplace for Creative Spaces
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
              StudioSpace is a peer-to-peer marketplace where creators rent and
              share professional creative spaces.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button nativeButton={false} render={<Link href="/studios" />}>
                Explore Studios
              </Button>
              <Button
                variant="outline"
                nativeButton={false}
                render={<Link href="/add-studio" />}
              >
                Host Your Space
              </Button>
            </div>
          </div>
          <figure className="relative overflow-hidden rounded-3xl">
            <div className="relative aspect-[4/3] w-full">
              <Image
                src="/banner-img/pic1.jpg"
                alt="A photographer adjusting studio lighting on a set inside a photo studio"
                fill
                priority
                sizes="(min-width: 1024px) 48vw, 100vw"
                className="object-cover"
              />
            </div>
          </figure>
        </div>
      </header>

      <section aria-labelledby="purpose-heading" className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
            <div>
              <h2
                id="purpose-heading"
                className="font-heading text-3xl font-bold tracking-tight sm:text-4xl"
              >
                Pairing hosts with creators
              </h2>
            </div>
            <div className="space-y-4 leading-relaxed text-muted-foreground">
              <p>
                StudioSpace is built for creators, filmmakers, photographers,
                podcasters, and musicians — pairing hosts who own professional
                spaces with creators who need them, by the hour.
              </p>
              <p>
                Discover and book photo studios, sound stages, podcast rooms,
                music suites, and art workshops by the hour — or host your own
                creative space on StudioSpace.
              </p>
            </div>
          </div>
          <blockquote className="mt-12 max-w-3xl border-l-2 border-primary pl-6 sm:mt-14">
            <p className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
              &ldquo;StudioSpace connects creators with professional studios —
              from photo cyc walls to cinema sound stages — so every idea finds
              the space it deserves.&rdquo;
            </p>
          </blockquote>
        </div>
      </section>

      {/* Two-image storytelling band — no text over photos. */}
      <section aria-label="Inside StudioSpace spaces" className="pb-16 sm:pb-24">
        <div className="mx-auto grid max-w-7xl gap-4 px-6 sm:grid-cols-2 sm:gap-6 sm:px-8 lg:px-12">
          <figure className="relative aspect-[4/3] overflow-hidden rounded-3xl">
            <Image
              src="/banner-img/pic3.jpg"
              alt="Two hosts recording a podcast around broadcast microphones in an acoustically treated room"
              fill
              sizes="(min-width: 640px) 50vw, 100vw"
              className="object-cover motion-safe:transition-transform motion-safe:duration-700 motion-safe:hover:scale-105"
            />
          </figure>
          <figure className="relative aspect-[4/3] overflow-hidden rounded-3xl">
            <Image
              src="/banner-img/pic5.jpg"
              alt="A film crew recording a scene under studio lights on a production stage"
              fill
              sizes="(min-width: 640px) 50vw, 100vw"
              className="object-cover motion-safe:transition-transform motion-safe:duration-700 motion-safe:hover:scale-105"
            />
          </figure>
        </div>
      </section>

      <section aria-labelledby="categories-heading" className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="max-w-xl">
            <h2
              id="categories-heading"
              className="font-heading text-3xl font-bold tracking-tight sm:text-4xl"
            >
              Spaces for every kind of work
            </h2>
            <p className="mt-3 text-muted-foreground">
              Five categories, all bookable by the hour.
            </p>
          </div>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {STUDIO_CATEGORIES.map((category) => {
              const Icon = category.icon;
              return (
                <li key={category.slug}>
                  <Link
                    href={categoryHref(category.slug)}
                    className="group flex h-full flex-col rounded-2xl border bg-card p-6 outline-none transition-colors hover:border-primary/60 focus-visible:ring-3 focus-visible:ring-ring/50"
                  >
                    <span
                      aria-hidden="true"
                      className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary"
                    >
                      <Icon className="size-6" />
                    </span>
                    <h3 className="font-heading mt-4 text-base font-semibold">
                      {category.label}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {category.description}
                    </p>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-medium text-primary">
                      Browse
                      <ArrowRight
                        aria-hidden="true"
                        className="size-4 motion-safe:transition-transform motion-safe:group-hover:translate-x-0.5"
                      />
                    </span>
                  </Link>
                </li>
              );
            })}
            <li>
              <Link
                href="/studios"
                className="flex h-full min-h-36 flex-col items-center justify-center gap-3 rounded-2xl border border-dashed p-6 text-center outline-none transition-colors hover:border-primary focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                <Building2 aria-hidden="true" className="size-7 text-primary" />
                <span className="font-heading font-semibold">
                  Browse all studios
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <section aria-labelledby="trust-heading" className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="max-w-xl">
            <h2
              id="trust-heading"
              className="font-heading text-3xl font-bold tracking-tight sm:text-4xl"
            >
              What every booking includes
            </h2>
            <p className="mt-3 text-muted-foreground">
              Book with confidence. Every session is backed by the same
              protections.
            </p>
          </div>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {GUARANTEES.map(({ icon: Icon, title, description }) => (
              <li
                key={title}
                className="rounded-2xl border bg-card p-6 transition-colors hover:border-primary/50"
              >
                <span
                  aria-hidden="true"
                  className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary"
                >
                  <Icon className="size-6" />
                </span>
                <h3 className="font-heading mt-4 text-base font-semibold">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaPanel
        heading="Find your space"
        description="Browse studios by the hour — or list your own space for creators to book."
      />
    </>
  );
}

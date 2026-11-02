import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, MapPin, Star, Users } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { getStudio } from "@/lib/studios";
import { cn } from "@/lib/utils";
import { StudioGallery } from "@/components/studios/studio-gallery";
import { getCategoryLabel } from "@/components/home/categories";
import { formatDate, formatMoney, initialsOf } from "@/lib/format";
import { BookingModal } from "@/components/studios/booking-modal";

// Dynamic segment: the shared layout's usePathname() can't be baked into a
// static shell (the URL is only known at request time), so this route blocks.
export const instant = false;

function Stars({ rating }: { rating: number }) {
  const filled = Math.round(rating);
  return (
    <span className="inline-flex" aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} className={cn("size-4", i < filled ? "fill-primary text-primary" : "text-muted-foreground/40")} />
      ))}
    </span>
  );
}

function DetailsSkeleton() {
  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-10 sm:px-8 lg:px-12" aria-hidden="true">
      <div className="grid gap-8 lg:grid-cols-[1fr_22rem]">
        <div className="space-y-6">
          <div className="aspect-[16/10] animate-pulse rounded-2xl bg-muted" />
          <div className="h-8 w-2/3 animate-pulse rounded bg-muted" />
          <div className="h-24 animate-pulse rounded bg-muted" />
        </div>
        <div className="h-72 animate-pulse rounded-2xl bg-muted" />
      </div>
    </div>
  );
}

async function StudioDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const studio = await getStudio(id);
  if (!studio) notFound();

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-10 sm:px-8 lg:px-12">
      <Link href="/studios" className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft aria-hidden="true" className="size-4" />
        All studios
      </Link>

      <div className="grid gap-8 lg:grid-cols-[1fr_22rem] lg:items-start">
        <div className="min-w-0 space-y-10">
          <StudioGallery images={studio.images} title={studio.title} />

          <header className="space-y-3">
            <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              {getCategoryLabel(studio.category)}
            </span>
            <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">{studio.title}</h1>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <MapPin aria-hidden="true" className="size-4" />
                {studio.location}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Users aria-hidden="true" className="size-4" />
                Up to {studio.maxCapacity} guests
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Stars rating={studio.rating} />
                {studio.reviewCount > 0 ? (
                  <>
                    <span className="sr-only">Rated</span>
                    {studio.rating.toFixed(1)} ({studio.reviewCount} {studio.reviewCount === 1 ? "review" : "reviews"})
                  </>
                ) : (
                  "No reviews yet"
                )}
              </span>
            </div>
          </header>

          <section aria-labelledby="overview-heading">
            <h2 id="overview-heading" className="font-heading text-xl font-semibold">About this space</h2>
            <p className="mt-3 leading-relaxed whitespace-pre-line text-muted-foreground">{studio.overview}</p>
          </section>

          <section aria-labelledby="specs-heading">
            <h2 id="specs-heading" className="font-heading text-xl font-semibold">Specifications</h2>
            <dl className="mt-4 grid gap-4 sm:grid-cols-3">
              {[
                ["Hourly rate", formatMoney(studio.hourlyRate)],
                ["Security deposit", formatMoney(studio.securityDeposit)],
                ["Max capacity", `${studio.maxCapacity} people`],
              ].map(([label, value]) => (
                <div key={label} className="rounded-xl border bg-card p-4">
                  <dt className="text-sm text-muted-foreground">{label}</dt>
                  <dd className="mt-1 text-lg font-semibold">{value}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section aria-labelledby="amenities-heading">
            <h2 id="amenities-heading" className="font-heading text-xl font-semibold">Amenities</h2>
            {studio.amenities.length > 0 ? (
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {studio.amenities.map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm">
                    <Check aria-hidden="true" className="size-4 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-sm text-muted-foreground">The host hasn&apos;t listed any amenities yet.</p>
            )}
          </section>

          <section aria-labelledby="host-heading">
            <h2 id="host-heading" className="font-heading text-xl font-semibold">Your host</h2>
            <div className="mt-4 flex items-center gap-4 rounded-xl border bg-card p-4">
              <Avatar>
                <AvatarImage src={studio.ownerImage} alt={studio.ownerName} referrerPolicy="no-referrer" />
                <AvatarFallback>{initialsOf(studio.ownerName)}</AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <p className="truncate font-semibold">{studio.ownerName}</p>
                <a href={`mailto:${studio.ownerEmail}`} className="block truncate text-sm text-muted-foreground hover:text-foreground">
                  {studio.ownerEmail}
                </a>
              </div>
            </div>
          </section>

          <section aria-labelledby="reviews-heading">
            <h2 id="reviews-heading" className="font-heading text-xl font-semibold">Reviews</h2>
            {studio.reviews.length > 0 ? (
              <ul className="mt-4 space-y-4">
                {studio.reviews.map((review, index) => (
                  <li key={index} className="rounded-xl border bg-card p-4">
                    <div className="flex items-center gap-3">
                      <Avatar size="sm">
                        <AvatarFallback>{initialsOf(review.author)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-semibold">{review.author}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Stars rating={review.rating} />
                          <span className="sr-only">{review.rating} out of 5</span>
                          {review.createdAt && <span>{formatDate(review.createdAt.slice(0, 10))}</span>}
                        </div>
                      </div>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{review.comment}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-sm text-muted-foreground">No reviews yet. Book this space and be the first to share your experience.</p>
            )}
          </section>
        </div>

        <aside className="space-y-4 rounded-2xl border bg-card p-6 lg:sticky lg:top-24">
          <p className="text-3xl font-bold">
            {formatMoney(studio.hourlyRate)}
            <span className="text-base font-normal text-muted-foreground"> / hr</span>
          </p>
          <p className="text-sm text-muted-foreground">
            {formatMoney(studio.securityDeposit)} security deposit · up to {studio.maxCapacity} guests
          </p>
          <BookingModal
            studio={{
              id: studio.id,
              title: studio.title,
              hourlyRate: studio.hourlyRate,
              securityDeposit: studio.securityDeposit,
              maxCapacity: studio.maxCapacity,
              ownerEmail: studio.ownerEmail,
            }}
          />
          <p className="text-center text-xs text-muted-foreground">You won&apos;t be charged yet. The host confirms your request first.</p>
        </aside>
      </div>
    </div>
  );
}

export default function StudioDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<DetailsSkeleton />}>
      <StudioDetails params={params} />
    </Suspense>
  );
}
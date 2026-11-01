import { Suspense } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Pencil, Plus, Star } from "lucide-react";
import { PageContainer } from "@/components/shared/page-container";
import { requireUser } from "@/lib/session";
import { getMyStudios } from "@/lib/private-data";
import { Button } from "@/components/ui/button";
import { getCategoryLabel } from "@/components/home/categories";
import { formatMoney } from "@/lib/format";
import { DeleteStudioButton } from "@/components/studios/delete-studio-button";


export const metadata: Metadata = { title: "My listings" };

async function Listings() {
  const user = await requireUser("/my-listings");

  let studios: Awaited<ReturnType<typeof getMyStudios>> = [];
  try {
    studios = await getMyStudios(user);
  } catch (error) {
    console.error("Failed to load listings", error);
    return (
      <div className="rounded-2xl border border-dashed p-10 text-center text-muted-foreground">
        We couldn&apos;t load your listings right now. Please refresh in a moment.
      </div>
    );
  }

  if (studios.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed p-10 text-center">
        <p className="text-muted-foreground">You haven&apos;t listed a studio yet.</p>
        <Button nativeButton={false} render={<Link href="/add-studio" />}>
          Add your first studio
        </Button>
      </div>
    );
  }

  return (
    <ul className="space-y-4">
      {studios.map((studio) => (
        <li key={studio.id} className="flex flex-col gap-4 rounded-2xl border bg-card p-4 sm:flex-row sm:items-center">
          <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-xl bg-muted sm:w-44">
            {studio.image && <Image src={studio.image} alt={studio.title} fill sizes="(min-width: 640px) 176px, 100vw" className="object-cover" />}
          </div>

          <div className="min-w-0 flex-1 space-y-1.5">
            <span className="inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
              {getCategoryLabel(studio.category)}
            </span>
            <h2 className="font-heading truncate text-lg font-semibold">
              <Link href={`/studios/${studio.id}`} className="hover:underline">
                {studio.title}
              </Link>
            </h2>
            <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin aria-hidden="true" className="size-4 shrink-0" />
              <span className="truncate">{studio.location}</span>
            </p>
            <p className="flex items-center gap-3 text-sm">
              <span className="font-semibold">{formatMoney(studio.hourlyRate)} / hr</span>
              <span className="inline-flex items-center gap-1 text-muted-foreground">
                <Star aria-hidden="true" className="size-3.5 fill-primary text-primary" />
                {studio.rating > 0 ? studio.rating.toFixed(1) : "No ratings"}
              </span>
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button variant="outline" nativeButton={false} render={<Link href={`/studios/edit/${studio.id}`} />}>
              <Pencil aria-hidden="true" />
              Update
            </Button>
            <DeleteStudioButton id={studio.id} title={studio.title} />
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function MyListingsPage() {
  return (
    <PageContainer
      title="My studio listings"
      description="Spaces you host on StudioSpace."
      action={
        <Button nativeButton={false} render={<Link href="/add-studio" />}>
          <Plus aria-hidden="true" />
          Add new studio
        </Button>
      }
    >
      <Suspense
        fallback={
          <div aria-hidden="true" className="space-y-4">
            {Array.from({ length: 3 }, (_, i) => (
              <div key={i} className="h-36 animate-pulse rounded-2xl bg-muted" />
            ))}
          </div>
        }
      >
        <Listings />
      </Suspense>
    </PageContainer>
  );
}
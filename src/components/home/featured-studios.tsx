import { Suspense } from "react";
import Link from "next/link";
import { Building2 } from "lucide-react";
import { StudioCard } from "@/components/home/studio-card";
import { EmptyState } from "@/components/shared/empty-state";
import { Skeleton } from "@/components/shared/skeletons";
import { Button } from "@/components/ui/button";
import { getFeaturedStudios, type StudioSummary } from "@/lib/studios";

async function StudioGrid() {
  let studios: StudioSummary[] = [];
  try {
    studios = await getFeaturedStudios();
  } catch (error) {
    console.error("Failed to load featured studios", error);
  }

  if (studios.length === 0) {
    return (
      <div className="mt-10">
        <EmptyState icon={Building2} title="No studios listed yet" description="Be the first to share a space with the StudioSpace community.">
          <Button nativeButton={false} render={<Link href="/add-studio" />}>
            Add your studio
          </Button>
          <Button variant="outline" nativeButton={false} render={<Link href="/studios" />}>
            Browse all studios
          </Button>
        </EmptyState>
      </div>
    );
  }

  return (
    <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {studios.map((studio) => (
        <StudioCard key={studio.id} studio={studio} />
      ))}
    </div>
  );
}

function StudioGridSkeleton() {
  return (
    <div role="status" aria-label="Loading studios" className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }, (_, i) => (
        <div key={i} className="overflow-hidden rounded-2xl border bg-card">
          <Skeleton className="aspect-[4/3] rounded-none" />
          <div className="space-y-3 p-5">
            <Skeleton className="h-5 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-9 w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function FeaturedStudios() {
  return (
    <section aria-labelledby="featured-heading" className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <h2 id="featured-heading" className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
              Featured studios
            </h2>
            <p className="mt-3 text-muted-foreground">Our highest-rated spaces, ready to book by the hour.</p>
          </div>
          <Button variant="outline" nativeButton={false} render={<Link href="/studios" />}>
            Browse all studios
          </Button>
        </div>

        <Suspense fallback={<StudioGridSkeleton />}>
          <StudioGrid />
        </Suspense>
      </div>
    </section>
  );
}
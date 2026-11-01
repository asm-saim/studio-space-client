import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Search } from "lucide-react";
import { PageContainer } from "@/components/shared/page-container";
import { StudioCard } from "@/components/home/studio-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { getStudios, type StudioSummary } from "@/lib/studios";
import { cn } from "@/lib/utils";
import { STUDIO_CATEGORIES } from "@/components/home/categories";

export const metadata: Metadata = { title: "Explore studios" };

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

const first = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value);

function ResultsSkeleton() {
  return (
    <div aria-hidden="true">
      <div className="h-10 w-full max-w-xl animate-pulse rounded-lg bg-muted" />
      <div className="mt-6 flex gap-2">
        {Array.from({ length: 5 }, (_, i) => (
          <div key={i} className="h-9 w-28 animate-pulse rounded-full bg-muted" />
        ))}
      </div>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="overflow-hidden rounded-2xl border bg-card">
            <div className="aspect-[4/3] animate-pulse bg-muted" />
            <div className="space-y-3 p-5">
              <div className="h-5 w-2/3 animate-pulse rounded bg-muted" />
              <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

async function StudiosResults({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const rawCategory = first(sp.category) ?? "";
  const category = STUDIO_CATEGORIES.some((c) => c.slug === rawCategory) ? rawCategory : "";
  const q = (first(sp.q) ?? "").trim().slice(0, 60);

  let studios: StudioSummary[] = [];
  let failed = false;
  try {
    studios = await getStudios({ category, q });
  } catch (error) {
    console.error("Failed to load studios", error);
    failed = true;
  }

  const hrefFor = (slug: string) => {
    const params = new URLSearchParams();
    if (slug) params.set("category", slug);
    if (q) params.set("q", q);
    const query = params.toString();
    return query ? `/studios?${query}` : "/studios";
  };

  const pills = [{ slug: "", label: "All" }, ...STUDIO_CATEGORIES.map((c) => ({ slug: c.slug, label: c.label }))];

  return (
    <>
      <form action="/studios" className="flex max-w-xl gap-2" role="search">
        {category && <input type="hidden" name="category" value={category} />}
        <div className="relative flex-1">
          <Search aria-hidden="true" className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input name="q" defaultValue={q} placeholder="Search by name or location" aria-label="Search studios" className="pl-9" />
        </div>
        <Button type="submit">Search</Button>
      </form>

      <nav aria-label="Studio categories" className="mt-6 flex flex-wrap gap-2">
        {pills.map((pill) => {
          const active = pill.slug === category;
          return (
            <Link
              key={pill.slug || "all"}
              href={hrefFor(pill.slug)}
              aria-current={active ? "page" : undefined}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                active ? "border-primary bg-primary text-primary-foreground" : "text-muted-foreground hover:border-primary hover:text-foreground"
              )}
            >
              {pill.label}
            </Link>
          );
        })}
      </nav>

      {failed ? (
        <div className="mt-10 rounded-2xl border border-dashed p-10 text-center text-muted-foreground">
          We couldn&apos;t load studios right now. Please refresh in a moment.
        </div>
      ) : studios.length === 0 ? (
        <div className="mt-10 flex flex-col items-center gap-4 rounded-2xl border border-dashed p-10 text-center">
          <p className="text-muted-foreground">No studios match your search yet.</p>
          <Button variant="outline" nativeButton={false} render={<Link href="/studios" />}>
            Clear filters
          </Button>
        </div>
      ) : (
        <>
          <p className="mt-8 text-sm text-muted-foreground">
            {studios.length} {studios.length === 1 ? "studio" : "studios"}
          </p>
          <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {studios.map((studio) => (
              <StudioCard key={studio.id} studio={studio} />
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default function StudiosPage({ searchParams }: { searchParams: SearchParams }) {
  return (
    <PageContainer title="Explore studios" description="Find a space by category, name, or location, then book it by the hour.">
      <Suspense fallback={<ResultsSkeleton />}>
        <StudiosResults searchParams={searchParams} />
      </Suspense>
    </PageContainer>
  );
}
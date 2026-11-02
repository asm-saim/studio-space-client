import { cn } from "@/lib/utils";

/** Brand-tinted placeholder block. */
export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("animate-pulse rounded-md bg-primary/10 motion-reduce:animate-none", className)}
    />
  );
}

/** Stack of row cards (my listings, my bookings). */
export function ListSkeleton({ count = 3, itemClassName = "h-40" }: { count?: number; itemClassName?: string }) {
  return (
    <div role="status" aria-label="Loading" className="space-y-4">
      {Array.from({ length: count }, (_, i) => (
        <Skeleton key={i} className={cn("rounded-2xl", itemClassName)} />
      ))}
    </div>
  );
}

/** Placeholder for the add/edit studio form. */
export function FormSkeleton() {
  return (
    <div role="status" aria-label="Loading form" className="space-y-6 rounded-2xl border bg-card p-6 sm:p-8">
      <Skeleton className="h-9 w-full" />
      <Skeleton className="h-9 w-full" />
      <div className="grid gap-5 sm:grid-cols-2">
        <Skeleton className="h-9" />
        <Skeleton className="h-9" />
        <Skeleton className="h-9" />
        <Skeleton className="h-9" />
      </div>
      <Skeleton className="h-40 w-full" />
      <Skeleton className="h-32 w-full" />
      <Skeleton className="ml-auto h-11 w-40" />
    </div>
  );
}

import { Logo } from "@/components/layout/logo";

/** Full-section branded loader used for route transitions. */
export function BrandLoader({ label = "Loading…" }: { label?: string }) {
  return (
    <div role="status" aria-live="polite" className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-6">
      <Logo />
      <div className="relative size-10" aria-hidden="true">
        <span className="absolute inset-0 rounded-full border-4 border-primary/20" />
        <span className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-primary motion-reduce:animate-none" />
      </div>
      <span className="sr-only">{label}</span>
    </div>
  );
}

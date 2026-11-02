import Link from "next/link";
import { Button } from "@/components/ui/button";

type CtaPanelProps = {
  heading: string;
  description?: string;
};

/**
 * Inverted call-to-action band shared by the content pages. Mirrors the
 * homepage's host-guarantee panel (`bg-foreground text-background`) so the
 * accent moment stays consistent site-wide.
 */
export function CtaPanel({ heading, description }: CtaPanelProps) {
  return (
    <section className="px-4 pb-16 sm:px-6 sm:pb-24">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 rounded-3xl bg-foreground px-6 py-14 text-background sm:px-10 sm:flex-row sm:items-end sm:justify-between lg:px-14 lg:py-16">
        <div className="max-w-2xl">
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            {heading}
          </h2>
          {description && (
            <p className="mt-3 text-background/70">{description}</p>
          )}
        </div>
        <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
          <Button nativeButton={false} render={<Link href="/studios" />}>
            Explore Studios
          </Button>
          {/* Explicit colors: the default outline variant inherits the page's
              dark-theme tokens, which would be invisible on this light panel. */}
          <Button
            variant="outline"
            nativeButton={false}
            className="text-foreground dark:bg-background dark:text-foreground"
            render={<Link href="/add-studio" />}
          >
            Host Your Space
          </Button>
        </div>
      </div>
    </section>
  );
}

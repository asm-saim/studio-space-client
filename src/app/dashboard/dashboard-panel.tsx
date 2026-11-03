import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CloudOff, type LucideIcon } from "lucide-react";

type DashboardPanelProps = {
  id: string;
  title: string;
  href: string;
  children: ReactNode;
};

export function DashboardPanel({ id, title, href, children }: DashboardPanelProps) {
  return (
    <section aria-labelledby={id} className="min-w-0 rounded-2xl border bg-card p-5 sm:p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 id={id} className="font-heading text-lg font-semibold">
          {title}
        </h2>
        <Link
          href={href}
          aria-label={`View all: ${title}`}
          className="inline-flex items-center gap-1 rounded-md text-sm font-medium text-primary outline-none hover:underline focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          View All
          <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
      </div>
      {children}
    </section>
  );
}

type PanelEmptyProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  children?: ReactNode;
};

/** Compact empty state that fits inside a panel. */
export function PanelEmpty({ icon: Icon, title, description, children }: PanelEmptyProps) {
  return (
    <div className="flex flex-col items-center rounded-xl border border-dashed px-4 py-8 text-center">
      <Icon aria-hidden="true" className="size-6 text-muted-foreground" />
      <p className="mt-3 font-medium">{title}</p>
      <p className="mt-1 max-w-xs text-sm text-muted-foreground">{description}</p>
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
}

export function PanelError() {
  return <PanelEmpty icon={CloudOff} title="We couldn't load this section" description="Please refresh the page in a moment." />;
}

export function StudioThumb({ src }: { src: string }) {
  return (
    <div className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-muted">
      {src && <Image src={src} alt="" fill sizes="56px" className="object-cover" />}
    </div>
  );
}
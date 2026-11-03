import Link from "next/link";
import { ArrowUpRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const TONES = {
  primary: "bg-primary/10 text-primary",
  neutral: "bg-foreground/10 text-foreground",
  muted: "bg-muted text-muted-foreground",
} as const;

export type StatCardProps = {
  href: string;
  label: string;
  value: string | number;
  hint: string;
  icon: LucideIcon;
  tone?: keyof typeof TONES;
  /** Draws attention to the card (for example when something needs a reply). */
  highlight?: boolean;
};

export function StatCard({ href, label, value, hint, icon: Icon, tone = "neutral", highlight = false }: StatCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex flex-col gap-4 rounded-2xl border bg-card p-5 transition duration-200 outline-none hover:-translate-y-0.5 hover:border-primary hover:shadow-sm focus-visible:ring-3 focus-visible:ring-ring/50 motion-reduce:transition-none motion-reduce:hover:translate-y-0",
        highlight && "border-primary/50"
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-medium text-muted-foreground">{label}</span>
        <span className={cn("flex size-10 items-center justify-center rounded-xl", TONES[tone])}>
          <Icon aria-hidden="true" className="size-5" />
        </span>
      </div>
      <div>
        <p className="font-heading text-3xl font-bold tracking-tight">{value}</p>
        <p className="mt-1 flex items-center justify-between gap-2 text-sm text-muted-foreground">
          {hint}
          <ArrowUpRight aria-hidden="true" className="size-4 shrink-0 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100" />
        </p>
      </div>
    </Link>
  );
}
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

/** Inline spinner for buttons and small async states. */
export function Spinner({ className }: { className?: string }) {
  return <Loader2 aria-hidden="true" className={cn("animate-spin motion-reduce:animate-none", className)} />;
}
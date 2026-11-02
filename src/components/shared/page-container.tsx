import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type PageContainerProps = {
  title?: string;
  description?: string;
  action?: ReactNode;
  narrow?: boolean;
  /** Center the title/description block (skips the `action` row). */
  centered?: boolean;
  children: ReactNode;
};

export function PageContainer({ title, description, action, narrow, centered, children }: PageContainerProps) {
  return (
    <div className={cn("mx-auto w-full px-6 py-10 sm:px-8 sm:py-14 lg:px-12", narrow ? "max-w-3xl" : "max-w-7xl")}>
      {title &&
        (centered ? (
          <div className="mb-8 text-center">
            <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
            {description && (
              <p className="mx-auto mt-2 max-w-2xl text-muted-foreground">{description}</p>
            )}
          </div>
        ) : (
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
              {description && <p className="mt-2 text-muted-foreground">{description}</p>}
            </div>
            {action}
          </div>
        ))}
      {children}
    </div>
  );
}
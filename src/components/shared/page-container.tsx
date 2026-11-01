import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type PageContainerProps = {
  title?: string;
  description?: string;
  action?: ReactNode;
  narrow?: boolean;
  children: ReactNode;
};

export function PageContainer({ title, description, action, narrow, children }: PageContainerProps) {
  return (
    <div className={cn("mx-auto w-full px-6 py-10 sm:px-8 sm:py-14 lg:px-12", narrow ? "max-w-3xl" : "max-w-7xl")}>
      {title && (
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
            {description && <p className="mt-2 text-muted-foreground">{description}</p>}
          </div>
          {action}
        </div>
      )}
      {children}
    </div>
  );
}
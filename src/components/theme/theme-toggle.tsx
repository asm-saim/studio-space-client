"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme/use-theme";
import { Button } from "@/components/ui/button";

export function ThemeToggle({ className }: { className?: string }) {
  const { toggleTheme } = useTheme();

  return (
    <Button type="button" variant="ghost" size="icon" aria-label="Toggle light and dark theme" title="Toggle theme" onClick={toggleTheme} className={className}>
      {/* Icons are swapped with CSS, so the right one shows before React hydrates. */}
      <Sun aria-hidden="true" className="hidden dark:block" />
      <Moon aria-hidden="true" className="dark:hidden" />
    </Button>
  );
}
"use client";

import { Toaster } from "sonner";
import { useTheme } from "@/components/theme/use-theme";

/** Replaces the root layout's pinned dark Toaster: toasts follow the active theme. */
export function ThemedToaster() {
  const { theme } = useTheme();
  return <Toaster richColors closeButton position="top-right" theme={theme} />;
}
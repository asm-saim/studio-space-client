"use client";

import * as React from "react";

export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "studiospace-theme";

// The <html> class is the single source of truth, so every consumer stays in sync.
function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => observer.disconnect();
}

const getSnapshot = (): Theme => (document.documentElement.classList.contains("dark") ? "dark" : "light");
const getServerSnapshot = (): Theme => "dark"; // the app's default theme

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme; // native inputs, date pickers and scrollbars follow too
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Storage can be blocked; the theme still applies for this visit.
  }
}

export function useTheme() {
  const theme = React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const setTheme = React.useCallback((next: Theme) => applyTheme(next), []);
  const toggleTheme = React.useCallback(() => applyTheme(getSnapshot() === "dark" ? "light" : "dark"), []);
  return { theme, setTheme, toggleTheme };
}
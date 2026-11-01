/** Only allow same-site relative paths, so ?redirect= can't send users off-site. */
export function getSafeRedirect(raw: string | null | undefined): string {
  if (!raw || !raw.startsWith("/") || raw.startsWith("//") || raw.startsWith("/\\")) return "/";
  return raw;
}

export function withRedirect(path: string, redirectTo: string): string {
  return redirectTo === "/" ? path : `${path}?redirect=${encodeURIComponent(redirectTo)}`;
}
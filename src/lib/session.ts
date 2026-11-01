import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export type SessionUser = {
  name: string;
  email: string;
  image?: string;
};

/**
 * Reads the BetterAuth session from the HTTPOnly cookie.
 * Reads request headers, so call it inside a <Suspense> boundary
 * (required by cacheComponents).
 */
export async function getSessionUser(): Promise<SessionUser | null> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return null;
  return {
    name: session.user.name,
    email: session.user.email,
    image: session.user.image ?? undefined,
  };
}

/** For private pages: send logged-out visitors to /login and bring them back after. */
export async function requireUser(redirectTo: string): Promise<SessionUser> {
  const user = await getSessionUser();
  if (!user) redirect(`/login?redirect=${encodeURIComponent(redirectTo)}`);
  return user;
}
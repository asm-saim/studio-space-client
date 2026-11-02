import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { JWT_COOKIE, cookieOptions, signToken } from "@/lib/jwt";
import { getSafeRedirect } from "@/lib/safe-redirect";

async function currentUser(request: Request) {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session) return null;
  return { name: session.user.name, email: session.user.email, image: session.user.image ?? undefined };
}

// POST: issue/refresh the JWT cookie from a valid BetterAuth login session.
export async function POST(request: Request) {
  const user = await currentUser(request);
  if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const response = NextResponse.json({ ok: true });
  response.cookies.set(JWT_COOKIE, await signToken(user), cookieOptions);
  return response;
}

// GET ?redirect=/path: used as the Google callbackURL. Issues the cookie, then redirects.
export async function GET(request: Request) {
  const url = new URL(request.url);
  const target = getSafeRedirect(url.searchParams.get("redirect"));

  const user = await currentUser(request);
  if (!user) {
    return NextResponse.redirect(new URL(`/login?redirect=${encodeURIComponent(target)}`, url));
  }

  const response = NextResponse.redirect(new URL(target, url));
  response.cookies.set(JWT_COOKIE, await signToken(user), cookieOptions);
  return response;
}

// DELETE: log out of the JWT cookie.
export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(JWT_COOKIE, "", { ...cookieOptions, maxAge: 0 });
  return response;
}
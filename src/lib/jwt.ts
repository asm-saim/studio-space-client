import { SignJWT, jwtVerify } from "jose";

export const JWT_COOKIE = "studiospace_jwt";
const JWT_TTL_SECONDS = 60 * 60; // 1 hour; refreshed from the login session via POST /api/session
const ISSUER = "studiospace";

export type TokenUser = {
  name: string;
  email: string;
  image?: string;
};

function secret() {
  const value = process.env.JWT_SECRET;
  if (!value) throw new Error("Missing JWT_SECRET in .env.local");
  return new TextEncoder().encode(value);
}

export async function signToken(user: TokenUser): Promise<string> {
  return new SignJWT({ name: user.name, image: user.image })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(user.email)
    .setIssuer(ISSUER)
    .setIssuedAt()
    .setExpirationTime(`${JWT_TTL_SECONDS}s`)
    .sign(secret());
}

/** Returns the user inside a valid, unexpired token, or null. */
export async function verifyToken(token: string): Promise<TokenUser | null> {
  try {
    const { payload } = await jwtVerify(token, secret(), { algorithms: ["HS256"], issuer: ISSUER });
    if (!payload.sub) return null;
    return {
      email: payload.sub,
      name: typeof payload.name === "string" ? payload.name : "",
      image: typeof payload.image === "string" ? payload.image : undefined,
    };
  } catch {
    return null;
  }
}

/** HttpOnly: JavaScript can't read it. SameSite=Lax: not sent on cross-site POSTs. */
export const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: JWT_TTL_SECONDS,
};
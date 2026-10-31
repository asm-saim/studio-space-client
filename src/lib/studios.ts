import { cacheLife, cacheTag } from "next/cache";

const API_URL = process.env.API_URL ?? "http://localhost:5000";

export type StudioSummary = {
  id: string;
  slug?: string;
  title: string;
  category: string;
  image: string;
  hourlyRate: number;
  rating: number;
  location: string;
};

/**
 * Top 6 studios from the Express API (highest rated first).
 * Cached for a few minutes; call revalidateTag("studios") after a studio is
 * created/updated to refresh it sooner. Errors are thrown on purpose so a
 * failed request is never cached as an empty list.
 */
export async function getFeaturedStudios(): Promise<StudioSummary[]> {
  "use cache";
  cacheLife("minutes");
  cacheTag("studios");

  const res = await fetch(`${API_URL}/studios?sort=rating&limit=6`);
  if (!res.ok) throw new Error(`Studios API responded ${res.status}`);
  return res.json();
}

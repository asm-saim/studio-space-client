import { cacheLife, cacheTag } from "next/cache";
import { ApiError, apiRequest } from "./api";


export type StudioSummary = {
  id: string;
  title: string;
  category: string;
  image: string;
  hourlyRate: number;
  rating: number;
  reviewCount: number;
  location: string;
};

export type Review = {
  author: string;
  rating: number;
  comment: string;
  createdAt?: string;
};

export type Studio = StudioSummary & {
  images: string[];
  securityDeposit: number;
  maxCapacity: number;
  amenities: string[];
  overview: string;
  ownerName: string;
  ownerEmail: string;
  ownerImage?: string;
  reviews: Review[];
  createdAt?: string;
};

/** What the add/edit form sends. `images` are the extra gallery photos after the cover. */
export type StudioInput = {
  title: string;
  category: string;
  hourlyRate: number;
  securityDeposit: number;
  maxCapacity: number;
  location: string;
  image: string;
  images: string[];
  amenities: string[];
  overview: string;
};

// Cached reads. Mutations call updateTag("studios") to refresh them immediately.
// Errors are thrown on purpose so a failed request is never cached.

export async function getFeaturedStudios(): Promise<StudioSummary[]> {
  "use cache";
  cacheLife("minutes");
  cacheTag("studios");
  return apiRequest<StudioSummary[]>("/studios?sort=rating&limit=6");
}

export async function getStudios(filters: { category: string; q: string }): Promise<StudioSummary[]> {
  "use cache";
  cacheLife("minutes");
  cacheTag("studios");
  const params = new URLSearchParams({ sort: "rating" });
  if (filters.category) params.set("category", filters.category);
  if (filters.q) params.set("q", filters.q);
  return apiRequest<StudioSummary[]>(`/studios?${params}`);
}

export async function getStudio(id: string): Promise<Studio | null> {
  "use cache";
  cacheLife("minutes");
  cacheTag("studios");
  try {
    return await apiRequest<Studio>(`/studios/${encodeURIComponent(id)}`);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) return null;
    throw error;
  }
}
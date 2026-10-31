import { Camera, Clapperboard, Mic, Music, Palette, type LucideIcon } from "lucide-react";

export type StudioCategory = {
  slug: string; // stored in MongoDB `category` and used in /studios?category=
  label: string;
  description: string;
  icon: LucideIcon;
};

export const STUDIO_CATEGORIES: StudioCategory[] = [
  {
    slug: "photo-studios",
    label: "Photo Studios",
    description: "Cycloramas, natural light, and styled sets",
    icon: Camera,
  },
  {
    slug: "sound-stages",
    label: "Sound Stages",
    description: "Large, soundproofed floors for film and video",
    icon: Clapperboard,
  },
  {
    slug: "podcast-rooms",
    label: "Podcast Rooms",
    description: "Treated rooms with mics and monitors ready",
    icon: Mic,
  },
  { slug: "music-suites", label: "Music Suites", description: "Rehearsal rooms and recording suites", icon: Music },
  {
    slug: "art-workshops",
    label: "Art Workshops",
    description: "Open workspaces for making and teaching",
    icon: Palette,
  },
];

export function getCategoryLabel(slug: string) {
  return STUDIO_CATEGORIES.find((c) => c.slug === slug)?.label ?? slug;
}

export function categoryHref(slug: string) {
  return `/studios?category=${encodeURIComponent(slug)}`;
}

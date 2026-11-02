import { BadgeCheck, Headset, ShieldCheck, Wrench, type LucideIcon } from "lucide-react";

/**
 * Single source of truth for the booking guarantees — shared by the homepage
 * host-guarantee section and the About page's "What every booking includes"
 * section so the promises can never drift between the two.
 *
 * Adjust the wording to match your real policies before launch.
 */
export type Guarantee = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export const GUARANTEES: readonly Guarantee[] = [
  {
    icon: ShieldCheck,
    title: "Liability protection",
    description:
      "Accidental damage during a booking is covered, so hosts and creators are both protected.",
  },
  {
    icon: BadgeCheck,
    title: "Verified profiles",
    description: "Hosts and creators are identity-checked before their first booking.",
  },
  {
    icon: Wrench,
    title: "Equipment safety",
    description:
      "Gear is listed up front and kept in working order, so you know what is in the room.",
  },
  {
    icon: Headset,
    title: "24/7 host support",
    description:
      "If something goes wrong mid-session, a real person is available at any hour.",
  },
];

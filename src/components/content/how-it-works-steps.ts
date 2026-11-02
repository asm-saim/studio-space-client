import { CalendarClock, Clapperboard, CreditCard, Search, type LucideIcon } from "lucide-react";

/**
 * Single source of truth for the "how booking works" steps — shared by the
 * homepage section (components/home/how-it-works.tsx) and the /how-it-works
 * page so the copy can never drift between the two.
 */
export type HowItWorksStep = {
  title: string;
  description: string;
  /** Decorative step icon (used by the /how-it-works page only). */
  icon: LucideIcon;
};

export const HOW_IT_WORKS_STEPS: readonly HowItWorksStep[] = [
  {
    title: "Discover spaces",
    description: "Search by category, location, and price to find a studio that fits your shoot.",
    icon: Search,
  },
  {
    title: "Select shoot hours",
    description: "Pick your date and the hours you need. The total updates as you choose.",
    icon: CalendarClock,
  },
  {
    title: "Book instantly",
    description: "Confirm and pay online. Your booking is secured right away.",
    icon: CreditCard,
  },
  {
    title: "Create & produce",
    description: "Arrive, set up, and get to work. The space is yours for the hours you booked.",
    icon: Clapperboard,
  },
];

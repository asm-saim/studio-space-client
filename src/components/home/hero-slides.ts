/**
 * Typed slide configuration for the landing-page hero slider.
 * Keep copy here — the HeroSlider component stays presentation-only.
 */

export type HeroSlideCta = {
  label: string
  href: string
}

export type HeroSlide = {
  id: string
  /** Path under /public — extensions verified as .jpg */
  image: string
  imageAlt: string
  headline: string
  description: string
  primaryCta: HeroSlideCta
  secondaryCta: HeroSlideCta
}

/**
 * Shared CTAs — defined once so a target change (like the host flow) can
 * never half-land across the slides.
 */
const EXPLORE_CTA: HeroSlideCta = { label: "Explore Studios", href: "/studios" }
const HOST_CTA: HeroSlideCta = { label: "Host Your Space", href: "/add-studio" }

export const HERO_SLIDES: readonly HeroSlide[] = [
  {
    id: "photo-studios",
    image: "/banner-img/pic1.jpg",
    imageAlt:
      "Photographer adjusting lighting on a set inside a professional photo studio",
    headline: "Chase the Perfect Light",
    description:
      "Book photo studios by the hour — cyc walls, strobes, and grip gear ready when your shoot is.",
    primaryCta: EXPLORE_CTA,
    secondaryCta: HOST_CTA,
  },
  {
    id: "creative-workspaces",
    image: "/banner-img/pic2.jpg",
    imageAlt:
      "Bright creative workspace set up for a design and production team",
    headline: "Where Ideas Take Shape",
    description:
      "Art workshops and creative workspaces with room to think, make, and mess up — priced by the hour.",
    primaryCta: EXPLORE_CTA,
    secondaryCta: HOST_CTA,
  },
  {
    id: "podcast-studios",
    image: "/banner-img/pic3.jpg",
    imageAlt:
      "Two hosts recording a podcast around broadcast microphones in an acoustically treated room",
    headline: "Press Record. Sound Brilliant.",
    description:
      "Acoustically treated podcast lounges with broadcast-quality mics. Roll in, plug in, hit record.",
    primaryCta: EXPLORE_CTA,
    secondaryCta: HOST_CTA,
  },
  {
    id: "event-spaces",
    image: "/banner-img/pic4.jpg",
    imageAlt:
      "Guests gathering in a styled event space prepared for a launch party",
    headline: "Host Events That Wow",
    description:
      "Launches, pop-ups, and showcases in distinctive spaces — transparent hourly rates, zero surprise fees.",
    primaryCta: EXPLORE_CTA,
    secondaryCta: HOST_CTA,
  },
  {
    id: "production-stages",
    image: "/banner-img/pic5.jpg",
    imageAlt:
      "Film crew recording a scene under studio lights on a production stage",
    headline: "Lights. Camera. Roll.",
    description:
      "Cinema sound stages and production suites with the power, clearance, and space your crew needs.",
    primaryCta: EXPLORE_CTA,
    secondaryCta: HOST_CTA,
  },
]

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

export const HERO_SLIDES: readonly HeroSlide[] = [
  {
    id: "photo-studios",
    image: "/banner-img/pic1.jpg",
    imageAlt:
      "Photographer adjusting lighting on a set inside a professional photo studio",
    headline: "Chase the Perfect Light",
    description:
      "Book photo studios by the hour — cyc walls, strobes, and grip gear ready when your shoot is.",
    primaryCta: { label: "Explore Studios", href: "/studios" },
    secondaryCta: { label: "Host Your Space", href: "/studios" },
  },
  {
    id: "creative-workspaces",
    image: "/banner-img/pic2.jpg",
    imageAlt:
      "Bright creative workspace set up for a design and production team",
    headline: "Where Ideas Take Shape",
    description:
      "Art workshops and creative workspaces with room to think, make, and mess up — priced by the hour.",
    primaryCta: { label: "Explore Studios", href: "/studios" },
    secondaryCta: { label: "Host Your Space", href: "/studios" },
  },
  {
    id: "podcast-studios",
    image: "/banner-img/pic3.jpg",
    imageAlt:
      "Two hosts recording a podcast around broadcast microphones in an acoustically treated room",
    headline: "Press Record. Sound Brilliant.",
    description:
      "Acoustically treated podcast lounges with broadcast-quality mics. Roll in, plug in, hit record.",
    primaryCta: { label: "Explore Studios", href: "/studios" },
    secondaryCta: { label: "Host Your Space", href: "/studios" },
  },
  {
    id: "event-spaces",
    image: "/banner-img/pic4.jpg",
    imageAlt:
      "Guests gathering in a styled event space prepared for a launch party",
    headline: "Host Events That Wow",
    description:
      "Launches, pop-ups, and showcases in distinctive spaces — transparent hourly rates, zero surprise fees.",
    primaryCta: { label: "Explore Studios", href: "/studios" },
    secondaryCta: { label: "Host Your Space", href: "/studios" },
  },
  {
    id: "production-stages",
    image: "/banner-img/pic5.jpg",
    imageAlt:
      "Film crew recording a scene under studio lights on a production stage",
    headline: "Lights. Camera. Roll.",
    description:
      "Cinema sound stages and production suites with the power, clearance, and space your crew needs.",
    primaryCta: { label: "Explore Studios", href: "/studios" },
    secondaryCta: { label: "Host Your Space", href: "/studios" },
  },
]

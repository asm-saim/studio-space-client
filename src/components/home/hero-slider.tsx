"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { A11y, Autoplay, EffectFade, Keyboard, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/effect-fade"
import { Button } from "@/components/ui/button"
import { HERO_SLIDES } from "@/components/home/hero-slides"
import "@/components/home/hero-slider.css"

/**
 * Full-viewport banner slider for the landing page.
 * The root layout positions the navbar over this section on "/", so
 * Navbar + Hero together fill exactly one viewport (100svh).
 */
export function HeroSlider() {
  const [reducedMotion, setReducedMotion] = React.useState(false)

  React.useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => setReducedMotion(query.matches)
    update()
    query.addEventListener("change", update)
    return () => query.removeEventListener("change", update)
  }, [])

  return (
    <section
      aria-label="Featured studios"
      className="relative h-[100svh] min-h-[600px] w-full overflow-hidden bg-black"
    >
      <Swiper
        modules={[Autoplay, Pagination, Navigation, Keyboard, A11y, EffectFade]}
        effect="fade"
        speed={reducedMotion ? 0 : 800}
        autoplay={
          reducedMotion
            ? false
            : {
                delay: 5000,
                pauseOnMouseEnter: true,
                disableOnInteraction: false,
              }
        }
        loop
        keyboard={{ enabled: true }}
        pagination={{ clickable: true }}
        navigation={{ prevEl: ".hero-nav-prev", nextEl: ".hero-nav-next" }}
        a11y={{ enabled: true }}
        className="h-full w-full hero-slider"
      >
        {HERO_SLIDES.map((slide, index) => {
          const Heading = index === 0 ? "h1" : "h2"
          return (
            <SwiperSlide key={slide.id}>
              <Image
                src={slide.image}
                alt={slide.imageAlt}
                fill
                sizes="100vw"
                priority={index === 0}
                className="object-cover hero-slide-image"
              />
              {/* Readability: left-to-right wash behind the copy… */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-black/10"
              />
              {/* …and a top band so the transparent navbar stays legible. */}
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/55 to-transparent"
              />
              <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl items-center px-4 pt-16 sm:px-6 lg:px-8">
                <div className="max-w-2xl">
                  <Heading className="font-heading text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                    {slide.headline}
                  </Heading>
                  <p className="mt-5 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
                    {slide.description}
                  </p>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <Button
                      size="lg"
                      nativeButton={false}
                      className="h-11 px-7 text-base"
                      render={<Link href={slide.primaryCta.href} />}
                    >
                      {slide.primaryCta.label}
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      nativeButton={false}
                      className="h-11 border-white/60 bg-transparent px-7 text-base text-white hover:border-white hover:bg-white/10 hover:text-white dark:border-white/60 dark:bg-transparent dark:hover:border-white dark:hover:bg-white/10 dark:hover:text-white"
                      render={<Link href={slide.secondaryCta.href} />}
                    >
                      {slide.secondaryCta.label}
                    </Button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>

      {/* Keyboard-accessible prev/next controls (wired via selectors so
          they exist before Swiper initializes). */}
      <Button
        variant="ghost"
        size="icon"
        aria-label="Previous slide"
        className="hero-nav-prev absolute top-1/2 left-3 z-20 size-11 -translate-y-1/2 rounded-full border border-white/25 bg-black/30 text-white backdrop-blur-md hover:bg-black/55 hover:text-white sm:left-6 md:size-12"
      >
        <ChevronLeft aria-hidden="true" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        aria-label="Next slide"
        className="hero-nav-next absolute top-1/2 right-3 z-20 size-11 -translate-y-1/2 rounded-full border border-white/25 bg-black/30 text-white backdrop-blur-md hover:bg-black/55 hover:text-white sm:right-6 md:size-12"
      >
        <ChevronRight aria-hidden="true" />
      </Button>
    </section>
  )
}

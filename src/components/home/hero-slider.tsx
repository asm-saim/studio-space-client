"use client";
import type { Swiper as SwiperClass } from "swiper";
import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { A11y, Autoplay, EffectFade, Keyboard, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Button } from "@/components/ui/button";
import { HERO_SLIDES } from "@/components/home/hero-slides";
import "@/components/home/hero-slider.css";

export function HeroSlider() {
  const [reducedMotion, setReducedMotion] = React.useState(false);
  const [swiper, setSwiper] = React.useState<SwiperClass | null>(null);

  React.useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return (
    <section aria-label="Featured studios" className="relative h-svh w-full overflow-hidden bg-black">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, Keyboard, A11y, EffectFade]}
        effect="fade"
        speed={reducedMotion ? 0 : 800}
        autoplay={reducedMotion ? false : { delay: 5000, pauseOnMouseEnter: true, disableOnInteraction: false }}
        loop
        keyboard={{ enabled: true }}
        pagination={{ clickable: true }}
        onSwiper={setSwiper}
        className="hero-slider h-full w-full [--swiper-pagination-bottom:1.75rem] md:[--swiper-pagination-bottom:0.5rem]"
      >
        {HERO_SLIDES.map((slide, index) => {
          const Heading = index === 0 ? "h1" : "h2";
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

              {/* Mobile: even dark overlay (text spans the full width).
                  md+: left-to-right wash, same as before. */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-black/70 md:bg-transparent md:bg-gradient-to-r md:from-black/95 md:via-black/70 md:to-black/30"
              />

              {/* Darker navbar area */}
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/75 to-transparent"
              />

              <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl items-center px-5 pt-20 pb-24 sm:px-8 md:pb-0 lg:px-12">
                <div className="max-w-xl">
                  <Heading className="font-heading text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                    {slide.headline}
                  </Heading>
                  <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/85 sm:mt-5 sm:text-base md:text-lg">
                    {slide.description}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3 sm:mt-8">
                    <Button
                      size="lg"
                      nativeButton={false}
                      className="h-11 px-5 text-sm sm:px-7 sm:text-base"
                      render={<Link href={slide.primaryCta.href} />}
                    >
                      {slide.primaryCta.label}
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      nativeButton={false}
                      className="h-11 border-white/60 bg-transparent px-5 text-sm text-white hover:border-white hover:bg-white/10 hover:text-white sm:px-7 sm:text-base dark:border-white/60 dark:bg-transparent dark:hover:border-white dark:hover:bg-white/10 dark:hover:text-white"
                      render={<Link href={slide.secondaryCta.href} />}
                    >
                      {slide.secondaryCta.label}
                    </Button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* One overlay for both arrows:
          mobile  -> grouped at the bottom-right, out of the text's way
          md+     -> split to the left/right edges, vertically centered */}
      <div className="pointer-events-none absolute inset-0 z-20 flex items-end justify-end gap-2 p-3 md:items-center md:justify-between md:px-6 md:py-0">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Previous slide"
          onClick={() => swiper?.slidePrev()}
          className="pointer-events-auto hero-nav-prev size-10 rounded-full border border-white/25 bg-black/30 text-white backdrop-blur-md hover:bg-black/55 hover:text-white md:size-12"
        >
          <ChevronLeft aria-hidden="true" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Next slide"
          onClick={() => swiper?.slideNext()}
          className="pointer-events-auto hero-nav-next size-10 rounded-full border border-white/25 bg-black/30 text-white backdrop-blur-md hover:bg-black/55 hover:text-white md:size-12"
        >
          <ChevronRight aria-hidden="true" />
        </Button>
      </div>
    </section>
  );
}

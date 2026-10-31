import { Suspense } from "react"
import { HeroSlider } from "@/components/home/hero-slider"

/**
 * The slider sits behind a Suspense boundary: swiper's modules read
 * `new Date()` at module scope, which Next 16's Cache Components prerender
 * rejects if evaluated while building the static shell. The fallback has the
 * exact hero dimensions, so there is no layout shift when it streams in.
 */
export default function Home() {
  return (
    <Suspense
      fallback={
        <div
          aria-hidden="true"
          className="h-[100svh] min-h-[600px] w-full bg-black"
        />
      }
    >
      <HeroSlider />
    </Suspense>
  )
}

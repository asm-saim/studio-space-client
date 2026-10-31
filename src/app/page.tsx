import { Suspense } from "react";
import { HeroSlider } from "@/components/home/hero-slider";
import { FeaturedStudios } from "@/components/home/featured-studios";
import { CategoryBrowse } from "@/components/home/category-browse";
import { HowItWorks } from "@/components/home/how-it-works";
import { HostGuarantee } from "@/components/home/host-guarantee";

export default function HomePage() {
  return (
    <>
      {/* Keep your existing Suspense + fallback for the hero if it differs. */}
      <Suspense fallback={<div className="h-svh w-full bg-black" />}>
        <HeroSlider />
      </Suspense>
      <FeaturedStudios />
      <CategoryBrowse />
      <HowItWorks />
      <HostGuarantee />
    </>
  );
}

"use client";

import * as React from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function StudioGallery({ images, title }: { images: string[]; title: string }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: images.length > 1 });
  const [selected, setSelected] = React.useState(0);

  React.useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  if (images.length === 0) {
    return <div className="aspect-[16/10] rounded-2xl bg-muted" />;
  }

  const many = images.length > 1;

  return (
    <div className="space-y-3">
      <div className="relative" role="region" aria-roledescription="carousel" aria-label={`${title} photos`}>
        <div className="overflow-hidden rounded-2xl bg-muted" ref={emblaRef}>
          <div className="flex">
            {images.map((src, index) => (
              <div key={src + index} className="relative aspect-[16/10] min-w-0 shrink-0 grow-0 basis-full">
                <Image
                  src={src}
                  alt={`${title}, photo ${index + 1} of ${images.length}`}
                  fill
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  priority={index === 0}
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {many && (
          <>
            <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
              <Button type="button" variant="ghost" size="icon" aria-label="Previous photo" onClick={() => emblaApi?.scrollPrev()} className="pointer-events-auto size-10 rounded-full border border-white/25 bg-black/40 text-white backdrop-blur-md hover:bg-black/60 hover:text-white">
                <ChevronLeft aria-hidden="true" />
              </Button>
            </div>
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
              <Button type="button" variant="ghost" size="icon" aria-label="Next photo" onClick={() => emblaApi?.scrollNext()} className="pointer-events-auto size-10 rounded-full border border-white/25 bg-black/40 text-white backdrop-blur-md hover:bg-black/60 hover:text-white">
                <ChevronRight aria-hidden="true" />
              </Button>
            </div>
            <span className="absolute right-3 bottom-3 rounded-full bg-black/60 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
              {selected + 1} / {images.length}
            </span>
          </>
        )}
      </div>

      {many && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((src, index) => (
            <button
              key={src + index}
              type="button"
              aria-label={`Show photo ${index + 1}`}
              aria-current={index === selected}
              onClick={() => emblaApi?.scrollTo(index)}
              className={cn(
                "relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border-2 transition-opacity outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                index === selected ? "border-primary" : "border-transparent opacity-70 hover:opacity-100"
              )}
            >
              <Image src={src} alt="" fill sizes="96px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
import Image from "next/image";
import Link from "next/link";
import { MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StudioSummary } from "@/lib/studios";
import { getCategoryLabel } from "./categories";


export function StudioCard({ studio }: { studio: StudioSummary }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border bg-card text-card-foreground">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        {studio.image && (
          <Image
            src={studio.image}
            alt={studio.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
        <span className="absolute top-3 left-3 rounded-full bg-black/65 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
          {getCategoryLabel(studio.category)}
        </span>
        {studio.rating > 0 && (
          <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-black/65 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
            <Star aria-hidden="true" className="size-3.5 fill-amber-400 text-amber-400" />
            <span className="sr-only">Rated</span>
            {studio.rating.toFixed(1)}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="space-y-1.5">
          <h3 className="font-heading line-clamp-1 text-lg font-semibold tracking-tight">{studio.title}</h3>
          {studio.location && (
            <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin aria-hidden="true" className="size-4 shrink-0" />
              <span className="line-clamp-1">{studio.location}</span>
            </p>
          )}
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 pt-2">
          <p className="text-lg font-semibold">
            ${studio.hourlyRate}
            <span className="text-sm font-normal text-muted-foreground"> / hr</span>
          </p>
          <Button
            variant="outline"
            nativeButton={false}
            render={<Link href={`/studios/${studio.slug ?? studio.id}`} />}
          >
            View Details
          </Button>
        </div>
      </div>
    </article>
  );
}
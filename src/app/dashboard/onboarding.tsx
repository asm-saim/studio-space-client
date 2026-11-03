import Link from "next/link";
import { Building2, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";

/** Shown to users who have no studios and no bookings yet. */
export function DashboardOnboarding() {
  return (
    <section aria-labelledby="onboarding-heading" className="space-y-4">
      <div>
        <h2 id="onboarding-heading" className="font-heading text-xl font-semibold">
          Where would you like to start?
        </h2>
        <p className="mt-1 text-muted-foreground">Your studios, bookings and requests will appear here as soon as you have some.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col items-start rounded-2xl border bg-card p-6">
          <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Building2 aria-hidden="true" className="size-5" />
          </span>
          <h3 className="font-heading mt-4 text-lg font-semibold">Host a studio</h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
            Share your space with photographers, podcasters, musicians, and makers, and manage booking requests right here.
          </p>
          <Button className="mt-5" nativeButton={false} render={<Link href="/add-studio" />}>
            Add Your First Studio
          </Button>
        </div>

        <div className="flex flex-col items-start rounded-2xl border bg-card p-6">
          <span className="flex size-11 items-center justify-center rounded-xl bg-foreground/10 text-foreground">
            <Camera aria-hidden="true" className="size-5" />
          </span>
          <h3 className="font-heading mt-4 text-lg font-semibold">Book a space</h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
            Browse photo studios, sound stages, podcast rooms, and workshops, and book the hours you need.
          </p>
          <Button className="mt-5" variant="outline" nativeButton={false} render={<Link href="/studios" />}>
            Explore Studios
          </Button>
        </div>
      </div>
    </section>
  );
}
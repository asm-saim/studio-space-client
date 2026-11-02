import Link from "next/link";
import { Home } from "lucide-react";
import { StudioIllustration } from "@/components/shared/studio-illustration";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-xl flex-col items-center px-6 py-16 text-center sm:py-24">
      <StudioIllustration className="w-full max-w-sm" />
      <h1 className="font-heading mt-8 text-3xl font-bold tracking-tight sm:text-4xl">This scene is off the set</h1>
      <p className="mt-3 text-muted-foreground">
        We couldn&apos;t find the page you&apos; re looking for. It may have moved, or the studio may have been removed.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button size="lg" className="h-11" nativeButton={false} render={<Link href="/" />}>
          <Home aria-hidden="true" />
          Return to Home
        </Button>
        <Button size="lg" variant="outline" className="h-11" nativeButton={false} render={<Link href="/studios" />}>
          Explore studios
        </Button>
      </div>
    </div>
  );
}

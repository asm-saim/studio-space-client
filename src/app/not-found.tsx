import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-xl flex-col items-center px-6 py-24 text-center">
      <p className="font-heading text-6xl font-extrabold text-primary">404</p>
      <h1 className="font-heading mt-4 text-3xl font-bold tracking-tight">Page not found</h1>
      <p className="mt-3 text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist, or the studio may have been removed.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button nativeButton={false} render={<Link href="/" />}>
          Back to home
        </Button>
        <Button variant="outline" nativeButton={false} render={<Link href="/studios" />}>
          Explore studios
        </Button>
      </div>
    </div>
  );
}

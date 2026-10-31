import Link from "next/link";
import { categoryHref, STUDIO_CATEGORIES } from "./categories";


export function CategoryBrowse() {
  return (
    <section aria-labelledby="categories-heading" className="bg-muted/40 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="max-w-xl">
          <h2 id="categories-heading" className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Browse by category
          </h2>
          <p className="mt-3 text-muted-foreground">Start with the kind of space your project needs.</p>
        </div>

        <ul className="mt-10 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-5">
          {STUDIO_CATEGORIES.map(({ slug, label, description, icon: Icon }, i) => (
            <li key={slug} className={i === STUDIO_CATEGORIES.length - 1 ? "col-span-2 lg:col-span-1" : undefined}>
              <Link
                href={categoryHref(slug)}
                className="group flex h-full flex-col gap-4 rounded-2xl border bg-card p-5 transition-colors hover:border-primary focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
              >
                <span className="inline-flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon aria-hidden="true" className="size-5" />
                </span>
                <span>
                  <span className="font-heading block text-base font-semibold">{label}</span>
                  <span className="mt-1 block text-sm text-muted-foreground">{description}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
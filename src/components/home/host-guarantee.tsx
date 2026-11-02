import { GUARANTEES } from "@/components/content/guarantees";

export function HostGuarantee() {
  return (
    <section aria-labelledby="guarantee-heading" className="px-4 pb-16 sm:px-6 sm:pb-24">
      <div className="mx-auto max-w-7xl rounded-3xl bg-foreground px-6 py-14 text-background sm:px-10 lg:px-14 lg:py-16">
        <div className="max-w-2xl">
          <h2 id="guarantee-heading" className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Host guarantee and creator support
          </h2>
          <p className="mt-3 text-background/70">
            Book with confidence. Every session is backed by the same protections.
          </p>
        </div>

        <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {GUARANTEES.map(({ icon: Icon, title, description }) => (
            <li key={title}>
              <Icon aria-hidden="true" className="size-7" />
              <h3 className="font-heading mt-4 text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-background/70">{description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
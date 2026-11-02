import type { Metadata } from "next";
import { Handshake, Headset, Wallet, type LucideIcon } from "lucide-react";
import { CtaPanel } from "@/components/shared/cta-panel";
import { HOW_IT_WORKS_STEPS } from "@/components/content/how-it-works-steps";
import "@/components/content/content-pages.css";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "How booking a studio on StudioSpace works — four simple steps from discovery to production.",
};

/** Facts drawn from existing product copy (pricing, booking flow, support). */
const EXPECTATIONS: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Wallet,
    title: "Priced by the hour",
    description:
      "Every space lists an hourly rate with transparent pricing, so you book only the time you need.",
  },
  {
    icon: Handshake,
    title: "The host confirms first",
    description:
      "You won't be charged when you send a request — the host confirms your booking first.",
  },
  {
    icon: Headset,
    title: "Support around the clock",
    description:
      "If something goes wrong mid-session, a real person is available at any hour.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <header className="px-6 pt-14 text-center sm:px-8 sm:pt-20 lg:px-12">
        <div className="hero-enter mx-auto max-w-3xl">
          <p className="text-sm font-semibold tracking-widest text-primary uppercase">
            How it works
          </p>
          <h1 className="font-heading mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            From Discovery to Production
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            How booking a studio on StudioSpace works — four simple steps from
            discovery to production.
          </p>
        </div>
      </header>

      <section aria-labelledby="steps-heading" className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="max-w-xl">
            <h2
              id="steps-heading"
              className="font-heading text-3xl font-bold tracking-tight sm:text-4xl"
            >
              Four steps, start to finish
            </h2>
            <p className="mt-3 text-muted-foreground">
              From search to shoot day in four steps.
            </p>
          </div>

          {/* Vertical rail on mobile, connected timeline across the top on desktop. */}
          <ol className="mt-12 lg:grid lg:grid-cols-4 lg:gap-8">
            {HOW_IT_WORKS_STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <li
                  key={step.title}
                  className="relative border-l border-border/70 pb-10 pl-8 last:pb-0 lg:border-t lg:border-l-0 lg:pt-8 lg:pb-0 lg:pl-0"
                >
                  <span
                    aria-hidden="true"
                    className="absolute top-0 left-0 flex size-9 -translate-x-1/2 items-center justify-center rounded-full bg-primary font-heading text-sm font-bold text-primary-foreground ring-4 ring-background lg:-translate-y-1/2 lg:translate-x-0"
                  >
                    {i + 1}
                  </span>
                  <span
                    aria-hidden="true"
                    className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary"
                  >
                    <Icon className="size-6" />
                  </span>
                  <h3 className="font-heading mt-4 text-lg font-semibold">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section aria-labelledby="expect-heading" className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="max-w-xl">
            <h2
              id="expect-heading"
              className="font-heading text-3xl font-bold tracking-tight sm:text-4xl"
            >
              What to expect
            </h2>
            <p className="mt-3 text-muted-foreground">
              The essentials before your first booking.
            </p>
          </div>
          <ul className="mt-10 grid gap-6 sm:grid-cols-3">
            {EXPECTATIONS.map(({ icon: Icon, title, description }) => (
              <li
                key={title}
                className="rounded-2xl border bg-card p-6 transition-colors hover:border-primary/50"
              >
                <span
                  aria-hidden="true"
                  className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary"
                >
                  <Icon className="size-6" />
                </span>
                <h3 className="font-heading mt-4 text-base font-semibold">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaPanel
        heading="Ready when you are?"
        description="Search by category, location, and price, then book the hours you need."
      />
    </>
  );
}

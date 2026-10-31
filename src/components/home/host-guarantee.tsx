import { BadgeCheck, Headset, ShieldCheck, Wrench } from "lucide-react";

// Adjust the wording to match your real policies before launch.
const ASSURANCES = [
  { icon: ShieldCheck, title: "Liability protection", description: "Accidental damage during a booking is covered, so hosts and creators are both protected." },
  { icon: BadgeCheck, title: "Verified profiles", description: "Hosts and creators are identity-checked before their first booking." },
  { icon: Wrench, title: "Equipment safety", description: "Gear is listed up front and kept in working order, so you know what is in the room." },
  { icon: Headset, title: "24/7 host support", description: "If something goes wrong mid-session, a real person is available at any hour." },
];

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
          {ASSURANCES.map(({ icon: Icon, title, description }) => (
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
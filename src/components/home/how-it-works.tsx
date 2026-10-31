const STEPS = [
  { title: "Discover spaces", description: "Search by category, location, and price to find a studio that fits your shoot." },
  { title: "Select shoot hours", description: "Pick your date and the hours you need. The total updates as you choose." },
  { title: "Book instantly", description: "Confirm and pay online. Your booking is secured right away." },
  { title: "Create & produce", description: "Arrive, set up, and get to work. The space is yours for the hours you booked." },
];

export function HowItWorks() {
  return (
    <section aria-labelledby="how-heading" className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="max-w-xl">
          <h2 id="how-heading" className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            How booking works
          </h2>
          <p className="mt-3 text-muted-foreground">From search to shoot day in four steps.</p>
        </div>

        <ol className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {STEPS.map((step, i) => (
            <li key={step.title} className="border-t pt-6">
              <span className="font-heading flex size-10 items-center justify-center rounded-full bg-primary text-base font-bold text-primary-foreground">
                {i + 1}
              </span>
              <h3 className="font-heading mt-5 text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
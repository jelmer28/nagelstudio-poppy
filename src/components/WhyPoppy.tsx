"use client";

import { useReveal } from "@/lib/useReveal";

const VALUES = [
  { n: "01", title: "Hygiëne eerst", copy: "Gesteriliseerde, deels single-use instrumenten en een werkplek die na elke klant volledig wordt gereset." },
  { n: "02", title: "Eén vaste artiest", copy: "Je werkt telkens met dezelfde nagelartiest, die je nagelbed en voorkeuren al kent." },
  { n: "03", title: "Gebouwd om te blijven", copy: "Gel en BIAB die drie tot vier weken meegaan, zonder aan de basis in te leveren." },
  { n: "04", title: "Rust in de stoel", copy: "Afspraken van 60 tot 90 minuten, nooit dubbel geboekt, tijd is onderdeel van de behandeling." },
];

export default function WhyPoppy() {
  const scope = useReveal<HTMLElement>();
  return (
    <section ref={scope} className="bg-stone py-24">
      <div className="wrap">
        <div className="mb-4 flex flex-col gap-6 border-b border-line pb-10 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-lg" data-reveal>
            <div className="eyebrow mb-4">Waarom Poppy</div>
            <h2 className="font-serif text-4xl sm:text-5xl">
              Vier redenen die je pas voelt bij de tweede afspraak.
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-ink sm:text-right" data-reveal data-delay="120">
            Geen trucs en geen extra&apos;s die je niet nodig hebt. Alleen de basis, op een hoger niveau uitgevoerd.
          </p>
        </div>

        <div>
          {VALUES.map((v, i) => (
            <div
              key={v.n}
              data-reveal
              data-delay={i * 90}
              className="grid grid-cols-[3rem_1fr] items-baseline gap-x-4 gap-y-3 border-t border-line py-8 last:border-b sm:grid-cols-[4.5rem_16rem_1fr] sm:items-start sm:gap-x-8"
            >
              <span className="font-serif text-lg italic text-poppy">{v.n}</span>
              <h3 className="text-lg font-medium">{v.title}</h3>
              <p className="col-span-2 text-sm leading-relaxed text-ink sm:col-span-1 sm:max-w-md">
                {v.copy}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

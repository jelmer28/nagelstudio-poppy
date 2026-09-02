"use client";

import { useState } from "react";
import { useReveal } from "@/lib/useReveal";

const QUESTIONS = [
  {
    q: "Wat kost een behandeling bij Poppy?",
    a: "Een manicure start vanaf €38, gel & BIAB vanaf €52 en nail art wordt per ontwerp geprijsd. Je ontvangt altijd vooraf een vaste prijs bij het boeken.",
  },
  {
    q: "Hoe gaan jullie om met hygiëne?",
    a: "Instrumenten worden na elke klant gesteriliseerd of vervangen, en elke werkplek wordt volledig gereset voordat de volgende afspraak begint.",
  },
  {
    q: "Hoe bereid ik mijn eerste bezoek voor?",
    a: "Kom het liefst met schone, ongelakte nagels. Twijfel je over een vorm of kleur? Neem gerust inspiratiefoto's mee.",
  },
  {
    q: "Wat is het annuleringsbeleid?",
    a: "Kosteloos annuleren of verzetten kan tot 24 uur van tevoren. Bij een no-show brengen we 50% van de behandelprijs in rekening.",
  },
  {
    q: "Hoe lang duurt een afspraak gemiddeld?",
    a: "Reken op 60 minuten voor een manicure en 90 minuten voor gel of BIAB met nail art, we plannen nooit dubbel.",
  },
];

export default function FAQ() {
  const scope = useReveal<HTMLElement>();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" ref={scope} className="bg-stone py-24">
      <div className="wrap grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
        <div data-reveal>
          <div className="eyebrow mb-4">Veelgesteld</div>
          <h2 className="font-serif text-4xl">
            Vragen, <br className="hidden lg:block" />beantwoord.
          </h2>
        </div>

        <div className="border-t border-line" data-reveal data-delay="120">
          {QUESTIONS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className="border-b border-line">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="focus-ring flex w-full items-center justify-between gap-6 py-5 text-left"
                >
                  <span className="text-[1.02rem]">{item.q}</span>
                  <span
                    className={`shrink-0 text-xl text-poppy transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                    aria-hidden
                  >
                    +
                  </span>
                </button>
                <div
                  className="grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-xl pb-5 text-sm leading-relaxed text-ink">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

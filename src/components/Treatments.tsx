"use client";

import { useReveal } from "@/lib/useReveal";
import treatmentManicure from "@/assets/treatment-manicure.jpg";
import treatmentGelBiab from "@/assets/treatment-gel-biab.jpg";
import treatmentNagelverlenging from "@/assets/treatment-nagelverlenging.jpg";
import treatmentHandPaintedArt from "@/assets/treatment-hand-painted-art.jpg";
import treatmentPedicure from "@/assets/treatment-pedicure.jpg";
import treatmentSpaHandsFeet from "@/assets/treatment-spa-hands-feet.jpg";

type TreatmentItem = { name: string; src: string };

const ROW_A: TreatmentItem[] = [
  { name: "Manicure", src: treatmentManicure },
  { name: "Gel & BIAB", src: treatmentGelBiab },
  { name: "Nagelverlenging", src: treatmentNagelverlenging },
];

const ROW_B: TreatmentItem[] = [
  { name: "Hand-Painted Art", src: treatmentHandPaintedArt },
  { name: "Pedicure", src: treatmentPedicure },
  { name: "Spa Hands & Feet", src: treatmentSpaHandsFeet },
];

function Row({
  items,
  direction,
  rotate,
}: {
  items: TreatmentItem[];
  direction: "left" | "right";
  rotate: number[];
}) {
  const loop = [...items, ...items];
  return (
    <div className="flex overflow-hidden">
      <div
        className={`flex w-max shrink-0 gap-6 ${
          direction === "left" ? "animate-marquee-left" : "animate-marquee-right"
        } motion-reduce:animate-none`}
      >
        {loop.map((item, i) => (
          <div
            key={`${item.name}-${i}`}
            className="w-[42vw] shrink-0 sm:w-[26vw] md:w-[17vw]"
            style={{ transform: `rotate(${rotate[i % rotate.length]}deg)` }}
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              <img
                src={item.src}
                alt={item.name}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/70 via-ink/0 to-transparent" />
              <span className="absolute bottom-4 left-4 right-4 text-[0.66rem] uppercase leading-snug tracking-[0.1em] text-parchment/90">
                {item.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Treatments() {
  const scope = useReveal<HTMLElement>();

  return (
    <section
      id="behandelingen"
      ref={scope}
      className="overflow-hidden bg-parchment py-24"
    >
      <div className="wrap mb-14 flex flex-wrap items-end justify-between gap-6">
        <div data-reveal>
          <div className="eyebrow mb-4">Behandelingen</div>
          <h2 className="max-w-lg font-serif text-4xl sm:text-5xl">
            Zes vormen van precisie.
          </h2>
        </div>
        <p data-reveal data-delay="120" className="max-w-sm text-sm text-ink">
          Elke behandeling wordt op maat opgebouwd, van een korte manicure
          tussen twee afspraken door tot een volledige nail-art sessie.
        </p>
      </div>

      <div className="flex flex-col gap-6" data-reveal data-delay="200">
        <Row items={ROW_A} direction="left" rotate={[-2, 1.5, -1]} />
        <Row items={ROW_B} direction="right" rotate={[1.5, -2, 1]} />
      </div>
    </section>
  );
}

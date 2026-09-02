"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import signatureCraft from "@/assets/signature-craft.jpg";

const STEPS = [
  { label: "Vorm", copy: "Elke nagel wordt individueel geshaped op de vorm van de vinger, niet op een sjabloon.", dot: { top: "15%", left: "60%" } },
  { label: "Nagelriem", copy: "Rustig, drukvrij nagelriemwerk, de basis voor een manicure die weken meegaat.", dot: { top: "25%", left: "56%" } },
  { label: "Basislaag", copy: "Een dunne, gelijkmatige basislaag zorgt dat kleur en gel niet vroegtijdig loslaten.", dot: { top: "36%", left: "45%" } },
  { label: "Kleur", copy: "Handgemengde tinten, in twee dunne lagen voor diepte in plaats van dekking.", dot: { top: "38%", left: "35%" } },
  { label: "Afwerking", copy: "Een matte of glansfinish, plus een oliebehandeling om de nagelriem te voeden.", dot: { top: "60%", left: "14%" } },
];

export default function SignatureCraft() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [cardKey, setCardKey] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion() || !sectionRef.current || !pinRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: pinRef.current,
        pinSpacing: false,
        onUpdate: (self) => {
          const step = Math.min(
            STEPS.length - 1,
            Math.floor(self.progress * STEPS.length)
          );
          setActive((prev) => {
            if (prev !== step) {
              setCardKey((k) => k + 1);
              return step;
            }
            return prev;
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!dotRef.current) return;
    gsap.to(dotRef.current, {
      top: STEPS[active].dot.top,
      left: STEPS[active].dot.left,
      duration: 0.6,
      ease: "power2.out",
    });
  }, [active]);

  return (
    <section ref={sectionRef} className="relative h-[420vh] bg-ink">
      <div
        ref={pinRef}
        className="relative flex h-[100svh] items-center justify-center overflow-hidden"
      >
        {/* background wordmark marquee — runs continuously, independent of scroll step */}
        <div className="pointer-events-none absolute inset-0 flex items-center overflow-hidden">
          <div className="flex w-max shrink-0 animate-marquee-left motion-reduce:animate-none" style={{ animationDuration: "26s" }}>
            {Array.from({ length: 8 }).map((_, i) => (
              <span
                key={i}
                className="whitespace-nowrap px-6 font-serif text-[22vw] italic leading-none text-parchment/[0.06] sm:text-[16vw]"
              >
                poppy studio
              </span>
            ))}
          </div>
        </div>

        <div className="relative z-10 aspect-[3/4] h-[70svh] max-h-[640px]">
          <img
            src={signatureCraft}
            alt="Signature craft: het resultaat van de Poppy-manicure"
            className="h-full w-full object-cover"
          />

          <div
            ref={dotRef}
            className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
            style={{ top: STEPS[0].dot.top, left: STEPS[0].dot.left }}
          >
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-poppy-soft opacity-60 motion-reduce:hidden" />
              <span className="relative inline-flex h-3 w-3 rounded-full border border-parchment bg-poppy" />
            </span>
          </div>

          <div
            key={cardKey}
            className="absolute bottom-4 left-4 right-4 z-20 max-w-[240px] animate-[cardIn_0.4s_ease] border border-parchment/20 bg-ink/85 p-4 backdrop-blur-sm"
          >
            <div className="eyebrow mb-1 text-poppy-soft">
              {String(active + 1).padStart(2, "0")} / {String(STEPS.length).padStart(2, "0")} · {STEPS[active].label}
            </div>
            <p className="text-[0.82rem] leading-snug text-parchment/85">
              {STEPS[active].copy}
            </p>
          </div>
        </div>

        <div className="wrap absolute bottom-8 left-0 right-0 z-10 hidden justify-between text-parchment/50 sm:flex">
          <span className="eyebrow">Signature craft</span>
          <span className="eyebrow">Scroll om elke stap te volgen</span>
        </div>
      </div>
    </section>
  );
}

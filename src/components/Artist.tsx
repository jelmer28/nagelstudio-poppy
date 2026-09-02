"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { useReveal } from "@/lib/useReveal";
import artistPhoto from "@/assets/artist.jpg";

export default function Artist() {
  const scope = useReveal<HTMLElement>();
  const imgWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !imgWrapRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imgWrapRef.current,
        { yPercent: -8 },
        {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: imgWrapRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="studio" ref={scope} className="overflow-hidden bg-parchment py-24">
      <div className="wrap grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="relative order-2 aspect-[4/5] overflow-hidden lg:order-1" data-reveal>
          <div ref={imgWrapRef} className="absolute inset-[-6%]">
            <img
              src={artistPhoto}
              alt="Amy Peng, oprichter van Nagelstudio Poppy, aan het werk"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="order-1 lg:order-2 lg:pl-6" data-reveal data-delay="120">
          <div className="eyebrow mb-4">De artiest</div>
          <h2 className="font-serif text-4xl sm:text-5xl">
            Amy Peng
          </h2>
          <p className="mt-6 max-w-md text-[0.98rem] leading-relaxed text-ink">
            Na negen jaar in de nagelbranche begon Amy Poppy vanuit een
            simpel idee: een manicure hoeft niet druk te zijn om bijzonder
            te voelen. Elke afspraak begint met tien minuten kijken naar
            vorm en gewoontes voordat er één product wordt geopend.
          </p>

          <dl className="mt-9 grid grid-cols-3 gap-6 border-t border-line pt-6">
            <div>
              <dt className="eyebrow mb-1">Ervaring</dt>
              <dd className="font-serif text-2xl">9 jaar</dd>
            </div>
            <div>
              <dt className="eyebrow mb-1">Specialisatie</dt>
              <dd className="font-serif text-2xl">BIAB &amp; art</dd>
            </div>
            <div>
              <dt className="eyebrow mb-1">Opleiding</dt>
              <dd className="font-serif text-2xl">CIDESCO</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}

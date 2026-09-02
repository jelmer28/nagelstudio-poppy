"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import philosophy1 from "@/assets/philosophy-1.jpg";
import philosophy2 from "@/assets/philosophy-2.jpg";
import philosophy3 from "@/assets/philosophy-3.jpg";
import philosophy4 from "@/assets/philosophy-4.jpg";
import philosophy5 from "@/assets/philosophy-5.jpg";

const PANELS = [
  { label: "Franse manicure, zachtroze glanslak", speed: 0.6, className: "left-[4%] top-[8%] w-[15%] aspect-[3/4]", src: philosophy1 },
  { label: "Grafische lijnkunst, pastelpalet", speed: -0.4, className: "right-[8%] top-[4%] w-[18%] aspect-square", src: philosophy2 },
  { label: "Parelmoer finish met sneeuwvlok-accent", speed: 0.9, className: "left-[10%] bottom-[10%] w-[13%] aspect-[4/5]", src: philosophy3 },
  { label: "Bordeaux chrome met glitterverloop", speed: -0.7, className: "right-[4%] bottom-[16%] w-[16%] aspect-[4/5]", src: philosophy4 },
  { label: "Marmerblauw met goudaccent", speed: 0.3, className: "left-[28%] bottom-[4%] w-[11%] aspect-square", src: philosophy5 },
];

export default function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    if (prefersReducedMotion() || !sectionRef.current || !pinRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: pinRef.current,
        pinSpacing: false,
      });

      panelRefs.current.forEach((panel, i) => {
        if (!panel) return;
        const speed = PANELS[i].speed;
        gsap.fromTo(
          panel,
          { yPercent: -40 * speed },
          {
            yPercent: 40 * speed,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[220vh] bg-stone">
      <div
        ref={pinRef}
        className="relative flex h-[100svh] items-center justify-center overflow-hidden"
      >
        {PANELS.map((p, i) => (
          <div
            key={p.label}
            ref={(el) => { panelRefs.current[i] = el; }}
            className={`absolute hidden overflow-hidden md:block ${p.className}`}
          >
            <img src={p.src} alt={p.label} className="h-full w-full object-cover" />
          </div>
        ))}

        <div className="wrap relative z-10 text-center">
          <div className="eyebrow mb-6">Filosofie</div>
          <h2 className="mx-auto max-w-3xl font-serif text-ink text-[2.4rem] font-normal leading-[1.16] tracking-[-0.01em] sm:text-[3.35rem]">
            Wij zien een manicure als beeldhouwwerk in het klein,{" "}
            <em className="text-poppy font-normal italic">rustig van hand, precies van lijn.</em>
          </h2>
        </div>
      </div>
    </section>
  );
}

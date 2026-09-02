"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useReveal } from "@/lib/useReveal";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";

const ITEMS: Array<{ title: string; src: string }> = [
  { title: "Terracotta chrome, vierkante vorm", src: gallery1 },
  { title: "Poppy red, glansfinish, amandelvorm", src: gallery2 },
  { title: "Stone nude, negatieve-ruimte lijnwerk", src: gallery3 },
  { title: "Ink micro-art, fijne penseeltjes", src: gallery4 },
  { title: "Split lacquer, twee-tinten afwerking", src: gallery5 },
  { title: "Warme clay, geometrische accenten", src: gallery6 },
];

export default function Gallery() {
  const scope = useReveal<HTMLElement>();
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [morphing, setMorphing] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLButtonElement>(null);

  const nextIndex = (index + 1) % ITEMS.length;

  useEffect(() => {
    if (!playing || morphing) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % ITEMS.length), 5000);
    return () => window.clearInterval(id);
  }, [playing, morphing]);

  function crossfadeTo(i: number) {
    if (i === index) return;
    setIndex(i);
  }

  function morphToNext() {
    const thumbEl = thumbRef.current;
    const mainEl = mainRef.current;
    if (!thumbEl || !mainEl || prefersReducedMotion() || morphing) {
      crossfadeTo(nextIndex);
      return;
    }

    setMorphing(true);
    const thumbRect = thumbEl.getBoundingClientRect();
    const mainRect = mainEl.getBoundingClientRect();
    const source = thumbEl.querySelector("[data-photo-fill]");

    const clone = document.createElement("div");
    clone.style.position = "fixed";
    clone.style.zIndex = "60";
    clone.style.left = `${thumbRect.left}px`;
    clone.style.top = `${thumbRect.top}px`;
    clone.style.width = `${thumbRect.width}px`;
    clone.style.height = `${thumbRect.height}px`;
    clone.style.overflow = "hidden";
    clone.style.pointerEvents = "none";
    if (source) clone.innerHTML = (source as HTMLElement).outerHTML;
    document.body.appendChild(clone);

    gsap.to(clone, {
      left: mainRect.left,
      top: mainRect.top,
      width: mainRect.width,
      height: mainRect.height,
      duration: 0.75,
      ease: "power3.out",
      onComplete: () => {
        clone.remove();
        setIndex(nextIndex);
        setMorphing(false);
      },
    });
  }

  return (
    <section id="portfolio" ref={scope} className="bg-parchment py-24">
      <div className="wrap mb-12 flex flex-wrap items-end justify-between gap-6">
        <div data-reveal>
          <div className="eyebrow mb-4">Portfolio</div>
          <h2 key={`h-${index}`} className="max-w-lg animate-[headingIn_0.6s_ease] font-serif text-4xl sm:text-5xl">
            {ITEMS[index].title}
          </h2>
        </div>
        <div className="flex items-center gap-3" data-reveal data-delay="120">
          <button
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? "Pauzeer carrousel" : "Speel carrousel af"}
            className="focus-ring flex h-9 w-9 items-center justify-center rounded-full border border-ink/20 text-ink hover:border-poppy hover:text-poppy"
          >
            {playing ? "⏸" : "▶"}
          </button>
          <button
            onClick={() => crossfadeTo((index - 1 + ITEMS.length) % ITEMS.length)}
            aria-label="Vorige"
            className="focus-ring flex h-9 w-9 items-center justify-center rounded-full border border-ink/20 text-ink hover:border-poppy hover:text-poppy"
          >
            ←
          </button>
          <button
            onClick={() => crossfadeTo(nextIndex)}
            aria-label="Volgende"
            className="focus-ring flex h-9 w-9 items-center justify-center rounded-full border border-ink/20 text-ink hover:border-poppy hover:text-poppy"
          >
            →
          </button>
        </div>
      </div>

      <div className="wrap relative">
        <div ref={mainRef} className="relative aspect-[16/10] w-full overflow-hidden sm:aspect-[16/8]">
          <div key={index} className="absolute inset-0 animate-[imageIn_0.5s_ease]">
            <img
              src={ITEMS[index].src}
              alt={`Portfolio: ${ITEMS[index].title}, studiofotografie op neutrale ondergrond`}
              className="h-full w-full object-cover"
            />
          </div>

          <button
            ref={thumbRef}
            onClick={morphToNext}
            aria-label={`Volgende: ${ITEMS[nextIndex].title}`}
            className="focus-ring absolute bottom-5 left-5 z-10 h-16 w-16 overflow-hidden border-2 border-parchment shadow-lg transition-transform hover:scale-105 sm:h-20 sm:w-20"
          >
            <span data-photo-fill className="block h-full w-full">
              <img src={ITEMS[nextIndex].src} alt="" className="h-full w-full object-cover" />
            </span>
          </button>
        </div>

        <div className="mt-6 flex justify-center gap-2">
          {ITEMS.map((item, i) => (
            <button
              key={item.title}
              onClick={() => crossfadeTo(i)}
              aria-label={`Ga naar ${item.title}`}
              aria-current={i === index}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-6 bg-poppy" : "w-1.5 bg-ink/20 hover:bg-ink/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useReveal } from "@/lib/useReveal";

const REVIEWS = [
  { quote: "De rustigste manicure die ik ooit heb gehad, en mijn gel hield vier weken.", name: "Lotte H." },
  { quote: "Eindelijk een studio waar ze echt kijken naar de vorm van je nagel.", name: "Fenna B." },
  { quote: "Klein, warm en precies. Ik boek nu standaard drie weken vooruit.", name: "Anouk D." },
  { quote: "De nail art is subtiel en volwassen, precies wat ik zocht.", name: "Marit S." },
  { quote: "Je voelt dat er tijd voor je wordt genomen, geen enkele stap wordt afgeraffeld.", name: "Iris K." },
];

export default function Reviews() {
  const scope = useReveal<HTMLElement>();
  const loop = [...REVIEWS, ...REVIEWS];

  return (
    <section id="reviews" ref={scope} className="overflow-hidden bg-ink py-24 text-parchment">
      <div className="wrap mb-12" data-reveal>
        <div className="eyebrow mb-4 text-parchment/60">Reviews</div>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="max-w-lg font-serif text-4xl sm:text-5xl">
            In hun eigen woorden.
          </h2>
          <div className="flex items-center gap-3 rounded-lg bg-parchment px-4 py-3 shadow-[0_1px_2px_rgba(0,0,0,0.08)]">
            <svg viewBox="0 0 48 48" className="h-6 w-6 shrink-0" aria-hidden>
              <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
              <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
              <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
              <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
            </svg>

            <div className="h-8 w-px bg-ink/10" aria-hidden />

            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[0.95rem] font-semibold leading-none text-ink">4,9</span>
                <div className="flex gap-0.5" aria-hidden>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} viewBox="0 0 20 20" className="h-3.5 w-3.5 fill-[#FBBC04]">
                      <path d="M10 1.5l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.1-5.4 3.1 1.3-6-4.6-4.1 6.1-.6z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="mt-0.5 text-[0.7rem] leading-none text-ink">58 Google-reviews</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex overflow-hidden" data-reveal data-delay="150">
        <div
          className="flex w-max shrink-0 gap-8 animate-marquee-left motion-reduce:animate-none"
          style={{ animationDuration: "50s" }}
        >
          {loop.map((r, i) => (
            <figure
              key={i}
              className="w-[78vw] shrink-0 border-l border-parchment/15 pl-6 sm:w-[38vw] lg:w-[26vw]"
            >
              <blockquote className="font-serif text-xl italic leading-snug text-parchment/90">
                &ldquo;{r.quote}&rdquo;
              </blockquote>
              <figcaption className="eyebrow mt-4 text-parchment/50">
                {r.name}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useReveal } from "@/lib/useReveal";
import philosophy1 from "@/assets/philosophy-1.jpg";
import philosophy3 from "@/assets/philosophy-3.jpg";
import philosophy4 from "@/assets/philosophy-4.jpg";
import philosophy5 from "@/assets/philosophy-5.jpg";
import social1 from "@/assets/social-1.jpg";
import social2 from "@/assets/social-2.jpg";

const FACEBOOK_URL = "https://www.facebook.com/Nagelstudiopoppy/";

const POSTS = [
  { caption: "Franse manicure met een subtiel glitteraccent", src: philosophy1 },
  { caption: "Parelmoer finish met sneeuwvlok-detail", src: philosophy3 },
  { caption: "Bordeaux chrome met glitterverloop", src: philosophy4 },
  { caption: "Nude tinten, twee aan twee", src: social1 },
  { caption: "Marmerblauw met goudaccent", src: philosophy5 },
  { caption: "Paars met fijne glitter", src: social2 },
];

export default function InstagramGrid() {
  const scope = useReveal<HTMLElement>();
  return (
    <section ref={scope} className="bg-parchment py-24">
      <div className="wrap mb-10 flex flex-wrap items-end justify-between gap-6">
        <div data-reveal>
          <div className="eyebrow mb-4">Social</div>
          <h2 className="font-serif text-4xl sm:text-5xl">Nagelstudio Poppy</h2>
        </div>
        <a
          href={FACEBOOK_URL}
          target="_blank"
          rel="noreferrer"
          className="btn-line inline-flex items-center gap-2"
          data-reveal
          data-delay="120"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
            <path d="M22 12.06C22 6.505 17.523 2 12 2S2 6.505 2 12.06c0 5.02 3.657 9.184 8.438 9.94v-7.03H7.898v-2.91h2.54V9.845c0-2.522 1.492-3.915 3.777-3.915 1.094 0 2.238.197 2.238.197v2.475h-1.26c-1.243 0-1.63.775-1.63 1.57v1.888h2.773l-.443 2.91h-2.33V22c4.78-.756 8.437-4.92 8.437-9.94z" />
          </svg>
          Volg op Facebook
        </a>
      </div>

      <div className="wrap grid grid-cols-2 gap-1 sm:grid-cols-3 lg:grid-cols-6" data-reveal data-delay="200">
        {POSTS.map((p) => (
          <a
            key={p.caption}
            href={FACEBOOK_URL}
            target="_blank"
            rel="noreferrer"
            className="group relative aspect-square overflow-hidden"
          >
            <img
              src={p.src}
              alt={p.caption}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-end bg-ink/0 p-4 opacity-0 transition-all duration-300 group-hover:bg-ink/55 group-hover:opacity-100">
              <span className="text-xs leading-snug text-parchment">{p.caption}</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

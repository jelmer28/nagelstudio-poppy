"use client";

import { useReveal } from "@/lib/useReveal";

export default function Footer() {
  const scope = useReveal<HTMLElement>();
  return (
    <footer ref={scope} className="overflow-hidden bg-parchment pb-10 pt-24">
      <div className="wrap" data-reveal>
        <div className="flex items-end justify-between gap-6 border-b border-line pb-10">
          <h2 className="font-serif text-[16vw] italic leading-[0.85] sm:text-[9rem]">
            poppy
          </h2>
        </div>

        <div className="grid gap-10 pt-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="eyebrow mb-3">Studio</div>
            <p className="text-sm text-ink">
              <a
                href="https://www.google.com/maps/place//data=!4m2!3m1!1s0x47c903d1b2038393:0xb45198f5cb073a99?sa=X&ved=1t:8290&ictx=111"
                target="_blank"
                rel="noreferrer"
                className="hover:text-poppy"
              >
                Rixtwei 56<br />8915 JM Leeuwarden
              </a>
            </p>
          </div>
          <div>
            <div className="eyebrow mb-3">Contact</div>
            <p className="text-sm text-ink">
              <a href="tel:+31658773775" className="hover:text-poppy">+31658773775</a>
              <br />
              <a href="mailto:hallo@nagelstudiopoppy.nl" className="hover:text-poppy">hallo@nagelstudiopoppy.nl</a>
            </p>
          </div>
          <div>
            <div className="eyebrow mb-3">Openingstijden</div>
            <p className="text-sm text-ink">
              Maandag t/m vrijdag &nbsp;11:00 – 17:00<br />
              Zaterdag &amp; zondag &nbsp;gesloten
            </p>
          </div>
          <div>
            <div className="eyebrow mb-3">Volg ons</div>
            <p className="text-sm text-ink">
              <a href="https://www.facebook.com/Nagelstudiopoppy/" target="_blank" rel="noreferrer" className="hover:text-poppy">Facebook</a>
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 text-xs text-ink sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Nagelstudio Poppy. Alle rechten voorbehouden.</span>
          <span>Gemaakt door Klik Klant</span>
        </div>
      </div>
    </footer>
  );
}

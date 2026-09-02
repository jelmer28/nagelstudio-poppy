"use client";

import { useReveal } from "@/lib/useReveal";
import { useBookingModal } from "@/lib/BookingModalContext";
import bookingBg from "@/assets/booking-bg.jpg";

export default function Booking() {
  const scope = useReveal<HTMLElement>();
  const { openModal } = useBookingModal();
  return (
    <section id="boeken" ref={scope} className="relative overflow-hidden bg-ink py-24">
      <div className="absolute inset-0">
        <img src={bookingBg} alt="" className="h-full w-full object-cover opacity-90" />
        <div className="absolute inset-0 bg-ink/45" />
      </div>

      <div className="wrap relative z-10 flex justify-center">
        <div
          data-reveal
          className="w-full max-w-md border border-parchment/15 bg-parchment/95 px-9 py-11 text-center shadow-2xl [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)]"
        >
          <div className="eyebrow mb-3">Nagelstudio Poppy</div>
          <h2 className="font-serif text-3xl sm:text-4xl">
            Jouw handen, doordacht.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ink">
            We plannen maandag t/m vrijdag, op afspraak. De meeste eerste
            bezoeken passen nog deze week in de agenda.
          </p>
          <button onClick={openModal} className="btn-solid mt-8 w-full">
            Boek een afspraak
          </button>
          <p className="mt-4 text-xs text-ink">
            Of bel <a href="tel:+31658773775" className="underline decoration-poppy underline-offset-2">+31658773775</a>
          </p>
        </div>
      </div>
    </section>
  );
}

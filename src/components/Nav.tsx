"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useBookingModal } from "@/lib/BookingModalContext";
import logo from "@/assets/logo.png";

const LINKS = [
  { href: "#behandelingen", label: "Behandelingen" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#studio", label: "Studio" },
  { href: "#reviews", label: "Reviews" },
  { href: "#faq", label: "Veelgesteld" },
];

export default function Nav() {
  const ref = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const { openModal } = useBookingModal();

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(
      ref.current,
      { opacity: 0, y: -14 },
      { opacity: 1, y: 0, duration: 0.9, delay: 0.9, ease: "power3.out" }
    );
  }, []);

  return (
    <header
      ref={ref}
      className="fixed inset-x-0 top-0 z-40 border-b border-ink/10 bg-parchment/85 backdrop-blur-md"
    >
      <div className="wrap flex items-center justify-between py-4">
        <a href="#top" className="flex items-center">
          <img src={logo} alt="Nagelstudio Poppy" className="h-11 w-11 object-contain" />
        </a>

        <nav className="hidden gap-8 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="focus-ring text-[0.78rem] uppercase tracking-[0.08em] text-ink transition-colors hover:text-poppy"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button onClick={openModal} className="btn-line hidden sm:inline-flex">
            Boek een afspraak
          </button>
          <button
            className="focus-ring flex flex-col gap-[5px] p-2 md:hidden"
            aria-label={open ? "Sluit menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span
              className={`h-px w-5 bg-ink transition-transform ${open ? "translate-y-[3px] rotate-45" : ""}`}
            />
            <span
              className={`h-px w-5 bg-ink transition-transform ${open ? "-translate-y-[3px] -rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-ink/10 px-6 pb-6 pt-2 md:hidden">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="focus-ring py-2 text-sm uppercase tracking-[0.08em] text-ink"
            >
              {l.label}
            </a>
          ))}
          <button
            onClick={() => {
              setOpen(false);
              openModal();
            }}
            className="btn-line mt-2 w-fit"
          >
            Boek een afspraak
          </button>
        </nav>
      )}
    </header>
  );
}

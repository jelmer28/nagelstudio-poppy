"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import heroVideoMp4 from "@/assets/hero.mp4";
import heroVideoWebm from "@/assets/hero.webm";

export default function Hero() {
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) {
      gsap.set(
        [videoWrapRef.current, eyebrowRef.current, lineRef.current],
        { opacity: 1, clearProps: "transform" }
      );
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.fromTo(
      videoWrapRef.current,
      { opacity: 0, scale: 1.12 },
      { opacity: 1, scale: 1, duration: 1.6 }
    )
      .fromTo(
        eyebrowRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.9 },
        "-=1.0"
      )
      .fromTo(
        lineRef.current,
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 1 },
        "-=0.6"
      );
  }, []);

  return (
    <section id="top" className="relative flex h-[100svh] min-h-[560px] items-center justify-center overflow-hidden bg-ink">
      <div ref={videoWrapRef} className="absolute inset-0">
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={heroVideoWebm} type="video/webm" />
          <source src={heroVideoMp4} type="video/mp4" />
        </video>
      </div>
      <div className="absolute inset-0 bg-ink/45" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/20" />

      <div className="wrap relative z-10 flex flex-col items-center px-6 text-center text-parchment">
        <div ref={eyebrowRef} className="eyebrow mb-5 text-parchment/70">
          Nagelstudio Poppy
        </div>
        <h1
          ref={lineRef}
          className="max-w-xl font-serif text-3xl italic leading-[1.15] text-parchment sm:text-4xl lg:text-[2.75rem]"
        >
          De rustige architectuur van de hand.
        </h1>
      </div>
    </section>
  );
}

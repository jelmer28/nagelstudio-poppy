"use client";

import { useEffect, useRef } from "react";

/**
 * Attaches an IntersectionObserver to every [data-reveal] element inside
 * the returned ref and flips data-in="true" once each crosses ~15% into
 * view, staggered by its data-delay (ms). Elements never re-hide on
 * scroll-out, matching the reference site's one-shot entrance reveals.
 */
export function useReveal<T extends HTMLElement>() {
  const scopeRef = useRef<T | null>(null);

  useEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;

    const targets = Array.from(
      scope.querySelectorAll<HTMLElement>("[data-reveal]")
    );

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      targets.forEach((el) => el.setAttribute("data-in", "true"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = Number(el.dataset.delay ?? 0);
            window.setTimeout(() => el.setAttribute("data-in", "true"), delay);
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return scopeRef;
}

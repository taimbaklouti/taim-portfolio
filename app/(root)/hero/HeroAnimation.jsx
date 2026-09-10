"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin(useGSAP);

export default function HeroAnimation({ children }) {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set([".hero-bio", ".hero-cta", ".hero-social a", ".hero-eyebrow"], {
          clearProps: "all",
          opacity: 1,
        });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(".hero-eyebrow", { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 })
        .fromTo(".hero-bio", { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.6")
        .fromTo(".hero-cta", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, "-=0.2")
        .fromTo(
          ".hero-social a",
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.08, duration: 0.4 },
          "-=0.2"
        );
    },
    { scope: containerRef }
  );

  return <div ref={containerRef}>{children}</div>;
}

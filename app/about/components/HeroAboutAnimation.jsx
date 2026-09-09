"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function HeroAboutAnimation() {
  const overlayRef = useRef(null);

  useGSAP(() => {
    // Cibler le parent .about-hero et son premier enfant (le wrapper Image)
    const hero = document.querySelector(".about-hero");
    if (!hero) return;

    // next/image crée un <span> ou <figure> autour de l'img
    const imageWrapper = hero.firstElementChild;
    if (!imageWrapper) return;

    // Parallaxe sur l'image de fond — zoom subtil au scroll
    gsap.to(imageWrapper, {
      scale: 1.25,
      ease: "none",
      scrollTrigger: {
        trigger: hero,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5,
      },
    });

    // Overlay gradient — s'assombrit légèrement au scroll
    gsap.to(overlayRef.current, {
      opacity: 0.9,
      ease: "none",
      scrollTrigger: {
        trigger: hero,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });
  });

  return (
    <div
      ref={overlayRef}
      className="absolute inset-0 bg-gradient-to-r from-[var(--color-paper)]/80 via-[var(--color-paper)]/60 to-[var(--color-paper)]/40
        dark:from-[var(--color-paper-dark)]/85 dark:via-[var(--color-paper-dark)]/65 dark:to-[var(--color-paper-dark)]/40"
    />
  );
}

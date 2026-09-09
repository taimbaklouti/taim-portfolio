"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrambleTextPlugin);

export default function Quote() {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          once: true,
        },
      });

      // Scramble reveal for the quote text
      tl.to(".quote-text", {
        duration: 1.8,
        scrambleText: {
          text: "The secret of change is to focus all of your energy not on fighting the old, but on building the new.",
          chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
          revealDelay: 0.3,
          tweenLength: true,
        },
        ease: "none",
      })
        // Author attribution fade in after the scramble
        .to(
          ".quote-author",
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          "+=0.4"
        );
    },
    { scope: containerRef }
  );

  return (
    <div className="min-h-[50vh] mx-auto container py-24 md:py-32 my-12 px-6 grid grid-cols-1">
      <div ref={containerRef} className="flex justify-center items-center flex-col text-center">
        {/* Decorative opening quote mark */}
        <div className="text-7xl md:text-9xl font-serif text-neutral-300 dark:text-neutral-800 leading-none mb-2 select-none">
          &ldquo;
        </div>

        {/* Quote text — target for ScrambleText */}
        <h3 className="quote-text text-2xl md:text-4xl font-medium text-neutral-800 dark:text-neutral-100 italic leading-relaxed max-w-3xl mx-auto">
          &nbsp;
        </h3>

        {/* Author attribution */}
        <p className="quote-author mt-8 text-lg md:text-xl font-normal text-[var(--color-accent)] dark:text-[var(--color-accent-dark)] tracking-wider opacity-0 translate-y-2">
          &mdash; Socrates
        </p>

        {/* Decorative closing quote mark */}
        <div className="text-7xl md:text-9xl font-serif text-neutral-300 dark:text-neutral-800 leading-none mt-6 self-end select-none">
          &rdquo;
        </div>
      </div>
    </div>
  );
}

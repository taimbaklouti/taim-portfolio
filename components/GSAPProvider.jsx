"use client";

import { createContext, useContext, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import { SplitText } from "gsap/SplitText";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { useGSAP } from "@gsap/react";

// ─── Register ALL GSAP plugins ONCE at module level ─────────────
gsap.registerPlugin(useGSAP, ScrollTrigger, Flip, SplitText, DrawSVGPlugin, ScrambleTextPlugin);

// ─── Global GSAP defaults ──────────────────────────────────────
gsap.defaults({
  duration: 0.6,
  ease: "power2.out",
});

// ─── Context ────────────────────────────────────────────────────
const GSAPContext = createContext({
  reducedMotion: false,
  isDesktop: true,
});

export function useGSAPContext() {
  return useContext(GSAPContext);
}

// ─── Provider ───────────────────────────────────────────────────
export default function GSAPProvider({ children }) {
  const mmRef = useRef(null);

  useEffect(() => {
    // Responsive + accessibility matchMedia
    const mm = gsap.matchMedia();
    mmRef.current = mm;

    // Desktop animations: full effects
    mm.add("(min-width: 768px)", () => {
      // This context is active on desktop — animations created inside
      // will automatically clean up when leaving the breakpoint
      return () => {};
    });

    // Mobile animations: simplified (shorter durations)
    mm.add("(max-width: 767px)", () => {
      gsap.defaults({ duration: 0.35 });
      return () => {
        gsap.defaults({ duration: 0.6 });
      };
    });

    // Reduced motion: kill all GSAP animations for accessibility
    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.defaults({ duration: 0 });
      // Disable ScrollTrigger animations
      ScrollTrigger.getAll().forEach((st) => st.disable());
      return () => {
        gsap.defaults({ duration: 0.6 });
        ScrollTrigger.getAll().forEach((st) => st.enable());
      };
    });

    // Initial refresh after setting up matchMedia
    ScrollTrigger.refresh();

    return () => {
      mm.revert();
    };
  }, []);

  return <>{children}</>;
}

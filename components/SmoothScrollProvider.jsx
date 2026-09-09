"use client";

import { createContext, useContext, useEffect, useRef, useState, useCallback } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ─── Context ────────────────────────────────────────────────────
const SmoothScrollContext = createContext(null);

/**
 * Hook to access the Lenis instance and controls from any component.
 *
 * @returns {{ lenis: Lenis | null, isReady: boolean, isPaused: boolean, pause: () => void, resume: () => void, scrollTo: (target, options?) => void }}
 */
export function useSmoothScroll() {
  const ctx = useContext(SmoothScrollContext);
  if (!ctx) {
    throw new Error("useSmoothScroll must be used within a <SmoothScrollProvider>");
  }
  return ctx;
}

// ─── Easing (kit canonique 03-motion/lenis.js) ────────────────────
const LENIS_EASE = (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t));

// ─── Scroll lock (kit canonique, adapté à Lenis stop/start) ──────
let scrollBlocked = false;

function lockScroll(lenis) {
  if (scrollBlocked) return;
  scrollBlocked = true;
  if (lenis) lenis.stop();
  document.documentElement.style.overflow = "hidden";
}

function unlockScroll(lenis) {
  if (!scrollBlocked) return;
  scrollBlocked = false;
  document.documentElement.style.overflow = "";
  if (lenis) lenis.start();
}

// ─── Provider ───────────────────────────────────────────────────
export default function SmoothScrollProvider({ children }) {
  const lenisRef = useRef(null);
  const tickerRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    // 1. Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);
    gsap.ticker.lagSmoothing(0);

    // 2. Create Lenis instance (kit canonique : autoRaf + respectReducedMotion)
    const lenis = new Lenis({
      duration: 1.2,
      easing: LENIS_EASE,
      orientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      gestureOrientation: "vertical",
      autoRaf: true,
      respectReducedMotion: true,
    });
    lenisRef.current = lenis;

    // 3. Sync Lenis scroll → ScrollTrigger (sans scrollerProxy : scroll libre natif)
    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);

    // 4. Refresh après setup (fonts/images)
    const refresh = () => ScrollTrigger.refresh();
    const t = setTimeout(refresh, 300);
    setIsReady(true);

    // ─── Cleanup ──────────────────────────────────────────────
    return () => {
      clearTimeout(t);
      lenis.off("scroll", onScroll);
      unlockScroll(lenis);
      lenis.destroy();
      lenisRef.current = null;
      tickerRef.current = null;
    };
  }, []);

  // ─── Controls ────────────────────────────────────────────────
  const pause = useCallback(() => {
    if (lenisRef.current) {
      lenisRef.current.stop();
      setIsPaused(true);
    }
  }, []);

  const resume = useCallback(() => {
    if (lenisRef.current) {
      lenisRef.current.start();
      setIsPaused(false);
    }
  }, []);

  const scrollTo = useCallback((target, options) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, {
        duration: 1.4,
        easing: LENIS_EASE,
        ...options,
      });
    } else if (typeof target === "string") {
      document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const blockScroll = useCallback(() => lockScroll(lenisRef.current), []);
  const unblockScroll = useCallback(() => unlockScroll(lenisRef.current), []);

  return (
    <SmoothScrollContext.Provider
      value={{
        lenis: lenisRef.current,
        isReady,
        isPaused,
        pause,
        resume,
        scrollTo,
        blockScroll,
        unblockScroll,
      }}
    >
      {children}
    </SmoothScrollContext.Provider>
  );
}

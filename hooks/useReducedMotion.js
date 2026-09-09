"use client";

import { useState, useEffect } from "react";

/**
 * useReducedMotion — Reactive hook that returns true when the user
 * prefers reduced motion (accessibility setting).
 *
 * Use it in components to conditionally skip animations:
 *   const reduced = useReducedMotion();
 *   if (reduced) return null; // skip animation setup
 *
 * @returns {boolean} true if user prefers reduced motion
 */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);

    const handler = (e) => setReduced(e.matches);
    mq.addEventListener("change", handler);

    return () => mq.removeEventListener("change", handler);
  }, []);

  return reduced;
}

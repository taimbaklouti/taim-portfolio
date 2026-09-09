"use client";
import { useState, useEffect } from "react";

/**
 * useDevPageDelay — Adds an artificial delay in development mode
 * so skeletons stay visible long enough to observe and tweak.
 *
 * Usage in any page.jsx:
 *
 *   const ready = useDevPageDelay(2000);
 *   if (!ready) return <YourLoadingComponent />;
 *
 * In production the delay is bypassed entirely (returns true instantly).
 *
 * @param {number} ms  Delay in milliseconds (default 2000)
 * @returns {boolean}   true when the page content should render
 */
export default function useDevPageDelay(ms = 2000) {
  const [ready, setReady] = useState(process.env.NODE_ENV !== "development");

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;

    const timer = setTimeout(() => setReady(true), ms);
    return () => clearTimeout(timer);
  }, [ms]);

  return ready;
}

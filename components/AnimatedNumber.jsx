"use client";

import { useRef, useEffect } from "react";

/**
 * AnimatedNumber — Counts up from 0 to a target value when scrolled into view.
 *
 * Uses a small rAF tween instead of an animation library: the previous
 * implementation called the anime.js v3 API while the project ships
 * animejs v4 (whose `animate(targets, params)` signature silently
 * ignored the call), leaving the displayed number stuck at 0.
 *
 * @param {number} value     — The target number (e.g. 15.14)
 * @param {string} prefix    — String before the number (e.g. "#")
 * @param {string} suffix    — String after the number (e.g. "/20")
 * @param {number} decimals  — Decimal places to round to (default 0)
 * @param {string} className — Extra Tailwind classes
 * @param {number} duration  — Animation duration in ms (default 2000)
 * @param {number} delay     — Stagger delay in ms (default 0)
 */
export default function AnimatedNumber({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  className = "",
  duration = 2000,
  delay = 0,
}) {
  const displayRef = useRef(null);
  const containerRef = useRef(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.unobserve(el);

        const render = (n) => {
          if (displayRef.current) {
            displayRef.current.textContent = n.toFixed(decimals);
          }
        };

        const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

        if (reduced || duration <= 0) {
          render(value);
          return;
        }

        const start = performance.now() + delay;
        const tick = (now) => {
          const t = Math.min(Math.max((now - start) / duration, 0), 1);
          // easeOutExpo
          const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
          render(value * eased);
          if (t < 1) rafRef.current = requestAnimationFrame(tick);
        };
        rafRef.current = requestAnimationFrame(tick);
      },
      { threshold: 0.3 }
    );

    observer.observe(el);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      observer.disconnect();
    };
  }, [value, decimals, duration, delay]);

  return (
    <span ref={containerRef} className={className}>
      {prefix}
      <span ref={displayRef}>0</span>
      {suffix}
    </span>
  );
}

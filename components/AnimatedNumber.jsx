"use client";

import { useRef, useEffect } from "react";
import { animate } from "animejs";

/**
 * AnimatedNumber — Counts up from 0 to a target value when scrolled into view.
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
  const animRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const data = { current: 0 };

          animRef.current = animate({
            targets: data,
            current: value,
            duration,
            delay,
            easing: "easeOutExpo",
            onUpdate: () => {
              if (displayRef.current) {
                displayRef.current.textContent = data.current.toFixed(decimals);
              }
            },
          });

          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);

    return () => {
      animRef.current?.cancel();
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

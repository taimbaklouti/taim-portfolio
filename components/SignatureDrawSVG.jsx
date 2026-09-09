"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import PropTypes from "prop-types";

// Safe to call multiple times — GSAP ignores duplicate registrations
gsap.registerPlugin(DrawSVGPlugin);

/**
 * SignatureDrawSVG — A stylized "T B" signature that draws itself
 * using GSAP DrawSVGPlugin on scroll reveal.
 *
 * Variants:
 *   "signature" — full "T B" calligraphic signature (default)
 *   "compact"   — smaller, for tighter spaces
 */
export default function SignatureDrawSVG({
  variant = "signature",
  color = "var(--color-accent)",
  className = "",
}) {
  const containerRef = useRef(null);
  const [hasDrawn, setHasDrawn] = useState(false);

  const isCompact = variant === "compact";
  const viewWidth = isCompact ? 160 : 240;
  const viewHeight = isCompact ? 60 : 80;

  useGSAP(
    () => {
      const paths = containerRef.current?.querySelectorAll(".tb-signature-path");
      if (!paths || paths.length === 0) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
        onComplete: () => setHasDrawn(true),
      });

      // Stagger each path — each stroke draws one after the other
      paths.forEach((path, i) => {
        tl.fromTo(
          path,
          { drawSVG: "0% 0%" },
          {
            drawSVG: "0% 100%",
            duration: 0.7,
            ease: "power3.inOut",
          },
          i === 0 ? 0 : "-=0.3" // overlap slightly
        );
      });

      // No manual cleanup needed — useGSAP handles it automatically
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className={`inline-flex items-center justify-center ${className}`}
      aria-label="T B signature"
      role="img"
    >
      <svg
        width={isCompact ? 120 : 180}
        height={isCompact ? 45 : 60}
        viewBox={`0 0 ${viewWidth} ${viewHeight}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`transition-opacity duration-700 ${hasDrawn ? "opacity-80" : "opacity-60"}`}
        style={{ color }}
      >
        {/* ── Stroke 1: T ascender + calligraphic top loop ── */}
        <path
          className="tb-signature-path"
          d={
            isCompact
              ? "M 20,52 C 17,38 22,22 25,16 C 28,10 34,14 32,20 C 29,28 27,38 26,44"
              : "M 28,68 C 24,50 30,30 36,20 C 40,12 50,16 46,24 C 42,34 38,48 36,56"
          }
          stroke="currentColor"
          strokeWidth={isCompact ? 1.8 : 2.2}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />

        {/* ── Stroke 2: T crossbar flowing into B transition ── */}
        <path
          className="tb-signature-path"
          d={
            isCompact
              ? "M 20,36 Q 40,32 68,36 Q 74,38 76,42"
              : "M 24,42 Q 52,36 90,42 Q 96,44 100,50"
          }
          stroke="currentColor"
          strokeWidth={isCompact ? 1.8 : 2.2}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />

        {/* ── Stroke 3: B upper loop ── */}
        <path
          className="tb-signature-path"
          d={
            isCompact
              ? "M 76,42 C 76,24 92,18 96,28 C 100,38 86,44 76,46"
              : "M 100,50 C 100,26 124,18 128,32 C 132,46 112,54 100,56"
          }
          stroke="currentColor"
          strokeWidth={isCompact ? 1.8 : 2.2}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />

        {/* ── Stroke 4: B lower hump ── */}
        <path
          className="tb-signature-path"
          d={
            isCompact
              ? "M 76,46 C 86,46 100,48 102,56 C 104,64 90,68 76,64"
              : "M 100,56 C 112,56 130,58 132,68 C 134,78 114,80 100,74"
          }
          stroke="currentColor"
          strokeWidth={isCompact ? 1.8 : 2.2}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />

        {/* ── Stroke 5: Final flourish ── */}
        <path
          className="tb-signature-path"
          d={
            isCompact
              ? "M 76,64 Q 92,60 108,58 Q 112,57 114,60"
              : "M 100,74 Q 120,68 148,64 Q 154,63 158,67"
          }
          stroke="currentColor"
          strokeWidth={isCompact ? 1.8 : 2.2}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />

        {/* ── Subtle decorative dot (appears after drawing) ── */}
        <circle
          className={`tb-signature-dot transition-opacity duration-700 ${
            hasDrawn ? "opacity-100" : "opacity-0"
          }`}
          cx={isCompact ? 116 : 162}
          cy={isCompact ? 60 : 68}
          r={isCompact ? 1.2 : 1.5}
          fill="currentColor"
        />
      </svg>
    </div>
  );
}

SignatureDrawSVG.propTypes = {
  variant: PropTypes.oneOf(["signature", "compact"]),
  color: PropTypes.string,
  className: PropTypes.string,
};

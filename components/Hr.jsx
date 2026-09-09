"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import PropTypes from "prop-types";

export default function Hr({ variant = "short", align = "center" }) {
  const containerRef = useRef(null);
  const isLeft = align === "left";

  useGSAP(
    () => {
      gsap.fromTo(
        ".hr-line-svg",
        { drawSVG: "0% 0%" },
        {
          drawSVG: "0% 100%",
          duration: 0.8,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: containerRef }
  );

  if (variant === "long") {
    return (
      <div
        ref={containerRef}
        aria-hidden="true"
        className={`flex flex-col ${isLeft ? "items-start" : "items-center"}`}
      >
        <svg className="hr-line-svg mb-3" width="112" height="4" viewBox="0 0 112 4">
          <line
            x1="0"
            y1="2"
            x2="112"
            y2="2"
            stroke="var(--color-accent)"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
        <svg className="hr-line-svg" width="112" height="4" viewBox="0 0 112 4">
          <line
            x1="0"
            y1="2"
            x2="112"
            y2="2"
            stroke="var(--color-accent)"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`flex flex-col my-5 ${isLeft ? "items-start self-start" : "justify-center items-center"}`}
    >
      <svg className="hr-line-svg mb-2" width="80" height="4" viewBox="0 0 80 4">
        <line
          x1="0"
          y1="2"
          x2="80"
          y2="2"
          stroke="var(--color-accent)"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
      <svg className="hr-line-svg" width="80" height="4" viewBox="0 0 80 4">
        <line
          x1="0"
          y1="2"
          x2="80"
          y2="2"
          stroke="var(--color-accent)"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

Hr.propTypes = {
  variant: PropTypes.oneOf(["short", "long"]),
  align: PropTypes.oneOf(["center", "left"]),
};

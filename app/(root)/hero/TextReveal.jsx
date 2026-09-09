"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

export default function TextReveal({
  children,
  className = "",
  as: Tag = "h1",
  stagger = 0.02,
  duration = 0.6,
}) {
  const containerRef = useRef(null);
  const splitRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const split = SplitText.create(el, {
      type: "words, chars",
      charsClass: "hero-char",
      mask: "chars",
    });
    splitRef.current = split;

    const tween = gsap.from(split.chars, {
      opacity: 0,
      y: 44,
      rotateX: -80,
      transformOrigin: "50% 0%",
      stagger,
      duration,
      ease: "back.out(1.4)",
      overwrite: "auto",
    });

    return () => {
      tween.kill();
      split.revert();
    };
  }, [stagger, duration]);

  return (
    <Tag ref={containerRef} className={className}>
      {children}
    </Tag>
  );
}

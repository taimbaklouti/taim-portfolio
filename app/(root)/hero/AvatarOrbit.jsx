"use client";

import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createScope, createSpring, animate } from "animejs";

gsap.registerPlugin(useGSAP, ScrollTrigger);
import Image from "next/image";
import Me from "@/public/image/taim-front.webp";

const ORBIT_DOTS = 12;

export default function AvatarOrbit({ className = "" }) {
  const containerRef = useRef(null);
  const frameRef = useRef(null);
  const dotsRef = useRef(null);
  const scopeRef = useRef(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // Entrée : scale + fade
      gsap.from(containerRef.current, {
        scale: 0.85,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        delay: 0.2,
      });

      // Flottement doux permanent
      gsap.to(".hero-avatar-inner", {
        y: -10,
        duration: 3,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });

      // Rotation lente de l'anneau de points (transform-only, 60fps)
      gsap.to(dotsRef.current, {
        rotation: 360,
        duration: 28,
        repeat: -1,
        ease: "none",
      });

      // Parallax léger au scroll
      gsap.to(".hero-avatar-inner", {
        yPercent: 10,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: containerRef }
  );

  /* Tilt 3D animejs — l'image réagit à la souris avec un retour élastique */
  useEffect(() => {
    const container = containerRef.current;
    const frame = frameRef.current;
    if (!container || !frame) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const MAX_TILT = 7; // degrés — subtil

    const onMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const dx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const dy = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
      animate(frame, {
        rotateY: Math.max(-1, Math.min(1, dx)) * MAX_TILT,
        rotateX: Math.max(-1, Math.min(1, -dy)) * MAX_TILT,
        duration: 450,
        ease: "out(3)",
      });
    };

    const onMouseLeave = () => {
      animate(frame, {
        rotateX: 0,
        rotateY: 0,
        ease: createSpring({ stiffness: 110, damping: 11 }),
      });
    };

    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseleave", onMouseLeave);

    scopeRef.current = createScope({ root: container });

    return () => {
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseleave", onMouseLeave);
      scopeRef.current?.revert();
    };
  }, []);

  const size = "w-[240px] h-[240px] md:w-[320px] md:h-[320px]";

  return (
    <div ref={containerRef} className={`hero-avatar-wrapper ${className}`}>
      <div className="relative [perspective:900px] [--orbit-r:136px] md:[--orbit-r:180px]">
        {/* Halo circulaire */}
        <div
          aria-hidden="true"
          className="absolute -inset-8 rounded-full bg-[var(--color-accent)]/15
            blur-2xl dark:bg-[var(--color-accent-dark)]/20"
        />

        {/* Anneau de points orbitaux (rotation lente) */}
        <div
          ref={dotsRef}
          aria-hidden="true"
          className="absolute -inset-4 md:-inset-5 will-change-transform"
        >
          {Array.from({ length: ORBIT_DOTS }).map((_, i) => {
            const angle = (360 / ORBIT_DOTS) * i;
            return (
              <span
                key={i}
                className="absolute left-1/2 top-1/2 w-1.5 h-1.5 rounded-full
                  bg-[var(--color-accent)] dark:bg-[var(--color-accent-dark)]"
                style={{
                  transform: `rotate(${angle}deg) translateX(var(--orbit-r)) rotate(-${angle}deg)`,
                }}
              />
            );
          })}
        </div>

        {/* Anneau accent fin */}
        <div
          aria-hidden="true"
          className="absolute -inset-1 rounded-full
            border border-[var(--color-accent)]/40 dark:border-[var(--color-accent-dark)]/50"
        />

        <div className="hero-avatar-inner relative">
          <div
            ref={frameRef}
            className={`${size} overflow-hidden rounded-full [transform-style:preserve-3d]
              border-4 border-[var(--color-surface-solid)] dark:border-[var(--color-surface-solid-dark)]
              shadow-[var(--shadow-lg)]`}
          >
            <Image
              src={Me}
              width={500}
              height={600}
              className="w-full h-full object-cover"
              alt="Taim Baklouti"
              placeholder="blur"
              quality={85}
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}

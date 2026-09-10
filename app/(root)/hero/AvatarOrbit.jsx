"use client";

import Image from "next/image";
import Me from "@/public/image/taim-front.webp";
import OrbitRings from "./OrbitRings";

/* AvatarOrbit — photo figée (PLAN_HERO_DARK_RED)
 * - transform: none, pas de parallax / float / tilt / scale
 * - photo z-10, anneaux orbitaux z-[5] (OrbitRings), quart de cercle z-0 (page.jsx)
 */
export default function AvatarOrbit({ className = "" }) {
  const size = "w-[240px] h-[240px] md:w-[320px] md:h-[320px]";

  return (
    <div className={`hero-avatar-wrapper relative z-10 ${className}`}>
      <div className="relative [perspective:900px]">
        <OrbitRings />

        <div className="relative z-10">
          <div
            className={`${size} overflow-hidden rounded-full
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

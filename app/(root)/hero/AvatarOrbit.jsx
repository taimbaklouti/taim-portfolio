"use client";

import Image from "next/image";
import Me from "@/public/image/taim-front.webp";
import OrbitRings from "./OrbitRings";

/* AvatarOrbit — orbite centrée DANS la boîte image (PLAN_HERO_DARK_RED)
 * - transform: none, pas de parallax / float / tilt / scale
 * - la boîte image (taille fixe + mx-auto) est le contexte de positionnement :
 *   OrbitRings (z-[5], absolute left-1/2 top-1/2) partage exactement le centre
 *   de la photo (z-10), quart de cercle z-0 (page.jsx)
 */
export default function AvatarOrbit({ className = "" }) {
  const size = "w-[240px] h-[240px] md:w-[320px] md:h-[320px]";

  return (
    <div className={`hero-avatar-wrapper relative z-10 ${className}`}>
      <div className={`relative ${size} mx-auto [perspective:900px]`}>
        <OrbitRings />

        <div
          className="relative z-10 h-full w-full overflow-hidden rounded-full
            border-4 border-[var(--color-surface-solid)] dark:border-[var(--color-surface-solid-dark)]
            shadow-[var(--shadow-lg)]"
        >
          <Image
            src={Me}
            width={500}
            height={600}
            className="h-full w-full object-cover"
            alt="Taim Baklouti"
            placeholder="blur"
            quality={85}
            priority
          />
        </div>
      </div>
    </div>
  );
}

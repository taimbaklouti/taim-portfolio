"use client";

/* OrbitRings — un seul anneau avec points plus grands qui tournent (PLAN_HERO_DARK_RED)
 * - 1 anneau complet léger : border 1px, rayon 150px mobile / 215px desktop (var --ring-r)
 * - 24 particules 8-10px, bg accent, opacity variée, un slot vide pour la respiration
 * - rotation continue via .orbit-spin (CSS, coupée par prefers-reduced-motion)
 * - z-[5] : sous la photo (z-10), au-dessus du quart de cercle (z-0)
 */

const DOTS_COUNT = 24;
const DOT_STEP = 360 / DOTS_COUNT;

export default function OrbitRings() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute left-1/2 top-1/2 z-[5] -translate-x-1/2 -translate-y-1/2
        [--ring-r:150px] md:[--ring-r:215px] will-change-transform"
      style={{ width: "calc(var(--ring-r) * 2)", height: "calc(var(--ring-r) * 2)" }}
    >
      <div className="orbit-spin relative h-full w-full">
        {/* Anneau */}
        <div
          className="absolute inset-0 rounded-full
            border border-[rgba(29,29,31,0.12)] dark:border-[rgba(255,255,255,0.08)]"
        />

        {/* Points orbitaux — tournent avec l'anneau */}
        {Array.from({ length: DOTS_COUNT }).map((_, i) => {
          /* slot vide déterministe (~15°) — respiration */
          if (i === 9) return null;
          const angle = i * DOT_STEP;
          const isBig = i % 4 === 0;
          const opacity = 0.7 + ((i * 7) % 25) / 100;
          return (
            <span
              key={i}
              className={`absolute left-1/2 top-1/2 rounded-full
                bg-[var(--color-accent)] dark:bg-[var(--color-accent-dark)]
                ${isBig ? "w-2.5 h-2.5" : "w-2 h-2"}`}
              style={{
                transform: `rotate(${angle}deg) translateX(var(--ring-r)) rotate(-${angle}deg)`,
                opacity,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

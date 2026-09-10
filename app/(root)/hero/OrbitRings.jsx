"use client";

/* OrbitRings — un seul anneau avec gros points qui tournent (PLAN_HERO_DARK_RED)
 * - 1 anneau complet léger : border 1px, rayon 130px mobile / 172px desktop (var --ring-r)
 *   (photo : rayon ~124px mobile / ~164px desktop bordure incluse → anneau collé au bord,
 *   100/140px demandé aurait caché l'anneau SOUS la photo car z-[5] < z-10)
 * - 24 particules 20px uniformes (w-5 h-5), bg accent, opacity variée, anneau complet sans trou
 * - rotation continue autour de l'image via .orbit-spin (CSS, coupée par prefers-reduced-motion)
 * - z-[5] : sous la photo (z-10), au-dessus du quart de cercle (z-0)
 */

const DOTS_COUNT = 24;
const DOT_STEP = 360 / DOTS_COUNT;

export default function OrbitRings() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute left-1/2 top-1/2 z-[5] -translate-x-1/2 -translate-y-1/2
        [--ring-r:130px] md:[--ring-r:172px] will-change-transform"
      style={{ width: "calc(var(--ring-r) * 2)", height: "calc(var(--ring-r) * 2)" }}
    >
      <div className="orbit-spin relative h-full w-full">
        {/* Anneau */}
        <div
          className="absolute inset-0 rounded-full
            border border-[rgba(29,29,31,0.12)] dark:border-[rgba(255,255,255,0.08)]"
        />

        {/* Points orbitaux — tournent avec l'anneau (24 dots, anneau complet) */}
        {Array.from({ length: DOTS_COUNT }).map((_, i) => {
          const angle = i * DOT_STEP;
          const opacity = 0.7 + ((i * 7) % 25) / 100;
          return (
            <span
              key={i}
              className="absolute left-1/2 top-1/2 rounded-full
                bg-[var(--color-accent)] dark:bg-[var(--color-accent-dark)]
                w-5 h-5"
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

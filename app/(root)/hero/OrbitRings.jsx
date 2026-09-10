"use client";

/* OrbitRings — un seul anneau avec gros points qui tournent (PLAN_HERO_DARK_RED)
 * - 1 anneau complet léger : border 1px, rayon 140px mobile / 180px desktop (var --ring-r)
 *   (photo : rayon ~124px mobile / ~164px desktop bordure incluse ; dots 20px → rayon 10px,
 *   anneau à 140/180px = dots de 130-150/170-190px → gap 6px, plus de chevauchement image)
 * - 24 particules 20px uniformes (w-5 h-5), bg accent, opacity variée, anneau complet sans trou
 * - chaque dot est recentré sur son ancre (translate -50%,-50% final) : sans ça, le
 *   transform-origin par défaut (centre du dot) décale le cercle des dots de (10,10)px,
 *   d'où un côté qui coupe l'image et un grand espace de l'autre
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
        [--ring-r:140px] md:[--ring-r:180px] will-change-transform"
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
                transform: `rotate(${angle}deg) translateX(var(--ring-r)) rotate(-${angle}deg) translate(-50%, -50%)`,
                opacity,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

"use client";

/* OrbitRings — 3 anneaux concentriques + particules (PLAN_HERO_DARK_RED)
 * - anneaux complets légers : border 1px, rayons 128/156/184px mobile, 180/218/256px desktop (gap 38px)
 * - particules 4-6px, bg accent, opacity 0.7-0.9, un slot vide (~26°) par anneau pour la respiration
 * - pulsation douce via .orbit-rings (CSS, coupée par prefers-reduced-motion), pas de rotation lourde
 * - z-[5] : sous la photo (z-10), au-dessus du quart de cercle (z-0)
 */

const RINGS = [
  { radius: "var(--ring-1)", count: 14, gapStart: 18 },
  { radius: "var(--ring-2)", count: 14, gapStart: 84 },
  { radius: "var(--ring-3)", count: 14, gapStart: 150 },
];

export default function OrbitRings() {
  return (
    <div
      aria-hidden="true"
      className="orbit-rings pointer-events-none absolute inset-0 z-[5]
        [--ring-1:128px] [--ring-2:156px] [--ring-3:184px]
        md:[--ring-1:180px] md:[--ring-2:218px] md:[--ring-3:256px]"
    >
      {RINGS.map((ring, ringIndex) => {
        const step = 360 / ring.count;
        return (
          <div
            key={ringIndex}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full
              border border-[rgba(29,29,31,0.12)] dark:border-[rgba(255,255,255,0.08)]"
            style={{
              width: `calc(${ring.radius} * 2)`,
              height: `calc(${ring.radius} * 2)`,
            }}
          >
            {Array.from({ length: ring.count }).map((_, i) => {
              /* slot vide déterministe (~26°) — respiration sans rotation */
              if (i === (ringIndex * 5 + 2) % ring.count) return null;
              const angle = i * step + ring.gapStart;
              const sizeCls = (i + ringIndex) % 3 === 0 ? "w-1.5 h-1.5" : "w-1 h-1";
              const opacity = 0.7 + ((i * 7 + ringIndex * 13) % 20) / 100;
              return (
                <span
                  key={i}
                  className={`absolute left-1/2 top-1/2 rounded-full
                    bg-[var(--color-accent)] dark:bg-[var(--color-accent-dark)] ${sizeCls}`}
                  style={{
                    transform: `rotate(${angle}deg) translateX(${ring.radius}) rotate(-${angle}deg)`,
                    opacity,
                  }}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

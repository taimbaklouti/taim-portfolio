"use client";

/* QuarterCircle — grand quart de cercle PLEIN en coin supérieur droit du hero (PLAN_HERO_DARK_RED)
 * - ancré au hero (page.jsx) : absolute top-0 right-0, PAS dans la colonne avatar
 * - clip : carré w-[min(34vw,480px)] overflow-hidden → ne montre qu'un quart
 * - cercle : PLEIN (bg accent, plus de border), diamètre = 2× le clip (w-[min(68vw,960px)]),
 *   centré sur le coin du clip (top-0 right-0 + translate 50%/-50%) → quart net dans le coin
 * - z-0 : derrière le contenu (z-10) et les anneaux orbitaux (z-[5])
 */
export default function QuarterCircle({ className = "" }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute top-0 right-0 z-0 aspect-square
        w-[min(34vw,480px)] overflow-hidden ${className}`}
    >
      <div
        className="absolute top-0 right-0 aspect-square rounded-full opacity-95
          translate-x-1/2 -translate-y-1/2
          bg-[var(--color-accent)] dark:bg-[var(--color-accent-dark)]
          w-[min(68vw,960px)]"
      />
    </div>
  );
}

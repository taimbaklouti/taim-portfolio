"use client";

/* QuarterCircle — grand quart de cercle en coin supérieur droit (PLAN_HERO_DARK_RED)
 * - clip parent : absolute top-0 right-0 w-[55%] h-[55%] overflow-hidden → ne montre qu'un quart
 * - cercle : diamètre min(78vw,720px) mobile / min(48vw,720px) desktop, centré sur le coin du clip
 *   (translate 50%/-50%) pour que le quart supérieur droit de l'anneau colle au coin
 * - z-0 : derrière la photo (z-10) et les anneaux (z-[5])
 * - prop borderWidth pour tester 60-90px sans toucher au reste
 */
export default function QuarterCircle({ borderWidth = 88, className = "" }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute top-0 right-0 z-0 h-[55%] max-h-[50vh] w-[55%] overflow-hidden ${className}`}
    >
      <div
        className="absolute top-0 right-0 aspect-square rounded-full translate-x-1/2 -translate-y-1/2 opacity-95
          border-[var(--color-accent)] dark:border-[var(--color-accent-dark)]
          w-[min(78vw,720px)] md:w-[min(48vw,720px)]"
        style={{ borderWidth: `${borderWidth}px` }}
      />
    </div>
  );
}

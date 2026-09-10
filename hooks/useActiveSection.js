"use client";
import { useState, useEffect } from "react";

/**
 * useActiveSection — single source of truth for scroll-spy.
 * Shared by Navbar (desktop pill + mobile overlay) and Sidebar
 * (desktop rail + mobile bottom nav) so both highlight the same
 * section at the same time.
 *
 * Proven probe technique (restored from the former Navbar scroll-spy):
 * the active section is the last one whose top has crossed 40% of
 * the viewport. Deterministic function of the scroll position, so
 * every hook instance computes the same value — no desync possible.
 *
 * Why not IntersectionObserver here:
 * - Layouts mount before page sections (dev loading gate hides
 *   sections for ~2000ms), an observer wired once at mount can miss
 *   them forever. This probe re-queries the DOM live on every scroll
 *   tick, so it self-heals as soon as sections appear.
 * - The old thin-band observer went blind in the divider gaps between
 *   sections; "last top above probe" always resolves to a section.
 * - Works with Lenis through the native window scroll event (Lenis
 *   keeps a real native scroll position; the context `lenis` object
 *   is intentionally not required).
 *
 * @param {string[]} sectionIds - ordered section ids, first = fallback
 * @param {{ enabled?: boolean }} options
 * @returns {string} active section id
 */
export const HOME_SECTION_IDS = ["home", "about-preview", "projects-preview", "contact"];

export default function useActiveSection(sectionIds, { enabled = true } = {}) {
  const fallback = sectionIds[0] ?? "";
  const [activeId, setActiveId] = useState(fallback);
  const idsKey = sectionIds.join("|");

  useEffect(() => {
    if (!enabled) return;
    const ids = idsKey.split("|").filter(Boolean);
    if (ids.length === 0) return;

    let raf = 0;
    const compute = () => {
      raf = 0;
      const probe = window.innerHeight * 0.4;
      // Last section whose top crossed the probe line. Never null
      // when at least one section is mounted; keeps previous state
      // while sections are still behind the loading gate.
      let current = null;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= probe) current = id;
      }
      if (current) setActiveId((prev) => (prev === current ? prev : current));
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    // Re-probe after mount: sections appear late (loading gate,
    // lazy images shifting layout). Scrolls self-heal anyway.
    const t1 = setTimeout(compute, 400);
    const t2 = setTimeout(compute, 1200);
    const t3 = setTimeout(compute, 2400);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idsKey, enabled]);

  return activeId;
}

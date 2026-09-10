"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUser, faFolderOpen, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useSpring, useSprings, animated } from "@react-spring/web";
import { useSmoothScroll } from "./SmoothScrollProvider";
import useActiveSection, { HOME_SECTION_IDS } from "@/hooks/useActiveSection";

const navItems = [
  { icon: faHome, label: "Home", id: "home" },
  { icon: faUser, label: "About", id: "about-preview" },
  { icon: faFolderOpen, label: "Projects", id: "projects-preview" },
  { icon: faEnvelope, label: "Contact", id: "contact" },
];

export default function Sidebar() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { scrollTo } = useSmoothScroll();
  // Source unique de scroll-spy partagée avec la Navbar.
  const activeId = useActiveSection(HOME_SECTION_IDS);

  useEffect(() => {
    const idx = navItems.findIndex((item) => item.id === activeId);
    if (idx !== -1) setActiveIndex(idx);
  }, [activeId]);

  const goTo = useCallback(
    (index, id) => {
      setActiveIndex(index);
      const target = `#${id}`;
      try {
        scrollTo(target, { offset: -20 });
      } catch {
        document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
      }
    },
    [scrollTo]
  );

  const sidebarSpring = useSpring({
    from: { opacity: 0, x: -60 },
    to: { opacity: 1, x: 0 },
    config: { mass: 0.8, tension: 200, friction: 22 },
    delay: 100,
  });

  const itemSprings = useSprings(
    navItems.length,
    navItems.map((_, i) => ({
      from: { opacity: 0, x: -30, scale: 0.8 },
      to: { opacity: 1, x: 0, scale: 1 },
      config: { mass: 0.6, tension: 260, friction: 22 },
      delay: 400 + i * 80,
    }))
  );

  // ─── Desktop indicator: real DOM geometry ─────────────────────────
  // The desktop rail's items are sized in rem (h-8 / gap-3) while the root
  // font-size is viewport-dependent (clamp in globals.css), so the item
  // stride varies with screen width. Hardcoding pixel constants drifts
  // (cumulative misalignment per item). Measuring the active <li>'s real
  // offsetTop instead is correct at any rem scale — same math as the
  // mobile indicator's percentage-based positioning, just DOM-measured.
  // Transforms from the entry springs never affect offsetTop, so the
  // measurement stays reliable.
  const itemRefs = useRef([]);
  const [indicatorTop, setIndicatorTop] = useState(0);

  const measureIndicator = useCallback(() => {
    const li = itemRefs.current[activeIndex];
    if (li) setIndicatorTop(li.offsetTop);
  }, [activeIndex]);

  // Re-measure when the active item changes and after mount (sections
  // settle late behind the loading gate — same self-heal pattern as
  // useActiveSection), plus on resize since the root font-size is a
  // function of viewport width.
  useEffect(() => {
    measureIndicator();
    window.addEventListener("resize", measureIndicator);
    const t1 = setTimeout(measureIndicator, 400);
    const t2 = setTimeout(measureIndicator, 1200);
    return () => {
      window.removeEventListener("resize", measureIndicator);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [measureIndicator]);

  const indicatorSpring = useSpring({
    top: indicatorTop,
    config: { mass: 0.5, tension: 280, friction: 26 },
  });

  const MOBILE_INDICATOR_WIDTH = 24;
  const mobileIndicatorLeft = `calc(${activeIndex * 25}% + 12.5% - ${MOBILE_INDICATOR_WIDTH / 2}px)`;
  const mobileIndicatorSpring = useSpring({
    left: mobileIndicatorLeft,
    config: { mass: 0.5, tension: 280, friction: 26 },
  });

  return (
    <>
      {/* ═══════════ DESKTOP SIDEBAR (≥ md) ═══════════ */}
      <animated.div
        style={sidebarSpring}
        className="hidden md:flex fixed z-30 left-3 top-1/2 -translate-y-1/2
          bg-[var(--color-surface)] dark:bg-[var(--color-surface-dark)]
          backdrop-blur-xl
          border border-[var(--color-border)] dark:border-[var(--color-border-dark)]
          rounded-[var(--radius-pill)] py-4 px-2.5
          shadow-[var(--shadow-md)]"
      >
        <ul id="sidebar" className="relative flex flex-col gap-3 items-center">
          <animated.div
            style={indicatorSpring}
            className="absolute -left-[3px] w-1 h-8 bg-[var(--color-accent)] rounded-full
              pointer-events-none z-20"
          />

          {navItems.map((item, index) => (
            <animated.li
              key={item.id}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              data-menuanchor={item.id}
              style={itemSprings[index]}
              className="relative group"
            >
              <button
                aria-label={`Go to ${item.label} section`}
                aria-current={activeIndex === index ? "true" : undefined}
                onClick={() => goTo(index, item.id)}
                className="relative z-10 flex items-center justify-center w-8 h-8
                  rounded-full group transition-all duration-300"
              >
                <span
                  className={`absolute inset-0 rounded-full transition-all duration-300 ${
                    activeIndex === index
                      ? "bg-[var(--color-accent)]/10 scale-100"
                      : "bg-transparent scale-90 group-hover:bg-[var(--color-accent-ghost)] group-hover:scale-100"
                  }`}
                />
                <FontAwesomeIcon
                  icon={item.icon}
                  className={`relative z-10 text-sm transition-all duration-300 ${
                    activeIndex === index
                      ? "text-[var(--color-accent)] scale-110"
                      : "text-[var(--color-ink-3)] dark:text-[var(--color-ink-3-dark)] group-hover:text-[var(--color-accent)] group-hover:scale-110"
                  }`}
                  aria-hidden="true"
                />
              </button>

              <span
                role="tooltip"
                className="absolute left-full ml-2 top-1/2 -translate-y-1/2 origin-left
                  whitespace-nowrap px-3 py-1.5 text-xs font-medium
                  bg-[var(--color-surface-solid)] dark:bg-[var(--color-surface-solid-dark)]
                  text-[var(--color-ink-2)] dark:text-[var(--color-ink-2-dark)]
                  rounded-full
                  border border-[var(--color-border)] dark:border-[var(--color-border-dark)]
                  shadow-[var(--shadow-sm)]
                  opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100
                  transition-all duration-200 pointer-events-none z-30"
              >
                {item.label}
              </span>
            </animated.li>
          ))}
        </ul>
      </animated.div>

      {/* ═══════════ MOBILE BOTTOM NAV (< md) ═══════════ */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-40
          bg-[var(--color-surface)] dark:bg-[var(--color-surface-dark)]
          backdrop-blur-xl
          border-t border-[var(--color-border)] dark:border-[var(--color-border-dark)]"
      >
        <div className="relative grid grid-cols-4 items-center pt-2 pb-3 pb-[max(0.75rem,env(safe-area-inset-bottom,0.75rem))]">
          <animated.div
            style={mobileIndicatorSpring}
            className="absolute top-0 w-6 h-0.5 bg-[var(--color-accent)] rounded-full
              pointer-events-none z-20"
          />

          {navItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => goTo(index, item.id)}
              aria-label={`Go to ${item.label} section`}
              aria-current={activeIndex === index ? "true" : undefined}
              className="flex flex-col items-center justify-center gap-0.5 py-1.5
                transition-all duration-300 group"
            >
              <span
                className={`flex items-center justify-center w-9 h-9 rounded-full transition-all duration-300 ${
                  activeIndex === index
                    ? "bg-[var(--color-accent)]/10 scale-110"
                    : "bg-transparent scale-100 group-active:bg-[var(--color-accent-ghost)] group-active:scale-105"
                }`}
              >
                <FontAwesomeIcon
                  icon={item.icon}
                  className={`text-base transition-all duration-300 ${
                    activeIndex === index
                      ? "text-[var(--color-accent)]"
                      : "text-[var(--color-ink-3)] dark:text-[var(--color-ink-3-dark)] group-active:text-[var(--color-accent)]"
                  }`}
                  aria-hidden="true"
                />
              </span>
              <span
                className={`text-[10px] leading-tight transition-all duration-300 ${
                  activeIndex === index
                    ? "text-[var(--color-accent)] font-semibold"
                    : "text-[var(--color-ink-3)] dark:text-[var(--color-ink-3-dark)] font-medium"
                }`}
              >
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </nav>
    </>
  );
}

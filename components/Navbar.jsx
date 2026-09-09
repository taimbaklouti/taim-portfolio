"use client";
import { useRef, useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { useSpring, useTransition, useSprings, animated } from "@react-spring/web";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import { useSmoothScroll } from "./SmoothScrollProvider";

function useFocusTrap(isActive, containerRef) {
  useEffect(() => {
    if (!isActive || !containerRef.current) return;
    const container = containerRef.current;
    const focusable = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const handleTab = (e) => {
      if (e.key === "Tab") {
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", handleTab);
    first.focus();
    return () => document.removeEventListener("keydown", handleTab);
  }, [isActive, containerRef]);
}

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/#contact", label: "Contact" },
];

export default function Navbar() {
  const menuRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { scrollTo, blockScroll, unblockScroll } = useSmoothScroll();

  useFocusTrap(isMenuOpen, menuRef);

  const toggleMenu = useCallback(() => setIsMenuOpen((p) => !p), []);

  useEffect(() => {
    if (isMenuOpen) blockScroll();
    else unblockScroll();
  }, [isMenuOpen, blockScroll, unblockScroll]);

  const handleContact = useCallback(
    (e) => {
      setIsMenuOpen(false);
      if (pathname === "/") {
        e.preventDefault();
        try {
          scrollTo("#contact", { offset: -20 });
        } catch {
          document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
        }
      }
    },
    [pathname, scrollTo]
  );

  const pillSpring = useSpring({
    from: { y: -80, opacity: 0 },
    to: { y: 0, opacity: 1 },
    config: { mass: 1, tension: 180, friction: 22 },
    delay: 100,
  });

  const overlayTransition = useTransition(isMenuOpen, {
    from: { opacity: 0, scale: 0.92 },
    enter: { opacity: 1, scale: 1 },
    leave: { opacity: 0, scale: 0.92 },
    config: { mass: 0.8, tension: 200, friction: 25 },
  });

  const itemSprings = useSprings(
    navLinks.length,
    (i) => ({
      from: isMenuOpen ? { opacity: 0, x: -30 } : { opacity: 1, x: 0 },
      to: isMenuOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 },
      config: { mass: 0.5, tension: 240, friction: 22 },
      delay: isMenuOpen ? 80 * i : 0,
    }),
    [isMenuOpen]
  );

  useEffect(() => {
    if (!isMenuOpen) return;
    const handleKey = (e) => {
      if (e.key === "Escape") {
        setIsMenuOpen(false);
        const burger = document.querySelector("#burger-btn");
        if (burger) burger.focus();
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isMenuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMenuOpen]);

  return (
    <>
      {/* ─── Floating Pill Nav (Desktop) ─────────────────────────── */}
      <animated.nav
        style={pillSpring}
        aria-label="Main navigation"
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 hidden md:flex items-center gap-1 px-2 py-2
          rounded-full
          bg-[var(--color-surface)] dark:bg-[var(--color-surface-dark)]
          backdrop-blur-xl
          border border-[var(--color-border)] dark:border-[var(--color-border-dark)]
          shadow-[var(--shadow-md)]"
      >
        <Link
          href="/"
          aria-label="Go to home page"
          className="px-4 py-1.5 rounded-full text-sm font-medium
            text-[var(--color-ink)] dark:text-[var(--color-ink-dark)]
            hover:bg-[var(--color-accent-ghost)] dark:hover:bg-[var(--color-accent-ghost-dark)]
            transition-all duration-200"
        >
          <span className="font-display-alt text-lg tracking-tight font-semibold">TB</span>
        </Link>

        <div className="flex items-center">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={link.label === "Contact" ? handleContact : undefined}
              className="px-4 py-1.5 rounded-full text-sm font-medium
                text-[var(--color-ink-2)] dark:text-[var(--color-ink-2-dark)]
                hover:text-[var(--color-accent)] dark:hover:text-[var(--color-accent-dark)]
                hover:bg-[var(--color-accent-ghost)] dark:hover:bg-[var(--color-accent-ghost-dark)]
                transition-all duration-200"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="pl-2 border-l border-[var(--color-border)] dark:border-[var(--color-border-dark)]">
          <ThemeToggle />
        </div>
      </animated.nav>

      {/* ─── Mobile Nav (Burger + Fullscreen Overlay) ─────────────── */}
      <nav
        aria-label="Main navigation"
        className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 h-16
          bg-[var(--color-surface)] dark:bg-[var(--color-surface-dark)]
          backdrop-blur-xl
          border-b border-[var(--color-border)] dark:border-[var(--color-border-dark)]"
      >
        <Link href="/" aria-label="Go to home page">
          <span
            className="text-xl font-display-alt tracking-tight font-semibold
            text-[var(--color-ink)] dark:text-[var(--color-ink-dark)]"
          >
            TB
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            id="burger-btn"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu-overlay"
            onClick={toggleMenu}
            className="relative w-8 h-8 flex flex-col items-center justify-center gap-1 group"
          >
            <motion.span
              animate={isMenuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
              className="block w-5 h-[2px] bg-[var(--color-ink)] dark:bg-[var(--color-ink-dark)] rounded-full transition-colors"
            />
            <motion.span
              animate={
                isMenuOpen ? { rotate: -45, y: -5, width: 20 } : { rotate: 0, y: 0, width: 16 }
              }
              className="block w-4 h-[2px] bg-[var(--color-ink)] dark:bg-[var(--color-ink-dark)] rounded-full transition-colors"
            />
          </button>
        </div>
      </nav>

      {/* ─── Mobile Fullscreen Overlay ────────────────────────────── */}
      {overlayTransition((style, open) =>
        open ? (
          <animated.div
            ref={menuRef}
            id="mobile-menu-overlay"
            role="menu"
            style={style}
            className="fixed inset-0 z-40 md:hidden flex items-center justify-center
              bg-[var(--color-paper)] dark:bg-[var(--color-paper-dark)]
              backdrop-blur-2xl"
          >
            <div className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <animated.div key={link.href} style={itemSprings[i]}>
                  <Link
                    href={link.href}
                    onClick={link.label === "Contact" ? handleContact : () => setIsMenuOpen(false)}
                    className="text-3xl font-display-alt font-semibold
                      text-[var(--color-ink)] dark:text-[var(--color-ink-dark)]
                      hover:text-[var(--color-accent)] dark:hover:text-[var(--color-accent-dark)]
                      transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </animated.div>
              ))}
            </div>
          </animated.div>
        ) : null
      )}
    </>
  );
}

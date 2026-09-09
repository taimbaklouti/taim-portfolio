"use client";

import { useTheme } from "next-themes";
import { useState, useEffect, useCallback } from "react";
import { useTransition, animated } from "@react-spring/web";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

export default function ThemeToggle({ className = "" }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleToggle = useCallback(() => {
    if (!mounted) return;
    setTheme(theme === "dark" ? "light" : "dark");
  }, [mounted, theme, setTheme]);

  const isLight = theme === "light";

  // React-spring transition pour l'icône soleil/lune
  const transitions = useTransition(isLight ? "sun" : "moon", {
    from: { rotate: -90, scale: 0.5, opacity: 0 },
    enter: { rotate: 0, scale: 1, opacity: 1 },
    leave: { rotate: 90, scale: 0.5, opacity: 0 },
    config: { mass: 0.5, tension: 240, friction: 20 },
  });

  if (!mounted) {
    return (
      <button
        aria-label="Toggle theme"
        className={`theme-toggle-icon ${className}`}
        type="button"
        disabled
      >
        <div className="w-5 h-5 rounded-full bg-neutral-300 dark:bg-neutral-600" />
      </button>
    );
  }

  return (
    <button
      aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
      className={`theme-toggle-icon group ${className}`}
      onClick={handleToggle}
      type="button"
    >
      {transitions((style, item) => (
        <animated.div style={style} className="flex items-center justify-center">
          {item === "sun" ? (
            <FontAwesomeIcon
              icon={faSun}
              className="text-base md:text-lg text-amber-500 group-hover:text-amber-400 group-hover:drop-shadow-[0_0_8px_rgba(251,191,36,0.5)] transition-all duration-300"
              aria-hidden="true"
            />
          ) : (
            <FontAwesomeIcon
              icon={faMoon}
              className="text-base md:text-lg text-[var(--color-accent)] dark:text-[var(--color-accent-dark)] group-hover:text-[var(--color-accent-hover)] dark:group-hover:text-[var(--color-accent-hover-dark)] transition-all duration-300"
              aria-hidden="true"
            />
          )}
        </animated.div>
      ))}
    </button>
  );
}

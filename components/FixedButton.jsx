"use client";

import { useSpring, animated, to } from "@react-spring/web";
import Link from "next/link";

const FixedButton = ({ children, href = "/" }) => {
  const [springProps, api] = useSpring(() => ({
    rotate: 0,
    scale: 1,
    config: { mass: 0.5, tension: 300, friction: 22 },
  }));

  return (
    <div className="fixed top-4 left-4 md:left-6 z-[60]">
      <animated.div
        style={{
          transform: to(
            [springProps.rotate, springProps.scale],
            (r, s) => `rotate(${r}deg) scale(${s})`
          ),
        }}
        onPointerEnter={() => api.start({ rotate: -8, scale: 1.12 })}
        onPointerLeave={() => api.start({ rotate: 0, scale: 1 })}
        onPointerDown={() => api.start({ scale: 0.92 })}
        onPointerUp={() => api.start({ rotate: -8, scale: 1.12 })}
      >
        <Link
          href={href}
          className="flex justify-center items-center rounded-full w-8 md:w-10 h-8 md:h-10
            bg-white/70 dark:bg-neutral-900/70 backdrop-blur-md
            border border-[var(--color-border)] dark:border-[var(--color-border-dark)]
            text-[var(--color-ink)] dark:text-[var(--color-ink-dark)]
            hover:text-[var(--color-accent)] dark:hover:text-[var(--color-accent-dark)]
            hover:border-[var(--color-accent-ghost)] dark:hover:border-[var(--color-accent-ghost-dark)]
            shadow-lg transition-all duration-200"
        >
          {children}
        </Link>
      </animated.div>
    </div>
  );
};

export default FixedButton;

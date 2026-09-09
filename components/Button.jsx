"use client";

import { useSpring, animated } from "@react-spring/web";
import Link from "next/link";

const Button = ({ children, variation, href, target, rel, download, ...props }) => {
  const [springProps, api] = useSpring(() => ({
    scale: 1,
    config: { mass: 0.5, tension: 400, friction: 25 },
  }));

  const baseClasses = `font-body-ui inline-flex items-center justify-center gap-2 rounded-full px-6 py-2.5 text-sm font-medium
    transition-all duration-200
    ${
      variation === "primary"
        ? "bg-[var(--color-accent)] dark:bg-[var(--color-accent-dark)] text-white hover:bg-[var(--color-accent-hover)] dark:hover:bg-[var(--color-accent-hover-dark)] shadow-[var(--shadow-glow)]"
        : "bg-transparent border border-[var(--color-border-strong)] dark:border-[var(--color-border-strong-dark)] text-[var(--color-ink)] dark:text-[var(--color-ink-dark)] hover:bg-[var(--color-accent-ghost)] dark:hover:bg-[var(--color-accent-ghost-dark)] hover:border-[var(--color-accent)] dark:hover:border-[var(--color-accent-dark)]"
    }`;

  const handlePointerDown = () => api.start({ scale: 0.95 });
  const handlePointerUp = () => api.start({ scale: 1 });
  const handlePointerEnter = () => api.start({ scale: 1.05 });
  const handlePointerLeave = () => api.start({ scale: 1 });

  const animatedContent = (
    <animated.span
      style={{
        scale: springProps.scale,
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5rem",
      }}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      {children}
    </animated.span>
  );

  if (href) {
    const isDownload = !!download;
    if (href.startsWith("/") && !isDownload) {
      return (
        <Link href={href} className={baseClasses} {...props}>
          {animatedContent}
        </Link>
      );
    }
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        download={download}
        className={baseClasses}
        {...props}
      >
        {animatedContent}
      </a>
    );
  }

  return (
    <button {...props} className={baseClasses}>
      {animatedContent}
    </button>
  );
};

export default Button;

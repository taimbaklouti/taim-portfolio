"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const FloatingNumber = ({ index }) => {
  const x = Math.sin(index * 1.7) * 120;
  const y = Math.cos(index * 2.3) * 80;
  const duration = 3 + (index % 5) * 1.5;

  return (
    <motion.span
      className="absolute text-[var(--color-accent-ghost)]/20 dark:text-[var(--color-accent-ghost-dark)]/20 text-7xl md:text-9xl font-bold pointer-events-none select-none"
      style={{ left: `${15 + ((index * 23) % 70)}%`, top: `${10 + ((index * 17) % 75)}%` }}
      animate={{
        x: [0, x, 0],
        y: [0, y, 0],
        rotate: [0, index % 2 === 0 ? 15 : -15, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      404
    </motion.span>
  );
};

const NotFound = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="relative min-h-screen w-full flex justify-center items-center">
        <div className="text-center">
          <h1 className="text-8xl font-bold">404</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[var(--color-paper-2)] dark:bg-neutral-950 flex justify-center items-center">
      {/* Floating 404 numbers in background */}
      {Array.from({ length: 6 }).map((_, i) => (
        <FloatingNumber key={`float-${i}`} index={i} />
      ))}

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(209, 69, 41, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(209, 69, 41, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Animated gradient orb */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[var(--color-accent)]/20 to-[var(--color-accent-hover)]/10 dark:from-[var(--color-accent-dark)]/10 dark:to-[var(--color-accent-hover-dark)]/5 blur-3xl pointer-events-none"
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -80, 60, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Main content */}
      <div className="relative z-10 mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Large 404 */}
          <motion.h1
            className="text-[10rem] md:text-[16rem] font-bold leading-none mb-4"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-br from-[var(--color-accent)] via-[var(--color-accent-hover)] to-[var(--color-accent)]/70 dark:from-[var(--color-accent-dark)] dark:via-[var(--color-accent-hover-dark)] dark:to-[var(--color-accent-dark)]">
              404
            </span>
          </motion.h1>

          {/* Error message */}
          <motion.div
            className="space-y-4 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-2xl md:text-3xl font-semibold text-[var(--color-accent)] dark:text-[var(--color-accent-dark)] tracking-wide">
              Looks like you&apos;re lost
            </h2>
            <p className="text-lg text-[var(--color-ink-2)]/80 dark:text-[var(--color-ink-2-dark)]/70 max-w-md mx-auto leading-relaxed">
              The page you are looking for is not available or doesn&apos;t exist.
            </p>
          </motion.div>

          {/* Action buttons */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Link
              href="/"
              className="font-body relative inline-flex items-center gap-2 rounded-2xl px-8 py-3 bg-[var(--color-accent)] dark:bg-[var(--color-accent-dark)] text-white hover:bg-[var(--color-accent-hover)] dark:hover:bg-[var(--color-accent-hover-dark)] shadow-md hover:shadow-lg hover:shadow-[var(--color-accent)]/25 transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 font-medium"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Go to Home
            </Link>
            <button
              type="button"
              onClick={() => window.history.back()}
              className="font-body inline-flex items-center gap-2 rounded-2xl px-8 py-3 border-2 border-[var(--color-accent)] dark:border-[var(--color-accent-dark)] text-[var(--color-accent)] dark:text-[var(--color-accent-dark)] hover:bg-[var(--color-accent)] dark:hover:bg-[var(--color-accent-dark)] hover:text-white shadow-md hover:shadow-lg hover:shadow-[var(--color-accent)]/15 transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 font-medium"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Go Back
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom decorative line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--color-accent)]/50 to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
};

export default NotFound;

"use client";

import { useState, useCallback, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

// Lazy-load the game — 0 KB added to initial bundle
const BasketGame = dynamic(() => import("@/components/BasketGame"), {
  loading: () => null,
  ssr: false,
});

/**
 * BasketTrigger — Easter egg floating icon.
 *
 * Renders a small, subtle 🏀 in the bottom-left corner.
 * Clicking it shows a "Shoot your shot?" toast, then opens the game.
 */
function BasketTrigger() {
  const [gameOpen, setGameOpen] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);

  const handleIconClick = useCallback(() => {
    setToastVisible(true);
  }, []);

  const handleToastClick = useCallback(() => {
    setToastVisible(false);
    setGameOpen(true);
  }, []);

  const handleCloseGame = useCallback(() => {
    setGameOpen(false);
  }, []);

  return (
    <>
      {/* ─── Floating 🏀 icon ─────────────────────────────────── */}
      <motion.button
        type="button"
        onClick={handleIconClick}
        className="fixed bottom-6 left-6 z-50 w-10 h-10 rounded-full
          bg-[var(--color-accent-ghost)] dark:bg-[var(--color-accent-ghost-dark)]
          hover:bg-[var(--color-accent)]/20 dark:hover:bg-[var(--color-accent-dark)]/20
          border border-[var(--color-border)] dark:border-[var(--color-border-dark)]
          hover:border-[var(--color-accent)]/40
          flex items-center justify-center cursor-pointer select-none
          transition-all duration-300 hover:scale-110 active:scale-95
          shadow-sm hover:shadow-md"
        whileHover={{ rotate: 12 }}
        aria-label="Open basketball mini-game"
        title="🏀 Easter egg — click to play!"
      >
        <span className="text-lg leading-none">🏀</span>
      </motion.button>

      {/* ─── Toast: "🏀 Shoot your shot?" ──────────────────────── */}
      <AnimatePresence>
        {toastVisible && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-20 left-6 z-50"
          >
            <button
              type="button"
              onClick={handleToastClick}
              className="group flex items-center gap-3 px-5 py-3 rounded-2xl
                bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl
                border border-black/10 dark:border-white/10
                hover:border-[var(--color-accent)]/50
                shadow-2xl shadow-black/30
                transition-all duration-300 hover:scale-105 active:scale-95
                cursor-pointer"
            >
              <span className="text-xl">🏀</span>
              <div className="text-left">
                <p className="text-sm font-medium text-black/90 dark:text-white/90">
                  Shoot your shot?
                </p>
                <p className="text-[10px] font-mono text-black/40 dark:text-white/40">
                  Click to play
                </p>
              </div>
              <motion.span className="text-[var(--color-accent)] text-lg group-hover:translate-x-1 transition-transform duration-200">
                →
              </motion.span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Game overlay ──────────────────────────────────────── */}
      {gameOpen && <BasketGame onClose={handleCloseGame} />}

      {/* Toast auto-dismiss */}
      {toastVisible && <ToastDismisser onDismiss={() => setToastVisible(false)} />}
    </>
  );
}

/**
 * Auto-dismisses the toast after 8 seconds.
 */
function ToastDismisser({ onDismiss }) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, 8000);
    return () => clearTimeout(timer);
  }, [onDismiss]);
  return null;
}

export default memo(BasketTrigger);

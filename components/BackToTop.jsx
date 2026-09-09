"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSmoothScroll } from "@/components/SmoothScrollProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const { scrollTo } = useSmoothScroll();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    try {
      scrollTo(0, { duration: 1.2 });
    } catch {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={handleClick}
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.9 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="fixed bottom-8 right-6 z-40 flex items-center justify-center w-11 h-11 rounded-full
            bg-[var(--color-accent)] dark:bg-[var(--color-accent-dark)] text-white
            shadow-[var(--shadow-glow)] cursor-pointer border-none
            hover:bg-[var(--color-accent-hover)] dark:hover:bg-[var(--color-accent-hover-dark)]
            hover:scale-110 active:scale-95 transition-transform duration-200"
          aria-label="Back to top"
        >
          <FontAwesomeIcon icon={faArrowUp} className="text-sm" aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

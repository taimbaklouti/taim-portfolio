"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSmoothScroll } from "./SmoothScrollProvider";

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function PageTransition({ children }) {
  const pathname = usePathname();
  const prevPathname = useRef(pathname);
  const { scrollTo, isReady } = useSmoothScroll();

  useEffect(() => {
    if (!isReady) return;

    const prev = prevPathname.current;
    prevPathname.current = pathname;

    // Scroll libre : chaque navigation repart en haut + recalcule les triggers
    if (prev !== pathname) {
      try {
        scrollTo(0, { immediate: true });
      } catch {
        window.scrollTo(0, 0);
      }
      // Laisse la transition peindre avant de mesurer
      const t = setTimeout(() => ScrollTrigger.refresh(), 350);
      return () => clearTimeout(t);
    }
  }, [pathname, isReady, scrollTo]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

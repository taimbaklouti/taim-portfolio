"use client";
import { motion } from "framer-motion";
import { Children, cloneElement, isValidElement } from "react";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const slideLeftVariants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const slideRightVariants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

/**
 * AnimatedSection – wrapper that triggers staggered entrance animations
 * on its direct children when scrolled into view.
 *
 * Children (motion components) will automatically receive `variants={itemVariants}`
 * unless they already have a `variants` prop defined (e.g. slideLeftVariants).
 *
 * Usage:
 *   <AnimatedSection className="flex flex-col">
 *     <motion.h1>Title</motion.h1>
 *     <motion.p>Description</motion.p>
 *   </AnimatedSection>
 */
export default function AnimatedSection({
  children,
  className,
  stagger = 0.15,
  margin = "-100px",
  as = "div",
  customVariants = itemVariants,
  ...props
}) {
  const MotionTag = as === "section" ? motion.section : motion.div;

  return (
    <MotionTag
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger } },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin }}
      className={className}
      {...props}
    >
      {Children.map(children, (child) => {
        if (isValidElement(child)) {
          const existingVariants = child.props.variants;
          return cloneElement(child, {
            variants: existingVariants || customVariants,
          });
        }
        return child;
      })}
    </MotionTag>
  );
}

export { itemVariants, slideLeftVariants, slideRightVariants, fadeInVariants };

"use client";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import Me1 from "@/public/image/me1.jpg";
import Me2 from "@/public/image/me2.jpg";
import Me3 from "@/public/image/me3.jpg";
import Hr from "@/components/Hr";
import AnimatedSection from "@/components/AnimatedSection";

function Title() {
  return (
    <div className="mt-10 flex flex-col justify-start items-center w-full pl-10 md:pl-32">
      <div className="flex justify-center items-center flex-col my-5 self-start">
        <Hr variant="long" />
        <h1 className="text-3xl font-bold mt-3 dark:text-white">Who Am I?</h1>
      </div>
    </div>
  );
}

export default function About() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const images = [
    { src: Me1, alt: "Taim Baklouti — Portrait 1" },
    { src: Me2, alt: "Taim Baklouti — Portrait 2" },
    { src: Me3, alt: "Taim Baklouti — Portrait 3" },
  ];

  // Geometric offset layout — no rotations, clean diagonal grid
  // Image 1: Base position (left/middle)
  // Image 2: Top-right (above + right of Image 1)
  // Image 3: Bottom-right (below + right of Image 1)
  const offsets = [
    { x: 0, y: 0 }, // Image 1: base position
    { x: 5.5, y: -4.5 }, // Image 2: top-right diagonal
    { x: 2.5, y: 4.5 }, // Image 3: bottom-right diagonal
  ];

  const baseZ = [10, 15, 20];

  return (
    <>
      <Title />
      <div className="relative mx-auto container px-6 py-10 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* ─── Left Column — Interactive Image Stack ─── */}
          <div className="w-full p-4 md:p-6">
            <motion.div
              className="relative w-full aspect-square max-w-sm mx-auto overflow-visible"
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              {images.map((img, index) => {
                const isHovered = hoveredIndex === index;
                const offset = offsets[index];

                return (
                  <motion.div
                    key={index}
                    className="absolute top-1/2 left-1/2 w-[80%] aspect-square rounded-2xl overflow-hidden cursor-pointer shadow-lg"
                    animate={{
                      x: `calc(-50% + ${offset.x}rem)`,
                      y: `calc(-50% + ${offset.y}rem)`,
                      zIndex: isHovered ? 30 : baseZ[index],
                      boxShadow: isHovered
                        ? "0 25px 35px -8px rgba(0,0,0,0.25), 0 10px 15px -6px rgba(0,0,0,0.15)"
                        : "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.07)",
                      scale: isHovered ? 1.03 : 1,
                    }}
                    transition={{
                      x: { duration: 0.4, ease: "easeOut" },
                      y: { duration: 0.4, ease: "easeOut" },
                      zIndex: { duration: 0.25, ease: "easeOut" },
                      boxShadow: { duration: 0.25, ease: "easeOut" },
                      scale: { duration: 0.3, ease: "easeOut" },
                    }}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(max-width: 768px) 80vw, 40vw"
                      className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                      placeholder="blur"
                      quality={80}
                      loading="lazy"
                    />
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* ─── Right Column — Concise Bio + Read More ─── */}
          <AnimatedSection className="flex flex-col justify-center p-4 md:p-6" stagger={0.15}>
            <h2 className="text-2xl font-bold tracking-wider mb-4 dark:text-white">
              Taim Baklouti
            </h2>
            <div className="bg-white/30 dark:bg-neutral-800/30 backdrop-blur-sm border border-[var(--color-border)] dark:border-[var(--color-border-dark)] rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl hover:shadow-[var(--color-accent)]/5 transition-all duration-300 hover:border-[var(--color-accent-ghost)] dark:hover:border-[var(--color-accent-ghost-dark)]">
              <p className="text-neutral-700 dark:text-neutral-300 text-justify title text-lg leading-relaxed">
                I am a Tunisian high school senior ranked{" "}
                <span className="text-black dark:text-white font-medium">#1 in my class</span> with
                a 15.14/20 average, despite being diagnosed with learning disorders. Rather than
                letting that define my limits, I doubled my effort — founding{" "}
                <span className="text-black dark:text-white font-medium">EduTounes</span>, an
                AI-powered learning platform that won{" "}
                <span className="text-black dark:text-white font-medium">2nd place</span> at a
                national hackathon. Beyond tech, I play for a basketball club competing at the{" "}
                <span className="text-black dark:text-white font-medium">national level</span> and
                have led theater productions with over 120 students. My journey is one of turning
                personal struggles into tools that create real impact.
              </p>

              {/* Read More link */}
              <div className="mt-6">
                <Link
                  href="/about/complete-story"
                  className="group inline-flex items-center gap-2 text-[var(--color-accent)] dark:text-[var(--color-accent-dark)] font-medium hover:text-[var(--color-accent-hover)] dark:hover:text-[var(--color-accent-hover-dark)] transition-all duration-300"
                >
                  <span className="text-sm uppercase tracking-[2px] group-hover:tracking-[3px] transition-all duration-300">
                    En savoir plus sur mon histoire
                  </span>
                  <motion.span
                    className="inline-block"
                    animate={{ x: [0, 4, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    ⟶
                  </motion.span>
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </>
  );
}

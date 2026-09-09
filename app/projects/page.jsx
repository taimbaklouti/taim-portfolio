"use client";
import { useState, useRef, useCallback, useEffect } from "react";

import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/Button";
import Image from "next/image";

// images
import Intervyou1 from "@/public/image/projects/web/intervyou/intervyou-1.png";
import Intervyou2 from "@/public/image/projects/web/intervyou/intervyou-2.jpeg";
import Intervyou3 from "@/public/image/projects/web/intervyou/intervyou-3.webp";
import ProjectAll from "@/public/image/projects.png";
import useDevPageDelay from "@/hooks/useDevPageDelay";
import ProjectsLoading from "./loading";

import Hr from "@/components/Hr";
import AnimatedSection from "@/components/AnimatedSection";
import dynamic from "next/dynamic";
import Projects from "@/json/data.json";
import FixedButton from "@/components/FixedButton";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

gsap.registerPlugin(useGSAP, ScrollTrigger, Flip, DrawSVGPlugin);

// Defer ProjectCard
const ProjectCard = dynamic(() => import("./components/ProjectCard"), {
  loading: () => (
    <div className="w-full aspect-video bg-[var(--color-paper-3)] rounded-xl animate-pulse" />
  ),
});
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const category = {
  1: "Web Development",
  2: "AI & Machine Learning",
  9: "Other",
};

export default function Page() {
  const ready = useDevPageDelay(2000);
  const [activeCategory, setActiveCategory] = useState(1);
  const projects = Projects.Projects.filter((item) => item.show === true);

  const gridRef = useRef(null);
  const flipStateRef = useRef(null);

  // GSAP Flip pour les catégories
  const handleCategoryChange = useCallback((catKey) => {
    // Capturer l'état DOM avant le changement
    if (gridRef.current?.children) {
      flipStateRef.current = Flip.getState(gridRef.current.children, {
        props: "opacity,transform",
      });
    }
    setActiveCategory(catKey);
  }, []);

  // Flip animation après le rendu React
  useEffect(() => {
    if (flipStateRef.current && gridRef.current) {
      Flip.from(flipStateRef.current, {
        duration: 0.5,
        ease: "power2.inOut",
        absolute: true,
        scale: true,
        fade: true,
        onComplete: () => {
          flipStateRef.current = null;
          ScrollTrigger.refresh();
        },
      });
    }
  }, [activeCategory]);

  // DrawSVG decorative line animée au scroll + reveal batch des cartes
  useGSAP(() => {
    gsap.fromTo(
      ".projects-deco-line",
      { drawSVG: "0% 0%" },
      {
        drawSVG: "0% 100%",
        duration: 1.2,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: ".projects-deco-line",
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Reveal galerie : chaque carte monte + fade quand elle entre (une fois)
    ScrollTrigger.batch(".project-card-reveal", {
      start: "top 92%",
      once: true,
      onEnter: (batch) =>
        gsap.fromTo(
          batch,
          { y: 44, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: "power3.out", overwrite: "auto" }
        ),
    });
  });

  if (!ready) return <ProjectsLoading />;

  return (
    <>
      <main className="overflow-hidden">
        <FixedButton href="/#projects-preview">
          <FontAwesomeIcon
            icon={faChevronLeft}
            className="text-[var(--color-ink)] dark:text-[var(--color-ink-dark)]"
            aria-hidden="true"
          />
        </FixedButton>
        <div className="relative h-screen w-full flex items-center justify-center overflow-hidden">
          {/* Animated background image with gradient overlay */}
          <div className="absolute inset-0 z-0">
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: 1.4 }}
              transition={{ duration: 1.2, ease: [0.87, 0, 0.13, 1] }}
              className="relative w-full h-full"
            >
              <Image
                src={ProjectAll}
                alt=""
                fill
                placeholder="blur"
                className="object-cover"
                sizes="100vw"
                quality={85}
                priority
              />
            </motion.div>
            {/* Gradient overlay */}
            <div
              className="absolute inset-0 bg-gradient-to-r from-[var(--color-paper)]/80 via-[var(--color-paper)]/60 to-[var(--color-paper)]/40
              dark:from-[var(--color-paper-dark)]/85 dark:via-[var(--color-paper-dark)]/65 dark:to-[var(--color-paper-dark)]/40"
            />
          </div>

          {/* Content card */}
          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-16 md:pt-6">
            <div className="max-w-xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.87, 0, 0.13, 1] }}
                className="bg-[var(--color-paper)]/75 dark:bg-[var(--color-paper-dark)]/75 backdrop-blur-xl rounded-2xl p-8 md:p-12 shadow-2xl border border-[var(--color-border)] dark:border-[var(--color-border-dark)]"
              >
                <span
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium tracking-wide mb-4
                  bg-[var(--color-accent-ghost)] dark:bg-[var(--color-accent-ghost-dark)]
                  text-[var(--color-accent)] dark:text-[var(--color-accent-dark)]"
                >
                  Selected work
                </span>
                <h1 className="text-[clamp(2.5rem,7vw,5.5rem)] font-bold text-[var(--color-ink)] dark:text-[var(--color-ink-dark)] leading-[1.02] tracking-tight">
                  My Projects
                </h1>
                <Hr align="left" />
                <p className="text-lg md:text-xl mt-6 tracking-wide text-[var(--color-ink-2)] dark:text-[var(--color-ink-2-dark)] leading-relaxed">
                  Projects I&apos;ve built &mdash; from AI platforms to{" "}
                  <span className="text-[var(--color-ink)] dark:text-[var(--color-ink-dark)] font-medium">
                    large-scale theater productions.
                  </span>
                </p>

                {/* Scroll indicator */}
                <motion.button
                  type="button"
                  onClick={() => {
                    document
                      .getElementById("projects-content")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="group mt-12 inline-flex items-center gap-2 text-[var(--color-accent)] dark:text-[var(--color-accent-dark)] font-medium transition-all duration-300 bg-transparent border-none cursor-pointer py-3 px-1 -ml-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.8, ease: [0.87, 0, 0.13, 1] }}
                >
                  <span className="text-xs uppercase tracking-[4px] group-hover:tracking-[5px] transition-all duration-300">
                    Scroll Down
                  </span>
                  <motion.svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    animate={{ y: [0, 3, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <path d="M6 9l6 6 6-6" />
                  </motion.svg>
                </motion.button>
              </motion.div>
            </div>
          </div>
        </div>
        <div
          id="projects-content"
          className="mt-10 flex flex-col justify-start items-center w-full pl-10 md:pl-32"
        >
          <div className="flex justify-center items-center flex-col my-5 self-start ">
            <Hr variant="long"></Hr>
            <h1 className="text-3xl font-bold mt-3 text-[var(--color-ink)] dark:text-[var(--color-ink-dark)]">
              Highlight
            </h1>
          </div>
        </div>
        <div className="relative w-full mx-auto container gap-4 px-10 grid grid-cols-1 md:grid-cols-2 mb-10">
          <AnimatedSection className="flex justify-center items-start flex-col mb-5" stagger={0.2}>
            <div className="w-full">
              {/* Mobile: simple stacked screenshots */}
              <div className="md:hidden grid grid-cols-2 gap-3">
                <div className="aspect-video grayscale hover:grayscale-0 transition-all duration-300 rounded-lg overflow-hidden">
                  <div className="relative w-full h-full">
                    <Image
                      src={Intervyou1}
                      alt="EduTounes screenshot"
                      fill
                      placeholder="blur"
                      className="object-cover"
                      sizes="50vw"
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className="aspect-video grayscale hover:grayscale-0 transition-all duration-300 rounded-lg overflow-hidden">
                  <div className="relative w-full h-full">
                    <Image
                      src={Intervyou3}
                      alt="EduTounes screenshot"
                      fill
                      placeholder="blur"
                      className="object-cover"
                      style={{ objectPosition: "0% 0%" }}
                      sizes="50vw"
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className="col-span-2 aspect-video grayscale hover:grayscale-0 transition-all duration-300 rounded-lg overflow-hidden">
                  <div className="relative w-full h-full">
                    <Image
                      src={Intervyou2}
                      alt="EduTounes screenshot"
                      fill
                      placeholder="blur"
                      className="object-cover"
                      sizes="90vw"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>

              {/* Desktop: artistic absolute layout with hover zoom */}
              <div className="hidden md:block relative w-full aspect-square">
                <div className="absolute top-28 left-10 h-[40%] aspect-video grayscale hover:grayscale-0 transition-all ease duration-300 hover:scale-150 z-10">
                  <motion.div className="relative w-full h-full shadow-lg">
                    <Image
                      src={Intervyou1}
                      alt="EduTounes screenshot"
                      fill
                      placeholder="blur"
                      className="object-cover"
                      sizes="50vw"
                      loading="lazy"
                    />
                  </motion.div>
                </div>
                <div className="absolute top-10 right-28 h-[30%] aspect-video grayscale hover:grayscale-0 transition-all ease duration-300 hover:scale-150">
                  <motion.div className="relative w-full h-full shadow-lg">
                    <Image
                      src={Intervyou3}
                      alt="EduTounes screenshot"
                      fill
                      placeholder="blur"
                      className="object-cover"
                      style={{ objectPosition: "0% 0%" }}
                      sizes="40vw"
                      loading="lazy"
                    />
                  </motion.div>
                </div>
                <div className="absolute bottom-10 md:bottom-26 right-20 h-[35%] aspect-video grayscale hover:grayscale-0 transition-all ease duration-300 hover:scale-150">
                  <motion.div className="relative w-full h-full shadow-lg">
                    <Image
                      src={Intervyou2}
                      alt="EduTounes screenshot"
                      fill
                      placeholder="blur"
                      className="object-cover"
                      sizes="40vw"
                      loading="lazy"
                    />
                  </motion.div>
                </div>
              </div>
            </div>
          </AnimatedSection>
          <AnimatedSection
            className="flex justify-center items-start flex-col mb-5 md:px-10"
            stagger={0.15}
          >
            <motion.h2 className="text-2xl font-bold tracking-wider mb-3 text-[var(--color-ink)] dark:text-[var(--color-ink-dark)]">
              EduTounes — AI Learning Platform
            </motion.h2>
            <motion.p className="text-[var(--color-accent)] dark:text-[var(--color-accent-dark)] text-justify title text-lg">
              An intelligent educational platform that helps Tunisian high school students
              understand difficult subjects through personalized AI explanations. Built with the
              Gemini Pro API and self-taught backend development. Born from my own struggle with
              learning difficulties, EduTounes is designed to democratize access to quality
              educational support in Tunisia.
            </motion.p>
            <motion.div className="mt-3">
              <Button variation="primary" href="/projects/edutounes">
                More
              </Button>
            </motion.div>
          </AnimatedSection>
        </div>
        <div className="mt-16 flex flex-col justify-start items-center w-full pl-10 md:pl-32">
          <div className="flex justify-center items-center flex-col my-5 self-start">
            <Hr variant="long"></Hr>
            <AnimatedSection stagger={0.1}>
              <motion.h1 className="text-3xl font-bold mt-3 text-[var(--color-ink)] dark:text-[var(--color-ink-dark)]">
                Other Note Worthy Projects
              </motion.h1>
            </AnimatedSection>
          </div>
        </div>

        {/* Decorative line — DrawSVG */}
        <svg className="block mx-auto w-32 h-1 mt-8 mb-4" viewBox="0 0 128 4">
          <line
            className="projects-deco-line"
            x1="0"
            y1="2"
            x2="128"
            y2="2"
            stroke="var(--color-accent)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>

        {/* choose category */}
        <AnimatedSection
          className="flex flex-row justify-center items-start flex-wrap gap-3 md:gap-5 my-5"
          stagger={0.1}
        >
          <motion.div className="flex flex-row justify-center items-start flex-wrap gap-3 md:gap-5">
            {Object.keys(category).map((catKey) => (
              <motion.button
                key={catKey}
                type="button"
                aria-pressed={String(activeCategory === catKey)}
                className={`px-4 md:px-6 py-2.5 rounded-full cursor-pointer transition-all duration-300 font-medium text-sm md:text-base tracking-wide shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] focus-visible:ring-offset-2 ${
                  activeCategory === catKey
                    ? "bg-[var(--color-accent)] dark:bg-[var(--color-accent-dark)] text-white shadow-[var(--color-accent)]/20"
                    : "bg-[var(--color-paper-2)] dark:bg-[var(--color-paper-2-dark)] text-[var(--color-ink-2)] dark:text-[var(--color-ink-2-dark)] border border-[var(--color-border)] dark:border-[var(--color-border-dark)] hover:bg-[var(--color-accent-ghost)] dark:hover:bg-[var(--color-accent-ghost-dark)] hover:border-[var(--color-accent-ghost)] dark:hover:border-[var(--color-accent-ghost-dark)]"
                }`}
                onClick={() => handleCategoryChange(catKey)}
              >
                {category[catKey]}
              </motion.button>
            ))}
          </motion.div>
        </AnimatedSection>

        {/* projects — filtrés avant .map() pour que Flip.getState() capture proprement */}
        <div
          ref={gridRef}
          className="w-full mx-auto container gap-6 px-6 md:px-10 grid grid-cols-1 md:grid-cols-2 mb-10"
        >
          {projects
            .filter((p) => p.category.includes(parseInt(activeCategory)))
            .map((project, index) => (
              <ProjectCard project={project} key={project.slug} index={index} />
            ))}
        </div>

        {/* view in archive btn */}
        <AnimatedSection className="flex justify-center items-center flex-col my-5 self-start">
          <motion.div>
            <Button variation="primary" href="/projects/archive">
              View In Archive
            </Button>
          </motion.div>
        </AnimatedSection>
      </main>
    </>
  );
}

"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import FixedButton from "@/components/FixedButton";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import useDevPageDelay from "@/hooks/useDevPageDelay";
import AboutLoading from "./loading";
import dynamic from "next/dynamic";

import Hero from "@/public/image/me2.jpg";
import Hr from "@/components/Hr";
import ErrorBoundary from "@/components/ErrorBoundary";
import HeroAboutAnimation from "./components/HeroAboutAnimation";
import SignatureDrawSVG from "@/components/SignatureDrawSVG";

// Heavy below-fold components — defer until user scrolls near them
const About = dynamic(() => import("./components/about/about"), {
  loading: () => (
    <div className="w-full h-64 bg-[var(--color-paper-3)] rounded-2xl animate-pulse mx-auto container my-10" />
  ),
});

const Skills = dynamic(() => import("./components/skills/skills"), {
  loading: () => (
    <div className="w-full h-80 bg-[var(--color-paper-3)] rounded-2xl animate-pulse mx-auto container my-10" />
  ),
});

const Experience = dynamic(() => import("./components/experience"), {
  loading: () => (
    <div className="w-full h-96 bg-[var(--color-paper-3)] rounded-2xl animate-pulse mx-auto container my-10" />
  ),
});

const Education = dynamic(() => import("./components/education"), {
  loading: () => (
    <div className="w-full h-96 bg-[var(--color-paper-3)] rounded-2xl animate-pulse mx-auto container my-10" />
  ),
});

const Quote = dynamic(() => import("./components/quote/quote"), {
  loading: () => (
    <div className="w-full h-64 bg-[var(--color-paper-3)] rounded-2xl animate-pulse mx-auto container my-10" />
  ),
});

export default function Page() {
  const ready = useDevPageDelay(2000);

  if (!ready) return <AboutLoading />;

  return (
    <>
      <main className="overflow-hidden">
        <FixedButton href="/#about">
          <FontAwesomeIcon
            icon={faChevronLeft}
            className="text-[var(--color-ink)] dark:text-[var(--color-ink-dark)]"
            aria-hidden="true"
          />
        </FixedButton>
        <div className="relative h-screen w-full flex items-center justify-center overflow-hidden">
          {/* Animated background image with parallaxe ScrollTrigger */}
          <div className="absolute inset-0 z-0 about-hero">
            <Image
              src={Hero}
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
              placeholder="blur"
              quality={85}
              priority
            />
            <HeroAboutAnimation />
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
                {" "}
                <h1 className="text-5xl md:text-8xl font-bold text-[var(--color-ink)] dark:text-[var(--color-ink-dark)] leading-tight">
                  About Me
                </h1>
                <Hr align="left" />
                <p className="text-lg md:text-xl mt-6 tracking-wide text-[var(--color-ink-2)] dark:text-[var(--color-ink-2-dark)] leading-relaxed">
                  The story of how learning difficulties became{" "}
                  <span className="text-[var(--color-ink)] dark:text-[var(--color-ink-dark)] font-medium">
                    my greatest motivation.
                  </span>
                </p>
                {/* Sleek scroll indicator */}
                <motion.button
                  type="button"
                  onClick={() => {
                    document
                      .getElementById("about-content")
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
        {/* end hero */}

        {/* about */}
        <div id="about-content">
          <ErrorBoundary>
            <About />
          </ErrorBoundary>
        </div>

        {/* skills */}
        <ErrorBoundary>
          <Skills />
        </ErrorBoundary>

        {/* experience */}
        <ErrorBoundary>
          <Experience />
        </ErrorBoundary>

        {/* Education */}
        <ErrorBoundary>
          <Education />
        </ErrorBoundary>

        {/* Quote */}
        <ErrorBoundary>
          <Quote />
        </ErrorBoundary>

        {/* ── Signature — DrawSVG au scroll ── */}
        <div className="flex justify-center pb-16">
          <SignatureDrawSVG variant="signature" />
        </div>
      </main>
    </>
  );
}

// Copyright (C) 2025 Taim Baklouti
// This file is part of Taim's Portfolio.
// Licensed under the GNU GPL v3.0. See LICENSE for details.

/* Hallmark · Apple + Phantom + Oryzo blend
 * pill geometry · translucent surfaces · soft shadows · clean structure
 */
"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { animate, createSpring } from "animejs";
import useDevPageDelay from "@/hooks/useDevPageDelay";
import RootLoading from "./loading";
import { useSmoothScroll } from "@/components/SmoothScrollProvider";

gsap.registerPlugin(useGSAP, ScrollTrigger);

import Button from "@/components/Button";
import MeAbout from "@/public/image/me2.jpg";
import ProjectAll from "@/public/image/projects.png";
import AnimatedSection from "@/components/AnimatedSection";
import ErrorBoundary from "@/components/ErrorBoundary";
import AnimatedNumber from "@/components/AnimatedNumber";
import BasketTrigger from "@/components/BasketTrigger";
import dynamic from "next/dynamic";

import HeroAnimation from "./hero/HeroAnimation";
import TextReveal from "./hero/TextReveal";
import AvatarOrbit from "./hero/AvatarOrbit";
import QuarterCircle from "./hero/QuarterCircle";
import BackToTop from "@/components/BackToTop";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faArrowDown } from "@fortawesome/free-solid-svg-icons";

const ContactForm = dynamic(() => import("@/components/ContactForm"), {
  loading: () => (
    <div className="w-full h-64 bg-[var(--color-paper-2)] rounded-[var(--radius-xl)] animate-pulse" />
  ),
});

/* ─── Scroll Indicator ────────────────────────────────────────── */
function ScrollIndicator() {
  const [dismissed, setDismissed] = useState(false);
  const { scrollTo } = useSmoothScroll();

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 220) setDismissed(true);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleScroll = () => {
    try {
      scrollTo("#about-preview", { offset: -20 });
    } catch {
      document.querySelector("#about-preview")?.scrollIntoView({ behavior: "smooth" });
    }
    setDismissed(true);
  };

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.button
          type="button"
          onClick={handleScroll}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 cursor-pointer bg-transparent border-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.6, delay: 1.5 } }}
          exit={{ opacity: 0, transition: { duration: 0.4 } }}
          aria-label="Scroll to about section"
        >
          <span className="text-[10px] uppercase tracking-[4px] text-[var(--color-accent)] font-medium font-body-ui">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <FontAwesomeIcon icon={faArrowDown} className="text-[var(--color-accent)] text-sm" />
          </motion.div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/* ─── Social Icons Row ────────────────────────────────────────── */
const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function SocialRow({ className = "" }) {
  const links = [
    { href: "https://github.com/taimbaklouti", icon: faGithub, label: "GitHub" },
    { href: "https://www.linkedin.com/in/taim-alla2023", icon: faLinkedin, label: "LinkedIn" },
    { href: "https://www.instagram.com/taimbaklouti/", icon: faInstagram, label: "Instagram" },
    { href: "mailto:taimallah1106@gmail.com", icon: faEnvelope, label: "Email" },
  ];

  /* Pop élastique animejs — remplace hover:scale CSS pour éviter les conflits transform */
  const pop = (e) => {
    if (reducedMotion()) return;
    animate(e.currentTarget, { scale: 1.18, duration: 280, ease: "out(3)" });
  };
  const press = (e) => {
    if (reducedMotion()) return;
    animate(e.currentTarget, { scale: 0.9, duration: 120, ease: "out(2)" });
  };
  const release = (e) => {
    if (reducedMotion()) return;
    animate(e.currentTarget, {
      scale: 1,
      ease: createSpring({ stiffness: 320, damping: 15 }),
    });
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="me noopener noreferrer"
          aria-label={link.label}
          onMouseEnter={pop}
          onMouseDown={press}
          onMouseUp={pop}
          onMouseLeave={release}
          className="flex items-center justify-center w-10 h-10 rounded-full
            text-[var(--color-ink-2)] dark:text-[var(--color-ink-2-dark)]
            bg-[var(--color-surface)] dark:bg-[var(--color-surface-dark)]
            border border-[var(--color-border)] dark:border-[var(--color-border-dark)]
            hover:bg-[var(--color-accent)] dark:hover:bg-[var(--color-accent-dark)]
            hover:text-white dark:hover:text-white
            hover:border-[var(--color-accent)] dark:hover:border-[var(--color-accent-dark)]
            transition-colors duration-200 will-change-transform"
        >
          <FontAwesomeIcon icon={link.icon} className="text-sm" aria-hidden="true" />
        </a>
      ))}
    </div>
  );
}

/* ─── Main Page ───────────────────────────────────────────────── */
const MyPage = () => {
  const ready = useDevPageDelay(2000);
  const { scrollTo } = useSmoothScroll();

  /* Parallax + zoom doux + titres révélés — transform only, GPU-composé */
  useGSAP(
    () => {
      if (!ready) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // Parallax générique + zoom Apple (scale 1.3 → 1.18) sur les images
      const parallaxEls = gsap.utils.toArray("[data-parallax]");
      parallaxEls.forEach((el) => {
        const speed = parseFloat(el.dataset.parallax || "0.15");
        gsap.fromTo(
          el,
          { yPercent: speed * 100, scale: 1.3 },
          {
            yPercent: -speed * 100,
            scale: 1.18,
            ease: "none",
            scrollTrigger: {
              trigger: el.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });

      // Titres de section révélés au scroll (une seule fois)
      gsap.utils.toArray("[data-reveal-title]").forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: 45, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            ease: "power3.out",
            duration: 0.9,
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
          }
        );
      });
    },
    { dependencies: [ready] }
  );

  useEffect(() => {
    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href");
      if (!id || id.length < 2) return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      try {
        scrollTo(id, { offset: -20 });
      } catch {
        el.scrollIntoView({ behavior: "smooth" });
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [scrollTo]);

  if (!ready) return <RootLoading />;

  return (
    <main className="overflow-x-clip">
      {/* ═══════════ SECTION 1: Hero ═══════════ */}
      <section id="home" className="scroll-mt-24">
        <HeroAnimation>
          <div className="relative w-full min-h-[100svh] flex flex-col justify-center overflow-x-clip px-6 md:px-16 pt-28 md:pt-24 pb-16">
            <div className="relative z-10 w-full max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
                {/* Texte */}
                <div className="lg:col-span-7">
                  {/* Eyebrow pill — statut disponibilité */}
                  <div
                    className="hero-eyebrow mb-5 inline-flex items-center gap-2.5 rounded-full
                      border border-[var(--color-border)] dark:border-[var(--color-border-dark)]
                      bg-[var(--color-surface)] dark:bg-[var(--color-surface-dark)]
                      px-4 py-1.5 backdrop-blur-sm"
                  >
                    <span className="relative flex h-2 w-2" aria-hidden="true">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--color-accent)] opacity-60 animate-ping" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-accent)] dark:bg-[var(--color-accent-dark)]" />
                    </span>
                    <span
                      className="text-xs font-medium uppercase tracking-[3px]
                        text-[var(--color-ink-2)] dark:text-[var(--color-ink-2-dark)] font-body-ui"
                    >
                      AI &amp; Web Engineering Student
                    </span>
                  </div>

                  {/* Nom — typographie oversized, tracking serré */}
                  <TextReveal
                    className="text-[var(--color-ink)] dark:text-[var(--color-ink-dark)]
                      text-[clamp(3.25rem,11vw,8.5rem)] leading-[0.95] font-bold tracking-[-0.04em]
                      overflow-wrap-anywhere min-w-0 mb-6 md:mb-8"
                  >
                    Taim
                    <br />
                    <span className="ember-word">Baklouti</span>
                  </TextReveal>

                  <div className="hero-bio max-w-xl mb-8 md:mb-10">
                    <p
                      className="text-[var(--color-ink-2)] dark:text-[var(--color-ink-2-dark)]
                      text-lg md:text-xl leading-relaxed"
                    >
                      I build <strong className="ember-word font-semibold">EduTounes</strong>, an AI
                      learning platform used by real students — turning my own struggles into tools
                      for others.
                    </p>
                  </div>

                  <div className="hero-cta flex flex-wrap items-center gap-4 mb-8">
                    <Button variation="primary" href="/projects/edutounes">
                      View EduTounes
                    </Button>
                    <Button variation="secondary" href="#contact">
                      Contact
                    </Button>
                  </div>

                  {/* Proof bar — stats compactes intégrées au hero */}
                  <div
                    className="hero-proof mb-8 inline-flex flex-wrap items-center gap-x-6 gap-y-3
                      rounded-[var(--radius-pill)] border border-[var(--color-border)] dark:border-[var(--color-border-dark)]
                      bg-[var(--color-surface)] dark:bg-[var(--color-surface-dark)]
                      px-5 py-3 backdrop-blur-sm shadow-[var(--shadow-sm)]"
                  >
                    <AnimatedNumber
                      value={1}
                      prefix="#"
                      className="font-display-alt text-xl md:text-2xl font-bold text-[var(--color-accent)] dark:text-[var(--color-accent-dark)]"
                      duration={2000}
                      delay={600}
                    />
                    <span className="text-xs md:text-sm text-[var(--color-ink-2)] dark:text-[var(--color-ink-2-dark)] font-body-ui -ml-4">
                      Ranked in Class
                    </span>
                    <span
                      className="hidden sm:block w-px h-6 bg-[var(--color-border-strong)] dark:bg-[var(--color-border-strong-dark)]"
                      aria-hidden="true"
                    />
                    <AnimatedNumber
                      value={15.14}
                      suffix="/20"
                      decimals={2}
                      className="font-display-alt text-xl md:text-2xl font-bold text-[var(--color-accent)] dark:text-[var(--color-accent-dark)]"
                      duration={2000}
                      delay={700}
                    />
                    <span className="text-xs md:text-sm text-[var(--color-ink-2)] dark:text-[var(--color-ink-2-dark)] font-body-ui -ml-4">
                      Average
                    </span>
                    <span
                      className="hidden sm:block w-px h-6 bg-[var(--color-border-strong)] dark:bg-[var(--color-border-strong-dark)]"
                      aria-hidden="true"
                    />
                    <AnimatedNumber
                      value={2}
                      suffix="nd"
                      className="font-display-alt text-xl md:text-2xl font-bold text-[var(--color-accent)] dark:text-[var(--color-accent-dark)]"
                      duration={2000}
                      delay={800}
                    />
                    <span className="text-xs md:text-sm text-[var(--color-ink-2)] dark:text-[var(--color-ink-2-dark)] font-body-ui -ml-4">
                      National Hackathon
                    </span>
                  </div>

                  <div className="hero-social">
                    <SocialRow />
                  </div>
                </div>

                {/* Avatar + quart de cercle (coin supérieur droit, derrière la photo) */}
                <div className="lg:col-span-5 hero-avatar-col relative flex justify-center lg:justify-end">
                  <QuarterCircle />
                  <AvatarOrbit />
                </div>
              </div>
            </div>
          </div>
        </HeroAnimation>
      </section>

      {/* ═══════════ SECTION 2: Bento About Preview ═══════════ */}
      <div
        aria-hidden="true"
        className="mx-auto w-full max-w-5xl px-6 md:px-16 flex items-center gap-4"
      >
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[var(--color-accent)]/40 to-transparent" />
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" />
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[var(--color-accent)]/40 to-transparent" />
      </div>
      <section id="about-preview" className="scroll-mt-24">
        <div className="relative w-full min-h-[80svh] flex items-center justify-center overflow-x-clip px-6 md:px-16 py-24">
          <div className="w-full max-w-5xl mx-auto">
            <AnimatedSection stagger={0.12}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 min-h-[50vh] md:min-h-[60vh]">
                {/* Large image tile — pleine largeur */}
                <motion.div className="md:col-span-3 relative rounded-[var(--radius-xl)] overflow-hidden group min-h-[320px] md:min-h-[420px]">
                  <div data-parallax="0.12" className="absolute inset-0 scale-125">
                    <Image
                      src={MeAbout}
                      fill
                      sizes="(max-width: 768px) 100vw, 66vw"
                      className="object-cover transition-all duration-700 group-hover:scale-105"
                      alt="Taim Baklouti"
                      placeholder="blur"
                      quality={80}
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <h2
                      data-reveal-title
                      className="text-white text-2xl md:text-4xl font-semibold mb-2"
                    >
                      About Me
                    </h2>
                    <p className="text-white/80 text-sm md:text-base max-w-md leading-relaxed">
                      The story of how learning difficulties became my greatest motivation.
                    </p>
                    <div className="mt-4">
                      <Button variation="primary" href="/about">
                        Learn More
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ═══════════ SECTION 4: Gallery Projects Preview ═══════════ */}
      <section id="projects-preview" className="scroll-mt-24">
        {/* Divider band — hairline dégradé */}
        <div className="w-full py-10 md:py-12 px-6 md:px-16">
          <div className="max-w-5xl mx-auto flex items-center gap-6">
            <span className="poster-badge shrink-0">Work</span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[var(--color-accent)]/40 to-[var(--color-border)] dark:to-[var(--color-border-dark)]" />
            <p
              data-reveal-title
              className="ember-word
              text-[clamp(1.5rem,4vw,2.5rem)] leading-[1.05] font-semibold tracking-[-0.025em]"
            >
              All Work
            </p>
            <div className="h-px flex-1 bg-gradient-to-r from-[var(--color-border)] dark:from-[var(--color-border-dark)] via-[var(--color-accent)]/40 to-transparent" />
          </div>
        </div>

        <div className="relative w-full min-h-[80svh] flex items-center justify-center overflow-x-clip px-6 md:px-16 py-24">
          <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
            <AnimatedSection className="order-1 md:order-1" stagger={0.1}>
              <motion.div className="relative aspect-[4/3] rounded-[var(--radius-xl)] overflow-hidden shadow-[var(--shadow-lg)] group">
                <div data-parallax="0.15" className="absolute inset-0 scale-125">
                  <Image
                    src={ProjectAll}
                    fill
                    sizes="(max-width: 768px) 90vw, 40vw"
                    className="object-cover transition-all duration-700 group-hover:scale-105"
                    alt="Taim's Projects"
                    placeholder="blur"
                    quality={80}
                    loading="lazy"
                  />
                </div>
              </motion.div>
            </AnimatedSection>

            <AnimatedSection className="order-2 md:order-2 relative" stagger={0.15}>
              <motion.div>
                <span
                  aria-hidden="true"
                  className="absolute -top-10 right-0 md:-top-14 text-[5rem] md:text-[7rem] leading-none font-bold
                    text-[var(--color-accent-ghost)] dark:text-[var(--color-accent-ghost-dark)] select-none pointer-events-none"
                >
                  02
                </span>
                <span className="poster-badge mb-4 inline-flex">Projects</span>
                <h2
                  className="text-[var(--color-ink)] dark:text-[var(--color-ink-dark)]
                    text-3xl md:text-5xl font-semibold leading-tight mb-4"
                >
                  What I&apos;ve Built
                </h2>
                <p
                  className="text-[var(--color-ink-2)] dark:text-[var(--color-ink-2-dark)]
                  text-base md:text-lg leading-relaxed mb-6"
                >
                  From AI learning platforms to large-scale theater productions — each project
                  reflects a piece of my journey.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button variation="primary" href="/projects">
                    View All Projects
                  </Button>
                </div>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Divider — avant contact */}
      <div
        aria-hidden="true"
        className="mx-auto w-full max-w-5xl px-6 md:px-16 flex items-center gap-4"
      >
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[var(--color-accent)]/40 to-transparent" />
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" />
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[var(--color-accent)]/40 to-transparent" />
      </div>

      <section id="contact" className="scroll-mt-24">
        <div className="relative w-full min-h-[80svh] flex items-center justify-center overflow-x-clip px-6 md:px-16 py-24">
          <div
            aria-hidden="true"
            className="ember-orb ember-orb-b w-[500px] h-[500px] -bottom-40 right-0 opacity-60"
          />
          <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
            <AnimatedSection className="flex flex-col gap-6 relative" stagger={0.15}>
              <motion.div>
                <span
                  aria-hidden="true"
                  className="absolute -top-12 right-0 md:-top-16 text-[5rem] md:text-[7rem] leading-none font-bold
                    text-[var(--color-accent-ghost)] dark:text-[var(--color-accent-ghost-dark)] select-none pointer-events-none"
                >
                  03
                </span>
                <span className="poster-badge mb-4 inline-flex">Contact</span>
                <h2
                  className="text-[var(--color-ink)] dark:text-[var(--color-ink-dark)]
                    text-3xl md:text-5xl font-semibold leading-tight"
                >
                  Get In Touch
                </h2>
              </motion.div>

              <motion.p
                className="text-[var(--color-ink-2)] dark:text-[var(--color-ink-2-dark)]
                text-base leading-relaxed"
              >
                I build AI learning tools used by real students. Open to collaborations, internships
                and ambitious projects — I reply within 48 hours.
              </motion.p>

              <div className="w-full h-px bg-[var(--color-border)] dark:bg-[var(--color-border-dark)]" />

              <motion.div>
                <p className="text-xs uppercase tracking-[3px] text-[var(--color-accent)] mb-1 font-medium font-body-ui">
                  Email
                </p>
                <a
                  href="mailto:taimallah1106@gmail.com"
                  className="text-base font-medium text-[var(--color-ink)] dark:text-[var(--color-ink-dark)]
                    hover:text-[var(--color-accent)] dark:hover:text-[var(--color-accent-dark)]
                    transition-colors duration-200 break-all underline underline-offset-4 decoration-[var(--color-border)] dark:decoration-[var(--color-border-dark)]
                    hover:decoration-[var(--color-accent)] inline-flex items-center gap-2"
                >
                  <span
                    className="inline-block w-2 h-2 rounded-full bg-[var(--color-accent)] dark:bg-[var(--color-accent-dark)] animate-pulse"
                    aria-hidden="true"
                  />
                  taimallah1106@gmail.com
                </a>
              </motion.div>

              <SocialRow />
            </AnimatedSection>

            <AnimatedSection className="flex items-center justify-center" stagger={0.1}>
              <motion.div
                className="w-full bg-[var(--color-surface)] dark:bg-[var(--color-surface-dark)]
                rounded-[var(--radius-xl)] p-6 md:p-8
                border border-[var(--color-border)] dark:border-[var(--color-border-dark)]
                shadow-[var(--shadow-md)]"
              >
                <ErrorBoundary>
                  <ContactForm />
                </ErrorBoundary>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <ScrollIndicator />
      <BackToTop />
      <BasketTrigger />
    </main>
  );
};

export default MyPage;

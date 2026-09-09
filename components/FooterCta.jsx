"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleRight } from "@fortawesome/free-regular-svg-icons";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function FooterCta() {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      tl.fromTo(
        ".footer-cta-label",
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
      ).fromTo(
        ".footer-cta-heading",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
        "-=0.3"
      );
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="flex justify-center items-center flex-col py-20 md:py-28 px-6 self-center min-h-[40vh] w-full"
    >
      <Link href="/#contact">
        <p
          className="footer-cta-label text-sm md:text-base font-medium text-center
            text-[var(--color-accent)] dark:text-[var(--color-accent-dark)]/80
            hover:text-[var(--color-accent-hover)] dark:hover:text-[var(--color-accent-dark)]
            tracking-[0.3rem] md:tracking-[0.5rem] uppercase mb-4 transition-colors duration-300"
        >
          Want something like this?
        </p>
        <h2
          className="footer-cta-heading text-4xl md:text-7xl font-bold
            text-[var(--color-ink)] dark:text-[var(--color-ink-dark)]
            hover:text-[var(--color-accent)] dark:hover:text-[var(--color-accent-dark)]
            transition-colors duration-300 text-center cursor-pointer leading-none
            hover:scale-[1.03] active:scale-[0.97]"
        >
          Get In Touch{" "}
          <FontAwesomeIcon
            icon={faArrowAltCircleRight}
            className="text-3xl md:text-5xl ml-2 inline-block align-middle"
            aria-hidden="true"
          />
        </h2>
      </Link>
    </div>
  );
}

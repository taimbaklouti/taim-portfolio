"use client";

import Link from "next/link";
import Image from "next/image";
import { useSpring, animated, to } from "@react-spring/web";
import { useCallback, useRef } from "react";
import PropTypes from "prop-types";
import BlurImage from "@/public/image/placeholder/blur.jpg";

/* Hallmark · component: gallery-card · genre: editorial · theme: Ember custom
 * states: default · hover · focus · active · disabled · loading · error · success
 * contrast: pass — texte blanc sur overlay noir 60-80%, tags Ember plein
 */
export default function ProjectCard({ project }) {
  const cardRef = useRef(null);

  // React-spring 3D tilt doux (transform uniquement → compatible Flip + GPU)
  const [springProps, api] = useSpring(() => ({
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    glowOpacity: 0,
    config: { mass: 1, tension: 280, friction: 30 },
  }));

  const handleMove = useCallback(
    (e) => {
      if (!cardRef.current || e.pointerType === "touch") return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      api.start({
        rotateX: -y * 6,
        rotateY: x * 6,
        scale: 1.015,
        glowOpacity: 0.12,
      });
    },
    [api]
  );

  const handleLeave = useCallback(() => {
    api.start({
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      glowOpacity: 0,
    });
  }, [api]);

  const excerpt =
    project.desc[0].length > 125 ? `${project.desc[0].slice(0, 125)}...` : project.desc[0];

  return (
    <Link
      href={"projects/" + project.slug}
      aria-label={`${project.title} — case study`}
      className="project-card-reveal group/card block rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] focus-visible:ring-offset-2"
    >
      <animated.div
        ref={cardRef}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{
          transform: to(
            [springProps.rotateX, springProps.rotateY, springProps.scale],
            (rx, ry, s) => `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale(${s})`
          ),
          willChange: "transform",
        }}
        className="relative flex flex-col justify-end w-full aspect-[16/10] overflow-hidden rounded-2xl
          border border-[var(--color-border)] dark:border-[var(--color-border-dark)]
          bg-[var(--color-paper-2)] dark:bg-[var(--color-paper-2-dark)]
          shadow-lg hover:shadow-xl hover:shadow-[var(--color-accent)]/10
          dark:hover:shadow-[var(--color-accent-dark)]/10
          hover:border-[var(--color-accent)]/30 dark:hover:border-[var(--color-accent-dark)]/30
          transition-[border-color,box-shadow] duration-500 cursor-pointer"
      >
        {/* Image gallery — visible, zoom doux */}
        <Image
          src={project.thumbnail}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 90vw, 42vw"
          placeholder="blur"
          className="object-cover scale-100 group-hover/card:scale-105 transition-transform duration-700 ease-out"
          blurDataURL={BlurImage.src}
          loading="lazy"
        />

        {/* Voile lisibilité permanent + renforcé au hover */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent
            opacity-90 group-hover/card:opacity-100 transition-opacity duration-500"
        />

        {/* Glow Ember directionnel */}
        <animated.div
          style={{ opacity: springProps.glowOpacity }}
          className="absolute inset-0 pointer-events-none rounded-2xl"
        >
          <div className="w-full h-full bg-gradient-to-br from-[var(--color-accent)]/20 via-transparent to-transparent" />
        </animated.div>

        {/* Year badge */}
        <div
          className="absolute top-0 left-0 bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-hover)]
            dark:from-[var(--color-accent-dark)] dark:to-[var(--color-accent-hover-dark)]
            px-4 py-2 rounded-br-xl shadow-md z-20"
        >
          <span className="text-white text-sm font-semibold tracking-wider">{project.year}</span>
        </div>

        {/* Contenu — toujours lisible, remonte au hover desktop */}
        <div className="relative z-10 w-full p-5 md:p-6 translate-y-0 md:translate-y-2 group-hover/card:translate-y-0 transition-transform duration-500 ease-out">
          <h3 className="text-white text-xl md:text-2xl font-bold mb-1.5 leading-tight">
            {project.title}
          </h3>
          <p className="text-white/75 text-sm leading-relaxed line-clamp-2 max-w-lg">{excerpt}</p>
          <div className="flex flex-wrap gap-1.5 mt-3">
            {project.tech.slice(0, 4).map((t) => (
              <span
                key={t}
                className="px-2.5 py-0.5 bg-white/15 backdrop-blur-sm text-white text-xs rounded-md border border-white/20 font-medium"
              >
                {t}
              </span>
            ))}
            {project.tech.length > 4 && (
              <span className="px-2.5 py-0.5 text-white/70 text-xs">
                +{project.tech.length - 4}
              </span>
            )}
          </div>
        </div>
      </animated.div>
    </Link>
  );
}

ProjectCard.propTypes = {
  project: PropTypes.object.isRequired,
};

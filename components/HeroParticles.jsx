"use client";

import { useEffect, useRef } from "react";

/* HeroParticles — particules douces bordeaux en fond de hero
 * Canvas léger : ~30 points translucides qui flottent lentement.
 * - pause quand le hero est hors écran (IntersectionObserver)
 * - prefers-reduced-motion → rendu statique (une frame)
 * - pointer-events: none, jamais au-dessus du contenu
 */

export default function HeroParticles({ className = "" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let raf = 0;
    let running = true;
    let visible = true;

    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    const particles = [];
    const COUNT = 30;

    const rand = (min, max) => min + Math.random() * (max - min);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * DPR;
      canvas.height = height * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };

    const initParticles = () => {
      particles.length = 0;
      for (let i = 0; i < COUNT; i++) {
        particles.push({
          x: rand(0, width),
          y: rand(0, height),
          r: rand(1.5, 3.5),
          vx: rand(-0.12, 0.12),
          vy: rand(-0.18, -0.05),
          alpha: rand(0.12, 0.4),
          phase: rand(0, Math.PI * 2),
          speed: rand(0.2, 0.5),
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const accent = getComputedStyle(document.documentElement)
        .getPropertyValue("--color-accent")
        .trim();
      for (const p of particles) {
        const a = p.alpha * (0.6 + 0.4 * Math.sin(p.phase));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = accent || "#b91c1c";
        ctx.globalAlpha = Math.max(0, a);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const step = () => {
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.phase += 0.01 * p.speed;
        if (p.y < -10) {
          p.y = height + 10;
          p.x = rand(0, width);
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
      }
      draw();
    };

    const loop = () => {
      if (running && visible) step();
      raf = requestAnimationFrame(loop);
    };

    const onVisibility = (entries) => {
      visible = entries[0].isIntersecting;
    };

    resize();
    initParticles();

    if (reduced) {
      draw(); // une frame statique, pas de boucle
    } else {
      loop();
    }

    const observer = new IntersectionObserver(onVisibility, { threshold: 0.05 });
    observer.observe(canvas);

    const onResize = () => {
      resize();
      initParticles();
      if (reduced) draw();
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
    />
  );
}

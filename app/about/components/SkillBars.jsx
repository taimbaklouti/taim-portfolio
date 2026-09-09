"use client";

import { useRef, useEffect } from "react";
import { animate } from "animejs";

const skillLevels = {
  languages: [
    { name: "Python", level: 85 },
    { name: "JavaScript", level: 80 },
    { name: "HTML/CSS", level: 85 },
    { name: "Docker", level: 45 },
    { name: "Git/GitHub", level: 70 },
  ],
  technologies: [
    { name: "React", level: 82 },
    { name: "Next.js", level: 80 },
    { name: "TypeScript", level: 60 },
    { name: "Tailwind CSS", level: 85 },
    { name: "Node.js/Express", level: 70 },
    { name: "REST API", level: 72 },
    { name: "Gemini AI", level: 75 },
  ],
  softskills: [
    { name: "Leadership", level: 90 },
    { name: "Project Management", level: 80 },
    { name: "Communication", level: 85 },
    { name: "Team Coordination", level: 82 },
    { name: "Creativity", level: 88 },
  ],
  personal: [
    { name: "Resilience", level: 95 },
    { name: "Self-Directed Learning", level: 92 },
    { name: "Curiosity", level: 90 },
    { name: "Discipline", level: 85 },
    { name: "Teamwork", level: 88 },
  ],
};

function ProgressBar({ name, level, index }) {
  const barRef = useRef(null);
  const labelRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Animer la largeur de la barre
          animate({
            targets: barRef.current,
            width: `${level}%`,
            easing: "easeOutCubic",
            duration: 1200,
            delay: index * 80,
          });

          // Animer le texte du pourcentage
          const data = { current: 0 };
          animate({
            targets: data,
            current: level,
            easing: "easeOutCubic",
            duration: 1200,
            delay: index * 80,
            onUpdate: () => {
              if (labelRef.current) {
                labelRef.current.textContent = `${Math.round(data.current)}%`;
              }
            },
          });

          observer.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [level, index]);

  return (
    <div ref={containerRef} className="mb-3">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-[var(--color-ink)] dark:text-[var(--color-ink-dark)]">
          {name}
        </span>
        <span
          ref={labelRef}
          className="text-xs font-mono text-[var(--color-accent)] dark:text-[var(--color-accent-dark)]"
        >
          0%
        </span>
      </div>
      <div className="h-2 bg-[var(--color-paper-3)] dark:bg-neutral-700 rounded-full overflow-hidden">
        <div
          ref={barRef}
          className="h-full rounded-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-hover)] dark:from-[var(--color-accent-dark)] dark:to-[var(--color-accent-hover-dark)]"
          style={{ width: "0%" }}
        />
      </div>
    </div>
  );
}

const keyMap = {
  "Soft-Skills": "softskills",
  "Personal Strengths": "personal",
};

export default function SkillBars({ category }) {
  const resolvedKey = keyMap[category] || category;
  const skills = skillLevels[resolvedKey] || skillLevels.technologies;

  return (
    <div className="mt-6 p-6 bg-white/30 dark:bg-neutral-800/40 backdrop-blur-sm border border-[var(--color-border)] dark:border-[var(--color-border-dark)] rounded-2xl shadow-sm">
      <h4 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-accent)] dark:text-[var(--color-accent-dark)] mb-4">
        Proficiency
      </h4>
      {skills.map((skill, i) => (
        <ProgressBar key={skill.name} name={skill.name} level={skill.level} index={i} />
      ))}
    </div>
  );
}

"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import AnimatedSection from "@/components/AnimatedSection";
import { CodepenIcon, WebhookIcon, ActivityIcon, MobileIcon } from "./icons";
import SkillBars from "../SkillBars";

const skillCategories = {
  languages: {
    title: "Languages",
    icon: ActivityIcon,
    description: "Programming & markup languages I work with",
    languages: [
      { name: "Python", highlight: true },
      { name: "JavaScript", highlight: true },
      { name: "HTML", highlight: true },
      { name: "CSS", highlight: true },
      { name: "Docker", highlight: false },
      { name: "GitHub", highlight: false },
    ],
    tools: ["Python", "JavaScript", "HTML5", "CSS3", "Docker", "Git", "GitHub"],
  },
  technologies: {
    title: "Technologies",
    icon: CodepenIcon,
    description: "Frameworks, platforms & tools I use",
    languages: [
      { name: "React", highlight: true },
      { name: "Next.js", highlight: true },
      { name: "TypeScript", highlight: true },
      { name: "Tailwind CSS", highlight: true },
      { name: "Node.js", highlight: true },
      { name: "Express", highlight: true },
      { name: "REST API", highlight: true },
      { name: "GraphQL", highlight: false },
      { name: "Docker", highlight: false },
      { name: "GitHub Actions", highlight: false },
      { name: "Google Cloud", highlight: false },
      { name: "Gemini AI", highlight: true },
      { name: "UX Design", highlight: false },
    ],
    tools: ["VS Code", "Vercel", "Postman", "Google Cloud", "GitHub Actions", "Docker"],
  },
  softskills: {
    title: "Soft-Skills",
    icon: WebhookIcon,
    description: "Communication, leadership, and collaboration",
    languages: [
      { name: "Leadership", highlight: true },
      { name: "Project Management", highlight: true },
      { name: "Team Coordination", highlight: true },
      { name: "Communication", highlight: true },
      { name: "Creativity", highlight: true },
    ],
    tools: ["Teamwork", "Problem Solving", "Adaptability", "Public Speaking", "Event Organization"],
  },
  personal: {
    title: "Personal Strengths",
    icon: MobileIcon,
    description: "Core values and personal qualities",
    languages: [
      { name: "Resilience", highlight: true },
      { name: "Self-Directed Learning", highlight: true },
      { name: "Curiosity", highlight: true },
      { name: "Discipline", highlight: false },
      { name: "Teamwork", highlight: false },
    ],
    tools: ["Basketball (National Level)", "Astronomy", "Mathematics", "Mentoring"],
  },
};

function SkillCard({ skill, isSelected, onClick }) {
  const Icon = skill.icon;

  return (
    <motion.div
      onClick={onClick}
      className={`relative cursor-pointer group p-6 rounded-2xl border transition-all duration-300 ${
        isSelected
          ? "bg-white/20 dark:bg-neutral-800/50 border-black dark:border-white border-2 shadow-lg"
          : "bg-white/10 dark:bg-neutral-800/30 border-[var(--color-border)] dark:border-[var(--color-border-dark)] hover:bg-white/20 dark:hover:bg-neutral-800/50 hover:border-[var(--color-accent-ghost)] dark:hover:border-[var(--color-accent-ghost-dark)]"
      }`}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Glow effect - removed for selected state */}
      {!isSelected && (
        <div className="absolute inset-0 rounded-2xl transition-opacity duration-300 opacity-0 group-hover:opacity-50 bg-gradient-to-r from-[var(--color-accent)]/10 to-[var(--color-accent)]/20 blur-xl" />
      )}

      <div className="relative z-10 flex flex-col items-center text-center space-y-4">
        <div
          className={`p-4 rounded-xl transition-all duration-300 ${
            isSelected
              ? "bg-white/30 dark:bg-neutral-700/50"
              : "bg-white/10 dark:bg-neutral-800/40 group-hover:bg-white/20 dark:group-hover:bg-neutral-800/60"
          }`}
        >
          <Icon className="w-8 h-8 text-black dark:text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-black dark:text-white text-lg mb-2">{skill.title}</h3>
          <p className="text-[var(--color-accent)] dark:text-[var(--color-accent-dark)] text-sm leading-relaxed">
            {skill.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
const tagVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1 },
};

function SkillDetails({ selectedSkill }) {
  if (!selectedSkill) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="mt-12 space-y-8"
    >
      {/* Languages & Frameworks Section */}
      <motion.div
        className="bg-white/40 dark:bg-neutral-800/50 border border-[var(--color-border)] dark:border-[var(--color-border-dark)] rounded-2xl p-8 shadow-sm"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-2xl font-semibold text-black dark:text-white mb-6 text-center">
          Technology Stack
        </h3>
        <motion.div
          key={selectedSkill.title}
          className="flex flex-wrap justify-center gap-3"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.04, delayChildren: 0.1 } },
          }}
          initial="hidden"
          animate="show"
        >
          {selectedSkill.languages.map((skill) => (
            <motion.span
              key={skill.name}
              variants={tagVariants}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-default flex items-center gap-2
                ${
                  skill.highlight
                    ? "bg-black dark:bg-neutral-800 text-white shadow-md border-black dark:border-neutral-700 scale-105 z-10 hover:shadow-lg"
                    : "bg-gradient-to-r from-[var(--color-accent-ghost)]/60 dark:from-[var(--color-accent-ghost-dark)]/40 to-white/40 dark:to-neutral-800/60 border border-[var(--color-accent)]/20 dark:border-[var(--color-accent-dark)]/30 text-black dark:text-white hover:bg-white/60 dark:hover:bg-neutral-800/80"
                }`}
            >
              {skill.highlight && (
                <span className="text-yellow-400 text-[10px] animate-pulse">✦</span>
              )}
              {skill.name}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>

      {/* Skill progress bars */}
      <SkillBars category={selectedSkill.title} />

      {/* Tools Section */}
      <motion.div
        className="bg-white/20 dark:bg-neutral-800/30 border border-[var(--color-border)]/50 dark:border-[var(--color-border-dark)] rounded-2xl p-8"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="text-xl font-medium text-[var(--color-accent)] dark:text-[var(--color-accent-dark)] mb-6 text-center uppercase tracking-wider">
          Infrastructure & Tools
        </h3>
        <motion.div
          key={selectedSkill.title + "-tools"}
          className="flex flex-wrap justify-center gap-3"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.04, delayChildren: 0.1 } },
          }}
          initial="hidden"
          animate="show"
        >
          {selectedSkill.tools.map((tool) => (
            <motion.span
              key={tool}
              variants={tagVariants}
              className="px-4 py-1.5 bg-[var(--color-accent-ghost)]/30 dark:bg-[var(--color-accent-ghost-dark)]/40 border border-[var(--color-accent)]/20 dark:border-[var(--color-accent-dark)]/30 rounded-lg text-[var(--color-accent)] dark:text-[var(--color-accent-dark)] text-xs font-medium"
            >
              {tool}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState("technologies");
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="relative"
    >
      <div className="mx-auto container px-6 py-20">
        <AnimatedSection className="text-center space-y-4 mb-16" stagger={0.1}>
          <motion.h2 className="text-5xl font-bold bg-gradient-to-r from-black dark:from-white to-[var(--color-accent)] dark:to-[var(--color-accent-dark)] bg-clip-text text-transparent">
            Skills & Strengths
          </motion.h2>
          <motion.p className="text-[var(--color-accent)] dark:text-[var(--color-accent-dark)] max-w-2xl mx-auto text-lg leading-relaxed">
            From AI development to leadership and resilience &mdash; explore the skills that define
            my journey. Click any category to learn more.
          </motion.p>
        </AnimatedSection>

        {/* Skill Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {Object.entries(skillCategories).map(([key, skill], index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <SkillCard
                skill={skill}
                isSelected={selectedCategory === key}
                onClick={() => setSelectedCategory(key)}
              />
            </motion.div>
          ))}
        </div>

        {/* Skill Details */}
        <AnimatePresence mode="wait">
          <SkillDetails selectedSkill={skillCategories[selectedCategory]} />
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

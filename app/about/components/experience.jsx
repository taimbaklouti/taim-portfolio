"use client";
import Hr from "@/components/Hr";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import AnimatedSection from "@/components/AnimatedSection";

gsap.registerPlugin(useGSAP, ScrollTrigger, DrawSVGPlugin);

const experiences = [
  {
    id: 1,
    startDate: "Dec 2024",
    endDate: "Apr 2025",
    company: '"Andiamo" Project',
    position: "Team Member & Liaison",
    type: "International Exchange",
    location: "Troia, Foggia & Rome, Italy",
    description:
      "Collaborated with Mr. Khaled Ferjeni on this international exchange project, constantly liaising with students from the high school of Foggia, Italy. The project fostered cross-cultural understanding and culminated in a theatrical performance in Troia, Italy during its second phase.",
    skills: [
      "Cross-Cultural Communication",
      "Team Collaboration",
      "Project Management",
      "Adaptability",
      "Leadership",
    ],
  },
  {
    id: 2,
    startDate: "24 Dec 2025",
    endDate: "25 Dec 2025",
    company: "AI SHIFT 2025 Hackathon",
    position: "Team Lead — 2nd Place",
    type: "National Competition",
    location: "Tunisia",
    description:
      "Led a team of four, delegated tasks to present the EduTounes idea during a national hackathon. Integrated several APIs using an enterprise account with Gemini Pro subscription and large Google Drive storage to create an AI-powered online 'brain'. Won 2nd place and used the cash prize to deepen back-end knowledge.",
    skills: [
      "Team Leadership",
      "AI Integration",
      "Python",
      "Gemini Pro API",
      "Rapid Prototyping",
      "Presentation",
    ],
  },
  {
    id: 3,
    startDate: "2024",
    endDate: "2025",
    company: '"Amour, t\'es là ?" Theater Production',
    position: "Project Coordinator",
    type: "Theater Production",
    location: "Tunisia",
    description:
      "Appointed as coordinator by the entire promotion together with teacher Mr. Khaled Ferjeni. Led a team of class referents and project managers (10-person sub-teams responsible for stands and entertainment), overseeing approximately 120 students and 10 simultaneous projects including presentations, theatre pieces, and short films themed around love.",
    skills: [
      "Team Management",
      "Leadership",
      "Coordination",
      "Communication",
      "Event Organization",
      "Creativity",
    ],
  },
  {
    id: 4,
    startDate: "30 Nov 2024",
    endDate: "30 Nov 2024",
    company: "IEEE WIE SESAME SAG",
    position: "Program Participant",
    type: "International Program",
    location: "Tunisia",
    description:
      "Participated in the IEEE Women in Engineering SESAME SAG international engineering and leadership program. This is where the initial idea for 'EduTounes' — an AI-powered educational platform — was born. The winning team would have received recognition and support to launch the project.",
    skills: ["Innovation", "Social Impact", "Engineering", "Networking", "Idea Development"],
  },
  {
    id: 5,
    startDate: "Sep 2024",
    endDate: "Nov 2024",
    company: "Inter-Class Short-Film Contest",
    position: "Director",
    type: "Film & Leadership",
    location: "Tunisia",
    description:
      "Entrusted by mentor Mr. Khaled Ferjeni to direct a short-film for an inter-class competition. Although I did not win 'Best Film', the experience boosted my leadership skills and earned the respect of my classmates.",
    skills: ["Directing", "Creativity", "Leadership", "Storytelling", "Team Coordination"],
  },
  {
    id: 6,
    startDate: "Sep 2019",
    endDate: "Sep 2019",
    company: "Mental Calculation Club",
    position: "Top Certification Earner",
    type: "Academic Competition",
    location: "Tunisia (Qualifiers for Paris 2019)",
    description:
      "Joined a mental-calculation club and took part in the qualifications for the World Mathematical & Logical Games (Paris 2019) held at my school. Earned the highest certification but could not compete internationally due to lack of resources.",
    skills: [
      "Mental Arithmetic",
      "Logical Reasoning",
      "Discipline",
      "Problem Solving",
      "Perseverance",
    ],
  },
  {
    id: 7,
    startDate: "2023",
    endDate: "Present",
    company: "Basketball Club (National League, Tunisia)",
    position: "Player",
    type: "Athletic",
    location: "Tunisia",
    description:
      "Found my true passion at age 14 in basketball after trying many sports (tennis, dance, handball, volleyball). Now play for a club competing in the national basketball league in Tunisia (2023–present), developing discipline, teamwork, strategic thinking, and resilience.",
    skills: ["Discipline", "Teamwork", "Resilience", "Strategic Thinking", "Time Management"],
  },
];

const experiencesChronological = [...experiences].reverse();

function Title() {
  return (
    <div className="mt-16 flex flex-col justify-start items-center w-full pl-10 md:pl-32">
      <div className="flex justify-center items-center flex-col my-5 self-start">
        <Hr variant="long"></Hr>
        <AnimatedSection stagger={0.1}>
          <motion.h1 className="text-3xl font-bold mt-3 dark:text-white">
            Experience & Leadership
          </motion.h1>
        </AnimatedSection>
      </div>
    </div>
  );
}

function TimelineCard({ experience, index, isEven }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      className={`flex ps-10 md:ps-0 ${
        isEven
          ? "md:justify-center md:translate-x-36 lg:translate-x-68"
          : "md:justify-center md:-translate-x-36 lg:-translate-x-68"
      } justify-center mb-4`}
    >
      <div className="bg-gradient-to-r from-black dark:from-neutral-900 to-[var(--color-accent)] dark:to-[var(--color-accent-dark)] text-white px-12 py-3 rounded-xl shadow-lg border border-[var(--color-accent)] dark:border-[var(--color-accent-dark)] min-w-max">
        <div className="flex items-center justify-center gap-6">
          <div className="text-center">
            <div className="text-sm font-bold">{experience.startDate}</div>
            <div className="text-xs text-[var(--color-accent-ghost)] dark:text-[var(--color-accent-dark)]">
              Start
            </div>
          </div>
          <div className="w-px h-8 bg-[var(--color-accent-ghost)] dark:bg-[var(--color-accent-dark)]"></div>
          <div className="text-center">
            <div className="text-sm font-bold">{experience.endDate}</div>
            <div className="text-xs text-[var(--color-accent-ghost)] dark:text-[var(--color-accent-dark)]">
              End
            </div>
          </div>{" "}
          <div className="w-px h-8 bg-[var(--color-accent-ghost)] dark:bg-[var(--color-accent-dark)]"></div>
          <div className="text-center">
            <div className="text-sm font-medium text-[var(--color-accent)] dark:text-[var(--color-accent-dark)]">
              {experience.location}
            </div>
            <div className="text-xs text-[var(--color-accent-ghost)] dark:text-[var(--color-accent-dark)]">
              Location
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ExperienceCard({ experience, index, isEven }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2, duration: 0.6 }}
      className={`relative group ${
        isEven ? "md:ml-auto md:pl-12" : "md:mr-auto md:pr-12"
      } md:w-1/2`}
    >
      {" "}
      {/* Card */}
      <div
        className={`bg-white/20 dark:bg-neutral-800/40 backdrop-blur-sm border border-[var(--color-border)] dark:border-[var(--color-border-dark)] rounded-2xl p-6 shadow-lg 
				hover:shadow-xl hover:bg-white/30 dark:hover:bg-neutral-800/60 transition-all duration-300 ml-12 md:ml-0`}
      >
        {/* Company & Position */}
        <div className="mb-4">
          <h3 className="font-bold text-xl text-black dark:text-white mb-1">
            {experience.company}
          </h3>
          <h4 className="font-medium text-lg text-[var(--color-accent)] dark:text-[var(--color-accent-dark)]">
            {experience.position}
            <span className="text-sm font-normal text-[var(--color-accent)] dark:text-[var(--color-accent-dark)] ml-2">
              • {experience.type}
            </span>
          </h4>
        </div>

        {/* Description */}
        <p className="text-neutral-700 dark:text-neutral-300 text-justify leading-relaxed mb-4">
          {experience.description}
        </p>

        {/* Skills */}
        <div className="flex flex-wrap gap-2">
          {experience.skills.map((skill) => (
            <span
              key={skill}
              className="bg-[var(--color-accent-ghost)] dark:bg-[var(--color-accent-ghost-dark)] hover:bg-[var(--color-accent)]/20 dark:hover:bg-[var(--color-accent-dark)]/20 border border-[var(--color-accent)]/20 dark:border-[var(--color-accent-dark)]/30 text-black dark:text-white px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 backdrop-blur-sm hover:scale-105"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function Wrapper({ children }) {
  return (
    <AnimatedSection className="mx-auto container px-6 py-10">
      <div className="flex justify-center items-center flex-col">{children}</div>
    </AnimatedSection>
  );
}

export default function Experience() {
  const [showAll, setShowAll] = useState(false);
  const timelineRef = useRef(null);
  const displayedExperiences = showAll
    ? experiencesChronological
    : experiencesChronological.slice(0, 3);

  // DrawSVG: timeline line qui se dessine au scroll
  useGSAP(
    () => {
      gsap.fromTo(
        ".timeline-svg-line",
        { drawSVG: "0% 0%" },
        {
          drawSVG: "0% 100%",
          duration: 2,
          ease: "none",
          scrollTrigger: {
            trigger: ".timeline-container",
            start: "top 75%",
            end: "bottom 25%",
            scrub: 1.2,
          },
        }
      );

      // Timeline dots qui pulsent
      gsap.to(".timeline-dot", {
        scale: 1.4,
        duration: 0.8,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    },
    { scope: timelineRef }
  );

  return (
    <>
      <Title />
      <Wrapper>
        <div ref={timelineRef} className="relative w-full max-w-6xl mx-auto timeline-container">
          {/* Desktop: SVG timeline line — DrawSVG */}
          <svg
            className="hidden md:block absolute left-1/2 -translate-x-1/2 w-1"
            style={{ height: `${Math.max(displayedExperiences.length * 180, 200)}px` }}
            viewBox={`0 0 4 ${Math.max(displayedExperiences.length * 180, 200)}`}
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="timeline-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
                <stop offset="60%" stopColor="var(--color-accent-ghost)" stopOpacity="0.6" />
                <stop offset="100%" stopColor="transparent" stopOpacity="0" />
              </linearGradient>
            </defs>
            <line
              className="timeline-svg-line"
              x1="2"
              y1="0"
              x2="2"
              y2="400"
              stroke="url(#timeline-gradient)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
          {/* Mobile timeline line (CSS) */}
          <div className="md:hidden absolute left-0 w-1 bg-gradient-to-b from-black dark:from-neutral-900 via-[var(--color-accent-ghost)] dark:via-[var(--color-accent-dark)] to-transparent h-full"></div>
          {/* Experience cards */}
          <div className="space-y-12 md:space-y-16 relative">
            <AnimatePresence>
              {displayedExperiences.map((experience, index) => (
                <div key={experience.id} className="relative">
                  {/* Timeline period card */}
                  <TimelineCard experience={experience} index={index} isEven={index % 2 === 1} />

                  {/* Timeline dot */}
                  <div
                    className={`timeline-dot absolute w-6 h-6 bg-black dark:bg-neutral-800 rounded-full border-4 border-white dark:border-neutral-700 shadow-lg z-30
                      md:left-1/2 md:-translate-x-1/2 md:top-4
                      left-0 -translate-x-1/2 top-5`}
                  />

                  {/* Experience content card */}
                  <ExperienceCard experience={experience} index={index} isEven={index % 2 === 1} />
                </div>
              ))}
            </AnimatePresence>
          </div>
          {/* Expand/Collapse button */}
          {experiencesChronological.length > 3 && (
            <motion.div
              className="flex justify-center mt-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <button
                onClick={() => setShowAll(!showAll)}
                className="bg-black dark:bg-neutral-800 hover:bg-[var(--color-accent)] dark:hover:bg-[var(--color-accent-dark)] text-white px-8 py-3 rounded-full font-medium 
                  transition-all duration-300 hover:scale-105 shadow-lg flex items-center gap-2"
              >
                {showAll ? (
                  <>
                    Show Less
                    <svg
                      className="w-4 h-4 transform rotate-180"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </>
                ) : (
                  <>
                    View More Experience
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </>
                )}
              </button>
            </motion.div>
          )}{" "}
          {/* Gradient fade effect at bottom */}
          {!showAll && (
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--color-accent-ghost)] dark:from-[var(--color-accent-ghost-dark)]/60 to-transparent pointer-events-none"></div>
          )}
        </div>
      </Wrapper>
    </>
  );
}

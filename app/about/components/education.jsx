import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMedal,
  faGraduationCap,
  faTrophy,
  faAward,
  faStar,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Me4 from "@/public/image/me4.jpeg";
import Me5 from "@/public/image/me5.jpg";
import Me6 from "@/public/image/me6.jpg";
import AnimatedSection from "@/components/AnimatedSection";

function Wrapper({ children }) {
  return (
    <div className="mx-auto container gap-10 p-10 grid grid-cols-1 my-10">
      <AnimatedSection className="flex justify-center items-start flex-col mb-5">
        {children}
      </AnimatedSection>
    </div>
  );
}

export default function Education() {
  const [isExpanded, setIsExpanded] = useState(false);

  const achievementsByYear = {
    2025: [
      {
        icon: faMedal,
        title: "2nd Place — AI SHIFT 2025",
        subtitle: "National Hackathon (AI-Powered Education)",
        date: "2025",
        color: "from-[var(--color-accent)] to-[var(--color-accent-hover)]",
      },
      {
        icon: faStar,
        title: "Ranked #1 in Class",
        subtitle: "Science Track — 15.14/20 Average",
        date: "2024-2025",
        color: "from-yellow-400 to-orange-500",
      },
    ],
    2024: [
      {
        icon: faAward,
        title: "IEEE WIE SESAME SAG",
        subtitle: "International Engineering & Leadership Program",
        date: "2024",
        color: "from-blue-500 to-purple-600",
      },
    ],
    2023: [
      {
        icon: faTrophy,
        title: "National Basketball Player",
        subtitle: "Represented my club at national level",
        date: "2023",
        color: "from-green-500 to-teal-600",
      },
    ],
    2017: [
      {
        icon: faAward,
        title: "International Astronomy Certification",
        subtitle: "Top national score — Age 9",
        date: "2017",
        color: "from-purple-500 to-indigo-600",
      },
    ],
  };

  const allAchievements = Object.entries(achievementsByYear)
    .sort(([a], [b]) => parseInt(b) - parseInt(a))
    .flatMap(([year, achievements]) =>
      achievements.map((achievement) => ({ ...achievement, year }))
    );

  const visibleAchievements = isExpanded ? allAchievements : allAchievements.slice(0, 3);
  const hasMoreAchievements = allAchievements.length > 3;

  return (
    <Wrapper>
      <section className="grid gap-8 md:gap-12">
        {" "}
        {/* Header */}
        <motion.div
          className="text-center space-y-2"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold tracking-tighter dark:text-white">
            Education & Achievements
          </h1>
          <p className="text-[var(--color-accent)] dark:text-[var(--color-accent-dark)] max-w-[800px] mx-auto">
            My academic journey, leadership milestones, and honors.
          </p>
        </motion.div>
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Education Section - Left */}
          <motion.div
            className="px-5"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="font-medium text-lg mb-4">2024 - 2028 (Expected)</div>
            <div>
              <h2 className="font-semibold text-xl dark:text-white">Lycée Ideal — Science Track</h2>
              <h3 className="text-md font-normal mb-3">Tunisia | Baccalaureate 2028</h3>
              <div className="gap-4 mb-4 flex items-stretch md:h-[300px] xl:h-[400px]">
                <div className="flex-[1] transition-all duration-300 ease-in-out hover:flex-[3] group">
                  <Image
                    src={Me5}
                    width={400}
                    height={225}
                    alt="Education"
                    className="rounded-lg w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300 ease-in-out"
                    loading="lazy"
                  />
                </div>
                <div className="flex-[1] transition-all duration-300 ease-in-out hover:flex-[3] group">
                  <Image
                    src={Me4}
                    width={400}
                    height={225}
                    alt="Education"
                    className="rounded-lg w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300 ease-in-out"
                    loading="lazy"
                  />
                </div>
                <div className="flex-[1] transition-all duration-300 ease-in-out hover:flex-[3] group">
                  <Image
                    src={Me6}
                    width={400}
                    height={225}
                    alt="Education"
                    className="rounded-lg w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300 ease-in-out"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-neutral-700 dark:text-neutral-300 text-justify title text-lg leading-relaxed">
                  I have maintained the{" "}
                  <span className="text-black dark:text-white font-medium">
                    #1 rank in my class
                  </span>{" "}
                  throughout high school, with a current average of{" "}
                  <span className="text-black dark:text-white font-medium">15.14/20</span> in the
                  Science track. This achievement is something I am especially proud of because I
                  was diagnosed with learning difficulties early in my academic journey.
                  <br />
                  <br />
                  Rather than letting my diagnosis define my limits, I developed my own study
                  methods, built discipline through{" "}
                  <span className="text-black dark:text-white font-medium">
                    national-level basketball
                  </span>
                  , and found creative ways to grasp complex concepts. This experience taught me
                  that struggle is not a weakness &mdash; it is a teacher.
                  <br />
                  <br />
                  My academic journey is complemented by my work on{" "}
                  <span className="text-black dark:text-white font-medium">EduTounes</span>, an AI
                  learning platform I built to help other students who face similar challenges. I am
                  now preparing to apply for{" "}
                  <span className="text-black dark:text-white font-medium">
                    Computer Science programs
                  </span>{" "}
                  in the USA and Canada on full scholarships.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 mt-4 text-sm">
                <div className="bg-[var(--color-accent-ghost)] dark:bg-[var(--color-accent-ghost-dark)] text-black dark:text-white px-2 py-1 rounded-2xl">
                  Rank: #1 in class
                </div>
                <div className="bg-[var(--color-accent-ghost)] dark:bg-[var(--color-accent-ghost-dark)] text-black dark:text-white px-2 py-1 rounded-2xl">
                  Avg: 15.14/20
                </div>
              </div>
            </div>
          </motion.div>{" "}
          {/* Achievements Section - Right */}
          <motion.div
            className="flex flex-col justify-start px-5 md:px-0"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2 className="font-semibold text-xl mt-7 dark:text-white">Achievements</h2>
            <p className="text-md font-normal mb-3 md:mb-6">Key milestones from my journey.</p>

            {/* Achievements Container */}
            <div className="relative">
              <div className="space-y-4">
                <AnimatePresence>
                  {visibleAchievements.map((achievement, index) => (
                    <motion.div
                      key={`${achievement.year}-${index}`}
                      className="group"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.05,
                      }}
                    >
                      {/* Year indicator */}
                      {index === 0 || visibleAchievements[index - 1]?.year !== achievement.year ? (
                        <div className="flex items-center gap-3 mb-3 mt-2">
                          <div className="w-8 h-8 rounded-full bg-[var(--color-accent-ghost)] dark:bg-[var(--color-accent-ghost-dark)] flex items-center justify-center">
                            <span className="text-xs font-bold text-[var(--color-accent)] dark:text-[var(--color-accent-dark)]">
                              {achievement.year}
                            </span>
                          </div>
                          <div className="flex-1 h-px bg-gradient-to-r from-[var(--color-accent-ghost)] dark:from-[var(--color-accent-ghost-dark)] to-transparent"></div>
                        </div>
                      ) : null}

                      <div className="bg-white/20 dark:bg-neutral-800/40 backdrop-blur-md border border-white/30 dark:border-neutral-700/50 rounded-2xl p-4 shadow-lg hover:bg-white/30 dark:hover:bg-neutral-800/60 transition-all duration-300 hover:shadow-xl hover:shadow-[var(--color-accent)]/10 grayscale hover:grayscale-0 hover:scale-[1.02]">
                        <div className="flex items-center gap-4">
                          <div
                            className={`aspect-square w-10 rounded-full bg-gradient-to-r ${achievement.color} flex items-center justify-center text-primary-foreground transition-all duration-300`}
                          >
                            <FontAwesomeIcon
                              icon={achievement.icon}
                              className="text-white h-5 w-5"
                              aria-hidden="true"
                            />
                          </div>
                          <div>
                            <h3 className="font-medium">{achievement.title}</h3>
                            <p className="text-sm">{achievement.subtitle}</p>
                            <div className="text-xs text-[var(--color-accent)] dark:text-[var(--color-accent-dark)] mt-1">
                              {achievement.date}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Gradient fade when not expanded */}
              {!isExpanded && hasMoreAchievements && (
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[var(--color-accent-ghost)] dark:from-[var(--color-accent-ghost-dark)]/80 to-transparent pointer-events-none"></div>
              )}

              {/* Expand/Collapse Button */}
              {hasMoreAchievements && (
                <motion.div
                  className="flex justify-center mt-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="flex items-center gap-2 px-6 py-3 bg-white/30 dark:bg-neutral-800/50 backdrop-blur-md border border-white/40 dark:border-neutral-700 rounded-full hover:bg-white/40 dark:hover:bg-neutral-800/70 transition-all duration-300 text-sm font-medium shadow-lg hover:shadow-xl"
                  >
                    <span>
                      {isExpanded ? `Show Less` : `Show ${allAchievements.length - 3} More`}
                    </span>
                    <FontAwesomeIcon
                      icon={isExpanded ? faChevronUp : faChevronDown}
                      className="h-3 w-3 transition-transform duration-300"
                      aria-hidden="true"
                    />
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </Wrapper>
  );
}

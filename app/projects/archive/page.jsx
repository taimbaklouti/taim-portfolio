"use client";
import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import {
  faArrowUpRightFromSquare,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import FixedButton from "@/components/FixedButton";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import Projects from "@/json/data.json";
import Link from "next/link";
import useCursorPagination from "@/hooks/useCursorPagination";
import useDevPageDelay from "@/hooks/useDevPageDelay";
import ArchiveLoading from "./loading";

const PAGE_SIZE = 5;
export default function Page() {
  const ready = useDevPageDelay(2000);
  const allProjects = Projects.Projects;
  const { page, hasMore, loadMore, reset, goTo, total, loadedCount } = useCursorPagination(
    allProjects,
    PAGE_SIZE
  );
  const [isExpanded, setIsExpanded] = useState(false);
  const tableRef = useRef(null);

  if (!ready) return <ArchiveLoading />;

  const handleToggle = () => {
    if (isExpanded) {
      reset();
      tableRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      // Offset for mobile fixed nav bar (h-16 = 64px)
      setTimeout(() => window.scrollBy(0, -80), 350);
    } else {
      goTo(total);
    }
    setIsExpanded(!isExpanded);
  };

  const handleLoadMore = () => {
    loadMore();
  };

  return (
    <>
      <main className="overflow-hidden">
        <FixedButton href="/projects">
          <FontAwesomeIcon
            icon={faChevronLeft}
            className="text-black dark:text-white pr-10"
            aria-hidden="true"
          />
        </FixedButton>
        <div className="min-h-screen w-full mt-10 md:mt-0 p-10 flex justify-center items-center flex-col mb-10">
          <div className="flex justify-center items-center flex-col my-5 self-start">
            <motion.div
              className="bg-[var(--color-accent)] dark:bg-[var(--color-accent-dark)] w-28 h-1 rounded-full mb-3 self-start"
              initial={{ opacity: 0, x: -250 }}
              animate={{ opacity: 1, x: 50 }}
              transition={{ delay: 0.5, duration: 1, type: "spring" }}
            />
            <motion.div
              className="bg-[var(--color-accent)] dark:bg-[var(--color-accent-dark)] w-28 h-1 rounded-full"
              initial={{ opacity: 0, x: 200 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 1, type: "spring" }}
            />
            <motion.h1
              className="text-3xl font-bold mt-3 dark:text-white"
              initial={{ opacity: 0, x: -200 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 1, type: "spring" }}
            >
              Archive
            </motion.h1>
            {/* Project count badge */}
            <motion.p
              className="text-sm text-[var(--color-accent)] dark:text-[var(--color-accent-dark)] mt-2 font-medium tracking-wide"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              {total} project{total !== 1 ? "s" : ""}
              {loadedCount < total && ` \u2022 showing ${loadedCount}`}
            </motion.p>
          </div>

          <div className="mx-auto container md:px-10 grid grid-cols-1">
            <div
              ref={tableRef}
              className="overflow-x-auto rounded-xl border border-[var(--color-border)] dark:border-[var(--color-border-dark)] shadow-lg bg-white/40 dark:bg-neutral-900/40 backdrop-blur-sm"
            >
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[var(--color-border)] dark:border-[var(--color-border-dark)] bg-[var(--color-accent-ghost)]/30 dark:bg-[var(--color-accent-ghost-dark)]/30">
                    <th className="text-start text-black dark:text-white font-semibold tracking-wide px-6 py-4">
                      Year
                    </th>
                    <th className="text-start text-black dark:text-white font-semibold tracking-wide px-6 py-4">
                      Title
                    </th>
                    <th className="text-start text-black dark:text-white font-semibold tracking-wide px-6 py-4 hidden md:table-cell">
                      Technology
                    </th>
                    <th className="text-start text-black dark:text-white font-semibold tracking-wide px-6 py-4">
                      Link
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {page.map((project, index) => (
                    <motion.tr
                      key={project.slug}
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className={`border-b border-[var(--color-border)]/50 dark:border-[var(--color-border-dark)]/50 transition-all duration-300 hover:bg-[var(--color-accent-ghost)]/30 dark:hover:bg-[var(--color-accent-ghost-dark)]/30 hover:shadow-sm ${
                        index % 2 === 0 ? "bg-white/30 dark:bg-neutral-800/20" : "bg-transparent"
                      }`}
                    >
                      <td className="text-black dark:text-white px-6 py-4 text-sm font-medium">
                        {project.year}
                      </td>
                      <td className="text-black dark:text-white px-6 py-4">
                        <Link
                          href={`/projects/${project.slug}`}
                          className="font-medium text-[var(--color-accent)] dark:text-[var(--color-accent-dark)] hover:text-[var(--color-accent-hover)] dark:hover:text-[var(--color-accent-hover-dark)] transition-colors duration-200 hover:underline"
                        >
                          {project.title}
                        </Link>
                      </td>
                      <td className="text-black dark:text-white px-6 py-4 text-sm hidden md:table-cell">
                        <div className="flex flex-wrap gap-1.5">
                          {project.tech.slice(0, 3).map((t, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 bg-[var(--color-accent-ghost)] dark:bg-[var(--color-accent-ghost-dark)] text-[var(--color-accent)] dark:text-[var(--color-accent-dark)] rounded-md text-xs font-medium"
                            >
                              {t}
                            </span>
                          ))}
                          {project.tech.length > 3 && (
                            <span className="text-xs text-[var(--color-accent)] dark:text-[var(--color-accent-dark)]">
                              +{project.tech.length - 3}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-row items-center gap-3 text-black dark:text-white">
                          {project.code && (
                            <a
                              href={project.code}
                              title="Link to GitHub"
                              className="hover:text-[var(--color-accent)] dark:hover:text-[var(--color-accent-dark)] transition-colors duration-200"
                            >
                              <FontAwesomeIcon
                                icon={faGithub}
                                className="text-lg"
                                aria-hidden="true"
                              />
                            </a>
                          )}
                          {project.preview && (
                            <a
                              href={project.preview}
                              title="Link to project preview"
                              className="hover:text-[var(--color-accent)] dark:hover:text-[var(--color-accent-dark)] transition-colors duration-200"
                            >
                              <FontAwesomeIcon
                                icon={faArrowUpRightFromSquare}
                                className="text-lg"
                                aria-hidden="true"
                              />
                            </a>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  ))}{" "}
                </tbody>
              </table>
            </div>

            {/* Pagination controls */}
            <div className="flex flex-col items-center gap-3 mt-6">
              {/* Load more button — shown when there are more items to load */}
              {hasMore && (
                <motion.button
                  onClick={handleLoadMore}
                  className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/40 dark:bg-neutral-800/50 border border-[var(--color-border)] dark:border-[var(--color-border-dark)] text-[var(--color-accent)] dark:text-[var(--color-accent-dark)] font-medium text-sm hover:bg-[var(--color-accent-ghost)] dark:hover:bg-[var(--color-accent-ghost-dark)] hover:border-[var(--color-accent)]/30 dark:hover:border-[var(--color-accent-dark)]/30 transition-all duration-300 shadow-sm hover:shadow-md hover:shadow-[var(--color-accent)]/10"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <span>Load more ( {Math.min(PAGE_SIZE, total - loadedCount)} remaining)</span>
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className="text-xs group-hover:translate-y-0.5 transition-transform duration-200"
                    aria-hidden="true"
                  />
                </motion.button>
              )}

              {/* Show all / Show less toggle — visible when there's more than one page */}
              {total > PAGE_SIZE && (
                <motion.button
                  onClick={handleToggle}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs text-[var(--color-accent)] dark:text-[var(--color-accent-dark)]/70 hover:text-[var(--color-accent-hover)] dark:hover:text-[var(--color-accent-hover-dark)] transition-colors duration-200 font-medium tracking-wide uppercase"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <span>{isExpanded ? "Show less" : `Show all ${total}`}</span>
                  <FontAwesomeIcon
                    icon={isExpanded ? faChevronUp : faChevronDown}
                    className="text-[10px]"
                    aria-hidden="true"
                  />
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

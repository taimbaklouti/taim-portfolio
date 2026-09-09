"use client";
import { useState, useEffect, use, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import jsonData from "@/json/data.json";
import useDevPageDelay from "@/hooks/useDevPageDelay";
import ProjectSlugLoading from "./loading";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import {
  faArrowUpRightFromSquare,
  faChevronLeft,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";
import BlurImage from "@/public/image/placeholder/blur.jpg";

function ProjectImage({ src, alt, index }) {
  const [loaded, setLoaded] = useState(false);
  const handleLoad = useCallback(() => setLoaded(true), []);

  return (
    <div className="relative mb-5 max-w-7xl mx-auto w-full">
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-neutral-300 dark:bg-neutral-700 rounded" />
      )}
      <Image
        src={src}
        alt={alt}
        width={1920}
        height={1080}
        className={`h-auto w-full object-contain transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
        placeholder="blur"
        blurDataURL={BlurImage.src}
        loading={index === 0 ? "eager" : "lazy"}
        onLoad={handleLoad}
      />
    </div>
  );
}

function ScrollDownButton() {
  const [isAtBottom, setIsAtBottom] = useState(false);

  // Sync state with actual scroll position on manual scroll
  useEffect(() => {
    const checkScroll = () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const atBottom =
        scrollTop >=
        document.documentElement.scrollHeight - document.documentElement.clientHeight - 5;
      setIsAtBottom(atBottom);
    };
    window.addEventListener("scroll", checkScroll, { passive: true });
    checkScroll(); // initial check
    return () => window.removeEventListener("scroll", checkScroll);
  }, []);

  const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const atBottom =
      scrollTop >=
      document.documentElement.scrollHeight - document.documentElement.clientHeight - 5;
    window.scrollTo({
      top: atBottom ? 0 : document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <div className="fixed bottom-5 left-0 right-0 flex justify-center items-center">
      <motion.div
        className="h-10 w-10 bg-neutral-900 dark:bg-neutral-700 rounded-full flex justify-center items-center cursor-pointer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleScroll}
        aria-label={isAtBottom ? "Scroll to top" : "Scroll to bottom"}
      >
        <FontAwesomeIcon
          icon={isAtBottom ? faChevronUp : faChevronDown}
          className="text-white text-2xl"
          aria-hidden="true"
        />
      </motion.div>
    </div>
  );
}

function Page(props) {
  const ready = useDevPageDelay(2000);
  const params = use(props.params);
  const router = useRouter();
  const [data, setData] = useState(null);

  useEffect(() => {
    const selectedData = jsonData.Projects.find((item) => item.slug === params.slug);
    if (selectedData === undefined) {
      setData("404");
    } else {
      setData(selectedData);
    }
  }, [params.slug]);

  if (!ready) return <ProjectSlugLoading />;

  if (data === "404") {
    return (
      <div className="relative min-h-screen w-full gap-4 p-10 flex justify-center items-center flex-col mb-10">
        <div className="text-center max-w-md">
          <h1 className="text-6xl font-bold text-[var(--color-accent)] dark:text-[var(--color-accent-dark)] mb-4">
            404
          </h1>
          <p className="text-lg text-[var(--color-ink-2)] dark:text-[var(--color-ink-2-dark)] mb-6">
            Project not found.
          </p>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--color-accent)] dark:bg-[var(--color-accent-dark)] text-white font-medium hover:bg-[var(--color-accent-hover)] dark:hover:bg-[var(--color-accent-hover-dark)] transition-colors duration-200"
          >
            ← Back to Projects
          </Link>
        </div>
      </div>
    );
  } else if (!data) {
    return (
      <div className="relative min-h-screen w-full gap-4 p-10 flex justify-center items-center flex-col mb-10">
        <div className="min-h-screen flex justify-center items-center w-full">
          <div className="mx-auto grid grid-cols-1 md:grid-cols-2 w-full">
            <div className="flex justify-center items-start flex-col mb-5 space-y-10 w-ful p-4">
              <div className="animate-pulse bg-neutral-400 dark:bg-neutral-600 h-20 w-full rounded shadow-lg"></div>
              <div className="animate-pulse bg-neutral-400 dark:bg-neutral-600 h-20 w-full rounded shadow-lg"></div>
              <div className="animate-pulse bg-neutral-400 dark:bg-neutral-600 h-20 w-full rounded shadow-lg"></div>
              <div className="animate-pulse bg-neutral-400 dark:bg-neutral-600 h-20 w-full rounded shadow-lg"></div>
              <div className="animate-pulse bg-neutral-400 dark:bg-neutral-600 h-20 w-full rounded shadow-lg"></div>
            </div>
            <div className="flex justify-start items-start flex-col mb-5 w-full p-4">
              <div className="animate-pulse duration-500 shadow-lg bg-neutral-400 dark:bg-neutral-600 rounded w-full h-full"></div>
            </div>
          </div>
        </div>
        {/* images */}
        <div className="mx-auto grid grid-cols-1 p-5 md:p-20 w-full h-auto">
          <div className="w-full h-auto aspect-video">
            <div className="animate-pulse duration-500 shadow-lg bg-neutral-400 dark:bg-neutral-600 h-full w-full rounded"></div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="relative min-h-screen w-full gap-4 p-10 flex justify-center items-center flex-col mb-10 ">
      <button
        onClick={() => router.back()}
        className="fixed top-4 left-4 md:left-6 flex justify-center items-center rounded-full w-10 h-10 transition duration-300 ease-in-out z-50 hover:scale-110 hover:-rotate-6 active:scale-95
          bg-white/70 dark:bg-neutral-900/70 backdrop-blur-md
          border border-[var(--color-border)] dark:border-[var(--color-border-dark)]
          text-[var(--color-ink)] dark:text-[var(--color-ink-dark)]
          hover:text-[var(--color-accent)] dark:hover:text-[var(--color-accent-dark)]
          hover:border-[var(--color-accent-ghost)] dark:hover:border-[var(--color-accent-ghost-dark)]
          shadow-lg"
        aria-label="Go back"
      >
        <FontAwesomeIcon
          icon={faChevronLeft}
          className="text-[var(--color-ink)] dark:text-[var(--color-ink-dark)]"
          aria-hidden="true"
        />
      </button>
      <ScrollDownButton />
      <div className="min-h-screen flex justify-center items-center">
        <div className="mx-auto grid grid-cols-1 md:grid-cols-2 mt-10 md:mt-0">
          <div className="min-h-screen sm:min-h-0 flex justify-center items-start flex-col mb-5 space-y-10 mx-auto">
            <div>
              <h2 className="uppercase font-normal text-lg tracking-[8px] text-neutral-400 dark:text-gray-500">
                Project
              </h2>
              <h1 className="text-4xl font-medium text-neutral-900 dark:text-gray-200">
                {data.title}
              </h1>
            </div>
            <div>
              <h2 className="uppercase font-normal text-lg tracking-[8px] text-neutral-400 dark:text-gray-500">
                Technology
              </h2>
              <p className="text-2xl font-normal text-neutral-900 dark:text-gray-200">
                {data.tech.join(", ")}
              </p>
            </div>
            <div>
              <h2 className="uppercase font-normal text-lg tracking-[8px] text-neutral-400 dark:text-gray-500">
                Year
              </h2>
              <p className="text-2xl font-normal text-neutral-900 dark:text-gray-200">
                {data.year}
              </p>
            </div>
            {data.preview && (
              <div>
                <h2 className="uppercase font-normal text-lg tracking-[8px] text-neutral-400 dark:text-gray-500">
                  Preview
                </h2>
                <p className="text-2xl font-normal text-neutral-900 dark:text-gray-200">
                  <a href={data.preview} target="_blank" rel="noopener noreferrer">
                    Preview{" "}
                    <FontAwesomeIcon
                      icon={faArrowUpRightFromSquare}
                      className="ml-3"
                      aria-hidden="true"
                    />
                  </a>
                </p>
              </div>
            )}
            {data.code && (
              <div>
                <h2 className="uppercase font-normal text-lg tracking-[8px] text-neutral-400 dark:text-gray-500">
                  Source Code
                </h2>
                <p className="text-2xl font-normal text-neutral-900 dark:text-gray-200">
                  <a href={data.code} target="_blank" rel="noopener noreferrer">
                    Github <FontAwesomeIcon icon={faGithub} className="ml-3" aria-hidden="true" />
                  </a>
                </p>
              </div>
            )}
          </div>
          <div className="flex justify-start items-start flex-col mb-5 ">
            <h2 className="uppercase font-normal text-lg tracking-[8px] text-neutral-400 dark:text-gray-500">
              Description
            </h2>
            {data.desc.map((desc, index) => (
              <p
                key={`desc-${index}`}
                className="text-xl text-justify tracking-wide font-normal text-neutral-700 dark:text-neutral-300 leading-relaxed mb-5"
              >
                {desc}
              </p>
            ))}
          </div>
        </div>
      </div>
      {/* images */}
      <div className="mx-auto grid grid-cols-1 p-5 md:p-20 w-full">
        <div className="w-full h-auto text-center flex flex-col justify-center ">
          {data.images.map((image, index) => (
            <ProjectImage
              key={image}
              src={image}
              alt={`${data.title} — Image ${index + 1}`}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Page;

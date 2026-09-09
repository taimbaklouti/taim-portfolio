"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import FixedButton from "@/components/FixedButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import Hr from "@/components/Hr";
import Me1 from "@/public/image/me1.jpg";
import Me2 from "@/public/image/me2.jpg";
import Me3 from "@/public/image/me3.jpg";

export default function CompleteStory() {
  return (
    <main className="overflow-hidden min-h-screen">
      <FixedButton href="/about">
        <FontAwesomeIcon
          icon={faChevronLeft}
          className="text-black dark:text-white pr-10"
          aria-hidden="true"
        />
      </FixedButton>

      {/* Hero */}
      <div className="relative pt-28 pb-12 md:pt-36 md:pb-20 w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-[var(--color-accent-ghost)]/30 to-transparent dark:from-neutral-900/80 dark:via-neutral-900/40 dark:to-transparent pointer-events-none" />
        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 md:px-16 text-center">
          <motion.h1
            className="text-4xl md:text-6xl font-bold text-black dark:text-white leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "circOut" }}
          >
            Mon Histoire Complète
          </motion.h1>
          <motion.div
            className="flex justify-center mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Hr align="left" />
          </motion.div>
          <motion.p
            className="text-lg md:text-xl mt-6 text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            The full story of how learning difficulties became my greatest motivation.
          </motion.p>
        </div>
      </div>

      {/* Content */}
      <div className="w-full max-w-4xl mx-auto px-6 md:px-16 pb-20">
        <motion.div
          className="bg-white/40 dark:bg-neutral-900/40 backdrop-blur-sm border border-[var(--color-border)] dark:border-[var(--color-border-dark)] rounded-2xl p-6 md:p-10 shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "circOut" }}
        >
          {/* Images gallery */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
            <div className="aspect-square rounded-xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-500">
              <div className="relative w-full h-full">
                <Image
                  src={Me1}
                  alt="Taim Baklouti"
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover"
                  placeholder="blur"
                  quality={80}
                />
              </div>
            </div>
            <div className="aspect-square rounded-xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-500">
              <div className="relative w-full h-full">
                <Image
                  src={Me2}
                  alt="Taim Baklouti"
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover"
                  placeholder="blur"
                  quality={80}
                />
              </div>
            </div>
            <div className="col-span-2 md:col-span-1 aspect-square rounded-xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-500">
              <div className="relative w-full h-full">
                <Image
                  src={Me3}
                  alt="Taim Baklouti"
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover"
                  placeholder="blur"
                  quality={80}
                />
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold tracking-wider mb-6 dark:text-white">Taim Baklouti</h2>

          {/* === Full original biography text, verbatim === */}
          <div className="space-y-6 text-neutral-700 dark:text-neutral-300 text-justify title text-lg leading-relaxed">
            <p>
              Having learning disorders (diagnosed), it was harder for me to climb the stairs.
              Therefore I doubled my effort to achieve good grades. I joined a{" "}
              <span className="text-black dark:text-white font-medium">
                mental-calculation club
              </span>
              and took part in the qualifications for the{" "}
              <span className="text-black dark:text-white font-medium">
                World Mathematical &amp; Logical Games (Paris 2019)
              </span>
              , held at my school, earning the highest certification, but I could not compete due to
              lack of resources. At age{" "}
              <span className="text-black dark:text-white font-medium">9</span>, my passion for
              science sparked. I started reading science magazines for children, then grew
              interested in astronomy and everyday physical phenomena. I continued reading more
              books and magazines, buying or borrowing older copies from my cousins and parents.
            </p>

            <p>
              Quickly, after I got access to my mother&rsquo;s laptop, I discovered the Internet,
              began following the latest research news, reading forums, groups, blogs and anything
              that could interest me. At the start of my 10th year I learned{" "}
              <span className="text-black dark:text-white font-medium">Scratch 2.0</span>
              in school, became hooked, and started learning{" "}
              <span className="text-black dark:text-white font-medium">HTML, CSS and Python</span>
              from YouTube tutorials. Over the following years I kept expanding my horizons.
            </p>

            <p>
              At high-school entry I took part in{" "}
              <span className="text-black dark:text-white font-medium">IEEE WIE SESAME SAG</span>,
              where the idea of{" "}
              <span className="text-black dark:text-white font-medium">
                &ldquo;EduTounes&rdquo;
              </span>
              &nbsp;&mdash; an educational platform &mdash; was born. I was excited because the
              winning team would receive recognition and support to launch the project. However, the
              team was focused on mobile apps and refused to collaborate, even though I would have
              loved to turn the idea into a mobile app. Meanwhile I helped with the{" "}
              <span className="text-black dark:text-white font-medium">&ldquo;Andiamo&rdquo;</span>
              project together with my mentor{" "}
              <span className="text-black dark:text-white font-medium">Mr. Khaled Ferjeni</span>,
              constantly liaising with students from the high school of Foggia. At the same time he
              entrusted me with directing a short-film for an inter-class competition. Although I
              did not win &ldquo;Best Film&rdquo;, the experience boosted my leadership and earned
              the respect of my classmates. Consequently, almost the entire promotion, together with
              my teacher Mr. Khaled, appointed me as{" "}
              <span className="text-black dark:text-white font-medium">coordinator</span>
              of the project{" "}
              <span className="text-black dark:text-white font-medium">
                &ldquo;Amour, t&rsquo;es l&agrave; ?&rdquo;
              </span>
              . I led a team of referents (by class) and project managers (10-person sub-teams
              responsible for stands and entertainment), overseeing{" "}
              <span className="text-black dark:text-white font-medium">&asymp;120 students</span>
              and{" "}
              <span className="text-black dark:text-white font-medium">
                10 simultaneous projects
              </span>
              (theatre pieces, short films) themed around love. The second phase of
              &ldquo;Andiamo&rdquo; culminated in a theatrical performance in{" "}
              <span className="text-black dark:text-white font-medium">Troia (Italy)</span>.
            </p>

            <p>
              In my second year of high-school I focused on research and self-development. I
              completed{" "}
              <span className="text-black dark:text-white font-medium">two Coursera courses</span>
              and built a functional EduTounes prototype during a hackathon, earning{" "}
              <span className="text-black dark:text-white font-medium">2nd place</span>. This was
              one of the most rewarding experiences of my life: I led a team of four, delegated
              tasks to present the idea, and, thanks to an enterprise account that included a{" "}
              <span className="text-black dark:text-white font-medium">Gemini Pro</span>
              subscription and large Google Drive storage, integrated several APIs and created an
              online &ldquo;brain&rdquo; based on AI to make the site more performant. I also used
              the cash prize to deepen my back-end knowledge.
            </p>

            <p>
              I have spent my life trying many sports (tennis, dance, handball, volleyball) but
              found my true passion at age{" "}
              <span className="text-black dark:text-white font-medium">14</span>
              in <span className="text-black dark:text-white font-medium">basketball</span>. I now
              play for a{" "}
              <span className="text-black dark:text-white font-medium">
                basketball club competing at the national level
              </span>
              (2023&ndash;present) based in Tunisia.
            </p>
          </div>

          {/* Back link */}
          <div className="mt-10 pt-8 border-t border-[var(--color-border)] dark:border-[var(--color-border-dark)]">
            <Link
              href="/about"
              className="group inline-flex items-center gap-2 text-[var(--color-accent)] dark:text-[var(--color-accent-dark)] font-medium hover:text-[var(--color-accent-hover)] dark:hover:text-[var(--color-accent-hover-dark)] transition-all duration-300"
            >
              <motion.span
                className="inline-block"
                animate={{ x: [-3, 0, -3] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                ←
              </motion.span>
              <span className="text-sm uppercase tracking-[2px] group-hover:tracking-[3px] transition-all duration-300">
                Back to About
              </span>
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

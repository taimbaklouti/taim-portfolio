"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import TerminalText from "@/components/TerminalText";
import { findOfflineAnswer } from "@/lib/chatbotFaq";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCommentDots,
  faXmark,
  faPaperPlane,
  faMicrochip,
  faStar,
  faBolt,
  faRotateLeft,
} from "@fortawesome/free-solid-svg-icons";

/* ─── Per-page suggestion chips ───────────────────────────────── */
/* Ordered most-specific first; the first matching prefix wins. */
const SUGGESTIONS_BY_PAGE = [
  {
    match: (p) => /^\/projects\/[^/]+$/.test(p),
    hint: "About the project you're viewing right now.",
    suggestions: [
      "Tell me about this project",
      "What technologies does it use?",
      "What challenges did you face building it?",
      "Where can I see it live?",
      "What did you learn from it?",
    ],
  },
  {
    match: (p) => p.startsWith("/projects/archive"),
    hint: "About the full project archive.",
    suggestions: [
      "How many projects have you built?",
      "Which technologies appear most in your work?",
      "What is your most complex project?",
      "Show me your AI-related projects",
    ],
  },
  {
    match: (p) => p.startsWith("/projects"),
    hint: "About Taim's projects and tech stack.",
    suggestions: [
      "What projects have you built?",
      "Which project are you most proud of?",
      "What is EduTounes?",
      "What tech stack do you use?",
      "Do you work alone or in teams?",
    ],
  },
  {
    match: (p) => p.startsWith("/about/complete-story"),
    hint: "About Taim's full journey.",
    suggestions: [
      "Tell me your full story",
      "How did you overcome learning difficulties?",
      "What motivated you to start EduTounes?",
      "What lessons has basketball taught you?",
      "What are your plans after high school?",
    ],
  },
  {
    match: (p) => p.startsWith("/about"),
    hint: "About who Taim is, his skills and experience.",
    suggestions: [
      "What are your main skills?",
      "Tell me about your work experience",
      "What did you study?",
      "Who are you outside of tech?",
      "What are your future goals?",
    ],
  },
  {
    match: (p) => p === "/" || p === "",
    hint: "Ask me anything about Taim, his projects, or his journey.",
    suggestions: [
      "Who is Taim Baklouti?",
      "What is EduTounes?",
      "Tell me about your hackathon win",
      "What are your future goals?",
      "What tech stack do you use?",
    ],
  },
];

const DEFAULT_SUGGESTIONS = SUGGESTIONS_BY_PAGE.find((entry) => entry.match("/"));

function getSuggestionsFor(pathname) {
  return SUGGESTIONS_BY_PAGE.find((entry) => entry.match(pathname)) ?? DEFAULT_SUGGESTIONS;
}

/* ─── Terminal Header ────────────────────────────────────── */
function TerminalHeader({ isResponding, onClose }) {
  return (
    <div
      className="flex items-center gap-3 px-4 py-3 border-b border-black/10 dark:border-white/10
      bg-black/5 dark:bg-white/5 rounded-t-xl select-none"
    >
      <div className="flex items-center gap-1.5">
        <span className="w-3 h-3 rounded-full bg-red-500/80" />
        <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
        <span className="w-3 h-3 rounded-full bg-green-500/80" />
      </div>

      <span className="text-xs font-mono text-black/40 dark:text-white/40 tracking-wide ml-2">
        {isResponding ? "edu-ai — processing..." : "edu-ai — ~/taim-lab"}
      </span>

      {isResponding && (
        <motion.span
          className="ml-auto text-xs text-[var(--color-accent)]/60"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <FontAwesomeIcon icon={faMicrochip} aria-hidden="true" />
        </motion.span>
      )}

      <button
        type="button"
        onClick={onClose}
        className="ml-auto text-black/30 dark:text-white/30 hover:text-black/70 dark:hover:text-white/70 transition-colors cursor-pointer"
        aria-label="Close chat"
      >
        <FontAwesomeIcon icon={faXmark} className="text-sm" />
      </button>
    </div>
  );
}

/* ─── Follow-up chips (shown after an answer) ───────────────── */
function FollowUpChips({ suggestions, onSuggestionClick }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {suggestions.slice(0, 4).map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => onSuggestionClick(s)}
          className="px-2.5 py-1 text-[11px] font-mono rounded-full
            bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/10 dark:border-white/10 hover:border-[var(--color-accent)]/50
            text-black/50 dark:text-white/50 hover:text-black/80 dark:hover:text-white/80 transition-all duration-300 cursor-pointer"
        >
          {s}
        </button>
      ))}
    </div>
  );
}

/* ─── Intro / Empty State ────────────────────────────────── */
function IntroState({ onSuggestionClick, hint, suggestions }) {
  return (
    <div className="flex flex-col items-center justify-center flex-1 p-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative"
      >
        <div className="text-3xl mb-3 text-[var(--color-accent)]/60">
          <FontAwesomeIcon icon={faStar} aria-hidden="true" />
        </div>

        <h2 className="text-base font-mono font-bold text-black/90 dark:text-white/90 mb-1">
          <TerminalText text="Welcome to the AI Lab" speed={40} startDelay={300} />
        </h2>
        <p className="text-xs font-mono text-black/40 dark:text-white/40 max-w-xs leading-relaxed">
          {hint}
        </p>
      </motion.div>

      <motion.div
        className="flex flex-wrap justify-center gap-1.5 mt-5"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.8 }}
      >
        {suggestions.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => onSuggestionClick(s)}
            className="px-2.5 py-1 text-[11px] font-mono rounded-full
              bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/10 dark:border-white/10 hover:border-[var(--color-accent)]/50
              text-black/50 dark:text-white/50 hover:text-black/80 dark:hover:text-white/80 transition-all duration-300 cursor-pointer"
          >
            {s}
          </button>
        ))}
      </motion.div>
    </div>
  );
}

/* ─── Main Component ─────────────────────────────────────────── */
export default function FloatingChat() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasStarted, setHasStarted] = useState(false);
  const [typingKey, setTypingKey] = useState(0);
  const [lastQuestion, setLastQuestion] = useState("");
  const [isOfflineAnswer, setIsOfflineAnswer] = useState(false);

  const inputRef = useRef(null);
  const responseEndRef = useRef(null);

  // Reset the conversation on route change so each page opens with
  // its own context, intro hint and suggestion chips.
  useEffect(() => {
    setHasStarted(false);
    setResponse("");
    setError("");
    setPrompt("");
    setIsOfflineAnswer(false);
  }, [pathname]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Auto-scroll to response
  useEffect(() => {
    responseEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [response, isLoading]);

  // ─── Ask AI ────────────────────────────────────────────────
  // 1) Try the offline FAQ (instant, no API); 2) fall back to Gemini.
  const askAI = useCallback(
    async (question) => {
      const q = (question || prompt).trim();
      if (!q || isLoading) return;

      setLastQuestion(q);

      // Instant offline answer path — no loading, no API call
      const offline = findOfflineAnswer(q);
      if (offline) {
        setHasStarted(true);
        setIsOfflineAnswer(true);
        setError("");
        setResponse(offline.a);
        setTypingKey((k) => k + 1);
        setPrompt("");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError("");
      setResponse("");
      setHasStarted(true);
      setIsOfflineAnswer(false);
      setTypingKey((k) => k + 1);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: q }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }

        setResponse(data.response);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
        setPrompt("");
        inputRef.current?.focus();
      }
    },
    [prompt, isLoading]
  );

  const handleSubmit = useCallback(
    (e) => {
      e?.preventDefault();
      askAI();
    },
    [askAI]
  );

  const handleSuggestionClick = useCallback(
    (suggestion) => {
      setPrompt(suggestion);
      askAI(suggestion);
    },
    [askAI]
  );

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSubmit();
      }
    },
    [handleSubmit]
  );

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleReset = useCallback(() => {
    setHasStarted(false);
    setResponse("");
    setError("");
    setPrompt("");
    setIsOfflineAnswer(false);
  }, []);

  const pageSuggestions = getSuggestionsFor(pathname);

  return (
    <>
      {/* ─── Floating Trigger Button ──────────────────────────── */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            type="button"
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full
              bg-[var(--color-accent)] hover:brightness-110
              text-white shadow-lg shadow-[var(--color-accent)]/30
              flex items-center justify-center cursor-pointer
              transition-shadow duration-300 hover:shadow-xl hover:shadow-[var(--color-accent)]/40"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Open AI chat"
          >
            <FontAwesomeIcon icon={faCommentDots} className="text-xl" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ─── Chat Panel ───────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-6 right-6 z-50 w-[calc(100vw-3rem)] max-w-md
              flex flex-col rounded-xl overflow-hidden
              bg-white/95 dark:bg-neutral-900/95 backdrop-blur-xl border border-black/10 dark:border-white/10
              shadow-2xl shadow-black/50"
            style={{ maxHeight: "min(75vh, 600px)" }}
          >
            <TerminalHeader isResponding={isLoading} onClose={handleClose} />

            <div className="flex flex-col flex-1 overflow-hidden">
              {/* Messages / Intro */}
              <div className="flex-1 overflow-y-auto scroll-smooth p-4 space-y-3">
                {!hasStarted ? (
                  <IntroState
                    onSuggestionClick={handleSuggestionClick}
                    hint={pageSuggestions.hint}
                    suggestions={pageSuggestions.suggestions}
                  />
                ) : (
                  <div className="space-y-3">
                    {/* User message */}
                    <motion.div
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-start gap-2"
                    >
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[var(--color-accent)]/20 flex items-center justify-center text-[10px] font-mono text-[var(--color-accent)]">
                        &gt;
                      </span>
                      <div>
                        <p className="text-[10px] font-mono text-black/30 dark:text-white/30 mb-0.5">
                          user@lab
                        </p>
                        <p className="text-sm font-mono text-black/90 dark:text-white/90 leading-relaxed">
                          {lastQuestion}
                        </p>
                      </div>
                    </motion.div>

                    {/* AI Response */}
                    <motion.div
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                      className="flex items-start gap-2"
                    >
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[var(--color-accent)]/30 flex items-center justify-center text-[10px] font-mono text-[var(--color-accent)]">
                        AI
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <p className="text-[10px] font-mono text-[var(--color-accent)]/50">
                            edu-ai
                          </p>
                          {isOfflineAnswer && response && !isLoading && (
                            <span className="inline-flex items-center gap-1 text-[9px] font-mono px-1.5 py-0.5 rounded-full bg-[var(--color-accent-ghost)] dark:bg-[var(--color-accent-ghost-dark)] text-[var(--color-accent)]/70 dark:text-[var(--color-accent-dark)]/70">
                              <FontAwesomeIcon icon={faBolt} className="text-[8px]" /> instant
                            </span>
                          )}
                        </div>

                        {isLoading && !response && (
                          <div className="flex items-center gap-1 text-black/50 dark:text-white/50 font-mono text-xs">
                            <span>Processing</span>
                            <motion.span
                              animate={{ opacity: [0, 1, 0] }}
                              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            >
                              ...
                            </motion.span>
                          </div>
                        )}

                        {error && (
                          <div className="text-red-600 dark:text-red-400 font-mono text-xs leading-relaxed">
                            <span className="text-red-500 dark:text-red-300 font-bold">
                              [ERROR]
                            </span>{" "}
                            {error}
                          </div>
                        )}

                        {response && (
                          <div className="text-sm font-mono text-black/80 dark:text-white/80 leading-relaxed whitespace-pre-wrap">
                            <TerminalText
                              key={typingKey}
                              text={response}
                              speed={12}
                              onComplete={() => {}}
                            />
                          </div>
                        )}

                        {/* Follow-up suggestions + reset */}
                        {(response || error) && !isLoading && (
                          <div className="mt-3 space-y-2">
                            <FollowUpChips
                              suggestions={pageSuggestions.suggestions.filter(
                                (s) => s.toLowerCase() !== lastQuestion.toLowerCase()
                              )}
                              onSuggestionClick={handleSuggestionClick}
                            />
                            <button
                              type="button"
                              onClick={handleReset}
                              className="inline-flex items-center gap-1 text-[10px] font-mono text-black/30 dark:text-white/30 hover:text-black/60 dark:hover:text-white/60 transition-colors cursor-pointer"
                            >
                              <FontAwesomeIcon icon={faRotateLeft} className="text-[9px]" />
                              Back to suggestions
                            </button>
                          </div>
                        )}

                        <div ref={responseEndRef} />
                      </div>
                    </motion.div>
                  </div>
                )}
              </div>

              {/* ─── Input Area ──────────────────────────────────── */}
              <div className="border-t border-black/10 dark:border-white/10 p-3">
                <form onSubmit={handleSubmit} className="flex items-center gap-2">
                  <span className="text-[var(--color-accent)] font-mono text-xs hidden md:block select-none">
                    $_
                  </span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask anything about Taim..."
                    disabled={isLoading}
                    className="flex-1 bg-transparent border-none outline-none text-sm font-mono
                      text-black/90 dark:text-white/90 placeholder-black/20 dark:placeholder-white/20
                      focus:outline-none disabled:opacity-50"
                    aria-label="Ask the AI a question"
                  />
                  <motion.button
                    type="submit"
                    disabled={isLoading || !prompt.trim()}
                    className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center
                      bg-[var(--color-accent)]/20 hover:bg-[var(--color-accent)]/40
                      text-[var(--color-accent)] hover:text-white
                      transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Send question"
                  >
                    <FontAwesomeIcon icon={faPaperPlane} className="text-xs" />
                  </motion.button>
                </form>

                <p className="mt-1.5 text-[9px] font-mono text-black/20 dark:text-white/20 text-center">
                  Enter to send &middot; Gemini Pro 2.0 Flash &middot; Built with ❤️ by Taim
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

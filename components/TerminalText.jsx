"use client";

import { useRef, useEffect, useCallback } from "react";
import PropTypes from "prop-types";

/**
 * TerminalText — types out text character by character with a
 * blinking cursor at the end. Uses requestAnimationFrame for
 * smooth performance without extra dependencies.
 *
 * Props:
 *   text        — the full text to type out
 *   speed       — ms per character (default 25)
 *   className   — optional additional classes
 *   showCursor  — whether to show blinking cursor (default true)
 *   onComplete  — callback when typing finishes
 *   startDelay  — ms delay before typing starts (default 0)
 */
export default function TerminalText({
  text,
  speed = 25,
  className = "",
  showCursor = true,
  onComplete,
  startDelay = 0,
}) {
  const displayRef = useRef(null);
  const indexRef = useRef(0);
  const rafRef = useRef(null);
  const lastTimeRef = useRef(0);
  const startedRef = useRef(false);

  const animate = useCallback(
    (timestamp) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const elapsed = timestamp - lastTimeRef.current;

      if (elapsed >= speed) {
        if (indexRef.current < text.length) {
          if (displayRef.current) {
            displayRef.current.textContent = text.slice(0, indexRef.current + 1);
          }
          indexRef.current++;
          lastTimeRef.current = timestamp;
        } else {
          // Done typing
          onComplete?.();
          return; // Don't schedule another frame
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    },
    [text, speed, onComplete]
  );

  useEffect(() => {
    if (!text || startedRef.current) return;
    startedRef.current = true;

    const delayTimer = setTimeout(() => {
      lastTimeRef.current = 0;
      rafRef.current = requestAnimationFrame(animate);
    }, startDelay);

    return () => {
      clearTimeout(delayTimer);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [text, animate, startDelay]);

  // Reset when text changes
  useEffect(() => {
    startedRef.current = false;
    indexRef.current = 0;
    if (displayRef.current) displayRef.current.textContent = "";
  }, [text]);

  return (
    <span className={className} aria-live="polite">
      <span ref={displayRef} />
      {showCursor && (
        <span className="terminal-cursor inline-block w-[2px] h-[1em] bg-current ml-0.5 align-middle animate-pulse" />
      )}
    </span>
  );
}

TerminalText.propTypes = {
  text: PropTypes.string.isRequired,
  speed: PropTypes.number,
  className: PropTypes.string,
  showCursor: PropTypes.bool,
  onComplete: PropTypes.func,
  startDelay: PropTypes.number,
};

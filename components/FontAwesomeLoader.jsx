"use client";
import { useEffect, useRef } from "react";
import { config } from "@fortawesome/fontawesome-svg-core";

// Prevent FontAwesome from auto-adding CSS
config.autoAddCss = false;

/**
 * FontAwesomeLoader — imports the FontAwesome CSS asynchronously via a dynamic
 * import so it doesn't block the initial server-side render.
 */
export default function FontAwesomeLoader() {
  const injected = useRef(false);

  useEffect(() => {
    if (injected.current) return;
    injected.current = true;

    // Dynamically import the official CSS — deferred to avoid render blocking
    import("@fortawesome/fontawesome-svg-core/styles.css");
  }, []);

  return null;
}

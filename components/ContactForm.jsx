"use client";

import { useState, useRef, useCallback } from "react";
import { useSpring, animated } from "@react-spring/web";
import { animate } from "animejs";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faCheck,
  faExclamationTriangle,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";

const initialState = { name: "", email: "", message: "" };

function validateField(name, value) {
  switch (name) {
    case "name":
      if (!value.trim()) return "Name is required";
      if (value.trim().length < 2) return "Name must be at least 2 characters";
      return "";
    case "email":
      if (!value.trim()) return "Email is required";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Please enter a valid email address";
      return "";
    case "message":
      if (!value.trim()) return "Message is required";
      if (value.trim().length < 10) return "Message must be at least 10 characters";
      return "";
    default:
      return "";
  }
}

function validateAll(data) {
  return {
    name: validateField("name", data.name),
    email: validateField("email", data.email),
    message: validateField("message", data.message),
  };
}

function AnimatedInput({ children, hasError, onFocus, onBlur }) {
  const [focusSpring, focusApi] = useSpring(() => ({
    scale: 1,
    boxShadow: "0 0 0 rgba(239, 68, 68, 0)",
    config: { mass: 0.5, tension: 280, friction: 20 },
  }));

  const handleFocus = useCallback(() => {
    focusApi.start({
      scale: 1.01,
      boxShadow: hasError ? "0 0 18px rgba(239, 68, 68, 0.3)" : "0 0 18px rgba(239, 68, 68, 0.15)",
    });
    onFocus?.();
  }, [focusApi, hasError, onFocus]);

  const handleBlur = useCallback(() => {
    focusApi.start({
      scale: 1,
      boxShadow: "0 0 0 rgba(239, 68, 68, 0)",
    });
    onBlur?.();
  }, [focusApi, onBlur]);

  return (
    <animated.div
      style={{
        transform: focusSpring.scale.to((s) => `scale(${s})`),
        boxShadow: focusSpring.boxShadow,
        borderRadius: "0.5rem",
      }}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      {children}
    </animated.div>
  );
}

export default function ContactForm() {
  const formRef = useRef(null);
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateAll(formData);
    setErrors(validationErrors);
    setTouched({ name: true, email: true, message: true });

    const hasErrors = Object.values(validationErrors).some(Boolean);
    if (hasErrors) {
      // Shake animation with animejs
      animate({
        targets: formRef.current,
        translateX: [0, -10, 10, -8, 8, -5, 5, 0],
        duration: 500,
        easing: "easeInOutSine",
      });
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch(
        "https://formspree.io/f/" + process.env.NEXT_PUBLIC_FORMSPREE_ID,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        setStatus("success");
        setFormData(initialState);
        setTouched({});
      } else {
        const data = await response.json();
        if (data.errors) {
          const serverErrors = {};
          data.errors.forEach((err) => {
            if (err.field) serverErrors[err.field] = err.message;
          });
          setErrors((prev) => ({ ...prev, ...serverErrors }));
        }
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const isLoading = status === "loading";
  const isSuccess = status === "success";
  const isError = status === "error";

  const inputClasses = (fieldName) =>
    `w-full px-4 py-3 rounded-lg border-2 bg-white dark:bg-neutral-800 text-black dark:text-white 
    placeholder-neutral-400 dark:placeholder-neutral-500 transition-all duration-300 
    focus:outline-none ${
      errors[fieldName]
        ? "border-[var(--color-accent)] dark:border-[var(--color-accent-dark)]"
        : "border-[var(--color-border)] dark:border-[var(--color-border-dark)] hover:border-[var(--color-accent-ghost)] dark:hover:border-[var(--color-accent-ghost-dark)]"
    }`;

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      className="w-full max-w-md mx-auto md:mx-0"
      aria-label="Contact form"
    >
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {isSuccess && "Your message has been sent successfully. Thank you!"}
        {isError && "Failed to send your message. Please try again."}
        {isLoading && "Sending your message..."}
      </div>

      {isSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          role="alert"
          className="mb-6 p-4 bg-green-100 dark:bg-green-900/40 border border-green-400 dark:border-green-700 rounded-lg"
        >
          <div className="flex items-center gap-3">
            <FontAwesomeIcon
              icon={faCheck}
              className="text-green-600 dark:text-green-400 text-lg"
              aria-hidden="true"
            />
            <p className="text-green-800 dark:text-green-300 text-sm font-medium">
              Message sent successfully! I&rsquo;ll get back to you soon.
            </p>
          </div>
        </motion.div>
      )}

      {isError && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          role="alert"
          className="mb-6 p-4 bg-[var(--color-accent-ghost)] dark:bg-[var(--color-accent-ghost-dark)] border border-[var(--color-accent)]/30 dark:border-[var(--color-accent-dark)]/40 rounded-lg"
        >
          <div className="flex items-center gap-3">
            <FontAwesomeIcon
              icon={faExclamationTriangle}
              className="text-[var(--color-accent)] dark:text-[var(--color-accent-dark)] text-lg"
              aria-hidden="true"
            />
            <p className="text-[var(--color-ink-2)] dark:text-[var(--color-ink-2-dark)] text-sm font-medium">
              Failed to send message. Please try again or email me directly at{" "}
              <a
                href="mailto:taimallah1106@gmail.com"
                className="underline font-semibold text-[var(--color-accent)] dark:text-[var(--color-accent-dark)]"
              >
                taimallah1106@gmail.com
              </a>
              .
            </p>
          </div>
        </motion.div>
      )}

      {/* Name */}
      <div className="mb-5">
        <label
          htmlFor="contact-name"
          className="block text-sm font-medium text-[var(--color-accent)] dark:text-[var(--color-accent-dark)] mb-2 tracking-wide"
        >
          Name{" "}
          <span className="text-[var(--color-accent)]" aria-hidden="true">
            *
          </span>
        </label>
        <AnimatedInput hasError={!!errors.name}>
          <input
            id="contact-name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Your full name"
            aria-required="true"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            className={inputClasses("name")}
            disabled={isLoading}
          />
        </AnimatedInput>
        {errors.name && (
          <p
            id="contact-name-error"
            role="alert"
            className="mt-1.5 text-[var(--color-accent)] dark:text-[var(--color-accent-dark)] text-xs font-medium"
          >
            {errors.name}
          </p>
        )}
      </div>

      {/* Email */}
      <div className="mb-5">
        <label
          htmlFor="contact-email"
          className="block text-sm font-medium text-[var(--color-accent)] dark:text-[var(--color-accent-dark)] mb-2 tracking-wide"
        >
          Email{" "}
          <span className="text-[var(--color-accent)]" aria-hidden="true">
            *
          </span>
        </label>
        <AnimatedInput hasError={!!errors.email}>
          <input
            id="contact-email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="your.email@example.com"
            autoComplete="email"
            aria-required="true"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            className={inputClasses("email")}
            disabled={isLoading}
          />
        </AnimatedInput>
        {errors.email && (
          <p
            id="contact-email-error"
            role="alert"
            className="mt-1.5 text-[var(--color-accent)] dark:text-[var(--color-accent-dark)] text-xs font-medium"
          >
            {errors.email}
          </p>
        )}
      </div>

      {/* Message */}
      <div className="mb-6">
        <label
          htmlFor="contact-message"
          className="block text-sm font-medium text-[var(--color-accent)] dark:text-[var(--color-accent-dark)] mb-2 tracking-wide"
        >
          Message{" "}
          <span className="text-[var(--color-accent)]" aria-hidden="true">
            *
          </span>
        </label>
        <AnimatedInput hasError={!!errors.message}>
          <textarea
            id="contact-message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Tell me about your project, opportunity, or just say hi..."
            rows={5}
            aria-required="true"
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "contact-message-error" : undefined}
            className={`${inputClasses("message")} resize-vertical`}
            disabled={isLoading}
          />
        </AnimatedInput>
        {errors.message && (
          <p
            id="contact-message-error"
            role="alert"
            className="mt-1.5 text-[var(--color-accent)] dark:text-[var(--color-accent-dark)] text-xs font-medium"
          >
            {errors.message}
          </p>
        )}
      </div>

      {/* Submit */}
      <motion.button
        type="submit"
        disabled={isLoading}
        whileHover={{ scale: isLoading ? 1 : 1.03 }}
        whileTap={{ scale: isLoading ? 1 : 0.97 }}
        className="font-body w-full flex items-center justify-center gap-3 px-8 py-3.5 rounded-lg bg-[var(--color-accent)] dark:bg-[var(--color-accent-dark)] text-white font-medium text-base tracking-wide hover:bg-[var(--color-accent-hover)] dark:hover:bg-[var(--color-accent-hover-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-offset-2 dark:focus:ring-offset-neutral-900 transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed shadow-md shadow-[var(--color-accent)]/20"
        aria-label={isLoading ? "Sending message" : "Send message"}
      >
        {isLoading ? (
          <>
            <FontAwesomeIcon icon={faSpinner} className="text-lg animate-spin" aria-hidden="true" />
            <span>Sending...</span>
          </>
        ) : (
          <>
            <FontAwesomeIcon icon={faPaperPlane} className="text-lg" aria-hidden="true" />
            <span>Send Message</span>
          </>
        )}
      </motion.button>

      {/* Honeypot */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="_gotcha">Leave empty</label>
        <input id="_gotcha" name="_gotcha" type="text" tabIndex={-1} autoComplete="off" />
      </div>
    </form>
  );
}

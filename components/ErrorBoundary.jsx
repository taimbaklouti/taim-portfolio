"use client";

import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full p-8 rounded-2xl bg-[var(--color-paper-2)] dark:bg-[var(--color-paper-2-dark)] border border-[var(--color-border)] dark:border-[var(--color-border-dark)] text-center">
          <p className="text-sm text-[var(--color-ink-2)] dark:text-[var(--color-ink-2-dark)]">
            This section could not be loaded. Please refresh the page.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-3 px-4 py-2 rounded-lg text-xs font-medium bg-[var(--color-accent)] dark:bg-[var(--color-accent-dark)] text-white hover:bg-[var(--color-accent-hover)] dark:hover:bg-[var(--color-accent-hover-dark)] transition-colors duration-200"
          >
            Refresh
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

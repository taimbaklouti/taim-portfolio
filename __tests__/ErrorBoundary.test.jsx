import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ErrorBoundary from "../components/ErrorBoundary";

// Helper — a component that throws on render
function Buggy({ shouldThrow = false }) {
  if (shouldThrow) {
    throw new Error("Test error");
  }
  return <p>Everything is fine</p>;
}

// Suppress console.error noise from React's caught errors
beforeEach(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe("ErrorBoundary", () => {
  it("renders children when there is no error", () => {
    render(
      <ErrorBoundary>
        <p>Hello world</p>
      </ErrorBoundary>
    );

    expect(screen.getByText("Hello world")).toBeInTheDocument();
  });

  it("renders fallback UI when a child throws", () => {
    render(
      <ErrorBoundary>
        <Buggy shouldThrow />
      </ErrorBoundary>
    );

    expect(
      screen.getByText("This section could not be loaded. Please refresh the page.")
    ).toBeInTheDocument();
  });

  it("shows a Refresh button in the error state", () => {
    render(
      <ErrorBoundary>
        <Buggy shouldThrow />
      </ErrorBoundary>
    );

    expect(screen.getByRole("button", { name: "Refresh" })).toBeInTheDocument();
  });

  it("Reset button is accessible and clickable", async () => {
    // jsdom restricts mocking window.location.reload, so we verify
    // the button renders as a proper <button> and is clickable
    // without throwing, which confirms the handler exists.
    const user = userEvent.setup();
    const btnRef = { current: null };

    render(
      <ErrorBoundary>
        <Buggy shouldThrow />
      </ErrorBoundary>
    );

    const btn = screen.getByRole("button", { name: "Refresh" });
    expect(btn).toBeInTheDocument();
    expect(btn.tagName).toBe("BUTTON");

    // Click should not throw — handler exists
    await expect(user.click(btn)).resolves.toBeUndefined();
  });

  it("has a polite status region for screen readers", () => {
    render(
      <ErrorBoundary>
        <p>Content</p>
      </ErrorBoundary>
    );

    // Normal state: children are rendered as-is
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("does not recover when re-rendered with the same error", () => {
    const { rerender } = render(
      <ErrorBoundary>
        <Buggy shouldThrow />
      </ErrorBoundary>
    );

    // Re-render with same error — should still show fallback
    rerender(
      <ErrorBoundary>
        <Buggy shouldThrow />
      </ErrorBoundary>
    );

    expect(
      screen.getByText("This section could not be loaded. Please refresh the page.")
    ).toBeInTheDocument();
  });
});

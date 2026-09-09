import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Button from "../components/Button";

describe("Button", () => {
  it("renders children text", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("renders with primary variation class", () => {
    const { container } = render(<Button variation="primary">Primary</Button>);
    expect(container.firstChild).toHaveClass(/bg-/);
  });

  it("renders with secondary variation class", () => {
    const { container } = render(<Button variation="secondary">Secondary</Button>);
    expect(container.firstChild).toHaveClass("bg-transparent");
  });

  it("passes additional props to the button", () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByText("Disabled")).toBeDisabled();
  });
});

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Hr from "../components/Hr";

describe("Hr", () => {
  it("renders short variant by default", () => {
    const { container } = render(<Hr />);
    const svgElements = container.querySelectorAll("svg.hr-line-svg");
    // Short variant renders 2 svg lines
    expect(svgElements.length).toBe(2);
  });

  it("renders long variant when specified", () => {
    const { container } = render(<Hr variant="long" />);
    const svgElements = container.querySelectorAll("svg.hr-line-svg");
    expect(svgElements.length).toBe(2);
  });

  it("renders with accessible aria-hidden attribute", () => {
    const { container } = render(<Hr />);
    const hidden = container.querySelectorAll('[aria-hidden="true"]');
    expect(hidden.length).toBeGreaterThanOrEqual(1);
  });
});

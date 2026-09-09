import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Hr from "../components/Hr";

describe("Hr", () => {
  it("renders short variant by default", () => {
    const { container } = render(<Hr />);
    const elements = container.querySelectorAll("div");
    // Short variant renders a flex container with 2 inner divs
    expect(elements.length).toBeGreaterThanOrEqual(2);
  });

  it("renders long variant when specified", () => {
    const { container } = render(<Hr variant="long" />);
    const elements = container.querySelectorAll("div");
    expect(elements.length).toBeGreaterThanOrEqual(2);
  });

  it("renders with accessible aria-hidden attribute", () => {
    const { container } = render(<Hr />);
    const dividers = container.querySelectorAll('[aria-hidden="true"]');
    expect(dividers.length).toBeGreaterThanOrEqual(2);
  });
});

import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { PosterSVG } from "@/lib/poster";

describe("PosterSVG", () => {
  it("renders an svg with the uppercased title", () => {
    const { container, getByText } = render(
      <PosterSVG title="El Bosque" subtitle="NO ENTRES SOLO" palette={["#0a1a0e","#1a4a2a","#a8ff66"]} motif="horror" />
    );
    expect(container.querySelector("svg")).toBeInTheDocument();
    expect(getByText("EL BOSQUE")).toBeInTheDocument();
  });
});

import { describe, it, expect } from "vitest";
import { getPerView, totalPages, nextPage, prevPage } from "@/lib/carousel";

describe("carousel math", () => {
  it("perView by width breakpoints (2/3/4/6)", () => {
    expect(getPerView(500)).toBe(2);
    expect(getPerView(700)).toBe(3);
    expect(getPerView(1000)).toBe(4);
    expect(getPerView(1280)).toBe(6);
  });
  it("totalPages = ceil(count/perView), min 1", () => {
    expect(totalPages(10, 6)).toBe(2);
    expect(totalPages(10, 3)).toBe(4);
    expect(totalPages(0, 6)).toBe(1);
  });
  it("next/prev wrap around", () => {
    expect(nextPage(1, 2)).toBe(0);
    expect(nextPage(0, 2)).toBe(1);
    expect(prevPage(0, 2)).toBe(1);
    expect(prevPage(1, 2)).toBe(0);
  });
});

import { describe, it, expect } from "vitest";
import { movies, promos, candy } from "@/lib/data";

describe("data", () => {
  it("has 10 movies each with a 3-color palette and known motif", () => {
    const motifs = ["dragon","figure","music","horror","anime","sheep","action","sci"];
    expect(movies).toHaveLength(10);
    for (const m of movies) {
      expect(m.title.length).toBeGreaterThan(0);
      expect(m.palette).toHaveLength(3);
      expect(motifs).toContain(m.motif);
      expect(m.genre).toMatch(/·/);
    }
  });
  it("has 3 promos and 4 candy items with prices", () => {
    expect(promos).toHaveLength(3);
    expect(candy).toHaveLength(4);
    for (const c of candy) expect(c.price).toMatch(/^S\/ /);
  });
});

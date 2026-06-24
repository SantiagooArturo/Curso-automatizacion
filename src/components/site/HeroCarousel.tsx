"use client";

import { useEffect, useRef, useState } from "react";
import { movies } from "@/lib/data";
import { PosterSVG } from "@/lib/poster";
import { getPerView, totalPages, nextPage, prevPage } from "@/lib/carousel";

// The active poster (shows COMPRAR badge) is fixed at index 1, matching the prototype.
const ACTIVE_IDX = 1;

export default function HeroCarousel() {
  const [page, setPage] = useState(0);
  // Start with 6 as SSR default; effects will correct on client.
  const [perView, setPerView] = useState(6);
  const [offset, setOffset] = useState(0);

  const trackRef = useRef<HTMLDivElement>(null);
  // Keep a ref to perView so the auto-advance interval never goes stale.
  const perViewRef = useRef(perView);
  const pageRef = useRef(page);

  useEffect(() => {
    perViewRef.current = perView;
  }, [perView]);

  useEffect(() => {
    pageRef.current = page;
  }, [page]);

  // Compute the pixel offset from current page, perView, and card geometry.
  function computeOffset(currentPage: number, currentPerView: number): number {
    const track = trackRef.current;
    if (!track) return 0;
    const firstCard = track.querySelector<HTMLElement>(".poster-card");
    if (!firstCard) return 0;
    const cardWidth = firstCard.getBoundingClientRect().width;
    const gap = parseFloat(getComputedStyle(track).gap) || 24;
    return currentPage * currentPerView * (cardWidth + gap);
  }

  // On mount: set perView from real window width, then compute offset.
  useEffect(() => {
    const pv = getPerView(window.innerWidth);
    setPerView(pv);
    perViewRef.current = pv;
    // Use requestAnimationFrame so the DOM has rendered before we measure.
    const raf = requestAnimationFrame(() => {
      setOffset(computeOffset(0, pv));
    });
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Recompute offset whenever page or perView changes.
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      setOffset(computeOffset(page, perView));
    });
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, perView]);

  // Resize handler: update perView, clamp page, recompute offset.
  useEffect(() => {
    function handleResize() {
      const pv = getPerView(window.innerWidth);
      const pages = totalPages(movies.length, pv);
      setPerView(pv);
      perViewRef.current = pv;
      setPage((p) => {
        const clamped = Math.min(p, pages - 1);
        pageRef.current = clamped;
        return clamped;
      });
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-advance every 7 seconds. Uses refs to avoid stale closures.
  useEffect(() => {
    const timer = setInterval(() => {
      const pv = perViewRef.current;
      const pages = totalPages(movies.length, pv);
      setPage((p) => nextPage(p, pages));
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const pages = totalPages(movies.length, perView);

  function handlePrev() {
    setPage((p) => prevPage(p, pages));
  }

  function handleNext() {
    setPage((p) => nextPage(p, pages));
  }

  return (
    <section className="hero">
      <div className="hero-bg" aria-hidden="true" />
      <h1 className="cp-hero-title" aria-label="Estrenos">
        ESTRENOS
      </h1>

      <div className="carousel">
        <button
          className="carousel-arrow prev"
          aria-label="Anterior"
          onClick={handlePrev}
        >
          <svg
            viewBox="0 0 24 24"
            width="22"
            height="22"
            fill="none"
            stroke="#ffd23f"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <div className="track-viewport">
          <div
            className="track"
            ref={trackRef}
            style={{ transform: `translateX(-${offset}px)` }}
          >
            {movies.map((m, i) => (
              <div
                className={"poster-card" + (i === ACTIVE_IDX ? " active" : "")}
                key={m.title}
              >
                <div className="frame">
                  <div className="poster-img">
                    <PosterSVG
                      title={m.title}
                      subtitle={m.subtitle}
                      palette={m.palette}
                      motif={m.motif}
                    />
                  </div>
                </div>
                <span className="buy-badge">COMPRAR</span>
                <div className="title-pill">
                  <span className="plus left">+</span>
                  {m.title}
                  <span className="plus right">+</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          className="carousel-arrow next"
          aria-label="Siguiente"
          onClick={handleNext}
        >
          <svg
            viewBox="0 0 24 24"
            width="22"
            height="22"
            fill="none"
            stroke="#ffd23f"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      <div className="dots" aria-hidden="true">
        {Array.from({ length: pages }).map((_, i) => (
          <span
            key={i}
            className={"dot" + (i === page ? " active" : "")}
            onClick={() => setPage(i)}
          />
        ))}
      </div>
    </section>
  );
}

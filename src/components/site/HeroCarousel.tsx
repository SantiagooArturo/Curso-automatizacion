"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { TransitionEvent } from "react";
import { movies } from "@/lib/data";
import { PosterSVG } from "@/lib/poster";
import { getPerView, totalPages } from "@/lib/carousel";

// The real movie that carries the COMPRAR badge, matching the prototype.
const ACTIVE_IDX = 1;
// Max cards-per-view across breakpoints. Used as a constant clone count so the
// server and client render the same DOM (no hydration mismatch) and the right
// edge of the viewport is always filled, whatever the breakpoint.
const CLONES = 6;
const N = movies.length;
// Real movies followed by CLONES copies of the first ones. When the track
// scrolls into the clones (pos === N) we snap back to the real start, which is
// pixel-identical — so the loop is seamless and never shows empty space.
const displayList = [...movies, ...movies.slice(0, CLONES)];

export default function HeroCarousel() {
  const [perView, setPerView] = useState(CLONES);
  const [step, setStep] = useState(0); // px per card = card width + gap
  const [pos, setPos] = useState(0); // index of left-most visible card (0..N)
  const [animate, setAnimate] = useState(true);

  const trackRef = useRef<HTMLDivElement>(null);

  const measureStep = useCallback(() => {
    const track = trackRef.current;
    if (!track) return 0;
    const card = track.querySelector<HTMLElement>(".poster-card");
    if (!card) return 0;
    const width = card.getBoundingClientRect().width;
    const gap = parseFloat(getComputedStyle(track).gap) || 24;
    return width + gap;
  }, []);

  // Mount + resize: sync cards-per-view and the measured step.
  useEffect(() => {
    function sync() {
      setPerView(getPerView(window.innerWidth));
      // Measure after layout settles so the responsive card width is current.
      requestAnimationFrame(() => setStep(measureStep()));
    }
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, [measureStep]);

  // After any no-transition snap, re-enable the transition on the next frame.
  useEffect(() => {
    if (animate) return;
    const raf = requestAnimationFrame(() => setAnimate(true));
    return () => cancelAnimationFrame(raf);
  }, [animate]);

  const goNext = useCallback(() => {
    setAnimate(true);
    setPos((p) => Math.min(p + 1, N));
  }, []);

  const goPrev = useCallback(() => {
    setPos((p) => {
      if (p > 0) {
        setAnimate(true);
        return p - 1;
      }
      // Wrap backwards: jump (no transition) to the cloned start — visually
      // identical to pos 0 — then animate one card left to the real last movie.
      setAnimate(false);
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          setAnimate(true);
          setPos(N - 1);
        }),
      );
      return N;
    });
  }, []);

  // Auto-advance one card every 3 seconds.
  useEffect(() => {
    const timer = setInterval(goNext, 3000);
    return () => clearInterval(timer);
  }, [goNext]);

  // When the track reaches the cloned start (pos === N), snap back to the real
  // start without a transition — the seam is invisible.
  function handleTransitionEnd(e: TransitionEvent<HTMLDivElement>) {
    if (e.target !== e.currentTarget) return;
    if (pos >= N) {
      setAnimate(false);
      setPos((p) => p - N);
    }
  }

  const pages = totalPages(N, perView);
  const activeDot = Math.floor((pos % N) / perView) % pages;

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
          onClick={goPrev}
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
            onTransitionEnd={handleTransitionEnd}
            style={{
              transform: `translateX(-${pos * step}px)`,
              transition: animate ? undefined : "none",
            }}
          >
            {displayList.map((m, i) => (
              <div
                className={"poster-card" + (i === ACTIVE_IDX ? " active" : "")}
                key={i}
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
          onClick={goNext}
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
            className={"dot" + (i === activeDot ? " active" : "")}
            onClick={() => {
              setAnimate(true);
              setPos(i * perView);
            }}
          />
        ))}
      </div>
    </section>
  );
}

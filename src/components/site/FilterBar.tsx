"use client";

import { useState } from "react";

const ChevronDown = () => (
  <svg
    viewBox="0 0 24 24"
    width="18"
    height="18"
    fill="none"
    stroke="#0e3a8a"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const SlidersIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="18"
    height="18"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
  >
    <line x1="4" y1="6" x2="14" y2="6" />
    <line x1="4" y1="12" x2="20" y2="12" />
    <line x1="4" y1="18" x2="11" y2="18" />
    <circle cx="17" cy="6" r="2.2" fill="currentColor" stroke="none" />
    <circle cx="7" cy="18" r="2.2" fill="currentColor" stroke="none" />
  </svg>
);

export default function FilterBar() {
  const [active, setActive] = useState(false);

  const activate = () => setActive(true);

  return (
    <section className="filter-section">
      <div className="filter-card">
        <div className="filter-cell">
          <label>Por película</label>
          <button className="filter-pick" onClick={activate}>
            <span className="filter-strong">Por película</span>
            <span className="filter-sub">Qué quieres ver</span>
            <ChevronDown />
          </button>
        </div>
        <div className="filter-cell">
          <button className="filter-pick" onClick={activate}>
            <span className="filter-strong">Por ciudad</span>
            <span className="filter-sub">Dónde estás</span>
            <ChevronDown />
          </button>
        </div>
        <div className="filter-cell">
          <button className="filter-pick" onClick={activate}>
            <span className="filter-strong">Por cine</span>
            <span className="filter-sub">Elige tu Cineplanet</span>
            <ChevronDown />
          </button>
        </div>
        <div className="filter-cell">
          <button className="filter-pick" onClick={activate}>
            <span className="filter-strong">Por fecha</span>
            <span className="filter-sub">Elige un día</span>
            <ChevronDown />
          </button>
        </div>
        <button
          className={"filter-go" + (active ? " active" : "")}
          disabled={!active}
        >
          <SlidersIcon />
          Filtrar
        </button>
      </div>
    </section>
  );
}
